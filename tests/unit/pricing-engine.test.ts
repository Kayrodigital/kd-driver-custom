import { describe, expect, it } from "vitest";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { calculatePrice } from "@/domain/pricing/pricing-engine";

describe("calculatePrice", () => {
  it("cas A — standard, Confort, 7 km, 12 min : 7×2+10 = 24 €", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 7_000, durationSeconds: 12 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(2_400);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas B — standard, Confort, 7 km, 24 min : 7×2+10+9 = 33 €", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 7_000, durationSeconds: 24 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(3_300);
    expect(result.lines.find((l) => l.code === "extra_minutes")?.amountCents).toBe(900);
  });

  it("cas C — standard, Confort, 12 km, 24 min : 12×2+10 = 34 € (pas de minute facturée)", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 12_000, durationSeconds: 24 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_long");
    expect(result.totalCents).toBe(3_400);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas D — aéroport, Confort, 8 km, 24 min : 8×2+5 = 21 € (aucune minute, même si < 10 km)", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 8_000, durationSeconds: 24 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.totalCents).toBe(2_100);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas E — aéroport, Confort, 20 km, 35 min : 20×2+5 = 45 €", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 20_000, durationSeconds: 35 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.totalCents).toBe(4_500);
  });

  it("cas F — longue distance, Confort, 30 km : 30×2+5 = 65 €", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 30_000, durationSeconds: 40 * 60 }, pricingConfig);
    expect(result.tripType).toBe("long_distance");
    expect(result.totalCents).toBe(6_500);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas G — standard, Luxe, 5 km, 10 min : 5×3+10 = 25 € → minimum 40 € appliqué", () => {
    const result = calculatePrice({ category: "luxe", distanceMeters: 5_000, durationSeconds: 10 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(4_000);
    expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(1_500);
  });

  it("cas H — aéroport, Luxe, 5 km, 20 min : 5×3+5 = 20 €, pas de minimum (config provisoire)", () => {
    const result = calculatePrice({ category: "luxe", distanceMeters: 5_000, durationSeconds: 20 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.totalCents).toBe(2_000);
    expect(result.lines.some((l) => l.code === "minimum_adjustment")).toBe(false);
  });

  it.each(["van", "monospace"])("cas I/J — %s reste sur devis quelle que soit la distance", (category) => {
    const result = calculatePrice({ category, distanceMeters: 12_000, durationSeconds: 20 * 60 }, pricingConfig);
    expect(result).toMatchObject({ mode: "quote", tripType: null, totalCents: null, quoteReason: "category" });
  });

  it("priorité : un trajet aéroport n'est jamais requalifié en longue distance, même au-delà de 30 km", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 45_000, durationSeconds: 50 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("airport");
    expect(result.lines.find((l) => l.code === "base_fee")?.amountCents).toBe(500);
  });

  describe("seuils de distance (10 km)", () => {
    it("9,99 km reste une course standard courte", () => {
      expect(calculatePrice({ category: "confort", distanceMeters: 9_990, durationSeconds: 600 }, pricingConfig).tripType).toBe("standard_short");
    });
    it("10 km exactement bascule en course standard longue", () => {
      expect(calculatePrice({ category: "confort", distanceMeters: 10_000, durationSeconds: 600 }, pricingConfig).tripType).toBe("standard_long");
    });
    it("10,01 km reste une course standard longue", () => {
      expect(calculatePrice({ category: "confort", distanceMeters: 10_010, durationSeconds: 600 }, pricingConfig).tripType).toBe("standard_long");
    });
  });

  describe("seuils de distance (30 km)", () => {
    it("29,99 km reste une course standard longue", () => {
      expect(calculatePrice({ category: "confort", distanceMeters: 29_990, durationSeconds: 2_400 }, pricingConfig).tripType).toBe("standard_long");
    });
    it("30 km exactement bascule en longue distance", () => {
      expect(calculatePrice({ category: "confort", distanceMeters: 30_000, durationSeconds: 2_400 }, pricingConfig).tripType).toBe("long_distance");
    });
    it("30,01 km reste en longue distance", () => {
      expect(calculatePrice({ category: "confort", distanceMeters: 30_010, durationSeconds: 2_400 }, pricingConfig).tripType).toBe("long_distance");
    });
  });

  describe("seuils de minutes incluses (15 min)", () => {
    it("15 minutes n'ajoute aucune minute supplémentaire", () => {
      const result = calculatePrice({ category: "confort", distanceMeters: 5_000, durationSeconds: 15 * 60 }, pricingConfig);
      expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
    });
    it("16 minutes facture exactement 1 minute supplémentaire", () => {
      const result = calculatePrice({ category: "confort", distanceMeters: 5_000, durationSeconds: 16 * 60 }, pricingConfig);
      expect(result.lines.find((l) => l.code === "extra_minutes")?.amountCents).toBe(100);
    });
  });

  it("refuse une catégorie, une distance ou une durée invalides", () => {
    expect(() => calculatePrice({ category: "inconnue", distanceMeters: 1_000, durationSeconds: 300 }, pricingConfig)).toThrow();
    expect(() => calculatePrice({ category: "berline", distanceMeters: 1.2, durationSeconds: 300 }, pricingConfig)).toThrow();
    expect(() => calculatePrice({ category: "berline", distanceMeters: 1_000, durationSeconds: -1 }, pricingConfig)).toThrow();
  });
});
