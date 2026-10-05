import { ReserverTaxiLyonPage } from "@/app/design-preview/taxi-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Réserver un taxi à Lyon — VTC en ligne | KDRIVE",
  description: "Réservez votre VTC à Lyon en quelques minutes : tarif confirmé par téléphone, chauffeur ponctuel. Aéroport, gares, trajets en ville.",
  path: "/reserver-taxi-lyon",
});

export default function Page() {
  return <ReserverTaxiLyonPage />;
}
