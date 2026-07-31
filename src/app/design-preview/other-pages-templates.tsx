import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";

function PageShell({ children, framed = true }: { children: React.ReactNode; framed?: boolean }) {
  const frameStyle = framed ? { border: "1px solid var(--kd-line)", borderRadius: "var(--kd-radius-lg)", overflow: "hidden", boxShadow: "var(--kd-shadow-lg)" } : undefined;
  return (
    <div style={frameStyle}>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>
      {children}
      <FooterSection />
    </div>
  );
}

function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="kd-section kd-on-dark" style={{ paddingBottom: "var(--kd-space-6)" }}>
      <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
        <p className="kd-eyebrow">{eyebrow}</p>
        <h1 className="kd-h1">{title}</h1>
        <p className="kd-lead">{lead}</p>
      </div>
    </section>
  );
}

const allVehicles = [
  { name: "Berline", mode: "Prix calculé", body: "Jusqu’à 4 passagers · confort et sobriété pour le quotidien.", image: "/images/vehicle-berline.jpg" },
  { name: "Confort", mode: "Prix calculé", body: "Jusqu’à 4 passagers · un cran au-dessus pour les occasions importantes.", image: "/images/vehicle-confort.jpg" },
  { name: "Van", mode: "Sur devis", body: "Jusqu’à 7 passagers · pour les groupes et les familles.", image: "/images/vehicle-van.jpg" },
  { name: "Luxe", mode: "Sur devis", body: "Pour les trajets où le véhicule fait partie de l’expérience.", image: "/images/vehicle-luxe.jpg" },
  { name: "Monospace", mode: "Sur devis", body: "Pour les groupes avec davantage de bagages.", image: "/images/vehicle-monospace.jpg" },
];

export function VehiclesPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="Nos véhicules" title="Une flotte adaptée à chaque trajet" lead="Les catégories Berline et Confort affichent un prix calculé avant confirmation. Luxe, Van et Monospace font l’objet d’un devis." />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-3">
          {allVehicles.map((vehicle) => (
            <div key={vehicle.name} className="kd-card kd-card--hover kd-vehicle-card">
              <SceneImage src={vehicle.image} alt={vehicle.name} note="photo à venir" className="kd-vehicle-image" />
              <div className="kd-vehicle-meta">
                <h3 className="kd-h4">{vehicle.name}</h3>
                <small>{vehicle.mode}</small>
              </div>
              <p className="kd-body">{vehicle.body}</p>
              <a className="kd-card-link" href="/reserver">{vehicle.mode === "Prix calculé" ? "Choisir ce véhicule" : "Demander un devis"} <span aria-hidden="true">→</span></a>
            </div>
          ))}
        </div>
      </section>
      <section id="reserver" className="kd-section kd-on-white">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Choisissez votre véhicule en réservant</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </PageShell>
  );
}

const pricingPrinciples = [
  { title: "Calculé avant confirmation", body: "Pour Berline et Confort, le prix est calculé à partir de la distance réelle et affiché avant toute confirmation." },
  { title: "Sur devis pour certains trajets", body: "Luxe, Van, Monospace et les trajets longue distance font l’objet d’un devis personnalisé." },
  { title: "Aucune surprise à l’arrivée", body: "Le montant annoncé au moment de la confirmation est celui qui s’applique." },
];

export function TarifsPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="Tarifs" title="Un prix connu avant de partir" lead="KDRIVE calcule le tarif de votre trajet côté serveur, à partir de la distance réelle, avant toute confirmation." />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-3">
          {pricingPrinciples.map((principle) => (
            <div key={principle.title} className="kd-card kd-card--flat">
              <h3 className="kd-h4">{principle.title}</h3>
              <p className="kd-body" style={{ marginTop: 8 }}>{principle.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="kd-section kd-on-white">
        <div className="kd-container" style={{ maxWidth: 640 }}>
          <p className="kd-eyebrow">Bon à savoir</p>
          <p className="kd-body" style={{ marginTop: 12 }}>
            Les montants précis par catégorie de véhicule sont communiqués lors de votre demande de réservation, une fois
            le trajet renseigné. Cette page sera complétée avec la grille tarifaire dès qu’elle sera validée.
          </p>
        </div>
      </section>
      <section id="reserver" className="kd-section kd-on-dark">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Obtenez votre tarif en quelques secondes</h2>
          <a className="kd-btn kd-btn--gold" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </PageShell>
  );
}

export function AboutPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="À propos" title="Une entreprise locale, à Lyon" lead="KDRIVE propose un service de chauffeur privé pensé pour les habitants, les entreprises et les visiteurs de Lyon et sa région." />
      <section className="kd-section kd-on-cream" style={{ paddingTop: 0 }}>
        <div className="kd-container">
          <SceneImage src="/images/about-lyon.jpg" alt="Lyon" className="kd-scene--tall" style={{ minHeight: 420 }} />
        </div>
      </section>
      <section className="kd-section kd-on-white">
        <div className="kd-container" style={{ maxWidth: 640 }}>
          <p className="kd-eyebrow">Notre approche</p>
          <p className="kd-lead" style={{ marginTop: 12 }}>
            Chaque demande est traitée directement par l’équipe KDRIVE : pas de réservation automatisée sans
            vérification, pas d’intermédiaire. L’objectif est simple — un trajet confirmé, un tarif clair, un chauffeur
            ponctuel.
          </p>
        </div>
      </section>
      <section id="reserver" className="kd-section kd-on-cream">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Faites confiance à une équipe locale</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </PageShell>
  );
}

export function ContactPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="Contact" title="Nous contacter" lead="Pour une demande de réservation, le formulaire reste le moyen le plus rapide. Pour toute autre question, contactez-nous directement." />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-2" style={{ alignItems: "start" }}>
          <div className="kd-card">
            <p className="kd-eyebrow">Téléphone</p>
            <h3 className="kd-h3" style={{ margin: "10px 0" }}><a href="tel:+33652211292" style={{ textDecoration: "none", color: "inherit" }}>06 52 21 12 92</a></h3>
            <p className="kd-body">Disponible pour vos questions et demandes urgentes.</p>
          </div>
          <div className="kd-card">
            <p className="kd-eyebrow">Zone d’intervention</p>
            <h3 className="kd-h3" style={{ margin: "10px 0" }}>Lyon, France</h3>
            <p className="kd-body">Lyon, Villeurbanne et l’agglomération lyonnaise.</p>
          </div>
        </div>
      </section>
      <section id="reserver" className="kd-section kd-on-white">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Envoyer une demande de réservation</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </PageShell>
  );
}

const faqItems = [
  { q: "Comment réserver un trajet ?", a: "Renseignez le départ, la destination, la date, l’heure et votre téléphone dans le formulaire de réservation. KDRIVE vous confirme rapidement la disponibilité et le tarif." },
  { q: "Le paiement se fait-il en ligne ?", a: "Non, il n’y a pas de paiement en ligne pour le moment. Le règlement se fait directement avec votre chauffeur." },
  { q: "Le prix annoncé peut-il changer ?", a: "Pour les catégories à prix calculé, le montant est déterminé avant confirmation et ne change pas. Pour les trajets sur devis, un tarif vous est communiqué avant tout engagement." },
  { q: "Puis-je réserver pour un trajet longue distance ?", a: "Oui. Au-delà d’un certain rayon autour de Lyon, un devis personnalisé est établi avant confirmation." },
  { q: "Puis-je demander à être rappelé plutôt que de recevoir une estimation ?", a: "Oui, le formulaire propose les deux options : demander une estimation ou être rappelé par l’équipe KDRIVE." },
];

export function FaqPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="FAQ" title="Questions fréquentes" lead="Les réponses aux questions les plus courantes sur la réservation et le déroulement d’un trajet avec KDRIVE." />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          {faqItems.map((item) => (
            <div key={item.q} className="kd-card kd-card--flat">
              <h3 className="kd-h4">{item.q}</h3>
              <p className="kd-body" style={{ marginTop: 8 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="reserver" className="kd-section kd-on-white">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Une autre question ? Contactez-nous</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </PageShell>
  );
}
