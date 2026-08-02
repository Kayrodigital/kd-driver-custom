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
   * Signal actuel (fragile, documenté) : dérivé côté appelant de la
   * présence d'un numéro de vol (cf. create-booking.ts). Ne détecte ni un
   * départ depuis l'aéroport sans vol renseigné, ni une prise en charge
   * indirecte avec vol renseigné. À remplacer par un champ métier explicite
   * (trip_type saisi ou confirmé côté propriétaire) dès qu'il existera dans
   * le tunnel — cf. docs/CLIENT_CONTENT_VALIDATION.md.
   */
  isAirportTrip?: boolean;
};
