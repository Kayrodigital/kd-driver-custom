import { TarifsPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Tarifs | KDRIVE",
  description: "Un tarif calculé avant confirmation pour Berline et Confort, un devis personnalisé pour les autres trajets.",
  path: "/tarifs",
});

export default function Tarifs() {
  return <TarifsPage framed={false} />;
}
