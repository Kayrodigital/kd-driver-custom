import type { BlogArticle } from "./types";

/**
 * Articles de la catégorie "evenements-lyon". Un seul article de test pour
 * l'instant (`isPlaceholder: true`, `noIndex: true`) : il valide le moteur
 * de blog (types, routing, JSON-LD, tri, maillage) sans publier de contenu
 * éditorial non vérifié. Les dates, chiffres et lieux ci-dessous sont des
 * exemples et n'ont pas été vérifiés — à remplacer avant toute publication
 * réelle (cf. `isPlaceholder`).
 */
export const blogArticlesEvenementsLyon: BlogArticle[] = [
  {
    slug: "vtc-preventica-lyon",
    categorySlug: "evenements-lyon",
    title: "[TEST] VTC Préventica Lyon | Article de démonstration | KDRIVE",
    metaDescription:
      "Article de démonstration du moteur de blog KDRIVE (contenu placeholder, non publié). Ne pas indexer.",
    h1: "[Article de test] Chauffeur privé pour Préventica Lyon",
    excerpt:
      "Article de test utilisé pour valider la structure du blog (champs, tri, maillage). Contenu à remplacer avant publication réelle.",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    eventStartDate: "2027-03-16",
    eventEndDate: "2027-03-18",
    eventLocation: "Exemple : Centre de Congrès de Lyon (à vérifier avant publication)",
    status: "a-venir",
    heroImage: "/images/corporate.jpg",
    heroImageAlt: "Illustration d'exemple pour l'article de test Préventica Lyon",
    isPlaceholder: true,
    noIndex: true,
    body: [
      {
        type: "paragraph",
        text: "Ceci est un article de test destiné à valider le moteur de blog (gabarit, données structurées, tri des événements, maillage interne). Il n'est pas indexé (`noIndex: true`) et ne doit pas être considéré comme une information vérifiée sur l'événement.",
      },
      { type: "heading", text: "Exemple de section — accès et transferts" },
      {
        type: "paragraph",
        text: "Section d'exemple : un article réel détaillerait ici les modalités de transfert depuis les gares, l'aéroport ou un hôtel vers le lieu de l'événement, une fois les informations vérifiées auprès de la source officielle.",
      },
      {
        type: "list",
        items: [
          "Exemple de point pratique 1 (à vérifier avant publication).",
          "Exemple de point pratique 2 (à vérifier avant publication).",
          "Exemple de point pratique 3 (à vérifier avant publication).",
        ],
      },
    ],
    faq: [
      {
        q: "Cet article est-il publié ?",
        a: "Non, il s'agit d'un contenu de test (`isPlaceholder: true`, `noIndex: true`) utilisé uniquement pour valider le moteur de blog.",
      },
    ],
    internalLinks: [
      { href: "/reserver", label: "Réserver un trajet" },
      { href: "/chauffeur-entreprise", label: "Chauffeur privé entreprise" },
      { href: "/vtc-lyon-part-dieu", label: "VTC Gare de la Part-Dieu" },
      { href: "/transfert-aeroport", label: "Transfert aéroport" },
    ],
  },
];
