/**
 * Statut éditorial interne (registre SEO) — dupliqué structurellement depuis
 * `local-page-template.tsx` / `hub-page-template.tsx` (même union de
 * littéraux) pour éviter une dépendance de `src/lib` vers `design-preview`.
 */
export type EditorialStatus = "readyForIndexing" | "needsEnrichment" | "needsBusinessConfirmation" | "draftNoIndex";

/**
 * Source unique de vérité pour l'indexabilité d'une page SEO locale
 * (arrondissements, communes, lieux, stations de ski, longues distances) :
 * utilisée à la fois pour les métadonnées `robots` (page-metadata.ts) et pour
 * la génération du sitemap (sitemap.ts), afin qu'une page ne puisse jamais
 * être indexable sans être dans le sitemap, ni l'inverse.
 *
 * - `noIndexOverride` explicite (`true`/`false`) prime toujours : il sert à
 *   publier une page `needsEnrichment` dont le contenu a été jugé suffisant
 *   malgré le statut interne (ex. pages lieux/salons), sans avoir à changer
 *   prématurément ce statut.
 * - Sans override, seul `readyForIndexing` est indexable.
 */
export function isIndexable(editorialStatus: EditorialStatus, noIndexOverride?: boolean): boolean {
  if (noIndexOverride !== undefined) return !noIndexOverride;
  return editorialStatus === "readyForIndexing";
}
