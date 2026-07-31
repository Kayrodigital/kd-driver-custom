import type { Metadata } from "next";
import { FaqPage } from "@/app/design-preview/other-pages-templates";

export const metadata: Metadata = {
  title: "FAQ | KDRIVE",
  description: "Questions fréquentes sur la réservation et le déroulement d’un trajet avec KDRIVE.",
};

export default function Faq() {
  return <FaqPage framed={false} />;
}
