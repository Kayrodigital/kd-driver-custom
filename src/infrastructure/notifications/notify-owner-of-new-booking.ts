import "server-only";
import { formatEuros } from "@/domain/pricing/money";
import type { NewBookingEmailPayload, OwnerNotifier } from "./owner-notifier";

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
    estimatedPriceLabel: context.pricing.mode === "quote" ? "Sur devis" : formatEuros(context.pricing.totalCents ?? 0),
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
