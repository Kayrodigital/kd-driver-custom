import type { Metadata } from "next";
import { ServicePageTemplate } from "@/app/design-preview/service-page-template";
import { servicePages } from "@/app/design-preview/service-pages-content";

export const metadata: Metadata = {
  title: "Longues distances | KDRIVE",
  description: "Trajets longue distance au départ de Lyon, avec un devis personnalisé établi avant toute confirmation.",
};

export default function LonguesDistancesPage() {
  const content = servicePages.find((page) => page.key === "longues-distances")!;
  return <ServicePageTemplate content={content} framed={false} />;
}
