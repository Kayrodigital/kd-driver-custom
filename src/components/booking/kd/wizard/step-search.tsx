"use client";

import { useEffect, useRef, useState } from "react";
import { AddressAutocomplete } from "../../address-autocomplete";
import { toDateInputValue } from "@/domain/booking/booking-defaults";
import { TimeSlotPicker } from "./time-slot-picker";
import type { useBookingWizard } from "./use-booking-wizard";

export function StepSearch({ wizard, locale = "fr" }: { wizard: ReturnType<typeof useBookingWizard>; locale?: "fr" | "en" }) {
  const en = locale === "en";
  const dateInputRef = useRef<HTMLInputElement>(null);
  // "" au premier rendu (identique au HTML statique généré au build), la
  // vraie date du jour n'est posée qu'après montage côté client (cf.
  // commentaire dans use-booking-wizard.ts sur l'erreur d'hydratation #418).
  const [today, setToday] = useState("");
  // eslint-disable-next-line react-hooks/set-state-in-effect -- valeur client-only (new Date()), cf. use-booking-wizard.ts
  useEffect(() => { setToday(toDateInputValue(new Date())); }, []);

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
        <p className="kd-eyebrow">{en ? "Step 1 · Journey" : "Étape 1 · Trajet"}</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>{en ? "Where are you going?" : "Où allez-vous ?"}</h2>
      </div>
      <div className="kd-fields">
        <AddressAutocomplete label={en ? "Pickup" : "Départ"} value={wizard.pickup} onChange={wizard.setPickup} allowGeolocation locale={locale} />
        <AddressAutocomplete label="Destination" value={wizard.destination} onChange={wizard.setDestination} showPopularDestinations locale={locale} />
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
          <TimeSlotPicker label={en ? "Time" : "Heure"} date={wizard.date} value={wizard.time} onChange={wizard.setTime} locale={locale} />
        </div>
      </div>
      {wizard.firstAvailableTime && <p className="kd-field-hint">{en ? `Bookings available from ${wizard.firstAvailableTime}.` : `Réservation possible à partir de ${wizard.firstAvailableTime}.`}</p>}
      {wizard.sameAddress && <p className="kd-field-error" role="alert">{en ? "Pickup and destination cannot be the same." : "Le départ et la destination sont identiques."}</p>}
      {wizard.searchError && <p className="kd-field-error" role="alert">{wizard.searchError}</p>}
      <button type="button" className="kd-btn kd-btn--gold kd-btn--block" disabled={!wizard.searchValid || wizard.searchBusy} onClick={() => void wizard.submitSearch()}>
        {wizard.searchBusy ? (en ? "Calculating…" : "Recherche en cours…") : (en ? "Choose a vehicle" : "Choisir ma catégorie")}
      </button>
    </div>
  );
}
