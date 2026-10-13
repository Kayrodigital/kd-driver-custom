"use client";

import { openCookiePanel } from "@/lib/privacy/consent";

export function ManageCookiesLink() {
  return (
    <button type="button" className="kd-cookie-link" onClick={openCookiePanel}>
      Gestion des cookies
    </button>
  );
}
