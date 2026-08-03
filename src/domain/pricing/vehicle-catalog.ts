export type VehicleSlug = "berline" | "confort" | "luxe" | "van" | "monospace";

export type VehicleCatalogEntry = {
  slug: VehicleSlug;
  label: string;
  body: string;
  passengers: number;
  luggage: number;
  image: string;
};

export const vehicleCatalog: VehicleCatalogEntry[] = [
  { slug: "confort", label: "Confort", body: "La solution essentielle pour vos déplacements du quotidien. Une catégorie simple, confortable et économique pour voyager seul ou en petit groupe.", passengers: 4, luggage: 3, image: "/images/vehicle-confort.jpg" },
  { slug: "berline", label: "Berline", body: "Une catégorie supérieure pour profiter d’un véhicule plus spacieux et plus valorisant. Adaptée aux rendez-vous professionnels, aux transferts et aux trajets nécessitant davantage de standing.", passengers: 4, luggage: 3, image: "/images/vehicle-berline.jpg" },
  { slug: "luxe", label: "Luxe", body: "Pour les trajets où le véhicule fait partie de l’expérience.", passengers: 3, luggage: 2, image: "/images/vehicle-luxe.jpg" },
  { slug: "van", label: "Van", body: "La solution recommandée pour les groupes, les familles et les trajets avec plusieurs bagages. Le Van offre un coffre plus important.", passengers: 7, luggage: 7, image: "/images/vehicle-van.jpg" },
  { slug: "monospace", label: "Monospace", body: "Adapté au transport de plusieurs passagers, avec un coffre plus limité qu’un Van. Pour plusieurs passagers avec de nombreux bagages, privilégiez le Van.", passengers: 8, luggage: 4, image: "/images/vehicle-monospace.jpg" },
];
