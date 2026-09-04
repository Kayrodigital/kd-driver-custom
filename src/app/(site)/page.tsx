import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { SceneImage } from "@/app/design-preview/scene-image";
import { TrustBadge } from "@/app/design-preview/trust-badge";
import { ReviewsSection } from "@/app/design-preview/reviews-section";
import {
  AdvantagesSection,
  AirportSection,
  CommercialMessageSection,
  CorporateSection,
  CtaSection,
  FooterSection,
  ImmediateRideSection,
  ServicesSection,
  SiteNav,
  VehiclesSection,
  ZonesSection,
} from "@/app/design-preview/sections";

import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "KDRIVE — Chauffeur privé à Lyon",
  description: "Réservation de chauffeur privé premium à Lyon : transferts aéroport et gare, entreprise, mise à disposition.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <p className="kd-eyebrow">Chauffeur privé · Lyon</p>
            <h1 className="kd-h1">Votre trajet, réservé en toute sérénité.</h1>
            <p className="kd-lead">Réservez votre trajet à Lyon en quelques instants. KDRIVE confirme ensuite la disponibilité et le tarif.</p>
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" />
          </div>
          <p className="kd-hero-reassurance">
            <span className="kd-hero-reassurance-item">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Tarif par téléphone
            </span>
            <span className="kd-hero-reassurance-item">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 11l4-4 4 3 3-3 4 4" /><path d="M3 11l3 5 4 2 5-2 3-5" /></svg>
              Confirmation humaine
            </span>
            <span className="kd-hero-reassurance-item">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
              Contact direct
            </span>
          </p>
          <TrustBadge />
        </div>
      </section>

      <CommercialMessageSection />
      <ServicesSection />
      <AdvantagesSection />
      <VehiclesSection />
      <ImmediateRideSection />
      <AirportSection />
      <CorporateSection />
      <ZonesSection />
      <ReviewsSection />
      <CtaSection />
      <FooterSection />
    </>
  );
}
