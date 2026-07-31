"use client";

import { AddressAutocomplete } from "../address-autocomplete";
import { useQuickBooking } from "../use-quick-booking";

/**
 * Variante B (hero à droite) et carte de réservation des pages commerciales.
 * Réutilise useQuickBooking — même logique que /reserver et la variante inline.
 */
export function BookingFormCard({ tone = "light" }: { tone?: "light" | "dark" }) {
  const booking = useQuickBooking();

  return (
    <form
      className={`kd-card ${tone === "dark" ? "kd-card--dark" : ""} kd-booking-card`}
      onSubmit={(event) => { event.preventDefault(); booking.submit(); }}
    >
      <div>
        <p className="kd-eyebrow">Réservation</p>
        <h3 className="kd-h3" style={{ marginTop: 8 }}>Votre trajet en quelques secondes</h3>
      </div>

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
              <input type="radio" name="kd-request-type-card" checked={booking.requestType === "estimate"} onChange={() => booking.setRequestType("estimate")} />
              Demander une estimation
            </label>
            <label className="kd-radio">
              <input type="radio" name="kd-request-type-card" checked={booking.requestType === "callback"} onChange={() => booking.setRequestType("callback")} />
              Être rappelé
            </label>
          </div>
          <label className="kd-field">
            <span className="kd-field-label">Prénom</span>
            <input className="kd-input" type="text" value={booking.firstName} onChange={(event) => booking.setFirstName(event.target.value)} />
          </label>
          <label className="kd-field">
            <span className="kd-field-label">E-mail</span>
            <input className="kd-input" type="email" value={booking.email} onChange={(event) => booking.setEmail(event.target.value)} />
          </label>
          <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
            <label className="kd-field">
              <span className="kd-field-label">Passagers</span>
              <input className="kd-input" type="number" min="1" max="20" value={booking.passengers} onChange={(event) => booking.setPassengers(Number(event.target.value))} />
            </label>
            <label className="kd-field">
              <span className="kd-field-label">Bagages</span>
              <input className="kd-input" type="number" min="0" max="30" value={booking.luggage} onChange={(event) => booking.setLuggage(Number(event.target.value))} />
            </label>
          </div>
        </div>
      </details>

      {booking.error && <p className="kd-field-error" role="alert">{booking.error}</p>}
    </form>
  );
}
