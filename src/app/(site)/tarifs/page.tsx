import { TarifsPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { learnMoreBySlug } from "@/app/design-preview/en-savoir-plus";

export const metadata = buildMetadata({
  title: "Tarifs | KDRIVE",
  description: "Essentiel, Premium, Van : demandez votre trajet et recevez votre tarif par téléphone après étude par KDRIVE.",
  path: "/tarifs",
});

export default function Tarifs() {
  const learnMore = learnMoreBySlug.tarifs;
  return <TarifsPage framed={false} learnMoreTitle={learnMore.title} learnMoreItems={learnMore.items} />;
}
