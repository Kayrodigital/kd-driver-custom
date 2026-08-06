import "server-only";

const WHATSAPP_API_VERSION = "v21.0";
const TIMEOUT_MS = 5_000;

export type WhatsAppSendOutcome = "success" | "skipped" | "failed";
export type WhatsAppSendErrorCode = "not_configured" | "timeout" | "http_error" | "invalid_response";
export type WhatsAppSendResult = { outcome: WhatsAppSendOutcome; errorCode?: WhatsAppSendErrorCode };

export interface WhatsAppSender {
  sendText(toPhone: string, message: string): Promise<WhatsAppSendResult>;
}

/**
 * Envoi réel via l'API WhatsApp Cloud (Meta Graph API). Message texte
 * libre : ne fonctionne que si le destinataire a échangé avec le numéro
 * WhatsApp Business KDRIVE dans les dernières 24h (règle Meta) — en
 * l'absence d'un modèle de message pré-approuvé, ce qui reste à mettre en
 * place séparément si une fiabilité hors fenêtre de 24h est nécessaire.
 */
export class MetaWhatsAppSender implements WhatsAppSender {
  async sendText(toPhone: string, message: string): Promise<WhatsAppSendResult> {
    const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;
    if (!accessToken || !phoneNumberId) return { outcome: "skipped", errorCode: "not_configured" };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(`https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
        body: JSON.stringify({ messaging_product: "whatsapp", to: toPhone, type: "text", text: { body: message } }),
        signal: controller.signal,
      });

      if (!response.ok) {
        // Le corps d'erreur de Meta (jamais le jeton d'accès, absent de la
        // réponse) est journalisé pour diagnostiquer précisément la cause
        // (ex. fenêtre de 24h expirée, numéro invalide) — le seul code HTTP
        // ne suffit pas à distinguer ces cas.
        const errorBody = await response.text().catch(() => "");
        console.error("whatsapp_send_http_error", response.status, errorBody);
        return { outcome: "failed", errorCode: "http_error" };
      }

      let json: unknown;
      try {
        json = await response.json();
      } catch {
        return { outcome: "failed", errorCode: "invalid_response" };
      }
      if (!json || typeof json !== "object" || !("messages" in json)) {
        return { outcome: "failed", errorCode: "invalid_response" };
      }
      return { outcome: "success" };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return { outcome: "failed", errorCode: "timeout" };
      console.error("whatsapp_send_failed", error instanceof Error ? error.message : "unknown_error");
      return { outcome: "failed", errorCode: "http_error" };
    } finally {
      clearTimeout(timeout);
    }
  }
}
