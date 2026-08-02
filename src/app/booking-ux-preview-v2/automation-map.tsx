const automatic = [
  "Calcul du tarif",
  "Calcul de la commission et du net chauffeur",
  "Génération de l’annonce groupe anonymisée",
  "Génération du message privé chauffeur",
  "Génération du bon (client + interne)",
  "Génération des e-mails client et propriétaire",
  "Journalisation",
  "Changement de statut préparé",
  "Horodatage",
  "Lien WhatsApp prérempli",
];

const semiAutomatic = [
  "Validation du tarif confirmé",
  "Validation de l’annonce avant diffusion",
  "Affectation du chauffeur",
  "Validation finale avant envoi client",
];

const manual = [
  "Choix du groupe WhatsApp et partage",
  "Sélection du chauffeur retenu",
  "Saisie des informations chauffeur si absent de la base",
  "Envoi privé si aucune API WhatsApp disponible",
  "Gestion des exceptions (aucun chauffeur, litige, annulation)",
];

function AutomationColumn({ pillClass, title, items }: { pillClass: string; title: string; items: string[] }) {
  return (
    <div className="wf-card" style={{ flex: 1, minWidth: 240 }}>
      <p className={`wf-pill ${pillClass}`}>{title}</p>
      <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: "0.86rem" }}>
        {items.map((item) => <li key={item} style={{ marginBottom: 6 }}>{item}</li>)}
      </ul>
    </div>
  );
}

export function AutomationMapSection() {
  return (
    <section id="automations" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Automatisations</p>
          <h2 className="wf-h2">Ce qui est préparé, ce qui reste à décider</h2>
          <p className="wf-lead">
            Objectif : rendre visible au client ce qui restera réellement à faire. La tâche manuelle principale
            reste « Partager l’annonce préparée dans le groupe WhatsApp », puis « Choisir le chauffeur retenu ».
          </p>
        </div>
        <div className="wf-row" style={{ gap: 16, flexWrap: "wrap", alignItems: "stretch" }}>
          <AutomationColumn pillClass="wf-pill--auto" title="Automatique" items={automatic} />
          <AutomationColumn pillClass="wf-pill--semi" title="Semi-automatique" items={semiAutomatic} />
          <AutomationColumn pillClass="wf-pill--manual" title="Manuel" items={manual} />
        </div>
      </div>
    </section>
  );
}
