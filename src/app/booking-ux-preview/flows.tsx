import { Fragment } from "react";

const clientFlow = [
  { title: "Accueil / page commerciale", body: "Point d’entrée existant, inchangé." },
  { title: "Recherche du trajet", body: "Écran 1 — 5 champs maximum." },
  { title: "Calcul", body: "Distance, durée, tarifs par catégorie." },
  { title: "Choix du véhicule", body: "Écran 2 — cartes catégories." },
  { title: "Options facultatives", body: "Écran 3 — repliable, jamais bloquant." },
  { title: "Identification minimale", body: "Écran 4 — invité ou Google, jamais obligatoire." },
  { title: "Récapitulatif", body: "Écran 5 — vérification avant envoi." },
  { title: "Paiement maintenant ou plus tard", body: "Chauffeur, en ligne, ou devis." },
  { title: "Confirmation", body: "Écran 6 — référence et statut." },
];

const ownerFlow = [
  { title: "Nouvelle demande", body: "Apparaît dans la liste (écran 7)." },
  { title: "Notification", body: "À définir — hors périmètre technique de ce sprint." },
  { title: "Vérification disponibilité", body: "Action manuelle de l’équipe." },
  { title: "Confirmation ou tarif modifié", body: "Fiche réservation (écran 8)." },
  { title: "Contact client", body: "Appel ou WhatsApp depuis la fiche." },
  { title: "Paiement chauffeur ou lien Stripe", body: "Lien généré depuis la fiche, jamais automatique." },
  { title: "Réservation confirmée", body: "Statut mis à jour." },
  { title: "Course terminée", body: "Statut final, archivage implicite." },
];

function FlowDiagram({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="wf-flow">
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          <div className="wf-flow-step">
            <b>{index + 1}. {step.title}</b>
            <span>{step.body}</span>
          </div>
          {index < steps.length - 1 && <span className="wf-flow-arrow" aria-hidden="true">→</span>}
        </Fragment>
      ))}
    </div>
  );
}

export function ClientFlowSection() {
  return (
    <section id="flow-client" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Workflow utilisateur</p>
          <h2 className="wf-h2">Parcours client</h2>
          <p className="wf-lead">Moins d’une minute pour une réservation simple, trois écrans principaux maximum avant confirmation sur mobile (Recherche → Véhicule → Identification/Récapitulatif), aucune perte de données lors d’un retour arrière.</p>
        </div>
        <FlowDiagram steps={clientFlow} />
      </div>
    </section>
  );
}

export function OwnerFlowSection() {
  return (
    <section id="flow-owner" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Workflow propriétaire</p>
          <h2 className="wf-h2">Traitement d’une demande côté KDRIVE</h2>
          <p className="wf-lead">De la réception de la demande jusqu’à la course terminée, avec un statut explicite à chaque étape.</p>
        </div>
        <FlowDiagram steps={ownerFlow} />

        <div className="wf-card" style={{ marginTop: 24 }}>
          <h3 className="wf-h3">Statuts recommandés</h3>
          <div className="wf-table-wrap">
            <table className="wf-table">
              <thead><tr><th>Statut technique</th><th>Libellé français</th></tr></thead>
              <tbody>
                {[
                  ["new", "Nouvelle"],
                  ["quote_requested", "Devis demandé"],
                  ["priced", "Tarif défini"],
                  ["contacted", "Client contacté"],
                  ["confirmed", "Confirmée"],
                  ["payment_link_sent", "Lien de paiement envoyé"],
                  ["paid", "Payée"],
                  ["completed", "Terminée"],
                  ["cancelled", "Annulée"],
                ].map(([code, label]) => (
                  <tr key={code}><td><code style={{ background: "var(--wf-bg-alt)", padding: "2px 6px", borderRadius: 4 }}>{code}</code></td><td>{label}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="wf-note" style={{ marginTop: 12 }}>
            Écart avec la production actuelle : le schéma Supabase en place aujourd’hui utilise <code>new, contacted, confirmed, completed, cancelled, quote_requested</code> (voir migration Sprint 3A). <code>priced</code> et <code>payment_link_sent</code> sont de nouveaux statuts à ajouter si le workflow tarif/Stripe est validé — non appliqué dans ce sprint (aucune migration modifiée).
          </p>
        </div>
      </div>
    </section>
  );
}
