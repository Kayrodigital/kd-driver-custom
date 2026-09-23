import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import type { BlogArticle } from "@/domain/blog/types";
import { Breadcrumb } from "./breadcrumb";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";
import { StatusPill, formatEventDateRange } from "./blog-cards";

export { ArticleCard, StatusPill, formatEventDateRange } from "./blog-cards";

function ArticleBody({ article }: { article: BlogArticle }) {
  return (
    <div className="kd-stack" style={{ maxWidth: 720 }}>
      {article.body.map((block, index) => {
        if (block.type === "heading") {
          return <h2 key={index} className="kd-h4">{block.text}</h2>;
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index} className="kd-body">{block.text}</p>;
      })}
    </div>
  );
}

export function BlogArticleTemplate({ article, categoryLabel }: { article: BlogArticle; categoryLabel: string }) {
  const dateRange = formatEventDateRange(article);

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

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src={article.heroImage} alt={article.heroImageAlt} className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
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
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" />
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
        <div className="kd-container">
          <ArticleBody article={article} />
        </div>
      </section>

      {article.faq && article.faq.length > 0 && (
        <section className="kd-section kd-on-cream">
          <div className="kd-container" style={{ maxWidth: 720 }}>
            <div className="kd-section-head">
              <p className="kd-eyebrow">FAQ</p>
              <h2 className="kd-h2">Questions fréquentes</h2>
            </div>
            {article.faq.map((item) => (
              <details key={item.q} className="kd-faq-item">
                <summary className="kd-h4">{item.q}</summary>
                <p className="kd-body">{item.a}</p>
              </details>
            ))}
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
