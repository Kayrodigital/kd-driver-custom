import Link from "next/link";
import { SceneImage } from "@/app/design-preview/scene-image";
import { EnglishContactCta, EnglishFooter, EnglishSiteNav } from "@/app/design-preview/en/english-site-components";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import { getEnglishVehicleLabel } from "@/content/en/vehicle-copy";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Private driver rates in Lyon | KDRIVE",
  description: "KDRIVE reviews your itinerary and confirms the private driver fare before your journey in Lyon or beyond.",
  path: "/en/rates",
  locale: "en_GB",
  languages: { en: "/en/rates", fr: "/tarifs", "x-default": "/tarifs" },
});

export default function EnglishRatesPage() {
  return (
    <div lang="en">
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><EnglishSiteNav /></header>
      <section className="kd-hero kd-hero--a kd-on-dark"><SceneImage src="/images/site/kdrive-berline-autoroute-lyon.webp" alt="Private driver journey from Lyon" className="kd-hero-photo" priority sizes="100vw" /><div className="kd-container kd-hero-inner" style={{ gridTemplateColumns: "1fr" }}><div className="kd-hero-copy"><p className="kd-eyebrow">Rates</p><h1 className="kd-h1">A fare confirmed before you travel.</h1><p className="kd-lead">Send your itinerary and KDRIVE will review the distance, timing, vehicle category and requirements before confirming your fare.</p><Link className="kd-btn kd-btn--gold" href="/en/contact">Request a quotation</Link></div></div></section>
      <section className="kd-section kd-on-cream"><div className="kd-container"><div className="kd-section-head"><p className="kd-eyebrow">Vehicle categories</p><h2 className="kd-h2">Starting prices</h2></div><div className="kd-grid-3">{vehicleCatalog.map((vehicle) => <div key={vehicle.slug} className="kd-card"><h2 className="kd-h3">{getEnglishVehicleLabel(vehicle)}</h2><p className="kd-h4" style={{ color: "var(--kd-gold)" }}>From €{vehicle.fromPriceEuros}</p><p className="kd-body">Up to {vehicle.passengers} passengers and {vehicle.luggage} bags.</p></div>)}</div><p className="kd-field-hint" style={{ marginTop: 24 }}>Starting prices are indicative. Your actual fare depends on the itinerary and is confirmed directly before booking.</p></div></section>
      <section className="kd-section kd-on-white"><div className="kd-container kd-grid-3"><div className="kd-card kd-card--flat"><h2 className="kd-h4">Airport and station transfers</h2><p className="kd-body">The fare reflects pickup details, time, destination, passengers and luggage.</p></div><div className="kd-card kd-card--flat"><h2 className="kd-h4">Hourly service</h2><p className="kd-body">A quotation is prepared according to the duration, programme and selected vehicle.</p></div><div className="kd-card kd-card--flat"><h2 className="kd-h4">Long-distance journeys</h2><p className="kd-body">Every journey beyond Lyon is quoted individually before confirmation.</p></div></div></section>
      <EnglishContactCta title="Request your personalised fare" />
      <EnglishFooter />
    </div>
  );
}
