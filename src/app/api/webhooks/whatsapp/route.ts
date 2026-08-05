import { isValidWebhookVerification, verifyMetaSignature } from "@/domain/webhooks/meta-signature";
import { summarizeWebhookEvents } from "@/domain/webhooks/whatsapp-webhook-log";

/**
 * Webhook WhatsApp Cloud API (Meta). Phase actuelle : souscription +
 * réception passive uniquement — aucun traitement métier, aucune réponse
 * automatique. Les messages/statuts entrants sont uniquement journalisés
 * (résumé sans donnée sensible, cf. whatsapp-webhook-log.ts) en attendant
 * une phase ultérieure explicitement demandée pour les interpréter.
 */

const MAX_PAYLOAD_BYTES = 1_000_000;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expectedToken = process.env.META_WEBHOOK_VERIFY_TOKEN;

  if (!expectedToken) {
    console.error("whatsapp_webhook_verify_misconfigured");
    return new Response("Forbidden", { status: 403 });
  }

  const isValid = isValidWebhookVerification({ mode, token, expectedToken });
  if (!isValid || !challenge) {
    return new Response("Forbidden", { status: 403 });
  }

  return new Response(challenge, { status: 200, headers: { "content-type": "text/plain" } });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return new Response("Payload Too Large", { status: 413 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return new Response("Payload Too Large", { status: 413 });
  }

  const appSecret = process.env.META_APP_SECRET;
  const signatureHeader = request.headers.get("x-hub-signature-256");

  if (appSecret) {
    const signatureValid = verifyMetaSignature({ rawBody, signatureHeader, appSecret });
    if (!signatureValid) {
      console.error("whatsapp_webhook_invalid_signature", { at: new Date().toISOString() });
      return new Response("Forbidden", { status: 403 });
    }
  } else {
    console.warn("whatsapp_webhook_signature_not_verified_missing_app_secret", { at: new Date().toISOString() });
  }

  let parsedBody: unknown = null;
  try {
    parsedBody = rawBody.length > 0 ? JSON.parse(rawBody) : null;
  } catch {
    parsedBody = null;
  }

  const events = summarizeWebhookEvents(parsedBody);
  for (const event of events) {
    console.log("whatsapp_webhook_event", event);
  }

  return new Response("OK", { status: 200 });
}
