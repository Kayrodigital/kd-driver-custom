"use client";

import { useState } from "react";
import { BookingSearch } from "./booking-search";
import type { PassengerData, SearchData, SearchResult, VehicleOption } from "./booking-types";
import { PassengerForm } from "./passenger-form";
import { VehicleSelection } from "./vehicle-selection";

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState<SearchData | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [vehicle, setVehicle] = useState<VehicleOption | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  async function submit(customer: PassengerData) {
    if (!search || !vehicle) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/reservations", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ idempotencyKey, pickup: search.pickup, destination: search.destination, pickupAt: new Date(search.pickupAt).toISOString(), passengers: search.passengers, luggage: search.luggage, isAirportTrip: search.isAirportTrip, vehicleSlug: vehicle.category, customer, notes: customer.notes }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      sessionStorage.setItem(`reservation:${payload.reference}`, JSON.stringify(payload.summary));
      window.location.assign(`/reservation/confirmation/${payload.reference}`);
    } catch { setError("La réservation n’a pas pu être enregistrée. Réessayez."); }
    finally { setBusy(false); }
  }

  return <div className="booking-flow"><ol className="steps" aria-label="Progression">{["Trajet", "Véhicule", "Passager", "Confirmation"].map((label, index) => <li key={label} aria-current={step === index + 1 ? "step" : undefined}><span>{index + 1}</span>{label}</li>)}</ol>{step === 1 && <BookingSearch variant="card" onComplete={(data, options) => { setSearch(data); setResult(options); setVehicle(null); setStep(2); }} />}{step === 2 && result && <VehicleSelection result={result} selected={vehicle} onSelect={setVehicle} onBack={() => setStep(1)} onContinue={() => setStep(3)} />}{step === 3 && <PassengerForm onBack={() => setStep(2)} onSubmit={submit} busy={busy} />}{error && <p className="error" role="alert">{error}</p>}</div>;
}
