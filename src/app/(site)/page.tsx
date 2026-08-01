import type { Metadata } from "next";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { SceneImage } from "@/app/design-preview/scene-image";
import {
  AdvantagesSection,
  AirportSection,
  CorporateSection,
  CtaSection,
  FooterSection,
  ServicesSection,
  SiteNav,
  VehiclesSection,
  ZonesSection,
} from "@/app/design-preview/sections";

export const metadata: Metadata = {
  title: "KDRIVE — Chauffeur privé à Lyon",
  description: "Réservation de chauffeur privé premium à Lyon : transferts aéroport et gare, entreprise, mise à disposition.",
};

export default function HomePage() {
  return (
    <>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" priority />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <p className="kd-eyebrow">Chauffeur privé · Lyon</p>
            <h1 className="kd-h1">Votre trajet, réservé en toute sérénité.</h1>
            <p className="kd-lead">Départ, destination, date et téléphone suffisent pour envoyer votre demande.</p>
            <div className="kd-hero-badges">
              <span className="kd-hero-badge">Tarif annoncé avant confirmation</span>
              <span className="kd-hero-badge">Chauffeur dédié</span>
              <span className="kd-hero-badge">Réservation en quelques secondes</span>
            </div>
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" />
          </div>
        </div>
      </section>

      <ServicesSection />
      <AdvantagesSection />
      <VehiclesSection />
      <AirportSection />
      <CorporateSection />
      <ZonesSection />
      <CtaSection />
      <FooterSection />
    </>
  );
}
