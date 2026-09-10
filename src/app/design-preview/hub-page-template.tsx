import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { SceneImage } from "./scene-image";
import { TrustBadge } from "./trust-badge";
import { SiteNav, FooterSection } from "./sections";
import { Breadcrumb } from "./breadcrumb";
import type { EditorialStatus } from "./local-page-template";

export type HubCard = { label: string; href: string; body: string };

export type HubSection = {
  eyebrow: string;
  title: string;
  intro?: string;
  cards: HubCard[];
};

export type HubPageContent = {
  slug: string;
  eyebrow: string;
  h1: string;
  title: string;
  metaDescription: string;
  heroLead: string;
  heroImage: string;
  presentationTitle: string;
  presentationBody: string[];
  sections: HubSection[];
  faq: { q: string; a: string }[];
  editorialStatus: EditorialStatus;
  noIndex?: boolean;
};

/**
 * Gabarit générique pour une page "hub" : présente plusieurs catégories de
 * pages liées sous forme de cartes, sans être elle-même une page de
 * destination unique. Sert la page centrale /zones-desservies, les 4 hubs
 * de banlieue et le hub des stations de ski — un seul composant réutilisé
 * plutôt que des fichiers bespoke dupliqués par hub.
 */
export function HubPageTemplate({ content, framed = true }: { content: HubPageContent; framed?: boolean }) {
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
            <TrustBadge />
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

      {content.sections.map((section, index) => (
        <section key={section.title} className={`kd-section ${index % 2 === 0 ? "kd-on-white" : "kd-on-cream"}`}>
          <div className="kd-container">
            <div className="kd-section-head">
              <p className="kd-eyebrow">{section.eyebrow}</p>
              <h2 className="kd-h2">{section.title}</h2>
              {section.intro && <p className="kd-body" style={{ marginTop: 8 }}>{section.intro}</p>}
            </div>
            <div className="kd-grid-3">
              {section.cards.map((card) => (
                <Link key={card.href} href={card.href} className="kd-card kd-card--hover">
                  <h3 className="kd-h4">{card.label}</h3>
                  <p className="kd-body" style={{ marginTop: 8 }}>{card.body}</p>
                  <span className="kd-card-link">Découvrir <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="kd-section kd-on-white">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <div className="kd-section-head">
            <p className="kd-eyebrow">FAQ</p>
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
          <h2 className="kd-h2">Votre chauffeur KDRIVE, en quelques secondes</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <FooterSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
