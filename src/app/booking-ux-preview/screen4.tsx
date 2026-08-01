import { ScreenShell, StateCard } from "./screen-shell";

function GuestForm() {
  return (
    <div className="wf-card">
      <div className="wf-pill wf-pill--accent" style={{ marginBottom: 10 }}>Parcours par défaut</div>
      <b>Continuer sans compte</b>
      <div style={{ marginTop: 10 }}>
        <div className="wf-field"><span className="wf-field-label">Téléphone (obligatoire)</span><div className="wf-input">06 12 34 56 78</div></div>
        <div className="wf-field"><span className="wf-field-label">Prénom (facultatif)</span><div className="wf-input">Facultatif</div></div>
        <div className="wf-field"><span className="wf-field-label">E-mail (facultatif)</span><div className="wf-input">Facultatif</div></div>
        <label className="wf-chip" style={{ display: "inline-flex", width: "fit-content" }}>☐ J’accepte les conditions</label>
      </div>
      <button className="wf-btn wf-btn--primary wf-btn--block" style={{ marginTop: 12 }}>Continuer</button>
    </div>
  );
}

function GoogleOption() {
  return (
    <div className="wf-card" style={{ background: "var(--wf-bg-alt)" }}>
      <span className="wf-pill">Option secondaire</span>
      <button className="wf-btn wf-btn--secondary wf-btn--block" style={{ marginTop: 10 }}>G Continuer avec Google</button>
      <p style={{ fontSize: "0.78rem", color: "var(--wf-muted)", margin: "8px 0 0" }}>Récupère prénom, nom, e-mail, avatar (facultatif). Jamais obligatoire.</p>
    </div>
  );
}

function MobileContent() {
  return (
    <>
      <GuestForm />
      <div style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--wf-muted)", margin: "10px 0" }}>ou</div>
      <GoogleOption />
    </>
  );
}

function DesktopContent() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
      <GuestForm />
      <GoogleOption />
    </div>
  );
}

export function Screen4() {
  return (
    <ScreenShell
      id="screen-4"
      kicker="Écran 4"
      title="Identification minimale"
      lead="Continuer avec le minimum de friction. Le parcours invité reste le chemin principal ; Google est une option secondaire, jamais requise."
      mobile={<MobileContent />}
      desktop={<DesktopContent />}
      states={
        <>
          <StateCard type="loading" label="Connexion en cours">Bouton Google en état chargement, formulaire invité désactivé le temps de la réponse.</StateCard>
          <StateCard type="warning" label="Pop-up bloqué">Message « La fenêtre Google n’a pas pu s’ouvrir » + retour immédiat au formulaire invité.</StateCard>
          <StateCard type="warning" label="Compte Google refusé">Message neutre, aucun blocage, focus reramené sur le formulaire invité.</StateCard>
          <StateCard type="warning" label="E-mail indisponible">Si Google ne renvoie pas d’e-mail, le champ e-mail reste vide et modifiable manuellement (facultatif).</StateCard>
          <StateCard type="normal" label="Utilisateur déjà existant">Prénom/e-mail pré-remplis à partir du compte existant, téléphone toujours demandé/vérifié.</StateCard>
          <StateCard type="error" label="Session expirée">Retour au formulaire invité avec les champs déjà saisis conservés (téléphone, prénom, e-mail).</StateCard>
        </>
      }
    />
  );
}
