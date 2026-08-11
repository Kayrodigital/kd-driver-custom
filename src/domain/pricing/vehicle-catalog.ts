export type VehicleSlug = "essential" | "premium" | "van";

export type VehicleCatalogEntry = {
  slug: VehicleSlug;
  label: string;
  body: string;
  examples: string[];
  passengers: number;
  luggage: number;
  image: string;
  /** Minimum de course affiché comme point de départ indicatif ("à partir de X €") — jamais un tarif calculé pour un trajet donné. */
  fromPriceEuros: number;
};

export const vehicleCatalog: VehicleCatalogEntry[] = [
  {
    slug: "essential",
    label: "Essentiel",
    body: "La solution simple et économique pour vos déplacements du quotidien, seul ou en petit groupe.",
    examples: ["Kia Niro", "Hyundai Kona", "Skoda Enyaq"],
    passengers: 4,
    luggage: 3,
    image: "/images/vehicle-confort.jpg",
    fromPriceEuros: 23,
  },
  {
    slug: "premium",
    label: "Premium",
    body: "Une catégorie supérieure, plus spacieuse et plus valorisante, adaptée aux rendez-vous professionnels et aux transferts.",
    examples: ["Tesla", "BYD", "Mercedes Classe E"],
    passengers: 4,
    luggage: 3,
    image: "/images/vehicle-berline.jpg",
    fromPriceEuros: 30,
  },
  {
    slug: "van",
    label: "Van",
    body: "La solution recommandée pour les groupes, les familles et les trajets avec plusieurs bagages.",
    examples: ["Mercedes Classe V"],
    passengers: 7,
    luggage: 7,
    image: "/images/vehicle-van.jpg",
    fromPriceEuros: 45,
  },
];

/** Les modèles sont indiqués à titre d'exemple : le véhicule réellement affecté dépend de la catégorie, du trajet et des disponibilités. */
export const VEHICLE_EXAMPLES_DISCLAIMER =
  "Les modèles sont indiqués à titre d’exemple. Le véhicule réellement affecté dépend de la catégorie choisie, du trajet et des disponibilités.";
