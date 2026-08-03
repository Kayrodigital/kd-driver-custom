import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { localPages } from "@/app/design-preview/local-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Lyon Part-Dieu | Chauffeur gare | KDRIVE",
  description: "Chauffeur privé à la gare de Lyon Part-Dieu : prise en charge sur réservation, transfert vers l'aéroport ou le centre de Lyon.",
  path: "/vtc-lyon-part-dieu",
});

export default function VtcLyonPartDieuPage() {
  const content = localPages.find((page) => page.slug === "vtc-lyon-part-dieu")!;
  return <LocalPageTemplate content={content} framed={false} />;
}
