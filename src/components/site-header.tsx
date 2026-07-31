"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/design-preview")) return null;
  return (
    <header className="site-header">
      <Link href="/" aria-label="KD Driver, accueil"><span>KD</span> DRIVER</Link>
      <p>Prototype Sprint 1</p>
    </header>
  );
}
