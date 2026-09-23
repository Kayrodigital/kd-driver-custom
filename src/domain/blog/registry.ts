import { blogArticlesEvenementsLyon } from "./articles-evenements-lyon";
import { blogCategories, findCategory } from "./categories";
import type { BlogArticle } from "./types";

export { blogCategories, findCategory };

/**
 * Registre central des articles, toutes catégories confondues. Ajouter une
 * nouvelle catégorie = créer un fichier `articles-<slug>.ts` et l'inclure
 * ici, sans toucher aux routes ni aux gabarits.
 */
export const allBlogArticles: BlogArticle[] = [...blogArticlesEvenementsLyon];

export function findArticle(slug: string): BlogArticle | undefined {
  return allBlogArticles.find((article) => article.slug === slug);
}

export function articlesByCategory(categorySlug: string): BlogArticle[] {
  return allBlogArticles.filter((article) => article.categorySlug === categorySlug);
}

/** Articles visibles dans les listings publics (accueil, page catégorie) — exclut les brouillons. */
export function publishedArticles(categorySlug?: string): BlogArticle[] {
  const list = categorySlug ? articlesByCategory(categorySlug) : allBlogArticles;
  return list.filter((article) => !article.noIndex);
}

function eventSortKey(article: BlogArticle): string {
  return article.eventStartDate ?? article.publishedAt;
}

/** Événements à venir, triés par date de début croissante. N'inclut jamais les brouillons. */
export function upcomingArticles(categorySlug?: string): BlogArticle[] {
  return publishedArticles(categorySlug)
    .filter((article) => article.status === "a-venir")
    .sort((a, b) => eventSortKey(a).localeCompare(eventSortKey(b)));
}

/** Événements terminés, les plus récents en premier. N'inclut jamais les brouillons. */
export function pastArticles(categorySlug?: string): BlogArticle[] {
  return publishedArticles(categorySlug)
    .filter((article) => article.status === "termine")
    .sort((a, b) => eventSortKey(b).localeCompare(eventSortKey(a)));
}

/** Libellé de statut affiché sur un événement terminé. */
export function endedStatusLabel(article: BlogArticle): string {
  if (article.endedLabel) return article.endedLabel;
  const year = (article.eventEndDate ?? article.eventStartDate ?? article.publishedAt).slice(0, 4);
  return `Édition ${year} terminée`;
}

/** Articles indexables — pour le sitemap. Exclut brouillons et pages noIndex. */
export function indexableArticles(): BlogArticle[] {
  return allBlogArticles.filter((article) => !article.noIndex);
}
