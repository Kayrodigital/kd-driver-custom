import "server-only";
import { buildBookingConfirmedMessage, buildBookingReceivedMessage } from "@/domain/justificatif/justificatif-messages";

const BREVO_TIMEOUT_MS = 5_000;

export type NotifyOutcome = "success" | "skipped" | "failed";
export type NotifyErrorCode = "not_configured" | "no_recipient_email" | "timeout" | "http_error" | "invalid_response";
export type NotifyResult = { outcome: NotifyOutcome; errorCode?: NotifyErrorCode };

export type BookingReceivedEmailPayload = {
  reference: string;
  customerEmail: string | null;
  pickupAddress: string;
  destinationAddress: string;
  pickupAt: string;
};

export type BookingConfirmedEmailPayload = {
  reference: string;
  customerEmail: string | null;
  pickupAt: string;
  confirmedPriceCents: number;
  justificatifUrl: string;
};

export interface ClientNotifier {
  notifyBookingReceived(payload: BookingReceivedEmailPayload): Promise<NotifyResult>;
  notifyBookingConfirmed(payload: BookingConfirmedEmailPayload): Promise<NotifyResult>;
}

function brevoConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  const fromName = process.env.BREVO_FROM_NAME;
  if (!apiKey || !fromEmail || !fromName) return null;
  return { apiKey, fromEmail, fromName };
}

async function sendTransactionalEmail(args: {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}): Promise<NotifyResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS);
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": args.apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: args.fromName, email: args.fromEmail },
        to: [{ email: args.toEmail }],
        subject: args.subject,
        htmlContent: args.htmlContent,
        textContent: args.textContent,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("client_email_notification_http_error", response.status);
      return { outcome: "failed", errorCode: "http_error" };
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch {
      return { outcome: "failed", errorCode: "invalid_response" };
    }
    if (!json || typeof json !== "object" || !("messageId" in json)) {
      return { outcome: "failed", errorCode: "invalid_response" };
    }
    return { outcome: "success" };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return { outcome: "failed", errorCode: "timeout" };
    console.error("client_email_notification_failed", error instanceof Error ? error.message : "unknown_error");
    return { outcome: "failed", errorCode: "http_error" };
  } finally {
    clearTimeout(timeout);
  }
}

function wrapHtml(eyebrow: string, title: string, bodyText: string): string {
  return `<!doctype html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f5efe0;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe0;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1b1812;padding:20px 24px;">
          <span style="color:#f5efe0;font-size:18px;font-weight:bold;letter-spacing:0.04em;">KDRIVE</span>
        </td></tr>
        <tr><td style="padding:24px;">
          <p style="margin:0 0 4px;color:#b08d4f;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;font-weight:bold;">${eyebrow}</p>
          <h1 style="margin:0 0 16px;color:#1b1812;font-size:20px;">${title}</h1>
          <p style="margin:0;color:#1b1812;font-size:14px;line-height:1.6;white-space:pre-line;">${bodyText}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export class BrevoClientNotifier implements ClientNotifier {
  async notifyBookingReceived(payload: BookingReceivedEmailPayload): Promise<NotifyResult> {
    const config = brevoConfig();
    if (!config) return { outcome: "skipped", errorCode: "not_configured" };
    if (!payload.customerEmail) return { outcome: "skipped", errorCode: "no_recipient_email" };

    const message = buildBookingReceivedMessage({
      publicReference: payload.reference,
      pickupAddress: payload.pickupAddress,
      destinationAddress: payload.destinationAddress,
      pickupAt: payload.pickupAt,
    });

    return sendTransactionalEmail({
      ...config,
      toEmail: payload.customerEmail,
      subject: `Demande reçue — KDRIVE ${payload.reference}`,
      htmlContent: wrapHtml("Demande reçue", payload.reference, message),
      textContent: message,
    });
  }

  async notifyBookingConfirmed(payload: BookingConfirmedEmailPayload): Promise<NotifyResult> {
    const config = brevoConfig();
    if (!config) return { outcome: "skipped", errorCode: "not_configured" };
    if (!payload.customerEmail) return { outcome: "skipped", errorCode: "no_recipient_email" };

    const message = buildBookingConfirmedMessage({
      publicReference: payload.reference,
      pickupAt: payload.pickupAt,
      confirmedPriceCents: payload.confirmedPriceCents,
      justificatifUrl: payload.justificatifUrl,
    });

    return sendTransactionalEmail({
      ...config,
      toEmail: payload.customerEmail,
      subject: `Réservation confirmée — KDRIVE ${payload.reference}`,
      htmlContent: wrapHtml("Réservation confirmée", payload.reference, message),
      textContent: message,
    });
  }
}
