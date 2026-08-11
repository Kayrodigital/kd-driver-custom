"use client";

import { useState } from "react";
import Link from "next/link";
import { AddressAutocomplete } from "@/components/booking/address-autocomplete";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";
import { vehicleCatalog, type VehicleSlug } from "@/domain/pricing/vehicle-catalog";
import { formatEuros } from "@/domain/pricing/money";
import { minimumApplied, tripTypeLabel } from "@/domain/pricing/pricing-display";
import { calculateStandalonePrice, createReservationFromCalculation, type StandaloneCalculationResult } from "./actions";

const today = () => new Date().toISOString().slice(0, 10);

export function CalculatorForm() {
  const [pickup, setPickup] = useState<AddressValue>(emptyAddress);
  const [destination, setDestination] = useState<AddressValue>(emptyAddress);
  const [category, setCategory] = useState<VehicleSlug>("essential");
  const [date, setDate] = useState(today());
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [flightNumber, setFlightNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<StandaloneCalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const valid = pickup.address.length >= 3 && destination.address.length >= 3;

  async function calculate() {
    if (!valid) return;
    setBusy(true);
    setResult(null);
    setCopied(false);
    try {
      const outcome = await calculateStandalonePrice({ pickup, destination, category, flightNumber });
      setResult(outcome);
    } finally {
      setBusy(false);
    }
  }

  async function copyPrice() {
    if (!result?.ok) return;
    const vehicle = vehicleCatalog.find((v) => v.slug === category);
    const amount = result.pricing.totalCents !== null ? formatEuros(result.pricing.totalCents) : "Sur devis";
    const text = `KDRIVE — ${vehicle?.label ?? category}\n${pickup.address} → ${destination.address}\n${(result.distanceMeters / 1000).toFixed(1)} km · ≈ ${Math.round(result.durationSeconds / 60)} min\nTarif : ${amount}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <div className="kd-admin-fiche">
      <div className="kd-card kd-admin-fiche-section" style={{ display: "grid", gap: 12 }}>
        <h2 className="kd-h4">Trajet</h2>
        <AddressAutocomplete label="Départ" value={pickup} onChange={setPickup} allowGeolocation />
        <AddressAutocomplete label="Destination" value={destination} onChange={setDestination} />

        <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
          <label className="kd-field">
            <span className="kd-field-label">Date</span>
            <input className="kd-input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Heure</span>
            <input className="kd-input" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </label>
        </div>

        <label className="kd-field">
          <span className="kd-field-label">Catégorie</span>
          <select className="kd-input kd-select" value={category} onChange={(event) => setCategory(event.target.value as VehicleSlug)}>
            {vehicleCatalog.map((vehicle) => (
              <option key={vehicle.slug} value={vehicle.slug}>{vehicle.label}</option>
            ))}
          </select>
        </label>

        <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
          <label className="kd-field">
            <span className="kd-field-label">Passagers</span>
            <input className="kd-input" type="number" min={1} max={20} value={passengers} onChange={(event) => setPassengers(Number(event.target.value))} />
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Bagages</span>
            <input className="kd-input" type="number" min={0} max={30} value={luggage} onChange={(event) => setLuggage(Number(event.target.value))} />
          </label>
        </div>

        <label className="kd-field">
          <span className="kd-field-label">Numéro de vol (si pertinent)</span>
          <input className="kd-input" type="text" value={flightNumber} onChange={(event) => setFlightNumber(event.target.value)} placeholder="AF1234" />
        </label>

        <label className="kd-field">
          <span className="kd-field-label">Options / commentaire</span>
          <textarea className="kd-input" value={notes} maxLength={1_000} onChange={(event) => setNotes(event.target.value)} />
        </label>

        <button type="button" className="kd-btn kd-btn--gold kd-btn--block" disabled={!valid || busy} aria-busy={busy} onClick={() => void calculate()}>
          {busy ? "Calcul en cours…" : "Calculer le tarif"}
        </button>
      </div>

      <div className="kd-card kd-admin-fiche-section">
        <h2 className="kd-h4">Résultat</h2>

        {!result && <p className="kd-body" style={{ color: "var(--kd-muted)" }}>Renseignez le trajet puis lancez le calcul.</p>}

        {result && !result.ok && <p className="kd-field-error" role="alert">{result.error}</p>}

        {result?.ok && (
          <>
            <p className="kd-admin-fiche-row"><span>Distance</span><span>{(result.distanceMeters / 1000).toFixed(1)} km</span></p>
            <p className="kd-admin-fiche-row"><span>Durée</span><span>≈ {Math.round(result.durationSeconds / 60)} min</span></p>
            <p className="kd-admin-fiche-row"><span>Type de trajet</span><span>{tripTypeLabel(result.pricing.tripType) ?? "—"}</span></p>
            <p className="kd-admin-fiche-row"><span>Minimum appliqué</span><span>{minimumApplied(result.pricing) ? "Oui" : "Non"}</span></p>
            <p className="kd-admin-fiche-row">
              <span>Tarif recommandé</span>
              <span style={{ fontWeight: 700 }}>{result.pricing.totalCents !== null ? formatEuros(result.pricing.totalCents) : "Sur devis"}</span>
            </p>

            {result.pricing.lines.length > 0 && (
              <details>
                <summary className="kd-more-toggle">Détail du calcul</summary>
                <ul className="kd-price-detail">
                  {result.pricing.lines.map((line) => (
                    <li key={line.code}><span>{line.label}</span><span>{formatEuros(line.amountCents)}</span></li>
                  ))}
                </ul>
              </details>
            )}

            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              <button type="button" className="kd-btn kd-btn--outline kd-btn--block" onClick={() => void copyPrice()}>
                {copied ? "Copié ✓" : "Copier le tarif"}
              </button>
              <button type="button" className="kd-btn kd-btn--outline kd-btn--block" onClick={() => setShowCreateForm((v) => !v)}>
                Créer une réservation à partir de ce calcul
              </button>
              <Link href="/admin" className="kd-btn kd-btn--outline kd-btn--block">Fermer</Link>
            </div>

            {showCreateForm && (
              <form action={createReservationFromCalculation} style={{ marginTop: 12, display: "grid", gap: 10 }}>
                <input type="hidden" name="pickupAddress" value={pickup.address} />
                <input type="hidden" name="pickupLat" value={pickup.latitude ?? ""} />
                <input type="hidden" name="pickupLng" value={pickup.longitude ?? ""} />
                <input type="hidden" name="pickupPlaceId" value={pickup.placeId ?? ""} />
                <input type="hidden" name="destinationAddress" value={destination.address} />
                <input type="hidden" name="destinationLat" value={destination.latitude ?? ""} />
                <input type="hidden" name="destinationLng" value={destination.longitude ?? ""} />
                <input type="hidden" name="destinationPlaceId" value={destination.placeId ?? ""} />
                <input type="hidden" name="category" value={category} />
                <input type="hidden" name="flightNumber" value={flightNumber} />
                <input type="hidden" name="date" value={date} />
                <input type="hidden" name="time" value={time} />
                <input type="hidden" name="passengers" value={passengers} />
                <input type="hidden" name="luggage" value={luggage} />
                <input type="hidden" name="notes" value={notes} />

                <p className="kd-field-hint" style={{ margin: 0 }}>Coordonnées du client pour créer la réservation :</p>
                <label className="kd-field">
                  <span className="kd-field-label">Prénom (facultatif)</span>
                  <input className="kd-input" type="text" name="customerFirstName" value={customerFirstName} onChange={(event) => setCustomerFirstName(event.target.value)} />
                </label>
                <label className="kd-field">
                  <span className="kd-field-label">Téléphone</span>
                  <input className="kd-input" type="tel" name="customerPhone" required minLength={6} value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} />
                </label>
                {!date || !time ? <p className="kd-field-error" role="alert">Renseignez la date et l’heure du trajet avant de créer la réservation.</p> : null}
                <button type="submit" className="kd-btn kd-btn--gold kd-btn--block" disabled={!date || !time}>Créer la réservation</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
