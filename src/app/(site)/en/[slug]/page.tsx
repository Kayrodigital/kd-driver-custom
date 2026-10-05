import { notFound } from "next/navigation";
import { EnglishServicePageTemplate } from "@/app/design-preview/en/english-site-components";
import { englishServicePages } from "@/content/en/service-pages";
import { buildMetadata } from "@/lib/seo/page-metadata";

export function generateStaticParams() {
  return englishServicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = englishServicePages.find((item) => item.slug === slug);
  if (!page) return {};
  return buildMetadata({
    title: `${page.navLabel} in Lyon | KDRIVE`,
    description: page.lead,
    path: `/en/${page.slug}`,
    locale: "en_GB",
    languages: { en: `/en/${page.slug}`, fr: page.frenchPath, "x-default": page.frenchPath },
  });
}

export default async function EnglishServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = englishServicePages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <EnglishServicePageTemplate content={page} />;
}
