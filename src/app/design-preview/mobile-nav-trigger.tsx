"use client";

import { useState } from "react";
import { MobileMenu } from "./mobile-menu";

export function MobileNavTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="kd-mobile-menu-trigger"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="kd-mobile-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`kd-mobile-menu-icon${open ? " is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
