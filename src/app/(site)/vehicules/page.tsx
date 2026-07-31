import type { Metadata } from "next";
import { VehiclesPage } from "@/app/design-preview/other-pages-templates";

export const metadata: Metadata = {
  title: "Nos véhicules | KDRIVE",
  description: "Berline, Confort, Luxe, Van et Monospace : la flotte KDRIVE adaptée à chaque trajet à Lyon.",
};

export default function VehiculesPage() {
  return <VehiclesPage framed={false} />;
}
