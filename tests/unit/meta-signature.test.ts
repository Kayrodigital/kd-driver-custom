import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { isValidWebhookVerification, verifyMetaSignature } from "@/domain/webhooks/meta-signature";

describe("isValidWebhookVerification", () => {
  const expectedToken = "kd-verify-abc123";

  it("valide quand mode=subscribe et le token correspond exactement", () => {
    expect(isValidWebhookVerification({ mode: "subscribe", token: expectedToken, expectedToken })).toBe(true);
  });

  it("rejette un token incorrect", () => {
    expect(isValidWebhookVerification({ mode: "subscribe", token: "wrong-token", expectedToken })).toBe(false);
  });

  it("rejette un mode différent de subscribe", () => {
    expect(isValidWebhookVerification({ mode: "unsubscribe", token: expectedToken, expectedToken })).toBe(false);
  });

  it("rejette un token manquant", () => {
    expect(isValidWebhookVerification({ mode: "subscribe", token: null, expectedToken })).toBe(false);
  });

  it("rejette quand expectedToken n'est pas configuré", () => {
    expect(isValidWebhookVerification({ mode: "subscribe", token: "anything", expectedToken: "" })).toBe(false);
  });

  it("rejette un token de longueur différente sans lever d'exception", () => {
    expect(isValidWebhookVerification({ mode: "subscribe", token: "short", expectedToken })).toBe(false);
  });
});

describe("verifyMetaSignature", () => {
  const appSecret = "test-app-secret";
  const rawBody = JSON.stringify({ entry: [{ changes: [{ value: { messages: [{ id: "wamid.ABC" }] } }] }] });

  function sign(body: string, secret: string): string {
    return `sha256=${createHmac("sha256", secret).update(body, "utf8").digest("hex")}`;
  }

  it("valide une signature correcte", () => {
    const signatureHeader = sign(rawBody, appSecret);
    expect(verifyMetaSignature({ rawBody, signatureHeader, appSecret })).toBe(true);
  });

  it("rejette une signature calculée avec le mauvais secret", () => {
    const signatureHeader = sign(rawBody, "wrong-secret");
    expect(verifyMetaSignature({ rawBody, signatureHeader, appSecret })).toBe(false);
  });

  it("rejette un corps modifié après signature (intégrité)", () => {
    const signatureHeader = sign(rawBody, appSecret);
    const tamperedBody = rawBody.replace("ABC", "XYZ");
    expect(verifyMetaSignature({ rawBody: tamperedBody, signatureHeader, appSecret })).toBe(false);
  });

  it("rejette une en-tête de signature absente", () => {
    expect(verifyMetaSignature({ rawBody, signatureHeader: null, appSecret })).toBe(false);
  });

  it("rejette une en-tête sans le préfixe sha256=", () => {
    const hex = createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
    expect(verifyMetaSignature({ rawBody, signatureHeader: hex, appSecret })).toBe(false);
  });

  it("rejette un app secret vide", () => {
    const signatureHeader = sign(rawBody, appSecret);
    expect(verifyMetaSignature({ rawBody, signatureHeader, appSecret: "" })).toBe(false);
  });

  it("ne lève jamais d'exception sur une valeur hex invalide", () => {
    expect(() => verifyMetaSignature({ rawBody, signatureHeader: "sha256=not-hex-zz", appSecret })).not.toThrow();
    expect(verifyMetaSignature({ rawBody, signatureHeader: "sha256=not-hex-zz", appSecret })).toBe(false);
  });
});
