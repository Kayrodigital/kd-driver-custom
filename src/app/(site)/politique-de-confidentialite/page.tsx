import { PrivacyPolicyPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Politique de confidentialité | KDRIVE",
  description: "Comment KDRIVE collecte, utilise et protège vos données personnelles, et comment exercer vos droits.",
  path: "/politique-de-confidentialite",
});

export default function PolitiqueDeConfidentialite() {
  return <PrivacyPolicyPage framed={false} />;
}
