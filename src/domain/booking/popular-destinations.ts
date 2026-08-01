import type { AddressValue } from "./address";

export type PopularDestination = {
  label: string;
  secondary: string;
  icon: string;
  address: AddressValue;
};

/**
 * place_id récupérés via Google Places API (Text Search, clé serveur) le
 * 2026-08-01. Si l'un de ces lieux disparaît ou change d'ID côté Google,
 * le calcul d'itinéraire échouera pour cette suggestion précise (Google
 * Routes API renverra une erreur 400) — le repérer via un test manuel de
 * la suggestion concernée plutôt que de deviner un nouvel ID.
 */
export const popularDestinations: PopularDestination[] = [
  {
    label: "Aéroport Lyon-Saint-Exupéry",
    secondary: "69125 Colombier-Saugnieu",
    icon: "✈",
    address: {
      address: "Aéroport Lyon Saint-Exupéry, 69125 Colombier-Saugnieu, France",
      latitude: 45.7234181,
      longitude: 5.0887768,
      placeId: "ChIJzYSfACvJ9EcR8FWyyQxR3IY",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Gare Lyon Part-Dieu",
    secondary: "69003 Lyon",
    icon: "🚆",
    address: {
      address: "5 Pl. Charles Béraudier, 69003 Lyon, France",
      latitude: 45.7606,
      longitude: 4.85941,
      placeId: "ChIJKWSv_WLq9EcR-FEoq1JxCW4",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Gare Lyon Perrache",
    secondary: "69002 Lyon",
    icon: "🚆",
    address: {
      address: "14 Cr de Verdun Gensoul, 69002 Lyon, France",
      latitude: 45.7485397,
      longitude: 4.8257078,
      placeId: "ChIJ644swrTr9EcRdgKu7yu33Nw",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Place Bellecour",
    secondary: "69002 Lyon",
    icon: "📍",
    address: {
      address: "Pl. Bellecour, 69002 Lyon, France",
      latitude: 45.757746,
      longitude: 4.8321484,
      placeId: "ChIJs1rce1Pq9EcRRyCL9YWTnV0",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Vieux Lyon",
    secondary: "69005 Lyon",
    icon: "📍",
    address: {
      address: "Vieux Lyon, 69005 Lyon, France",
      latitude: 45.7629811,
      longitude: 4.8280199,
      placeId: "ChIJX39-76rr9EcRJiT3aHfJnC0",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Eurexpo Lyon",
    secondary: "69680 Chassieu",
    icon: "📍",
    address: {
      address: "Bd de l'Europe, 69680 Chassieu, France",
      latitude: 45.731008,
      longitude: 4.951443,
      placeId: "ChIJIwMoW07B9EcR0og0L1UpeA0",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Groupama Stadium",
    secondary: "69150 Décines-Charpieu",
    icon: "📍",
    address: {
      address: "10 Av. Simone Veil, 69150 Décines-Charpieu, France",
      latitude: 45.7652169,
      longitude: 4.9820302,
      placeId: "ChIJpe_WHiLH9EcRwtLfRNh9iS8",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Centre de Lyon",
    secondary: "69001 Lyon (Terreaux)",
    icon: "📍",
    address: {
      address: "Pl. des Terreaux, 69001 Lyon, France",
      latitude: 45.7674851,
      longitude: 4.8334965,
      placeId: "ChIJHb247f7q9EcRM12hB20vobI",
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
];
