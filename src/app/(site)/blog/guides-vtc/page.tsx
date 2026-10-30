import { notFound } from "next/navigation";
import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { findCategory, guideArticles } from "@/domain/blog/registry";
import { ArticleCard } from "@/app/design-preview/blog-components";
import { SiteNav, FooterSection } from "@/app/design-preview/sections";
import { Breadcrumb } from "@/app/design-preview/breadcrumb";
import { SceneImage } from "@/app/design-preview/scene-image";
import { TrustBadge } from "@/app/design-preview/trust-badge";

const CATEGORY_SLUG = "guides-vtc";

export function generateMetadata() {
  const category = findCategory(CATEGORY_SLUG);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} | Blog KDRIVE`,
    description: category.intro,
    path: `/blog/${CATEGORY_SLUG}`,
  });
}

export default function GuidesVtcPage() {
  const category = findCategory(CATEGORY_SLUG);
  if (!category) notFound();

  const guides = guideArticles(CATEGORY_SLUG);

  return (
    <div>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/blog/guides/chauffeur-vtc-gare-lyon.webp" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blog", href: "/blog" }, { label: category.name }]} />
            <p className="kd-eyebrow">Blog KDRIVE</p>
            <h1 className="kd-h1">{category.name}</h1>
            <p className="kd-lead">{category.intro}</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" />
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Conseils pratiques</p>
            <h2 className="kd-h2">Préparer votre trajet à Lyon</h2>
          </div>
          <div className="kd-grid-3">
            {guides.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section id="reserver" className="kd-section kd-on-cream">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Réservez votre chauffeur privé KDRIVE</h2>
          <Link className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
