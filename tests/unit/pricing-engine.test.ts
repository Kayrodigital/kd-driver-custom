import { describe, expect, it } from "vitest";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { calculatePrice } from "@/domain/pricing/pricing-engine";

describe("calculatePrice", () => {
  it("applique le minimum Berline", () => {
    const result = calculatePrice({ category: "berline", distanceMeters: 1_000 }, pricingConfig);
    expect(result.totalCents).toBe(2_500);
    expect(result.lines.at(-1)?.code).toBe("minimum_adjustment");
  });

  it("calcule la distance sans flottant monétaire", () => {
    const result = calculatePrice({ category: "berline", distanceMeters: 10_500 }, pricingConfig);
    expect(result.totalCents).toBe(2_863);
  });

  it("applique le minimum Confort", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 2_000 }, pricingConfig);
    expect(result.totalCents).toBe(2_000);
  });

  it.each(["luxe", "van", "monospace"])("passe %s sur devis", (category) => {
    const result = calculatePrice({ category, distanceMeters: 12_000 }, pricingConfig);
    expect(result).toMatchObject({ mode: "quote", totalCents: null, quoteReason: "category" });
  });

  it("passe au devis strictement au-delà de 30 km", () => {
    expect(calculatePrice({ category: "berline", distanceMeters: 30_000 }, pricingConfig).mode).toBe("calculated");
    expect(calculatePrice({ category: "berline", distanceMeters: 30_001 }, pricingConfig).quoteReason).toBe("long_distance");
  });

  it("respecte l'exception aéroport provisoire", () => {
    const result = calculatePrice({ category: "berline", distanceMeters: 31_000, isAirportTrip: true }, pricingConfig);
    expect(result.mode).toBe("calculated");
  });

  it("refuse une catégorie et une distance invalides", () => {
    expect(() => calculatePrice({ category: "inconnue", distanceMeters: 1_000 }, pricingConfig)).toThrow();
    expect(() => calculatePrice({ category: "berline", distanceMeters: 1.2 }, pricingConfig)).toThrow();
  });
});
