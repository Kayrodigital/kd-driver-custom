import { TaxiAeroportLyonPage } from "@/app/design-preview/taxi-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Taxi Aéroport Lyon Saint-Exupéry — VTC | KDRIVE",
  description: "Taxi pour l'aéroport de Lyon ? Réservez votre VTC KDRIVE : numéro de vol pris en compte, accueil en zone arrivées, tarif confirmé avant la course.",
  path: "/taxi-aeroport-lyon",
});

export default function Page() {
  return <TaxiAeroportLyonPage />;
}
