import { ScreenShell, StateCard } from "./screen-shell";

function CoreFields() {
  return (
    <div className="wf-row">
      <div className="wf-field"><span className="wf-field-label">Passagers</span><div className="wf-input is-filled">2</div></div>
      <div className="wf-field"><span className="wf-field-label">Bagages</span><div className="wf-input is-filled">1</div></div>
    </div>
  );
}

function OptionsAccordion() {
  return (
    <div className="wf-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b>+ Ajouter des options</b>
        <span className="wf-pill">repliable</span>
      </div>
      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        <div className="wf-chip-row">
          <span className="wf-chip">🧒 Siège enfant</span>
          <span className="wf-chip">🐾 Animal</span>
          <span className="wf-chip">➕ Arrêt supplémentaire</span>
        </div>
        <div className="wf-field"><span className="wf-field-label">N° de vol (si trajet aéroport)</span><div className="wf-input">AF1234</div></div>
        <div className="wf-field"><span className="wf-field-label">N° de train (si trajet gare)</span><div className="wf-input">TGV 6543</div></div>
        <label className="wf-chip" style={{ display: "inline-flex", width: "fit-content" }}>☐ Réservation pour une autre personne</label>
        <div className="wf-field"><span className="wf-field-label">Commentaire pour le chauffeur</span><div className="wf-input">Facultatif</div></div>
      </div>
    </div>
  );
}

function MobileContent() {
  return (
    <>
      <CoreFields />
      <OptionsAccordion />
      <button className="wf-btn wf-btn--primary wf-btn--block" style={{ marginTop: 12 }}>Continuer</button>
    </>
  );
}

function DesktopContent() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "65% 35%", gap: 24 }}>
      <div>
        <CoreFields />
        <OptionsAccordion />
        <button className="wf-btn wf-btn--primary" style={{ marginTop: 12 }}>Continuer</button>
      </div>
      <div>
        <div className="wf-card" style={{ position: "sticky", top: 16 }}>
          <h3 className="wf-h3">Résumé (sticky)</h3>
          <p style={{ fontSize: "0.86rem" }}>Berline · 27,50 €<br />Gare Part-Dieu → Aéroport<br />20 août, 15:00</p>
        </div>
      </div>
    </div>
  );
}

export function Screen3() {
  return (
    <ScreenShell
      id="screen-3"
      kicker="Écran 3"
      title="Options et précisions"
      lead="Recueillir uniquement les informations utiles après le choix du véhicule. Passagers et bagages en champs principaux, tout le reste dans un bloc repliable jamais bloquant."
      mobile={<MobileContent />}
      desktop={<DesktopContent />}
      states={
        <>
          <StateCard type="normal" label="Champs conditionnels">N° de vol affiché uniquement pour un trajet aéroport détecté ; n° de train uniquement pour une gare ; les deux masqués sinon.</StateCard>
          <StateCard type="normal" label="Réservation pour un tiers">Case cochée → champs prénom/téléphone du passager apparaissent immédiatement en dessous.</StateCard>
          <StateCard type="warning" label="Dépassement de capacité">Bandeau d’avertissement au-dessus du bouton « Continuer » si passagers/bagages dépassent la capacité du véhicule choisi ; ne bloque pas la suite.</StateCard>
          <StateCard type="success" label="Options vides">Comportement par défaut : toutes les options facultatives peuvent rester vides, « Continuer » reste actif.</StateCard>
        </>
      }
    />
  );
}
