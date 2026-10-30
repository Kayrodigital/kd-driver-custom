import type { BlogCategory } from "./types";

export const blogCategories: BlogCategory[] = [
  {
    slug: "guides-vtc",
    name: "Guides VTC à Lyon",
    intro:
      "Conseils pratiques pour réserver votre chauffeur privé à Lyon, préparer une prise en charge en gare ou à l’aéroport et choisir le véhicule adapté à votre trajet.",
  },
  {
    slug: "evenements-lyon",
    name: "Événements & salons à Lyon",
    intro:
      "Salons professionnels, congrès et grands événements à Lyon : nos guides pratiques pour organiser votre transfert depuis les gares de Lyon (Part-Dieu, Perrache), l'aéroport Lyon-Saint Exupéry, Eurexpo, le Centre de Congrès ou votre hôtel.",
  },
];

export function findCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}
