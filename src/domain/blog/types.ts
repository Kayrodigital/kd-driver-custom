export type ArticleStatus = "a-venir" | "termine";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogCategory = {
  slug: string;
  name: string;
  /** Intro permanente affichée en haut de la page catégorie. */
  intro: string;
};

export type BlogArticle = {
  slug: string;
  categorySlug: string;
  /** Title SEO (balise <title>). */
  title: string;
  metaDescription: string;
  h1: string;
  /** Résumé court affiché sur les cartes (accueil, catégorie). */
  excerpt: string;
  /** Dates ISO (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  eventStartDate?: string;
  eventEndDate?: string;
  eventLocation?: string;
  status: ArticleStatus;
  /**
   * Libellé affiché à la place de "Édition {année} terminée" quand la
   * prochaine édition n'est pas encore confirmée (ex. "Prochaine édition en
   * attente de confirmation"). Ignoré si status !== "termine".
   */
  endedLabel?: string;
  heroImage: string;
  heroImageAlt: string;
  body: ArticleBlock[];
  faq?: { q: string; a: string }[];
  /** Liens internes vers les pages commerciales pertinentes (maillage). */
  internalLinks: { href: string; label: string }[];
  /**
   * Brouillon / contenu temporaire : exclu des listings publics (accueil,
   * page catégorie) et du sitemap, et marqué `robots: noindex` sur sa page.
   * La page reste accessible par son URL directe.
   */
  noIndex?: boolean;
  /** Contenu de test clairement identifié comme placeholder — à ne jamais laisser passer en indexation. */
  isPlaceholder?: boolean;
  /** Sources consultées pour vérifier les faits de l'événement — usage interne, non affiché sur la page. */
  sources?: string[];
  /** Note éditoriale pour le recyclage annuel de la page (slug conservé d'une édition à l'autre) — usage interne, non affiché. */
  annualUpdate?: { keepSlug: boolean; note: string };
};
