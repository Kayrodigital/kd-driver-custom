import Link from "next/link";
import { SceneImage } from "@/app/design-preview/scene-image";
import { EnglishFooter, EnglishSiteNav } from "@/app/design-preview/en/english-site-components";
import { buildMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildMetadata({
  title: "Contact and book a private driver in Lyon | KDRIVE",
  description: "Contact KDRIVE in English to request a private driver, airport transfer, business journey or long-distance private transfer from Lyon.",
  path: "/en/contact",
  locale: "en_GB",
  languages: { en: "/en/contact", fr: "/contact", "x-default": "/contact" },
});

export default function EnglishContactPage() {
  return (
    <div lang="en">
      <header className="kd-on-dark kd-site-header"><EnglishSiteNav /></header>
      <section className="kd-hero kd-hero--a kd-on-dark"><SceneImage src="/images/site/kdrive-dirigeant-hotel-business-lyon.webp" alt="Contact KDRIVE private driver in Lyon" className="kd-hero-photo" priority sizes="100vw" /><div className="kd-container kd-hero-inner" style={{ gridTemplateColumns: "1fr" }}><div className="kd-hero-copy"><p className="kd-eyebrow">Contact KDRIVE</p><h1 className="kd-h1">Let us organise your journey in Lyon.</h1><p className="kd-lead">Call the team or use the online booking form. Please include your pickup, destination, date, time, passenger count and luggage.</p></div></div></section>
      <section className="kd-section kd-on-cream"><div className="kd-container kd-grid-2"><div className="kd-card"><p className="kd-eyebrow">By telephone</p><h2 className="kd-h3">Speak directly with KDRIVE</h2><p className="kd-body">For assistance in English, a complex programme or a journey at short notice, call the team directly.</p><a className="kd-btn kd-btn--primary" href="tel:+33688863419">Call +33 6 88 86 34 19</a></div><div className="kd-card"><p className="kd-eyebrow">Online request</p><h2 className="kd-h3">Send your journey details</h2><p className="kd-body">The English booking form securely sends your itinerary to KDRIVE. The team then confirms availability and the fare by telephone.</p><Link className="kd-btn kd-btn--gold" href="/en/book">Open the booking form</Link></div></div></section>
      <section className="kd-section kd-on-white"><div className="kd-container kd-stack" style={{ maxWidth: 760 }}><p className="kd-eyebrow">What to include</p><h2 className="kd-h2">The details we need to confirm your private driver</h2><ul className="kd-body"><li>Pickup and destination addresses</li><li>Date and preferred pickup time</li><li>Flight or train number when relevant</li><li>Number of passengers and bags</li><li>Any child seat, accessibility or additional-stop requirement</li></ul></div></section>
      <EnglishFooter />
    </div>
  );
}
