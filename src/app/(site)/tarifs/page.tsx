import { TarifsPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Tarifs | KDRIVE",
  description: "Essentiel, Premium, Van : demandez votre trajet et recevez votre tarif par téléphone après étude par KDRIVE.",
  path: "/tarifs",
});

export default function Tarifs() {
  return <TarifsPage framed={false} />;
}
