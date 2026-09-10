import { HubPageTemplate } from "@/app/design-preview/hub-page-template";
import { hubPages } from "@/app/design-preview/hub-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

const content = hubPages.find((page) => page.slug === "zones-desservies")!;

export const metadata = buildMetadata({
  title: content.title,
  description: content.metaDescription,
  path: "/zones-desservies",
});

export default function ZonesDesserviesPage() {
  return <HubPageTemplate content={content} framed={false} />;
}
