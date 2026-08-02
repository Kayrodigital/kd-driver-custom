const rows: { field: string; client: string; owner: string; group: string; driver: string }[] = [
  { field: "Nom / prénom client", client: "Oui", owner: "Oui", group: "Non", driver: "Oui (message privé)" },
  { field: "Téléphone client", client: "Oui", owner: "Oui", group: "Non", driver: "Oui (message privé)" },
  { field: "E-mail client", client: "Oui", owner: "Oui", group: "Non", driver: "Non" },
  { field: "Adresse — niveau secteur", client: "Oui", owner: "Oui", group: "Oui", driver: "Oui" },
  { field: "Adresse exacte / complément", client: "Oui", owner: "Oui", group: "Non", driver: "Oui (message privé)" },
  { field: "Référence complète", client: "Oui", owner: "Oui", group: "Non (référence masquée)", driver: "Oui (message privé)" },
  { field: "Tarif client", client: "Oui", owner: "Oui", group: "Non", driver: "Oui (montant à encaisser)" },
  { field: "Commission KDRIVE", client: "Non", owner: "Oui", group: "Non", driver: "Selon règle métier" },
  { field: "Net chauffeur", client: "Non", owner: "Oui", group: "Oui", driver: "Oui" },
  { field: "Numéro de vol / train", client: "Oui", owner: "Oui", group: "Non", driver: "Oui (message privé)" },
  { field: "Commentaire libre du client", client: "Oui", owner: "Oui", group: "Non", driver: "Oui si utile (message privé)" },
];

export function ConfidentialityMatrixSection() {
  return (
    <section id="confidentiality" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Confidentialité</p>
          <h2 className="wf-h2">Qui voit quoi</h2>
          <p className="wf-lead">
            Deux niveaux d’adresse à distinguer partout dans le produit : l’adresse « groupe » (secteur uniquement,
            aucune donnée identifiante) et l’adresse « chauffeur attribué » (complète, transmise uniquement en privé
            après affectation).
          </p>
        </div>

        <div className="wf-row" style={{ gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <div className="wf-card" style={{ flex: 1, minWidth: 260 }}>
            <p className="wf-pill wf-pill--group">Adresse groupe</p>
            <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: "0.86rem" }}>
              <li>Secteur de départ (ex. « secteur Lyon Perrache »)</li>
              <li>Secteur de destination (ex. « Aéroport Lyon-Saint-Exupéry »)</li>
              <li>Aucun numéro de rue, aucune donnée identifiant directement le client</li>
            </ul>
          </div>
          <div className="wf-card" style={{ flex: 1, minWidth: 260 }}>
            <p className="wf-pill wf-pill--driver">Adresse chauffeur attribué</p>
            <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: "0.86rem" }}>
              <li>Adresse complète et complément</li>
              <li>Point de rendez-vous précis</li>
              <li>Téléphone client et commentaire utile</li>
            </ul>
          </div>
        </div>

        <div className="wf-table-wrap">
          <table className="wf-table">
            <thead>
              <tr><th>Information</th><th>Client</th><th>Propriétaire</th><th>Groupe WhatsApp</th><th>Chauffeur attribué</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.field}>
                  <td>{row.field}</td>
                  <td>{row.client}</td>
                  <td>{row.owner}</td>
                  <td>{row.group}</td>
                  <td>{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="wf-note" style={{ marginTop: 12 }}>
          Le client ne voit jamais la commission ni le net chauffeur. Le groupe WhatsApp ne reçoit jamais de donnée
          permettant d’identifier ou de contacter directement le client.
        </p>
      </div>
    </section>
  );
}
