"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  // Seul /admin conserve encore l'ancien habillage ; toutes les autres pages
  // rendent leur propre SiteNav (design system KDRIVE).
  if (!pathname?.startsWith("/admin")) return null;
  return (
    <header className="site-header">
      <Link href="/" aria-label="KD Driver, accueil"><span>KD</span> DRIVER</Link>
      <p>Prototype Sprint 1</p>
    </header>
  );
}
