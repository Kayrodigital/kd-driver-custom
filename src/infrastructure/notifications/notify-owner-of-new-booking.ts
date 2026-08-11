import "server-only";
import { normalizePhoneForWhatsApp } from "@/domain/booking/whatsapp";
import { formatDateTimeParis } from "@/lib/format-date";
import type { NewBookingEmailPayload, OwnerNotifier } from "./owner-notifier";
import type { WhatsAppSender } from "./whatsapp-sender";
import type { BookingSmsSender } from "@/lib/twilio/send-booking-sms";

/**
 * Le tunnel public ne calcule plus de prix (sprint "nouveau parcours sans
 * prix") : le montant estimé automatiquement à la création n'est qu'un
 * point de départ pour le calculateur interne (fiche admin), jamais un
 * tarif à annoncer tel quel — cette notification ne doit donc jamais
 * afficher de montant, seulement inviter à le calculer.
 */
const PRICE_TO_CALCULATE_LABEL = "Tarif : à calculer";

export type NewBookingNotificationContext = {
  createdAt: string;
  customerName: string | null;
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
  pricing: { mode: string; totalCents: number | null };
  status: "new" | "quote_requested";
};

export interface HistoryWriter {
  appendHistoryEvent(id: string, entry: Record<string, unknown>): Promise<void>;
}

/**
 * Orchestration extraite du Route Handler pour rester testable sans mock de
 * next/server : construit le payload e-mail, appelle le notifier, puis
 * journalise le résultat dans reservations.history. event_id = id +
 * ":new_booking" — stable, jamais recalculé différemment d'un appel à
 * l'autre pour une même réservation, garantissant qu'un futur mécanisme de
 * retry pourrait le réutiliser tel quel sans dupliquer l'événement.
 */
export async function notifyOwnerOfNewBooking(
  notifier: OwnerNotifier,
  historyWriter: HistoryWriter,
  id: string,
  reference: string,
  context: NewBookingNotificationContext,
  customerPhone: string,
): Promise<void> {
  const eventId = `${id}:new_booking`;
  const payload: NewBookingEmailPayload = {
    reservationId: id,
    reference,
    createdAt: context.createdAt,
    customerName: context.customerName,
    customerPhone,
    customerEmail: context.customerEmail,
    pickupAddress: context.pickupAddress,
    destinationAddress: context.destinationAddress,
    pickupAt: context.pickupAt,
    distanceMeters: context.distanceMeters,
    durationSeconds: context.durationSeconds,
    vehicleLabel: context.vehicleLabel,
    passengers: context.passengers,
    luggage: context.luggage,
    optionsSummary: context.optionsSummary,
    estimatedPriceLabel: PRICE_TO_CALCULATE_LABEL,
    confirmedPriceLabel: null,
    status: context.status,
  };

  try {
    const result = await notifier.notifyNewBooking(payload);
    if (result.outcome === "success") {
      await historyWriter.appendHistoryEvent(id, {
        action: "owner_email_notification_sent",
        message: "E-mail propriétaire envoyé via Brevo",
        channel: "email",
        event_id: eventId,
      });
      return;
    }
    if (result.outcome === "skipped") {
      await historyWriter.appendHistoryEvent(id, {
        action: "owner_email_notification_skipped",
        message: "Notification propriétaire non configurée",
        channel: "email",
        event_id: eventId,
        error_code: result.errorCode,
      });
      return;
    }
    await historyWriter.appendHistoryEvent(id, {
      action: "owner_email_notification_failed",
      message: "L’e-mail propriétaire via Brevo a échoué",
      channel: "email",
      event_id: eventId,
      error_code: result.errorCode ?? "http_error",
    });
  } catch (error) {
    console.error("owner_email_notification_unexpected_error", error instanceof Error ? error.message : "unknown_error");
  }
}

function buildOwnerWhatsAppMessage(reference: string, context: NewBookingNotificationContext, customerPhone: string): string {
  return [
    `Nouvelle demande KDRIVE ${reference}`,
    `${context.pickupAddress} → ${context.destinationAddress}`,
    formatDateTimeParis(context.pickupAt, { dateStyle: "short", timeStyle: "short" }),
    PRICE_TO_CALCULATE_LABEL,
    `Client : ${context.customerName ?? "—"} · ${customerPhone}`,
  ].join("\n");
}

/**
 * Même principe que notifyOwnerOfNewBooking (e-mail), pour le canal
 * WhatsApp. Échec silencieux en local (juste journalisé) : ne doit jamais
 * faire échouer la création de la réservation elle-même — cf. le
 * try/catch englobant, appelé depuis un after() côté route, hors du
 * chemin critique de réponse au client.
 */
export async function notifyOwnerOfNewBookingByWhatsApp(
  sender: WhatsAppSender,
  historyWriter: HistoryWriter,
  id: string,
  reference: string,
  context: NewBookingNotificationContext,
  customerPhone: string,
): Promise<void> {
  const eventId = `${id}:new_booking_whatsapp`;
  const ownerPhoneRaw = process.env.NEXT_PUBLIC_KD_DRIVER_PHONE;
  const ownerPhone = ownerPhoneRaw ? normalizePhoneForWhatsApp(ownerPhoneRaw) : null;

  if (!ownerPhone) {
    await historyWriter.appendHistoryEvent(id, {
      action: "owner_whatsapp_notification_skipped",
      message: "Numéro WhatsApp propriétaire non configuré",
      channel: "whatsapp",
      event_id: eventId,
      error_code: "not_configured",
    });
    return;
  }

  const message = buildOwnerWhatsAppMessage(reference, context, customerPhone);

  try {
    const result = await sender.sendText(ownerPhone, message);
    if (result.outcome === "success") {
      await historyWriter.appendHistoryEvent(id, {
        action: "owner_whatsapp_notification_sent",
        message: "WhatsApp propriétaire envoyé",
        channel: "whatsapp",
        event_id: eventId,
      });
      return;
    }
    if (result.outcome === "skipped") {
      await historyWriter.appendHistoryEvent(id, {
        action: "owner_whatsapp_notification_skipped",
        message: "Notification WhatsApp propriétaire non configurée",
        channel: "whatsapp",
        event_id: eventId,
        error_code: result.errorCode,
      });
      return;
    }
    await historyWriter.appendHistoryEvent(id, {
      action: "owner_whatsapp_notification_failed",
      message: "Le WhatsApp propriétaire a échoué (fenêtre de 24h expirée sans modèle de message approuvé, ou erreur API)",
      channel: "whatsapp",
      event_id: eventId,
      error_code: result.errorCode ?? "http_error",
    });
  } catch (error) {
    console.error("owner_whatsapp_notification_unexpected_error", error instanceof Error ? error.message : "unknown_error");
  }
}

function buildOwnerSmsMessage(reference: string, context: NewBookingNotificationContext, customerPhone: string): string {
  return [
    `KDRIVE ${reference}`,
    `${context.pickupAddress} -> ${context.destinationAddress}`,
    formatDateTimeParis(context.pickupAt, { dateStyle: "short", timeStyle: "short" }),
    `${PRICE_TO_CALCULATE_LABEL} - ${customerPhone}`,
  ].join("\n");
}

/**
 * Canal de secours au SMS pour la même alerte que
 * notifyOwnerOfNewBookingByWhatsApp : ne dépend pas d'une fenêtre de
 * session active côté destinataire, contrairement à WhatsApp. Même
 * discipline d'échec silencieux (journalisé, jamais propagé) : appelé
 * depuis un after() côté route, hors chemin critique de réponse au client.
 */
export async function notifyOwnerOfNewBookingBySms(
  sender: BookingSmsSender,
  historyWriter: HistoryWriter,
  id: string,
  reference: string,
  context: NewBookingNotificationContext,
  customerPhone: string,
): Promise<void> {
  const eventId = `${id}:new_booking_sms`;
  const ownerPhoneRaw = process.env.NEXT_PUBLIC_KD_DRIVER_PHONE;
  const ownerPhoneDigits = ownerPhoneRaw ? normalizePhoneForWhatsApp(ownerPhoneRaw) : null;
  const ownerPhone = ownerPhoneDigits ? `+${ownerPhoneDigits}` : null;

  if (!ownerPhone) {
    await historyWriter.appendHistoryEvent(id, {
      action: "owner_sms_notification_skipped",
      message: "Numéro SMS propriétaire non configuré",
      channel: "sms",
      event_id: eventId,
      error_code: "not_configured",
    });
    return;
  }

  const message = buildOwnerSmsMessage(reference, context, customerPhone);

  try {
    const result = await sender.sendBookingSms(ownerPhone, message);
    if (result.outcome === "success") {
      await historyWriter.appendHistoryEvent(id, {
        action: "owner_sms_notification_sent",
        message: "SMS propriétaire envoyé",
        channel: "sms",
        event_id: eventId,
      });
      return;
    }
    if (result.outcome === "skipped") {
      await historyWriter.appendHistoryEvent(id, {
        action: "owner_sms_notification_skipped",
        message: "Notification SMS propriétaire non configurée",
        channel: "sms",
        event_id: eventId,
        error_code: result.errorCode,
      });
      return;
    }
    await historyWriter.appendHistoryEvent(id, {
      action: "owner_sms_notification_failed",
      message: "Le SMS propriétaire a échoué",
      channel: "sms",
      event_id: eventId,
      error_code: result.errorCode ?? "http_error",
    });
  } catch (error) {
    console.error("owner_sms_notification_unexpected_error", error instanceof Error ? error.message : "unknown_error");
  }
}
