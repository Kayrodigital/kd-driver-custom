import { ServicePageTemplate } from "@/app/design-preview/service-page-template";
import { servicePages } from "@/app/design-preview/service-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Transfert aéroport Lyon-Saint Exupéry | KDRIVE",
  description: "Chauffeur privé pour vos transferts vers l’aéroport Lyon-Saint Exupéry, vol suivi et tarif annoncé à l’avance.",
  path: "/transfert-aeroport",
});

export default function TransfertAeroportPage() {
  const content = servicePages.find((page) => page.key === "aeroport")!;
  return <ServicePageTemplate content={content} framed={false} />;
}
