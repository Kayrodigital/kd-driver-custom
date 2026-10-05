import Link from "next/link";
import { Breadcrumb } from "../breadcrumb";
import { SceneImage } from "../scene-image";
import { Logo } from "../sections";
import { MobileNavTrigger } from "../mobile-nav-trigger";
import type { EnglishServicePageContent } from "@/content/en/service-pages";

const navItems = [
  { href: "/en/airport-transfer", label: "Airport" },
  { href: "/en/train-station-transfer", label: "Stations" },
  { href: "/en/corporate-chauffeur", label: "Business" },
  { href: "/en/long-distance-transfers", label: "Long distance" },
  { href: "/en/vehicles", label: "Vehicles" },
  { href: "/en/rates", label: "Rates" },
];

export function EnglishSiteNav() {
  return (
    <div className="kd-container kd-nav">
      <Link href="/en" aria-label="KDRIVE English homepage"><Logo /></Link>
      <ul className="kd-nav-links">
        {navItems.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
      </ul>
      <div className="kd-nav-actions">
        <Link className="kd-language-switch" href="/" hrefLang="fr" aria-label="View the site in French">🇫🇷 FR</Link>
        <a className="kd-nav-phone" href="tel:+33688863419">+33 6 88 86 34 19</a>
        <Link className="kd-btn kd-btn--sm kd-btn--gold" href="/en/book">Book</Link>
      </div>
      <MobileNavTrigger locale="en" />
    </div>
  );
}

export function EnglishFooter() {
  return (
    <footer className="kd-footer kd-on-dark">
      <div className="kd-container">
        <div className="kd-footer-grid">
          <div className="kd-footer-col">
            <Logo size={30} />
            <p className="kd-body" style={{ color: "var(--kd-muted-on-dark)", marginTop: 12 }}>Private driver service in Lyon and the surrounding region.</p>
          </div>
          <div className="kd-footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/en/airport-transfer">Airport transfers</Link></li>
              <li><Link href="/en/train-station-transfer">Station transfers</Link></li>
              <li><Link href="/en/corporate-chauffeur">Business driver service</Link></li>
              <li><Link href="/en/chauffeur-service">Private driver by the hour</Link></li>
              <li><Link href="/en/long-distance-transfers">Long-distance private transfers</Link></li>
            </ul>
          </div>
          <div className="kd-footer-col">
            <h4>Plan your journey</h4>
            <ul>
              <li><Link href="/en/vehicles">Vehicles</Link></li>
              <li><Link href="/en/rates">Rates</Link></li>
              <li><Link href="/en/contact">Contact</Link></li>
              <li><Link href="/">French site</Link></li>
            </ul>
          </div>
          <div className="kd-footer-col">
            <h4>Contact</h4>
            <ul><li><a href="tel:+33688863419">+33 6 88 86 34 19</a></li><li>Lyon, France</li></ul>
          </div>
        </div>
        <div className="kd-footer-bottom">
          <span>© {new Date().getFullYear()} KDRIVE</span>
          <span><Link href="/politique-de-confidentialite">Privacy policy (French)</Link></span>
        </div>
      </div>
    </footer>
  );
}

export function EnglishContactCta({ title = "Plan your journey with KDRIVE" }: { title?: string }) {
  return (
    <section id="reserver" className="kd-section kd-on-white">
      <div className="kd-container kd-cta-split">
        <div className="kd-cta">
          <p className="kd-eyebrow">Booking request</p>
          <h2 className="kd-h2">{title}</h2>
          <p className="kd-lead">Send us your itinerary or call the team. Availability and the fare are confirmed directly before your journey.</p>
          <Link className="kd-btn kd-btn--primary" href="/en/book">Request a private driver</Link>
        </div>
        <ul className="kd-cta-list">
          <li>Fare confirmed in advance</li>
          <li>Personal confirmation</li>
          <li>Direct contact with KDRIVE</li>
        </ul>
      </div>
    </section>
  );
}

export function EnglishServicePageTemplate({ content }: { content: EnglishServicePageContent }) {
  return (
    <div lang="en">
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><EnglishSiteNav /></header>

      <section className="kd-hero kd-hero--a kd-on-dark">
        <SceneImage src={content.heroImage} alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div className="kd-hero-copy">
            <Breadcrumb locale="en" items={[{ label: "Home", href: "/en" }, { label: "Services" }, { label: content.navLabel }]} />
            <p className="kd-eyebrow">{content.eyebrow}</p>
            <h1 className="kd-h1">{content.title}</h1>
            <p className="kd-lead">{content.lead}</p>
            <Link className="kd-btn kd-btn--gold" href="/en/book" style={{ marginTop: 8, alignSelf: "start" }}>Request a private driver <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 760 }}>
          <p className="kd-eyebrow">The service</p>
          <h2 className="kd-h2">{content.presentationTitle}</h2>
          <p className="kd-lead">{content.presentationBody}</p>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-grid-3">
          {content.benefits.map((benefit) => (
            <div key={benefit.title} className="kd-card kd-card--flat"><h3 className="kd-h4">{benefit.title}</h3><p className="kd-body">{benefit.body}</p></div>
          ))}
        </div>
      </section>

      <section className="kd-section kd-on-cream" style={{ paddingTop: 0 }}>
        <div className="kd-container"><SceneImage src={content.visualImage} alt="" className="kd-scene--tall" style={{ minHeight: 420 }} sizes="100vw" /></div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head"><p className="kd-eyebrow">How it works</p><h2 className="kd-h2">Three clear steps</h2></div>
          <div className="kd-grid-3">
            {content.steps.map((step, index) => (
              <div key={step.title} className="kd-advantage"><span className="kd-advantage-num">0{index + 1}</span><div><h3 className="kd-h4">{step.title}</h3><p className="kd-body">{step.body}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container kd-grid-2" style={{ alignItems: "start" }}>
          <div><p className="kd-eyebrow">Useful information</p><ul className="kd-stack" style={{ marginTop: 16, paddingLeft: 20 }}>{content.usefulInfo.map((info) => <li key={info} className="kd-body">{info}</li>)}</ul></div>
          <div><p className="kd-eyebrow">Continue planning</p><ul className="kd-stack" style={{ marginTop: 16, listStyle: "none", padding: 0 }}>{content.relatedLinks.map((link) => <li key={link.href}><Link className="kd-card-link" href={link.href}>{link.label} <span aria-hidden="true">→</span></Link></li>)}</ul></div>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-dark">
        <div className="kd-container kd-section-head--center kd-stack"><p className="kd-eyebrow">Peace of mind</p><h2 className="kd-h2">{content.reassuranceTitle}</h2><p className="kd-lead" style={{ margin: "0 auto" }}>{content.reassuranceBody}</p></div>
      </section>

      <EnglishContactCta />
      <EnglishFooter />
    </div>
  );
}
