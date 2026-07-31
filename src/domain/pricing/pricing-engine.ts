import { eurosToCents } from "./money";
import type { PricingConfig } from "./pricing-config";
import type { PriceLine, PricingInput, PricingResult } from "./pricing-types";

export function calculatePrice(
  input: PricingInput,
  config: PricingConfig,
): PricingResult {
  if (!Number.isInteger(input.distanceMeters) || input.distanceMeters < 0) {
    throw new RangeError("La distance doit être un entier positif en mètres.");
  }

  const category = config.categories[input.category];
  if (!category) {
    throw new RangeError("Catégorie de véhicule inconnue.");
  }

  const common = {
    currency: config.currency,
    category: input.category,
    distanceMeters: input.distanceMeters,
    ruleVersion: config.version,
  } as const;

  if (category.mode === "quote") {
    return {
      ...common,
      mode: "quote",
      totalCents: null,
      lines: [],
      quoteReason: "category",
    };
  }

  const thresholdMeters = Math.round(config.longDistance.thresholdKm * 1_000);
  const airportException = config.longDistance.airportException && input.isAirportTrip;
  if (input.distanceMeters > thresholdMeters && !airportException) {
    return {
      ...common,
      mode: "quote",
      totalCents: null,
      lines: [],
      quoteReason: "long_distance",
    };
  }

  const baseFeeCents = eurosToCents(category.baseFee);
  const pricePerKmCents = eurosToCents(category.pricePerKm);
  const distanceCents = Math.round(
    (pricePerKmCents * input.distanceMeters) / 1_000,
  );
  const minimumCents = eurosToCents(category.minimumPrice);
  const subtotalCents = baseFeeCents + distanceCents;
  const minimumAdjustmentCents = Math.max(0, minimumCents - subtotalCents);

  const lines: PriceLine[] = [
    { code: "base_fee" as const, label: "Prise en charge", amountCents: baseFeeCents },
    { code: "distance" as const, label: "Distance", amountCents: distanceCents },
  ];

  if (minimumAdjustmentCents > 0) {
    lines.push({
      code: "minimum_adjustment",
      label: "Ajustement au minimum",
      amountCents: minimumAdjustmentCents,
    });
  }

  return {
    ...common,
    mode: "calculated",
    totalCents: subtotalCents + minimumAdjustmentCents,
    lines,
    quoteReason: null,
  };
}
