import type { AddressValue } from "./address";

export type PopularDestination = {
  label: string;
  secondary: string;
  icon: string;
  address: AddressValue;
};

/**
 * placeId volontairement à null : la clé Google serveur de ce projet n'a
 * accès qu'à Routes API (Places API bloquée), donc impossible de vérifier
 * un vrai place_id sans risquer d'en fabriquer un invalide (fait échouer
 * le calcul d'itinéraire, cf. incident constaté en test). Les coordonnées
 * lat/lng suffisent à Google Routes API pour calculer le trajet.
 */
export const popularDestinations: PopularDestination[] = [
  {
    label: "Aéroport Lyon-Saint-Exupéry",
    secondary: "69125 Colombier-Saugnieu",
    icon: "✈",
    address: {
      address: "Aéroport Lyon-Saint-Exupéry, 69125 Colombier-Saugnieu",
      latitude: 45.7256,
      longitude: 5.0811,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Gare Lyon Part-Dieu",
    secondary: "69003 Lyon",
    icon: "🚆",
    address: {
      address: "Gare de Lyon Part-Dieu, 69003 Lyon",
      latitude: 45.7605,
      longitude: 4.8592,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Gare Lyon Perrache",
    secondary: "69002 Lyon",
    icon: "🚆",
    address: {
      address: "Gare de Lyon Perrache, 69002 Lyon",
      latitude: 45.7488,
      longitude: 4.8259,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Place Bellecour",
    secondary: "69002 Lyon",
    icon: "📍",
    address: {
      address: "Place Bellecour, 69002 Lyon",
      latitude: 45.7578,
      longitude: 4.832,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Vieux Lyon",
    secondary: "69005 Lyon",
    icon: "📍",
    address: {
      address: "Vieux Lyon, 69005 Lyon",
      latitude: 45.7622,
      longitude: 4.8272,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Eurexpo Lyon",
    secondary: "69680 Chassieu",
    icon: "📍",
    address: {
      address: "Eurexpo Lyon, 69680 Chassieu",
      latitude: 45.7367,
      longitude: 5.0672,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Groupama Stadium",
    secondary: "69150 Décines-Charpieu",
    icon: "📍",
    address: {
      address: "Groupama Stadium, 69150 Décines-Charpieu",
      latitude: 45.7652,
      longitude: 4.9821,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
  {
    label: "Centre de Lyon",
    secondary: "69002 Lyon",
    icon: "📍",
    address: {
      address: "Presqu'île, 69002 Lyon",
      latitude: 45.7594,
      longitude: 4.8322,
      placeId: null,
      source: "autocomplete",
      accuracyMeters: null,
    },
  },
];
