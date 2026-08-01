"use client";

import { useRef, useState } from "react";
import { AddressAutocomplete } from "../../address-autocomplete";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";
import { defaultBookingDateTime, toDateInputValue } from "@/domain/booking/booking-defaults";
import { TimeSlotPicker } from "./time-slot-picker";
import { storeSearchPrefill } from "./use-booking-wizard";

/**
 * Formulaire de recherche affiché en hero (accueil). Ne réserve pas
 * directement : transmet le trajet à /reserver qui poursuit à l'étape 2
 * (véhicules) sans perte de données, via storeSearchPrefill.
 */
export function HeroSearchForm({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const [defaults] = useState(() => defaultBookingDateTime(new Date()));
  const [pickup, setPickup] = useState<AddressValue>(emptyAddress);
  const [destination, setDestination] = useState<AddressValue>(emptyAddress);
  const [date, setDate] = useState(defaults.date);
  const [time, setTime] = useState(defaults.time);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const today = toDateInputValue(new Date());

  function openDatePicker() {
    try {
      dateInputRef.current?.showPicker?.();
    } catch {
      dateInputRef.current?.focus();
    }
  }

  const sameAddress = pickup.address.trim().toLowerCase() === destination.address.trim().toLowerCase() && pickup.address.trim().length > 0;
  const valid = pickup.address.length >= 3 && destination.address.length >= 3 && Boolean(date) && Boolean(time) && !sameAddress;

  function goToReserver() {
    if (!valid) return;
    storeSearchPrefill({ pickup, destination, date, time });
    window.location.assign("/reserver");
  }

  return (
    <form
      className={`kd-card ${tone === "dark" ? "kd-card--dark" : ""} kd-booking-card`}
      onSubmit={(event) => { event.preventDefault(); goToReserver(); }}
    >
      <div>
        <p className="kd-eyebrow">Réservation</p>
        <h3 className="kd-h3" style={{ marginTop: 8 }}>Votre trajet en quelques secondes</h3>
      </div>

      <div className="kd-fields">
        <AddressAutocomplete label="Départ" value={pickup} onChange={setPickup} allowGeolocation />
        <AddressAutocomplete label="Destination" value={destination} onChange={setDestination} showPopularDestinations />
        <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
          <label className="kd-field" onClick={openDatePicker}>
            <span className="kd-field-label">Date</span>
            <input
              ref={dateInputRef}
              className="kd-input"
              type="date"
              min={today}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>
          <TimeSlotPicker label="Heure" date={date} value={time} onChange={setTime} />
        </div>
      </div>

      {sameAddress && <p className="kd-field-error" role="alert">Le départ et la destination sont identiques.</p>}

      <button type="submit" className="kd-btn kd-btn--gold kd-btn--block" disabled={!valid}>
        Voir les véhicules et les tarifs
      </button>
    </form>
  );
}
