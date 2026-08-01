import { ScreenShell, StateCard } from "./screen-shell";

function ActionsBar() {
  return (
    <div className="wf-chip-row">
      <button className="wf-btn wf-btn--secondary">📞 Appeler</button>
      <button className="wf-btn wf-btn--secondary">WhatsApp</button>
      <button className="wf-btn wf-btn--secondary">Modifier le tarif</button>
      <button className="wf-btn wf-btn--primary">Confirmer</button>
      <button className="wf-btn wf-btn--secondary">Générer un lien Stripe</button>
      <button className="wf-btn wf-btn--ghost">Copier le lien</button>
      <button className="wf-btn wf-btn--ghost">Renvoyer la confirmation</button>
      <button className="wf-btn wf-btn--ghost">Marquer terminée</button>
      <button className="wf-btn wf-btn--ghost">Annuler</button>
    </div>
  );
}

function DetailBlocks() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="wf-card">
        <b>Client</b>
        <p style={{ fontSize: "0.84rem", margin: "6px 0 0" }}>Jean D. · 06 12 34 56 78 · e-mail non renseigné</p>
      </div>
      <div className="wf-card">
        <b>Trajet</b>
        <p style={{ fontSize: "0.84rem", margin: "6px 0" }}>Gare Part-Dieu → Aéroport Lyon-Saint Exupéry</p>
        <div className="wf-media-block">carte / lien Google Maps</div>
        <p style={{ fontSize: "0.82rem", color: "var(--wf-muted)" }}>20 août 2026, 15:00 · 34,8 km · ≈ 36 min</p>
      </div>
      <div className="wf-card">
        <b>Véhicule et options</b>
        <p style={{ fontSize: "0.84rem", margin: "6px 0 0" }}>Berline · 2 passagers · 1 bagage · aucune option</p>
      </div>
      <div className="wf-card">
        <b>Tarif</b>
        <p style={{ fontSize: "0.84rem", margin: "6px 0 0" }}>Calculé : 27,50 € · Final : <i>non modifié</i> · Paiement : au chauffeur</p>
      </div>
      <div className="wf-card">
        <b>Notes internes</b>
        <div className="wf-input" style={{ minHeight: 60, alignItems: "flex-start", paddingTop: 10 }}>Zone de texte libre, visible uniquement côté équipe.</div>
      </div>
    </div>
  );
}

function HistoryBlock() {
  return (
    <div className="wf-card">
      <b>Historique des événements</b>
      <ul style={{ fontSize: "0.82rem", color: "var(--wf-muted)", margin: "8px 0 0", paddingLeft: 18 }}>
        <li>Demande créée — 31/07 18:42</li>
        <li>Statut → Devis demandé — 31/07 18:42</li>
        <li>Client contacté — 01/08 09:10</li>
      </ul>
    </div>
  );
}

function MobileContent() {
  return (
    <>
      <div style={{ marginBottom: 10 }}><b>KD-20260820-A1B2C3</b> · <span className="wf-pill">Devis demandé</span></div>
      <ActionsBar />
      <div style={{ marginTop: 12 }}><DetailBlocks /></div>
      <div style={{ marginTop: 12 }}><HistoryBlock /></div>
    </>
  );
}

function DesktopContent() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div><b>KD-20260820-A1B2C3</b> · <span className="wf-pill">Devis demandé</span></div>
        <ActionsBar />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <DetailBlocks />
        <HistoryBlock />
      </div>
    </div>
  );
}

export function Screen8() {
  return (
    <ScreenShell
      id="screen-8"
      kicker="Écran 8"
      title="Fiche réservation (propriétaire)"
      lead="Centraliser toutes les informations et actions liées à une demande, pour éviter les allers-retours entre outils."
      mobile={<MobileContent />}
      desktop={<DesktopContent />}
      states={
        <>
          <StateCard type="normal" label="Tarif modifiable">Champ tarif final éditable inline ; l’historique enregistre l’ancienne et la nouvelle valeur.</StateCard>
          <StateCard type="loading" label="Génération du lien Stripe">Bouton en chargement, lien affiché et copiable une fois généré.</StateCard>
          <StateCard type="success" label="Confirmation renvoyée">Confirmation visuelle discrète (toast) après renvoi.</StateCard>
          <StateCard type="warning" label="Annulation">Confirmation demandée avant annulation définitive.</StateCard>
        </>
      }
    />
  );
}
