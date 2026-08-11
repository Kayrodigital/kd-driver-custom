import { VehiclesPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Nos véhicules | KDRIVE",
  description: "Essentiel, Premium, Van : les catégories KDRIVE adaptées à chaque trajet à Lyon.",
  path: "/vehicules",
});

export default function VehiculesPage() {
  return <VehiclesPage framed={false} />;
}
