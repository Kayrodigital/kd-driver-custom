"use client";

import { AddressAutocomplete } from "../address-autocomplete";
import { useQuickBooking } from "../use-quick-booking";

/**
 * Version mobile très courte — mêmes 5 champs obligatoires, rien d'autre visible
 * par défaut. Réutilise useQuickBooking.
 */
export function BookingFormMobile() {
  const booking = useQuickBooking();

  return (
    <form className="kd-card kd-booking-card kd-booking-card--compact" onSubmit={(event) => { event.preventDefault(); booking.submit(); }}>
      <div className="kd-fields">
        <AddressAutocomplete label="Départ" value={booking.pickup} onChange={booking.setPickup} allowGeolocation />
        <AddressAutocomplete label="Destination" value={booking.destination} onChange={booking.setDestination} />
        <label className="kd-field">
          <span className="kd-field-label">Date</span>
          <input className="kd-input" type="date" value={booking.date} onChange={(event) => booking.setDate(event.target.value)} required />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Heure</span>
          <input className="kd-input" type="time" value={booking.time} onChange={(event) => booking.setTime(event.target.value)} required />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Téléphone</span>
          <input className="kd-input" type="tel" placeholder="06 12 34 56 78" value={booking.phone} onChange={(event) => booking.setPhone(event.target.value)} required />
        </label>
      </div>

      <button type="submit" className="kd-btn kd-btn--gold kd-btn--block" disabled={!booking.valid || booking.busy}>
        {booking.busy ? "Envoi…" : "Demander une réservation"}
      </button>

      <details>
        <summary className="kd-more-toggle">Ajouter des précisions</summary>
        <div className="kd-more-fields" style={{ marginTop: "var(--kd-space-3)" }}>
          <div className="kd-request-type">
            <label className="kd-radio">
              <input type="radio" name="kd-request-type-mobile" checked={booking.requestType === "estimate"} onChange={() => booking.setRequestType("estimate")} />
              Estimation
            </label>
            <label className="kd-radio">
              <input type="radio" name="kd-request-type-mobile" checked={booking.requestType === "callback"} onChange={() => booking.setRequestType("callback")} />
              Être rappelé
            </label>
          </div>
          <label className="kd-field">
            <span className="kd-field-label">Prénom</span>
            <input className="kd-input" type="text" value={booking.firstName} onChange={(event) => booking.setFirstName(event.target.value)} />
          </label>
        </div>
      </details>

      {booking.error && <p className="kd-field-error" role="alert">{booking.error}</p>}
    </form>
  );
}
