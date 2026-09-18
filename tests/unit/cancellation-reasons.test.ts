import { describe, expect, it } from "vitest";
import {
  CANCELLATION_REASON_CODES,
  cancellationReasonLabel,
  isCancellationReasonCode,
  validateCancellationReason,
} from "@/domain/dispatch/cancellation-reasons";

describe("validateCancellationReason", () => {
  it("enregistre une annulation avec un motif valide", () => {
    const result = validateCancellationReason({ code: "driver_unavailable", note: "" });
    expect(result).toEqual({ ok: true, code: "driver_unavailable", note: null });
  });

  it("accepte chacun des 11 motifs de la liste fermée (hors « Autre » sans commentaire)", () => {
    for (const code of CANCELLATION_REASON_CODES) {
      if (code === "other") continue;
      const result = validateCancellationReason({ code, note: "" });
      expect(result.ok).toBe(true);
    }
  });

  it("bloque si aucun motif n'est sélectionné (champ vide)", () => {
    const result = validateCancellationReason({ code: "", note: "" });
    expect(result).toEqual({ ok: false, error: "cancellation_reason_required" });
  });

  it("bloque si un motif inconnu est soumis (donnée corrompue ou falsifiée)", () => {
    const result = validateCancellationReason({ code: "motif_invente", note: "" });
    expect(result).toEqual({ ok: false, error: "cancellation_reason_required" });
  });

  it("exige un commentaire quand le motif « Autre » est sélectionné", () => {
    const result = validateCancellationReason({ code: "other", note: "" });
    expect(result).toEqual({ ok: false, error: "cancellation_reason_note_required" });
  });

  it("rejette un commentaire uniquement composé d'espaces pour « Autre »", () => {
    const result = validateCancellationReason({ code: "other", note: "   " });
    expect(result).toEqual({ ok: false, error: "cancellation_reason_note_required" });
  });

  it("accepte « Autre » avec un commentaire renseigné, et le retourne nettoyé (trim)", () => {
    const result = validateCancellationReason({ code: "other", note: "  Cas particulier détaillé  " });
    expect(result).toEqual({ ok: true, code: "other", note: "Cas particulier détaillé" });
  });

  it("ignore le commentaire fourni pour un motif autre que « Autre » (jamais reporté en note)", () => {
    const result = validateCancellationReason({ code: "price_declined", note: "commentaire superflu" });
    expect(result).toEqual({ ok: true, code: "price_declined", note: null });
  });
});

describe("isCancellationReasonCode / cancellationReasonLabel", () => {
  it("fournit un libellé français non vide pour chacun des 11 motifs", () => {
    expect(CANCELLATION_REASON_CODES).toHaveLength(11);
    for (const code of CANCELLATION_REASON_CODES) {
      expect(isCancellationReasonCode(code)).toBe(true);
      const label = cancellationReasonLabel(code);
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it("expose exactement les 11 motifs demandés, dans le bon ordre d'affichage", () => {
    const labels = CANCELLATION_REASON_CODES.map(cancellationReasonLabel);
    expect(labels).toEqual([
      "Client injoignable",
      "Aucune réponse après relance",
      "Prix refusé",
      "Chauffeur indisponible",
      "Horaire incompatible",
      "Destination non desservie",
      "Client ayant trouvé un autre chauffeur",
      "Erreur de réservation",
      "Demande en double",
      "Annulation par le client",
      "Autre",
    ]);
  });

  it("rejette un code inconnu sans lever d'exception (affichage après enregistrement)", () => {
    expect(isCancellationReasonCode("")).toBe(false);
    expect(isCancellationReasonCode("motif_invente")).toBe(false);
  });

  it("reste compatible avec les anciennes réservations (colonne absente/nulle avant migration)", () => {
    // Une ancienne réservation n'a pas de cancellation_reason_code : la valeur
    // lue en base est `null`, jamais transmise telle quelle à isCancellationReasonCode
    // (le code appelant vérifie toujours la présence avant l'appel, cf.
    // page.tsx / admin/page.tsx) — on vérifie ici que la fonction ne plante
    // pas et renvoie `false` pour toute valeur non reconnue, y compris une
    // chaîne vide représentant l'absence de motif.
    expect(isCancellationReasonCode("")).toBe(false);
    expect(() => isCancellationReasonCode("")).not.toThrow();
  });
});
