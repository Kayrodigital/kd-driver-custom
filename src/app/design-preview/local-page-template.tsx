import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { SceneImage } from "./scene-image";
import { TrustBadge } from "./trust-badge";
import { SiteNav, FooterSection } from "./sections";
import { Breadcrumb } from "./breadcrumb";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import type { AddressValue } from "@/domain/booking/address";

export type LocalPageContent = {
  slug: string;
  eyebrow: string;
  h1: string;
  heroLead: string;
  heroImage: string;
  /** Préremplit le formulaire hero (départ ou destination, au choix de
   * l'utilisateur) avec ce lieu — voir hero-search-form.tsx. Optionnel. */
  prefillAddress?: AddressValue;
  prefillLabel?: string;
  presentationTitle: string;
  presentationBody: string[];
  /** Informations factuelles vérifiées sur une source indépendante (adresse,
   * arrondissement, accès, correspondances) — jamais un usage ou un
   * fonctionnement KDRIVE inventé. Optionnel : seules les pages gare/aéroport
   * en ont besoin pour l'instant. */
  practicalInfoTitle?: string;
  practicalInfoItems?: string[];
  /** Distingue clairement départ et arrivée quand le lieu couvre les deux
   * sens (gare, aéroport). Optionnel. */
  departureArrivalTitle?: string;
  departure?: { title: string; body: string };
  arrival?: { title: string; body: string };
  /** Explication courte du fonctionnement tarifaire réel (aucun prix
   * inventé) + rappel des catégories. Optionnel : le squelette réutilise le
   * catalogue véhicules existant, jamais de calculateur concurrent. */
  pricingTitle?: string;
  pricingBody?: string;
  frequentTrips: { title: string; body: string; href?: string }[];
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
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" prefillAddress={content.prefillAddress} prefillLabel={content.prefillLabel} />
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

      {content.departureArrivalTitle && content.departure && content.arrival && (
        <section className="kd-section kd-on-white">
          <div className="kd-container">
            <div className="kd-section-head">
              <p className="kd-eyebrow">Départ et arrivée</p>
              <h2 className="kd-h2">{content.departureArrivalTitle}</h2>
            </div>
            <div className="kd-grid-2">
              <div className="kd-card kd-card--flat">
                <h3 className="kd-h4">{content.departure.title}</h3>
                <p className="kd-body" style={{ marginTop: 8 }}>{content.departure.body}</p>
              </div>
              <div className="kd-card kd-card--flat">
                <h3 className="kd-h4">{content.arrival.title}</h3>
                <p className="kd-body" style={{ marginTop: 8 }}>{content.arrival.body}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {content.practicalInfoTitle && content.practicalInfoItems && (
        <section className="kd-section kd-section--compact kd-on-white">
          <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
            <p className="kd-eyebrow">Informations pratiques</p>
            <h2 className="kd-h2">{content.practicalInfoTitle}</h2>
            <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
              {content.practicalInfoItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Trajets fréquents</p>
            <h2 className="kd-h2">Des trajets courants au départ de ce secteur</h2>
          </div>
          <div className="kd-grid-3">
            {content.frequentTrips.map((trip) => (
              <div key={trip.title} className="kd-card kd-card--flat">
                <h3 className="kd-h4">{trip.href ? <Link href={trip.href}>{trip.title}</Link> : trip.title}</h3>
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

      {content.pricingTitle && content.pricingBody && (
        <section className="kd-section kd-on-cream">
          <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
            <p className="kd-eyebrow">Tarifs</p>
            <h2 className="kd-h2">{content.pricingTitle}</h2>
            <p className="kd-body">{content.pricingBody}</p>
            <div className="kd-grid-3" style={{ marginTop: 8 }}>
              {vehicleCatalog.map((vehicle) => (
                <div key={vehicle.slug} className="kd-card kd-card--flat">
                  <h3 className="kd-h4">{vehicle.label}</h3>
                  <p className="kd-body" style={{ marginTop: 4, fontWeight: 700, color: "var(--kd-gold-ink)" }}>À partir de {vehicle.fromPriceEuros} €</p>
                </div>
              ))}
            </div>
            <Link className="kd-card-link" href="/tarifs">Consulter la grille tarifaire <span aria-hidden="true">→</span></Link>
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
