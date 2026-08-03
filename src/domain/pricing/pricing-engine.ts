import { eurosToCents } from "./money";
import type { PricingConfig } from "./pricing-config";
import type { PriceLine, PricingInput, PricingResult, TripType } from "./pricing-types";

/**
 * Ordre de priorité strict (validé) : un trajet aéroport applique toujours
 * la règle aéroport, quelle que soit sa distance — jamais évalué comme
 * longue distance ni comme course standard. La longue distance n'est
 * évaluée qu'ensuite, sur le seuil de distance métier. Le seuil des 10 km
 * ne s'applique qu'au reste (course standard).
 */
function detectTripType(input: PricingInput, config: PricingConfig): TripType {
  if (input.isAirportTrip) return "airport";
  const km = input.distanceMeters / 1_000;
  if (km >= config.longDistanceThresholdKm) return "long_distance";
  if (km >= config.standardShortDistanceThresholdKm) return "standard_long";
  return "standard_short";
}

function minimumCentsForTripType(
  category: Extract<PricingConfig["categories"][string], { mode: "calculated" }>,
  tripType: TripType,
): number {
  const euros =
    tripType === "airport" ? category.minimumByTripType.airport
    : tripType === "long_distance" ? category.minimumByTripType.longDistance
    : category.minimumByTripType.standard;
  return euros == null ? 0 : eurosToCents(euros);
}

export function calculatePrice(
  input: PricingInput,
  config: PricingConfig,
): PricingResult {
  if (!Number.isInteger(input.distanceMeters) || input.distanceMeters < 0) {
    throw new RangeError("La distance doit être un entier positif en mètres.");
  }
  if (!Number.isInteger(input.durationSeconds) || input.durationSeconds < 0) {
    throw new RangeError("La durée doit être un entier positif en secondes.");
  }

  const category = config.categories[input.category];
  if (!category) {
    throw new RangeError("Catégorie de véhicule inconnue.");
  }

  const common = {
    currency: config.currency,
    category: input.category,
    distanceMeters: input.distanceMeters,
    durationSeconds: input.durationSeconds,
    ruleVersion: config.version,
  } as const;

  if (category.mode === "quote") {
    return {
      ...common,
      mode: "quote",
      tripType: null,
      totalCents: null,
      lines: [],
      quoteReason: "category",
    };
  }

  const tripType = detectTripType(input, config);
  const isTimedRule = tripType === "standard_short";
  const isTransferRule = tripType === "airport" || tripType === "long_distance";

  const pricePerKmCents = eurosToCents(category.pricePerKm);
  const distanceCents = Math.round((pricePerKmCents * input.distanceMeters) / 1_000);
  const baseFeeCents = eurosToCents(isTransferRule ? config.transferBaseFee : config.standardBaseFee);

  const lines: PriceLine[] = [
    { code: "base_fee", label: "Prise en charge", amountCents: baseFeeCents },
    { code: "distance", label: "Distance", amountCents: distanceCents },
  ];

  let extraMinutesCents = 0;
  if (isTimedRule) {
    const minutes = Math.round(input.durationSeconds / 60);
    const extraMinutes = Math.max(0, minutes - config.includedMinutes);
    if (extraMinutes > 0) {
      extraMinutesCents = extraMinutes * eurosToCents(config.extraMinutePrice);
      lines.push({ code: "extra_minutes", label: "Durée supplémentaire", amountCents: extraMinutesCents });
    }
  }

  const subtotalCents = baseFeeCents + distanceCents + extraMinutesCents;

  const minimumCents = minimumCentsForTripType(category, tripType);
  const minimumAdjustmentCents = Math.max(0, minimumCents - subtotalCents);
  if (minimumAdjustmentCents > 0) {
    lines.push({ code: "minimum_adjustment", label: "Ajustement au minimum de course", amountCents: minimumAdjustmentCents });
  }

  return {
    ...common,
    mode: "calculated",
    tripType,
    totalCents: subtotalCents + minimumAdjustmentCents,
    lines,
    quoteReason: null,
  };
}
