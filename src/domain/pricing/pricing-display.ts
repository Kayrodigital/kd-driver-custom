import { formatEuros } from "./money";
import type { PricingResult, TripType } from "./pricing-types";

const TRIP_TYPE_LABELS: Record<TripType, string> = {
  standard_short: "Course standard de moins de 10 km",
  standard_long: "Course standard de 10 km ou plus",
  airport: "Transfert aéroport",
  long_distance: "Longue distance",
};

export function tripTypeLabel(tripType: TripType | null): string | null {
  return tripType ? TRIP_TYPE_LABELS[tripType] : null;
}

export const PRICING_TRANSPARENCY_NOTE =
  "Estimation basée sur l’itinéraire Google au moment de la réservation. Le tarif définitif est confirmé par KDRIVE selon les conditions réelles du trajet et les options choisies.";

export function minimumApplied(pricing: PricingResult): boolean {
  return pricing.lines.some((line) => line.code === "minimum_adjustment");
}

export function priceHeadline(pricing: PricingResult): string {
  if (pricing.mode === "quote") return "Sur devis";
  const amount = formatEuros(pricing.totalCents ?? 0);
  return minimumApplied(pricing) ? `${amount} — minimum de course appliqué` : `Tarif estimé : ${amount}`;
}
