import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Vérification de la requête GET de souscription webhook Meta. Comparaison
 * à temps constant (comme pour la signature POST) plutôt qu'un simple
 * `===`, pour ne pas laisser de canal auxiliaire par timing sur un jeton
 * qui reste un secret partagé.
 */
export function isValidWebhookVerification({
  mode,
  token,
  expectedToken,
}: {
  mode: string | null;
  token: string | null;
  expectedToken: string;
}): boolean {
  if (mode !== "subscribe") return false;
  if (!token || !expectedToken) return false;

  const tokenBuf = Buffer.from(token, "utf8");
  const expectedBuf = Buffer.from(expectedToken, "utf8");
  if (tokenBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(tokenBuf, expectedBuf);
}

/**
 * Vérifie la signature `x-hub-signature-256` que Meta appose sur chaque
 * requête POST (HMAC SHA-256 du corps brut avec le secret d'application).
 * Le corps doit être le texte brut reçu, avant tout `JSON.parse` — signer
 * un objet re-sérialisé ne donnerait pas le même résultat.
 */
export function verifyMetaSignature({
  rawBody,
  signatureHeader,
  appSecret,
}: {
  rawBody: string;
  signatureHeader: string | null;
  appSecret: string;
}): boolean {
  if (!signatureHeader || !appSecret) return false;

  const prefix = "sha256=";
  if (!signatureHeader.startsWith(prefix)) return false;
  const providedHex = signatureHeader.slice(prefix.length);

  let providedBuf: Buffer;
  try {
    providedBuf = Buffer.from(providedHex, "hex");
  } catch {
    return false;
  }
  if (providedBuf.length === 0) return false;

  const expectedHex = createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
  const expectedBuf = Buffer.from(expectedHex, "hex");

  if (providedBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(providedBuf, expectedBuf);
}
