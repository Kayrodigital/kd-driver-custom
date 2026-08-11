import { describe, expect, it } from "vitest";
import { pricingConfig, type PricingConfig } from "@/domain/pricing/pricing-config";
import { calculatePrice } from "@/domain/pricing/pricing-engine";

describe("calculatePrice", () => {
  it("cas A — standard, Essentiel, 7 km, 12 min : 7×2+10 = 24 €", () => {
    const result = calculatePrice({ category: "essential", distanceMeters: 7_000, durationSeconds: 12 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(2_400);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas B — standard, Essentiel, 7 km, 24 min : 7×2+10+9 = 33 €", () => {
    const result = calculatePrice({ category: "essential", distanceMeters: 7_000, durationSeconds: 24 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(3_300);
    expect(result.lines.find((l) => l.code === "extra_minutes")?.amountCents).toBe(900);
  });

  it("cas C — standard, Essentiel, 12 km, 24 min : 12×2+10 = 34 € (pas de minute facturée)", () => {
    const result = calculatePrice({ category: "essential", distanceMeters: 12_000, durationSeconds: 24 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_long");
    expect(result.totalCents).toBe(3_400);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas D — aéroport, Essentiel, 8 km, 24 min : 8×2+5 = 21 € → minimum 23 € appliqué", () => {
    const result = calculatePrice({ category: "essential", distanceMeters: 8_000, durationSeconds: 24 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.totalCents).toBe(2_300);
    expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(200);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas E — aéroport, Essentiel, 20 km, 35 min : 20×2+5 = 45 €", () => {
    const result = calculatePrice({ category: "essential", distanceMeters: 20_000, durationSeconds: 35 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.totalCents).toBe(4_500);
  });

  it("cas F — longue distance, Essentiel, 30 km : 30×2+5 = 65 €", () => {
    const result = calculatePrice({ category: "essential", distanceMeters: 30_000, durationSeconds: 40 * 60 }, pricingConfig);
    expect(result.tripType).toBe("long_distance");
    expect(result.totalCents).toBe(6_500);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas G — standard, Van, 5 km, 10 min : 5×3+10 = 25 € → minimum 45 € appliqué", () => {
    const result = calculatePrice({ category: "van", distanceMeters: 5_000, durationSeconds: 10 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(4_500);
    expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(2_000);
  });

  it("cas H — aéroport, Van, 5 km, 20 min : 5×3+5 = 20 € → minimum 45 € appliqué aussi en aéroport (portée uniforme)", () => {
    const result = calculatePrice({ category: "van", distanceMeters: 5_000, durationSeconds: 20 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.totalCents).toBe(4_500);
    expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(2_500);
  });

  describe("minimums Essentiel (23 €) et Premium (30 €) — appliqués aux 3 types de trajet", () => {
    it("Essentiel — calcul à 16 € (3 km, 10 min) → résultat final 23 € (minimum appliqué)", () => {
      const result = calculatePrice({ category: "essential", distanceMeters: 3_000, durationSeconds: 10 * 60 }, pricingConfig);
      expect(result.totalCents).toBe(2_300);
      expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(700);
    });

    it("Essentiel — calcul exactement à 23 € (6,5 km, 10 min) → résultat final 23 €, sans ligne d'ajustement", () => {
      const result = calculatePrice({ category: "essential", distanceMeters: 6_500, durationSeconds: 10 * 60 }, pricingConfig);
      expect(result.totalCents).toBe(2_300);
      expect(result.lines.some((l) => l.code === "minimum_adjustment")).toBe(false);
    });

    it("Essentiel — calcul à 24 € (7 km, 5 min) → résultat final 24 €, minimum non déclenché", () => {
      const result = calculatePrice({ category: "essential", distanceMeters: 7_000, durationSeconds: 5 * 60 }, pricingConfig);
      expect(result.totalCents).toBe(2_400);
      expect(result.lines.some((l) => l.code === "minimum_adjustment")).toBe(false);
    });

    it("Essentiel — minimum 23 € aussi appliqué en aéroport (2 km, sous le minimum)", () => {
      const result = calculatePrice({ category: "essential", distanceMeters: 2_000, durationSeconds: 10 * 60, isAirportTrip: true }, pricingConfig);
      expect(result.tripType).toBe("airport");
      // 2×2 + 5 (frais transfert) = 9 € brut -> minimum 23 € appliqué
      expect(result.totalCents).toBe(2_300);
      expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(1_400);
    });

    it("Essentiel — minimum 23 € toujours sans effet en longue distance dans la pratique (30 km très au-dessus)", () => {
      const result = calculatePrice({ category: "essential", distanceMeters: 30_000, durationSeconds: 40 * 60 }, pricingConfig);
      expect(result.totalCents).toBe(6_500);
      expect(result.lines.some((l) => l.code === "minimum_adjustment")).toBe(false);
    });

    it("Premium — calcul à 21 € (4,4 km, 10 min) → résultat final 30 € (minimum appliqué)", () => {
      const result = calculatePrice({ category: "premium", distanceMeters: 4_400, durationSeconds: 10 * 60 }, pricingConfig);
      expect(result.totalCents).toBe(3_000);
      expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(900);
    });

    it("Premium — calcul exactement à 30 € (8 km, 10 min) → résultat final 30 €, sans ligne d'ajustement", () => {
      const result = calculatePrice({ category: "premium", distanceMeters: 8_000, durationSeconds: 10 * 60 }, pricingConfig);
      expect(result.totalCents).toBe(3_000);
      expect(result.lines.some((l) => l.code === "minimum_adjustment")).toBe(false);
    });

    it("Premium — calcul à 35 € (10 km, standard_long) → résultat final 35 €, minimum non déclenché", () => {
      const result = calculatePrice({ category: "premium", distanceMeters: 10_000, durationSeconds: 20 * 60 }, pricingConfig);
      expect(result.tripType).toBe("standard_long");
      expect(result.totalCents).toBe(3_500);
      expect(result.lines.some((l) => l.code === "minimum_adjustment")).toBe(false);
    });

    it("Premium — minimum 30 € aussi appliqué en aéroport (2 km, sous le minimum)", () => {
      const result = calculatePrice({ category: "premium", distanceMeters: 2_000, durationSeconds: 10 * 60, isAirportTrip: true }, pricingConfig);
      expect(result.tripType).toBe("airport");
      // 2×2,5 + 5 = 10 € brut -> minimum 30 € appliqué
      expect(result.totalCents).toBe(3_000);
      expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(2_000);
    });

    it("Van — le minimum (45 €) s'applique aux 3 types de trajet, contrairement à l'ancienne catégorie Luxe (portée volontairement uniformisée)", () => {
      expect(pricingConfig.categories.van).toMatchObject({
        mode: "calculated",
        pricePerKm: 3,
        minimumByTripType: { standard: 45, airport: 45, longDistance: 45 },
      });
    });
  });

  it("le mode « sur devis » du moteur n'a pas été supprimé : reste utilisable pour toute catégorie configurée ainsi", () => {
    const configWithQuoteCategory: PricingConfig = {
      ...pricingConfig,
      categories: { ...pricingConfig.categories, on_demand_test_category: { mode: "quote" } },
    };
    const result = calculatePrice({ category: "on_demand_test_category", distanceMeters: 12_000, durationSeconds: 20 * 60 }, configWithQuoteCategory);
    expect(result).toMatchObject({ mode: "quote", tripType: null, totalCents: null, quoteReason: "category" });
  });

  it("priorité : un trajet aéroport n'est jamais requalifié en longue distance, même au-delà de 30 km", () => {
    const result = calculatePrice({ category: "essential", distanceMeters: 45_000, durationSeconds: 50 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.lines.find((l) => l.code === "base_fee")?.amountCents).toBe(500);
  });

  describe("seuils de distance (10 km)", () => {
    it("9,99 km reste une course standard courte", () => {
      expect(calculatePrice({ category: "essential", distanceMeters: 9_990, durationSeconds: 600 }, pricingConfig).tripType).toBe("standard_short");
    });
    it("10 km exactement bascule en course standard longue", () => {
      expect(calculatePrice({ category: "essential", distanceMeters: 10_000, durationSeconds: 600 }, pricingConfig).tripType).toBe("standard_long");
    });
    it("10,01 km reste une course standard longue", () => {
      expect(calculatePrice({ category: "essential", distanceMeters: 10_010, durationSeconds: 600 }, pricingConfig).tripType).toBe("standard_long");
    });
  });

  describe("seuils de distance (30 km)", () => {
    it("29,99 km reste une course standard longue", () => {
      expect(calculatePrice({ category: "essential", distanceMeters: 29_990, durationSeconds: 2_400 }, pricingConfig).tripType).toBe("standard_long");
    });
    it("30 km exactement bascule en longue distance", () => {
      expect(calculatePrice({ category: "essential", distanceMeters: 30_000, durationSeconds: 2_400 }, pricingConfig).tripType).toBe("long_distance");
    });
    it("30,01 km reste en longue distance", () => {
      expect(calculatePrice({ category: "essential", distanceMeters: 30_010, durationSeconds: 2_400 }, pricingConfig).tripType).toBe("long_distance");
    });
  });

  describe("seuils de minutes incluses (15 min)", () => {
    it("15 minutes n'ajoute aucune minute supplémentaire", () => {
      const result = calculatePrice({ category: "essential", distanceMeters: 5_000, durationSeconds: 15 * 60 }, pricingConfig);
      expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
    });
    it("16 minutes facture exactement 1 minute supplémentaire", () => {
      const result = calculatePrice({ category: "essential", distanceMeters: 5_000, durationSeconds: 16 * 60 }, pricingConfig);
      expect(result.lines.find((l) => l.code === "extra_minutes")?.amountCents).toBe(100);
    });
  });

  it("refuse une catégorie, une distance ou une durée invalides", () => {
    expect(() => calculatePrice({ category: "inconnue", distanceMeters: 1_000, durationSeconds: 300 }, pricingConfig)).toThrow();
    expect(() => calculatePrice({ category: "premium", distanceMeters: 1.2, durationSeconds: 300 }, pricingConfig)).toThrow();
    expect(() => calculatePrice({ category: "premium", distanceMeters: 1_000, durationSeconds: -1 }, pricingConfig)).toThrow();
  });
});
