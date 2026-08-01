"use client";

import { useRef } from "react";
import { AddressAutocomplete } from "../../address-autocomplete";
import { toDateInputValue } from "@/domain/booking/booking-defaults";
import { TimeSlotPicker } from "./time-slot-picker";
import type { useBookingWizard } from "./use-booking-wizard";

export function StepSearch({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const today = toDateInputValue(new Date());

  function openDatePicker() {
    try {
      dateInputRef.current?.showPicker?.();
    } catch {
      dateInputRef.current?.focus();
    }
  }

  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 1 · Trajet</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>Où allez-vous ?</h2>
      </div>
      <div className="kd-fields">
        <AddressAutocomplete label="Départ" value={wizard.pickup} onChange={wizard.setPickup} allowGeolocation />
        <AddressAutocomplete label="Destination" value={wizard.destination} onChange={wizard.setDestination} showPopularDestinations />
        <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
          <label className="kd-field" onClick={openDatePicker}>
            <span className="kd-field-label">Date</span>
            <input
              ref={dateInputRef}
              className="kd-input"
              type="date"
              min={today}
              value={wizard.date}
              onChange={(event) => wizard.setDate(event.target.value)}
              required
            />
          </label>
          <TimeSlotPicker label="Heure" date={wizard.date} value={wizard.time} onChange={wizard.setTime} />
        </div>
      </div>
      <p className="kd-field-hint">Réservation possible à partir de {wizard.firstAvailableTime}.</p>
      {wizard.sameAddress && <p className="kd-field-error" role="alert">Le départ et la destination sont identiques.</p>}
      {wizard.searchError && <p className="kd-field-error" role="alert">{wizard.searchError}</p>}
      <button type="button" className="kd-btn kd-btn--gold kd-btn--block" disabled={!wizard.searchValid || wizard.searchBusy} onClick={() => void wizard.submitSearch()}>
        {wizard.searchBusy ? "Calcul en cours…" : "Voir les véhicules et les tarifs"}
      </button>
    </div>
  );
}
