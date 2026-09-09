import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { localPages } from "@/app/design-preview/local-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "VTC Gare Lyon Saint-Exupéry TGV | KDRIVE",
  description: "Chauffeur privé à la gare de Lyon Saint-Exupéry TGV : prise en charge sur réservation, distincte des terminaux aéroportuaires.",
  path: "/vtc-gare-lyon-saint-exupery-tgv",
});

export default function VtcGareLyonSaintExuperyTgvPage() {
  const content = localPages.find((page) => page.slug === "vtc-gare-lyon-saint-exupery-tgv")!;
  return <LocalPageTemplate content={content} framed={false} />;
}
