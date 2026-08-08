import Image from "next/image";
import Link from "next/link";
import { MobileNavTrigger } from "./mobile-nav-trigger";
import { NavDropdown } from "./nav-dropdown";
import { SceneImage } from "./scene-image";
import { ReviewsWidget } from "./reviews-widget";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { formatEuros } from "@/domain/pricing/money";

const serviceNavItems = [
  { label: "Transfert aéroport", href: "/transfert-aeroport" },
  { label: "Transfert gare", href: "/transfert-gare" },
  { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
  { label: "Mise à disposition", href: "/mise-a-disposition" },
  { label: "Longues distances", href: "/longues-distances" },
];

const aboutNavItems = [
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const services = [
  { title: "Trajets d’affaires", body: "Rendez-vous, aéroport, rendez-vous d’équipe : ponctualité et discrétion à chaque étape.", image: "/images/service-affaires.jpg", href: "/chauffeur-entreprise" },
  { title: "Transferts aéroport & gares", body: "Prise en charge préparée à l’avance pour vos transferts vers les gares et l’aéroport.", image: "/images/service-transferts.jpg", href: "/transfert-aeroport" },
  { title: "Mise à disposition", body: "Un chauffeur dédié à l’heure ou à la journée, pour vos déplacements sur mesure.", image: "/images/service-disposition.jpg", href: "/mise-a-disposition" },
];

const advantages = [
  { num: "01", title: "Chauffeurs locaux", body: "Une équipe basée à Lyon, à l’écoute de vos habitudes de déplacement." },
  { num: "02", title: "Tarif annoncé à l’avance", body: "Un prix calculé avant confirmation, sans surprise à l’arrivée." },
  { num: "03", title: "Réservation immédiate", body: "Une demande envoyée en quelques secondes, sans compte à créer." },
  { num: "04", title: "Véhicules soignés", body: "Une flotte pensée pour le confort, adaptée à chaque trajet." },
];

const vehicles = [
  { slug: "confort", name: "Confort", mode: "Prix calculé", body: "Jusqu’à 4 passagers · la solution simple et économique pour le quotidien.", image: "/images/vehicle-confort.jpg" },
  { slug: "berline", name: "Berline", mode: "Prix calculé", body: "Jusqu’à 4 passagers · un cran au-dessus, pour le standing des rendez-vous professionnels.", image: "/images/vehicle-berline.jpg" },
  { slug: "van", name: "Van", mode: "Sur devis", body: "Jusqu’à 7 passagers · pour les groupes et les familles.", image: "/images/vehicle-van.jpg" },
];

const zones = ["Lyon", "Villeurbanne", "Aéroport Lyon-Saint Exupéry", "Gare Part-Dieu", "Gare Perrache", "Écully", "Caluire-et-Cuire", "Vénissieux"];

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="kd-logo">
      <Image src="/logo-icon.png" alt="" width={size} height={size} style={{ height: size, width: "auto" }} priority />
      <span>KDRIVE</span>
    </span>
  );
}

export function SiteNav() {
  return (
    <div className="kd-container kd-nav">
      <Link href="/" aria-label="KDRIVE, accueil"><Logo /></Link>
      <ul className="kd-nav-links">
        <li><NavDropdown label="Services" items={serviceNavItems} /></li>
        <li><Link href="/vehicules">Véhicules</Link></li>
        <li><Link href="/tarifs">Tarifs</Link></li>
        <li><NavDropdown label="À propos" items={aboutNavItems} /></li>
      </ul>
      <div className="kd-nav-actions">
        <a className="kd-nav-phone" href="tel:+33688863419">06 88 86 34 19</a>
        <Link className="kd-btn kd-btn--sm kd-btn--gold" href="/reserver">Réserver</Link>
      </div>
      <MobileNavTrigger />
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="kd-section kd-on-cream">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Services</p>
          <h2 className="kd-h2">Un chauffeur privé pour chaque déplacement</h2>
        </div>
        <div className="kd-services-grid">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="kd-card kd-card--hover kd-service-card">
              <SceneImage src={service.image} alt={service.title} className="kd-service-image" sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" />
              <h3 className="kd-h4">{service.title}</h3>
              <p className="kd-body">{service.body}</p>
              <span className="kd-card-link">Découvrir le service <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <p className="kd-body" style={{ marginTop: "var(--kd-space-4)" }}>
          Vous partez plus loin ? Découvrez nos <Link href="/longues-distances">trajets longue distance</Link> ou
          réservez un <Link href="/transfert-gare">transfert gare</Link>.
        </p>
      </div>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section className="kd-section kd-on-white">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Pourquoi KDRIVE</p>
          <h2 className="kd-h2">L’exigence d’un service premium, l’ancrage local en plus</h2>
        </div>
        <div className="kd-grid-2">
          {advantages.map((advantage) => (
            <div key={advantage.num} className="kd-advantage">
              <span className="kd-advantage-num">{advantage.num}</span>
              <div>
                <h3 className="kd-h4">{advantage.title}</h3>
                <p className="kd-body">{advantage.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VehiclesSection() {
  return (
    <section id="vehicules" className="kd-section kd-on-cream">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Véhicules</p>
          <h2 className="kd-h2">Une flotte adaptée à chaque trajet</h2>
        </div>
        <div className="kd-grid-3">
          {vehicles.map((vehicle) => {
            const category = pricingConfig.categories[vehicle.slug];
            const fromPrice = category?.mode === "calculated" && category.minimumByTripType.standard != null
              ? formatEuros(category.minimumByTripType.standard * 100)
              : null;
            return (
              <Link key={vehicle.name} href="/vehicules" className="kd-card kd-card--hover kd-vehicle-card">
                <SceneImage src={vehicle.image} alt={vehicle.name} note="photo à venir" className="kd-vehicle-image" sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" />
                <div className="kd-vehicle-meta">
                  <h3 className="kd-h4">{vehicle.name}</h3>
                  <small>{vehicle.mode}</small>
                </div>
                {fromPrice && <p className="kd-body" style={{ fontWeight: 700, margin: 0 }}>À partir de {fromPrice}</p>}
                <p className="kd-body">{vehicle.body}</p>
                <span className="kd-card-link">En savoir plus <span aria-hidden="true">→</span></span>
              </Link>
            );
          })}
        </div>
        <p className="kd-body" style={{ marginTop: "var(--kd-space-4)" }}>
          Retrouvez le détail des <Link href="/tarifs">tarifs par catégorie</Link>.
        </p>
      </div>
    </section>
  );
}

export function AirportSection() {
  return (
    <section className="kd-section kd-on-white">
      <div className="kd-container kd-grid-2" style={{ alignItems: "center" }}>
        <SceneImage src="/images/airport-transfer.jpg" alt="Transfert aéroport" note="photo à venir" className="kd-scene--tall" sizes="(max-width: 680px) 100vw, 50vw" />
        <div className="kd-stack">
          <p className="kd-eyebrow">Aéroport &amp; gares</p>
          <h2 className="kd-h2">Votre chauffeur, prêt pour votre vol ou votre train</h2>
          <p className="kd-lead">Renseignez votre numéro de vol ou l’heure de votre train : KDRIVE prépare votre prise en charge et reste joignable en cas de changement.</p>
          <Link className="kd-btn kd-btn--outline" href="/transfert-aeroport">Réserver un transfert</Link>
        </div>
      </div>
    </section>
  );
}

export function CorporateSection() {
  return (
    <section id="entreprise" className="kd-section kd-on-cream">
      <div className="kd-container kd-grid-2" style={{ alignItems: "center" }}>
        <div className="kd-stack">
          <p className="kd-eyebrow">Entreprise</p>
          <h2 className="kd-h2">Des déplacements professionnels sans friction</h2>
          <p className="kd-lead">Facturation centralisée, chauffeurs dédiés, disponibilité étendue : une offre pensée pour les équipes qui se déplacent souvent.</p>
          <Link className="kd-btn kd-btn--outline" href="/chauffeur-entreprise">En savoir plus</Link>
        </div>
        <SceneImage src="/images/corporate.jpg" alt="Déplacements professionnels" note="photo à venir" className="kd-scene--tall" sizes="(max-width: 680px) 100vw, 50vw" />
      </div>
    </section>
  );
}

export function ZonesSection() {
  return (
    <section id="zones" className="kd-section kd-on-dark">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Zones desservies</p>
          <h2 className="kd-h2">Lyon et sa région</h2>
        </div>
        <div className="kd-zone-list">
          {zones.map((zone, index) => (
            <span key={zone} className={`kd-zone-chip${index === 0 ? " kd-zone-chip--primary" : ""}`}>{zone}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="avis" className="kd-section kd-on-cream">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Avis clients</p>
          <h2 className="kd-h2">Ce que nos clients disent de KDRIVE</h2>
        </div>
        <ReviewsWidget pid="97e48897843c59738b56f76f33b" />
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="reserver" className="kd-section kd-on-white">
      <div className="kd-container kd-cta">
        <p className="kd-eyebrow">Réservation</p>
        <h2 className="kd-h2">Votre chauffeur, en quelques secondes</h2>
        <p className="kd-lead">Départ, destination, date et téléphone suffisent pour envoyer votre demande.</p>
        <Link className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation</Link>
        <p className="kd-field-hint" style={{ marginTop: "var(--kd-space-3)" }}>
          Après votre demande, KDRIVE vérifie la disponibilité et confirme le tarif de la course. Une question ?
          Consultez notre <Link href="/faq">FAQ</Link>.
        </p>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="kd-footer kd-on-dark">
      <div className="kd-container">
        <div className="kd-footer-grid">
          <div className="kd-footer-col">
            <Logo size={30} />
            <p className="kd-body" style={{ color: "var(--kd-muted-on-dark)", marginTop: 12 }}>Chauffeur privé premium à Lyon et dans sa région.</p>
          </div>
          <div className="kd-footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/chauffeur-entreprise">Trajets d’affaires</Link></li>
              <li><Link href="/transfert-aeroport">Transfert aéroport</Link></li>
              <li><Link href="/transfert-gare">Transfert gare</Link></li>
              <li><Link href="/mise-a-disposition">Mise à disposition</Link></li>
              <li><Link href="/longues-distances">Longues distances</Link></li>
              <li><Link href="/vehicules">Nos véhicules</Link></li>
            </ul>
          </div>
          <div className="kd-footer-col">
            <h4>Entreprise</h4>
            <ul>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/tarifs">Tarifs</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="kd-footer-col">
            <h4>Contact</h4>
            <ul><li>06 88 86 34 19</li><li>Lyon, France</li></ul>
          </div>
        </div>
        <div className="kd-footer-bottom">
          <span>© {new Date().getFullYear()} KDRIVE</span>
          <span>Mentions légales · <Link href="/politique-de-confidentialite">Confidentialité</Link></span>
        </div>
      </div>
    </footer>
  );
}
