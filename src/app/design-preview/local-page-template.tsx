import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";
import { Breadcrumb } from "./breadcrumb";

export type LocalPageContent = {
  slug: string;
  eyebrow: string;
  h1: string;
  heroLead: string;
  heroImage: string;
  presentationTitle: string;
  presentationBody: string[];
  frequentTrips: { title: string; body: string }[];
  extraTitle?: string;
  extraBody?: string;
  faq: { q: string; a: string }[];
  pillarLinksTitle: string;
  pillarLinks: { href: string; label: string }[];
};

function RelatedLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section className="kd-section kd-section--compact kd-on-cream">
      <div className="kd-container" style={{ maxWidth: 720 }}>
        <p className="kd-eyebrow">{title}</p>
        <ul className="kd-stack" style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: 16 }}>
          {links.map((link) => (
            <li key={link.href}>
              <Link className="kd-card-link" href={link.href}>
                {link.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LocalPageTemplate({ content, framed = true }: { content: LocalPageContent; framed?: boolean }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const frameStyle = framed ? { border: "1px solid var(--kd-line)", borderRadius: "var(--kd-radius-lg)", overflow: "hidden", boxShadow: "var(--kd-shadow-lg)" } : undefined;

  return (
    <div style={frameStyle}>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src={content.heroImage} alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: content.h1 }]} />
            <p className="kd-eyebrow">{content.eyebrow}</p>
            <h1 className="kd-h1">{content.h1}</h1>
            <p className="kd-lead">{content.heroLead}</p>
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" />
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Présentation</p>
          <h2 className="kd-h2">{content.presentationTitle}</h2>
          {content.presentationBody.map((paragraph) => (
            <p className="kd-body" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Trajets fréquents</p>
            <h2 className="kd-h2">Des trajets courants au départ de ce secteur</h2>
          </div>
          <div className="kd-grid-3">
            {content.frequentTrips.map((trip) => (
              <div key={trip.title} className="kd-card kd-card--flat">
                <h3 className="kd-h4">{trip.title}</h3>
                <p className="kd-body">{trip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.extraTitle && content.extraBody && (
        <section className="kd-section kd-on-cream">
          <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
            <h2 className="kd-h2">{content.extraTitle}</h2>
            <p className="kd-body">{content.extraBody}</p>
          </div>
        </section>
      )}

      <RelatedLinks title={content.pillarLinksTitle} links={content.pillarLinks} />

      <section className="kd-section kd-on-white">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <div className="kd-section-head">
            <p className="kd-eyebrow">FAQ locale</p>
            <h2 className="kd-h2">Questions fréquentes</h2>
          </div>
          {content.faq.map((item) => (
            <details key={item.q} className="kd-faq-item">
              <summary className="kd-h4">{item.q}</summary>
              <p className="kd-body">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="reserver" className="kd-section kd-on-cream">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Réservez votre chauffeur privé KDRIVE</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <FooterSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
