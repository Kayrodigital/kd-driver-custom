import { VehiclesPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { learnMoreBySlug } from "@/app/design-preview/en-savoir-plus";

export const metadata = buildMetadata({
  title: "Nos véhicules | KDRIVE",
  description: "Essentiel, Premium, Van : les catégories KDRIVE adaptées à chaque trajet à Lyon.",
  path: "/vehicules",
});

export default function VehiculesPage() {
  const learnMore = learnMoreBySlug.vehicules;
  return <VehiclesPage framed={false} learnMoreTitle={learnMore.title} learnMoreItems={learnMore.items} />;
}
