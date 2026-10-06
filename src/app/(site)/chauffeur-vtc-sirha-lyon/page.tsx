import Link from "next/link";
import { Breadcrumb } from "@/app/design-preview/breadcrumb";
import { FooterSection, SiteNav } from "@/app/design-preview/sections";
import { SceneImage } from "@/app/design-preview/scene-image";
import { KdAccordion, type KdAccordionItem } from "@/components/kd-accordion";
import { vehicleCatalog, VEHICLE_EXAMPLES_DISCLAIMER } from "@/domain/pricing/vehicle-catalog";
import { buildMetadata } from "@/lib/seo/page-metadata";
import { SirhaLeadForm } from "./sirha-form";
import styles from "./sirha.module.css";

export const metadata = buildMetadata({
  title: "Chauffeur VTC SIRHA Lyon | Transport Entreprise & Équipes | Kdrive",
  description: "Chauffeur privé pour le SIRHA Lyon : transferts aéroport, gare, hôtel et Eurexpo. Transport de dirigeants, collaborateurs et clients avec Kdrive.",
  path: "/chauffeur-vtc-sirha-lyon",
});

const arrivalCards = [
  { title: "Aéroport Lyon Saint-Exupéry → hôtel", body: "Préparez l’arrivée de vos collaborateurs ou invités dès leur sortie de l’aéroport.", href: "/transfert-aeroport" },
  { title: "Gare Lyon Part-Dieu → hôtel", body: "Organisez une prise en charge à la gare selon l’horaire de train communiqué.", href: "/vtc-lyon-part-dieu" },
  { title: "Gare Lyon Perrache → hôtel", body: "Reliez Perrache à l’hôtel ou au premier rendez-vous de votre programme.", href: "/vtc-lyon-perrache" },
  { title: "Hôtel → Eurexpo Lyon", body: "Planifiez les départs vers le SIRHA selon les horaires de votre équipe.", href: "/vtc-eurexpo-lyon" },
  { title: "Eurexpo → hôtel, restaurant ou rendez-vous", body: "Enchaînez salon, rendez-vous et dîner professionnel dans un même planning.", href: "/vtc-eurexpo-lyon" },
  { title: "Mise à disposition d’un chauffeur", body: "Préparez plusieurs étapes dans la journée avec un chauffeur selon votre programme.", href: "/mise-a-disposition" },
];

const teamBenefits = [
  "Réservation pour vos collaborateurs ou clients",
  "Interlocuteur unique",
  "Courses planifiées à l’avance",
  "Prise en charge à l’aéroport",
  "Prise en charge aux gares lyonnaises",
  "Trajets hôtel ↔ Eurexpo",
  "Mise à disposition",
  "Facturation professionnelle",
];

const mainRoutes = [
  { title: "Aéroport Lyon Saint-Exupéry ↔ Eurexpo", href: "/transfert-aeroport" },
  { title: "Aéroport Lyon Saint-Exupéry ↔ Lyon", href: "/transfert-aeroport" },
  { title: "Gare Part-Dieu ↔ Eurexpo", href: "/vtc-lyon-part-dieu" },
  { title: "Gare Perrache ↔ Eurexpo", href: "/vtc-lyon-perrache" },
  { title: "Hôtel ↔ Eurexpo", href: "/vtc-eurexpo-lyon" },
  { title: "Chauffeur à disposition à Lyon", href: "/mise-a-disposition" },
];

const programSteps = [
  "Hôtel → SIRHA",
  "SIRHA → déjeuner professionnel",
  "Déjeuner → rendez-vous client",
  "Rendez-vous → hôtel",
  "Hôtel → dîner",
  "Transfert vers l’aéroport ou la gare",
];

const organizationSteps = [
  { title: "Envoyez votre demande", body: "Indiquez les dates, le nombre de personnes et les principaux déplacements." },
  { title: "Nous organisons les trajets", body: "Les prises en charge sont préparées selon votre planning." },
  { title: "Vos collaborateurs sont pris en charge", body: "Chaque déplacement prévu est organisé selon les informations communiquées." },
];

const faqItems: KdAccordionItem[] = [
  { q: "Comment réserver un chauffeur pour le SIRHA Lyon ?", a: "Envoyez votre demande avec vos dates, vos points de prise en charge et le nombre de personnes. Kdrive étudie ensuite le planning et vous recontacte pour organiser les trajets." },
  { q: "Kdrive peut-il transporter plusieurs collaborateurs pendant le SIRHA ?", a: "Oui. Indiquez le nombre de personnes, leurs horaires et les différents points de prise en charge afin que Kdrive puisse proposer une organisation adaptée." },
  { q: "Pouvez-vous assurer un transfert entre l’aéroport Lyon Saint-Exupéry et Eurexpo ?", a: "Oui, sur réservation. Le trajet peut relier l’aéroport à Eurexpo, à un hôtel lyonnais ou à une autre adresse convenue.", link: { href: "/transfert-aeroport", label: "Préparer un transfert aéroport" } },
  { q: "Pouvez-vous récupérer un collaborateur à la gare Part-Dieu ou Perrache ?", a: "Oui. Kdrive assure des prises en charge sur réservation aux gares de Lyon Part-Dieu et Lyon Perrache.", link: { href: "/transfert-gare", label: "Voir les transferts gare" } },
  { q: "Peut-on réserver un chauffeur pour un client ou un dirigeant ?", a: "Oui. Une entreprise peut organiser une prise en charge pour un collaborateur, un dirigeant, un client ou un invité en transmettant ses informations de trajet." },
  { q: "Proposez-vous une mise à disposition pendant le SIRHA ?", a: "Oui, selon les disponibilités. Cette formule convient aux programmes comprenant plusieurs déplacements dans une même journée.", link: { href: "/mise-a-disposition", label: "Découvrir la mise à disposition" } },
  { q: "Peut-on organiser plusieurs trajets à l’avance ?", a: "Oui. Transmettez votre planning prévisionnel afin d’étudier les arrivées, les trajets hôtel–Eurexpo et les retours vers les gares ou l’aéroport." },
  { q: "Les entreprises peuvent-elles recevoir une facture ?", a: "Oui, une facturation professionnelle peut être prévue pour les prestations confirmées avec Kdrive." },
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

export default function SirhaLandingPage() {
  return (
    <div>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <main>
        <section className={`kd-on-dark ${styles.hero}`}>
          <SceneImage
            src="/images/blog/evenements/eurexpo-lyon-exterieur.webp"
            alt="Eurexpo Lyon, lieu du SIRHA, accessible avec un chauffeur privé Kdrive"
            className={styles.heroMedia}
            priority
            sizes="100vw"
          />
          <div className={`kd-container ${styles.heroInner}`}>
            <div className={`kd-stack ${styles.heroCopy}`}>
              <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Chauffeur entreprise", href: "/chauffeur-entreprise" }, { label: "SIRHA Lyon" }]} />
              <p className="kd-eyebrow">SIRHA Lyon • Eurexpo</p>
              <h1 className="kd-h1">Chauffeur privé pour le SIRHA Lyon</h1>
              <p className="kd-lead">Vos déplacements professionnels pendant le SIRHA, organisés simplement.</p>
              <p className="kd-body" style={{ color: "var(--kd-muted-on-dark)", maxWidth: "62ch" }}>
                Kdrive accompagne dirigeants, collaborateurs, exposants et invités pendant leur séjour à Lyon : transferts aéroport et gare, trajets hôtel ↔ Eurexpo et mise à disposition d’un chauffeur.
              </p>
              <div className={styles.heroActions}>
                <a className="kd-btn kd-btn--gold" href="#demande-sirha" data-analytics-event="sirha_quote_cta_click">Demander un devis entreprise</a>
                <Link className="kd-btn kd-btn--ghost-dark" href="/reserver" data-analytics-event="sirha_booking_cta_click">Réserver un trajet</Link>
              </div>
              <ul className={styles.reassurance} aria-label="Points de réassurance">
                <li>Chauffeur privé à Lyon</li>
                <li>Réservation anticipée</li>
                <li>Transport professionnel</li>
                <li>Facturation entreprise</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="kd-section kd-on-cream">
          <div className={`kd-container ${styles.introGrid}`}>
            <div className="kd-stack">
              <p className="kd-eyebrow">SIRHA Lyon · Eurexpo</p>
              <h2 className="kd-h2">Simplifiez les déplacements de votre équipe pendant le SIRHA</h2>
              <p className="kd-lead">Vous exposez ou participez au SIRHA à Lyon ?</p>
              <p className="kd-body">Kdrive prend en charge les déplacements de vos dirigeants, collaborateurs, clients et invités pendant leur présence à Lyon.</p>
              <p className="kd-body">Au lieu d’organiser chaque déplacement séparément, vous pouvez anticiper vos principaux trajets et disposer d’un interlocuteur unique pour votre transport.</p>
            </div>
            <div className={styles.cardGrid}>
              {arrivalCards.map((card, index) => (
                <Link key={card.title} href={card.href} className={`kd-card kd-card--flat kd-card--hover ${styles.miniCard}`}>
                  <span className={styles.miniCardNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="kd-h4">{card.title}</h3>
                    <p className="kd-body">{card.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`kd-section kd-on-dark ${styles.teamSection}`}>
          <div className={`kd-container ${styles.teamGrid}`}>
            <div className="kd-stack">
              <p className="kd-eyebrow">Organisation entreprise</p>
              <h2 className="kd-h2">Vous organisez la venue de plusieurs collaborateurs ?</h2>
              <p className="kd-lead">Transmettez-nous votre planning de déplacement et les besoins de votre équipe.</p>
              <p className="kd-body" style={{ color: "var(--kd-muted-on-dark)" }}>Kdrive peut organiser les différentes prises en charge de vos collaborateurs, dirigeants, clients ou invités pendant le salon.</p>
              <a className="kd-btn kd-btn--gold" href="#demande-sirha" data-analytics-event="sirha_team_cta_click">Organiser les transports de mon équipe</a>
            </div>
            <ul className={styles.checkGrid}>
              {teamBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
        </section>

        <section className="kd-section kd-on-white">
          <div className="kd-container">
            <div className="kd-section-head">
              <p className="kd-eyebrow">Transferts professionnels</p>
              <h2 className="kd-h2">Vos principaux trajets pendant le SIRHA</h2>
            </div>
            <div className={styles.routeGrid}>
              {mainRoutes.map((route) => (
                <Link key={route.title} href={route.href} className={`kd-card kd-card--flat ${styles.routeCard}`}>
                  <h3 className="kd-h4">{route.title}</h3>
                  <span className={styles.routeArrow}>Préparer ce trajet →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="kd-section kd-on-cream">
          <div className={`kd-container ${styles.featureSplit}`}>
            <SceneImage src="/images/site/kdrive-travail-arriere-berline-lyon.webp" alt="Déplacement professionnel avec chauffeur privé à Lyon pendant le SIRHA" className="kd-scene--tall" sizes="(max-width: 980px) 100vw, 50vw" />
            <div className="kd-stack">
              <p className="kd-eyebrow">Mise à disposition</p>
              <h2 className="kd-h2">Un chauffeur disponible selon votre programme</h2>
              <p className="kd-lead">Pour les dirigeants, équipes commerciales ou invités ayant plusieurs déplacements dans la journée, Kdrive propose également la mise à disposition d’un chauffeur.</p>
              <ul className={styles.program}>
                {programSteps.map((step) => <li key={step}>{step}</li>)}
              </ul>
              <a className="kd-btn kd-btn--outline" href="#demande-sirha" data-analytics-event="sirha_chauffeur_service_cta_click">Demander une mise à disposition</a>
            </div>
          </div>
        </section>

        <section className="kd-section kd-on-white">
          <div className="kd-container">
            <div className="kd-section-head">
              <p className="kd-eyebrow">Organisation</p>
              <h2 className="kd-h2">Organisez vos déplacements en 3 étapes</h2>
            </div>
            <div className={styles.stepGrid}>
              {organizationSteps.map((step, index) => (
                <article key={step.title} className={styles.step}>
                  <span className={styles.stepNumber}>ÉTAPE {index + 1}</span>
                  <h3 className="kd-h4">{step.title}</h3>
                  <p className="kd-body">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="kd-section kd-on-cream">
          <div className="kd-container">
            <div className="kd-section-head">
              <p className="kd-eyebrow">Véhicules</p>
              <h2 className="kd-h2">Un véhicule adapté à vos déplacements professionnels</h2>
              <p className="kd-lead">Dirigeants, collaborateurs, clients, transferts aéroport ou bagages : choisissez une catégorie selon votre organisation.</p>
            </div>
            <div className={styles.vehicleGrid}>
              {vehicleCatalog.map((vehicle) => (
                <article key={vehicle.slug} className={`kd-card kd-card--flat ${styles.vehicleCard}`}>
                  <SceneImage src={vehicle.image} alt={`${vehicle.label}, véhicule Kdrive pour les déplacements professionnels du SIRHA`} className={styles.vehicleImage} sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw" />
                  <div className={styles.vehicleCopy}>
                    <h3 className="kd-h4">{vehicle.label}</h3>
                    <p className={styles.capacity}>Jusqu’à {vehicle.passengers} passagers · {vehicle.luggage} bagages</p>
                    <p className="kd-body">{vehicle.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="kd-field-hint" style={{ marginTop: 20 }}>{VEHICLE_EXAMPLES_DISCLAIMER}</p>
          </div>
        </section>

        <section id="reserver" className="kd-section kd-on-white">
          <div id="demande-sirha" className={`kd-container ${styles.formLayout}`}>
            <div className="kd-stack">
              <p className="kd-eyebrow">Demande entreprise</p>
              <h2 className="kd-h2">Demandez l’organisation de vos transports SIRHA</h2>
              <p className="kd-lead">Partagez les premières informations disponibles. Votre demande sera étudiée avant toute confirmation de véhicule ou de tarif.</p>
              <p className="kd-body">Vous pouvez envoyer un planning encore provisoire : précisez simplement les horaires, hôtels ou trajets qui restent à confirmer.</p>
            </div>
            <SirhaLeadForm />
          </div>
        </section>

        <section className="kd-section kd-on-cream">
          <div className="kd-container" style={{ maxWidth: 820 }}>
            <div className="kd-section-head">
              <p className="kd-eyebrow">FAQ SIRHA Lyon</p>
              <h2 className="kd-h2">Questions fréquentes</h2>
            </div>
            <KdAccordion items={faqItems} />
          </div>
        </section>

        <section className="kd-section kd-on-dark">
          <div className="kd-container kd-stack" style={{ maxWidth: 820 }}>
            <p className="kd-eyebrow">Anticiper votre séjour</p>
            <h2 className="kd-h2">Préparez dès maintenant vos déplacements pour le SIRHA Lyon</h2>
            <p className="kd-lead">Vous connaissez déjà les dates d’arrivée de votre équipe, votre hôtel ou votre planning ? Transmettez-nous vos besoins afin d’organiser vos principaux déplacements à Lyon.</p>
            <div className={styles.finalActions}>
              <a className="kd-btn kd-btn--gold" href="#demande-sirha" data-analytics-event="sirha_final_quote_cta_click">Demander un devis entreprise</a>
              <Link className="kd-btn kd-btn--ghost-dark" href="/reserver" data-analytics-event="sirha_final_booking_cta_click">Réserver un trajet</Link>
            </div>
            <p className={styles.disclaimer}>Kdrive est un service de chauffeur privé indépendant et n’est ni partenaire ni transporteur officiel du SIRHA.</p>
          </div>
        </section>
      </main>

      <FooterSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
