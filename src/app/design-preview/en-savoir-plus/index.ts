import type { LearnMorePage } from "./_shared";
import { villeurbanneLearnMoreTitle, villeurbanneLearnMoreItems } from "./villeurbanne";
import { arrondissementsLearnMore } from "./arrondissements";
import { communesEstNordLearnMore } from "./communes-est-nord";
import { communesOuestSudLearnMore } from "./communes-ouest-sud";
import { pagesPrincipalesLearnMore } from "./pages-principales";
import { faqLocales } from "./faq-locales";

const base: Record<string, LearnMorePage> = {
  "vtc-villeurbanne": { title: villeurbanneLearnMoreTitle, items: villeurbanneLearnMoreItems },
  ...arrondissementsLearnMore,
  ...communesEstNordLearnMore,
  ...communesOuestSudLearnMore,
  ...pagesPrincipalesLearnMore,
};

// Ajoute le volet « Questions pratiques » juste avant le volet de réservation.
function withFaq(slug: string, page: LearnMorePage): LearnMorePage {
  const faq = faqLocales[slug];
  if (!faq) return page;
  const faqItem = {
    title: `Questions pratiques ${faq.lieu}`,
    paragraphs: faq.qa.map(([q, a]) => `${q} ${a}`),
  };
  const items = [...page.items];
  items.splice(Math.max(items.length - 1, 0), 0, faqItem);
  return { ...page, items };
}

// Point d'entrée unique : contenu « En savoir plus » par slug de page.
export const learnMoreBySlug: Record<string, LearnMorePage> = Object.fromEntries(
  Object.entries(base).map(([slug, page]) => [slug, withFaq(slug, page)]),
);

export type { LearnMorePage, LearnMoreItem, LearnMoreLink } from "./_shared";
