import { HubPageTemplate } from "@/app/design-preview/hub-page-template";
import { hubPages } from "@/app/design-preview/hub-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

const content = hubPages.find((page) => page.slug === "transfert-stations-ski-depuis-lyon")!;

export const metadata = buildMetadata({
  title: content.title,
  description: content.metaDescription,
  path: "/transfert-stations-ski-depuis-lyon",
});

export default function TransfertStationsSkiPage() {
  return <HubPageTemplate content={content} framed={false} />;
}
