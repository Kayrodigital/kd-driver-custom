import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { blogCategories, upcomingArticles, pastArticles } from "@/domain/blog/registry";
import { ArticleCard } from "@/app/design-preview/blog-components";
import { SiteNav, FooterSection } from "@/app/design-preview/sections";
import { Breadcrumb } from "@/app/design-preview/breadcrumb";
import { SceneImage } from "@/app/design-preview/scene-image";
import { TrustBadge } from "@/app/design-preview/trust-badge";

export const metadata = buildMetadata({
  title: "Blog KDRIVE | Guides et actualités VTC à Lyon",
  description: "Guides pratiques KDRIVE : événements et salons professionnels à Lyon, conseils de transfert depuis les gares et l'aéroport.",
  path: "/blog",
});

export default function BlogHomePage() {
  const upcoming = upcomingArticles();
  const past = pastArticles();

  return (
    <div>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blog" }]} />
            <p className="kd-eyebrow">Blog KDRIVE</p>
            <h1 className="kd-h1">Guides et actualités VTC à Lyon</h1>
            <p className="kd-lead">Nos guides pratiques pour organiser vos trajets à Lyon : événements professionnels, salons et grands rendez-vous.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" />
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Catégories</p>
            <h2 className="kd-h2">Explorer le blog</h2>
          </div>
          <div className="kd-grid-3">
            {blogCategories.map((category) => (
              <Link key={category.slug} href={`/blog/${category.slug}`} className="kd-card kd-card--hover" style={{ display: "grid", gap: 10 }}>
                <h3 className="kd-h4">{category.name}</h3>
                <p className="kd-body" style={{ margin: 0 }}>{category.intro}</p>
                <span className="kd-card-link">Voir les articles <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="kd-section kd-on-white">
          <div className="kd-container">
            <div className="kd-section-head">
              <p className="kd-eyebrow">À venir</p>
              <h2 className="kd-h2">Prochains événements à Lyon</h2>
            </div>
            <div className="kd-grid-3">
              {upcoming.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

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

      <FooterSection />
    </div>
  );
}
