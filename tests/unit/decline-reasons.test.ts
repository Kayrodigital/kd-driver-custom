import { describe, expect, it } from "vitest";
import {
  DECLINE_REASON_CODES,
  buildDeclineClientMessage,
  declineReasonLabel,
  isDeclineReasonCode,
} from "@/domain/dispatch/decline-reasons";

describe("isDeclineReasonCode", () => {
  it("accepte chaque code de la liste fermée", () => {
    for (const code of DECLINE_REASON_CODES) {
      expect(isDeclineReasonCode(code)).toBe(true);
    }
  });

  it("rejette un code inconnu", () => {
    expect(isDeclineReasonCode("motif_invente")).toBe(false);
    expect(isDeclineReasonCode("")).toBe(false);
  });
});

describe("declineReasonLabel", () => {
  it("fournit un libellé français lisible pour chaque motif", () => {
    for (const code of DECLINE_REASON_CODES) {
      const label = declineReasonLabel(code);
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    }
  });
});

describe("buildDeclineClientMessage", () => {
  const reservation = { publicReference: "KD-2026-00042" };

  it("inclut toujours la référence de réservation", () => {
    for (const code of DECLINE_REASON_CODES) {
      expect(buildDeclineClientMessage(code, reservation)).toContain("KD-2026-00042");
    }
  });

  it("produit un message différent par motif", () => {
    const messages = DECLINE_REASON_CODES.map((code) => buildDeclineClientMessage(code, reservation));
    expect(new Set(messages).size).toBe(DECLINE_REASON_CODES.length);
  });

  it("ne contient aucune donnée sensible (téléphone, adresse) — uniquement la référence", () => {
    for (const code of DECLINE_REASON_CODES) {
      const message = buildDeclineClientMessage(code, reservation);
      expect(message).not.toMatch(/\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}/);
    }
  });

  it("reste poli et invite à recontacter KDRIVE", () => {
    const message = buildDeclineClientMessage("no_driver_available", reservation);
    expect(message).toMatch(/Bonjour/);
    expect(message.toLowerCase()).toContain("recontacter");
  });
});
