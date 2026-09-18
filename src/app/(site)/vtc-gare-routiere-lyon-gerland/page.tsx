import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { localPages } from "@/app/design-preview/local-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Gare Routière Lyon Gerland | KDRIVE",
  description: "Réservez votre chauffeur VTC avec KDRIVE depuis ou vers la gare routière de Lyon Gerland. Transferts vers Lyon, les gares et l'aéroport.",
  path: "/vtc-gare-routiere-lyon-gerland",
});

export default function VtcGareRoutiereLyonGerlandPage() {
  const content = localPages.find((page) => page.slug === "vtc-gare-routiere-lyon-gerland")!;
  return <LocalPageTemplate content={content} framed={false} />;
}
