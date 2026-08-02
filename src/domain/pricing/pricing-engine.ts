import { eurosToCents } from "./money";
import type { PricingConfig } from "./pricing-config";
import type { PriceLine, PricingInput, PricingResult, TripType } from "./pricing-types";

/**
 * Trois types de trajet, chacun avec sa propre règle (grille validée
 * août 2026) : course standard courte (< seuil, facturation à la minute
 * au-delà des minutes incluses), course standard longue (pas de facturation
 * à la minute), transfert aéroport ou longue distance (prise en charge
 * réduite, jamais de facturation à la minute). Le minimum de catégorie ne
 * s'applique qu'aux courses standard — point explicitement laissé ouvert
 * pour les transferts aéroport/longue distance tant qu'il n'est pas confirmé
 * par le client (cf. docs/CLIENT_CONTENT_VALIDATION.md).
 */
function detectTripType(input: PricingInput, config: PricingConfig): TripType {
  const km = input.distanceMeters / 1_000;
  if (input.isAirportTrip || km >= config.longDistanceThresholdKm) return "transfer_or_long_distance";
  if (km >= config.standardShortDistanceThresholdKm) return "standard_long";
  return "standard_short";
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
  const isTransfer = tripType === "transfer_or_long_distance";

  const pricePerKmCents = eurosToCents(category.pricePerKm);
  const distanceCents = Math.round((pricePerKmCents * input.distanceMeters) / 1_000);
  const baseFeeCents = eurosToCents(isTransfer ? config.transferBaseFee : config.standardBaseFee);

  const lines: PriceLine[] = [
    { code: "base_fee", label: "Prise en charge", amountCents: baseFeeCents },
    { code: "distance", label: "Distance", amountCents: distanceCents },
  ];

  let extraMinutesCents = 0;
  if (tripType === "standard_short") {
    const minutes = Math.round(input.durationSeconds / 60);
    const extraMinutes = Math.max(0, minutes - config.includedMinutes);
    if (extraMinutes > 0) {
      extraMinutesCents = extraMinutes * eurosToCents(config.extraMinutePrice);
      lines.push({ code: "extra_minutes", label: "Durée supplémentaire", amountCents: extraMinutesCents });
    }
  }

  const subtotalCents = baseFeeCents + distanceCents + extraMinutesCents;

  // Le minimum de catégorie ne s'applique qu'aux courses standard.
  const minimumCents = !isTransfer && category.minimumPrice != null ? eurosToCents(category.minimumPrice) : 0;
  const minimumAdjustmentCents = Math.max(0, minimumCents - subtotalCents);
  if (minimumAdjustmentCents > 0) {
    lines.push({ code: "minimum_adjustment", label: "Ajustement au minimum", amountCents: minimumAdjustmentCents });
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
