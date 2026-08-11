"use client";

import { useEffect, useRef } from "react";
import type { useBookingWizard } from "./use-booking-wizard";

/**
 * Dernière étape : porte directement l'envoi de la demande (l'ancienne
 * étape récapitulatif-tarif a disparu, plus aucun prix à afficher côté
 * public — cf. sprint "nouveau parcours sans prix").
 */
export function StepIdentification({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (wizard.submitError) errorRef.current?.focus();
  }, [wizard.submitError]);

  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 3 · Vos coordonnées</p>
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

      <p className="kd-field-hint">
        Après réception de votre demande, KDRIVE vous contacte par téléphone pour vous communiquer votre tarif et confirmer votre réservation.
      </p>

      {wizard.submitError && <p ref={errorRef} className="kd-field-error" role="alert" tabIndex={-1}>{wizard.submitError}</p>}

      <div className="kd-actions" style={{ display: "flex", gap: 10 }}>
        <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.setStep(2)}>Retour</button>
        <button
          type="button"
          className="kd-btn kd-btn--gold"
          style={{ flex: 1 }}
          disabled={!wizard.identificationValid || wizard.submitBusy}
          aria-busy={wizard.submitBusy}
          onClick={() => void wizard.submitReservation()}
        >
          {wizard.submitBusy && <span className="kd-btn-spinner" aria-hidden="true" />}
          {wizard.submitBusy ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
      </div>
    </div>
  );
}
