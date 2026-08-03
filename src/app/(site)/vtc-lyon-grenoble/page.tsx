import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { localPages } from "@/app/design-preview/local-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Lyon Grenoble | Chauffeur privé longue distance | KDRIVE",
  description: "Chauffeur privé pour un trajet longue distance entre Lyon et Grenoble, tarif calculé et confirmé avant le départ.",
  path: "/vtc-lyon-grenoble",
});

export default function VtcLyonGrenoblePage() {
  const content = localPages.find((page) => page.slug === "vtc-lyon-grenoble")!;
  return <LocalPageTemplate content={content} framed={false} />;
}
