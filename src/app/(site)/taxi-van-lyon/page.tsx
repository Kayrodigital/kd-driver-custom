import { TaxiVanLyonPage } from "@/app/design-preview/taxi-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Taxi Van Lyon — VTC 7 places pour groupes | KDRIVE",
  description: "Besoin d'un taxi van à Lyon ? KDRIVE met à votre disposition un van VTC avec chauffeur pour familles, groupes et bagages. Tarif confirmé avant la course.",
  path: "/taxi-van-lyon",
});

export default function Page() {
  return <TaxiVanLyonPage />;
}
