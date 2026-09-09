import Link from "next/link";
import { Breadcrumb } from "./breadcrumb";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";
import { TrustBadge } from "./trust-badge";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { vehicleCatalog, VEHICLE_EXAMPLES_DISCLAIMER } from "@/domain/pricing/vehicle-catalog";
import { popularDestinations } from "@/domain/booking/popular-destinations";

const airportAddress = popularDestinations.find((d) => d.label === "Aéroport Lyon-Saint-Exupéry")!.address;

const faqItems = [
  {
    q: "Comment réserver un transfert aéroport avec KDRIVE ?",
    a: "Renseignez votre adresse et l'aéroport, la date et l'heure, le nombre de passagers et de bagages dans le formulaire de réservation. KDRIVE vous contacte ensuite par téléphone pour confirmer le tarif et la réservation.",
  },
  {
    q: "Puis-je réserver un transfert aéroport pour une autre personne ?",
    a: "Oui. Indiquez-le dans le formulaire et précisez les coordonnées de la personne concernée ; KDRIVE confirme ensuite les détails de la prise en charge avec vous ou directement avec le voyageur.",
  },
  {
    q: "Quelles informations de vol dois-je transmettre ?",
    a: "Le numéro de vol et l'heure d'arrivée prévue, renseignés lors de la réservation, permettent à KDRIVE de mieux préparer votre prise en charge.",
  },
  {
    q: "Que se passe-t-il en cas de changement d'horaire ou de retard ?",
    a: "Contactez KDRIVE dès que possible par téléphone : aucun suivi automatique des vols n'est en place, l'ajustement de la prise en charge se fait par échange direct.",
  },
  {
    q: "Comment sont pris en compte les bagages ?",
    a: "Indiquez le nombre de bagages dans le formulaire : KDRIVE confirme la catégorie de véhicule la plus adaptée (Essentiel, Premium ou Van).",
  },
  {
    q: "Comment obtenir une estimation de mon transfert aéroport ?",
    a: "KDRIVE vous contacte par téléphone après votre demande pour vous communiquer le tarif, calculé selon la catégorie de véhicule et le trajet, avant toute confirmation.",
  },
];

export function AirportHubPage({ framed = true }: { framed?: boolean } = {}) {
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
        <SceneImage src="/images/airport-transfer.jpg" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Services" }, { label: "Transfert aéroport" }]} />
            <p className="kd-eyebrow">Transfert aéroport</p>
            <h1 className="kd-h1">Votre transfert VTC à l&apos;aéroport Lyon Saint-Exupéry</h1>
            <p className="kd-lead">KDRIVE organise vos départs et arrivées à l&apos;aéroport Lyon Saint-Exupéry, sur réservation. Indiquez votre trajet : KDRIVE vous recontacte pour confirmer le tarif et la disponibilité.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card">
            <HeroSearchForm tone="dark" prefillAddress={airportAddress} prefillLabel="l'aéroport" />
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Départ</p>
          <h2 className="kd-h2">Rejoindre l&apos;aéroport depuis Lyon et sa métropole</h2>
          <p className="kd-body">
            Votre chauffeur vient vous chercher à l&apos;adresse choisie lors de la réservation : domicile, hôtel ou
            adresse professionnelle, à Lyon comme dans les communes de la métropole. Indiquez votre adresse de départ,
            la date et l&apos;heure souhaitées ainsi que le nombre de passagers et de bagages.
          </p>
          <p className="kd-body">
            KDRIVE organise l&apos;horaire de prise en charge en fonction de votre heure d&apos;enregistrement ou de
            vol souhaitée, sans durée de trajet ni marge garantie à l&apos;avance : la circulation reste variable
            selon le jour et l&apos;heure.
          </p>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Arrivée</p>
          <h2 className="kd-h2">Réserver votre chauffeur à votre arrivée</h2>
          <p className="kd-body">
            Renseignez votre numéro de vol et l&apos;heure d&apos;arrivée prévue lors de la réservation : ces
            informations permettent à KDRIVE de mieux préparer votre prise en charge.
          </p>
          <p className="kd-body">
            Aucun suivi automatique des vols n&apos;est en place et aucune durée d&apos;attente gratuite n&apos;est
            garantie à l&apos;avance. En cas de changement d&apos;horaire ou de retard, contactez KDRIVE dès que
            possible par téléphone : la prise en charge est alors ajustée par échange direct avec l&apos;équipe.
          </p>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Point de rendez-vous</p>
          <h2 className="kd-h2">Où retrouver votre chauffeur à Saint-Exupéry ?</h2>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li>L&apos;aéroport Lyon Saint-Exupéry compte deux terminaux passagers (Terminal 1 et Terminal 2), reliés entre eux.</li>
            <li>Des zones de dépose-minute et de prise en charge taxi/VTC existent aux abords des terminaux ; leur emplacement précis est consultable sur le plan officiel de l&apos;aéroport (lyonaeroports.com).</li>
            <li>Le point de rendez-vous exact avec votre chauffeur est confirmé avec vous au moment de la réservation ou par téléphone, selon les zones d&apos;accès autorisées le jour de votre trajet.</li>
          </ul>
          <p className="kd-field-hint">Une sortie voyageurs n&apos;est pas automatiquement un emplacement autorisé pour un VTC : aucun point de rendez-vous fixe n&apos;est promis sans confirmation.</p>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Tarifs</p>
          <h2 className="kd-h2">Quel prix pour votre transfert aéroport ?</h2>
          <p className="kd-body">
            Le site ne calcule ni n&apos;affiche de prix pour votre transfert aéroport. Après votre demande, KDRIVE
            étudie votre trajet grâce au même barème que celui utilisé pour l&apos;ensemble de ses courses, puis vous
            contacte par téléphone pour vous communiquer le tarif avant toute confirmation.
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

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Véhicules</p>
          <h2 className="kd-h2">Un transfert adapté à vos passagers et bagages</h2>
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

      <section className="kd-section kd-on-white">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <div className="kd-section-head">
            <p className="kd-eyebrow">Destinations</p>
            <h2 className="kd-h2">Vos trajets entre l&apos;aéroport, Lyon et les communes desservies</h2>
          </div>
          <ul className="kd-stack" style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: 16 }}>
            <li><Link className="kd-card-link" href="/vtc-lyon-part-dieu">Aéroport → Gare Lyon Part-Dieu <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/vtc-lyon-perrache">Aéroport → Gare Lyon Perrache <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/vtc-gare-lyon-saint-exupery-tgv">Gare Lyon Saint-Exupéry TGV (voyageurs en train) <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/vtc-bron">VTC Bron <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/vtc-saint-priest">VTC Saint-Priest <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/vtc-villeurbanne">VTC Villeurbanne <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/chauffeur-entreprise">Déplacements professionnels <span aria-hidden="true">→</span></Link></li>
            <li><Link className="kd-card-link" href="/longues-distances">Trajet longue distance <span aria-hidden="true">→</span></Link></li>
          </ul>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <div className="kd-section-head">
            <p className="kd-eyebrow">FAQ</p>
            <h2 className="kd-h2">Questions fréquentes</h2>
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
          <h2 className="kd-h2">Votre transfert aéroport, en quelques secondes</h2>
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
