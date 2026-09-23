import { notFound } from "next/navigation";
import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { findCategory, upcomingArticles, pastArticles } from "@/domain/blog/registry";
import { ArticleCard } from "@/app/design-preview/blog-components";
import { SiteNav, FooterSection } from "@/app/design-preview/sections";
import { Breadcrumb } from "@/app/design-preview/breadcrumb";
import { SceneImage } from "@/app/design-preview/scene-image";
import { TrustBadge } from "@/app/design-preview/trust-badge";

const CATEGORY_SLUG = "evenements-lyon";

export function generateMetadata() {
  const category = findCategory(CATEGORY_SLUG);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} | Blog KDRIVE`,
    description: category.intro,
    path: `/blog/${CATEGORY_SLUG}`,
  });
}

export default function EvenementsLyonPage() {
  const category = findCategory(CATEGORY_SLUG);
  if (!category) notFound();

  const upcoming = upcomingArticles(CATEGORY_SLUG);
  const past = pastArticles(CATEGORY_SLUG);

  return (
    <div>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" priority sizes="100vw" />
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
            <p className="kd-eyebrow">À venir</p>
            <h2 className="kd-h2">Événements à venir</h2>
          </div>
          {upcoming.length > 0 ? (
            <div className="kd-grid-3">
              {upcoming.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="kd-body">Aucun événement à venir publié pour le moment.</p>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="kd-section kd-on-cream">
          <div className="kd-container">
            <div className="kd-section-head">
              <p className="kd-eyebrow">Archives</p>
              <h2 className="kd-h2">Éditions précédentes</h2>
            </div>
            <div className="kd-grid-3">
              {past.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="reserver" className="kd-section kd-on-white">
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
