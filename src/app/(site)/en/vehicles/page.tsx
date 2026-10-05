import Link from "next/link";
import { SceneImage } from "@/app/design-preview/scene-image";
import { EnglishContactCta, EnglishFooter, EnglishSiteNav } from "@/app/design-preview/en/english-site-components";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Private chauffeur vehicles in Lyon | KDRIVE",
  description: "Discover KDRIVE vehicle categories for airport transfers, business travel, families, groups and long-distance journeys from Lyon.",
  path: "/en/vehicles",
  locale: "en_GB",
  languages: { en: "/en/vehicles", fr: "/vehicules", "x-default": "/vehicules" },
});

export default function EnglishVehiclesPage() {
  return (
    <div lang="en">
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><EnglishSiteNav /></header>
      <section className="kd-hero kd-hero--a kd-on-dark">
        <SceneImage src="/images/vehicle-premium.jpg" alt="KDRIVE private chauffeur vehicle" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner" style={{ gridTemplateColumns: "1fr" }}><div className="kd-hero-copy"><p className="kd-eyebrow">Our vehicles</p><h1 className="kd-h1">Comfort suited to every journey.</h1><p className="kd-lead">Select a category according to your passenger count, luggage and preferred level of comfort.</p><Link className="kd-btn kd-btn--gold" href="/en/contact">Request a vehicle</Link></div></div>
      </section>
      <section className="kd-section kd-on-cream"><div className="kd-container"><div className="kd-grid-3">
        {vehicleCatalog.map((vehicle) => <article key={vehicle.slug} className="kd-card kd-vehicle-card"><SceneImage src={vehicle.image} alt={vehicle.label} className="kd-vehicle-image" sizes="(max-width: 680px) 100vw, 33vw" /><h2 className="kd-h3">{vehicle.label}</h2><p className="kd-body">Examples: {vehicle.examples.join(" · ")}</p><p className="kd-body"><strong>Up to {vehicle.passengers} passengers · {vehicle.luggage} bags</strong></p><p className="kd-body">{vehicle.slug === "van" ? "Ideal for families, small groups and travellers carrying several bags." : vehicle.slug === "premium" ? "Designed for executive journeys and travellers seeking additional comfort." : "A comfortable choice for everyday transfers in and around Lyon."}</p></article>)}
      </div><p className="kd-field-hint" style={{ marginTop: 24 }}>Vehicle models are examples of each category. The exact model depends on availability.</p></div></section>
      <EnglishContactCta title="Tell us who is travelling and how much luggage you have" />
      <EnglishFooter />
    </div>
  );
}
