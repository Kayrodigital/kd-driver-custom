import Link from "next/link";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { formatEuros } from "@/domain/pricing/money";

function RelatedLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section className="kd-section kd-section--compact kd-on-cream">
      <div className="kd-container" style={{ maxWidth: 720 }}>
        <p className="kd-eyebrow">{title}</p>
        <ul className="kd-stack" style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: 16 }}>
          {links.map((link) => (
            <li key={link.href}>
              <Link className="kd-card-link" href={link.href}>
                {link.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

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

function PageHero({ eyebrow, title, lead, breadcrumb }: { eyebrow: string; title: string; lead: string; breadcrumb?: BreadcrumbItem[] }) {
  return (
    <section className="kd-section kd-on-dark" style={{ paddingBottom: "var(--kd-space-6)" }}>
      <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <p className="kd-eyebrow">{eyebrow}</p>
        <h1 className="kd-h1">{title}</h1>
        <p className="kd-lead">{lead}</p>
      </div>
    </section>
  );
}

const allVehicles = [
  { name: "Berline", mode: "Prix calculé", body: "Adaptée aux déplacements individuels ou en petit groupe.", image: "/images/vehicle-berline.jpg" },
  { name: "Confort", mode: "Prix calculé", body: "Une catégorie polyvalente pour les trajets du quotidien, professionnels ou privés.", image: "/images/vehicle-confort.jpg" },
  { name: "Van", mode: "Sur devis", body: "Une solution adaptée aux groupes et aux trajets avec davantage de bagages, sur devis.", image: "/images/vehicle-van.jpg" },
  { name: "Luxe", mode: "Sur devis", body: "Une catégorie premium proposée sur devis pour les demandes nécessitant un niveau de prestation supérieur.", image: "/images/vehicle-luxe.jpg" },
  { name: "Monospace", mode: "Sur devis", body: "Une solution modulable pour les familles et les petits groupes, sur devis.", image: "/images/vehicle-monospace.jpg" },
];

const vehiclesRelatedLinks = [
  { href: "/tarifs", label: "Consulter la grille tarifaire" },
  { href: "/transfert-aeroport", label: "Transfert aéroport" },
  { href: "/chauffeur-entreprise", label: "Déplacements professionnels" },
];

export function VehiclesPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="Nos véhicules" title="Une flotte adaptée à chaque trajet" lead="Les catégories Berline et Confort affichent un prix calculé avant confirmation. Luxe, Van et Monospace font l’objet d’un devis." />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-3">
          {allVehicles.map((vehicle) => (
            <div key={vehicle.name} className="kd-card kd-card--hover kd-vehicle-card">
              <SceneImage src={vehicle.image} alt={vehicle.name} note="photo à venir" className="kd-vehicle-image" sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" />
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
      <RelatedLinks title="Poursuivre votre réservation" links={vehiclesRelatedLinks} />
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

const tariffLabels: Record<string, string> = { berline: "Berline", confort: "Confort", van: "Van", luxe: "Luxe", monospace: "Monospace" };
const tariffOrder = ["berline", "confort", "van", "luxe", "monospace"];

const tariffCards = tariffOrder.map((slug) => {
  const category = pricingConfig.categories[slug];
  const label = tariffLabels[slug] ?? slug;
  if (!category || category.mode === "quote") return { label, quote: true, lines: [] as string[] };
  return {
    label,
    quote: false,
    lines: [
      `Prise en charge : ${formatEuros(category.baseFee * 100)}`,
      `${formatEuros(category.pricePerKm * 100)}/km`,
      `Minimum : ${formatEuros(category.minimumPrice * 100)}`,
    ],
  };
});

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
        <div className="kd-container">
          <div className="kd-section-head kd-section-head--center">
            <p className="kd-eyebrow">Grille tarifaire</p>
            <h2 className="kd-h2">Les tarifs par catégorie</h2>
          </div>
          <div className="kd-grid-3">
            {tariffCards.map((card) => (
              <div key={card.label} className="kd-card kd-card--flat">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 className="kd-h4">{card.label}</h3>
                  {card.quote && <span className="kd-pill">Sur devis</span>}
                </div>
                {!card.quote && (
                  <ul className="kd-price-detail" style={{ marginTop: 10 }}>
                    {card.lines.map((line) => <li key={line} style={{ justifyContent: "flex-start" }}><span>{line}</span></li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="kd-field-hint" style={{ marginTop: "var(--kd-space-4)", maxWidth: 640 }}>
            Le tarif est estimé à partir de l’itinéraire calculé au moment de la demande. Il peut être confirmé ou
            ajusté par KDRIVE selon les conditions réelles du trajet et les options sélectionnées.
          </p>
          <p className="kd-field-hint" style={{ marginTop: 8, maxWidth: 640 }}>
            Les modalités de règlement sont confirmées avec KDRIVE lors de la prise en charge de la réservation.
          </p>
        </div>
      </section>
      <RelatedLinks
        title="Poursuivre votre réservation"
        links={[
          { href: "/vehicules", label: "Voir les véhicules disponibles" },
          { href: "/faq", label: "Consulter la FAQ" },
          { href: "/contact", label: "Nous contacter" },
        ]}
      />
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
      <PageHero
        eyebrow="À propos"
        title="Une entreprise locale, à Lyon"
        lead="KDRIVE propose un service de chauffeur privé pensé pour les habitants, les entreprises et les visiteurs de Lyon et sa région."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
      />
      <section className="kd-section kd-on-cream" style={{ paddingTop: 0 }}>
        <div className="kd-container">
          <SceneImage src="/images/about-lyon.jpg" alt="Lyon" className="kd-scene--tall" style={{ minHeight: 420 }} sizes="100vw" />
        </div>
      </section>
      <section className="kd-section kd-section--compact kd-on-white">
        <div className="kd-container" style={{ maxWidth: 640 }}>
          <p className="kd-eyebrow">Notre approche</p>
          <p className="kd-lead" style={{ marginTop: 12 }}>
            Chaque demande est traitée directement par l’équipe KDRIVE : pas de réservation automatisée sans
            vérification, pas d’intermédiaire. L’objectif est simple — un trajet confirmé, un tarif clair, un chauffeur
            ponctuel.
          </p>
          <p className="kd-body" style={{ marginTop: 16 }}>
            KDRIVE accompagne aussi bien les déplacements privés que professionnels à Lyon : une estimation est
            calculée dès la demande, puis confirmée par l’équipe avant le trajet.
          </p>
        </div>
      </section>
      <RelatedLinks
        title="En savoir plus"
        links={[
          { href: "/vehicules", label: "Voir les véhicules disponibles" },
          { href: "/tarifs", label: "Consulter la grille tarifaire" },
          { href: "/contact", label: "Nous contacter" },
        ]}
      />
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
      <PageHero
        eyebrow="Contact"
        title="Nous contacter"
        lead="Pour une demande de réservation, le formulaire reste le moyen le plus rapide. Pour toute autre question, contactez-nous directement."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
      />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-2" style={{ alignItems: "start" }}>
          <div className="kd-card">
            <p className="kd-eyebrow">Téléphone</p>
            <h3 className="kd-h3" style={{ margin: "10px 0" }}><a href="tel:+33652211292" style={{ textDecoration: "none", color: "inherit" }}>06 52 21 12 92</a></h3>
            <p className="kd-body">Pour vos questions ou pour préparer une demande particulière, contactez KDRIVE directement.</p>
          </div>
          <div className="kd-card">
            <p className="kd-eyebrow">Zone d’intervention</p>
            <h3 className="kd-h3" style={{ margin: "10px 0" }}>Lyon, France</h3>
            <p className="kd-body">Lyon, Villeurbanne et l’agglomération lyonnaise.</p>
          </div>
        </div>
      </section>
      <RelatedLinks
        title="Aller plus loin"
        links={[
          { href: "/faq", label: "Consulter la FAQ" },
          { href: "/tarifs", label: "Consulter la grille tarifaire" },
          { href: "/vehicules", label: "Voir les véhicules disponibles" },
          { href: "/reserver", label: "Réserver en ligne" },
        ]}
      />
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

const faqItems: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: "Comment réserver une course avec KDRIVE ?",
    a: "Renseignez le départ, la destination, la date, l’heure et votre téléphone dans le formulaire de réservation. KDRIVE vous confirme rapidement la disponibilité et le tarif.",
    link: { href: "/reserver", label: "Faire une demande de réservation" },
  },
  {
    q: "Le tarif affiché est-il définitif ?",
    a: "Pour les catégories à prix calculé (Berline, Confort), le montant est déterminé avant confirmation. Pour les trajets sur devis (Luxe, Van, Monospace, longues distances), un tarif vous est communiqué avant tout engagement.",
    link: { href: "/tarifs", label: "Voir la grille tarifaire" },
  },
  {
    q: "Comment le prix est-il calculé ?",
    a: "Le tarif est estimé à partir de l’itinéraire réel au moment de la demande, puis confirmé ou ajusté par KDRIVE selon les conditions du trajet.",
    link: { href: "/tarifs", label: "Voir la grille tarifaire" },
  },
  {
    q: "Puis-je réserver un Van, une catégorie Luxe ou un Monospace ?",
    a: "Oui. Ces catégories font l’objet d’un devis personnalisé plutôt que d’un tarif calculé automatiquement.",
    link: { href: "/vehicules", label: "Voir les véhicules disponibles" },
  },
  {
    q: "Puis-je réserver pour une autre personne ?",
    a: "Oui. Vous pouvez effectuer une demande pour une autre personne en renseignant les informations utiles dans le formulaire et dans le champ de commentaire ; KDRIVE confirme ensuite les détails de la prise en charge.",
  },
  {
    q: "Comment réserver un transfert vers l’aéroport Lyon-Saint-Exupéry ?",
    a: "Indiquez votre trajet et, si besoin, votre numéro de vol dans le formulaire. KDRIVE prépare votre prise en charge et reste joignable en cas de changement.",
    link: { href: "/transfert-aeroport", label: "Transfert aéroport" },
  },
  {
    q: "KDRIVE dessert-il les gares Part-Dieu et Perrache ?",
    a: "Oui, KDRIVE assure des prises en charge sur réservation aux principales gares de Lyon, notamment Part-Dieu et Perrache.",
    link: { href: "/transfert-gare", label: "Transfert gare" },
  },
  {
    q: "Puis-je payer directement au chauffeur ?",
    a: "Il n’y a pas de paiement en ligne pour le moment ; le règlement se fait directement avec votre chauffeur, selon les modalités confirmées par KDRIVE.",
  },
  {
    q: "Comment modifier ou annuler une demande ?",
    a: "Contactez KDRIVE directement par téléphone pour modifier ou annuler une demande de réservation.",
    link: { href: "/contact", label: "Contacter KDRIVE" },
  },
  {
    q: "Comment contacter KDRIVE ?",
    a: "Par téléphone ou via le formulaire de réservation ; la page Contact réunit tous les moyens disponibles.",
    link: { href: "/contact", label: "Voir la page Contact" },
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function FaqPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero
        eyebrow="FAQ"
        title="Questions fréquentes"
        lead="Les réponses aux questions les plus courantes sur la réservation et le déroulement d’un trajet avec KDRIVE."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "FAQ" }]}
      />
      <section className="kd-section kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          {faqItems.map((item) => (
            <details key={item.q} className="kd-faq-item">
              <summary className="kd-h4">{item.q}</summary>
              <p className="kd-body">{item.a}</p>
              {item.link && (
                <Link className="kd-card-link" href={item.link.href}>
                  {item.link.label} <span aria-hidden="true">→</span>
                </Link>
              )}
            </details>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </PageShell>
  );
}
