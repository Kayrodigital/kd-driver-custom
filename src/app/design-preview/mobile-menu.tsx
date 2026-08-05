"use client";

import { useEffect, useRef } from "react";
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

  return (
    <div
      ref={panelRef}
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
        <a className="kd-btn kd-btn--ghost-dark kd-btn--block" href="tel:+33688863419">
          Appeler KDRIVE
        </a>
      </div>
    </div>
  );
}
