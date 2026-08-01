import { describe, expect, it } from "vitest";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { minimumApplied, priceHeadline } from "@/domain/pricing/pricing-display";

describe("pricing-display", () => {
  it("affiche le tarif estimé quand le calcul dépasse le minimum (Berline)", () => {
    const pricing = calculatePrice({ category: "berline", distanceMeters: 10_000 }, pricingConfig);
    expect(minimumApplied(pricing)).toBe(false);
    expect(priceHeadline(pricing)).toMatch(/^Tarif estimé : 27,50\s€$/);
  });

  it("affiche la mention minimum de course quand le calcul est sous le minimum (Berline)", () => {
    const pricing = calculatePrice({ category: "berline", distanceMeters: 1_000 }, pricingConfig);
    expect(minimumApplied(pricing)).toBe(true);
    expect(priceHeadline(pricing)).toMatch(/^25,00\s€ — minimum de course appliqué$/);
  });

  it("affiche le tarif estimé pour Confort au-dessus du minimum", () => {
    const pricing = calculatePrice({ category: "confort", distanceMeters: 10_000 }, pricingConfig);
    expect(priceHeadline(pricing)).toMatch(/^Tarif estimé : 25,00\s€$/);
  });

  it("affiche 'Sur devis' pour Luxe, Van et Monospace", () => {
    for (const category of ["luxe", "van", "monospace"]) {
      const pricing = calculatePrice({ category, distanceMeters: 10_000 }, pricingConfig);
      expect(priceHeadline(pricing)).toBe("Sur devis");
    }
  });
});
