import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./design-preview.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--kd-font-display" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--kd-font-sans" });

export const metadata: Metadata = {
  title: "Direction artistique | KDRIVE",
  description: "Maquette de validation — design system et variantes de page d’accueil.",
  robots: { index: false, follow: false },
};

export default function DesignPreviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`kd-preview ${display.variable} ${sans.variable}`}>{children}</div>;
}
