import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";

const benefits = [
  { title: "Vol suivi", body: "L’heure de prise en charge s’ajuste à l’horaire réel de votre vol." },
  { title: "Accueil personnalisé", body: "Votre chauffeur vous attend avec un panneau à votre nom." },
  { title: "Tarif annoncé à l’avance", body: "Un prix calculé avant confirmation, sans surprise à l’arrivée." },
];

const steps = [
  { num: "1", title: "Indiquez votre trajet", body: "Adresse ou aéroport de départ, destination, date et heure." },
  { num: "2", title: "Confirmez votre demande", body: "Un numéro de téléphone suffit pour envoyer votre demande." },
  { num: "3", title: "Votre chauffeur vous attend", body: "KD Driver confirme rapidement la disponibilité et le tarif." },
];

const usefulInfo = [
  "Aéroport Lyon-Saint Exupéry (LYS)",
  "Prise en charge ajustée en cas de retard de vol",
  "Trajet aller simple ou aller-retour",
];

/**
 * Template de page service — première déclinaison (Transfert aéroport), à
 * valider avant d'être répliquée sur les autres pages (Transfert gare,
 * Entreprise, Mise à disposition, Longues distances…).
 */
export function ServicePageTemplate() {
  return (
    <div style={{ border: "1px solid var(--kd-line)", borderRadius: "var(--kd-radius-lg)", overflow: "hidden", boxShadow: "var(--kd-shadow-lg)" }}>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      {/* Hero premium : titre court, bénéfice principal, un seul CTA */}
      <section className="kd-hero kd-hero--a kd-on-dark">
        <SceneImage src="/images/airport-transfer.jpg" alt="" className="kd-hero-photo" />
        <div className="kd-container kd-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div className="kd-hero-copy">
            <p className="kd-eyebrow">Transfert aéroport</p>
            <h1 className="kd-h1">Lyon-Saint Exupéry, sans stress.</h1>
            <p className="kd-lead">Votre chauffeur suit votre vol et vous attend, quelle que soit l’heure d’arrivée.</p>
            <a className="kd-btn kd-btn--gold" href="#reserver" style={{ marginTop: 8, alignSelf: "start" }}>
              Réserver mon transfert <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Présentation de la prestation */}
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">La prestation</p>
          <h2 className="kd-h2">Une arrivée aussi sereine que le vol</h2>
          <p className="kd-lead">
            Que vous atterrissiez tôt le matin ou tard le soir, votre chauffeur ajuste la prise en charge à l’heure réelle
            de votre vol et vous accompagne jusqu’à votre destination à Lyon ou dans sa région.
          </p>
        </div>
      </section>

      {/* Trois bénéfices */}
      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-grid-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="kd-card kd-card--flat">
                <h3 className="kd-h4">{benefit.title}</h3>
                <p className="kd-body" style={{ marginTop: 8 }}>{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visuel réaliste */}
      <section className="kd-section kd-on-cream" style={{ paddingTop: 0 }}>
        <div className="kd-container">
          <SceneImage src="/images/service-transferts.jpg" alt="Transfert aéroport KD Driver" className="kd-scene--tall" style={{ minHeight: 420 }} />
        </div>
      </section>

      {/* Déroulement de la réservation */}
      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Réservation</p>
            <h2 className="kd-h2">Trois étapes, aucune attente</h2>
          </div>
          <div className="kd-grid-3">
            {steps.map((step) => (
              <div key={step.num} className="kd-advantage">
                <span className="kd-advantage-num">{step.num}</span>
                <div>
                  <h3 className="kd-h4">{step.title}</h3>
                  <p className="kd-body">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informations utiles */}
      <section className="kd-section kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 640 }}>
          <p className="kd-eyebrow">Informations utiles</p>
          <ul className="kd-stack" style={{ marginTop: 16, listStyle: "none", padding: 0 }}>
            {usefulInfo.map((info) => (
              <li key={info} className="kd-body" style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <span aria-hidden="true" style={{ color: "var(--kd-gold)" }}>—</span> {info}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Réassurance */}
      <section className="kd-section kd-on-dark">
        <div className="kd-container kd-section-head--center kd-stack">
          <p className="kd-eyebrow">Réassurance</p>
          <h2 className="kd-h2">Une équipe locale, un service pensé pour durer</h2>
          <p className="kd-lead" style={{ margin: "0 auto" }}>
            KD Driver est une entreprise locale à Lyon. Chaque demande est confirmée par un échange direct, sans
            réservation automatique non vérifiée.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section id="reserver" className="kd-section kd-on-white">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Votre transfert aéroport, en quelques secondes</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
