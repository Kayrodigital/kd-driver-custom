"use client";

import { AddressAutocomplete } from "../../address-autocomplete";
import type { useBookingWizard } from "./use-booking-wizard";

export function StepSearch({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 1 · Trajet</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>Où allez-vous ?</h2>
      </div>
      <div className="kd-fields">
        <AddressAutocomplete label="Départ" value={wizard.pickup} onChange={wizard.setPickup} allowGeolocation />
        <AddressAutocomplete label="Destination" value={wizard.destination} onChange={wizard.setDestination} />
        <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
          <label className="kd-field">
            <span className="kd-field-label">Date</span>
            <input className="kd-input" type="date" value={wizard.date} onChange={(event) => wizard.setDate(event.target.value)} required />
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Heure</span>
            <input className="kd-input" type="time" value={wizard.time} onChange={(event) => wizard.setTime(event.target.value)} required />
          </label>
        </div>
      </div>
      {wizard.sameAddress && <p className="kd-field-error" role="alert">Le départ et la destination sont identiques.</p>}
      {wizard.searchError && <p className="kd-field-error" role="alert">{wizard.searchError}</p>}
      <button type="button" className="kd-btn kd-btn--gold kd-btn--block" disabled={!wizard.searchValid || wizard.searchBusy} onClick={() => void wizard.submitSearch()}>
        {wizard.searchBusy ? "Calcul en cours…" : "Voir les véhicules et les tarifs"}
      </button>
    </div>
  );
}
