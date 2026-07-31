import type { Metadata } from "next";
import { AboutPage } from "@/app/design-preview/other-pages-templates";

export const metadata: Metadata = {
  title: "À propos | KDRIVE",
  description: "KDRIVE, chauffeur privé local à Lyon : notre approche du service.",
};

export default function APropos() {
  return <AboutPage framed={false} />;
}
