import { ScreenShell, StateCard } from "./screen-shell";

const rows = [
  { ref: "KD-0820-A1B2", date: "20/08", time: "15:00", phone: "06 12 34 56 78", from: "Gare Part-Dieu", to: "Aéroport LYS", vehicle: "Berline", price: "27,50 €", status: "Nouvelle", pay: "Chauffeur" },
  { ref: "KD-0821-C3D4", date: "21/08", time: "09:30", phone: "06 98 76 54 32", from: "Villeurbanne", to: "Lyon Confluence", vehicle: "Van", price: "Sur devis", status: "Devis demandé", pay: "—" },
  { ref: "KD-0822-E5F6", date: "22/08", time: "18:15", phone: "06 11 22 33 44", from: "Aéroport LYS", to: "Presqu’île", vehicle: "Confort", price: "32,00 €", status: "Confirmée", pay: "Lien envoyé" },
];

function FiltersBar() {
  return (
    <div className="wf-row" style={{ marginBottom: 14, flexWrap: "wrap" }}>
      <div className="wf-input" style={{ flex: 2, minWidth: 160 }}>🔍 Rechercher (référence, téléphone…)</div>
      <div className="wf-input" style={{ flex: 1, minWidth: 120 }}>Statut ▾</div>
      <div className="wf-input" style={{ flex: 1, minWidth: 120 }}>Date ▾</div>
    </div>
  );
}

function MobileContent() {
  return (
    <>
      <FiltersBar />
      {rows.map((r) => (
        <div className="wf-card" key={r.ref}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b>{r.ref}</b>
            <span className="wf-pill">{r.status}</span>
          </div>
          <p style={{ fontSize: "0.82rem", margin: "6px 0" }}>{r.from} → {r.to}<br />{r.date} · {r.time} · {r.vehicle} · {r.price}</p>
          <button className="wf-btn wf-btn--secondary wf-btn--block">⋯ Actions rapides</button>
        </div>
      ))}
    </>
  );
}

function DesktopContent() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FiltersBar />
      <div className="wf-table-wrap">
        <table className="wf-table">
          <thead>
            <tr>
              <th>Référence</th><th>Date</th><th>Heure</th><th>Téléphone</th><th>Départ</th><th>Destination</th><th>Véhicule</th><th>Tarif</th><th>Statut</th><th>Paiement</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.ref}>
                <td>{r.ref}</td><td>{r.date}</td><td>{r.time}</td><td>{r.phone}</td><td>{r.from}</td><td>{r.to}</td><td>{r.vehicle}</td><td>{r.price}</td>
                <td><span className="wf-pill">{r.status}</span></td><td>{r.pay}</td>
                <td>📞 · WA · ✓ · ⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Screen7() {
  return (
    <ScreenShell
      id="screen-7"
      kicker="Écran 7"
      title="Liste des réservations (propriétaire)"
      lead="Voir et traiter rapidement les demandes : recherche, filtres par statut et par date, tri, actions rapides sans ouvrir la fiche pour les cas courants."
      mobile={<MobileContent />}
      desktop={<DesktopContent />}
      states={
        <>
          <StateCard type="loading" label="Chargement">Lignes/cartes en squelette pendant le chargement des réservations.</StateCard>
          <StateCard type="empty" label="Aucune réservation">Message « Aucune demande pour ces filtres » + bouton réinitialiser les filtres.</StateCard>
          <StateCard type="normal" label="Filtré">Compteur de résultats affiché à côté des filtres actifs.</StateCard>
          <StateCard type="error" label="Erreur de chargement">Bandeau d’erreur + bouton réessayer, filtres conservés.</StateCard>
        </>
      }
    />
  );
}
