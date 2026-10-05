import { AirportHubPage } from "@/app/design-preview/airport-hub-template";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Transfert aéroport Lyon Saint-Exupéry | KDRIVE",
  description: "Chauffeur privé pour vos transferts vers l'aéroport Lyon Saint-Exupéry, sur réservation. KDRIVE confirme le tarif par téléphone avant votre trajet.",
  path: "/transfert-aeroport",
  languages: { fr: "/transfert-aeroport", en: "/en/airport-transfer", "x-default": "/transfert-aeroport" },
});

export default function TransfertAeroportPage() {
  return <AirportHubPage framed={false} />;
}
