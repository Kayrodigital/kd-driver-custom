import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KDRIVE",
  description: "Chauffeur privé à Lyon.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
