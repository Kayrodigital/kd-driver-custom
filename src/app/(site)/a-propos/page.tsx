import { AboutPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "À propos | KDRIVE",
  description: "KDRIVE, chauffeur privé local à Lyon : notre approche du service.",
  path: "/a-propos",
});

export default function APropos() {
  return <AboutPage framed={false} />;
}
