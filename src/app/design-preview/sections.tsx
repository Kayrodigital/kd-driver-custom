import { SceneImage } from "./scene-image";

const services = [
  { title: "Trajets d’affaires", body: "Rendez-vous, aéroport, rendez-vous d’équipe : ponctualité et discrétion à chaque étape.", image: "/images/service-affaires.jpg" },
  { title: "Transferts aéroport & gares", body: "Suivi des vols et des trains en temps réel, prise en charge sans attente.", image: "/images/service-transferts.jpg" },
  { title: "Mise à disposition", body: "Un chauffeur dédié à l’heure ou à la journée, pour vos déplacements sur mesure.", image: "/images/service-disposition.jpg" },
];

const advantages = [
  { num: "01", title: "Chauffeurs locaux", body: "Une équipe basée à Lyon, à l’écoute de vos habitudes de déplacement." },
  { num: "02", title: "Tarif annoncé à l’avance", body: "Un prix calculé avant confirmation, sans surprise à l’arrivée." },
  { num: "03", title: "Réservation immédiate", body: "Une demande envoyée en quelques secondes, sans compte à créer." },
  { num: "04", title: "Véhicules soignés", body: "Une flotte pensée pour le confort, adaptée à chaque trajet." },
];

const vehicles = [
  { name: "Berline", body: "Jusqu’à 4 passagers · confort et sobriété pour le quotidien.", image: "/images/vehicle-berline.jpg" },
  { name: "Confort", body: "Jusqu’à 4 passagers · un cran au-dessus pour les occasions importantes.", image: "/images/vehicle-confort.jpg" },
  { name: "Van", body: "Jusqu’à 7 passagers · pour les groupes et les familles.", image: "/images/vehicle-van.jpg" },
];

const zones = ["Lyon", "Villeurbanne", "Aéroport Lyon-Saint Exupéry", "Gare Part-Dieu", "Gare Perrache", "Écully", "Caluire-et-Cuire", "Vénissieux"];

export function SiteNav() {
  return (
    <div className="kd-container kd-nav">
      <span className="kd-logo">KD <b>Driver</b></span>
      <ul className="kd-nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#vehicules">Véhicules</a></li>
        <li><a href="#entreprise">Entreprise</a></li>
        <li><a href="#zones">Zones desservies</a></li>
      </ul>
      <div className="kd-nav-actions">
        <a className="kd-nav-phone" href="tel:+33652211292">06 52 21 12 92</a>
        <a className="kd-btn kd-btn--sm kd-btn--gold" href="#reserver">Réserver</a>
      </div>
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
        <div className="kd-grid-3">
          {services.map((service) => (
            <a key={service.title} href="#reserver" className="kd-card kd-card--hover kd-card--flat kd-service-card">
              <SceneImage src={service.image} alt={service.title} className="kd-service-image" />
              <h3 className="kd-h4">{service.title}</h3>
              <p className="kd-body">{service.body}</p>
              <span className="kd-card-link">Découvrir <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section className="kd-section kd-on-white">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Pourquoi KD Driver</p>
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
          {vehicles.map((vehicle) => (
            <div key={vehicle.name} className="kd-card kd-card--hover kd-vehicle-card">
              <SceneImage src={vehicle.image} alt={vehicle.name} note="photo à venir" className="kd-vehicle-image" />
              <div className="kd-vehicle-meta">
                <h3 className="kd-h4">{vehicle.name}</h3>
                <small>Prix calculé</small>
              </div>
              <p className="kd-body">{vehicle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AirportSection() {
  return (
    <section className="kd-section kd-on-white">
      <div className="kd-container kd-grid-2" style={{ alignItems: "center" }}>
        <SceneImage src="/images/airport-transfer.jpg" alt="Transfert aéroport" note="photo à venir" className="kd-scene--tall" />
        <div className="kd-stack">
          <p className="kd-eyebrow">Aéroport &amp; gares</p>
          <h2 className="kd-h2">Votre vol ou votre train suivi, votre chauffeur à l’heure</h2>
          <p className="kd-lead">Le trajet est ajusté en fonction des horaires réels : votre chauffeur vous attend, pas l’inverse.</p>
          <a className="kd-btn kd-btn--outline" href="#reserver">Réserver un transfert</a>
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
          <a className="kd-btn kd-btn--outline" href="#contact-entreprise">Nous contacter</a>
        </div>
        <SceneImage src="/images/corporate.jpg" alt="Déplacements professionnels" note="photo à venir" className="kd-scene--tall" />
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
          {zones.map((zone) => <span key={zone} className="kd-zone-chip">{zone}</span>)}
        </div>
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
        <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation</a>
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
            <span className="kd-logo">KD <b>Driver</b></span>
            <p className="kd-body" style={{ color: "var(--kd-muted-on-dark)", marginTop: 12 }}>Chauffeur privé premium à Lyon et dans sa région.</p>
          </div>
          <div className="kd-footer-col">
            <h4>Services</h4>
            <ul><li>Trajets d’affaires</li><li>Aéroport &amp; gares</li><li>Mise à disposition</li></ul>
          </div>
          <div className="kd-footer-col">
            <h4>Entreprise</h4>
            <ul><li>À propos</li><li>Entreprises</li><li>Contact</li></ul>
          </div>
          <div className="kd-footer-col">
            <h4>Contact</h4>
            <ul><li>06 52 21 12 92</li><li>Lyon, France</li></ul>
          </div>
        </div>
        <div className="kd-footer-bottom">
          <span>© {new Date().getFullYear()} KD Driver</span>
          <span>Mentions légales · Confidentialité</span>
        </div>
      </div>
    </footer>
  );
}
