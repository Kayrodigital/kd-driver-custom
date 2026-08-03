import { SceneImage } from "@/app/design-preview/scene-image";

const services = [
  { key: "aeroport", kicker: "Service", navLabel: "Transfert aéroport", lead: "Une prise en charge préparée à l'avance pour votre arrivée ou votre départ à l'aéroport Lyon-Saint Exupéry.", heroImage: "/images/airport-transfer.jpg" },
  { key: "gare", kicker: "Service", navLabel: "Transfert gare", lead: "KDRIVE assure des prises en charge sur réservation aux principales gares de Lyon, notamment Part-Dieu et Perrache.", heroImage: "/images/service-transferts.jpg" },
  { key: "entreprise", kicker: "Service", navLabel: "Chauffeur entreprise", lead: "Ponctualité, discrétion et disponibilité pour vos rendez-vous, équipes et visiteurs.", heroImage: "/images/service-affaires.jpg" },
];

export function ServicesV2() {
  return (
    <section id="services-v2" className="v2-section v2-on-cream">
      <div className="v2-container">
        <div className="v2-section-head v2-fade-up">
          <p className="v2-kicker">Services</p>
          <h2 className="v2-h2">Un chauffeur privé pour chaque déplacement</h2>
        </div>
        <div className="v2-grid-3">
          {services.map((service) => (
            <div key={service.key} className="v2-service-card">
              <div className="v2-service-image-wrap">
                <SceneImage src={service.heroImage} alt={service.navLabel} note="photo à venir" sizes="(max-width: 860px) 100vw, 33vw" style={{ position: "absolute", inset: 0 }} />
              </div>
              <p className="v2-kicker">{service.kicker}</p>
              <h3 className="v2-h3">{service.navLabel}</h3>
              <div className="v2-service-divider" />
              <p className="v2-body">{service.lead}</p>
              <a className="v2-card-link" href="#">En savoir plus <span aria-hidden="true">→</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const vehicles = [
  { name: "Confort", tagline: "Entrée de gamme", mode: "Prix calculé", body: "La solution essentielle pour vos déplacements du quotidien. Une catégorie simple, confortable et économique pour voyager seul ou en petit groupe.", image: "/images/vehicle-confort.jpg" },
  { name: "Berline", tagline: "Catégorie supérieure", mode: "Prix calculé", body: "Une catégorie supérieure pour profiter d'un véhicule plus spacieux et plus valorisant. Adaptée aux rendez-vous professionnels, aux transferts et aux trajets nécessitant davantage de standing.", image: "/images/vehicle-berline.jpg" },
  { name: "Luxe", tagline: "Premium", mode: "Prix calculé", body: "Une prestation haut de gamme pour les déplacements où le confort, la discrétion et la qualité du véhicule occupent une place centrale.", image: "/images/vehicle-luxe.jpg" },
];

export function VehiclesV2() {
  return (
    <section id="vehicules-v2" className="v2-section v2-on-white">
      <div className="v2-container">
        <div className="v2-section-head v2-fade-up">
          <p className="v2-kicker">Véhicules</p>
          <h2 className="v2-h2">Une gamme claire, du quotidien au premium</h2>
        </div>
        <div className="v2-grid-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.name} className="v2-vehicle-card">
              <div className="v2-vehicle-image-wrap">
                <SceneImage src={vehicle.image} alt={vehicle.name} note="photo à venir" sizes="(max-width: 860px) 100vw, 33vw" style={{ position: "absolute", inset: 0 }} />
                <span className="v2-vehicle-tag" style={{ position: "absolute", top: 16, left: 16 }}>{vehicle.mode}</span>
              </div>
              <p className="v2-vehicle-tagline">{vehicle.tagline}</p>
              <div className="v2-vehicle-meta"><h3 className="v2-h3">{vehicle.name}</h3></div>
              <p className="v2-body">{vehicle.body}</p>
              <a className="v2-card-link" href="#">Choisir ce véhicule <span aria-hidden="true">→</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReassuranceV2() {
  return (
    <section id="reassurance-v2" className="v2-section v2-on-dark">
      <div className="v2-container">
        <div className="v2-section-head v2-fade-up" style={{ margin: "0 auto var(--v2-space-8)", textAlign: "center", justifyItems: "center" }}>
          <p className="v2-kicker">KDRIVE</p>
          <p className="v2-quote">« Le chauffeur, pas le chauffeur de VTC. »</p>
        </div>
        <div className="v2-reassurance-grid">
          <div className="v2-reassurance-card">
            <svg className="v2-reassurance-icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <h3 className="v2-h3">Tarif connu à l&apos;avance</h3>
            <p className="v2-lead" style={{ maxWidth: 320 }}>Un prix calculé à partir de la distance réelle, confirmé avant votre trajet.</p>
          </div>
          <div className="v2-reassurance-card">
            <svg className="v2-reassurance-icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 11l4-4 4 3 3-3 4 4" /><path d="M3 11l3 5 4 2 5-2 3-5" /></svg>
            <h3 className="v2-h3">Confirmation humaine</h3>
            <p className="v2-lead" style={{ maxWidth: 320 }}>Chaque demande est confirmée individuellement par l&apos;équipe KDRIVE.</p>
          </div>
          <div className="v2-reassurance-card">
            <svg className="v2-reassurance-icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
            <h3 className="v2-h3">Contact direct</h3>
            <p className="v2-lead" style={{ maxWidth: 320 }}>Un numéro unique, joignable pour toute question avant ou après la course.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaV2() {
  return (
    <section id="contact-v2" className="v2-section v2-section--tight v2-on-cream">
      <div className="v2-container v2-cta">
        <p className="v2-kicker">Réservation</p>
        <h2 className="v2-h2">Réservez votre chauffeur privé KDRIVE</h2>
        <a id="reserver-v2" className="v2-btn" href="#" style={{ background: "var(--v2-black)" }}>Demander une réservation <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
