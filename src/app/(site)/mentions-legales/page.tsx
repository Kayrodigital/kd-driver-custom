import { LegalNoticesPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Mentions légales | Kdrive",
  description: "Informations légales sur Kdrive, son exploitant, la création du site et ses prestataires techniques.",
  path: "/mentions-legales",
});

export default function MentionsLegales() {
  return <LegalNoticesPage framed={false} />;
}
