import { describe, expect, it } from "vitest";
import { buildBookingConfirmedMessage, buildBookingReceivedMessage } from "@/domain/justificatif/justificatif-messages";

describe("buildBookingReceivedMessage", () => {
  const base = {
    publicReference: "KD-2026-00042",
    pickupAddress: "12 quai Perrache, 69002 Lyon",
    destinationAddress: "Aéroport Lyon-Saint-Exupéry, Terminal 1",
    pickupAt: "2026-08-10T13:45:00.000Z",
    estimatedPriceCents: 4500,
  };

  it("annonce un tarif estimé, pas confirmé", () => {
    const message = buildBookingReceivedMessage(base);
    expect(message).toContain("estimé");
    expect(message).not.toMatch(/tarif confirmé/i);
  });

  it("n'annonce jamais de chauffeur confirmé à ce stade", () => {
    const message = buildBookingReceivedMessage(base);
    expect(message.toLowerCase()).not.toContain("chauffeur affecté");
    expect(message).not.toMatch(/Karamba|Berline noire|AA-123-BB/);
  });

  it("indique un devis à confirmer quand aucun tarif estimé n'est disponible", () => {
    const message = buildBookingReceivedMessage({ ...base, estimatedPriceCents: null });
    expect(message).toContain("devis");
  });

  it("inclut la référence et le trajet", () => {
    const message = buildBookingReceivedMessage(base);
    expect(message).toContain("KD-2026-00042");
    expect(message).toContain(base.pickupAddress);
    expect(message).toContain(base.destinationAddress);
  });
});

describe("buildBookingConfirmedMessage", () => {
  const base = {
    publicReference: "KD-2026-00042",
    pickupAt: "2026-08-10T13:45:00.000Z",
    confirmedPriceCents: 4500,
    justificatifUrl: "https://www.kdrive-vtc-lyon.fr/api/justificatif/abc-123/pdf",
  };

  it("annonce un tarif confirmé et inclut le lien du justificatif", () => {
    const message = buildBookingConfirmedMessage(base);
    expect(message).toContain("confirmée");
    expect(message).toContain(base.justificatifUrl);
  });

  it("n'expose pas les coordonnées complètes du chauffeur dans le message court", () => {
    const message = buildBookingConfirmedMessage(base);
    expect(message).not.toMatch(/Karamba|téléphone du chauffeur/i);
  });

  it("inclut la référence", () => {
    expect(buildBookingConfirmedMessage(base)).toContain("KD-2026-00042");
  });
});
