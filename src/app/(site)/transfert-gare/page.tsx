import type { Metadata } from "next";
import { ServicePageTemplate } from "@/app/design-preview/service-page-template";
import { servicePages } from "@/app/design-preview/service-pages-content";

export const metadata: Metadata = {
  title: "Transfert gare | KDRIVE",
  description: "Chauffeur privé pour vos transferts vers les gares de Lyon Part-Dieu et Perrache, ajustés à l’horaire de votre train.",
};

export default function TransfertGarePage() {
  const content = servicePages.find((page) => page.key === "gare")!;
  return <ServicePageTemplate content={content} framed={false} />;
}
