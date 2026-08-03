const statuses: { label: string; meaning: string }[] = [
  { label: "NOUVELLE", meaning: "Demande reçue." },
  { label: "À TRAITER", meaning: "Tarif ou contact à vérifier." },
  { label: "RECHERCHE CHAUFFEUR", meaning: "Annonce partagée, chauffeur non affecté." },
  { label: "CHAUFFEUR ATTRIBUÉ", meaning: "Informations chauffeur disponibles." },
  { label: "CONFIRMÉE", meaning: "Confirmation client envoyée." },
  { label: "TERMINÉE", meaning: "Course effectuée." },
  { label: "ANNULÉE", meaning: "Annulée par KDRIVE ou le client." },
  { label: "REFUSÉE", meaning: "Demande non acceptée." },
];

export function StatusTableSection() {
  return (
    <section id="statuts" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Statuts simplifiés</p>
          <h2 className="wf-h2">Des libellés simples, pas de jargon technique</h2>
          <p className="wf-lead">
            Les statuts techniques peuvent rester détaillés en base (ex. <code>price_confirmed</code>), mais les
            libellés visibles — pour le propriétaire comme pour le client — doivent rester simples. Un statut
            interne ne doit jamais apparaître tel quel côté client.
          </p>
        </div>
        <div className="wf-table-wrap">
          <table className="wf-table">
            <thead><tr><th>Statut visible</th><th>Signification</th></tr></thead>
            <tbody>
              {statuses.map((s) => (
                <tr key={s.label}><td><b>{s.label}</b></td><td>{s.meaning}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function PaymentCommissionSection() {
  return (
    <section id="paiement" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Paiement et commission</p>
          <h2 className="wf-h2">Le client paie directement le chauffeur</h2>
          <p className="wf-lead">
            Le parcours doit toujours afficher clairement les trois montants, jamais un seul total ambigu. Aucun
            paiement en ligne, aucune intégration Stripe.
          </p>
        </div>
        <div className="wf-card" style={{ maxWidth: 420, margin: "0 auto" }}>
          <table className="wf-table" style={{ fontSize: "0.86rem" }}>
            <tbody>
              <tr><td>Tarif à encaisser auprès du client</td><td><b>45 €</b></td></tr>
              <tr><td>Net chauffeur</td><td><b>40 €</b></td></tr>
              <tr><td>Commission KDRIVE</td><td><b>5 €</b></td></tr>
            </tbody>
          </table>
        </div>
        <p className="wf-note" style={{ marginTop: 16, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          Le moyen de reversement de la commission au chauffeur reste à confirmer avec KDRIVE. Prévu pour une phase
          future dans les documents internes : commission attendue, commission reçue ou non, statut du reversement —
          non implémenté tant que la règle exacte n’est pas validée.
        </p>
      </div>
    </section>
  );
}
