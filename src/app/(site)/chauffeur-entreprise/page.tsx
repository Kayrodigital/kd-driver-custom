import { ServicePageTemplate } from "@/app/design-preview/service-page-template";
import { servicePages } from "@/app/design-preview/service-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Chauffeur privé entreprise | KDRIVE",
  description: "Déplacements professionnels à Lyon : ponctualité, discrétion et facturation simplifiée pour les entreprises.",
  path: "/chauffeur-entreprise",
});

export default function ChauffeurEntreprisePage() {
  const content = servicePages.find((page) => page.key === "entreprise")!;
  return <ServicePageTemplate content={content} framed={false} />;
}
