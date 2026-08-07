import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TwilioBookingSmsSender } from "@/lib/twilio/send-booking-sms";

const originalEnv = { ...process.env };

function setTwilioEnv() {
  process.env.TWILIO_ACCOUNT_SID = "AC-fake-sid";
  process.env.TWILIO_AUTH_TOKEN = "fake-auth-token";
  process.env.TWILIO_MESSAGING_SERVICE_SID = "MG-fake-service-sid";
}

describe("TwilioBookingSmsSender", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("retourne skipped si une variable Twilio manque", async () => {
    delete process.env.TWILIO_AUTH_TOKEN;
    const sender = new TwilioBookingSmsSender();
    const result = await sender.sendBookingSms("+33688863419", "test");
    expect(result).toEqual({ outcome: "skipped", errorCode: "not_configured" });
  });

  it("retourne success quand l'API Twilio répond avec un sid", async () => {
    setTwilioEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ sid: "SM123" }), { status: 201 })));
    const sender = new TwilioBookingSmsSender();
    const result = await sender.sendBookingSms("+33688863419", "test");
    expect(result).toEqual({ outcome: "success" });
  });

  it("envoie le bon corps de requête (destinataire, expéditeur, texte) avec authentification Basic", async () => {
    setTwilioEnv();
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ sid: "SM123" }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    const sender = new TwilioBookingSmsSender();
    await sender.sendBookingSms("+33688863419", "Nouvelle demande KDRIVE");

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain("AC-fake-sid/Messages.json");
    expect(options.headers.Authorization).toBe(`Basic ${Buffer.from("AC-fake-sid:fake-auth-token").toString("base64")}`);
    const body = new URLSearchParams(options.body);
    expect(body.get("To")).toBe("+33688863419");
    expect(body.get("MessagingServiceSid")).toBe("MG-fake-service-sid");
    expect(body.get("Body")).toBe("Nouvelle demande KDRIVE");
  });

  it("retourne failed/http_error sur une erreur HTTP", async () => {
    setTwilioEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "Invalid From number" }), { status: 400 })));
    const sender = new TwilioBookingSmsSender();
    const result = await sender.sendBookingSms("+33688863419", "test");
    expect(result).toEqual({ outcome: "failed", errorCode: "http_error" });
  });

  it("retourne failed/invalid_response si la réponse ne contient pas sid", async () => {
    setTwilioEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ unexpected: true }), { status: 200 })));
    const sender = new TwilioBookingSmsSender();
    const result = await sender.sendBookingSms("+33688863419", "test");
    expect(result).toEqual({ outcome: "failed", errorCode: "invalid_response" });
  });

  it("retourne failed/timeout après 5 secondes sans réponse", async () => {
    setTwilioEnv();
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
    const sender = new TwilioBookingSmsSender();
    const promise = sender.sendBookingSms("+33688863419", "test");
    await vi.advanceTimersByTimeAsync(5_000);
    const result = await promise;
    expect(result).toEqual({ outcome: "failed", errorCode: "timeout" });
  });

  it("n'expose jamais le jeton d'authentification dans les logs en cas d'échec", async () => {
    setTwilioEnv();
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("server error", { status: 500 })));
    const sender = new TwilioBookingSmsSender();
    await sender.sendBookingSms("+33688863419", "test");
    const loggedCalls = errorSpy.mock.calls.flat().map(String).join(" ");
    expect(loggedCalls).not.toContain("fake-auth-token");
    errorSpy.mockRestore();
  });
});
