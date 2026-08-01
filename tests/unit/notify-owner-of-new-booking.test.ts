import { describe, expect, it } from "vitest";
import { notifyOwnerOfNewBooking, type NewBookingNotificationContext } from "@/infrastructure/notifications/notify-owner-of-new-booking";
import type { NewBookingEmailPayload, NotifyResult, OwnerNotifier } from "@/infrastructure/notifications/owner-notifier";

class FakeNotifier implements OwnerNotifier {
  calls: NewBookingEmailPayload[] = [];
  constructor(private readonly result: NotifyResult) {}
  async notifyNewBooking(payload: NewBookingEmailPayload) {
    this.calls.push(payload);
    return this.result;
  }
}

class FakeHistoryWriter {
  events: Array<{ id: string; entry: Record<string, unknown> }> = [];
  async appendHistoryEvent(id: string, entry: Record<string, unknown>) {
    this.events.push({ id, entry });
  }
}

const context: NewBookingNotificationContext = {
  createdAt: "2026-08-01T10:00:00.000Z",
  customerName: "Client Test",
  customerEmail: null,
  pickupAddress: "10 rue de Lyon, 69000 Lyon",
  destinationAddress: "Aéroport Lyon Saint-Exupéry",
  pickupAt: "2026-08-03T10:00:00+02:00",
  distanceMeters: 10_000,
  durationSeconds: 1_200,
  vehicleLabel: "Berline",
  passengers: 2,
  luggage: 1,
  optionsSummary: "",
  pricing: { mode: "calculated", totalCents: 2_750 },
  status: "new",
};

const RESERVATION_ID = "22222222-2222-2222-2222-222222222222";

describe("notifyOwnerOfNewBooking", () => {
  it("journalise owner_email_notification_sent avec l'event_id attendu en cas de succès", async () => {
    const notifier = new FakeNotifier({ outcome: "success" });
    const history = new FakeHistoryWriter();
    await notifyOwnerOfNewBooking(notifier, history, RESERVATION_ID, "KD-20260801-TEST0001", context, "+33600000000");
    expect(history.events).toHaveLength(1);
    expect(history.events[0].id).toBe(RESERVATION_ID);
    expect(history.events[0].entry).toMatchObject({
      action: "owner_email_notification_sent",
      channel: "email",
      event_id: `${RESERVATION_ID}:new_booking`,
    });
  });

  it("journalise owner_email_notification_failed avec le code d'erreur en cas d'échec", async () => {
    const notifier = new FakeNotifier({ outcome: "failed", errorCode: "http_error" });
    const history = new FakeHistoryWriter();
    await notifyOwnerOfNewBooking(notifier, history, RESERVATION_ID, "KD-20260801-TEST0001", context, "+33600000000");
    expect(history.events[0].entry).toMatchObject({
      action: "owner_email_notification_failed",
      error_code: "http_error",
      event_id: `${RESERVATION_ID}:new_booking`,
    });
  });

  it("journalise owner_email_notification_skipped si la configuration est absente", async () => {
    const notifier = new FakeNotifier({ outcome: "skipped", errorCode: "not_configured" });
    const history = new FakeHistoryWriter();
    await notifyOwnerOfNewBooking(notifier, history, RESERVATION_ID, "KD-20260801-TEST0001", context, "+33600000000");
    expect(history.events[0].entry).toMatchObject({
      action: "owner_email_notification_skipped",
      error_code: "not_configured",
      event_id: `${RESERVATION_ID}:new_booking`,
    });
  });

  it("construit un event_id stable, indépendant de la référence humaine", async () => {
    const notifier = new FakeNotifier({ outcome: "success" });
    const history = new FakeHistoryWriter();
    await notifyOwnerOfNewBooking(notifier, history, RESERVATION_ID, "KD-20260801-AAAAAAAA", context, "+33600000000");
    await notifyOwnerOfNewBooking(notifier, history, RESERVATION_ID, "KD-20260801-AAAAAAAA", context, "+33600000000");
    expect(history.events[0].entry.event_id).toBe(history.events[1].entry.event_id);
  });

  it("ne relance jamais si le repository échoue silencieusement (pas d'exception propagée)", async () => {
    const notifier = new FakeNotifier({ outcome: "success" });
    const history = { appendHistoryEvent: async () => { throw new Error("db down"); } };
    await expect(notifyOwnerOfNewBooking(notifier, history, RESERVATION_ID, "KD-20260801-TEST0001", context, "+33600000000")).resolves.toBeUndefined();
  });
});
