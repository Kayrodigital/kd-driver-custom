import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { KdAccordion, KdLearnMoreAccordion } from "@/components/kd-accordion";
import { Breadcrumb } from "./breadcrumb";
import type { LocalPageContent } from "./local-page-template";
import { SceneImage } from "./scene-image";
import { FooterSection, ReassuranceList, SiteNav } from "./sections";
import { TrustBadge } from "./trust-badge";

function SignatureLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="kd-signature-links-group">
      <p className="kd-eyebrow">{title}</p>
      <ul className="kd-signature-links">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}<span aria-hidden="true">↗</span></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VilleurbanneSignaturePage({ content }: { content: LocalPageContent }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="kd-signature">
      <header className="kd-signature-header kd-on-dark"><SiteNav /></header>

      <main>
        <section className="kd-signature-hero kd-on-dark">
          <SceneImage src={content.heroImage} alt="" className="kd-signature-hero-photo" priority sizes="100vw" />
          <div className="kd-container kd-signature-hero-layout">
            <div className="kd-signature-hero-copy">
              <Breadcrumb
                items={[
                  { label: "Accueil", href: "/" },
                  ...(content.breadcrumbParent ? [content.breadcrumbParent] : []),
                  { label: content.h1 },
                ]}
              />
              <p className="kd-eyebrow">{content.eyebrow}</p>
              <h1 className="kd-h1">{content.h1}</h1>
              <p className="kd-lead">{content.heroLead}</p>
              <TrustBadge />
            </div>
            <div className="kd-signature-booking">
              <span className="kd-signature-booking-index" aria-hidden="true">01</span>
              <HeroSearchForm tone="dark" prefillAddress={content.prefillAddress} prefillLabel={content.prefillLabel} />
            </div>
          </div>
          <div className="kd-container kd-signature-hero-footer" aria-hidden="true">
            <span>{content.eyebrow}</span><span>Gare Part-Dieu</span><span>Aéroport Lyon-Saint Exupéry</span>
          </div>
        </section>

        <section className="kd-section kd-signature-intro kd-on-cream">
          <div className="kd-container kd-signature-editorial-grid">
            <div className="kd-signature-section-marker">
              <span>02</span>
              <p className="kd-eyebrow">Présentation</p>
            </div>
            <div className="kd-signature-editorial-copy">
              <h2 className="kd-h2">{content.presentationTitle}</h2>
              <div className="kd-signature-columns">
                {content.presentationBody.map((paragraph) => <p className="kd-body" key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section className="kd-section kd-signature-routes kd-on-dark">
          <div className="kd-container">
            <div className="kd-signature-dark-head">
              <div>
                <p className="kd-eyebrow">Trajets fréquents</p>
                <h2 className="kd-h2">Des trajets courants<br />au départ de ce secteur</h2>
              </div>
            </div>
            <ol className="kd-signature-route-list">
              {content.frequentTrips.map((trip, index) => (
                <li key={trip.title}>
                  <span className="kd-signature-route-index">0{index + 1}</span>
                  <div>
                    <h3 className="kd-h3">{trip.href ? <Link href={trip.href}>{trip.title}</Link> : trip.title}</h3>
                    <p>{trip.body}</p>
                  </div>
                  <span className="kd-signature-route-arrow" aria-hidden="true">↗</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {content.extraTitle && content.extraBody && (
          <section className="kd-section kd-signature-feature kd-on-white">
            <div className="kd-container kd-signature-feature-grid">
              <div className="kd-signature-feature-image-wrap">
                <SceneImage
                  src="/images/site/kdrive-quartier-affaires-part-dieu-lyon.webp"
                  alt="Berline avec chauffeur dans la métropole de Lyon"
                  className="kd-signature-feature-image"
                  sizes="(max-width: 760px) 100vw, 48vw"
                />
                <span className="kd-signature-image-caption">Villeurbanne · Métropole de Lyon</span>
              </div>
              <div className="kd-signature-feature-copy">
                <span className="kd-signature-large-index" aria-hidden="true">03</span>
                <p className="kd-eyebrow">Ancrage local</p>
                <h2 className="kd-h2">{content.extraTitle}</h2>
                <p className="kd-body">{content.extraBody}</p>
                <Link className="kd-card-link" href="/reserver">Réserver un trajet <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </section>
        )}

        <section className="kd-section kd-signature-navigation kd-on-cream">
          <div className="kd-container kd-signature-navigation-grid">
            {content.neighborLinksTitle && content.neighborLinks && (
              <SignatureLinks title={content.neighborLinksTitle} links={content.neighborLinks} />
            )}
            <SignatureLinks title={content.pillarLinksTitle} links={content.pillarLinks} />
          </div>
        </section>

        <section className="kd-section kd-signature-faq kd-on-white">
          <div className="kd-container kd-signature-faq-grid">
            <div className="kd-signature-faq-heading">
              <span className="kd-signature-large-index" aria-hidden="true">04</span>
              <p className="kd-eyebrow">FAQ locale</p>
              <h2 className="kd-h2">Questions fréquentes</h2>
            </div>
            <div className="kd-signature-accordion"><KdAccordion items={content.faq} /></div>
          </div>
        </section>

        {content.learnMoreItems && content.learnMoreItems.length > 0 && (
          <section className="kd-section kd-signature-learn-more kd-on-cream">
            <div className="kd-container kd-signature-faq-grid">
              <div className="kd-signature-faq-heading">
                <p className="kd-eyebrow">En savoir plus</p>
                <h2 className="kd-h2">{content.learnMoreTitle}</h2>
              </div>
              <div className="kd-signature-accordion"><KdLearnMoreAccordion items={content.learnMoreItems} /></div>
            </div>
          </section>
        )}

        <section id="reserver" className="kd-section kd-signature-cta kd-on-dark">
          <div className="kd-container kd-signature-cta-grid">
            <div className="kd-cta">
              <p className="kd-eyebrow">Réservation</p>
              <h2 className="kd-h2">Réservez votre chauffeur privé KDRIVE</h2>
              <Link className="kd-btn kd-btn--gold" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></Link>
            </div>
            <ReassuranceList />
          </div>
        </section>
      </main>

      <FooterSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
