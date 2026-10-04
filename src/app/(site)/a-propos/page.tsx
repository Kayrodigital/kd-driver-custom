import { AboutPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { learnMoreBySlug } from "@/content/en-savoir-plus";

export const metadata = buildMetadata({
  title: "À propos | KDRIVE",
  description: "KDRIVE, chauffeur privé local à Lyon : notre approche du service.",
  path: "/a-propos",
});

export default function APropos() {
  const learnMore = learnMoreBySlug["a-propos"];
  return <AboutPage framed={false} learnMoreTitle={learnMore.title} learnMoreItems={learnMore.items} />;
}
