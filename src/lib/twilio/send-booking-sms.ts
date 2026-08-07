import "server-only";

const TWILIO_API_BASE = "https://api.twilio.com/2010-04-01";
const TIMEOUT_MS = 5_000;

export type SmsSendOutcome = "success" | "skipped" | "failed";
export type SmsSendErrorCode = "not_configured" | "timeout" | "http_error" | "invalid_response";
export type SmsSendResult = { outcome: SmsSendOutcome; errorCode?: SmsSendErrorCode };

export interface BookingSmsSender {
  sendBookingSms(toPhone: string, message: string): Promise<SmsSendResult>;
}

/**
 * Envoi réel via l'API Twilio (Messages REST). Canal de secours pour
 * alerter Karamba d'une nouvelle course, en complément du WhatsApp
 * (@see whatsapp-sender.ts) qui dépend d'une fenêtre de session active.
 */
export class TwilioBookingSmsSender implements BookingSmsSender {
  async sendBookingSms(toPhone: string, message: string): Promise<SmsSendResult> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
    if (!accountSid || !authToken || !messagingServiceSid) return { outcome: "skipped", errorCode: "not_configured" };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const body = new URLSearchParams({ To: toPhone, MessagingServiceSid: messagingServiceSid, Body: message });
      const response = await fetch(`${TWILIO_API_BASE}/Accounts/${accountSid}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "content-type": "application/x-www-form-urlencoded",
        },
        body,
        signal: controller.signal,
      });

      if (!response.ok) {
        // Le corps d'erreur Twilio (jamais l'auth token, absent de la
        // réponse) est journalisé pour diagnostiquer la cause précise.
        const errorBody = await response.text().catch(() => "");
        console.error("booking_sms_send_http_error", response.status, errorBody);
        return { outcome: "failed", errorCode: "http_error" };
      }

      let json: unknown;
      try {
        json = await response.json();
      } catch {
        return { outcome: "failed", errorCode: "invalid_response" };
      }
      if (!json || typeof json !== "object" || !("sid" in json)) {
        return { outcome: "failed", errorCode: "invalid_response" };
      }
      return { outcome: "success" };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return { outcome: "failed", errorCode: "timeout" };
      console.error("booking_sms_send_failed", error instanceof Error ? error.message : "unknown_error");
      return { outcome: "failed", errorCode: "http_error" };
    } finally {
      clearTimeout(timeout);
    }
  }
}
