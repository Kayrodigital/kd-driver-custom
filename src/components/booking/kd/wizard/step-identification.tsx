"use client";

import type { useBookingWizard } from "./use-booking-wizard";

export function StepIdentification({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 4 · Vos coordonnées</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>Continuer sans compte</h2>
        <p className="kd-body" style={{ marginTop: 6 }}>Seul le téléphone est nécessaire pour envoyer votre demande.</p>
      </div>

      <div className="kd-fields">
        <label className="kd-field">
          <span className="kd-field-label">Téléphone</span>
          <input className="kd-input" type="tel" placeholder="06 12 34 56 78" value={wizard.phone} onChange={(event) => wizard.setPhone(event.target.value)} required />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Prénom (facultatif)</span>
          <input className="kd-input" type="text" value={wizard.firstName} onChange={(event) => wizard.setFirstName(event.target.value)} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">E-mail (facultatif)</span>
          <input className="kd-input" type="email" value={wizard.email} onChange={(event) => wizard.setEmail(event.target.value)} />
        </label>
      </div>

      <label className="kd-checkbox-row">
        <input type="checkbox" checked={wizard.termsAccepted} onChange={(event) => wizard.setTermsAccepted(event.target.checked)} />
        J’accepte les conditions de réservation
      </label>

      <div className="kd-actions" style={{ display: "flex", gap: 10 }}>
        <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.setStep(3)}>Retour</button>
        <button type="button" className="kd-btn kd-btn--gold" style={{ flex: 1 }} disabled={!wizard.identificationValid} onClick={wizard.confirmIdentification}>Continuer</button>
      </div>
    </div>
  );
}
