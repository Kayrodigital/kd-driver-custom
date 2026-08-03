const variantTitles: Record<"client" | "internal" | "group", string> = {
  client: "version client", internal: "version interne KDRIVE", group: "fiche anonyme groupe",
};

export function VoucherPreview({ variant, compact = false }: { variant: "client" | "internal" | "group"; compact?: boolean }) {
  if (variant === "group") {
    return (
      <div className="wf-card" style={{ maxWidth: compact ? "100%" : 520, margin: compact ? 0 : "0 auto", fontSize: "0.8rem", background: "#eef2ff" }}>
        <div className="wf-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <b>KDRIVE</b>
          <span className="wf-pill wf-pill--group">Fiche groupe — anonyme</span>
        </div>
        <p style={{ margin: "10px 0 0", fontWeight: 700 }}>Fiche anonyme groupe</p>
        <table className="wf-table" style={{ fontSize: "0.78rem", marginTop: 10 }}>
          <tbody>
            <tr><td>Date</td><td>Mardi 6 août</td></tr>
            <tr><td>Heure</td><td>13 h 45</td></tr>
            <tr><td>Secteur départ</td><td>Lyon Perrache</td></tr>
            <tr><td>Secteur destination</td><td>Aéroport Lyon-Saint-Exupéry</td></tr>
            <tr><td>Catégorie</td><td>Berline</td></tr>
            <tr><td>Passagers</td><td>1</td></tr>
            <tr><td>Bagages / options</td><td>2 grandes valises · fauteuil roulant pliable</td></tr>
            <tr><td>Net chauffeur</td><td><b>40 €</b></td></tr>
          </tbody>
        </table>
        <p className="wf-note" style={{ marginTop: 10, color: "var(--wf-error)" }}>
          Ne contient jamais : nom du client, téléphone, adresse exacte, e-mail, commentaire sensible.
        </p>
      </div>
    );
  }
  return (
    <div className="wf-card" style={{ maxWidth: compact ? "100%" : 520, margin: compact ? 0 : "0 auto", fontSize: "0.8rem" }}>
      <div className="wf-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <b>KDRIVE</b>
        <span className="wf-pill" style={{ background: "var(--wf-success-bg)", color: "var(--wf-success)" }}>Confirmé</span>
      </div>
      <p style={{ margin: "10px 0 0", fontWeight: 700 }}>Bon de réservation — {variantTitles[variant]}</p>
      <p style={{ margin: "2px 0 10px", color: "var(--wf-muted)" }}>Référence KD-2026-00842 · Généré le 08/02/2026</p>

      <table className="wf-table" style={{ fontSize: "0.78rem" }}>
        <tbody>
          <tr><td>Client</td><td>Mamadou Diallo</td></tr>
          <tr><td>Téléphone client</td><td>06 00 00 00 00</td></tr>
          <tr><td>Date / heure</td><td>08/02/2026 · 13:45</td></tr>
          <tr><td>Départ</td><td>{variant === "client" ? "Secteur Lyon Perrache" : "12 quai Perrache, 69002 Lyon"}</td></tr>
          <tr><td>Destination</td><td>Aéroport Lyon-Saint-Exupéry</td></tr>
          <tr><td>Catégorie</td><td>Berline</td></tr>
          <tr><td>Type de trajet</td><td>Transfert aéroport / longue distance</td></tr>
          <tr><td>Options</td><td>2 passagers · 2 bagages · Fauteuil roulant pliable</td></tr>
          <tr><td>Chauffeur</td><td>Karim B. · 06 11 22 33 44</td></tr>
          <tr><td>Véhicule / plaque</td><td>Berline noire · AA-123-BB</td></tr>
          {variant === "internal" && <tr><td>Distance / durée</td><td>16 km · 25 min</td></tr>}
          {variant === "internal" && <tr><td>Règle appliquée</td><td>Distance × tarif/km + prise en charge transfert (5 €), pas de facturation à la minute</td></tr>}
          {variant === "internal" && <tr><td>Tarif kilométrique</td><td>2,50 €/km</td></tr>}
          {variant === "internal" && <tr><td>Prise en charge</td><td>5 €</td></tr>}
          {variant === "internal" && <tr><td>Minimum de catégorie</td><td>Non applicable (Berline)</td></tr>}
          {variant === "internal" && <tr><td>Prix estimé</td><td>45 €</td></tr>}
          <tr><td>{variant === "client" ? "Tarif client" : "Prix confirmé"}</td><td><b>45 €</b></td></tr>
          {variant === "internal" && <tr><td>Commission KDRIVE</td><td>5 €</td></tr>}
          {variant === "internal" && <tr><td>Net chauffeur</td><td>40 €</td></tr>}
          <tr><td>Paiement</td><td>Au chauffeur (généralement par TPE)</td></tr>
          {variant === "internal" && <tr><td>Statut d’envoi</td><td>Envoyé au client à 13:52</td></tr>}
        </tbody>
      </table>

      {variant === "internal" && (
        <p className="wf-note" style={{ marginTop: 10 }}>
          Notes internes : chauffeur habituel du secteur Perrache, ponctuel. Historique succinct disponible depuis la
          fiche course.
        </p>
      )}
      <p className="wf-note" style={{ marginTop: 10 }}>
        Coordonnées KDRIVE — 06 52 21 12 92 · www.kdrive-vtc-lyon.fr
      </p>
      {variant === "client" && (
        <p className="wf-note" style={{ marginTop: 4, fontStyle: "italic" }}>
          Aucune commission ni net chauffeur n’apparaît sur cette version.
        </p>
      )}
    </div>
  );
}
