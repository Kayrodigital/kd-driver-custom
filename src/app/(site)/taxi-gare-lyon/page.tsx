import { TaxiGareLyonPage } from "@/app/design-preview/taxi-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Taxi Gare Lyon Part-Dieu & Perrache — VTC | KDRIVE",
  description: "Taxi à la gare Part-Dieu ou Perrache ? Réservez un VTC KDRIVE : numéro de train pris en compte, chauffeur à votre arrivée, tarif confirmé avant la course.",
  path: "/taxi-gare-lyon",
});

export default function Page() {
  return <TaxiGareLyonPage />;
}
