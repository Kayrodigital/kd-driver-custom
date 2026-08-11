import "server-only";
import { buildWhatsAppContactUrl } from "@/domain/booking/whatsapp";
import { formatDateTimeParis } from "@/lib/format-date";

const BREVO_TIMEOUT_MS = 5_000;

export type NewBookingEmailPayload = {
  reservationId: string;
  reference: string;
  createdAt: string;
  customerName: string | null;
  customerPhone: string;
  customerEmail: string | null;
  pickupAddress: string;
  destinationAddress: string;
  pickupAt: string;
  distanceMeters: number;
  durationSeconds: number;
  vehicleLabel: string;
  passengers: number;
  luggage: number;
  optionsSummary: string;
  estimatedPriceLabel: string;
  confirmedPriceLabel: string | null;
  status: "new" | "quote_requested";
};

export type NotifyOutcome = "success" | "skipped" | "failed";
export type NotifyErrorCode = "not_configured" | "timeout" | "http_error" | "invalid_response";
export type NotifyResult = { outcome: NotifyOutcome; errorCode?: NotifyErrorCode };

export interface OwnerNotifier {
  notifyNewBooking(payload: NewBookingEmailPayload): Promise<NotifyResult>;
}

const statusLabels: Record<NewBookingEmailPayload["status"], string> = {
  new: "Nouvelle demande",
  quote_requested: "Devis demandé",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDateTime(iso: string): string {
  return formatDateTimeParis(iso, { dateStyle: "full", timeStyle: "short" });
}

function whatsappLink(payload: NewBookingEmailPayload): string | null {
  const message = `Bonjour, votre demande KDRIVE ${payload.reference} pour le trajet ${payload.pickupAddress} → ${payload.destinationAddress} le ${formatDateTime(payload.pickupAt)} a bien été reçue.`;
  return buildWhatsAppContactUrl({ phone: payload.customerPhone, message });
}

function adminUrl(payload: NewBookingEmailPayload): string {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");
  return `${base}/admin/reservations/${payload.reservationId}`;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 0;color:#8a8578;font-size:13px;">${label}</td><td style="padding:6px 0;color:#1b1812;font-size:13px;text-align:right;">${value}</td></tr>`;
}

function buildEmailHtml(payload: NewBookingEmailPayload): string {
  const url = adminUrl(payload);
  const rows = [
    row("Créée le", formatDateTime(payload.createdAt)),
    row("Client", escapeHtml(payload.customerName ?? "—")),
    row("Téléphone", escapeHtml(payload.customerPhone)),
    row("E-mail", escapeHtml(payload.customerEmail ?? "—")),
    row("Départ", escapeHtml(payload.pickupAddress)),
    row("Destination", escapeHtml(payload.destinationAddress)),
    row("Date et heure", formatDateTime(payload.pickupAt)),
    row("Distance", `${(payload.distanceMeters / 1000).toFixed(1)} km`),
    row("Durée", `≈ ${Math.round(payload.durationSeconds / 60)} min`),
    row("Catégorie", escapeHtml(payload.vehicleLabel)),
    row("Passagers", String(payload.passengers)),
    row("Bagages", String(payload.luggage)),
    row("Options", escapeHtml(payload.optionsSummary || "—")),
    row("Tarif", escapeHtml(payload.estimatedPriceLabel)),
    ...(payload.confirmedPriceLabel ? [row("Tarif confirmé", escapeHtml(payload.confirmedPriceLabel))] : []),
    row("Statut", statusLabels[payload.status]),
  ].join("");

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
          <p style="margin:0 0 4px;color:#b08d4f;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;font-weight:bold;">Nouvelle réservation</p>
          <h1 style="margin:0 0 16px;color:#1b1812;font-size:22px;">${payload.reference}</h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          <div style="margin-top:24px;">
            <a href="${url}" style="display:inline-block;background:#b08d4f;color:#1b1812;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px;font-size:14px;">Ouvrir la réservation</a>
          </div>
          <div style="margin-top:12px;">
            <a href="tel:${encodeURIComponent(payload.customerPhone)}" style="color:#1b1812;font-size:13px;text-decoration:underline;margin-right:16px;">Appeler le client</a>
            ${whatsappLink(payload) ? `<a href="${whatsappLink(payload)}" style="color:#1b1812;font-size:13px;text-decoration:underline;">WhatsApp</a>` : ""}
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildEmailText(payload: NewBookingEmailPayload): string {
  const lines = [
    `Nouvelle réservation KDRIVE — ${payload.reference}`,
    `Créée le : ${formatDateTime(payload.createdAt)}`,
    `Client : ${payload.customerName ?? "—"}`,
    `Téléphone : ${payload.customerPhone}`,
    `E-mail : ${payload.customerEmail ?? "—"}`,
    `Départ : ${payload.pickupAddress}`,
    `Destination : ${payload.destinationAddress}`,
    `Date et heure : ${formatDateTime(payload.pickupAt)}`,
    `Distance : ${(payload.distanceMeters / 1000).toFixed(1)} km`,
    `Durée : ≈ ${Math.round(payload.durationSeconds / 60)} min`,
    `Catégorie : ${payload.vehicleLabel}`,
    `Passagers : ${payload.passengers}`,
    `Bagages : ${payload.luggage}`,
    `Options : ${payload.optionsSummary || "—"}`,
    `Tarif : ${payload.estimatedPriceLabel}`,
  ];
  if (payload.confirmedPriceLabel) lines.push(`Tarif confirmé : ${payload.confirmedPriceLabel}`);
  lines.push(`Statut : ${statusLabels[payload.status]}`);
  lines.push(`Fiche : ${adminUrl(payload)}`);
  return lines.join("\n");
}

export class BrevoOwnerNotifier implements OwnerNotifier {
  async notifyNewBooking(payload: NewBookingEmailPayload): Promise<NotifyResult> {
    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.BREVO_FROM_EMAIL;
    const fromName = process.env.BREVO_FROM_NAME;
    const ownerEmail = process.env.BREVO_OWNER_EMAIL;

    if (!apiKey || !fromEmail || !fromName || !ownerEmail) {
      return { outcome: "skipped", errorCode: "not_configured" };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS);
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { name: fromName, email: fromEmail },
          to: [{ email: ownerEmail }],
          subject: `Nouvelle réservation KDRIVE — ${payload.reference}`,
          htmlContent: buildEmailHtml(payload),
          textContent: buildEmailText(payload),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error("owner_email_notification_http_error", response.status);
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
      if (error instanceof Error && error.name === "AbortError") {
        return { outcome: "failed", errorCode: "timeout" };
      }
      console.error("owner_email_notification_failed", error instanceof Error ? error.message : "unknown_error");
      return { outcome: "failed", errorCode: "http_error" };
    } finally {
      clearTimeout(timeout);
    }
  }
}
