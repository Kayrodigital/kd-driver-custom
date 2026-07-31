import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "KD Driver",
  description: "Réservation VTC à Lyon — prototype Sprint 1.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><header className="site-header"><Link href="/" aria-label="KD Driver, accueil"><span>KD</span> DRIVER</Link><p>Prototype Sprint 1</p></header>{children}</body></html>;
}
