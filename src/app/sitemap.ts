import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";
import { blogCategories, indexableArticles } from "@/domain/blog/registry";
import { allDestinationPages } from "@/app/design-preview/destinations-registry";
import { localPages } from "@/app/design-preview/local-pages-content";
import { hubPages } from "@/app/design-preview/hub-pages-content";
import { isIndexable } from "@/lib/seo/editorial-status";

/**
 * Sitemap généré depuis les registres de contenu, filtré sur l'indexabilité
 * réelle de chaque page (`isIndexable`, même fonction que les métadonnées
 * `robots` des pages — cf. src/lib/seo/editorial-status.ts) : une page ne
 * peut donc jamais être indexable sans figurer ici, ni l'inverse. Testé par
 * tests/unit/sitemap.test.ts.
 *
 * `lastModified` utilise la date réelle du dernier commit ayant modifié le
 * fichier de contenu concerné (`git log -1 --format=%cs -- <fichier>`),
 * jamais `new Date()` : une date qui changerait à chaque déploiement n'est
 * pas un signal exploitable pour Google (cf. audit SEO du 02/10/2026).
 * Mise à jour manuelle de ces constantes à chaque modification notable du
 * fichier correspondant.
 */
const FILE_DATE = {
  /** src/app/(site)/*: pages statiques sans registre dédié. */
  home: "2026-09-25",
  aPropos: "2026-08-02",
  chauffeurEntreprise: "2026-08-02",
  contact: "2026-08-02",
  faq: "2026-08-02",
  longuesDistances: "2026-08-02",
  miseADisposition: "2026-08-02",
  tarifs: "2026-08-11",
  transfertAeroport: "2026-09-09",
  transfertGare: "2026-09-09",
  vehicules: "2026-08-11",
  politiqueConfidentialite: "2026-08-07",
  /** Registres de contenu (date du fichier source dans son ensemble). */
  arrondissements: "2026-09-23",
  communes: "2026-10-02",
  localPages: "2026-09-23",
  hubPages: "2026-09-10",
  venues: "2026-09-10",
  skiStations: "2026-09-10",
  longueDistance: "2026-09-10",
  englishPages: "2026-10-05",
} as const;

const DESTINATION_FAMILY_DATE: Record<string, string> = {
  arrondissement: FILE_DATE.arrondissements,
  commune: FILE_DATE.communes,
  "longue-distance": FILE_DATE.longueDistance,
  "ski-station": FILE_DATE.skiStations,
  venue: FILE_DATE.venues,
};

const STATIC_PAGES: { path: string; updatedAt: string }[] = [
  { path: "/", updatedAt: FILE_DATE.home },
  { path: "/a-propos", updatedAt: FILE_DATE.aPropos },
  { path: "/chauffeur-entreprise", updatedAt: FILE_DATE.chauffeurEntreprise },
  { path: "/contact", updatedAt: FILE_DATE.contact },
  { path: "/faq", updatedAt: FILE_DATE.faq },
  { path: "/longues-distances", updatedAt: FILE_DATE.longuesDistances },
  { path: "/mise-a-disposition", updatedAt: FILE_DATE.miseADisposition },
  { path: "/tarifs", updatedAt: FILE_DATE.tarifs },
  { path: "/transfert-aeroport", updatedAt: FILE_DATE.transfertAeroport },
  { path: "/transfert-gare", updatedAt: FILE_DATE.transfertGare },
  { path: "/vehicules", updatedAt: FILE_DATE.vehicules },
  { path: "/politique-de-confidentialite", updatedAt: FILE_DATE.politiqueConfidentialite },
  { path: "/en", updatedAt: FILE_DATE.englishPages },
  { path: "/en/airport-transfer", updatedAt: FILE_DATE.englishPages },
  { path: "/en/train-station-transfer", updatedAt: FILE_DATE.englishPages },
  { path: "/en/corporate-chauffeur", updatedAt: FILE_DATE.englishPages },
  { path: "/en/chauffeur-service", updatedAt: FILE_DATE.englishPages },
  { path: "/en/long-distance-transfers", updatedAt: FILE_DATE.englishPages },
  { path: "/en/vehicles", updatedAt: FILE_DATE.englishPages },
  { path: "/en/rates", updatedAt: FILE_DATE.englishPages },
  { path: "/en/contact", updatedAt: FILE_DATE.englishPages },
];

export function sitemapEntries(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PAGES.map(({ path, updatedAt }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(updatedAt),
  }));

  /**
   * Pages servies par la route dynamique [slug] (arrondissements, communes,
   * longues distances, stations de ski, lieux) : seules les pages
   * effectivement indexables entrent dans le sitemap.
   */
  const destinationEntries = allDestinationPages
    .filter((page) => isIndexable(page.editorialStatus, page.noIndex))
    .map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(DESTINATION_FAMILY_DATE[page.family] ?? FILE_DATE.arrondissements),
    }));

  /**
   * Pages à route dédiée (villeurbanne, bron, saint-priest, part-dieu,
   * perrache, gare routière Gerland, gare TGV, Lyon-Grenoble) : toutes
   * `readyForIndexing` et déjà indexables via leur page.tsx respective —
   * ajoutées au sitemap conformément à l'audit SEO du 02/10/2026 (la
   * décision client en attente mentionnée dans une version antérieure de ce
   * fichier est désormais tranchée).
   */
  const localPageEntries = localPages
    .filter((page) => isIndexable(page.editorialStatus, page.noIndex))
    .map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(FILE_DATE.localPages),
    }));

  /**
   * Pages hub (zones desservies + 4 secteurs de banlieue + hub stations de
   * ski) : toujours indexables via leur route dédiée, indépendamment de
   * `editorialStatus` (cf. hub-page-template.tsx, pas de champ `noIndex`
   * branché) — ajoutées au sitemap pour la même raison que ci-dessus.
   */
  const hubEntries = hubPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(FILE_DATE.hubPages),
  }));

  /**
   * Blog : page d'accueil + catégories + articles indexables uniquement
   * (`indexableArticles()` exclut les brouillons/`noIndex`). Généré depuis
   * le registre — aucun ajout manuel requis pour un nouvel article. La date
   * de la page d'accueil et de chaque catégorie reprend celle de l'article
   * le plus récent, plutôt que `new Date()`.
   */
  const articles = indexableArticles();
  const latestArticleDate = articles.reduce<string | undefined>((latest, article) => {
    return !latest || article.updatedAt > latest ? article.updatedAt : latest;
  }, undefined);

  const blogEntries = [
    { url: `${SITE_URL}/blog`, lastModified: new Date(latestArticleDate ?? FILE_DATE.home) },
    ...blogCategories.map((category) => {
      const categoryArticles = articles.filter((article) => article.categorySlug === category.slug);
      const latest = categoryArticles.reduce<string | undefined>((acc, article) => {
        return !acc || article.updatedAt > acc ? article.updatedAt : acc;
      }, undefined);
      return { url: `${SITE_URL}/blog/${category.slug}`, lastModified: new Date(latest ?? FILE_DATE.home) };
    }),
    ...articles.map((article) => ({ url: `${SITE_URL}/blog/${article.slug}`, lastModified: new Date(article.updatedAt) })),
  ];

  return [...staticEntries, ...destinationEntries, ...localPageEntries, ...hubEntries, ...blogEntries];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
