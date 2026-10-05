"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const frenchMenuLinks = [
  { href: "/", label: "Accueil" },
  { href: "/reserver", label: "Réserver" },
  { href: "/taxi-lyon", label: "Taxi à Lyon" },
  { href: "/transfert-aeroport", label: "Transfert aéroport" },
  { href: "/transfert-gare", label: "Transfert gare" },
  { href: "/chauffeur-entreprise", label: "Chauffeur entreprise" },
  { href: "/mise-a-disposition", label: "Mise à disposition" },
  { href: "/longues-distances", label: "Longues distances" },
  { href: "/vehicules", label: "Véhicules" },
  { href: "/tarifs", label: "Tarifs" },
];

const frenchInfoLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

const englishMenuLinks = [
  { href: "/en", label: "Home" },
  { href: "/en/airport-transfer", label: "Airport transfers" },
  { href: "/en/train-station-transfer", label: "Train station transfers" },
  { href: "/en/corporate-chauffeur", label: "Business driver service" },
  { href: "/en/chauffeur-service", label: "Private driver by the hour" },
  { href: "/en/long-distance-transfers", label: "Long-distance private transfers" },
  { href: "/en/vehicles", label: "Vehicles" },
  { href: "/en/rates", label: "Rates" },
  { href: "/en/contact", label: "Contact" },
  { href: "/", label: "🇫🇷 Français" },
];

export function MobileMenu({ open, onClose, locale = "fr" }: { open: boolean; onClose: () => void; locale?: "fr" | "en" }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function getFocusable(): HTMLElement[] {
      const panel = panelRef.current;
      if (!panel) return [];
      return Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    }

    getFocusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  const menuLinks = locale === "en" ? englishMenuLinks : frenchMenuLinks;

  return (
    <div
      ref={panelRef}
      id="kd-mobile-menu-panel"
      className="kd-mobile-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label={locale === "en" ? "KDRIVE menu" : "Menu KDRIVE"}
    >
      <nav>
        <ul className="kd-mobile-menu-links">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose}>{link.label}</Link>
            </li>
          ))}
        </ul>
        {locale === "fr" && (
          <div className="kd-mobile-menu-group">
            <p id="kd-mobile-infos-label" className="kd-mobile-menu-group-label">Infos</p>
            <ul className="kd-mobile-menu-links kd-mobile-menu-links--grouped" aria-labelledby="kd-mobile-infos-label">
              {frenchInfoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={onClose}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {locale === "fr" && (
          <Link className="kd-mobile-menu-language" href="/en" hrefLang="en" onClick={onClose}>🇬🇧 English</Link>
        )}
      </nav>
      <div className="kd-mobile-menu-actions">
        <Link className="kd-btn kd-btn--gold kd-btn--block" href={locale === "en" ? "/en/book" : "/reserver"} onClick={onClose}>
          {locale === "en" ? "Book a private driver" : "Réserver"}
        </Link>
        <a className="kd-btn kd-btn--ghost-dark kd-btn--block" href="tel:+33688863419">
          {locale === "en" ? "Call KDRIVE" : "Appeler KDRIVE"}
        </a>
      </div>
    </div>
  );
}
