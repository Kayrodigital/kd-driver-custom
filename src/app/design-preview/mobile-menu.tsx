"use client";

import { useEffect } from "react";
import Link from "next/link";

const menuLinks = [
  { href: "/", label: "Accueil" },
  { href: "/reserver", label: "Réserver" },
  { href: "/transfert-aeroport", label: "Transfert aéroport" },
  { href: "/transfert-gare", label: "Transfert gare" },
  { href: "/chauffeur-entreprise", label: "Chauffeur entreprise" },
  { href: "/mise-a-disposition", label: "Mise à disposition" },
  { href: "/longues-distances", label: "Longues distances" },
  { href: "/vehicules", label: "Véhicules" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/faq", label: "FAQ" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="kd-mobile-menu-panel"
      className="kd-mobile-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Menu KDRIVE"
    >
      <nav>
        <ul className="kd-mobile-menu-links">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="kd-mobile-menu-actions">
        <Link className="kd-btn kd-btn--gold kd-btn--block" href="/reserver" onClick={onClose}>
          Réserver
        </Link>
        <a className="kd-btn kd-btn--ghost-dark kd-btn--block" href="tel:+33652211292">
          Appeler KDRIVE
        </a>
      </div>
    </div>
  );
}
