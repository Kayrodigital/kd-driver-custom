import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BrevoOwnerNotifier, type NewBookingEmailPayload } from "@/infrastructure/notifications/owner-notifier";

const payload: NewBookingEmailPayload = {
  reservationId: "11111111-1111-1111-1111-111111111111",
  reference: "KD-20260801-TEST0001",
  createdAt: "2026-08-01T10:00:00.000Z",
  customerName: "Client Test",
  customerPhone: "+33600000000",
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
  estimatedPriceLabel: "27,50 €",
  confirmedPriceLabel: null,
  status: "new",
};

const originalEnv = { ...process.env };

function setBrevoEnv() {
  process.env.BREVO_API_KEY = "fake-key";
  process.env.BREVO_FROM_EMAIL = "contact@kdrive-vtc-lyon.fr";
  process.env.BREVO_FROM_NAME = "KDRIVE";
  process.env.BREVO_OWNER_EMAIL = "owner@kdrive-vtc-lyon.fr";
  process.env.NEXT_PUBLIC_APP_URL = "https://kdrive-vtc-lyon.fr";
}

describe("BrevoOwnerNotifier", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("retourne skipped si une variable Brevo manque", async () => {
    delete process.env.BREVO_OWNER_EMAIL;
    const notifier = new BrevoOwnerNotifier();
    const result = await notifier.notifyNewBooking(payload);
    expect(result).toEqual({ outcome: "skipped", errorCode: "not_configured" });
  });

  it("retourne success quand Brevo répond 200 avec un messageId", async () => {
    setBrevoEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ messageId: "abc" }), { status: 201 })));
    const notifier = new BrevoOwnerNotifier();
    const result = await notifier.notifyNewBooking(payload);
    expect(result).toEqual({ outcome: "success" });
  });

  it("retourne failed/http_error quand Brevo répond une erreur HTTP", async () => {
    setBrevoEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("bad request", { status: 400 })));
    const notifier = new BrevoOwnerNotifier();
    const result = await notifier.notifyNewBooking(payload);
    expect(result).toEqual({ outcome: "failed", errorCode: "http_error" });
  });

  it("retourne failed/invalid_response si la réponse ne contient pas messageId", async () => {
    setBrevoEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ unexpected: true }), { status: 200 })));
    const notifier = new BrevoOwnerNotifier();
    const result = await notifier.notifyNewBooking(payload);
    expect(result).toEqual({ outcome: "failed", errorCode: "invalid_response" });
  });

  it("retourne failed/timeout après 5 secondes sans réponse", async () => {
    setBrevoEnv();
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, options: RequestInit) => {
        return new Promise((_resolve, reject) => {
          options.signal?.addEventListener("abort", () => {
            const error = new Error("aborted");
            error.name = "AbortError";
            reject(error);
          });
        });
      }),
    );
    const notifier = new BrevoOwnerNotifier();
    const promise = notifier.notifyNewBooking(payload);
    await vi.advanceTimersByTimeAsync(5_000);
    const result = await promise;
    expect(result).toEqual({ outcome: "failed", errorCode: "timeout" });
  });

  it("n'expose jamais la clé API dans les logs en cas d'échec", async () => {
    setBrevoEnv();
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("bad request", { status: 500 })));
    const notifier = new BrevoOwnerNotifier();
    await notifier.notifyNewBooking(payload);
    const loggedText = errorSpy.mock.calls.flat().join(" ");
    expect(loggedText).not.toContain("fake-key");
    errorSpy.mockRestore();
  });
});
