"use client";

import { AddressAutocomplete } from "./address-autocomplete";
import { useQuickBooking } from "./use-quick-booking";

export function QuickBookingForm() {
  const booking = useQuickBooking();

  return (
    <section className="booking-search booking-search--card" aria-labelledby="quick-booking-title">
      <div>
        <p className="eyebrow">Réservation rapide</p>
        <h1 id="quick-booking-title">Demander une course</h1>
      </div>
      <div className="search-fields">
        <AddressAutocomplete label="Adresse de départ" value={booking.pickup} onChange={booking.setPickup} allowGeolocation />
        <AddressAutocomplete label="Destination" value={booking.destination} onChange={booking.setDestination} />
        <label>
          Date
          <input type="date" value={booking.date} onChange={(event) => booking.setDate(event.target.value)} required />
        </label>
        <label>
          Heure
          <input type="time" value={booking.time} onChange={(event) => booking.setTime(event.target.value)} required />
        </label>
        <label>
          Téléphone
          <input type="tel" value={booking.phone} onChange={(event) => booking.setPhone(event.target.value)} required />
        </label>
      </div>

      <fieldset>
        <legend>Que souhaitez-vous ?</legend>
        <label className="check">
          <input type="radio" name="requestType" checked={booking.requestType === "estimate"} onChange={() => booking.setRequestType("estimate")} />
          Demander une estimation
        </label>
        <label className="check">
          <input type="radio" name="requestType" checked={booking.requestType === "callback"} onChange={() => booking.setRequestType("callback")} />
          Être rappelé
        </label>
      </fieldset>

      <details>
        <summary>Informations complémentaires (facultatif)</summary>
        <div className="search-fields">
          <label>
            Prénom
            <input type="text" value={booking.firstName} onChange={(event) => booking.setFirstName(event.target.value)} />
          </label>
          <label>
            E-mail
            <input type="email" value={booking.email} onChange={(event) => booking.setEmail(event.target.value)} />
          </label>
          <label>
            Passagers
            <input type="number" min="1" max="20" value={booking.passengers} onChange={(event) => booking.setPassengers(Number(event.target.value))} />
          </label>
          <label>
            Bagages
            <input type="number" min="0" max="30" value={booking.luggage} onChange={(event) => booking.setLuggage(Number(event.target.value))} />
          </label>
        </div>
        <label>
          Note
          <textarea value={booking.notes} maxLength={1_000} onChange={(event) => booking.setNotes(event.target.value)} />
        </label>
      </details>

      <button type="button" onClick={booking.submit} disabled={!booking.valid || booking.busy}>{booking.busy ? "Envoi…" : "Envoyer ma demande"}</button>
      {booking.error && <p className="error" role="alert">{booking.error}</p>}
    </section>
  );
}
