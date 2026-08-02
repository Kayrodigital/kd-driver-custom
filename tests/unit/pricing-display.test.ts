import { describe, expect, it } from "vitest";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { minimumApplied, priceHeadline, tripTypeLabel } from "@/domain/pricing/pricing-display";

describe("pricing-display", () => {
  it("affiche le tarif estimé pour une course standard ≥ 10 km (Berline, aucun minimum)", () => {
    const pricing = calculatePrice({ category: "berline", distanceMeters: 10_000, durationSeconds: 1_200 }, pricingConfig);
    expect(minimumApplied(pricing)).toBe(false);
    expect(priceHeadline(pricing)).toMatch(/^Tarif estimé : 35,00\s€$/);
  });

  it("affiche la mention minimum de course quand le calcul est sous le minimum (Luxe)", () => {
    const pricing = calculatePrice({ category: "luxe", distanceMeters: 5_000, durationSeconds: 600 }, pricingConfig);
    expect(minimumApplied(pricing)).toBe(true);
    expect(priceHeadline(pricing)).toMatch(/^40,00\s€ — minimum de course appliqué$/);
  });

  it("affiche le tarif estimé pour Confort avec des minutes supplémentaires", () => {
    const pricing = calculatePrice({ category: "confort", distanceMeters: 8_000, durationSeconds: 1_200 }, pricingConfig);
    expect(priceHeadline(pricing)).toMatch(/^Tarif estimé : 31,00\s€$/);
  });

  it("affiche 'Sur devis' pour Van et Monospace", () => {
    for (const category of ["van", "monospace"]) {
      const pricing = calculatePrice({ category, distanceMeters: 10_000, durationSeconds: 1_200 }, pricingConfig);
      expect(priceHeadline(pricing)).toBe("Sur devis");
    }
  });

  it("fournit un libellé de type de trajet cohérent", () => {
    expect(tripTypeLabel("standard_short")).toBe("Course standard de moins de 10 km");
    expect(tripTypeLabel("standard_long")).toBe("Course standard de 10 km ou plus");
    expect(tripTypeLabel("airport")).toBe("Transfert aéroport");
    expect(tripTypeLabel("long_distance")).toBe("Longue distance");
    expect(tripTypeLabel(null)).toBeNull();
  });
});
