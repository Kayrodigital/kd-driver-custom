import Link from "next/link";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection, ReassuranceList } from "./sections";
import { KdAccordion, KdLearnMoreAccordion, type KdLearnMoreItem } from "@/components/kd-accordion";

/**
 * Emplacement "En savoir plus" (4-5 volets), optionnel et vide tant
 * qu'aucun contenu n'a été rédigé par page — cf. audit densité visuelle du
 * 02/10/2026. N'affiche rien si `items` est vide/non fourni.
 */
function LearnMoreSection({ title, items }: { title?: string; items?: KdLearnMoreItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="kd-section kd-section--compact kd-on-cream">
      <div className="kd-container" style={{ maxWidth: 720 }}>
        <div className="kd-section-head">
          <p className="kd-eyebrow">En savoir plus</p>
          <h2 className="kd-h2">{title}</h2>
        </div>
        <KdLearnMoreAccordion items={items} />
      </div>
    </section>
  );
}
import { TrustBadge } from "./trust-badge";
import { vehicleCatalog, VEHICLE_EXAMPLES_DISCLAIMER } from "@/domain/pricing/vehicle-catalog";

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

function PageHero({ eyebrow, title, lead, breadcrumb, showTrustBadge = true }: { eyebrow: string; title: string; lead: string; breadcrumb?: BreadcrumbItem[]; showTrustBadge?: boolean }) {
  return (
    <section className="kd-section kd-on-dark" style={{ paddingBottom: "var(--kd-space-6)" }}>
      <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <p className="kd-eyebrow">{eyebrow}</p>
        <h1 className="kd-h1">{title}</h1>
        <p className="kd-lead">{lead}</p>
        {/* Le badge Trustindex est un composant serveur asynchrone : ne
            jamais l'afficher quand PageHero est rendu depuis un contexte
            client (cf. le sélecteur de gabarits de /design-preview, un
            outil de prévisualisation interne, non indexé) — React ne peut
            pas rendre un composant serveur async dans un arbre client. */}
        {showTrustBadge && <TrustBadge />}
      </div>
    </section>
  );
}

const vehiclesRelatedLinks = [
  { href: "/tarifs", label: "Consulter les catégories et tarifs" },
  { href: "/transfert-aeroport", label: "Transfert aéroport" },
  { href: "/chauffeur-entreprise", label: "Déplacements professionnels" },
];

export function VehiclesPage({
  framed = true,
  showTrustBadge = true,
  learnMoreTitle,
  learnMoreItems,
}: { framed?: boolean; showTrustBadge?: boolean; learnMoreTitle?: string; learnMoreItems?: KdLearnMoreItem[] } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="Nos véhicules" title="Une catégorie claire pour chaque besoin" lead="Essentiel, Premium ou Van : choisissez votre catégorie, KDRIVE vous contacte ensuite pour confirmer le tarif et la réservation." showTrustBadge={showTrustBadge} />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-3">
          {vehicleCatalog.map((vehicle) => (
            <div key={vehicle.slug} className="kd-card kd-card--hover kd-vehicle-card">
              <SceneImage src={vehicle.image} alt={vehicle.label} note="photo à venir" className="kd-vehicle-image" sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" />
              <div className="kd-vehicle-meta">
                <h3 className="kd-h4">{vehicle.label}</h3>
                <small>{vehicle.examples.join(" · ")}</small>
              </div>
              <p className="kd-body" style={{ fontWeight: 700, margin: 0 }}>À partir de {vehicle.fromPriceEuros} €</p>
              <p className="kd-body">{vehicle.body}</p>
              <a className="kd-card-link" href="/reserver">Choisir ma catégorie <span aria-hidden="true">→</span></a>
            </div>
          ))}
        </div>
        <p className="kd-field-hint" style={{ marginTop: "var(--kd-space-4)", maxWidth: 640 }}>{VEHICLE_EXAMPLES_DISCLAIMER}</p>
        <p className="kd-field-hint" style={{ marginTop: 8, maxWidth: 640 }}>
          Tarifs indicatifs. Le tarif définitif est communiqué après étude de votre trajet.
          KDRIVE vous contacte par téléphone avant toute confirmation de réservation.
        </p>
      </section>
      <RelatedLinks title="Poursuivre votre réservation" links={vehiclesRelatedLinks} />
      <LearnMoreSection title={learnMoreTitle} items={learnMoreItems} />
      <section id="reserver" className="kd-section kd-on-white">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">Choisissez votre catégorie en réservant</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Choisir ma catégorie <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </PageShell>
  );
}

const tarifsSteps = [
  "Vous envoyez votre demande en ligne",
  "KDRIVE étudie votre trajet",
  "Nous vous contactons par téléphone",
  "Nous vous communiquons le tarif",
  "Vous confirmez votre réservation",
];

export function TarifsPage({
  framed = true,
  showTrustBadge = true,
  learnMoreTitle,
  learnMoreItems,
}: { framed?: boolean; showTrustBadge?: boolean; learnMoreTitle?: string; learnMoreItems?: KdLearnMoreItem[] } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero eyebrow="Tarifs" title="Nos catégories" lead="Un tarif est communiqué par téléphone après étude de votre trajet — jamais avant." showTrustBadge={showTrustBadge} />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-3">
          {vehicleCatalog.map((vehicle) => (
            <div key={vehicle.slug} className="kd-card kd-card--flat">
              <h3 className="kd-h4">{vehicle.label}</h3>
              <p className="kd-body" style={{ fontWeight: 700, fontSize: "1.1rem" }}>À partir de {vehicle.fromPriceEuros} €</p>
              <p className="kd-body">{vehicle.examples.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head kd-section-head--center">
            <p className="kd-eyebrow">Comment ça marche</p>
            <h2 className="kd-h2">Comment obtenir votre tarif ?</h2>
          </div>
          <ol className="kd-grid-3" style={{ listStyle: "none", padding: 0, counterReset: "step" }}>
            {tarifsSteps.map((step, index) => (
              <li key={step} className="kd-card kd-card--flat" style={{ display: "grid", gap: 8 }}>
                <span className="kd-advantage-num">{index + 1}</span>
                <p className="kd-body" style={{ margin: 0 }}>{step}</p>
              </li>
            ))}
          </ol>
          <p className="kd-field-hint" style={{ marginTop: "var(--kd-space-4)", maxWidth: 640 }}>
            Tarifs indicatifs. Le tarif définitif est communiqué après étude de votre trajet par KDRIVE.
          </p>
        </div>
      </section>
      <section id="reserver" className="kd-section kd-on-cream">
        <div className="kd-container kd-cta-split">
          <div className="kd-cta">
            <p className="kd-eyebrow">Réservation</p>
            <h2 className="kd-h2">Demandez votre tarif</h2>
            <a className="kd-btn kd-btn--primary" href="/reserver">Demander mon tarif <span aria-hidden="true">→</span></a>
            <p className="kd-field-hint" style={{ marginTop: "var(--kd-space-3)" }}>📞 06 88 86 34 19</p>
          </div>
          <ReassuranceList />
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
      <LearnMoreSection title={learnMoreTitle} items={learnMoreItems} />
      <section id="reserver" className="kd-section kd-on-dark">
        <div className="kd-container kd-cta-split">
          <div className="kd-cta">
            <p className="kd-eyebrow">Réservation</p>
            <h2 className="kd-h2">Obtenez votre tarif en quelques secondes</h2>
            <a className="kd-btn kd-btn--gold" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
          </div>
          <ReassuranceList />
        </div>
      </section>
    </PageShell>
  );
}

export function AboutPage({
  framed = true,
  showTrustBadge = true,
  learnMoreTitle,
  learnMoreItems,
}: { framed?: boolean; showTrustBadge?: boolean; learnMoreTitle?: string; learnMoreItems?: KdLearnMoreItem[] } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero
        eyebrow="À propos"
        title="Une entreprise locale, à Lyon"
        lead="KDRIVE propose un service de chauffeur privé pensé pour les habitants, les entreprises et les visiteurs de Lyon et sa région."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        showTrustBadge={showTrustBadge}
      />
      <section className="kd-section kd-on-cream" style={{ paddingTop: 0 }}>
        <div className="kd-container">
          <SceneImage src="/images/hero-longues-distances.jpg" alt="Lyon" className="kd-scene--tall" style={{ minHeight: 420 }} sizes="100vw" />
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
      <LearnMoreSection title={learnMoreTitle} items={learnMoreItems} />
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

export function ContactPage({
  framed = true,
  showTrustBadge = true,
  learnMoreTitle,
  learnMoreItems,
}: { framed?: boolean; showTrustBadge?: boolean; learnMoreTitle?: string; learnMoreItems?: KdLearnMoreItem[] } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero
        eyebrow="Contact"
        title="Nous contacter"
        lead="Pour une demande de réservation, le formulaire reste le moyen le plus rapide. Pour toute autre question, contactez-nous directement."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        showTrustBadge={showTrustBadge}
      />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-grid-2" style={{ alignItems: "start" }}>
          <div className="kd-card">
            <p className="kd-eyebrow">Téléphone</p>
            <h3 className="kd-h3" style={{ margin: "10px 0" }}><a href="tel:+33688863419" style={{ textDecoration: "none", color: "inherit" }}>06 88 86 34 19</a></h3>
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
      <LearnMoreSection title={learnMoreTitle} items={learnMoreItems} />
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
    q: "Comment mon tarif est-il communiqué ?",
    a: "Après votre demande, KDRIVE étudie votre trajet et vous contacte par téléphone pour vous communiquer le tarif. Vous confirmez ensuite votre réservation en connaissance de cause.",
    link: { href: "/tarifs", label: "Voir les catégories et leurs tarifs indicatifs" },
  },
  {
    q: "Quelles catégories de véhicule puis-je choisir ?",
    a: "Essentiel, Premium ou Van, chacune avec un tarif de départ indicatif. Le véhicule précis dépend de la catégorie choisie, du trajet et des disponibilités.",
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

export function FaqPage({ framed = true, showTrustBadge = true }: { framed?: boolean; showTrustBadge?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero
        eyebrow="FAQ"
        title="Questions fréquentes"
        lead="Les réponses aux questions les plus courantes sur la réservation et le déroulement d’un trajet avec KDRIVE."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "FAQ" }]}
        showTrustBadge={showTrustBadge}
      />
      <section className="kd-section kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 720 }}>
          <KdAccordion items={faqItems} />
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

export function LegalNoticesPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero
        eyebrow="Informations légales"
        title="Mentions légales"
        lead="Dernière mise à jour : 14 octobre 2026"
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]}
        showTrustBadge={false}
      />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-legal" style={{ maxWidth: 720 }}>
          <p>Conformément aux dispositions applicables aux services de communication au public en ligne, les présentes mentions légales identifient l’éditeur du site Kdrive et ses prestataires techniques.</p>
          <h2>1. Éditeur du site</h2>
          <p>
            <strong>Kdrive — Chauffeur privé à Lyon</strong><br />
            Exploitant : Karamba Diaby — Entrepreneur individuel<br />
            SIREN : 852 641 000<br />
            Adresse professionnelle : 4 rue d’Aguesseau, 69007 Lyon, France<br />
            Activité : transport de personnes avec chauffeur (VTC)<br />
            Téléphone : <a href="tel:+33688863419">06 88 86 34 19</a><br />
            E-mail : <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a><br />
            Site : <a href="https://www.kdrive-vtc-lyon.fr/">www.kdrive-vtc-lyon.fr</a>
          </p>
          <p>Directeur de la publication : Karamba Diaby.</p>
          <p>Numéro d’inscription au registre des exploitants VTC : à compléter après vérification auprès de l’exploitant. SIRET et informations d’immatriculation détaillées : à confirmer.</p>
          <h2>2. Création et développement du site</h2>
          <p><strong>Aboubacar Diaby — Kayro Digital</strong><br />
            Conception du site, développement, expérience utilisateur, référencement naturel et intégration du système de réservation.<br />
            Site : kayrodigital.com
          </p>
          <p>L’exploitation commerciale des prestations de transport relève de Karamba Diaby, et non du concepteur du site.</p>
          <h2>3. Hébergement et infrastructure technique</h2>
          <h3>Vercel — Hébergement de l’application</h3>
          <p><strong>Vercel Inc.</strong><br />
            440 N Barranca Avenue #4133<br />
            Covina, CA 91723, États-Unis<br />
            Site : <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>
          <h3>Supabase — Infrastructure de base de données</h3>
          <p><strong>Supabase</strong><br />
            Service technique de base de données et de gestion des informations de réservation.<br />
            Site : <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer">supabase.com</a>
          </p>
          <p>La localisation effective des données dépend de la région de déploiement et des paramètres techniques du projet.</p>
          <h2>4. Propriété intellectuelle</h2>
          <p>Les textes, logos, photographies, éléments graphiques et autres contenus originaux du site sont protégés par le droit de la propriété intellectuelle. Ils appartiennent à leurs titulaires respectifs ou sont utilisés avec leur autorisation. Toute reproduction ou réutilisation non autorisée est interdite, sous réserve des exceptions légales. Les composants de tiers restent soumis à leurs licences.</p>
          <h2>5. Informations et responsabilité</h2>
          <p>Kdrive veille à la qualité des informations présentées sur ses prestations, véhicules, tarifs et zones desservies. Ces informations peuvent évoluer et ne remplacent pas la confirmation des conditions particulières de chaque réservation. La responsabilité de Kdrive reste régie par les dispositions légales et contractuelles applicables.</p>
          <h2>6. Réservations</h2>
          <p>Le site permet de demander une réservation VTC, notamment en renseignant départ, destination, date, horaire et coordonnées. Les modalités de confirmation, tarification, annulation et paiement doivent être consultées dans les conditions générales de vente lorsqu’elles sont mises à disposition.</p>
          <h2>7. Données personnelles</h2>
          <p>Les informations recueillies dans les formulaires et lors des réservations sont traitées pour répondre aux demandes et organiser les transports. Les finalités, bases légales, destinataires, droits et durées de conservation sont détaillés dans la <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.</p>
          <p>Pour exercer vos droits : <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a>.</p>
          <h2>8. Cookies et services tiers</h2>
          <p>Le site utilise un gestionnaire de consentement tarteaucitron.js pour les services non essentiels, notamment Google Analytics 4, Google Ads et Google Maps. Les préférences peuvent être modifiées depuis « Gestion des cookies » dans le pied de page. Les traitements strictement nécessaires à la réservation restent accessibles sans accord pour ces services.</p>
          <h2>9. Liens externes</h2>
          <p>Certains liens dirigent vers des sites de tiers dont Kdrive ne maîtrise pas les contenus et les pratiques de traitement des données.</p>
          <h2>10. Droit applicable et médiation</h2>
          <p>Le site est soumis au droit français. En cas de litige relatif à une prestation, le client peut contacter Kdrive afin de rechercher une solution amiable. Le consommateur peut, dans les conditions prévues par la loi, recourir gratuitement à un médiateur de la consommation. Les coordonnées du médiateur désigné par l’exploitant restent à compléter.</p>
          <h2>11. Contact</h2>
          <p><strong>Kdrive</strong><br />
            Karamba Diaby<br />
            4 rue d’Aguesseau, 69007 Lyon, France<br />
            <a href="tel:+33688863419">06 88 86 34 19</a><br />
            <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export function PrivacyPolicyPage({ framed = true }: { framed?: boolean } = {}) {
  return (
    <PageShell framed={framed}>
      <PageHero
        eyebrow="Confidentialité"
        title="Politique de confidentialité"
        lead="Dernière mise à jour : 14 octobre 2026"
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Politique de confidentialité" }]}
      />
      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-legal" style={{ maxWidth: 720 }}>
          <p>
            Kdrive accorde une importance particulière à la protection de la vie privée
            et des données personnelles de ses clients, prospects et visiteurs.
          </p>
          <p>
            La présente politique de confidentialité explique quelles informations peuvent être
            collectées lors de l’utilisation du site Kdrive, pourquoi elles sont collectées, comment
            elles sont utilisées, à qui elles peuvent être transmises et quels sont vos droits.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
          <p>
            <strong>Kdrive</strong><br />
            Exploitant : Karamba DIABY – Entrepreneur individuel<br />
            SIREN / RCS : 852 641 000 R.C.S. Lyon<br />
            Adresse : 4 rue d’Aguesseau, 69007 Lyon, France<br />
            Activité : Transport de personnes avec chauffeur – VTC<br />
            E-mail : <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a><br />
            Téléphone : <a href="tel:+33688863419">06 88 86 34 19</a>
          </p>

          <p>Site conçu et développé par <strong>Aboubacar Diaby — Kayro Digital</strong>, prestataire technique intervenant pour le compte de Kdrive.</p>

          <h2>2. Données personnelles susceptibles d’être collectées</h2>
          <p>
            Kdrive limite la collecte de données personnelles aux informations
            nécessaires à la gestion des demandes, des réservations et des prestations de transport.
          </p>
          <p>Selon votre utilisation du site et les services demandés, les données suivantes peuvent notamment être collectées :</p>
          <ul>
            <li>nom et prénom ;</li>
            <li>numéro de téléphone ;</li>
            <li>adresse e-mail ;</li>
            <li>adresse ou lieu de prise en charge ;</li>
            <li>adresse ou lieu de destination ;</li>
            <li>date et heure de prise en charge ;</li>
            <li>nombre de passagers ;</li>
            <li>nombre et type de bagages ;</li>
            <li>catégorie ou type de véhicule demandé ;</li>
            <li>options et besoins particuliers associés à la course ;</li>
            <li>informations relatives à une réservation pour un tiers ;</li>
            <li>numéro de vol lorsque la réservation concerne un aéroport ;</li>
            <li>numéro ou informations de train lorsque cela est pertinent ;</li>
            <li>informations nécessaires à la facturation ;</li>
            <li>contenu des messages adressés via les formulaires du site ;</li>
            <li>certaines données techniques relatives à l’utilisation du site, telles que le navigateur, le type d’appareil ou les pages consultées.</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Les données personnelles collectées peuvent être utilisées afin de :</p>
          <ul>
            <li>traiter une demande de renseignement ou de réservation ;</li>
            <li>calculer ou présenter une estimation de trajet ;</li>
            <li>organiser une prestation de transport VTC ;</li>
            <li>confirmer une réservation ;</li>
            <li>communiquer avec le passager avant, pendant ou après une course ;</li>
            <li>transmettre au chauffeur les informations nécessaires à la réalisation du trajet ;</li>
            <li>envoyer des informations ou notifications relatives à une réservation ;</li>
            <li>assurer le suivi administratif et commercial des prestations ;</li>
            <li>établir des factures et justificatifs ;</li>
            <li>répondre aux demandes adressées au service client ;</li>
            <li>assurer la sécurité et le bon fonctionnement du site ;</li>
            <li>prévenir les erreurs, abus ou utilisations frauduleuses ;</li>
            <li>mesurer la fréquentation et les performances du site ;</li>
            <li>améliorer l’expérience utilisateur et les services proposés.</li>
          </ul>

          <h2>4. Bases juridiques des traitements</h2>
          <p>Selon la nature du traitement, Kdrive peut traiter vos données personnelles sur les bases juridiques suivantes :</p>
          <ul>
            <li><strong>L’exécution de mesures précontractuelles :</strong> lorsque vous demandez un renseignement, un tarif, une estimation ou une réservation.</li>
            <li><strong>L’exécution d’un contrat :</strong> lorsque vous réservez une prestation de transport VTC.</li>
            <li><strong>Le respect d’obligations légales :</strong> notamment en matière comptable, fiscale ou réglementaire.</li>
            <li><strong>L’intérêt légitime de Kdrive :</strong> pour sécuriser son site, prévenir les abus, gérer son activité et améliorer ses services.</li>
            <li><strong>Votre consentement :</strong> lorsque celui-ci est requis pour l’utilisation de certains traceurs, outils ou traitements spécifiques.</li>
          </ul>

          <h2>5. Destinataires des données personnelles</h2>
          <p>
            Les données collectées sont accessibles uniquement aux personnes et prestataires qui ont
            besoin d’en prendre connaissance pour assurer le fonctionnement du service ou réaliser
            la prestation demandée.
          </p>
          <p>Elles peuvent notamment être communiquées :</p>
          <ul>
            <li>à Kdrive ;</li>
            <li>au chauffeur chargé de la course ;</li>
            <li>à un chauffeur partenaire lorsque son intervention est nécessaire à la réalisation de la prestation ;</li>
            <li>aux prestataires d’hébergement et d’infrastructure technique ;</li>
            <li>aux prestataires de base de données et services backend ;</li>
            <li>aux prestataires de messagerie et de notification ;</li>
            <li>aux prestataires de paiement lorsqu’un paiement en ligne est proposé ;</li>
            <li>aux prestataires de mesure d’audience ;</li>
            <li>aux autorités administratives, fiscales, judiciaires ou réglementaires lorsque la loi l’impose.</li>
          </ul>
          <p>
            <strong>
              Kdrive ne vend pas les données personnelles de ses clients ou prospects et
              ne commercialise pas les coordonnées collectées sur son site auprès de sociétés tierces.
            </strong>
          </p>

          <h2>6. Chauffeurs partenaires</h2>
          <p>
            Dans certaines situations, notamment pour assurer la disponibilité d’un véhicule ou la
            bonne exécution d’une réservation, une course peut être confiée à un chauffeur partenaire.
          </p>
          <p>
            Dans ce cas, seules les informations strictement nécessaires à l’organisation et à la
            réalisation du trajet peuvent être communiquées au chauffeur concerné.
          </p>
          <p>Ces informations peuvent notamment comprendre :</p>
          <ul>
            <li>le nom du passager ;</li>
            <li>un numéro de téléphone permettant de le joindre ;</li>
            <li>le lieu de prise en charge ;</li>
            <li>la destination ;</li>
            <li>la date et l’heure du trajet ;</li>
            <li>le nombre de passagers ;</li>
            <li>les éventuelles informations utiles à la prestation.</li>
          </ul>
          <p>
            Ces informations sont communiquées exclusivement dans le cadre de l’organisation et de
            l’exécution de la prestation de transport concernée.
          </p>

          <h2>7. Paiement en ligne</h2>
          <p>
            Lorsque le paiement en ligne est proposé sur le site, les transactions peuvent être
            traitées par un prestataire de paiement spécialisé.
          </p>
          <p>
            Kdrive n’a pas vocation à enregistrer directement les informations bancaires
            complètes du client telles que le numéro intégral de sa carte bancaire ou son cryptogramme.
          </p>
          <p>
            Les données nécessaires au paiement sont alors traitées conformément aux conditions et à
            la politique de confidentialité du prestataire de paiement concerné.
          </p>

          <h2>8. Durée de conservation des données</h2>
          <p>
            Kdrive conserve les données personnelles uniquement pendant la durée
            nécessaire aux finalités pour lesquelles elles ont été collectées et au respect de ses
            obligations légales.
          </p>
          <ul>
            <li>Les demandes de contact et de renseignements sont conservées pendant la durée nécessaire à leur traitement et à leur suivi.</li>
            <li>Les données relatives aux réservations sont conservées pendant la durée nécessaire à la réalisation, au suivi et à la gestion de la prestation.</li>
            <li>Les données utilisées dans le cadre de la relation commerciale peuvent être conservées pendant la durée nécessaire au suivi de cette relation.</li>
            <li>Les factures et documents comptables sont conservés pendant les durées prévues par la législation applicable.</li>
            <li>Certaines informations peuvent être conservées plus longtemps lorsqu’elles sont nécessaires à la constatation, à l’exercice ou à la défense de droits en justice.</li>
          </ul>
          <p>Lorsque leur conservation n’est plus nécessaire, les données sont supprimées ou anonymisées lorsque cela est possible.</p>

          <h2>9. Hébergement et prestataires techniques</h2>
          <p>
            Pour assurer le fonctionnement du site, la gestion des réservations, les communications
            et la mesure de son audience, Kdrive utilise différents prestataires techniques.
          </p>

          <h3>9.1 Vercel – Hébergement et déploiement du site</h3>
          <p>
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Avenue #4133<br />
            Covina, CA 91723<br />
            États-Unis<br />
            E-mail relatif à la confidentialité : <a href="mailto:privacy@vercel.com">privacy@vercel.com</a>
          </p>
          <p>
            Vercel fournit notamment l’infrastructure permettant l’hébergement, le déploiement et la
            mise à disposition de l’application web Kdrive.
          </p>

          <h3>9.2 Supabase – Base de données et services backend</h3>
          <p>
            <strong>Supabase, Inc.</strong><br />
            548 Market St, Suite 74567<br />
            San Francisco, CA 94104<br />
            États-Unis<br />
            E-mail relatif à la confidentialité : <a href="mailto:privacy@supabase.com">privacy@supabase.com</a>
          </p>
          <p>
            Supabase fournit des services techniques nécessaires au fonctionnement de Kdrive,
            notamment des services de base de données et de backend.
          </p>
          <p>
            Des informations relatives aux utilisateurs et aux réservations peuvent être enregistrées
            ou traitées via cette infrastructure lorsque cela est nécessaire au fonctionnement du service.
          </p>

          <h3>9.3 Twilio – SMS et notifications</h3>
          <p>
            <strong>Twilio Ireland Limited</strong><br />
            78 Sir John Rogerson’s Quay<br />
            Dublin 2, D02 R296<br />
            Irlande<br />
            E-mail relatif à la confidentialité : <a href="mailto:privacy@twilio.com">privacy@twilio.com</a>
          </p>
          <p>
            Twilio peut être utilisé par Kdrive pour transmettre des SMS et autres
            communications directement liés à la gestion d’une réservation.
          </p>
          <p>
            Lorsque ce service est utilisé, certaines informations nécessaires à l’envoi du message
            peuvent être traitées par Twilio, notamment le numéro de téléphone du destinataire, les
            informations techniques liées à l’envoi et le contenu de la notification.
          </p>

          <h3>9.4 Google Analytics – Mesure d’audience</h3>
          <p>
            <strong>Google Ireland Limited</strong><br />
            Gordon House, Barrow Street<br />
            Dublin 4<br />
            Irlande
          </p>
          <p>
            Kdrive peut utiliser Google Analytics afin de mesurer la fréquentation du
            site et de mieux comprendre la manière dont il est utilisé.
          </p>
          <p>
            Ces informations permettent notamment de mesurer les visites, les pages consultées, les
            parcours de navigation, les interactions avec le site et certaines conversions.
          </p>
          <p>
            Kdrive configure, lorsque cela est techniquement disponible et pertinent, les
            paramètres permettant de limiter les informations collectées et de réduire l’identification
            directe des visiteurs.
          </p>

          <h3>9.5 PlanetHoster – Nom de domaine et services associés</h3>
          <p>
            <strong>PlanetHoster Inc.</strong><br />
            4416, rue Louis-B.-Mayer<br />
            Laval, Québec H7P 0G1<br />
            Canada
          </p>
          <p>PlanetHoster peut intervenir dans la gestion technique du nom de domaine et de certains services associés à Kdrive.</p>

          <p>Les modalités d’accès aux données personnelles par les prestataires techniques sont limitées aux opérations nécessaires au service. La région d’hébergement Supabase et les transferts éventuels doivent être vérifiés dans la configuration réelle du projet.</p>

          <h2>10. Mesure d’audience</h2>
          <p>
            Kdrive utilise ou peut utiliser des outils de mesure d’audience afin de
            comprendre comment les visiteurs utilisent son site, mesurer ses performances et
            améliorer l’expérience proposée.
          </p>
          <p>Ces outils peuvent notamment traiter :</p>
          <ul>
            <li>les pages consultées ;</li>
            <li>la durée et le déroulement d’une visite ;</li>
            <li>la provenance générale de la visite ;</li>
            <li>le type d’appareil utilisé ;</li>
            <li>le type de navigateur ;</li>
            <li>certaines interactions avec les pages et formulaires ;</li>
            <li>certaines actions considérées comme des conversions.</li>
          </ul>
          <p>
            Ces informations permettent à Kdrive d’évaluer l’efficacité du site et de ses
            actions de communication et d’acquisition.
          </p>

          <h2>11. Cookies et autres traceurs</h2>
          <p>
            Le site Kdrive utilise tarteaucitron.js, dans sa version libre hébergée directement par
            Kdrive, afin de recueillir et mémoriser les choix relatifs aux services non essentiels.
          </p>
          <p>
            Google Analytics 4 est utilisé pour la mesure d’audience, Google Ads pour la mesure des
            campagnes publicitaires, et Google Maps pour les suggestions d’adresses et l’affichage
            d’itinéraires. Ces services et leurs scripts ne sont chargés qu’après l’accord de
            l’utilisateur pour la catégorie correspondante.
          </p>
          <p>
            Par défaut, les signaux <code>analytics_storage</code>, <code>ad_storage</code>,
            <code>ad_user_data</code> et <code>ad_personalization</code> sont refusés. Le refus de
            Google Maps n’empêche pas d’effectuer une réservation : l’adresse peut toujours être
            saisie manuellement.
          </p>
          <p>
            Le choix peut être modifié à tout moment depuis le lien « Gestion des cookies » présent
            dans le pied de page. La politique de consentement ne concerne pas les traitements
            techniques strictement nécessaires à la réception et à la gestion d’une réservation.
          </p>

          <p>Les visiteurs peuvent accepter, refuser ou personnaliser ces services. Les scripts Google Analytics 4 et Google Ads ne sont pas chargés avant le consentement correspondant (Consent Mode v2 en mode Basic). Les données strictement nécessaires à la gestion des réservations sont traitées indépendamment de ce choix.</p>

          <h2>12. Sécurité des données</h2>
          <p>Kdrive met en œuvre des mesures techniques et organisationnelles raisonnables destinées à protéger les informations personnelles contre notamment :</p>
          <ul>
            <li>l’accès non autorisé ;</li>
            <li>la divulgation non autorisée ;</li>
            <li>l’altération ;</li>
            <li>la perte ;</li>
            <li>la destruction ;</li>
            <li>l’utilisation abusive.</li>
          </ul>
          <p>
            L’accès aux informations personnelles est limité aux personnes et prestataires qui en ont
            besoin pour traiter les réservations, réaliser les prestations ou assurer le
            fonctionnement des services techniques de Kdrive.
          </p>
          <p>
            Kdrive applique également un principe de minimisation des données afin de
            limiter la collecte aux informations nécessaires à son activité.
          </p>
          <p>
            Aucun système informatique ne permettant de garantir une sécurité absolue, Kdrive /
            Kdrive veille à adapter ses mesures de protection aux risques identifiés et aux outils
            utilisés.
          </p>

          <h2>13. Transferts internationaux de données</h2>
          <p>
            Certains prestataires techniques utilisés par Kdrive sont établis ou
            disposent d’infrastructures situées en dehors de l’Espace économique européen.
          </p>
          <p>Cela peut notamment concerner des prestataires situés aux États-Unis ou au Canada.</p>
          <p>
            Lorsque des données personnelles font l’objet d’un transfert international, Kdrive /
            Kdrive s’appuie, lorsque cela est applicable, sur les mécanismes et garanties prévus par
            la réglementation européenne ainsi que sur les engagements contractuels et mécanismes mis
            en place par ses prestataires.
          </p>

          <h2>14. Vos droits sur vos données personnelles</h2>
          <p>Conformément à la réglementation applicable relative à la protection des données personnelles, vous pouvez notamment disposer des droits suivants :</p>
          <ul>
            <li><strong>Droit d’accès :</strong> obtenir des informations sur les données personnelles que Kdrive détient à votre sujet.</li>
            <li><strong>Droit de rectification :</strong> demander la correction de données inexactes ou incomplètes.</li>
            <li><strong>Droit à l’effacement :</strong> demander la suppression de certaines données lorsque les conditions légales sont remplies.</li>
            <li><strong>Droit à la limitation :</strong> demander la limitation de certains traitements.</li>
            <li><strong>Droit d’opposition :</strong> vous opposer à certains traitements dans les conditions prévues par la réglementation.</li>
            <li><strong>Droit à la portabilité :</strong> recevoir certaines données dans un format structuré lorsque ce droit est applicable.</li>
            <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement lorsqu’un traitement repose sur celui-ci.</li>
          </ul>
          <p>Pour exercer vos droits, vous pouvez contacter Kdrive :</p>
          <p>E-mail : <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a></p>
          <p>
            Courrier :<br />
            Kdrive<br />
            Karamba DIABY<br />
            4 rue d’Aguesseau<br />
            69007 Lyon, France
          </p>
          <p>
            Afin d’éviter qu’une personne non autorisée accède aux données personnelles d’un tiers,
            Kdrive peut demander des informations permettant de vérifier l’identité du
            demandeur lorsque cela est nécessaire.
          </p>

          <h2>15. Réclamation auprès de la CNIL</h2>
          <p>
            Si vous estimez, après avoir contacté Kdrive, que vos droits relatifs à la
            protection de vos données ne sont pas respectés, vous pouvez adresser une réclamation à
            la Commission Nationale de l’Informatique et des Libertés (CNIL).
          </p>
          <p>
            <strong>Commission Nationale de l’Informatique et des Libertés – CNIL</strong><br />
            3 Place de Fontenoy<br />
            TSA 80715<br />
            75334 Paris Cedex 07<br />
            France
          </p>
          <p>Site internet : <a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>

          <h2>16. Liens et services tiers</h2>
          <p>
            Le site Kdrive peut contenir des liens ou fonctionnalités permettant d’accéder à des
            services tiers, notamment des services de messagerie, de cartographie, de paiement ou de
            communication.
          </p>
          <p>
            Lorsque vous utilisez un service tiers ou quittez le site Kdrive, le traitement de vos
            données peut également être soumis à la politique de confidentialité et aux conditions du
            prestataire concerné.
          </p>

          <h2>17. Données relatives à une autre personne</h2>
          <p>Le service Kdrive permet, dans certaines situations, d’effectuer une réservation pour un tiers.</p>
          <p>
            Lorsque vous fournissez les coordonnées ou informations d’une autre personne pour
            organiser son transport, vous devez vous assurer que vous êtes autorisé à communiquer ces
            informations et que la personne concernée est informée de leur utilisation pour la
            réalisation de la prestation.
          </p>
          <p>Ces informations seront utilisées uniquement dans la mesure nécessaire à l’organisation et à la réalisation du trajet.</p>

          <h2>18. Modification de la politique de confidentialité</h2>
          <p>Kdrive peut modifier la présente politique de confidentialité afin de tenir compte notamment :</p>
          <ul>
            <li>de l’évolution de ses services ;</li>
            <li>de l’évolution de son site internet ;</li>
            <li>de l’ajout ou du remplacement de prestataires techniques ;</li>
            <li>de l’évolution de ses pratiques internes ;</li>
            <li>de modifications législatives ou réglementaires.</li>
          </ul>
          <p>La version applicable est celle publiée sur le site. La date de dernière mise à jour est indiquée en haut de la présente page.</p>

          <h2>19. Nous contacter</h2>
          <p>Pour toute question concernant la présente politique de confidentialité, le traitement de vos données personnelles ou l’exercice de vos droits, vous pouvez contacter :</p>
          <p>
            <strong>Kdrive</strong><br />
            Karamba DIABY – Entrepreneur individuel<br />
            4 rue d’Aguesseau<br />
            69007 Lyon, France<br />
            E-mail : <a href="mailto:contact@kdrive-vtc-lyon.fr">contact@kdrive-vtc-lyon.fr</a><br />
            Téléphone : <a href="tel:+33688863419">06 88 86 34 19</a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
