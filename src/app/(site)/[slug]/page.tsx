import { notFound } from "next/navigation";
import { LocalPageTemplate } from "@/app/design-preview/local-page-template";
import { allDestinationPages, findDestinationPage } from "@/app/design-preview/destinations-registry";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { isIndexable } from "@/lib/seo/editorial-status";

export function generateStaticParams() {
  return allDestinationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = findDestinationPage(slug);
  if (!content) return {};
  return buildMetadata({
    title: content.title,
    description: content.metaDescription,
    path: `/${content.slug}`,
    noIndex: !isIndexable(content.editorialStatus, content.noIndex),
  });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = findDestinationPage(slug);
  if (!content) notFound();
  return <LocalPageTemplate content={content} framed={false} />;
}
