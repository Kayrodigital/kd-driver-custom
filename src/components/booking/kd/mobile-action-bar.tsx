"use client";

import { usePathname } from "next/navigation";

export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/reserver") return null;

  return (
    <div className="kd-mobile-action-bar">
      <a className="kd-btn kd-btn--ghost-dark" href="tel:+33688863419">Appeler</a>
      <a className="kd-btn kd-btn--gold" href="#reserver">Réserver</a>
    </div>
  );
}
