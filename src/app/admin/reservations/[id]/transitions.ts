/**
 * Règles de transition de statut (Phase 5.2B), factorisées en fonctions
 * pures pour être testées sans dépendre de Supabase, et réutilisées à
 * l'identique par les Server Actions (actions.ts) et par la fiche
 * (page.tsx) pour l'affichage conditionnel des boutons — une seule
 * source de vérité pour les deux.
 */

export const CONTACTABLE_STATUSES = new Set(["new", "quote_requested"]);
export const ACCEPTABLE_STATUSES = new Set(["new", "contacted", "quote_requested"]);
export const DECLINABLE_STATUSES = new Set(["new", "contacted", "quote_requested"]);

export type PricingContext = {
  pricingMode: string;
  pricingStatus: string | null;
  confirmedPriceCents: number | null;
};

export function priceIsConfirmed({ pricingMode, pricingStatus, confirmedPriceCents }: PricingContext): boolean {
  if (pricingMode === "quote") return confirmedPriceCents !== null;
  return pricingStatus === "confirmed" || pricingStatus === "adjusted";
}

export function canMarkContacted(status: string): boolean {
  return CONTACTABLE_STATUSES.has(status);
}

export function canAccept(status: string, pricing: PricingContext): boolean {
  return ACCEPTABLE_STATUSES.has(status) && priceIsConfirmed(pricing);
}

export function canDecline(status: string): boolean {
  return DECLINABLE_STATUSES.has(status);
}

export function canCancelConfirmed(status: string): boolean {
  return status === "confirmed";
}

export function canComplete(status: string): boolean {
  return status === "confirmed";
}
