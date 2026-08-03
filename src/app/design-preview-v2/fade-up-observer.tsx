"use client";

import { useEffect } from "react";

/**
 * Micro-interaction V2 : apparition en fondu + léger décalage vertical des
 * titres de section à l'entrée dans le viewport (docs/DESIGN_DIRECTION_V2.md,
 * section 15). Pas de librairie ajoutée : IntersectionObserver natif.
 */
export function FadeUpObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll(".v2-fade-up");
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("v2-visible");
        }
      },
      { threshold: 0.15 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
