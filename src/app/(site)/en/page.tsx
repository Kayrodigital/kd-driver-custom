import Link from "next/link";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { SceneImage } from "@/app/design-preview/scene-image";
import { TrustBadge } from "@/app/design-preview/trust-badge";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { EnglishContactCta, EnglishFooter, EnglishSiteNav } from "@/app/design-preview/en/english-site-components";

export const metadata = buildMetadata({
  title: "Private chauffeur in Lyon | KDRIVE",
  description: "Book a private chauffeur in Lyon for airport and station transfers, business travel, events and long-distance journeys.",
  path: "/en",
  locale: "en_GB",
  languages: { en: "/en", fr: "/", "x-default": "/" },
});

const services = [
  { title: "Lyon Airport transfers", body: "Pre-booked travel between Lyon Saint-Exupéry Airport, the city centre, hotels and regional destinations.", image: "/images/site/kdrive-transfert-aeroport-lyon-saint-exupery.webp", href: "/en/airport-transfer" },
  { title: "Train station transfers", body: "Private pickups at Lyon Part-Dieu and Perrache with clear meeting details.", image: "/images/site/kdrive-transfert-gare-lyon-part-dieu.webp", href: "/en/train-station-transfer" },
  { title: "Corporate chauffeur", body: "Reliable transport for executives, visiting clients, meetings and conferences.", image: "/images/service-affaires.jpg", href: "/en/corporate-chauffeur" },
  { title: "Hourly chauffeur service", body: "Keep the same chauffeur for a multi-stop programme, business day or private event.", image: "/images/service-disposition.jpg", href: "/en/chauffeur-service" },
  { title: "Long-distance transfers", body: "Door-to-door journeys from Lyon to Geneva, Annecy, Grenoble, Alpine resorts and beyond.", image: "/images/hero-longues-distances.jpg", href: "/en/long-distance-transfers" },
];

const advantages = [
  { num: "01", title: "Local expertise", body: "A Lyon-based team familiar with the airport, stations, business districts and regional routes." },
  { num: "02", title: "Direct confirmation", body: "Availability, vehicle category and fare are confirmed directly before your journey." },
  { num: "03", title: "English-speaking assistance", body: "International travellers can organise their itinerary with clear, practical communication." },
  { num: "04", title: "Comfortable vehicles", body: "Choose a category suited to the number of passengers, luggage and level of comfort required." },
];

export default function EnglishHomePage() {
  return (
    <div lang="en">
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><EnglishSiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/site/kdrive-dirigeant-hotel-business-lyon.webp" alt="Private chauffeur welcoming an international traveller in Lyon" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <p className="kd-eyebrow">Private chauffeur · Lyon</p>
            <h1 className="kd-h1">Your private chauffeur in Lyon, without compromise.</h1>
            <p className="kd-lead">Airport, train stations, hotels, business meetings and events: plan your journey with a local team and receive direct confirmation.</p>
          </div>
          <div className="kd-hero-form-card"><HeroSearchForm tone="dark" locale="en" /></div>
          <p className="kd-hero-reassurance">
            <span className="kd-hero-reassurance-item">Fare confirmed in advance</span>
            <span className="kd-hero-reassurance-item">Personal confirmation</span>
            <span className="kd-hero-reassurance-item">Direct contact</span>
          </p>
          <TrustBadge />
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container kd-grid-2">
          <div className="kd-card"><h2 className="kd-h4">Request online</h2><p className="kd-body">Enter your journey details and vehicle requirements. KDRIVE will confirm availability and the fare.</p><Link className="kd-btn kd-btn--primary" href="/en/book">Request a journey</Link></div>
          <div className="kd-card"><h2 className="kd-h4">Call the team</h2><p className="kd-body">For immediate assistance or a complex itinerary, call us directly.</p><a className="kd-btn kd-btn--outline" href="tel:+33688863419">Call +33 6 88 86 34 19</a></div>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container"><div className="kd-section-head"><p className="kd-eyebrow">Services</p><h2 className="kd-h2">A chauffeur service for every journey</h2></div>
          <div className="kd-services-grid">
            {services.map((service) => <Link key={service.href} href={service.href} className="kd-card kd-card--hover kd-service-card"><SceneImage src={service.image} alt={service.title} className="kd-service-image" sizes="(max-width: 680px) 100vw, 33vw" /><h3 className="kd-h4">{service.title}</h3><p className="kd-body">{service.body}</p><span className="kd-card-link">Explore the service <span aria-hidden="true">→</span></span></Link>)}
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-2" style={{ alignItems: "center" }}>
          <SceneImage src="/images/site/kdrive-quartier-affaires-part-dieu-lyon.webp" alt="Lyon Part-Dieu business district" className="kd-scene--tall" sizes="(max-width: 680px) 100vw, 50vw" />
          <div className="kd-stack"><p className="kd-eyebrow">Why KDRIVE</p><h2 className="kd-h2">Premium standards with genuine local knowledge</h2>{advantages.map((item) => <div key={item.num} className="kd-advantage"><span className="kd-advantage-num">{item.num}</span><div><h3 className="kd-h4">{item.title}</h3><p className="kd-body">{item.body}</p></div></div>)}</div>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container"><div className="kd-section-head"><p className="kd-eyebrow">Vehicles</p><h2 className="kd-h2">Choose the right category for your journey</h2></div>
          <div className="kd-grid-3">{vehicleCatalog.map((vehicle) => <Link key={vehicle.slug} href="/en/vehicles" className="kd-card kd-card--hover kd-vehicle-card"><SceneImage src={vehicle.image} alt={vehicle.label} className="kd-vehicle-image" sizes="(max-width: 680px) 100vw, 33vw" /><div className="kd-vehicle-meta"><h3 className="kd-h4">{vehicle.label}</h3><small>{vehicle.examples.join(" · ")}</small></div><p className="kd-body">Up to {vehicle.passengers} passengers · {vehicle.luggage} bags</p><span className="kd-card-link">View vehicles <span aria-hidden="true">→</span></span></Link>)}</div>
        </div>
      </section>

      <section className="kd-section kd-on-dark">
        <div className="kd-container kd-grid-2" style={{ alignItems: "center" }}><div className="kd-stack"><p className="kd-eyebrow">Lyon and beyond</p><h2 className="kd-h2">One local contact for your complete stay</h2><p className="kd-lead">Connect the airport or station with your hotel, meetings, restaurants, event venues and onward destinations.</p><Link className="kd-btn kd-btn--gold" href="/en/contact">Plan your itinerary</Link></div><SceneImage src="/images/site/kdrive-chauffeur-centre-congres-lyon.webp" alt="Private chauffeur at the Lyon Convention Centre" className="kd-scene--tall" sizes="(max-width: 680px) 100vw, 50vw" /></div>
      </section>

      <EnglishContactCta />
      <EnglishFooter />
    </div>
  );
}
