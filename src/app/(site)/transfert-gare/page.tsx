import { GareHubPage } from "@/app/design-preview/gare-hub-template";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Transfert gares de Lyon : Part-Dieu et Perrache | KDRIVE",
  description: "Chauffeur privé pour vos transferts vers les gares de Lyon Part-Dieu et Perrache, sur réservation. KDRIVE confirme le tarif par téléphone avant votre trajet.",
  path: "/transfert-gare",
});

export default function TransfertGarePage() {
  return <GareHubPage framed={false} />;
}
