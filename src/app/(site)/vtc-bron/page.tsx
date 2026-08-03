import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { localPages } from "@/app/design-preview/local-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Bron | Chauffeur privé | KDRIVE",
  description: "Chauffeur privé VTC à Bron : trajets vers Lyon, l'aéroport et la gare Part-Dieu, tarif calculé avant confirmation.",
  path: "/vtc-bron",
});

export default function VtcBronPage() {
  const content = localPages.find((page) => page.slug === "vtc-bron")!;
  return <LocalPageTemplate content={content} framed={false} />;
}
