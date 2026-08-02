import { ServicePageTemplate } from "@/app/design-preview/service-page-template";
import { servicePages } from "@/app/design-preview/service-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Transfert gare Part-Dieu et Perrache | KDRIVE",
  description: "Chauffeur privé pour vos transferts vers les gares de Lyon Part-Dieu et Perrache, ajustés à l’horaire de votre train.",
  path: "/transfert-gare",
});

export default function TransfertGarePage() {
  const content = servicePages.find((page) => page.key === "gare")!;
  return <ServicePageTemplate content={content} framed={false} />;
}
