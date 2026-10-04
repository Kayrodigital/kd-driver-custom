import { localPages } from "@/app/design-preview/local-pages-content";
import { VilleurbanneSignaturePage } from "@/app/design-preview/villeurbanne-signature-page";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Villeurbanne | Chauffeur privé | KDRIVE",
  description: "Chauffeur privé VTC à Villeurbanne : trajets vers Lyon, la gare Part-Dieu et l'aéroport, tarif calculé avant confirmation.",
  path: "/vtc-villeurbanne",
});

export default function VtcVilleurbannePage() {
  const content = localPages.find((page) => page.slug === "vtc-villeurbanne")!;
  return <VilleurbanneSignaturePage content={content} />;
}
