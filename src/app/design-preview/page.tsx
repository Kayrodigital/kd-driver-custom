"use client";

import { useState } from "react";
import { BookingFormCard } from "@/components/booking/kd/booking-form-card";
import { BookingFormInline } from "@/components/booking/kd/booking-form-inline";
import { BookingFormMobile } from "@/components/booking/kd/booking-form-mobile";
import { DesignSystemShowcase } from "./design-system-showcase";
import { SceneImage } from "./scene-image";
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
} from "./sections";

type HeroVariant = "a" | "b";

function HeroA() {
  return (
    <section className="kd-hero kd-hero--a kd-on-dark">
      <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" />
      <div className="kd-hero-bg" aria-hidden="true" />
      <div className="kd-container kd-hero-inner">
        <div className="kd-hero-copy">
          <p className="kd-eyebrow">Chauffeur privé · Lyon</p>
          <h1 className="kd-h1">Votre chauffeur, à l’heure près.</h1>
          <p className="kd-lead">Un service premium et local, sans attente ni surprise sur le tarif.</p>
          <div className="kd-hero-badges">
            <span className="kd-hero-badge"><b>4.9/5</b>satisfaction client</span>
            <span className="kd-hero-badge"><b>24/7</b>disponibilité</span>
            <span className="kd-hero-badge"><b>100%</b>chauffeurs locaux</span>
          </div>
        </div>
        <div className="kd-hero-form-wrap">
          <BookingFormInline />
        </div>
      </div>
    </section>
  );
}

function HeroB() {
  return (
    <section className="kd-hero kd-hero--b kd-on-dark">
      <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" />
      <div className="kd-hero-bg" aria-hidden="true" />
      <div className="kd-container kd-hero-inner">
        <div className="kd-hero-copy">
          <p className="kd-eyebrow">Chauffeur privé · Lyon</p>
          <h1 className="kd-h1">Votre trajet, réservé en toute sérénité.</h1>
          <p className="kd-lead">Départ, destination, date et téléphone suffisent pour envoyer votre demande.</p>
          <div className="kd-hero-badges">
            <span className="kd-hero-badge"><b>4.9/5</b>satisfaction client</span>
            <span className="kd-hero-badge"><b>24/7</b>disponibilité</span>
            <span className="kd-hero-badge"><b>100%</b>chauffeurs locaux</span>
          </div>
        </div>
        <div className="kd-hero-form-card">
          <BookingFormCard tone="dark" />
        </div>
      </div>
    </section>
  );
}

function DesktopPreview() {
  const [variant, setVariant] = useState<HeroVariant>("a");
  return (
    <section id="desktop" className="kd-section" style={{ paddingTop: "var(--kd-space-6)" }}>
      <div className="kd-container" style={{ marginBottom: "var(--kd-space-6)" }}>
        <div className="kd-section-head kd-section-head--center">
          <p className="kd-eyebrow">Page d’accueil — desktop</p>
          <h2 className="kd-h2">Deux variantes de hero à comparer</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="kd-toggle-group" aria-label="Variante de page d’accueil">
            <button type="button" aria-pressed={variant === "a"} onClick={() => setVariant("a")}>Variante A — formulaire horizontal</button>
            <button type="button" aria-pressed={variant === "b"} onClick={() => setVariant("b")}>Variante B — formulaire vertical à droite</button>
          </div>
        </div>
      </div>

      <div style={{ border: "1px solid var(--kd-line)", borderRadius: "var(--kd-radius-lg)", overflow: "hidden", boxShadow: "var(--kd-shadow-lg)" }}>
        <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>
        {variant === "a" ? <HeroA /> : <HeroB />}
        <ServicesSection />
        <AdvantagesSection />
        <VehiclesSection />
        <AirportSection />
        <CorporateSection />
        <ZonesSection />
        <CtaSection />
        <FooterSection />
      </div>
    </section>
  );
}

function MobilePreview() {
  return (
    <section id="mobile" className="kd-section kd-on-white">
      <div className="kd-container">
        <div className="kd-section-head kd-section-head--center">
          <p className="kd-eyebrow">Page d’accueil — mobile</p>
          <h2 className="kd-h2">Version courte, mobile-first</h2>
        </div>
        <div className="kd-phone-frame">
          <div className="kd-phone-screen">
            <nav className="kd-mobile-nav"><span className="kd-logo">KD <b>Driver</b></span><a href="tel:+33652211292" style={{ fontSize: "0.8rem", fontWeight: 700 }}>Appeler</a></nav>
            <div className="kd-mobile-hero">
              <p className="kd-eyebrow">Chauffeur privé · Lyon</p>
              <h1 className="kd-h3" style={{ color: "var(--kd-cream)" }}>Votre chauffeur, à l’heure près.</h1>
              <BookingFormMobile />
            </div>
            <div className="kd-mobile-section">
              <div className="kd-mobile-col">
                <p className="kd-eyebrow">Services</p>
                <div className="kd-mobile-chip-row">
                  <span className="kd-mobile-chip">Trajets d’affaires</span>
                  <span className="kd-mobile-chip">Aéroport &amp; gares</span>
                  <span className="kd-mobile-chip">Mise à disposition</span>
                </div>
              </div>
            </div>
            <div className="kd-mobile-section">
              <div className="kd-mobile-col">
                <p className="kd-eyebrow">Véhicules</p>
                <div className="kd-mobile-scroll">
                  <div className="kd-card"><SceneImage src="/images/vehicle-berline.jpg" alt="Berline" className="kd-vehicle-image" style={{ minHeight: 90 }} /><b style={{ display: "block", marginTop: 8 }}>Berline</b><small style={{ color: "var(--kd-muted)" }}>4 passagers</small></div>
                  <div className="kd-card"><SceneImage src="/images/vehicle-confort.jpg" alt="Confort" className="kd-vehicle-image" style={{ minHeight: 90 }} /><b style={{ display: "block", marginTop: 8 }}>Confort</b><small style={{ color: "var(--kd-muted)" }}>4 passagers</small></div>
                  <div className="kd-card"><SceneImage src="/images/vehicle-van.jpg" alt="Van" className="kd-vehicle-image" style={{ minHeight: 90 }} /><b style={{ display: "block", marginTop: 8 }}>Van</b><small style={{ color: "var(--kd-muted)" }}>7 passagers</small></div>
                </div>
              </div>
            </div>
            <div className="kd-mobile-section">
              <div className="kd-mobile-col">
                <p className="kd-eyebrow">Zones desservies</p>
                <p className="kd-body">Lyon, Villeurbanne, Aéroport Lyon-Saint Exupéry, Gare Part-Dieu, Gare Perrache…</p>
              </div>
            </div>
            <div className="kd-mobile-footer">
              <span className="kd-logo" style={{ fontSize: "1rem" }}>KD <b>Driver</b></span>
              <span>06 52 21 12 92 · Lyon, France</span>
              <span>© {new Date().getFullYear()} KD Driver</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DesignPreviewPage() {
  return (
    <>
      <div className="kd-preview-topbar">
        <strong>KD Driver — Direction artistique (validation)</strong>
        <nav className="kd-preview-nav">
          <a href="#design-system">Design system</a>
          <a href="#desktop">Desktop A/B</a>
          <a href="#mobile">Mobile</a>
        </nav>
      </div>

      <DesignSystemShowcase />
      <DesktopPreview />
      <MobilePreview />

      <div className="kd-section kd-on-cream" style={{ paddingTop: "var(--kd-space-5)" }}>
        <div className="kd-container">
          <div className="kd-annotation">
            <b>Étape de validation</b>
            <p>Cette page est une maquette fonctionnelle pour valider la direction artistique avant de construire les pages définitives. Le formulaire est le vrai moteur de réservation (mêmes appels API, mêmes règles) — les sections « services », « avantages », « aéroport », « entreprise » et « zones desservies » sont des contenus d’illustration à affiner.</p>
          </div>
        </div>
      </div>
    </>
  );
}
