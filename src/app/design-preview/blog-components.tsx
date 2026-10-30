import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import type { BlogArticle } from "@/domain/blog/types";
import { Breadcrumb } from "./breadcrumb";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";
import { StatusPill, formatEventDateRange } from "./blog-cards";
import { KdAccordion } from "@/components/kd-accordion";

export { ArticleCard, StatusPill, formatEventDateRange } from "./blog-cards";

function ArticleBody({ article }: { article: BlogArticle }) {
  const inlineCtaIndex = Math.min(2, article.body.length - 1);

  return (
    <div className="kd-blog-body">
      {article.body.map((block, index) => {
        if (block.type === "heading") {
          return (
            <div key={index}>
              <h2 id={`section-${index}`} className="kd-h4">{block.text}</h2>
              {index === inlineCtaIndex && <ArticleInlineCta />}
            </div>
          );
        }
        if (block.type === "list") {
          return (
            <div key={index}>
              <ul className="kd-body kd-blog-list">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {index === inlineCtaIndex && <ArticleInlineCta />}
            </div>
          );
        }
        return (
          <div key={index}>
            <p className="kd-body">{block.text}</p>
            {index === inlineCtaIndex && <ArticleInlineCta />}
          </div>
        );
      })}
    </div>
  );
}

function ArticleInlineCta() {
  return (
    <aside className="kd-blog-inline-cta" aria-label="Réserver un chauffeur">
      <div>
        <p className="kd-eyebrow">Votre trajet</p>
        <h3 className="kd-h3">Besoin d&apos;un chauffeur&nbsp;?</h3>
        <p>Recevez une confirmation claire avant votre départ.</p>
      </div>
      <Link className="kd-btn kd-btn--gold" href="/reserver">
        Réserver <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

export function BlogArticleTemplate({ article, categoryLabel }: { article: BlogArticle; categoryLabel: string }) {
  const dateRange = formatEventDateRange(article);
  const tableOfContents = article.body.flatMap((block, index) =>
    block.type === "heading" ? [{ label: block.text, href: `#section-${index}` }] : [],
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.h1,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    ...(article.eventStartDate
      ? {
          about: {
            "@type": "Event",
            name: article.h1,
            startDate: article.eventStartDate,
            ...(article.eventEndDate ? { endDate: article.eventEndDate } : {}),
            ...(article.eventLocation ? { location: { "@type": "Place", name: article.eventLocation } } : {}),
            eventStatus: article.status === "termine" ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
          },
        }
      : {}),
  };

  const faqJsonLd = article.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <div>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-blog-hero kd-on-dark">
        <div className="kd-container kd-blog-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: categoryLabel, href: `/blog/${article.categorySlug}` },
                { label: article.h1 },
              ]}
            />
            <p className="kd-eyebrow">{categoryLabel}</p>
            <h1 className="kd-h1">{article.h1}</h1>
            {(dateRange || article.eventLocation) && (
              <p className="kd-lead">
                {dateRange}
                {dateRange && article.eventLocation ? " · " : ""}
                {article.eventLocation}
              </p>
            )}
            <StatusPill article={article} />
          </div>
          <div className="kd-blog-hero-visual">
            <SceneImage src={article.heroImage} alt={article.heroImageAlt} className="kd-blog-hero-image" priority sizes="(max-width: 900px) 100vw, 42vw" />
            <div className="kd-blog-hero-badge" aria-hidden="true">
              <span>Service</span>
              <strong>24/7</strong>
              <span>Lyon</span>
            </div>
          </div>
        </div>
      </section>

      {article.isPlaceholder && (
        <section className="kd-section kd-section--compact kd-on-cream">
          <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
            <p className="kd-body" style={{ fontWeight: 700 }}>
              Contenu de test — cette page n&apos;est pas indexée (`noIndex`) et sert uniquement à valider le moteur de blog.
            </p>
          </div>
        </section>
      )}

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-blog-layout">
          <article className="kd-blog-article-card">
            <ArticleBody article={article} />
          </article>
          <aside className="kd-blog-sidebar" aria-label="Réservation et navigation dans l'article">
            <div className="kd-blog-booking">
              <HeroSearchForm tone="dark" />
              <ul className="kd-blog-reassurance" aria-label="Avantages de la réservation KDRIVE">
                <li>Confirmation humaine</li>
                <li>Tarif annoncé</li>
                <li>Chauffeur ponctuel</li>
                <li>Paiement sécurisé</li>
              </ul>
            </div>
            {tableOfContents.length > 0 && (
              <nav className="kd-blog-toc" aria-label="Sommaire de l'article">
                <h2 className="kd-h4">Dans ce guide</h2>
                {tableOfContents.map((item) => (
                  <Link key={item.href} href={item.href}>{item.label}</Link>
                ))}
              </nav>
            )}
            <div className="kd-blog-help">
              <p className="kd-eyebrow">Besoin d&apos;aide&nbsp;?</p>
              <h2 className="kd-h4">Une demande particulière&nbsp;?</h2>
              <a href="tel:+33688863419">06 88 86 34 19 <span aria-hidden="true">→</span></a>
            </div>
          </aside>
        </div>
      </section>

      {article.faq && article.faq.length > 0 && (
        <section className="kd-section kd-on-cream">
          <div className="kd-container" style={{ maxWidth: 720 }}>
            <div className="kd-section-head">
              <p className="kd-eyebrow">FAQ</p>
              <h2 className="kd-h2">Questions fréquentes</h2>
            </div>
            <KdAccordion items={article.faq} />
          </div>
        </section>
      )}

      <section className="kd-section kd-on-white">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <div className="kd-section-head">
            <p className="kd-eyebrow">Poursuivre</p>
            <h2 className="kd-h2">Organiser votre trajet</h2>
          </div>
          <ul className="kd-stack" style={{ marginTop: 8, listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: 16 }}>
            {article.internalLinks.map((link) => (
              <li key={link.href}>
                <Link className="kd-card-link" href={link.href}>
                  {link.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="reserver" className="kd-section kd-on-cream">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Réservez votre chauffeur privé KDRIVE</h2>
          <Link className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <FooterSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
    </div>
  );
}
