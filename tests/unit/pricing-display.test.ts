import { describe, expect, it } from "vitest";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig, type PricingConfig } from "@/domain/pricing/pricing-config";
import { minimumApplied, priceHeadline, tripTypeLabel } from "@/domain/pricing/pricing-display";

describe("pricing-display", () => {
  it("affiche le tarif estimé pour une course standard ≥ 10 km (Premium, aucun minimum)", () => {
    const pricing = calculatePrice({ category: "premium", distanceMeters: 10_000, durationSeconds: 1_200 }, pricingConfig);
    expect(minimumApplied(pricing)).toBe(false);
    expect(priceHeadline(pricing)).toMatch(/^Tarif estimé : 35,00\s€$/);
  });

  it("affiche la mention minimum de course quand le calcul est sous le minimum (Van)", () => {
    const pricing = calculatePrice({ category: "van", distanceMeters: 5_000, durationSeconds: 600 }, pricingConfig);
    expect(minimumApplied(pricing)).toBe(true);
    expect(priceHeadline(pricing)).toMatch(/^45,00\s€ — minimum de course appliqué$/);
  });

  it("affiche le tarif estimé pour Essentiel avec des minutes supplémentaires", () => {
    const pricing = calculatePrice({ category: "essential", distanceMeters: 8_000, durationSeconds: 1_200 }, pricingConfig);
    expect(priceHeadline(pricing)).toMatch(/^Tarif estimé : 31,00\s€$/);
  });

  it("affiche 'Sur devis' pour une catégorie configurée en mode devis (capacité du moteur conservée, même si aucune catégorie publique ne l'utilise plus)", () => {
    const configWithQuoteCategory: PricingConfig = {
      ...pricingConfig,
      categories: { ...pricingConfig.categories, on_demand_test_category: { mode: "quote" } },
    };
    const pricing = calculatePrice({ category: "on_demand_test_category", distanceMeters: 10_000, durationSeconds: 1_200 }, configWithQuoteCategory);
    expect(priceHeadline(pricing)).toBe("Sur devis");
  });

  it("fournit un libellé de type de trajet cohérent", () => {
    expect(tripTypeLabel("standard_short")).toBe("Course standard de moins de 10 km");
    expect(tripTypeLabel("standard_long")).toBe("Course standard de 10 km ou plus");
    expect(tripTypeLabel("airport")).toBe("Transfert aéroport");
    expect(tripTypeLabel("long_distance")).toBe("Longue distance");
    expect(tripTypeLabel(null)).toBeNull();
  });
});
