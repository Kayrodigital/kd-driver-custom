import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { localPages } from "@/app/design-preview/local-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Saint-Priest | Chauffeur privé | KDRIVE",
  description: "Chauffeur privé VTC à Saint-Priest : trajets vers Lyon, l'aéroport et longue distance, tarif calculé avant confirmation.",
  path: "/vtc-saint-priest",
});

export default function VtcSaintPriestPage() {
  const content = localPages.find((page) => page.slug === "vtc-saint-priest")!;
  return <LocalPageTemplate content={content} framed={false} />;
}
