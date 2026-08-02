import type { AddressValue } from "./address";

/**
 * Configuration centralisée des aéroports connus par KDRIVE. Un seul
 * aéroport pertinent actuellement : Lyon-Saint-Exupéry. Le place_id est
 * celui déjà confirmé dans popular-destinations.ts (récupéré via Google
 * Places, 2026-08-01) ; les alias texte servent de repli lorsque le
 * placeId n'est pas transmis (saisie manuelle, géolocalisation, ancienne
 * session sans autocomplete).
 */
export const KNOWN_AIRPORTS = [
  {
    label: "Aéroport Lyon-Saint-Exupéry",
    placeIds: ["ChIJzYSfACvJ9EcR8FWyyQxR3IY"],
    aliases: ["saint-exupery", "saint exupery", "colombier-saugnieu", "aeroport lyon"],
  },
] as const;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matchesKnownAirport(value: AddressValue | null | undefined): boolean {
  if (!value) return false;
  if (value.placeId && KNOWN_AIRPORTS.some((airport) => (airport.placeIds as readonly string[]).includes(value.placeId!))) {
    return true;
  }
  const normalizedAddress = normalize(value.address ?? "");
  if (!normalizedAddress) return false;
  return KNOWN_AIRPORTS.some((airport) => airport.aliases.some((alias) => normalizedAddress.includes(alias)));
}

export type AirportDetectionInput = {
  pickup: AddressValue;
  destination: AddressValue;
  /** Signal complémentaire uniquement — jamais suffisant seul si un signal plus fort est disponible. */
  flightNumber?: string | null;
  /** Champ métier explicite, si un jour disponible dans le tunnel (n'existe pas encore). */
  explicitTripType?: "standard" | "airport" | "long_distance" | null;
};

/**
 * Détection pure et testable, dans l'ordre de priorité validé :
 * 1. place_id reconnu (départ ou destination) — signal le plus fiable ;
 * 2. alias texte reconnu (départ ou destination) — repli si pas de place_id ;
 * 3. type de trajet explicite, si un jour fourni par l'appelant (n'existe
 *    pas encore dans le tunnel actuel) ;
 * 4. numéro de vol : signal complémentaire uniquement, utilisé seulement si
 *    aucun des signaux 1 à 3 n'a permis de conclure.
 *
 * Ne détecte jamais un aéroport à partir du seul mot « aéroport » présent
 * dans une adresse saisie librement : le matching texte se limite aux
 * alias explicitement configurés pour un aéroport reconnu, pour éviter les
 * faux positifs sur une adresse contenant ce mot sans être l'aéroport.
 */
export function detectAirportTrip(input: AirportDetectionInput): boolean {
  if (matchesKnownAirport(input.pickup) || matchesKnownAirport(input.destination)) return true;
  if (input.explicitTripType) return input.explicitTripType === "airport";
  return Boolean(input.flightNumber);
}
