import "server-only";
import type { BookingConfirmedEmailPayload, BookingReceivedEmailPayload, ClientNotifier } from "./client-notifier";

export interface HistoryWriter {
  appendHistoryEvent(id: string, entry: Record<string, unknown>): Promise<void>;
}

/**
 * Même principe que notify-owner-of-new-booking.ts : orchestration testable
 * séparément du Route Handler / de la Server Action, event_id stable par
 * type d'événement pour éviter toute double journalisation.
 */
export async function notifyClientOfBookingReceived(
  notifier: ClientNotifier,
  historyWriter: HistoryWriter,
  id: string,
  payload: BookingReceivedEmailPayload,
): Promise<NotifyOutcomeSummary> {
  const eventId = `${id}:client_booking_received`;
  try {
    const result = await notifier.notifyBookingReceived(payload);
    await logOutcome(historyWriter, id, eventId, "booking_received", result);
    return result;
  } catch (error) {
    console.error("client_booking_received_notification_unexpected_error", error instanceof Error ? error.message : "unknown_error");
    return { outcome: "failed", errorCode: "http_error" };
  }
}

export async function notifyClientOfBookingConfirmed(
  notifier: ClientNotifier,
  historyWriter: HistoryWriter,
  id: string,
  payload: BookingConfirmedEmailPayload,
): Promise<NotifyOutcomeSummary> {
  const eventId = `${id}:client_booking_confirmed`;
  try {
    const result = await notifier.notifyBookingConfirmed(payload);
    await logOutcome(historyWriter, id, eventId, "booking_confirmed", result);
    return result;
  } catch (error) {
    console.error("client_booking_confirmed_notification_unexpected_error", error instanceof Error ? error.message : "unknown_error");
    return { outcome: "failed", errorCode: "http_error" };
  }
}

type NotifyOutcomeSummary = { outcome: "success" | "skipped" | "failed"; errorCode?: string };

async function logOutcome(
  historyWriter: HistoryWriter,
  id: string,
  eventId: string,
  eventLabel: "booking_received" | "booking_confirmed",
  result: NotifyOutcomeSummary,
): Promise<void> {
  if (result.outcome === "success") {
    await historyWriter.appendHistoryEvent(id, {
      action: `client_email_${eventLabel}_sent`,
      message: "E-mail client envoyé via Brevo",
      channel: "email",
      event_id: eventId,
    });
    return;
  }
  if (result.outcome === "skipped") {
    await historyWriter.appendHistoryEvent(id, {
      action: `client_email_${eventLabel}_skipped`,
      message: "E-mail client non envoyé (non configuré ou pas d’e-mail client)",
      channel: "email",
      event_id: eventId,
      error_code: result.errorCode,
    });
    return;
  }
  await historyWriter.appendHistoryEvent(id, {
    action: `client_email_${eventLabel}_failed`,
    message: "L’e-mail client via Brevo a échoué",
    channel: "email",
    event_id: eventId,
    error_code: result.errorCode ?? "http_error",
  });
}
