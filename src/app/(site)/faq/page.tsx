import { FaqPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "FAQ | KDRIVE",
  description: "Questions fréquentes sur la réservation et le déroulement d’un trajet avec KDRIVE.",
  path: "/faq",
});

export default function Faq() {
  return <FaqPage framed={false} />;
}
