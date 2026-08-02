const tripTypes = [
  { name: "Course standard < 10 km", rule: "Tarif au km + prise en charge 10 € + minutes au-delà des 15 premières incluses (1 €/min)." },
  { name: "Course standard ≥ 10 km", rule: "Tarif au km + prise en charge 10 €. Aucune facturation à la minute." },
  { name: "Transfert aéroport ou longue distance", rule: "Tarif au km + prise en charge 5 €. Aucune facturation à la minute." },
];

const rates = [
  { category: "Confort", perKm: "2 €/km", minimum: "—" },
  { category: "Berline", perKm: "2,25 €/km", minimum: "—" },
  { category: "Luxe", perKm: "3 €/km", minimum: "40 € (course standard)" },
];

const cases = [
  {
    label: "Cas A", desc: "Course standard, Confort, 7 km, 12 min", type: "Course standard < 10 km",
    lines: ["Distance : 7 km × 2 € = 14 €", "Prise en charge : 10 €", "Durée : 12 min ≤ 15 min incluses — aucune minute facturée"],
    total: "Total estimé : 24 €",
  },
  {
    label: "Cas B", desc: "Course standard, Confort, 7 km, 24 min", type: "Course standard < 10 km",
    lines: ["Distance : 7 km × 2 € = 14 €", "Prise en charge : 10 €", "Durée supplémentaire : 24 − 15 = 9 min × 1 € = 9 €"],
    total: "Total estimé : 33 €",
  },
  {
    label: "Cas C", desc: "Course standard, Confort, 12 km, 24 min", type: "Course standard ≥ 10 km",
    lines: ["Distance : 12 km × 2 € = 24 €", "Prise en charge : 10 €", "Distance ≥ 10 km — aucune facturation à la minute, même à 24 min"],
    total: "Total estimé : 34 €",
  },
  {
    label: "Cas D", desc: "Transfert aéroport, Confort, 20 km, 35 min", type: "Transfert aéroport / longue distance",
    lines: ["Distance : 20 km × 2 € = 40 €", "Prise en charge transfert : 5 €", "Aucune facturation à la minute pour ce type de trajet"],
    total: "Total estimé : 45 €",
  },
  {
    label: "Cas E — minimum Luxe", desc: "Course standard, Luxe, 5 km, 10 min", type: "Course standard < 10 km",
    lines: ["Distance : 5 km × 3 € = 15 €", "Prise en charge : 10 €", "Durée : 10 min ≤ 15 min incluses — aucune minute facturée", "Prix calculé : 25 € → inférieur au minimum Luxe (40 €)"],
    total: "Total estimé : 40 € (minimum de catégorie appliqué)",
  },
];

export function PricingSpecSection() {
  return (
    <section id="pricing-spec" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Spécification tarifaire (nouvelle grille)</p>
          <h2 className="wf-h2">Trois types de trajet, une règle par type</h2>
          <p className="wf-lead">
            Spécification UX et fonctionnelle uniquement — le moteur tarifaire réel, les règles Supabase, l’API de
            réservation et les migrations ne sont pas modifiés dans cette phase. Van et Monospace restent sur devis,
            non concernés par cette grille.
          </p>
        </div>

        <div className="wf-table-wrap">
          <table className="wf-table">
            <thead><tr><th>Type de trajet</th><th>Règle</th></tr></thead>
            <tbody>{tripTypes.map((t) => <tr key={t.name}><td>{t.name}</td><td>{t.rule}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="wf-table-wrap" style={{ marginTop: 16 }}>
          <table className="wf-table">
            <thead><tr><th>Catégorie</th><th>Tarif au km</th><th>Minimum de catégorie</th></tr></thead>
            <tbody>{rates.map((r) => <tr key={r.category}><td>{r.category}</td><td>{r.perKm}</td><td>{r.minimum}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="wf-note" style={{ marginTop: 8 }}>Prise en charge : 10 € pour une course standard, 5 € pour un transfert aéroport ou une longue distance.</p>

        <div className="wf-card" style={{ marginTop: 20, borderColor: "var(--wf-warning)", background: "var(--wf-warning-bg)" }}>
          <p className="wf-pill" style={{ background: "var(--wf-warning)", color: "#fff" }}>À confirmer avec le client</p>
          <p style={{ margin: "8px 0 0", fontSize: "0.86rem" }}>
            « Le minimum Luxe de 40 € s’applique-t-il également aux transferts aéroport et aux longues distances ? »
            Non codé comme hypothèse silencieuse — affiché comme point ouvert tant que la réponse n’est pas confirmée.
          </p>
        </div>

        <h3 className="wf-h3" style={{ marginTop: 32 }}>Exemples chiffrés</h3>
        <div className="wf-row" style={{ flexWrap: "wrap", gap: 14, marginTop: 12 }}>
          {cases.map((c) => (
            <div className="wf-card" key={c.label} style={{ flex: "1 1 260px" }}>
              <div className="wf-row" style={{ justifyContent: "space-between" }}>
                <b>{c.label}</b><span className="wf-pill wf-pill--accent">{c.type}</span>
              </div>
              <p style={{ margin: "6px 0 8px", fontSize: "0.8rem", color: "var(--wf-muted)" }}>{c.desc}</p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.8rem" }}>
                {c.lines.map((l) => <li key={l}>{l}</li>)}
              </ul>
              <p style={{ margin: "8px 0 0", fontWeight: 700 }}>{c.total}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
