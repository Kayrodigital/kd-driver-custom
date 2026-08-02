import { describe, expect, it } from "vitest";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { calculatePrice } from "@/domain/pricing/pricing-engine";

describe("calculatePrice", () => {
  it("cas A — course standard < 10 km, Confort, 7 km, 12 min : aucune minute supplémentaire", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 7_000, durationSeconds: 12 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(2_400);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas B — course standard < 10 km, Confort, 7 km, 24 min : 9 minutes supplémentaires facturées", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 7_000, durationSeconds: 24 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(3_300);
    expect(result.lines.find((l) => l.code === "extra_minutes")?.amountCents).toBe(900);
  });

  it("cas C — course standard ≥ 10 km, Confort, 12 km, 24 min : aucune facturation à la minute", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 12_000, durationSeconds: 24 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_long");
    expect(result.totalCents).toBe(3_400);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas D — transfert aéroport, Confort, 20 km, 35 min : prise en charge 5 €, aucune facturation à la minute", () => {
    const result = calculatePrice({ category: "confort", distanceMeters: 20_000, durationSeconds: 35 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("transfer_or_long_distance");
    expect(result.totalCents).toBe(4_500);
    expect(result.lines.some((l) => l.code === "extra_minutes")).toBe(false);
  });

  it("cas E — minimum Luxe appliqué sur une course standard courte", () => {
    const result = calculatePrice({ category: "luxe", distanceMeters: 5_000, durationSeconds: 10 * 60 }, pricingConfig);
    expect(result.tripType).toBe("standard_short");
    expect(result.totalCents).toBe(4_000);
    expect(result.lines.find((l) => l.code === "minimum_adjustment")?.amountCents).toBe(1_500);
  });

  it("le minimum Luxe ne s'applique pas à un transfert aéroport ou une longue distance", () => {
    const result = calculatePrice({ category: "luxe", distanceMeters: 5_000, durationSeconds: 10 * 60, isAirportTrip: true }, pricingConfig);
    expect(result.tripType).toBe("transfer_or_long_distance");
    expect(result.totalCents).toBe(2_000);
    expect(result.lines.some((l) => l.code === "minimum_adjustment")).toBe(false);
  });

  it("une distance ≥ 30 km est traitée comme longue distance même sans vol", () => {
    const result = calculatePrice({ category: "berline", distanceMeters: 31_000, durationSeconds: 40 * 60 }, pricingConfig);
    expect(result.tripType).toBe("transfer_or_long_distance");
    expect(result.mode).toBe("calculated");
  });

  it.each(["van", "monospace"])("passe %s sur devis quelle que soit la distance", (category) => {
    const result = calculatePrice({ category, distanceMeters: 12_000, durationSeconds: 20 * 60 }, pricingConfig);
    expect(result).toMatchObject({ mode: "quote", tripType: null, totalCents: null, quoteReason: "category" });
  });

  it("refuse une catégorie, une distance ou une durée invalides", () => {
    expect(() => calculatePrice({ category: "inconnue", distanceMeters: 1_000, durationSeconds: 300 }, pricingConfig)).toThrow();
    expect(() => calculatePrice({ category: "berline", distanceMeters: 1.2, durationSeconds: 300 }, pricingConfig)).toThrow();
    expect(() => calculatePrice({ category: "berline", distanceMeters: 1_000, durationSeconds: -1 }, pricingConfig)).toThrow();
  });
});
