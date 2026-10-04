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

/**
 * Variante "En savoir plus" (distincte de la FAQ, qui doit rester en texte
 * simple q/a pour le JSON-LD FAQPage) : plusieurs paragraphes et des liens
 * internes optionnels par volet. Mêmes principes — Server Component,
 * <details>/<summary> natifs, contenu présent dans le HTML dès le
 * chargement.
 */
export type KdLearnMoreItem = {
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
};

export function KdLearnMoreAccordion({ items }: { items: KdLearnMoreItem[] }) {
  return (
    <>
      {items.map((item) => (
        <details key={item.title} className="kd-faq-item">
          <summary className="kd-h4">{item.title}</summary>
          {item.paragraphs.map((paragraph, index) => (
            <p key={index} className="kd-body">{paragraph}</p>
          ))}
          {item.links && item.links.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 6 }}>
              {item.links.map((link) => (
                <li key={link.href}>
                  <Link className="kd-card-link" href={link.href}>
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </details>
      ))}
    </>
  );
}
