import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { allBlogArticles, findArticle, findCategory } from "@/domain/blog/registry";
import { BlogArticleTemplate } from "@/app/design-preview/blog-components";

export function generateStaticParams() {
  return allBlogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.metaDescription,
    path: `/blog/${article.slug}`,
    noIndex: article.noIndex,
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();
  const category = findCategory(article.categorySlug);
  return <BlogArticleTemplate article={article} categoryLabel={category?.name ?? "Blog"} />;
}
