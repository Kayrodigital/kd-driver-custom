import { ScreenShell, StateCard } from "./screen-shell";

function SummaryAccordion() {
  return (
    <div className="wf-card">
      <b>▾ Trajet</b>
      <p style={{ fontSize: "0.84rem", margin: "6px 0 0" }}>Gare Part-Dieu → Aéroport Lyon-Saint Exupéry<br />20 août 2026, 15:00 · 34,8 km · ≈ 36 min</p>
    </div>
  );
}
function DetailsAccordion() {
  return (
    <div className="wf-card">
      <b>▾ Véhicule et options</b>
      <p style={{ fontSize: "0.84rem", margin: "6px 0 0" }}>Berline · 2 passagers · 1 bagage<br />Aucune option sélectionnée</p>
    </div>
  );
}
function ContactAccordion() {
  return (
    <div className="wf-card">
      <b>▾ Contact</b>
      <p style={{ fontSize: "0.84rem", margin: "6px 0 0" }}>06 12 34 56 78 · e-mail non renseigné</p>
    </div>
  );
}

function PaymentChoice() {
  return (
    <div className="wf-card">
      <b>Mode de paiement</b>
      <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
        <label className="wf-chip is-active" style={{ display: "flex", justifyContent: "space-between" }}>Payer au chauffeur <span className="wf-pill">Recommandé</span></label>
        <label className="wf-chip" style={{ display: "flex" }}>Payer en ligne (Stripe, facultatif)</label>
        <label className="wf-chip" style={{ display: "flex" }}>Recevoir d’abord la confirmation KD Driver</label>
      </div>
    </div>
  );
}

function MobileContent() {
  return (
    <>
      <SummaryAccordion />
      <DetailsAccordion />
      <ContactAccordion />
      <PaymentChoice />
      <div className="wf-sticky-bar">
        <p style={{ fontSize: "0.82rem", color: "var(--wf-muted)", margin: "0 0 8px" }}>Total estimé : <b style={{ color: "var(--wf-ink)" }}>27,50 €</b></p>
        <button className="wf-btn wf-btn--primary wf-btn--block">Confirmer la réservation</button>
      </div>
    </>
  );
}

function DesktopContent() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "60% 40%", gap: 24 }}>
      <div>
        <PaymentChoice />
        <button className="wf-btn wf-btn--primary" style={{ marginTop: 12 }}>Confirmer la réservation</button>
      </div>
      <div style={{ position: "sticky", top: 16, display: "grid", gap: 10 }}>
        <SummaryAccordion />
        <DetailsAccordion />
        <ContactAccordion />
      </div>
    </div>
  );
}

export function Screen5() {
  return (
    <ScreenShell
      id="screen-5"
      kicker="Écran 5"
      title="Récapitulatif et paiement"
      lead="Vérifier la réservation avant validation. Le paiement au chauffeur est le choix par défaut ; Stripe reste facultatif et ne bloque jamais une réservation, y compris sur devis."
      mobile={<MobileContent />}
      desktop={<DesktopContent />}
      states={
        <>
          <StateCard type="normal" label="Cas standard">Bouton « Confirmer la réservation », tarif affiché.</StateCard>
          <StateCard type="normal" label="Cas sur devis">Bouton « Envoyer la demande de devis » à la place du tarif ; aucun déclenchement Stripe.</StateCard>
          <StateCard type="normal" label="Paiement en ligne choisi">Bouton « Payer et confirmer » ; le prix est recalculé côté serveur avant toute session de paiement.</StateCard>
          <StateCard type="loading" label="Envoi en cours">Bouton en état chargement, résumé verrouillé en lecture seule.</StateCard>
          <StateCard type="error" label="Erreur d’envoi">Message au-dessus de la barre d’action, données du formulaire conservées, nouvel essai possible.</StateCard>
        </>
      }
    />
  );
}
