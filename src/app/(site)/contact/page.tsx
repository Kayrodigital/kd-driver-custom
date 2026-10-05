import { ContactPage } from "@/app/design-preview/other-pages-templates";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { learnMoreBySlug } from "@/content/en-savoir-plus";

export const metadata = buildMetadata({
  title: "Contact | KDRIVE",
  description: "Contactez KDRIVE, chauffeur privé à Lyon, par téléphone ou via le formulaire de réservation.",
  path: "/contact",
  languages: { fr: "/contact", en: "/en/contact", "x-default": "/contact" },
});

export default function Contact() {
  const learnMore = learnMoreBySlug.contact;
  return <ContactPage framed={false} learnMoreTitle={learnMore.title} learnMoreItems={learnMore.items} />;
}
