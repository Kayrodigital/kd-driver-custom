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
    <>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>
      {children}
      <FooterSection />
    </>
  );
}

function RelatedLinksRow({ title, links }: { title: string; links: { href: string; label: string }[] }) {
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
    <section className="kd-section kd-on-white">
      <div className="kd-container" style={{ maxWidth: 720 }}>
        <div className="kd-section-head"><p className="kd-eyebrow">{eyebrow}</p><h2 className="kd-h2">{title}</h2></div>
        <KdAccordion items={items} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}

function FinalCta({ title, primaryLabel, primaryHref = "/reserver" }: { title: string; primaryLabel: string; primaryHref?: string }) {
  return (
    <section id="reserver" className="kd-section kd-on-cream">
      <div className="kd-container kd-cta-split">
        <div className="kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">{title}</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="kd-btn kd-btn--primary" href={primaryHref}>{primaryLabel} <span aria-hidden="true">→</span></Link>
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
      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon" }]} />
            <p className="kd-eyebrow">Taxi Lyon</p>
            <h1 className="kd-h1">Besoin d&apos;un taxi à Lyon ? Choisissez un chauffeur privé KDRIVE</h1>
            <p className="kd-lead">Un trajet en ville, un rendez-vous important, un retour de soirée : réservez un VTC avec chauffeur en quelques clics. Le tarif est communiqué avant le départ, le véhicule est impeccable, le chauffeur est à l&apos;heure.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card"><HeroSearchForm tone="dark" /></div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">VTC ou taxi</p>
          <h2 className="kd-h2">Pourquoi choisir un VTC plutôt qu&apos;un taxi à Lyon</h2>
          <p className="kd-body">Avec KDRIVE, le tarif est communiqué par téléphone avant la course, sans compteur qui tourne dans les bouchons du périphérique ou du tunnel de Fourvière. Vous savez qui vient vous chercher, avec quel véhicule, et à quelle heure.</p>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li><strong>Tarif confirmé avant la course</strong>, communiqué par téléphone.</li>
            <li><strong>Chauffeur professionnel</strong> : titulaire de la carte VTC, conduite souple.</li>
            <li><strong>Véhicules Essentiel, Premium ou Van</strong>, propres et climatisés.</li>
            <li><strong>Réservation par téléphone, WhatsApp ou formulaire</strong>, pour un trajet planifié ou le jour même selon disponibilité.</li>
          </ul>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head"><p className="kd-eyebrow">Trajets</p><h2 className="kd-h2">Nos trajets les plus demandés à Lyon</h2></div>
          <div className="kd-grid-3">
            <Link href="/taxi-aeroport-lyon" className="kd-card kd-card--hover kd-card--flat"><h3 className="kd-h4">Aéroport Lyon-Saint Exupéry</h3><p className="kd-body">Dépose et accueil, suivi de votre vol.</p><span className="kd-card-link">Voir la page →</span></Link>
            <Link href="/taxi-gare-lyon" className="kd-card kd-card--hover kd-card--flat"><h3 className="kd-h4">Gares Part-Dieu et Perrache</h3><p className="kd-body">Prise en charge synchronisée sur l&apos;horaire de votre train.</p><span className="kd-card-link">Voir la page →</span></Link>
            <Link href="/taxi-van-lyon" className="kd-card kd-card--hover kd-card--flat"><h3 className="kd-h4">Groupes et familles</h3><p className="kd-body">Van jusqu&apos;à 7 passagers et leurs bagages.</p><span className="kd-card-link">Voir la page →</span></Link>
          </div>
          <p className="kd-body" style={{ marginTop: 16 }}>Trajets professionnels (rendez-vous clients, séminaires, facture au nom de votre société) et sorties : Eurexpo, Groupama Stadium, LDLC Arena, Halle Tony Garnier, restaurants de la Presqu&apos;île.</p>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Partout dans Lyon et la métropole</h2>
          <p className="kd-body">Nos chauffeurs interviennent dans les 9 arrondissements de Lyon et les communes voisines : Villeurbanne, Bron, Vénissieux, Caluire-et-Cuire, Écully, Saint-Priest, Meyzieu, Vaulx-en-Velin, Oullins-Pierre-Bénite, Tassin-la-Demi-Lune. Trajets longue distance sur demande.</p>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Comment ça marche</h2>
          <ol className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", display: "grid", gap: 8 }}>
            <li>Indiquez votre adresse de départ, votre destination, la date et l&apos;heure.</li>
            <li>Choisissez votre véhicule et vos options (siège enfant, bagages).</li>
            <li>Recevez votre confirmation avec le tarif et les coordonnées du chauffeur.</li>
          </ol>
          <PricingNote />
        </div>
      </section>

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
      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/site/kdrive-transfert-aeroport-lyon-saint-exupery.webp" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Aéroport" }]} />
            <p className="kd-eyebrow">Taxi aéroport Lyon</p>
            <h1 className="kd-h1">Taxi aéroport Lyon Saint-Exupéry : votre VTC réservé</h1>
            <p className="kd-lead">Vol tôt le matin ou atterrissage tardif, votre chauffeur est là. Indiquez votre numéro de vol à la réservation pour que KDRIVE prépare au mieux votre prise en charge.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card"><HeroSearchForm tone="dark" prefillAddress={airportAddress} prefillLabel="l'aéroport" /></div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Transfert aéroport</p>
          <h2 className="kd-h2">Un transfert préparé, de la porte au terminal</h2>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li><strong>Numéro de vol pris en compte</strong> à la réservation pour mieux préparer votre prise en charge.</li>
            <li><strong>Accueil en zone arrivées</strong>, au point confirmé avec vous.</li>
            <li><strong>Tarif confirmé par téléphone</strong> avant la course, quel que soit le trafic sur l&apos;A43 ou la rocade Est.</li>
            <li><strong>Aide aux bagages</strong> et véhicule adapté à votre volume : berline ou van.</li>
          </ul>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Lyon ↔ Saint-Exupéry dans les deux sens</h2>
          <p className="kd-body"><strong>Aller à l&apos;aéroport</strong> : nous vous récupérons à votre domicile, hôtel ou bureau et vous déposons devant votre terminal. Comptez en moyenne 30 à 45 minutes depuis le centre de Lyon selon l&apos;heure et la circulation.</p>
          <p className="kd-body"><strong>Retour de l&apos;aéroport</strong> : indiquez votre numéro de vol à la réservation. En cas de retard, contactez-nous dès que possible par téléphone pour ajuster la prise en charge.</p>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Une alternative au Rhônexpress et au taxi</h2>
          <p className="kd-body">Avec des bagages, en famille ou à plusieurs, le VTC permet un trajet porte à porte sans correspondance, avec un tarif confirmé avant le départ — contrairement au taxi, où le prix dépend du compteur.</p>
          <PricingNote />
        </div>
      </section>

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
      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/site/kdrive-transfert-gare-lyon-part-dieu.webp" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Gare" }]} />
            <p className="kd-eyebrow">Taxi gare de Lyon</p>
            <h1 className="kd-h1">Taxi gare de Lyon : votre chauffeur VTC à Part-Dieu et Perrache</h1>
            <p className="kd-lead">Descendez du train sans chercher de taxi ni attendre dans une file. Indiquez votre numéro de train à la réservation : votre chauffeur reste joignable à votre arrivée.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card"><HeroSearchForm tone="dark" prefillAddress={partDieuAddress} prefillLabel="la gare" /></div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">Pourquoi réserver</p>
          <h2 className="kd-h2">Pourquoi réserver votre VTC en gare</h2>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li><strong>Véhicule réservé</strong>, pas de file d&apos;attente à chercher.</li>
            <li><strong>Numéro de train pris en compte</strong> à la réservation.</li>
            <li><strong>Point de rendez-vous confirmé</strong> avec vous avant votre trajet.</li>
            <li><strong>Tarif confirmé par téléphone</strong> avant la course.</li>
            <li><strong>Facture</strong> au nom de votre société pour vos déplacements professionnels.</li>
          </ul>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Gare de Lyon Part-Dieu</h2>
          <p className="kd-body">Première gare de correspondance de la région lyonnaise, la Part-Dieu connaît un chantier permanent autour du pôle d&apos;échanges. Le point de prise en charge précis (côté Villette ou côté Vivier-Merle) vous est confirmé à la réservation. Dépose possible pour vos départs, au plus près du hall.</p>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Gare de Lyon Perrache</h2>
          <p className="kd-body">Au sud de la Presqu&apos;île, Perrache dessert les TER et une partie des TGV. Votre chauffeur vous attend au point convenu, pour rejoindre rapidement Confluence, Bellecour ou les quartiers ouest.</p>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-body">Autres gares desservies sur réservation : gare Saint-Exupéry TGV, Lyon Jean-Macé, Vaise, Saint-Paul.</p>
          <PricingNote />
        </div>
      </section>

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
      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/site/kdrive-berline-autoroute-lyon.webp" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Van" }]} />
            <p className="kd-eyebrow">Taxi van Lyon</p>
            <h1 className="kd-h1">Taxi van à Lyon : un VTC spacieux pour vos groupes et vos bagages</h1>
            <p className="kd-lead">Voyagez à plusieurs sans réserver deux voitures. Notre van {vanEntry.examples[0]} accueille jusqu&apos;à {vanEntry.passengers} passagers et leurs bagages, avec un seul chauffeur et un seul tarif.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card"><HeroSearchForm tone="dark" /></div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container">
          <div className="kd-section-head"><p className="kd-eyebrow">Pour qui</p><h2 className="kd-h2">Pour qui ?</h2></div>
          <div className="kd-grid-3">
            <div className="kd-card kd-card--flat"><h3 className="kd-h4">Familles</h3><p className="kd-body">Vers l&apos;aéroport avec poussette, valises et sièges enfant sur demande.</p></div>
            <div className="kd-card kd-card--flat"><h3 className="kd-h4">Groupes d&apos;amis</h3><p className="kd-body">Soirée, concert ou match au Groupama Stadium.</p></div>
            <div className="kd-card kd-card--flat"><h3 className="kd-h4">Équipes d&apos;entreprise</h3><p className="kd-body">Séminaire, salon à Eurexpo, navette clients — facture au nom de votre société.</p></div>
            <div className="kd-card kd-card--flat"><h3 className="kd-h4">Événements privés</h3><p className="kd-body">Mariages, anniversaires, transferts d&apos;invités.</p></div>
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Notre van</h2>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li><strong>Modèle :</strong> {vanEntry.examples.join(", ")}.</li>
            <li><strong>Passagers :</strong> {vanEntry.passengers}.</li>
            <li><strong>Bagages :</strong> {vanEntry.luggage} valises.</li>
            <li><strong>Équipements :</strong> climatisation, sièges enfant sur demande.</li>
          </ul>
          <p className="kd-field-hint">{VEHICLE_EXAMPLES_DISCLAIMER}</p>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Moins cher que deux taxis</h2>
          <p className="kd-body">Un seul véhicule, un seul chauffeur, un seul tarif confirmé à l&apos;avance. Ramené par personne, le van est souvent plus économique que deux voitures séparées, et tout le monde arrive en même temps.</p>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Trajets courants en van</h2>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li>Lyon ↔ Aéroport Saint-Exupéry</li>
            <li>Gare Part-Dieu ↔ Eurexpo pour les salons</li>
            <li>Lyon ↔ stations des Alpes (sur demande)</li>
            <li>Lyon ↔ Genève, Annecy, Grenoble (sur demande)</li>
          </ul>
          <PricingNote />
        </div>
      </section>

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
      <section className="kd-hero kd-hero--b kd-on-dark">
        <SceneImage src="/images/hero-lyon.jpg" alt="" className="kd-hero-photo" priority sizes="100vw" />
        <div className="kd-container kd-hero-inner">
          <div className="kd-hero-copy">
            <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Taxi Lyon", href: "/taxi-lyon" }, { label: "Réserver" }]} />
            <p className="kd-eyebrow">Réserver un taxi à Lyon</p>
            <h1 className="kd-h1">Réserver un taxi à Lyon : votre VTC en quelques minutes</h1>
            <p className="kd-lead">Renseignez votre trajet, choisissez votre véhicule : KDRIVE vous recontacte pour confirmer le tarif. Aucun compte à créer.</p>
            <TrustBadge />
          </div>
          <div className="kd-hero-form-card"><HeroSearchForm tone="dark" /></div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 720, textAlign: "center" }}>
          <p className="kd-body">Tarif confirmé par téléphone · Facture sur demande · Siège enfant sur demande</p>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Réserver en 3 étapes</h2>
          <ol className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", display: "grid", gap: 8 }}>
            <li><strong>Votre trajet</strong> : adresse de départ, destination, date et heure. Pour un vol ou un train, ajoutez son numéro.</li>
            <li><strong>Votre véhicule</strong> : Essentiel, Premium ou Van. Ajoutez vos options (siège enfant, bagages).</li>
            <li><strong>Votre confirmation</strong> : KDRIVE vous contacte par téléphone pour confirmer le tarif et les détails.</li>
          </ol>
        </div>
      </section>

      <section className="kd-section kd-section--compact kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Vous préférez parler à quelqu&apos;un ?</h2>
          <p className="kd-body">Pour une demande de dernière minute, un trajet spécial ou un groupe, contactez-nous directement.</p>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li>Téléphone : <a href="tel:+33688863419">06 88 86 34 19</a></li>
            <li>WhatsApp : <a href="https://wa.me/33688863419" target="_blank" rel="noopener">06 88 86 34 19</a></li>
            <li>E-mail : <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a></li>
          </ul>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <h2 className="kd-h2">Ce qui est inclus</h2>
          <ul className="kd-body" style={{ margin: 0, paddingLeft: "1.2em", listStyle: "disc", display: "grid", gap: 8 }}>
            <li>Prise en charge à l&apos;adresse indiquée</li>
            <li>Aide aux bagages</li>
            <li>Prise en compte de votre numéro de vol ou de train</li>
          </ul>
          <p className="kd-field-hint">Un éventuel supplément (prise en charge aéroport ou gare, animal) vous est précisé avant confirmation, en même temps que le tarif.</p>
        </div>
      </section>

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
