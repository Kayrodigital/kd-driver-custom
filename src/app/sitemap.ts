import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

const PUBLIC_PATHS = [
  "/",
  "/a-propos",
  "/chauffeur-entreprise",
  "/contact",
  "/faq",
  "/longues-distances",
  "/mise-a-disposition",
  "/tarifs",
  "/transfert-aeroport",
  "/transfert-gare",
  /**
   * Nouvelle page de ce sprint (aéroport / gare TGV Saint-Exupéry) —
   * ajoutée explicitement à la demande du brief, contrairement aux
   * satellites gare précédents (Part-Dieu, Perrache, Villeurbanne,
   * Grenoble, Bron, Saint-Priest) dont la publication au sitemap reste
   * une décision client en attente, hors périmètre de ce sprint.
   */
  "/vtc-gare-lyon-saint-exupery-tgv",
  "/vehicules",
  /**
   * Pages enrichies et vérifiées (dossier documentaire sourcé), passées à
   * `readyForIndexing` — 9 arrondissements de Lyon + 7 communes
   * périurbaines. Ne pas y ajouter les autres communes de
   * `communes-content.ts` restées `needsEnrichment` (sourcing générique à
   * consolider), ni les pages satellites (Villeurbanne, Bron, Saint-Priest,
   * Part-Dieu, Perrache, Grenoble) dont la publication au sitemap reste une
   * décision client en attente, cf. note ci-dessus.
   */
  "/vtc-lyon-1er-arrondissement",
  "/vtc-lyon-2e-arrondissement",
  "/vtc-lyon-3e-arrondissement",
  "/vtc-lyon-4e-arrondissement",
  "/vtc-lyon-5e-arrondissement",
  "/vtc-lyon-6e-arrondissement",
  "/vtc-lyon-7e-arrondissement",
  "/vtc-lyon-8e-arrondissement",
  "/vtc-lyon-9e-arrondissement",
  "/vtc-vaulx-en-velin",
  "/vtc-meyzieu",
  "/vtc-caluire-et-cuire",
  "/vtc-ecully",
  "/vtc-tassin-la-demi-lune",
  "/vtc-venissieux",
  "/vtc-oullins-pierre-benite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
