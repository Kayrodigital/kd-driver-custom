"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/gtag";

/**
 * Un seul composant, monté une fois dans le layout racine, plutôt que des
 * gestionnaires de clic dispersés sur chaque lien tel:/WhatsApp du site
 * (une quinzaine d'endroits différents, y compris hors de notre contrôle
 * direct comme les futures pages) : la délégation d'événements sur
 * `document` capte tous les clics, présents et futurs, sans toucher aux
 * composants qui rendent ces liens.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const isFirstPageview = useRef(true);
  // /admin est un usage interne (derrière l'authentification) : le suivre
  // fausserait les statistiques de comportement des visiteurs/prospects,
  // qui est tout l'intérêt de ce tracking.
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    // gtag.js envoie déjà une vue de page pour le tout premier chargement
    // (via gtag('config', ...) dans le layout) : ne pas la dupliquer ici,
    // seulement les navigations suivantes côté client (App Router).
    if (isFirstPageview.current) {
      isFirstPageview.current = false;
      return;
    }
    trackEvent("page_view", { page_path: pathname });
  }, [pathname, isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    function handleClick(event: MouseEvent) {
      const link = (event.target as Element).closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        // Un CTA "course immédiate" porte data-analytics-event pour remonter
        // en conversion secondaire distincte (immediate_ride_phone_click),
        // plutôt que le phone_click générique de tous les autres liens tel:.
        const eventName = link.getAttribute("data-analytics-event") || "phone_click";
        trackEvent(eventName, { phone_number: href.replace(/^tel:/, ""), page_path: pathname });
      } else if (href.includes("wa.me")) {
        trackEvent("whatsapp_click", { page_path: pathname });
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, isAdmin]);

  return null;
}
