import { ScreenShell, StateCard } from "../booking-ux-preview/screen-shell";
import { VoucherPreview } from "./voucher";

/* ---------- Écran client 1 — Trajet ---------- */
function TrajetMobile() {
  return (
    <>
      <div className="wf-field"><span className="wf-field-label">Départ</span><div className="wf-input">Secteur Lyon Perrache · 📍</div></div>
      <div className="wf-field"><span className="wf-field-label">Destination</span><div className="wf-input">Aéroport Lyon-Saint-Exupéry</div></div>
      <div className="wf-row">
        <div className="wf-field"><span className="wf-field-label">Date</span><div className="wf-input">08/02/2026</div></div>
        <div className="wf-field"><span className="wf-field-label">Heure</span><div className="wf-input">13:45</div></div>
      </div>
      <p className="wf-note">Réservation possible à partir de 15 minutes suivant l’heure actuelle.</p>
      <div className="wf-card"><p style={{ margin: 0, fontSize: "0.82rem" }}>Distance estimée : 28 km · Durée estimée : ≈ 32 min</p></div>
      <button className="wf-btn wf-btn--primary wf-btn--block">Voir les véhicules et les tarifs</button>
    </>
  );
}
function TrajetDesktop() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div className="wf-row" style={{ flexWrap: "wrap", gap: 14, alignItems: "flex-end" }}>
        <div className="wf-field" style={{ flex: 2, minWidth: 220 }}><span className="wf-field-label">Départ</span><div className="wf-input">Secteur Lyon Perrache · 📍</div></div>
        <div className="wf-field" style={{ flex: 2, minWidth: 220 }}><span className="wf-field-label">Destination</span><div className="wf-input">Aéroport Lyon-Saint-Exupéry</div></div>
        <div className="wf-field" style={{ flex: 1, minWidth: 130 }}><span className="wf-field-label">Date</span><div className="wf-input">08/02/2026</div></div>
        <div className="wf-field" style={{ flex: 1, minWidth: 110 }}><span className="wf-field-label">Heure</span><div className="wf-input">13:45</div></div>
        <button className="wf-btn wf-btn--primary" style={{ flex: "none" }}>Voir les véhicules et les tarifs</button>
      </div>
      <div className="wf-media-block" style={{ marginTop: 16 }}>Carte — aperçu de l’itinéraire (28 km · ≈ 32 min)</div>
    </div>
  );
}
export function ScreenTrajet() {
  return (
    <ScreenShell
      id="screen-c1" kicker="Écran client 1" title="Recherche du trajet"
      lead="Délai minimum de réservation validé : 15 minutes (et non 30). Suggestions de lieux, carte, distance et durée affichées dès que possible."
      mobile={<TrajetMobile />} desktop={<TrajetDesktop />}
      states={
        <>
          <StateCard type="empty" label="Itinéraire incomplet">CTA désactivé tant que départ, destination, date et heure ne sont pas renseignés.</StateCard>
          <StateCard type="loading" label="Itinéraire en calcul">Distance/durée en cours de calcul via Google Routes.</StateCard>
          <StateCard type="success" label="Itinéraire calculé">Distance, durée et tarif estimé affichés.</StateCard>
          <StateCard type="error" label="Erreur Google Maps">Message générique, CTA reste actif pour réessayer.</StateCard>
          <StateCard type="warning" label="Trajet sur devis">Distance hors zone calculée automatiquement — mention « devis personnalisé » plutôt qu’un tarif chiffré.</StateCard>
          <StateCard type="warning" label="Heure trop proche">Message si l’heure demandée est à moins de 15 minutes de l’heure actuelle.</StateCard>
        </>
      }
    />
  );
}

/* ---------- Écran client 2 — Catégorie ---------- */
const categories = [
  { name: "Confort", mode: "Prix calculé", passengers: "4 passagers", luggage: "2 bagages", usage: "Trajets du quotidien" },
  { name: "Berline", mode: "Prix calculé", passengers: "4 passagers", luggage: "2 bagages", usage: "Trajets individuels ou en petit groupe" },
  { name: "Luxe", mode: "Sur devis", passengers: "4 passagers", luggage: "2 bagages", usage: "Prestation haut de gamme" },
  { name: "Van", mode: "Sur devis", passengers: "7 passagers", luggage: "Bagages nombreux", usage: "Groupes et transferts aéroport" },
  { name: "Monospace", mode: "Sur devis", passengers: "6 passagers", luggage: "Bagages limités", usage: "Familles, petits groupes" },
];
function CategorieMobile() {
  return (
    <>
      {categories.map((c) => (
        <div className="wf-card" key={c.name}>
          <div className="wf-row" style={{ justifyContent: "space-between" }}><b>{c.name}</b><span className="wf-pill">{c.mode}</span></div>
          <p style={{ margin: "6px 0 0", fontSize: "0.82rem", color: "var(--wf-muted)" }}>{c.passengers} · {c.luggage}</p>
          <p style={{ margin: "2px 0 0", fontSize: "0.8rem" }}>{c.usage}</p>
        </div>
      ))}
      <p className="wf-note">Aucune marque n’est présentée comme systématiquement garantie tant qu’elle n’est pas contractuellement confirmée (ex. Berline associée à une Tesla, Luxe à une Mercedes premium dans la flotte actuellement présentée).</p>
    </>
  );
}
function CategorieDesktop() {
  return (
    <div className="wf-row" style={{ flexWrap: "wrap", gap: 14 }}>
      {categories.map((c) => (
        <div className="wf-card" key={c.name} style={{ flex: "1 1 220px" }}>
          <div className="wf-row" style={{ justifyContent: "space-between" }}><b>{c.name}</b><span className="wf-pill">{c.mode}</span></div>
          <p style={{ margin: "6px 0 0", fontSize: "0.82rem", color: "var(--wf-muted)" }}>{c.passengers} · {c.luggage}</p>
          <p style={{ margin: "2px 0 0", fontSize: "0.8rem" }}>{c.usage}</p>
        </div>
      ))}
    </div>
  );
}
export function ScreenCategorie() {
  return (
    <ScreenShell
      id="screen-c2" kicker="Écran client 2" title="Choix de la catégorie"
      lead="Estimation ou mention « sur devis », nombre de passagers, capacité bagages indicative et usage recommandé pour chaque catégorie."
      mobile={<CategorieMobile />} desktop={<CategorieDesktop />}
      states={
        <>
          <StateCard type="normal" label="Catégories disponibles">Berline et Confort affichent un prix calculé ; Luxe, Van, Monospace affichent « Sur devis ».</StateCard>
          <StateCard type="warning" label="Capacité dépassée">Message si le nombre de passagers dépasse la capacité de la catégorie choisie.</StateCard>
        </>
      }
    />
  );
}

/* ---------- Écran client 3 — Options ---------- */
function OptionsMobile() {
  return (
    <>
      <div className="wf-row"><div className="wf-field"><span className="wf-field-label">Passagers</span><div className="wf-input">2</div></div><div className="wf-field"><span className="wf-field-label">Bagages</span><div className="wf-input">2 grandes valises</div></div></div>
      <div className="wf-chip-row">
        <span className="wf-chip">Siège enfant</span>
        <span className="wf-chip">Animal</span>
        <span className="wf-chip is-active">Fauteuil roulant pliable</span>
        <span className="wf-chip">Arrêt supplémentaire</span>
      </div>
      <div className="wf-field"><span className="wf-field-label">Numéro de vol (facultatif)</span><div className="wf-input">AF1234</div></div>
      <div className="wf-field"><span className="wf-field-label">Réservation pour une autre personne (facultatif)</span><div className="wf-input">Non</div></div>
      <div className="wf-field"><span className="wf-field-label">Commentaire pour le chauffeur (facultatif)</span><div className="wf-input">—</div></div>
      <p className="wf-note">Bagages en première version : niveau de détail volontairement simple (grande valise / bagage cabine / équipement volumineux facultatifs). Le propriétaire peut rappeler en cas de doute.</p>
    </>
  );
}
export function ScreenOptions() {
  return (
    <ScreenShell
      id="screen-c3" kicker="Écran client 3" title="Options"
      lead="Passagers, bagages, siège enfant, animal, fauteuil roulant, arrêt supplémentaire, vol/train, réservation pour un tiers, commentaire — tout facultatif, jamais bloquant."
      mobile={<OptionsMobile />} desktop={<div style={{ maxWidth: 700, margin: "0 auto" }}><OptionsMobile /></div>}
      states={
        <>
          <StateCard type="normal" label="Toutes options facultatives">Aucun champ de cette étape ne bloque la progression.</StateCard>
          <StateCard type="normal" label="Réservation pour un tiers activée">Fait apparaître un champ « informations utiles sur la personne concernée », sans créer de compte dédié.</StateCard>
        </>
      }
    />
  );
}

/* ---------- Écran client 4 — Identification ---------- */
function IdentificationMobile() {
  return (
    <>
      <button className="wf-btn wf-btn--secondary wf-btn--block">Continuer avec Google</button>
      <p className="wf-note" style={{ textAlign: "center" }}>ou</p>
      <button className="wf-btn wf-btn--ghost wf-btn--block">Continuer sans compte</button>
      <div className="wf-field"><span className="wf-field-label">Prénom</span><div className="wf-input">Mamadou</div></div>
      <div className="wf-field"><span className="wf-field-label">Nom</span><div className="wf-input">Diallo</div></div>
      <div className="wf-field"><span className="wf-field-label">Téléphone</span><div className="wf-input">06 00 00 00 00</div></div>
      <div className="wf-field"><span className="wf-field-label">E-mail (recommandé)</span><div className="wf-input">mamadou.diallo@exemple.fr</div></div>
    </>
  );
}
export function ScreenIdentification() {
  return (
    <ScreenShell
      id="screen-c4" kicker="Écran client 4" title="Identification minimale"
      lead="Obligatoire : prénom, nom, téléphone. E-mail recommandé (facultatif selon décision finale). Continuer avec Google préremplit prénom/nom/e-mail ; le téléphone reste toujours demandé."
      mobile={<IdentificationMobile />} desktop={<div style={{ maxWidth: 480, margin: "0 auto" }}><IdentificationMobile /></div>}
      states={
        <>
          <StateCard type="normal" label="Sans compte">Trois champs obligatoires, aucune création de compte complexe.</StateCard>
          <StateCard type="success" label="Avec Google">Prénom, nom, e-mail préremplis ; téléphone toujours demandé.</StateCard>
          <StateCard type="error" label="Téléphone invalide">Message sous le champ, sans bloquer les autres champs déjà valides.</StateCard>
        </>
      }
    />
  );
}

/* ---------- Écran client 5 — Récapitulatif ---------- */
function RecapMobile() {
  return (
    <>
      <div className="wf-media-block">Carte — trajet Lyon Perrache → Aéroport Lyon-Saint-Exupéry</div>
      <div className="wf-card">
        <p style={{ margin: 0, fontSize: "0.82rem" }}>08/02/2026 · 13:45 · Berline · 2 passagers · 2 bagages · Fauteuil roulant pliable</p>
      </div>
      <div className="wf-card">
        <b>Tarif estimé : 45 €</b>
        <p style={{ margin: "6px 0 0", fontSize: "0.8rem", color: "var(--wf-muted)" }}>Prise en charge + distance parcourue, détail disponible avant envoi.</p>
      </div>
      <div className="wf-card" style={{ background: "var(--wf-accent-soft)" }}>
        <p style={{ margin: 0, fontSize: "0.82rem" }}>Votre demande sera vérifiée par KDRIVE. Le tarif et la disponibilité doivent être confirmés avant que la course soit définitivement réservée.</p>
      </div>
      <p className="wf-note">Paiement au chauffeur à la fin de la course. Aucun paiement en ligne, aucun lien de paiement, aucun QR code à cette étape.</p>
      <button className="wf-btn wf-btn--primary wf-btn--block">Envoyer ma demande</button>
    </>
  );
}
export function ScreenRecap() {
  return (
    <ScreenShell
      id="screen-c5" kicker="Écran client 5" title="Récapitulatif"
      lead="Dernière vérification avant envoi. La mention de confirmation humaine et l’absence de paiement en ligne doivent être visibles sans avoir à faire défiler."
      mobile={<RecapMobile />} desktop={<div style={{ maxWidth: 600, margin: "0 auto" }}><RecapMobile /></div>}
      states={<StateCard type="normal" label="Avant envoi">Toutes les informations sont modifiables en revenant aux écrans précédents.</StateCard>}
    />
  );
}

/* ---------- Écran client 6 — Demande reçue ---------- */
function DemandeRecueMobile() {
  return (
    <>
      <div className="wf-card" style={{ textAlign: "center" }}>
        <span className="wf-pill wf-pill--accent">Demande reçue</span>
        <p style={{ margin: "10px 0 0", fontWeight: 700 }}>Référence KD-2026-00842</p>
      </div>
      <div className="wf-card">
        <p style={{ margin: 0, fontSize: "0.82rem" }}>Votre demande a bien été enregistrée. KDRIVE vérifie actuellement la disponibilité et le tarif. Vous recevrez une confirmation dès qu’un chauffeur aura été attribué.</p>
      </div>
      <button className="wf-btn wf-btn--secondary wf-btn--block">Appeler KDRIVE</button>
      <button className="wf-btn wf-btn--ghost wf-btn--block">WhatsApp (manuel)</button>
    </>
  );
}
export function ScreenDemandeRecue() {
  return (
    <ScreenShell
      id="screen-c6" kicker="Écran client 6" title="Demande enregistrée"
      lead="Ne jamais écrire « Votre course est confirmée » à cette étape — seulement que la demande a été reçue et est en cours de traitement."
      mobile={<DemandeRecueMobile />} desktop={<div style={{ maxWidth: 480, margin: "0 auto" }}><DemandeRecueMobile /></div>}
      states={
        <>
          <StateCard type="normal" label="Demande reçue">Référence, résumé, téléphone KDRIVE, bouton Appeler, bouton WhatsApp manuel.</StateCard>
          <StateCard type="warning" label="Recherche prolongée">Message adapté si le traitement prend plus de temps que d’habitude, sans jamais annoncer un échec.</StateCard>
        </>
      }
    />
  );
}

/* ---------- Écran client 7 — Course confirmée ---------- */
function CourseConfirmeeMobile() {
  return (
    <>
      <div className="wf-card" style={{ textAlign: "center" }}>
        <span className="wf-pill" style={{ background: "var(--wf-success-bg)", color: "var(--wf-success)" }}>Course confirmée</span>
        <p style={{ margin: "10px 0 0", fontWeight: 700 }}>Référence KD-2026-00842</p>
      </div>
      <div className="wf-card">
        <p style={{ margin: 0, fontSize: "0.82rem" }}>08/02/2026 · 13:45 · Lyon Perrache → Aéroport Lyon-Saint-Exupéry · Berline</p>
        <p style={{ margin: "6px 0 0", fontSize: "0.82rem" }}>Chauffeur : Karim B. · 06 11 22 33 44</p>
        <p style={{ margin: "2px 0 0", fontSize: "0.82rem" }}>Véhicule : Berline noire · Plaque AA-123-BB</p>
        <p style={{ margin: "6px 0 0", fontWeight: 700 }}>Tarif : 45 € — à régler directement au chauffeur</p>
      </div>
      <button className="wf-btn wf-btn--secondary wf-btn--block">Télécharger le bon (PDF)</button>
      <p className="wf-note">Envoyé également par e-mail. Notification WhatsApp et ajout au calendrier prévus dans une version future.</p>
    </>
  );
}
export function ScreenCourseConfirmee() {
  return (
    <ScreenShell
      id="screen-c7" kicker="Écran client 7" title="Course confirmée"
      lead="Après affectation du chauffeur : coordonnées complètes du chauffeur, véhicule, plaque, tarif confirmé, rappel du paiement au chauffeur."
      mobile={<CourseConfirmeeMobile />} desktop={<div style={{ maxWidth: 480, margin: "0 auto" }}><CourseConfirmeeMobile /></div>}
      states={<StateCard type="success" label="Chauffeur attribué">Toutes les informations nécessaires à la prise en charge sont réunies sur un seul écran.</StateCard>}
    />
  );
}

/* ---------- Écran client 8 — Bon de réservation ---------- */
export function ScreenBonClient() {
  return (
    <ScreenShell
      id="screen-c8" kicker="Écran client 8" title="Bon de réservation (aperçu PDF)"
      lead="Version client du bon : jamais de commission ni de net chauffeur."
      mobile={<VoucherPreview variant="client" compact />} desktop={<VoucherPreview variant="client" />}
      states={<StateCard type="normal" label="Version client">Téléchargeable en PDF, envoyée par e-mail, consultable depuis l’écran « Course confirmée ».</StateCard>}
    />
  );
}
