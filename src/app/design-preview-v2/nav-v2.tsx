"use client";

import { useState } from "react";

const navLinks = [
  { href: "#services-v2", label: "Services" },
  { href: "#vehicules-v2", label: "Véhicules" },
  { href: "#tarifs-v2", label: "Tarifs" },
  { href: "#reassurance-v2", label: "À propos" },
  { href: "#contact-v2", label: "Contact" },
];

function LogoV2() {
  return (
    <span className="v2-nav-logo">
      <span>K</span>DRIVE
    </span>
  );
}

export function NavV2() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="v2-nav v2-on-dark">
        <div className="v2-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <LogoV2 />
          <ul className="v2-nav-links">
            {navLinks.map((link) => (
              <li key={link.href}><a className="v2-nav-link" href={link.href}>{link.label}</a></li>
            ))}
          </ul>
          <div className="v2-nav-actions">
            <a className="v2-nav-phone" href="tel:+33652211292">06 52 21 12 92</a>
            <a className="v2-btn v2-btn--gold" href="#reserver-v2" style={{ padding: "10px 20px", minHeight: 40, fontSize: "0.82rem" }}>Réserver</a>
            <button className="v2-mobile-toggle" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}>☰</button>
          </div>
        </div>
      </header>

      {/* Rendu hors de <header> : .v2-nav a un backdrop-filter, qui crée un
          bloc englobant pour les descendants position:fixed (même règle
          CSS que pour "transform") — imbriqué dans le header, ce tiroir se
          retrouvait confiné à la hauteur de la barre de nav (~88px) au lieu
          de couvrir l'écran entier. */}
      {open && (
        <div className="v2-mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu KDRIVE">
          <div className="v2-mobile-drawer-head">
            <button className="v2-mobile-drawer-close" aria-label="Fermer le menu" onClick={() => setOpen(false)}>✕</button>
          </div>
          <ul className="v2-mobile-drawer-links">
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href} onClick={() => setOpen(false)}>{link.label}</a></li>
            ))}
          </ul>
          <div style={{ marginTop: "auto", display: "flex", gap: 12, paddingTop: 32 }}>
            <a className="v2-btn v2-btn--outline" href="tel:+33652211292" style={{ flex: 1 }}>Appeler</a>
            <a className="v2-btn v2-btn--gold" href="#reserver-v2" style={{ flex: 1 }} onClick={() => setOpen(false)}>Réserver</a>
          </div>
        </div>
      )}
    </>
  );
}
