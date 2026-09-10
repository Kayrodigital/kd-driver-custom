import type { LocalPageContent } from "./local-page-template";
import { arrondissementsPages } from "./arrondissements-content";
import { communesPages } from "./communes-content";
import { longueDistancePages } from "./longue-distance-content";
import { skiPages } from "./ski-content";
import { venuesPages } from "./venues-content";

/**
 * Registre central des nouvelles pages destinationnelles (sprint
 * "architecture zones et destinations"). Servi par la route dynamique
 * src/app/(site)/[slug]/page.tsx.
 *
 * Ne contient PAS les pages qui possèdent déjà un fichier de route dédié
 * (villeurbanne, bron, saint-priest, part-dieu, perrache, gare TGV,
 * grenoble — cf. local-pages-content.ts et leurs page.tsx respectifs) : ces
 * URL existantes sont conservées telles quelles, sans doublon, conformément
 * à l'audit de ce sprint.
 */
export const allDestinationPages: LocalPageContent[] = [
  ...arrondissementsPages,
  ...communesPages,
  ...longueDistancePages,
  ...skiPages,
  ...venuesPages,
];

export function findDestinationPage(slug: string): LocalPageContent | undefined {
  return allDestinationPages.find((page) => page.slug === slug);
}
