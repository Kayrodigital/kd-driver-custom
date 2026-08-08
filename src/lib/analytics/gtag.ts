"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Enveloppe défensive autour de window.gtag : gtag.js est chargé en
 * afterInteractive, donc potentiellement pas encore prêt (bloqueur de pub,
 * script encore en cours de chargement) au moment d'un premier clic — ne
 * doit jamais faire planter une interaction utilisateur pour un souci de
 * tracking.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
