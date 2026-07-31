import type { Metadata } from "next";
import { ServicePageTemplate } from "@/app/design-preview/service-page-template";
import { servicePages } from "@/app/design-preview/service-pages-content";

export const metadata: Metadata = {
  title: "Chauffeur privé entreprise | KDRIVE",
  description: "Déplacements professionnels à Lyon : ponctualité, discrétion et facturation simplifiée pour les entreprises.",
};

export default function ChauffeurEntreprisePage() {
  const content = servicePages.find((page) => page.key === "entreprise")!;
  return <ServicePageTemplate content={content} framed={false} />;
}
