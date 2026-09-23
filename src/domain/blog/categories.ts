import type { BlogCategory } from "./types";

export const blogCategories: BlogCategory[] = [
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
