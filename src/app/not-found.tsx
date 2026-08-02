import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Logo } from "@/app/design-preview/sections";
import "./design-preview/design-preview.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], style: ["normal"], variable: "--kd-font-display" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--kd-font-sans" });

export const metadata: Metadata = {
  title: "Page introuvable | KDRIVE",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={`kd-preview ${display.variable} ${sans.variable}`}>
      <div className="kd-on-dark" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}>
          <div className="kd-container kd-nav">
            <Link href="/" aria-label="KDRIVE, accueil"><Logo /></Link>
          </div>
        </header>
        <div className="kd-container" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--kd-space-7) 24px" }}>
          <div className="kd-stack" style={{ maxWidth: 560, textAlign: "center", justifyItems: "center" }}>
            <p className="kd-eyebrow">Erreur 404</p>
            <h1 className="kd-h1">Page introuvable</h1>
            <p className="kd-lead">
              La page que vous cherchez n’existe pas ou a changé d’adresse. Retrouvez votre chemin vers KDRIVE ci-dessous.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 8 }}>
              <Link className="kd-btn kd-btn--gold" href="/">Retour à l’accueil</Link>
              <Link className="kd-btn kd-btn--ghost-dark" href="/reserver">Réserver</Link>
            </div>
            <p className="kd-field-hint" style={{ marginTop: 16 }}>
              Besoin d’aide ? <Link href="/contact">Contactez KDRIVE</Link> ou appelez le{" "}
              <a href="tel:+33652211292">06 52 21 12 92</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
