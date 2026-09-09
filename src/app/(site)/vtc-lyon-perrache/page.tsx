import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { localPages } from "@/app/design-preview/local-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Lyon Perrache | Chauffeur gare | KDRIVE",
  description: "Chauffeur privé à la gare de Lyon Perrache : prise en charge sur réservation, transfert vers l'aéroport, la Confluence ou le centre de Lyon.",
  path: "/vtc-lyon-perrache",
});

export default function VtcLyonPerrachePage() {
  const content = localPages.find((page) => page.slug === "vtc-lyon-perrache")!;
  return <LocalPageTemplate content={content} framed={false} />;
}
