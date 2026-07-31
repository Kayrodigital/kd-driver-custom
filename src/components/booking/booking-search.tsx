"use client";

import { useCallback, useState } from "react";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";
import { AddressAutocomplete } from "./address-autocomplete";
import type { SearchData, SearchResult } from "./booking-types";

export type BookingSearchVariant = "inline" | "card" | "mobile";

export function BookingSearch({ variant = "card", onComplete }: { variant?: BookingSearchVariant; onComplete(data: SearchData, result: SearchResult): void }) {
  const [pickup, setPickup] = useState<AddressValue>(emptyAddress);
  const [destination, setDestination] = useState<AddressValue>(emptyAddress);
  const [pickupAt, setPickupAt] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [isAirportTrip, setAirportTrip] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const updatePickup = useCallback((value: AddressValue) => setPickup(value), []);
  const updateDestination = useCallback((value: AddressValue) => setDestination(value), []);

  async function search() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/booking/options", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pickup, destination, isAirportTrip }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      onComplete({ pickup, destination, pickupAt, passengers, luggage, isAirportTrip }, result);
    } catch { setError("Impossible de calculer ce trajet. Vérifiez les adresses."); }
    finally { setBusy(false); }
  }

  const valid = pickup.address.length >= 3 && destination.address.length >= 3 && pickupAt;
  return <section className={`booking-search booking-search--${variant}`} aria-labelledby="search-title"><div><p className="eyebrow">Étape 1</p><h1 id="search-title">Rechercher un trajet</h1></div><div className="search-fields"><AddressAutocomplete label="Adresse de départ" value={pickup} onChange={updatePickup} allowGeolocation /><AddressAutocomplete label="Destination" value={destination} onChange={updateDestination} /><label>Date et heure<input type="datetime-local" value={pickupAt} onChange={(event) => setPickupAt(event.target.value)} required /></label><label>Passagers<input type="number" min="1" max="20" value={passengers} onChange={(event) => setPassengers(Number(event.target.value))} /></label><label>Bagages<input type="number" min="0" max="30" value={luggage} onChange={(event) => setLuggage(Number(event.target.value))} /></label></div><label className="check"><input type="checkbox" checked={isAirportTrip} onChange={(event) => setAirportTrip(event.target.checked)} />Trajet aéroport</label><button type="button" onClick={search} disabled={!valid || busy}>{busy ? "Calcul de l’itinéraire…" : "Voir les véhicules"}</button>{error && <p className="error" role="alert">{error}</p>}</section>;
}
