import type { Metadata } from "next";
import { ContactPage } from "@/app/design-preview/other-pages-templates";

export const metadata: Metadata = {
  title: "Contact | KDRIVE",
  description: "Contactez KDRIVE, chauffeur privé à Lyon, par téléphone ou via le formulaire de réservation.",
};

export default function Contact() {
  return <ContactPage framed={false} />;
}
