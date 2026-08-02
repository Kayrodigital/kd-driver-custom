export type PricingMode = "calculated" | "quote";

/**
 * Quatre types distincts, évalués dans cet ordre de priorité strict :
 * 1. airport (transfert aéroport, quelle que soit la distance) ;
 * 2. long_distance (seuil de distance métier, jamais évalué pour un
 *    trajet aéroport) ;
 * 3. standard_short / standard_long (seuil des 10 km).
 * Ne jamais fusionner airport et long_distance sous un même type : leurs
 * règles de minimum de catégorie peuvent diverger (cf. minimumByTripType).
 */
export type TripType = "standard_short" | "standard_long" | "airport" | "long_distance";

export type PriceLine = {
  code: "base_fee" | "distance" | "extra_minutes" | "minimum_adjustment";
  label: string;
  amountCents: number;
};
export type PricingResult = {
  mode: PricingMode;
  currency: "EUR";
  category: string;
  distanceMeters: number;
  durationSeconds: number;
  tripType: TripType | null;
  totalCents: number | null;
  lines: PriceLine[];
  quoteReason: "category" | null;
  ruleVersion: string;
};

export type PricingInput = {
  category: string;
  distanceMeters: number;
  durationSeconds: number;
  /**
   * Calculé côté appelant par `detectAirportTrip` (cf. airport-detection.ts) :
   * place_id/alias reconnu en priorité, numéro de vol en dernier recours
   * uniquement. Reste imparfait tant qu'aucun champ trip_type explicite
   * n'existe dans le tunnel — cf. docs/CLIENT_CONTENT_VALIDATION.md.
   */
  isAirportTrip?: boolean;
};
