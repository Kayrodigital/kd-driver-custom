"use client";

import { usePathname } from "next/navigation";

export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/reserver") return null;
  const english = pathname.startsWith("/en");

  return (
    <div className="kd-mobile-action-bar">
      <a className="kd-btn kd-btn--ghost-dark" href="tel:+33688863419">{english ? "Call" : "Appeler"}</a>
      <a className="kd-btn kd-btn--gold" href={english ? "/en/book" : "#reserver"}>{english ? "Book" : "Réserver"}</a>
    </div>
  );
}
