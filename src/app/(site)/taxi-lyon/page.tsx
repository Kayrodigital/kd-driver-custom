import { TaxiLyonPage } from "@/app/design-preview/taxi-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Taxi Lyon ? Réservez votre VTC avec chauffeur | KDRIVE",
  description: "Besoin d'un taxi à Lyon ? KDRIVE, votre VTC premium : tarif confirmé avant le départ, chauffeur ponctuel, berline ou van. Réservation par téléphone ou formulaire.",
  path: "/taxi-lyon",
});

export default function Page() {
  return <TaxiLyonPage />;
}
