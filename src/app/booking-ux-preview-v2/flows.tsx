import { Fragment } from "react";

const clientFlow = [
  { title: "Recherche du trajet", body: "Départ, destination, date, heure." },
  { title: "Calcul de l’itinéraire", body: "Distance et durée via Google Routes." },
  { title: "Tarif estimé", body: "Affiché avant tout engagement." },
  { title: "Choix de la catégorie", body: "Confort, Berline, Luxe, Van, Monospace." },
  { title: "Options", body: "Passagers, bagages, siège enfant, animal, arrêt supplémentaire…" },
  { title: "Identification minimale", body: "Prénom, nom, téléphone — Google ou sans compte." },
  { title: "Récapitulatif", body: "Confirmation humaine annoncée avant envoi." },
  { title: "Envoi de la demande", body: "Statut : Nouvelle demande." },
  { title: "Attente de confirmation", body: "KDRIVE vérifie disponibilité et tarif." },
  { title: "Bon de réservation", body: "Reçu une fois le chauffeur attribué." },
  { title: "Informations chauffeur", body: "Nom, téléphone, véhicule, plaque." },
  { title: "Course", body: "Prise en charge par le chauffeur attribué." },
  { title: "Paiement au chauffeur", body: "Réglé directement, généralement par TPE." },
];

const ownerFlow = [
  { title: "Nouvelle demande", body: "Apparaît dans la liste des demandes." },
  { title: "Contact client si nécessaire", body: "Appel ou WhatsApp depuis la fiche." },
  { title: "Confirmation ou ajustement du tarif", body: "Tarif client validé ou modifié." },
  { title: "Commission et net chauffeur", body: "Calculés automatiquement à partir du tarif confirmé." },
  { title: "Préparation de l’annonce groupe", body: "Message anonymisé généré automatiquement." },
  { title: "Partage dans WhatsApp", body: "Seule tâche manuelle : choisir le groupe et envoyer." },
  { title: "Recherche de chauffeur", body: "Attente des réponses en privé." },
  { title: "Affectation", body: "Choix du chauffeur retenu." },
  { title: "Envoi privé au chauffeur", body: "Informations complètes, jamais dans le groupe." },
  { title: "Génération du bon", body: "Version client et version interne." },
  { title: "Confirmation au client", body: "Statut : Course confirmée." },
];

const driverFlow = [
  { title: "Réception du message privé", body: "Trajet complet, tarif à encaisser, net chauffeur." },
  { title: "Contact du client", body: "Transmet nom, véhicule, plaque." },
  { title: "Réalisation de la course", body: "Prise en charge et trajet." },
  { title: "Encaissement", body: "Paiement du client, généralement par TPE." },
  { title: "Reversement éventuel", body: "Commission KDRIVE selon la règle métier convenue." },
];

const statuses: [string, string, string?][] = [
  ["new", "Nouvelle demande"],
  ["contacted", "Client contacté"],
  ["price_confirmed", "Tarif confirmé"],
  ["driver_search", "Recherche de chauffeur"],
  ["driver_assigned", "Chauffeur attribué"],
  ["confirmed", "Course confirmée"],
  ["completed", "Course terminée"],
  ["cancelled", "Annulée"],
  ["declined", "Refusée"],
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
          <p className="wf-kicker">Parcours client</p>
          <h2 className="wf-h2">Du trajet recherché au paiement du chauffeur</h2>
          <p className="wf-lead">
            Le client ne doit jamais croire que la course est confirmée immédiatement après l’envoi de la demande.
            Cinq statuts distincts jalonnent le parcours : demande enregistrée, en cours de traitement, tarif
            confirmé, chauffeur attribué, course confirmée.
          </p>
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
          <p className="wf-kicker">Parcours propriétaire</p>
          <h2 className="wf-h2">De la demande à la confirmation client</h2>
          <p className="wf-lead">
            La course ne passe jamais directement à « confirmée » après la simple confirmation du tarif. Elle ne
            devient confirmée que lorsque le tarif est confirmé, qu’un chauffeur est attribué, que les informations
            utiles ont été préparées, et que la confirmation client peut être envoyée.
          </p>
        </div>
        <FlowDiagram steps={ownerFlow} />

        <div className="wf-card" style={{ marginTop: 24 }}>
          <h3 className="wf-h3">Statuts proposés</h3>
          <div className="wf-table-wrap">
            <table className="wf-table">
              <thead><tr><th>Statut technique</th><th>Libellé français</th></tr></thead>
              <tbody>
                {statuses.map(([code, label]) => (
                  <tr key={code}><td><code style={{ background: "var(--wf-bg-alt)", padding: "2px 6px", borderRadius: 4 }}>{code}</code></td><td>{label}</td></tr>
                ))}
                <tr>
                  <td><code style={{ background: "var(--wf-bg-alt)", padding: "2px 6px", borderRadius: 4 }}>driver_search_delayed</code></td>
                  <td>Recherche prolongée <span className="wf-pill" style={{ marginLeft: 8 }}>État visuel uniquement — non persistant, non ajouté en base pour l’instant</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="wf-note" style={{ marginTop: 12 }}>
            Documentation uniquement — aucune migration réelle. Le schéma Supabase en production reste inchangé
            dans cette phase.
          </p>
        </div>
      </div>
    </section>
  );
}

export function DriverFlowSection() {
  return (
    <section id="flow-driver" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Parcours chauffeur</p>
          <h2 className="wf-h2">De l’affectation à la course terminée</h2>
          <p className="wf-lead">
            Le chauffeur ne reçoit les coordonnées complètes du client qu’en message privé, jamais dans le groupe
            WhatsApp public.
          </p>
        </div>
        <FlowDiagram steps={driverFlow} />
      </div>
    </section>
  );
}
