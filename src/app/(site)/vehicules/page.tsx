import { VehiclesPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Nos véhicules | KDRIVE",
  description: "Berline, Confort, Luxe, Van et Monospace : la flotte KDRIVE adaptée à chaque trajet à Lyon.",
  path: "/vehicules",
});

export default function VehiculesPage() {
  return <VehiclesPage framed={false} />;
}
