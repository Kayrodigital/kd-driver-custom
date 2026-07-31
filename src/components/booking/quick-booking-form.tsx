"use client";

import { useState } from "react";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";
import { AddressAutocomplete } from "./address-autocomplete";

type RequestType = "estimate" | "callback";

function toIsoWithOffset(date: string, time: string): string | null {
  if (!date || !time) return null;
  const local = new Date(`${date}T${time}`);
  if (Number.isNaN(local.getTime())) return null;
  return local.toISOString();
}

export function QuickBookingForm() {
  const [pickup, setPickup] = useState<AddressValue>(emptyAddress);
  const [destination, setDestination] = useState<AddressValue>(emptyAddress);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("estimate");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const valid = pickup.address.length >= 3 && destination.address.length >= 3 && Boolean(date) && Boolean(time) && phone.trim().length >= 6;

  async function submit() {
    const pickupAt = toIsoWithOffset(date, time);
    if (!valid || !pickupAt) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          pickup,
          destination,
          pickupAt,
          requestType,
          passengers,
          luggage,
          customer: { firstName: firstName || undefined, email: email || undefined, phone },
          notes,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      sessionStorage.setItem(`reservation:${payload.reference}`, JSON.stringify(payload.summary));
      window.location.assign(`/reservation/confirmation/${payload.reference}`);
    } catch {
      setError("La demande n’a pas pu être envoyée. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="booking-search booking-search--card" aria-labelledby="quick-booking-title">
      <div>
        <p className="eyebrow">Réservation rapide</p>
        <h1 id="quick-booking-title">Demander une course</h1>
      </div>
      <div className="search-fields">
        <AddressAutocomplete label="Adresse de départ" value={pickup} onChange={setPickup} allowGeolocation />
        <AddressAutocomplete label="Destination" value={destination} onChange={setDestination} />
        <label>
          Date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </label>
        <label>
          Heure
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
        </label>
        <label>
          Téléphone
          <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
      </div>

      <fieldset>
        <legend>Que souhaitez-vous ?</legend>
        <label className="check">
          <input type="radio" name="requestType" checked={requestType === "estimate"} onChange={() => setRequestType("estimate")} />
          Demander une estimation
        </label>
        <label className="check">
          <input type="radio" name="requestType" checked={requestType === "callback"} onChange={() => setRequestType("callback")} />
          Être rappelé
        </label>
      </fieldset>

      <details>
        <summary>Informations complémentaires (facultatif)</summary>
        <div className="search-fields">
          <label>
            Prénom
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </label>
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Passagers
            <input type="number" min="1" max="20" value={passengers} onChange={(event) => setPassengers(Number(event.target.value))} />
          </label>
          <label>
            Bagages
            <input type="number" min="0" max="30" value={luggage} onChange={(event) => setLuggage(Number(event.target.value))} />
          </label>
        </div>
        <label>
          Note
          <textarea value={notes} maxLength={1_000} onChange={(event) => setNotes(event.target.value)} />
        </label>
      </details>

      <button type="button" onClick={submit} disabled={!valid || busy}>{busy ? "Envoi…" : "Envoyer ma demande"}</button>
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}
