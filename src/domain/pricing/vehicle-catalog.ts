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
  { slug: "berline", label: "Berline", body: "Confort et sobriété pour le quotidien.", passengers: 4, luggage: 3, image: "/images/vehicle-berline.jpg" },
  { slug: "confort", label: "Confort", body: "Un cran au-dessus pour les occasions importantes.", passengers: 4, luggage: 3, image: "/images/vehicle-confort.jpg" },
  { slug: "luxe", label: "Luxe", body: "Pour les trajets où le véhicule fait partie de l’expérience.", passengers: 3, luggage: 2, image: "/images/vehicle-luxe.jpg" },
  { slug: "van", label: "Van", body: "Pour les groupes et les familles.", passengers: 7, luggage: 7, image: "/images/vehicle-van.jpg" },
  { slug: "monospace", label: "Monospace", body: "Pour les groupes avec davantage de bagages.", passengers: 6, luggage: 5, image: "/images/vehicle-monospace.jpg" },
];
