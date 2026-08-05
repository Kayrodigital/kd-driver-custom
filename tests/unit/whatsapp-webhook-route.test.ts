import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "@/app/api/webhooks/whatsapp/route";

const originalEnv = { ...process.env };
const VERIFY_TOKEN = "kd-verify-test-token";
const APP_SECRET = "kd-app-secret-test";
const BASE_URL = "https://www.kdrive-vtc-lyon.fr/api/webhooks/whatsapp";

beforeEach(() => {
  process.env = { ...originalEnv, META_WEBHOOK_VERIFY_TOKEN: VERIFY_TOKEN, META_APP_SECRET: APP_SECRET };
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  process.env = { ...originalEnv };
  vi.restoreAllMocks();
});

function signBody(body: string, secret: string): string {
  return `sha256=${createHmac("sha256", secret).update(body, "utf8").digest("hex")}`;
}

describe("GET /api/webhooks/whatsapp", () => {
  it("retourne exactement hub.challenge avec un statut 200 quand le token est correct", async () => {
    const url = `${BASE_URL}?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=123456`;
    const response = await GET(new Request(url));
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("123456");
  });

  it("retourne 403 quand le token est incorrect", async () => {
    const url = `${BASE_URL}?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123456`;
    const response = await GET(new Request(url));
    expect(response.status).toBe(403);
  });

  it("retourne 403 sans challenge", async () => {
    const url = `${BASE_URL}?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}`;
    const response = await GET(new Request(url));
    expect(response.status).toBe(403);
  });

  it("n'expose jamais le token attendu dans la réponse d'échec", async () => {
    const url = `${BASE_URL}?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123456`;
    const response = await GET(new Request(url));
    const text = await response.text();
    expect(text).not.toContain(VERIFY_TOKEN);
  });

  it("ne journalise jamais le verify token", async () => {
    const logSpy = vi.spyOn(console, "error");
    const url = `${BASE_URL}?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123456`;
    await GET(new Request(url));
    const loggedCalls = logSpy.mock.calls.flat().map(String).join(" ");
    expect(loggedCalls).not.toContain(VERIFY_TOKEN);
    expect(loggedCalls).not.toContain("wrong");
  });

  it("retourne 403 quand META_WEBHOOK_VERIFY_TOKEN n'est pas configuré côté serveur", async () => {
    delete process.env.META_WEBHOOK_VERIFY_TOKEN;
    const url = `${BASE_URL}?hub.mode=subscribe&hub.verify_token=anything&hub.challenge=123456`;
    const response = await GET(new Request(url));
    expect(response.status).toBe(403);
  });
});

describe("POST /api/webhooks/whatsapp", () => {
  const samplePayload = JSON.stringify({
    entry: [{ changes: [{ value: { statuses: [{ id: "wamid.TEST1234", status: "delivered", timestamp: "1735689600" }] } }] }],
  });

  it("accepte un POST avec signature valide et retourne 200", async () => {
    const signature = signBody(samplePayload, APP_SECRET);
    const response = await POST(
      new Request(BASE_URL, { method: "POST", body: samplePayload, headers: { "x-hub-signature-256": signature, "content-type": "application/json" } }),
    );
    expect(response.status).toBe(200);
  });

  it("rejette un POST avec signature invalide (403)", async () => {
    const response = await POST(
      new Request(BASE_URL, { method: "POST", body: samplePayload, headers: { "x-hub-signature-256": "sha256=invalid", "content-type": "application/json" } }),
    );
    expect(response.status).toBe(403);
  });

  it("accepte un POST sans META_APP_SECRET configuré (comportement documenté : accepté mais non vérifié)", async () => {
    delete process.env.META_APP_SECRET;
    const response = await POST(new Request(BASE_URL, { method: "POST", body: samplePayload, headers: { "content-type": "application/json" } }));
    expect(response.status).toBe(200);
  });

  it("répond 200 sur un payload de structure inconnue plutôt que de faire échouer le webhook", async () => {
    const unknownPayload = JSON.stringify({ some: "unexpected-shape" });
    const signature = signBody(unknownPayload, APP_SECRET);
    const response = await POST(
      new Request(BASE_URL, { method: "POST", body: unknownPayload, headers: { "x-hub-signature-256": signature, "content-type": "application/json" } }),
    );
    expect(response.status).toBe(200);
  });

  it("traite un statut delivered sans erreur", async () => {
    const signature = signBody(samplePayload, APP_SECRET);
    const response = await POST(
      new Request(BASE_URL, { method: "POST", body: samplePayload, headers: { "x-hub-signature-256": signature, "content-type": "application/json" } }),
    );
    expect(response.status).toBe(200);
  });

  it("traite un statut failed sans erreur", async () => {
    const failedPayload = JSON.stringify({ entry: [{ changes: [{ value: { statuses: [{ id: "wamid.FAIL999", status: "failed", timestamp: "1735689600" }] } }] }] });
    const signature = signBody(failedPayload, APP_SECRET);
    const response = await POST(
      new Request(BASE_URL, { method: "POST", body: failedPayload, headers: { "x-hub-signature-256": signature, "content-type": "application/json" } }),
    );
    expect(response.status).toBe(200);
  });

  it("ne journalise jamais l'app secret ni la signature complète", async () => {
    const logSpy = vi.spyOn(console, "log");
    const errorSpy = vi.spyOn(console, "error");
    const signature = signBody(samplePayload, APP_SECRET);
    await POST(new Request(BASE_URL, { method: "POST", body: samplePayload, headers: { "x-hub-signature-256": signature, "content-type": "application/json" } }));
    const logged = [...logSpy.mock.calls, ...errorSpy.mock.calls].flat().map((v) => JSON.stringify(v)).join(" ");
    expect(logged).not.toContain(APP_SECRET);
    expect(logged).not.toContain(signature);
  });
});
