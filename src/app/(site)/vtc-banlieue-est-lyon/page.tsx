import { HubPageTemplate } from "@/app/design-preview/hub-page-template";
import { hubPages } from "@/app/design-preview/hub-pages-content";
import { buildMetadata } from "@/lib/seo/page-metadata";

const content = hubPages.find((page) => page.slug === "vtc-banlieue-est-lyon")!;

export const metadata = buildMetadata({
  title: content.title,
  description: content.metaDescription,
  path: "/vtc-banlieue-est-lyon",
});

export default function BanlieueEstLyonPage() {
  return <HubPageTemplate content={content} framed={false} />;
}
