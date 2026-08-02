import { ServicePageTemplate } from "@/app/design-preview/service-page-template";
import { servicePages } from "@/app/design-preview/service-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Mise à disposition | KDRIVE",
  description: "Un chauffeur privé dédié à l’heure ou à la journée pour vos événements et déplacements sur mesure à Lyon.",
  path: "/mise-a-disposition",
});

export default function MiseADispositionPage() {
  const content = servicePages.find((page) => page.key === "disposition")!;
  return <ServicePageTemplate content={content} framed={false} />;
}
