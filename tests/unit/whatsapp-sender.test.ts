import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MetaWhatsAppSender } from "@/infrastructure/notifications/whatsapp-sender";

const originalEnv = { ...process.env };

function setWhatsAppEnv() {
  process.env.META_WHATSAPP_ACCESS_TOKEN = "fake-token";
  process.env.META_WHATSAPP_PHONE_NUMBER_ID = "1234567890";
}

describe("MetaWhatsAppSender", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("retourne skipped si une variable Meta manque", async () => {
    delete process.env.META_WHATSAPP_ACCESS_TOKEN;
    const sender = new MetaWhatsAppSender();
    const result = await sender.sendText("33688863419", "test");
    expect(result).toEqual({ outcome: "skipped", errorCode: "not_configured" });
  });

  it("retourne success quand l'API Meta répond avec un id de message", async () => {
    setWhatsAppEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ messages: [{ id: "wamid.ABC" }] }), { status: 200 })));
    const sender = new MetaWhatsAppSender();
    const result = await sender.sendText("33688863419", "test");
    expect(result).toEqual({ outcome: "success" });
  });

  it("envoie le bon corps de requête (destinataire, texte, type)", async () => {
    setWhatsAppEnv();
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ messages: [{ id: "wamid.ABC" }] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const sender = new MetaWhatsAppSender();
    await sender.sendText("33688863419", "Nouvelle demande KDRIVE");

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain("1234567890/messages");
    expect(options.headers.Authorization).toBe("Bearer fake-token");
    const body = JSON.parse(options.body);
    expect(body).toEqual({ messaging_product: "whatsapp", to: "33688863419", type: "text", text: { body: "Nouvelle demande KDRIVE" } });
  });

  it("retourne failed/http_error sur une erreur HTTP", async () => {
    setWhatsAppEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: { message: "Invalid parameter" } }), { status: 400 })));
    const sender = new MetaWhatsAppSender();
    const result = await sender.sendText("33688863419", "test");
    expect(result).toEqual({ outcome: "failed", errorCode: "http_error" });
  });

  it("retourne failed/invalid_response si la réponse ne contient pas messages", async () => {
    setWhatsAppEnv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ unexpected: true }), { status: 200 })));
    const sender = new MetaWhatsAppSender();
    const result = await sender.sendText("33688863419", "test");
    expect(result).toEqual({ outcome: "failed", errorCode: "invalid_response" });
  });

  it("retourne failed/timeout après 5 secondes sans réponse", async () => {
    setWhatsAppEnv();
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
    const sender = new MetaWhatsAppSender();
    const promise = sender.sendText("33688863419", "test");
    await vi.advanceTimersByTimeAsync(5_000);
    const result = await promise;
    expect(result).toEqual({ outcome: "failed", errorCode: "timeout" });
  });

  it("n'expose jamais le jeton d'accès dans les logs en cas d'échec", async () => {
    setWhatsAppEnv();
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("server error", { status: 500 })));
    const sender = new MetaWhatsAppSender();
    await sender.sendText("33688863419", "test");
    const loggedCalls = errorSpy.mock.calls.flat().map(String).join(" ");
    expect(loggedCalls).not.toContain("fake-token");
    errorSpy.mockRestore();
  });
});
