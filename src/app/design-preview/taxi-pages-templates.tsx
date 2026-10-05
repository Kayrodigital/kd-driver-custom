import Link from "next/link";
import { Breadcrumb } from "./breadcrumb";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection, ReassuranceList } from "./sections";
import { TrustBadge } from "./trust-badge";
import { HeroSearchForm } from "@/components/booking/kd/wizard/hero-search-form";
import { KdAccordion, type KdAccordionItem } from "@/components/kd-accordion";
import { vehicleCatalog, VEHICLE_EXAMPLES_DISCLAIMER } from "@/domain/pricing/vehicle-catalog";
import { popularDestinations } from "@/domain/booking/popular-destinations";

/**
 * Pages "taxi" — reprennent les intentions de recherche "taxi" (slug, title,
 * H1 en question) tout en présentant KDRIVE comme ce qu'il est réellement :
 * un VTC / chauffeur privé sur réservation, jamais un taxi. Brief éditorial
 * du 05/10/2026 (@Aboubacar) ; aucun prix de trajet inventé (seuls les tarifs
 * de départ déjà publics sur /tarifs sont repris), aucune information de
 * service non confirmée ajoutée au-delà de ce qui existe déjà sur
 * /transfert-aeroport, /transfert-gare et la FAQ.
 */

const airportAddress = popularDestinations.find((d) => d.label === "Aéroport Lyon-Saint-Exupéry")!.address;
const partDieuAddress = popularDestinations.find((d) => d.label === "Gare Lyon Part-Dieu")!.address;

function TaxiShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="kd-signature">
      <header className="kd-signature-header kd-on-dark"><SiteNav /></header>
      <main>{children}</main>
      <FooterSection />
    </div>
  );
}

function TaxiHero({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  image,
  prefillAddress,
  prefillLabel,
}: {
  breadcrumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  prefillAddress?: typeof airportAddress;
  prefillLabel?: string;
}) {
  return (
    <section className="kd-signature-hero kd-on-dark">
      <SceneImage src={image} alt="" className="kd-signature-hero-photo" priority sizes="100vw" />
      <div className="kd-container kd-signature-hero-layout">
        <div className="kd-signature-hero-copy kd-signature-hero-copy--long">
          <Breadcrumb items={breadcrumbs} />
          <p className="kd-eyebrow">{eyebrow}</p>
          <h1 className="kd-h1">{title}</h1>
          <p className="kd-lead">{lead}</p>
          <TrustBadge />
        </div>
        <div className="kd-signature-booking">
          <span className="kd-signature-booking-index">01</span>
          <HeroSearchForm tone="dark" prefillAddress={prefillAddress} prefillLabel={prefillLabel} />
        </div>
        <div className="kd-signature-hero-footer" aria-hidden="true">
          <span>Chauffeur privé</span><span>Lyon &amp; métropole</span><span>Sur réservation</span>
        </div>
      </div>
    </section>
  );
}

function EditorialList({
  eyebrow,
  title,
  image,
  children,
  items,
  note,
}: {
  eyebrow: string;
  title: string;
  image: string;
  children?: React.ReactNode;
  items: React.ReactNode[];
  note?: React.ReactNode;
}) {
  return (
    <section className="kd-section kd-signature-intro kd-on-cream">
      <div className="kd-container kd-signature-editorial-grid">
        <div className="kd-signature-intro-aside">
          <SceneImage src={image} alt="" className="kd-signature-intro-photo" sizes="(max-width: 760px) 1px, 36vw" />
          <div className="kd-signature-section-marker"><span>02</span><p className="kd-eyebrow">{eyebrow}</p></div>
        </div>
        <div className="kd-signature-editorial-copy">
          <h2 className="kd-h2">{title}</h2>
          {children}
          <ul className="kd-signature-editorial-list">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
          {note}
        </div>
      </div>
    </section>
  );
}

function NumberedCards({ eyebrow, title, items }: { eyebrow: string; title: string; items: { title: string; text: React.ReactNode; href?: string }[] }) {
  return (
    <section className="kd-section kd-signature-places kd-on-white">
      <div className="kd-container">
        <div className="kd-signature-inline-head"><p className="kd-eyebrow">{eyebrow}</p><h2 className="kd-h2">{title}</h2></div>
        <div className={`kd-signature-places-grid kd-signature-places-grid--${Math.min(items.length, 4)}`}>
          {items.map((item, index) => {
            const content = <><span className="kd-signature-place-index">0{index + 1}</span><h3 className="kd-h3">{item.title}</h3><div className="kd-body">{item.text}</div>{item.href && <span className="kd-card-link">Découvrir →</span>}</>;
            return item.href ? <Link key={item.title} href={item.href} className="kd-signature-place-card">{content}</Link> : <article key={item.title}>{content}</article>;
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureSplit({ eyebrow, title, image, children, index = "03" }: { eyebrow: string; title: string; image: string; children: React.ReactNode; index?: string }) {
  return (
    <section className="kd-section kd-on-cream">
      <div className="kd-container kd-signature-feature-grid">
        <div className="kd-signature-feature-image-wrap"><SceneImage src={image} alt="" className="kd-signature-feature-image" sizes="(max-width: 760px) 100vw, 52vw" /></div>
        <div className="kd-signature-feature-copy"><span className="kd-signature-large-index">{index}</span><p className="kd-eyebrow">{eyebrow}</p><h2 className="kd-h2">{title}</h2>{children}</div>
      </div>
    </section>
  );
}

function RelatedLinksRow({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section className="kd-section kd-signature-navigation kd-on-cream">
      <div className="kd-container kd-signature-navigation-grid">
        <div><p className="kd-eyebrow">Navigation</p><h2 className="kd-h2">Continuer votre parcours</h2></div>
        <div className="kd-signature-links-group"><p className="kd-eyebrow">{title}</p><ul className="kd-signature-links">
          {links.map((link) => (
            <li key={link.href}><Link href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link></li>
          ))}
        </ul></div>
      </div>
    </section>
  );
}

function FaqSection({ eyebrow, title, items }: { eyebrow: string; title: string; items: KdAccordionItem[] }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <section className="kd-section kd-signature-faq kd-on-white">
      <div className="kd-container kd-signature-faq-grid">
        <div className="kd-signature-faq-heading"><span className="kd-signature-large-index">04</span><p className="kd-eyebrow">{eyebrow}</p><h2 className="kd-h2">{title}</h2></div>
        <div className="kd-signature-accordion"><KdAccordion items={items} /></div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}

function FinalCta({ title, primaryLabel, primaryHref = "/reserver" }: { title: string; primaryLabel: string; primaryHref?: string }) {
  return (
    <section id="reserver" className="kd-section kd-signature-cta kd-on-dark">
      <div className="kd-container kd-signature-cta-grid">
        <div className="kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">{title}</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="kd-btn kd-btn--gold" href={primaryHref}>{primaryLabel} <span aria-hidden="true">→</span></Link>
            <a className="kd-btn kd-btn--outline" href="https://wa.me/33688863419" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
        <ReassuranceList />
      </div>
    </section>
  );
}

/** Rappel tarifaire : seuls les tarifs de départ déjà publics sur /tarifs sont repris, aucun prix de trajet n'est inventé. */
function PricingNote() {
  return (
    <p className="kd-field-hint">
      Tarif calculé à la réservation et communiqué par téléphone avant toute confirmation — à partir de{" "}
      {vehicleCatalog.map((v) => `${v.fromPriceEuros} € en ${v.label}`).join(", ")}.
    </p>
  );
}

// ---------------------------------------------------------------------------
// 1. /taxi-lyon
// ---------------------------------------------------------------------------

const taxiLyonFaq: KdAccordionItem[] = [
  { q: "Puis-je héler un VTC dans la rue comme un taxi ?", a: "Non. Un VTC fonctionne uniquement sur réservation préalable, même quelques minutes à l'avance. Réservez en ligne ou par téléphone." },
  { q: "Combien de temps à l'avance réserver ?", a: "Le plus tôt possible pour les horaires matinaux et les trajets vers l'aéroport. Pour un trajet le jour même, appelez-nous : nous vous indiquons tout de suite si un chauffeur est disponible." },
  { q: "Le prix peut-il changer pendant le trajet ?", a: "Le tarif est communiqué par téléphone avant confirmation. Seuls un arrêt ou une attente demandés en cours de route peuvent s'ajouter." },
  { q: "Puis-je payer par carte ?", a: "Il n'y a pas de paiement en ligne pour le moment ; le règlement se fait directement avec votre chauffeur, selon les modalités confirmées par KDRIVE." },
  { q: "Fournissez-vous une facture ?", a: "Oui, sur simple demande, au nom de votre entreprise si besoin." },
  { q: "Avez-vous des sièges enfant ?", a: "Oui, sur demande lors de la réservation." },
];

export function TaxiLyonPage() {
  return (
    <TaxiShell>
      <TaxiHero breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon" }]} eyebrow="Taxi Lyon" title="Besoin d'un taxi à Lyon ? Choisissez un chauffeur privé KDRIVE" lead="Un trajet en ville, un rendez-vous important, un retour de soirée : réservez un VTC avec chauffeur en quelques clics. Le tarif est communiqué avant le départ, le véhicule est impeccable, le chauffeur est à l'heure." image="/images/hero-lyon.jpg" />

      <EditorialList eyebrow="VTC ou taxi" title="Pourquoi choisir un VTC plutôt qu'un taxi à Lyon" image="/images/site/kdrive-chauffeur-centre-congres-lyon.webp" items={[
        <><strong>Tarif confirmé avant la course</strong>, communiqué par téléphone.</>,
        <><strong>Chauffeur professionnel</strong> : titulaire de la carte VTC, conduite souple.</>,
        <><strong>Véhicules Essentiel, Premium ou Van</strong>, propres et climatisés.</>,
        <><strong>Réservation par téléphone, WhatsApp ou formulaire</strong>, pour un trajet planifié ou le jour même selon disponibilité.</>,
      ]}>
          <p className="kd-body">Avec KDRIVE, le tarif est communiqué par téléphone avant la course, sans compteur qui tourne dans les bouchons du périphérique ou du tunnel de Fourvière. Vous savez qui vient vous chercher, avec quel véhicule, et à quelle heure.</p>
      </EditorialList>

      <NumberedCards eyebrow="Trajets" title="Nos trajets les plus demandés à Lyon" items={[
        { title: "Aéroport Lyon-Saint Exupéry", text: "Dépose et accueil, suivi de votre vol.", href: "/taxi-aeroport-lyon" },
        { title: "Gares Part-Dieu et Perrache", text: "Prise en charge synchronisée sur l'horaire de votre train.", href: "/taxi-gare-lyon" },
        { title: "Groupes et familles", text: "Van jusqu'à 7 passagers et leurs bagages.", href: "/taxi-van-lyon" },
      ]} />

      <FeatureSplit eyebrow="Couverture locale" title="Partout dans Lyon et la métropole" image="/images/site/kdrive-vieux-lyon-fourviere-hero.png">
          <p className="kd-body">Nos chauffeurs interviennent dans les 9 arrondissements de Lyon et les communes voisines : Villeurbanne, Bron, Vénissieux, Caluire-et-Cuire, Écully, Saint-Priest, Meyzieu, Vaulx-en-Velin, Oullins-Pierre-Bénite, Tassin-la-Demi-Lune. Trajets longue distance sur demande.</p>
          <p className="kd-body">Trajets professionnels (rendez-vous clients, séminaires, facture au nom de votre société) et sorties : Eurexpo, Groupama Stadium, LDLC Arena, Halle Tony Garnier, restaurants de la Presqu&apos;île.</p>
      </FeatureSplit>

      <NumberedCards eyebrow="Réservation" title="Comment ça marche" items={[
        { title: "Votre trajet", text: "Indiquez votre adresse de départ, votre destination, la date et l'heure." },
        { title: "Votre véhicule", text: "Choisissez votre véhicule et vos options (siège enfant, bagages)." },
        { title: "Votre confirmation", text: <>Recevez votre confirmation avec le tarif et les coordonnées du chauffeur. <PricingNote /></> },
      ]} />

      <FaqSection eyebrow="FAQ" title="Questions fréquentes" items={taxiLyonFaq} />
      <RelatedLinksRow title="Nos services" links={[
        { href: "/taxi-aeroport-lyon", label: "Taxi aéroport Lyon" },
        { href: "/taxi-gare-lyon", label: "Taxi gare de Lyon" },
        { href: "/taxi-van-lyon", label: "Taxi van Lyon" },
        { href: "/reserver-taxi-lyon", label: "Réserver un taxi à Lyon" },
      ]} />
      <FinalCta title="Votre chauffeur vous attend" primaryLabel="Réserver mon VTC" primaryHref="/reserver-taxi-lyon" />
    </TaxiShell>
  );
}

// ---------------------------------------------------------------------------
// 2. /taxi-aeroport-lyon
// ---------------------------------------------------------------------------

const taxiAeroportFaq: KdAccordionItem[] = [
  { q: "Que se passe-t-il si mon vol est en retard ?", a: "Indiquez votre numéro de vol et votre heure d'arrivée prévue à la réservation. En cas de changement d'horaire, contactez KDRIVE dès que possible par téléphone pour ajuster la prise en charge." },
  { q: "Où retrouver mon chauffeur ?", a: "Dans le hall des arrivées de votre terminal, ou au point de rendez-vous confirmé avec vous selon les zones d'accès autorisées le jour de votre trajet." },
  { q: "Combien de bagages puis-je emporter ?", a: "Précisez-le à la réservation : nous choisissons le véhicule adapté. Au-delà de 3 grosses valises, le van est recommandé." },
  { q: "Puis-je réserver pour quelqu'un d'autre ?", a: "Oui. Indiquez le nom et le téléphone du passager : il reçoit les informations du chauffeur." },
  { q: "Faut-il réserver longtemps à l'avance ?", a: "Idéalement la veille, surtout pour les départs avant 6 h. Pour une demande de dernière minute, appelez-nous." },
];

export function TaxiAeroportLyonPage() {
  return (
    <TaxiShell>
      <TaxiHero breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Aéroport" }]} eyebrow="Taxi aéroport Lyon" title="Taxi aéroport Lyon Saint-Exupéry : votre VTC réservé" lead="Vol tôt le matin ou atterrissage tardif, votre chauffeur est là. Indiquez votre numéro de vol à la réservation pour que KDRIVE prépare au mieux votre prise en charge." image="/images/site/kdrive-transfert-aeroport-lyon-saint-exupery.webp" prefillAddress={airportAddress} prefillLabel="l'aéroport" />

      <EditorialList eyebrow="Transfert aéroport" title="Un transfert préparé, de la porte au terminal" image="/images/site/kdrive-voyageur-affaires-aeroport-lyon.webp" items={[
        <><strong>Numéro de vol pris en compte</strong> à la réservation pour mieux préparer votre prise en charge.</>,
        <><strong>Accueil en zone arrivées</strong>, au point confirmé avec vous.</>,
        <><strong>Tarif confirmé par téléphone</strong> avant la course, quel que soit le trafic sur l&apos;A43 ou la rocade Est.</>,
        <><strong>Aide aux bagages</strong> et véhicule adapté à votre volume : berline ou van.</>,
      ]} />

      <NumberedCards eyebrow="Aller & retour" title="Lyon ↔ Saint-Exupéry dans les deux sens" items={[
        { title: "Aller à l'aéroport", text: "Nous vous récupérons à votre domicile, hôtel ou bureau et vous déposons devant votre terminal. Comptez en moyenne 30 à 45 minutes depuis le centre de Lyon selon l'heure et la circulation." },
        { title: "Retour de l'aéroport", text: "Indiquez votre numéro de vol à la réservation. En cas de retard, contactez-nous dès que possible par téléphone pour ajuster la prise en charge." },
      ]} />

      <FeatureSplit eyebrow="Porte à porte" title="Une alternative au Rhônexpress et au taxi" image="/images/airport-transfer.jpg">
          <p className="kd-body">Avec des bagages, en famille ou à plusieurs, le VTC permet un trajet porte à porte sans correspondance, avec un tarif confirmé avant le départ — contrairement au taxi, où le prix dépend du compteur.</p>
          <PricingNote />
      </FeatureSplit>

      <FaqSection eyebrow="FAQ" title="Questions fréquentes" items={taxiAeroportFaq} />
      <RelatedLinksRow title="Poursuivre" links={[
        { href: "/taxi-lyon", label: "Taxi Lyon" },
        { href: "/taxi-van-lyon", label: "Taxi van Lyon" },
        { href: "/taxi-gare-lyon", label: "Taxi gare de Lyon" },
      ]} />
      <FinalCta title="Votre vol est réservé ? Réservez votre chauffeur" primaryLabel="Réserver mon transfert" primaryHref="/reserver-taxi-lyon" />
    </TaxiShell>
  );
}

// ---------------------------------------------------------------------------
// 3. /taxi-gare-lyon
// ---------------------------------------------------------------------------

const taxiGareFaq: KdAccordionItem[] = [
  { q: "Où mon chauffeur m'attend-il à la Part-Dieu ?", a: "Au point confirmé avec vous à la réservation. Le chauffeur reste joignable à l'arrivée de votre train." },
  { q: "Mon train a du retard, que se passe-t-il ?", a: "Indiquez votre numéro de train à la réservation et contactez-nous en cas de retard : nous ajustons la prise en charge." },
  { q: "Puis-je réserver pour un collaborateur ou un client ?", a: "Oui, indiquez simplement le nom et le téléphone du passager. La facture est établie au nom de votre entreprise si besoin." },
  { q: "Combien coûte un VTC entre Part-Dieu et l'aéroport ?", a: "Le tarif est communiqué par téléphone avant confirmation, bagages inclus." },
];

export function TaxiGareLyonPage() {
  return (
    <TaxiShell>
      <TaxiHero breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Gare" }]} eyebrow="Taxi gare de Lyon" title="Taxi gare de Lyon : votre chauffeur VTC à Part-Dieu et Perrache" lead="Descendez du train sans chercher de taxi ni attendre dans une file. Indiquez votre numéro de train à la réservation : votre chauffeur reste joignable à votre arrivée." image="/images/site/kdrive-transfert-gare-lyon-part-dieu.webp" prefillAddress={partDieuAddress} prefillLabel="la gare" />

      <EditorialList eyebrow="Pourquoi réserver" title="Pourquoi réserver votre VTC en gare" image="/images/site/kdrive-arrivee-business-gare-lyon.webp" items={[
        <><strong>Véhicule réservé</strong>, pas de file d&apos;attente à chercher.</>,
        <><strong>Numéro de train pris en compte</strong> à la réservation.</>,
        <><strong>Point de rendez-vous confirmé</strong> avec vous avant votre trajet.</>,
        <><strong>Tarif confirmé par téléphone</strong> avant la course.</>,
        <><strong>Facture</strong> au nom de votre société pour vos déplacements professionnels.</>,
      ]} />

      <NumberedCards eyebrow="Gares desservies" title="Vos rendez-vous ferroviaires à Lyon" items={[
        { title: "Gare de Lyon Part-Dieu", text: "Première gare de correspondance de la région lyonnaise, la Part-Dieu connaît un chantier permanent autour du pôle d'échanges. Le point de prise en charge précis (côté Villette ou côté Vivier-Merle) vous est confirmé à la réservation. Dépose possible pour vos départs, au plus près du hall." },
        { title: "Gare de Lyon Perrache", text: "Au sud de la Presqu'île, Perrache dessert les TER et une partie des TGV. Votre chauffeur vous attend au point convenu, pour rejoindre rapidement Confluence, Bellecour ou les quartiers ouest." },
        { title: "Autres gares", text: <>Gare Saint-Exupéry TGV, Lyon Jean-Macé, Vaise et Saint-Paul, sur réservation. <PricingNote /></> },
      ]} />

      <FeatureSplit eyebrow="Arrivée sereine" title="Du quai à votre destination" image="/images/site/kdrive-quartier-affaires-part-dieu-lyon.webp">
        <p className="kd-body">Votre point de rendez-vous est confirmé avant le trajet. Votre chauffeur reste joignable à l&apos;arrivée de votre train et vous conduit directement à votre hôtel, votre bureau ou votre prochain rendez-vous.</p>
      </FeatureSplit>

      <FaqSection eyebrow="FAQ" title="Questions fréquentes" items={taxiGareFaq} />
      <RelatedLinksRow title="Poursuivre" links={[
        { href: "/taxi-aeroport-lyon", label: "Taxi aéroport Lyon" },
        { href: "/taxi-lyon", label: "Taxi Lyon" },
      ]} />
      <FinalCta title="Votre train arrive, votre chauffeur aussi" primaryLabel="Réserver" primaryHref="/reserver-taxi-lyon" />
    </TaxiShell>
  );
}

// ---------------------------------------------------------------------------
// 4. /taxi-van-lyon
// ---------------------------------------------------------------------------

const vanEntry = vehicleCatalog.find((v) => v.slug === "van")!;

const taxiVanFaq: KdAccordionItem[] = [
  { q: "Combien de personnes peut transporter votre van ?", a: `Jusqu'à ${vanEntry.passengers} passagers, plus le chauffeur.` },
  { q: "Puis-je réserver plusieurs vans pour un événement ?", a: "Contactez-nous avec la date et le nombre de personnes : nous vous indiquons la disponibilité." },
  { q: "Le van coûte-t-il plus cher qu'une berline ?", a: `Oui, légèrement : à partir de ${vanEntry.fromPriceEuros} € contre ${vehicleCatalog.find((v) => v.slug === "essential")!.fromPriceEuros} € en Essentiel. Le tarif exact est communiqué par téléphone avant confirmation.` },
  { q: "Pouvez-vous attendre pendant l'événement ?", a: "Oui, en mise à disposition à l'heure, sur demande." },
];

export function TaxiVanLyonPage() {
  return (
    <TaxiShell>
      <TaxiHero breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Van" }]} eyebrow="Taxi van Lyon" title="Taxi van à Lyon : un VTC spacieux pour vos groupes et vos bagages" lead={`Voyagez à plusieurs sans réserver deux voitures. Notre van ${vanEntry.examples[0]} accueille jusqu'à ${vanEntry.passengers} passagers et leurs bagages, avec un seul chauffeur et un seul tarif.`} image="/images/vehicle-van.jpg" />

      <NumberedCards eyebrow="Pour qui" title="Un seul véhicule, plusieurs façons de voyager" items={[
        { title: "Familles", text: "Vers l'aéroport avec poussette, valises et sièges enfant sur demande." },
        { title: "Groupes d'amis", text: "Soirée, concert ou match au Groupama Stadium." },
        { title: "Équipes d'entreprise", text: "Séminaire, salon à Eurexpo, navette clients — facture au nom de votre société." },
        { title: "Événements privés", text: "Mariages, anniversaires, transferts d'invités." },
      ]} />

      <EditorialList eyebrow="Le véhicule" title="Notre van" image="/images/vehicle-van.jpg" items={[
        <><strong>Modèle :</strong> {vanEntry.examples.join(", ")}.</>,
        <><strong>Passagers :</strong> {vanEntry.passengers}.</>,
        <><strong>Bagages :</strong> {vanEntry.luggage} valises.</>,
        <><strong>Équipements :</strong> climatisation, sièges enfant sur demande.</>,
      ]} note={<p className="kd-field-hint">{VEHICLE_EXAMPLES_DISCLAIMER}</p>} />

      <FeatureSplit eyebrow="Voyager ensemble" title="Moins cher que deux taxis" image="/images/site/kdrive-berline-autoroute-lyon.webp">
          <p className="kd-body">Un seul véhicule, un seul chauffeur, un seul tarif confirmé à l&apos;avance. Ramené par personne, le van est souvent plus économique que deux voitures séparées, et tout le monde arrive en même temps.</p>
      </FeatureSplit>

      <NumberedCards eyebrow="Trajets" title="Trajets courants en van" items={[
        { title: "Aéroport", text: "Lyon ↔ Aéroport Saint-Exupéry" },
        { title: "Salons", text: "Gare Part-Dieu ↔ Eurexpo pour les salons" },
        { title: "Alpes", text: "Lyon ↔ stations des Alpes (sur demande)" },
        { title: "Longue distance", text: <>Lyon ↔ Genève, Annecy, Grenoble (sur demande). <PricingNote /></> },
      ]} />

      <FaqSection eyebrow="FAQ" title="Questions fréquentes" items={taxiVanFaq} />
      <RelatedLinksRow title="Poursuivre" links={[
        { href: "/taxi-aeroport-lyon", label: "Taxi aéroport Lyon" },
        { href: "/taxi-lyon", label: "Taxi Lyon" },
        { href: "/vehicules", label: "Nos véhicules" },
      ]} />
      <FinalCta title="Vous êtes plusieurs ? Voyagez ensemble" primaryLabel="Réserver un van" primaryHref="/reserver-taxi-lyon" />
    </TaxiShell>
  );
}

// ---------------------------------------------------------------------------
// 5. /reserver-taxi-lyon
// ---------------------------------------------------------------------------

const reserverTaxiFaq: KdAccordionItem[] = [
  { q: "Puis-je réserver pour tout de suite ?", a: "Sous réserve de disponibilité. Pour un départ dans l'heure, appelez-nous pour une confirmation immédiate." },
  { q: "Comment modifier ou annuler ma réservation ?", a: "Contactez KDRIVE directement par téléphone pour modifier ou annuler une demande de réservation." },
  { q: "Vais-je recevoir une confirmation ?", a: "Oui, avec le tarif confirmé par téléphone et les coordonnées de votre chauffeur avant le départ." },
  { q: "Puis-je réserver pour un proche ou un client ?", a: "Oui, indiquez le nom et le téléphone du passager dans le formulaire ou par téléphone." },
];

export function ReserverTaxiLyonPage() {
  return (
    <TaxiShell>
      <TaxiHero breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Réserver" }]} eyebrow="Réserver un taxi à Lyon" title="Réserver un taxi à Lyon : votre VTC en quelques minutes" lead="Renseignez votre trajet, choisissez votre véhicule : KDRIVE vous recontacte pour confirmer le tarif. Aucun compte à créer." image="/images/hero-lyon.jpg" />

      <NumberedCards eyebrow="Réservation" title="Réserver en 3 étapes" items={[
        { title: "Votre trajet", text: "Adresse de départ, destination, date et heure. Pour un vol ou un train, ajoutez son numéro." },
        { title: "Votre véhicule", text: "Essentiel, Premium ou Van. Ajoutez vos options (siège enfant, bagages)." },
        { title: "Votre confirmation", text: "KDRIVE vous contacte par téléphone pour confirmer le tarif et les détails." },
      ]} />

      <FeatureSplit eyebrow="Contact direct" title="Vous préférez parler à quelqu'un ?" image="/images/site/kdrive-dirigeant-hotel-business-lyon.webp">
          <p className="kd-body">Pour une demande de dernière minute, un trajet spécial ou un groupe, contactez-nous directement.</p>
          <ul className="kd-signature-editorial-list">
            <li>Téléphone : <a href="tel:+33688863419">06 88 86 34 19</a></li>
            <li>WhatsApp : <a href="https://wa.me/33688863419" target="_blank" rel="noopener">06 88 86 34 19</a></li>
            <li>E-mail : <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a></li>
          </ul>
      </FeatureSplit>

      <EditorialList eyebrow="Votre trajet" title="Ce qui est inclus" image="/images/site/kdrive-travail-arriere-berline-lyon.webp" items={[
        <>Prise en charge à l&apos;adresse indiquée</>,
        <>Aide aux bagages</>,
        <>Prise en compte de votre numéro de vol ou de train</>,
      ]} note={<p className="kd-field-hint">Un éventuel supplément (prise en charge aéroport ou gare, animal) vous est précisé avant confirmation, en même temps que le tarif.</p>}>
        <p className="kd-body">Tarif confirmé par téléphone · Facture sur demande · Siège enfant sur demande</p>
      </EditorialList>

      <RelatedLinksRow title="Nos trajets" links={[
        { href: "/taxi-aeroport-lyon", label: "Aéroport Saint-Exupéry" },
        { href: "/taxi-gare-lyon", label: "Gares Part-Dieu et Perrache" },
        { href: "/taxi-van-lyon", label: "Van et groupes" },
        { href: "/taxi-lyon", label: "Trajets en ville" },
      ]} />

      <FaqSection eyebrow="FAQ" title="Questions sur la réservation" items={reserverTaxiFaq} />
      <FinalCta title="Votre chauffeur, en quelques minutes" primaryLabel="Demander une réservation" />
    </TaxiShell>
  );
}
