import { ScreenShell, StateCard } from "./screen-shell";

function ConfirmationBody() {
  return (
    <div className="wf-card" style={{ textAlign: "center" }}>
      <div className="wf-icon-dot" style={{ width: 40, height: 40, fontSize: "1.1rem", background: "var(--wf-success-bg)", color: "var(--wf-success)", margin: "0 auto 10px" }}>✓</div>
      <b>Votre demande a bien été transmise.</b>
      <p style={{ fontSize: "0.84rem", color: "var(--wf-muted)", margin: "6px 0 14px" }}>KDRIVE vous confirme rapidement la disponibilité et le tarif.</p>
      <p style={{ fontSize: "0.82rem", margin: "0 0 4px" }}>Référence <b>KD-20260820-A1B2C3</b> · <span className="wf-pill">Devis demandé</span></p>
      <p style={{ fontSize: "0.82rem", color: "var(--wf-muted)" }}>Gare Part-Dieu → Aéroport · 20 août, 15:00 · Berline · Payer au chauffeur</p>
      <div className="wf-chip-row" style={{ justifyContent: "center", marginTop: 14 }}>
        <button className="wf-btn wf-btn--secondary">📞 Appeler</button>
        <button className="wf-btn wf-btn--secondary">WhatsApp</button>
        <button className="wf-btn wf-btn--ghost">+ Ajouter au calendrier</button>
      </div>
      <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
        <button className="wf-btn wf-btn--ghost">Créer un compte pour retrouver cette réservation</button>
        <button className="wf-btn wf-btn--ghost">Retour à l’accueil</button>
      </div>
    </div>
  );
}

export function Screen6() {
  return (
    <ScreenShell
      id="screen-6"
      kicker="Écran 6"
      title="Confirmation"
      lead="Rassurer immédiatement le client, quel que soit le statut réel du tarif (calculé ou sur devis)."
      mobile={<ConfirmationBody />}
      desktop={<div style={{ maxWidth: 560, margin: "0 auto" }}><ConfirmationBody /></div>}
      states={
        <>
          <StateCard type="success" label="Réservation confirmée">« Votre réservation a bien été enregistrée. » — tarif calculé affiché.</StateCard>
          <StateCard type="normal" label="Demande sur devis">« Votre demande a bien été transmise… » — statut « Devis demandé ».</StateCard>
          <StateCard type="warning" label="Paiement en attente">Statut « Lien de paiement envoyé », CTA « Payer maintenant » réaffiché.</StateCard>
          <StateCard type="success" label="Paiement réussi">Statut « Payée », reçu succinct affiché.</StateCard>
          <StateCard type="error" label="Paiement échoué">Message clair + bouton pour réessayer ou choisir « Payer au chauffeur » à la place.</StateCard>
          <StateCard type="normal" label="Confirmation chauffeur en attente">Statut « Nouvelle » ou « Client contacté », message d’attente sans inquiéter le client.</StateCard>
        </>
      }
    />
  );
}
