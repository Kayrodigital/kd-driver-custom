import { ContactPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Contact | KDRIVE",
  description: "Contactez KDRIVE, chauffeur privé à Lyon, par téléphone ou via le formulaire de réservation.",
  path: "/contact",
});

export default function Contact() {
  return <ContactPage framed={false} />;
}
