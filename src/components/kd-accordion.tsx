import Link from "next/link";

/**
 * Accordéon SEO partagé — Server Component (pas de "use client"), basé sur
 * <details>/<summary> natifs : le contenu est présent dans le HTML dès le
 * chargement (lisible par les moteurs de recherche, pas de JS requis pour
 * l'affichage initial). Remplace les blocs <details className="kd-faq-item">
 * jusqu'ici dupliqués dans chaque template (local-page, hub, gare, aéroport,
 * autres pages, blog) — même rendu, mêmes classes CSS, une seule source.
 */
export type KdAccordionItem = { q: string; a: string; link?: { href: string; label: string } };

export function KdAccordion({ items }: { items: KdAccordionItem[] }) {
  return (
    <>
      {items.map((item) => (
        <details key={item.q} className="kd-faq-item">
          <summary className="kd-h4">{item.q}</summary>
          <p className="kd-body">{item.a}</p>
          {item.link && (
            <Link className="kd-card-link" href={item.link.href}>
              {item.link.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </details>
      ))}
    </>
  );
}
