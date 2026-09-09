import Link from "next/link";
import { Breadcrumb } from "./breadcrumb";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";
import { TrustBadge } from "./trust-badge";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { vehicleCatalog, VEHICLE_EXAMPLES_DISCLAIMER } from "@/domain/pricing/vehicle-catalog";

const stationCards = [
  {
    href: "/vtc-lyon-part-dieu",
    label: "Gare de Lyon Part-Dieu",
    body: "Premier pôle multimodal de la région lyonnaise (TGV, TER, métro, tramway, Rhônexpress), au cœur du 3ᵉ arrondissement.",
  },
  {
    href: "/vtc-lyon-perrache",
    label: "Gare de Lyon Perrache",
    body: "À la pointe de la Presqu'île, entre Saône et Rhône, à quelques minutes de la Confluence et du centre-ville.",
  },
];

const organizeSteps = [
  { title: "Indiquez votre trajet", body: "Gare de départ ou d'arrivée, adresse de destination, date et heure de votre train." },
  { title: "Précisez passagers et bagages", body: "Nombre de voyageurs, de bagages et catégorie de véhicule souhaitée." },
  { title: "KDRIVE confirme votre demande", body: "Après réception, KDRIVE vous contacte par téléphone pour communiquer le tarif et confirmer la réservation." },
];

const faqItems = [
  {
    q: "Comment réserver un transfert en gare avec KDRIVE ?",
    a: "Renseignez votre gare, la date et l'heure de votre train, le nombre de passagers et de bagages dans le formulaire de réservation. KDRIVE vous contacte ensuite par téléphone pour confirmer le tarif et la réservation.",
  },
  {
    q: "Puis-je réserver un transfert gare pour une autre personne ?",
    a: "Oui. Indiquez-le dans le formulaire et précisez les coordonnées de la personne concernée ; KDRIVE confirme ensuite les détails de la prise en charge avec vous ou directement avec le voyageur.",
  },
  {
    q: "Quelles informations fournir pour une arrivée en train ?",
    a: "La gare, l'heure d'arrivée prévue de votre train et votre adresse de destination suffisent pour envoyer votre demande. Le point de rendez-vous précis à la gare est ensuite confirmé avec vous.",
  },
  {
    q: "Comment obtenir le prix de mon transfert gare ?",
    a: "KDRIVE vous contacte par téléphone après votre demande pour vous communiquer le tarif, calculé selon la catégorie de véhicule et le trajet, avant toute confirmation.",
  },
  {
    q: "Comment signaler un changement d'horaire de train ?",
    a: "Contactez KDRIVE dès que possible par téléphone : aucun suivi automatique des trains n'est en place, l'ajustement de la prise en charge se fait par échange direct.",
  },
];

export function GareHubPage({ framed = true }: { framed?: boolean } = {}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const frameStyle = framed ? { border: "1px solid var(--kd-line)", borderRadius: "var(--kd-radius-lg)", overflow: "hidden", boxShadow: "var(--kd-shadow-lg)" } : undefined;

  return (
    <div style={frameStyle}>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/service-transferts.jpg" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Services" }, { label: "Transfert gare" }]} />
            <p className="kd-eyebrow">Transfert gare</p>
            <h1 className="kd-h1">Votre transfert VTC vers les gares de Lyon</h1>
            <p className="kd-lead">KDRIVE organise vos départs et arrivées aux gares de Lyon Part-Dieu et Lyon Perrache, sur réservation. Indiquez votre trajet : KDRIVE vous recontacte pour confirmer le tarif et la disponibilité.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" />
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Deux gares desservies</p>
            <h2 className="kd-h2">Quelle gare de Lyon souhaitez-vous rejoindre ou quitter ?</h2>
          </div>
          <div className="kd-grid-2">
            {stationCards.map((station) => (
              <div key={station.href} className="kd-card">
                <h3 className="kd-h4">{station.label}</h3>
                <p className="kd-body" style={{ marginTop: 8 }}>{station.body}</p>
                <Link className="kd-card-link" href={station.href} style={{ marginTop: 16, display: "inline-flex" }}>
                  En savoir plus <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Réservation</p>
            <h2 className="kd-h2">Organiser votre transfert avec KDRIVE</h2>
          </div>
          <div className="kd-grid-3">
            {organizeSteps.map((step, index) => (
              <div key={step.title} className="kd-advantage">
                <span className="kd-advantage-num">{index + 1}</span>
                <div>
                  <h3 className="kd-h4">{step.title}</h3>
                  <p className="kd-body">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Tarifs</p>
          <h2 className="kd-h2">Quel prix pour votre transfert en gare à Lyon ?</h2>
          <p className="kd-body">
            Le site ne calcule ni n&apos;affiche de prix pour votre transfert gare. Après votre demande, KDRIVE étudie
            votre trajet grâce au même barème que celui utilisé pour l&apos;ensemble de ses courses, puis vous contacte
            par téléphone pour vous communiquer le tarif avant toute confirmation.
          </p>
          <div className="kd-grid-3" style={{ marginTop: 8 }}>
            {vehicleCatalog.map((vehicle) => (
              <div key={vehicle.slug} className="kd-card kd-card--flat">
                <h3 className="kd-h4">{vehicle.label}</h3>
                <p className="kd-body" style={{ marginTop: 4, fontWeight: 700, color: "var(--kd-gold-ink)" }}>À partir de {vehicle.fromPriceEuros} €</p>
              </div>
            ))}
          </div>
          <Link className="kd-card-link" href="/tarifs">Consulter la grille tarifaire <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Départ et arrivée</p>
            <h2 className="kd-h2">Un chauffeur pour votre départ ou votre arrivée</h2>
          </div>
          <div className="kd-grid-2">
            <div className="kd-card kd-card--flat">
              <h3 className="kd-h4">Au départ</h3>
              <p className="kd-body" style={{ marginTop: 8 }}>
                Votre chauffeur vient vous chercher à l&apos;adresse indiquée lors de la réservation, avec la marge
                nécessaire pour rejoindre votre gare avant l&apos;heure de votre train.
              </p>
            </div>
            <div className="kd-card kd-card--flat">
              <h3 className="kd-h4">À l&apos;arrivée</h3>
              <p className="kd-body" style={{ marginTop: 8 }}>
                Indiquez l&apos;heure d&apos;arrivée prévue de votre train lors de la demande. Le point de rendez-vous
                précis à la gare est ensuite confirmé avec vous ; aucun suivi automatique des trains n&apos;est en
                place, contactez KDRIVE en cas de changement d&apos;horaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Correspondances</p>
          <h2 className="kd-h2">Vos correspondances depuis les gares de Lyon</h2>
          <ul className="kd-stack" style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: 16 }}>
            <li><Link className="kd-card-link" href="/transfert-aeroport">Transfert aéroport <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/chauffeur-entreprise">Déplacements professionnels <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/longues-distances">Trajet longue distance <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/vehicules">Voir les véhicules disponibles <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/tarifs">Consulter la grille tarifaire <span aria-hidden="true">→</span></Link></li>
          </ul>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Véhicules</p>
          <h2 className="kd-h2">Voyageurs, passagers et bagages</h2>
          <div className="kd-grid-3" style={{ marginTop: 8 }}>
            {vehicleCatalog.map((vehicle) => (
              <div key={vehicle.slug} className="kd-card kd-card--flat">
                <h3 className="kd-h4">{vehicle.label}</h3>
                <p className="kd-body" style={{ marginTop: 4 }}>{vehicle.passengers} passagers · {vehicle.luggage} bagages</p>
              </div>
            ))}
          </div>
          <p className="kd-field-hint">{VEHICLE_EXAMPLES_DISCLAIMER}</p>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <div className="kd-section-head">
            <p className="kd-eyebrow">FAQ</p>
            <h2 className="kd-h2">Questions fréquentes sur les transferts en gare</h2>
          </div>
          {faqItems.map((item) => (
            <details key={item.q} className="kd-faq-item">
              <summary className="kd-h4">{item.q}</summary>
              <p className="kd-body">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="reserver" className="kd-section kd-on-white">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Votre transfert gare, en quelques secondes</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
          <p className="kd-field-hint" style={{ marginTop: 8 }}>
            Une question avant de réserver ? <Link href="/contact">Contactez KDRIVE</Link>.
          </p>
        </div>
      </section>

      <FooterSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
