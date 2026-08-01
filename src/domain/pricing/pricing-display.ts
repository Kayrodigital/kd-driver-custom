import { formatEuros } from "./money";
import type { PricingResult } from "./pricing-types";

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
