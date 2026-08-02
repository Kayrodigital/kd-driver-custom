import { ScreenShell, StateCard } from "../booking-ux-preview/screen-shell";
import { VoucherPreview } from "./voucher";

/* ---------- Écran propriétaire 1 — Liste des demandes ---------- */
const requests = [
  { ref: "KD-2026-00842", status: "Nouvelle demande", pill: "wf-pill--accent", route: "Lyon Perrache → Aéroport" },
  { ref: "KD-2026-00841", status: "Recherche de chauffeur", pill: "wf-pill--semi", route: "Villeurbanne → Part-Dieu" },
  { ref: "KD-2026-00840", status: "Course confirmée", pill: "wf-pill--auto", route: "Gare Part-Dieu → Écully" },
];
function ListeMobile() {
  return (
    <>
      {requests.map((r) => (
        <div className="wf-card" key={r.ref}>
          <div className="wf-row" style={{ justifyContent: "space-between" }}><b>{r.ref}</b><span className={`wf-pill ${r.pill}`}>{r.status}</span></div>
          <p style={{ margin: "6px 0 0", fontSize: "0.82rem" }}>{r.route}</p>
        </div>
      ))}
    </>
  );
}
export function ScreenListeDemandes() {
  return (
    <ScreenShell
      id="screen-o1" kicker="Écran propriétaire 1" title="Liste des demandes"
      lead="Vue d’ensemble triée par statut, pensée pour un traitement rapide sur mobile."
      mobile={<ListeMobile />} desktop={<div className="wf-row" style={{ flexWrap: "wrap", gap: 14 }}>{requests.map((r) => (
        <div className="wf-card" key={r.ref} style={{ flex: "1 1 260px" }}>
          <div className="wf-row" style={{ justifyContent: "space-between" }}><b>{r.ref}</b><span className={`wf-pill ${r.pill}`}>{r.status}</span></div>
          <p style={{ margin: "6px 0 0", fontSize: "0.82rem" }}>{r.route}</p>
        </div>
      ))}</div>}
      states={<StateCard type="empty" label="Aucune demande">Message discret invitant à consulter l’historique.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 2 — Nouvelle demande ---------- */
function NouvelleDemandeMobile() {
  return (
    <>
      <div className="wf-card">
        <p style={{ margin: 0, fontWeight: 700 }}>KD-2026-00842</p>
        <p style={{ margin: "4px 0 0", fontSize: "0.82rem" }}>08/02/2026 · 13:45</p>
        <p style={{ margin: "4px 0 0", fontSize: "0.82rem" }}>Lyon Perrache → Aéroport Lyon-Saint-Exupéry</p>
        <p style={{ margin: "4px 0 0", fontSize: "0.82rem" }}>06 00 00 00 00</p>
        <p style={{ margin: "4px 0 0", fontSize: "0.82rem" }}>Berline · 2 passagers · Fauteuil roulant pliable</p>
        <span className="wf-pill wf-pill--accent" style={{ marginTop: 6 }}>Transfert aéroport / longue distance</span>
        <p style={{ margin: "6px 0 0", fontWeight: 700 }}>Tarif estimé : 45 €</p>
      </div>
      <div className="wf-row" style={{ flexWrap: "wrap", gap: 8 }}>
        <button className="wf-btn wf-btn--secondary">Appeler</button>
        <button className="wf-btn wf-btn--secondary">WhatsApp</button>
      </div>
      <button className="wf-btn wf-btn--primary wf-btn--block">Confirmer le tarif</button>
      <button className="wf-btn wf-btn--ghost wf-btn--block">Ajuster le tarif</button>
      <button className="wf-btn wf-btn--ghost wf-btn--block">Refuser</button>
    </>
  );
}
export function ScreenNouvelleDemande() {
  return (
    <ScreenShell
      id="screen-o2" kicker="Écran propriétaire 2" title="Fiche nouvelle demande"
      lead="Référence, trajet, téléphone client, tarif estimé et statut visibles sans défilement. Hiérarchie mobile claire : Appeler / WhatsApp en haut, décision tarifaire juste en dessous."
      mobile={<NouvelleDemandeMobile />} desktop={<div style={{ maxWidth: 480 }}><NouvelleDemandeMobile /></div>}
      states={<StateCard type="normal" label="En attente de décision">Aucune action de statut n’est prise tant que le propriétaire n’a pas choisi une des quatre actions.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 3 — Tarif et commission ---------- */
function TarifCommissionMobile() {
  return (
    <>
      <div className="wf-card">
        <span className="wf-pill wf-pill--accent">Course standard de moins de 10 km</span>
        <table className="wf-table" style={{ marginTop: 10, fontSize: "0.78rem" }}>
          <tbody>
            <tr><td>Distance</td><td>8 km</td></tr>
            <tr><td>Durée</td><td>23 min</td></tr>
            <tr><td>Catégorie</td><td>Confort</td></tr>
            <tr><td>Tarif kilométrique</td><td>2 €/km</td></tr>
            <tr><td>Prise en charge</td><td>10 €</td></tr>
            <tr><td>Minutes incluses</td><td>15 min</td></tr>
            <tr><td>Minutes facturées</td><td>8 min × 1 € = 8 €</td></tr>
            <tr><td>Minimum de catégorie</td><td>Non applicable (Confort)</td></tr>
            <tr><td>Prix estimé</td><td><b>34 €</b></td></tr>
          </tbody>
        </table>
      </div>
      <div className="wf-field"><span className="wf-field-label">Prix confirmé</span><div className="wf-input">34 €</div></div>
      <div className="wf-field"><span className="wf-field-label">Commission KDRIVE (configurable)</span><div className="wf-input">5 €</div></div>
      <div className="wf-card" style={{ background: "var(--wf-success-bg)" }}>
        <p style={{ margin: 0, fontWeight: 700, color: "var(--wf-success)" }}>Net chauffeur : 29 €</p>
      </div>
      <div className="wf-field"><span className="wf-field-label">Motif de l’ajustement (si modifié)</span><div className="wf-input">—</div></div>
      <button className="wf-btn wf-btn--primary wf-btn--block">Valider et préparer l’annonce</button>
    </>
  );
}
export function ScreenTarifCommission() {
  return (
    <ScreenShell
      id="screen-o3" kicker="Écran propriétaire 3" title="Tarif et commission"
      lead="Prix client, commission KDRIVE et net chauffeur toujours distingués. La règle de commission reste configurable — 5 € n’est qu’un exemple, pas une valeur figée."
      mobile={<TarifCommissionMobile />} desktop={<div style={{ maxWidth: 420 }}><TarifCommissionMobile /></div>}
      states={<StateCard type="normal" label="Aperçu avant diffusion">Le net chauffeur affiché ici est celui qui apparaîtra dans l’annonce groupe.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 4 — Annonce groupe ---------- */
function AnnonceGroupeMobile() {
  return (
    <>
      <div className="wf-card" style={{ background: "#eef2ff" }}>
        <p style={{ margin: 0, fontSize: "0.8rem", whiteSpace: "pre-line" }}>
          {"COURSE DISPONIBLE — 13 h 45\n\nDépart : secteur Lyon Perrache\nDestination : Aéroport Lyon-Saint-Exupéry\n1 passager\n2 grandes valises\nFauteuil roulant pliable\nCatégorie : Berline\nNet chauffeur : 40 €\n\nRépondre en privé si disponible."}
        </p>
      </div>
      <p className="wf-note" style={{ color: "var(--wf-warning)" }}>⚠ Vérifiez qu’aucune donnée personnelle du client n’apparaît avant le partage.</p>
      <div className="wf-row" style={{ flexWrap: "wrap", gap: 8 }}>
        <button className="wf-btn wf-btn--secondary">Copier</button>
        <button className="wf-btn wf-btn--secondary">Partager sur WhatsApp</button>
      </div>
      <button className="wf-btn wf-btn--ghost wf-btn--block">Modifier avant partage</button>
      <button className="wf-btn wf-btn--primary wf-btn--block">Marquer comme partagé</button>
    </>
  );
}
export function ScreenAnnonceGroupe() {
  return (
    <ScreenShell
      id="screen-o4" kicker="Écran propriétaire 4" title="Aperçu annonce groupe"
      lead="Aperçu identique à un message WhatsApp. Seule tâche manuelle : choisir le groupe et envoyer. Jamais de nom, téléphone, adresse exacte, référence complète, e-mail, commentaire privé ou numéro de vol/train."
      mobile={<AnnonceGroupeMobile />} desktop={<div style={{ maxWidth: 480 }}><AnnonceGroupeMobile /></div>}
      states={<StateCard type="warning" label="Rappel de vigilance">Avertissement affiché avant chaque partage, pas seulement à la première utilisation.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 5 — Recherche de chauffeur ---------- */
function RechercheChauffeurMobile({ empty = false }: { empty?: boolean }) {
  return (
    <>
      <div className="wf-card">
        <span className={`wf-pill ${empty ? "wf-pill--manual" : "wf-pill--semi"}`}>{empty ? "Aucun chauffeur disponible pour le moment" : "En recherche de chauffeur"}</span>
        <p style={{ margin: "8px 0 0", fontSize: "0.8rem" }}>Partagé à 13:47 · {empty ? "18 min écoulées" : "3 min écoulées"}</p>
      </div>
      {empty ? (
        <>
          <p className="wf-note">KDRIVE recherche actuellement un chauffeur disponible. La course n’est pas encore confirmée. Nous revenons vers vous dès que possible. (message envoyé au client)</p>
          <button className="wf-btn wf-btn--secondary wf-btn--block">Relancer le groupe</button>
          <button className="wf-btn wf-btn--ghost wf-btn--block">Modifier le net chauffeur</button>
          <button className="wf-btn wf-btn--ghost wf-btn--block">Modifier la catégorie</button>
          <button className="wf-btn wf-btn--ghost wf-btn--block">Contacter le client</button>
          <button className="wf-btn wf-btn--ghost wf-btn--block">Proposer un autre horaire</button>
          <button className="wf-btn wf-btn--ghost wf-btn--block">Refuser la demande</button>
        </>
      ) : (
        <>
          <button className="wf-btn wf-btn--secondary wf-btn--block">Relancer</button>
          <button className="wf-btn wf-btn--ghost wf-btn--block">Modifier l’annonce</button>
          <button className="wf-btn wf-btn--ghost wf-btn--block">Annuler la recherche</button>
          <button className="wf-btn wf-btn--primary wf-btn--block">Affecter un chauffeur</button>
        </>
      )}
    </>
  );
}
export function ScreenRechercheChauffeur() {
  return (
    <ScreenShell
      id="screen-o5" kicker="Écran propriétaire 5" title="Recherche de chauffeur"
      lead="Rappel visuel si aucune affectation après quelques minutes. Pas de relance WhatsApp automatisée dans cette première version."
      mobile={<RechercheChauffeurMobile />} desktop={<div style={{ maxWidth: 420 }}><RechercheChauffeurMobile /></div>}
      states={<StateCard type="warning" label="En recherche">Délai écoulé affiché, actions de relance disponibles.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 6 — Aucun chauffeur trouvé ---------- */
export function ScreenAucunChauffeur() {
  return (
    <ScreenShell
      id="screen-o6" kicker="Écran propriétaire 6" title="Aucun chauffeur trouvé"
      lead="État explicite après un délai sans réponse dans le groupe : la réservation ne reste jamais dans un état indéfini. Le client reçoit un message adapté, jamais une fausse confirmation."
      mobile={<RechercheChauffeurMobile empty />} desktop={<div style={{ maxWidth: 420 }}><RechercheChauffeurMobile empty /></div>}
      states={
        <StateCard type="error" label="Message client correspondant">
          « KDRIVE recherche actuellement un chauffeur disponible. La course n’est pas encore confirmée. Nous
          revenons vers vous dès que possible. »
        </StateCard>
      }
    />
  );
}

/* ---------- Écran propriétaire 6 — Affectation chauffeur ---------- */
function AffectationMobile() {
  return (
    <>
      <div className="wf-field"><span className="wf-field-label">Nom</span><div className="wf-input">Karim B.</div></div>
      <div className="wf-field"><span className="wf-field-label">Téléphone</span><div className="wf-input">06 11 22 33 44</div></div>
      <div className="wf-field"><span className="wf-field-label">Véhicule</span><div className="wf-input">Berline noire</div></div>
      <div className="wf-field"><span className="wf-field-label">Plaque</span><div className="wf-input">AA-123-BB</div></div>
      <div className="wf-field"><span className="wf-field-label">Net chauffeur</span><div className="wf-input">40 €</div></div>
      <div className="wf-field"><span className="wf-field-label">Commentaire interne (facultatif)</span><div className="wf-input">—</div></div>
      <button className="wf-btn wf-btn--primary wf-btn--block">Affecter</button>
      <button className="wf-btn wf-btn--ghost wf-btn--block">Enregistrer ce chauffeur</button>
    </>
  );
}
export function ScreenAffectation() {
  return (
    <ScreenShell
      id="screen-o7" kicker="Écran propriétaire 7" title="Affectation chauffeur"
      lead="Version V1 : saisie manuelle. Version future (non développée dans cette phase) : sélection dans une base de chauffeurs avec favoris, disponibilité, historique et notation interne."
      mobile={<AffectationMobile />} desktop={<div style={{ maxWidth: 420 }}><AffectationMobile /></div>}
      states={
        <>
          <StateCard type="normal" label="V1 — saisie manuelle">Formulaire simple, aucune base de données chauffeurs.</StateCard>
          <StateCard type="normal" label="V2 future (non développée)">Base de chauffeurs, favoris, disponibilité, historique, notation interne.</StateCard>
        </>
      }
    />
  );
}

/* ---------- Écran propriétaire 7 — Message privé chauffeur ---------- */
function MessagePriveMobile() {
  return (
    <>
      <div className="wf-card" style={{ background: "#eef2ff" }}>
        <p style={{ margin: 0, fontSize: "0.78rem", whiteSpace: "pre-line" }}>
          {"Bonjour, voici les informations de la course KDRIVE :\n\nDate : 08/02/2026\nHeure : 13:45\nDépart complet : 12 quai Perrache, 69002 Lyon\nDestination complète : Aéroport Lyon-Saint-Exupéry, Terminal 1\nNom du client : Mamadou Diallo\nTéléphone : 06 00 00 00 00\nPassagers : 2\nBagages : 2 grandes valises\nOptions : Fauteuil roulant pliable\nTarif à encaisser : 45 €\nNet chauffeur : 40 €\nCommission KDRIVE : 5 €\nInstructions particulières : —\n\nMerci de contacter le client et de lui transmettre votre nom, votre véhicule et votre plaque."}
        </p>
      </div>
      <div className="wf-row" style={{ flexWrap: "wrap", gap: 8 }}>
        <button className="wf-btn wf-btn--secondary">Copier</button>
        <button className="wf-btn wf-btn--secondary">Ouvrir WhatsApp</button>
      </div>
      <button className="wf-btn wf-btn--primary wf-btn--block">Marquer comme envoyé</button>
      <p className="wf-note" style={{ color: "var(--wf-error)" }}>Ces informations ne doivent jamais être envoyées dans le groupe public.</p>
    </>
  );
}
export function ScreenMessagePrive() {
  return (
    <ScreenShell
      id="screen-o8" kicker="Écran propriétaire 8" title="Message privé chauffeur"
      lead="Généré automatiquement après affectation. Adresse complète, nom et téléphone du client — réservés exclusivement à ce message privé."
      mobile={<MessagePriveMobile />} desktop={<div style={{ maxWidth: 480 }}><MessagePriveMobile /></div>}
      states={<StateCard type="normal" label="Envoyé">Statut « Marqué comme envoyé » horodaté dans l’historique de la course.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 8 — Génération du bon ---------- */
export function ScreenGenerationBon() {
  return (
    <ScreenShell
      id="screen-o9" kicker="Écran propriétaire 9" title="Génération du bon"
      lead="Deux versions nettement distinctes : la version interne ajoute commission, net chauffeur, chauffeur attribué, statut d’envoi et notes internes — jamais visibles sur la version client."
      mobile={<VoucherPreview variant="internal" compact />} desktop={<VoucherPreview variant="internal" />}
      states={<StateCard type="normal" label="Deux versions générées">Version client envoyée au client, version interne conservée par KDRIVE.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 9 — Confirmation client ---------- */
function ConfirmationClientMobile() {
  return (
    <>
      <div className="wf-card">
        <span className="wf-pill" style={{ background: "var(--wf-success-bg)", color: "var(--wf-success)" }}>Course confirmée</span>
        <p style={{ margin: "8px 0 0", fontSize: "0.82rem" }}>Bon PDF généré · E-mail client envoyé · E-mail propriétaire (copie) envoyé</p>
      </div>
      <div className="wf-chip-row">
        <span className="wf-chip">Bon PDF</span><span className="wf-chip">E-mail client</span><span className="wf-chip">E-mail propriétaire</span><span className="wf-chip">WhatsApp (futur)</span>
      </div>
      <p className="wf-note">Le client reçoit chauffeur, véhicule, plaque, téléphone, tarif confirmé et rappel du paiement au chauffeur. Le propriétaire reçoit une copie.</p>
    </>
  );
}
export function ScreenConfirmationClient() {
  return (
    <ScreenShell
      id="screen-o10" kicker="Écran propriétaire 10" title="Confirmation au client"
      lead="Dernière étape automatique une fois l’affectation faite : génération et envoi groupés, sans ressaisie."
      mobile={<ConfirmationClientMobile />} desktop={<div style={{ maxWidth: 480 }}><ConfirmationClientMobile /></div>}
      states={<StateCard type="success" label="Course confirmée">Statut final atteint uniquement après tarif confirmé + chauffeur attribué + informations préparées + envoi effectué.</StateCard>}
    />
  );
}

/* ---------- Écran propriétaire 10 — Historique ---------- */
const history = [
  { time: "13:45", label: "Nouvelle demande reçue — type de trajet détecté : transfert aéroport" },
  { time: "13:45", label: "Tarif estimé calculé automatiquement — 45 €" },
  { time: "13:46", label: "Tarif confirmé par le propriétaire — 45 € (aucun ajustement)" },
  { time: "13:47", label: "Annonce partagée dans le groupe" },
  { time: "13:58", label: "Chauffeur affecté — Karim B." },
  { time: "13:59", label: "Message privé envoyé au chauffeur" },
  { time: "14:00", label: "Bon généré et confirmation envoyée au client" },
];
function HistoriqueMobile() {
  return (
    <div className="wf-card">
      {history.map((h) => (
        <p key={h.time} style={{ margin: "4px 0", fontSize: "0.82rem" }}><b>{h.time}</b> — {h.label}</p>
      ))}
    </div>
  );
}
export function ScreenHistorique() {
  return (
    <ScreenShell
      id="screen-o11" kicker="Écran propriétaire 11" title="Historique de la course"
      lead="Chaque changement de statut horodaté, pour garder une trace claire sans ressaisie manuelle."
      mobile={<HistoriqueMobile />} desktop={<div style={{ maxWidth: 480 }}><HistoriqueMobile /></div>}
      states={<StateCard type="normal" label="Historique complet">Consultable à tout moment depuis la fiche course, y compris après la course terminée.</StateCard>}
    />
  );
}
