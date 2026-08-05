"use client";

import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import type { useBookingWizard } from "./use-booking-wizard";

export function StepOptions({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  const vehicle = vehicleCatalog.find((v) => v.slug === wizard.vehicleSlug);
  const capacityExceeded = Boolean(vehicle && (wizard.passengers > vehicle.passengers || wizard.luggage > vehicle.luggage));

  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 3 · Options</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>Précisions sur votre trajet</h2>
      </div>

      <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
        <label className="kd-field">
          <span className="kd-field-label">Passagers</span>
          <input className="kd-input" type="number" min={1} max={20} value={wizard.passengers} onChange={(event) => wizard.setPassengers(Number(event.target.value))} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Bagages</span>
          <input className="kd-input" type="number" min={0} max={30} value={wizard.luggage} onChange={(event) => wizard.setLuggage(Number(event.target.value))} />
        </label>
      </div>

      {capacityExceeded && (
        <p className="kd-field-error" role="alert">
          {vehicle?.label} : capacité conseillée {vehicle?.passengers} passagers / {vehicle?.luggage} bagages. Vous pouvez continuer, KDRIVE confirmera si besoin.
        </p>
      )}

      <details>
        <summary className="kd-more-toggle">Ajouter des options</summary>
        <div className="kd-more-fields" style={{ marginTop: "var(--kd-space-3)", display: "grid", gap: 12 }}>
          <label className="kd-checkbox-row"><input type="checkbox" checked={wizard.childSeat} onChange={(event) => wizard.setChildSeat(event.target.checked)} /> Siège enfant</label>
          <label className="kd-checkbox-row"><input type="checkbox" checked={wizard.pet} onChange={(event) => wizard.setPet(event.target.checked)} /> Animal</label>
          <label className="kd-checkbox-row"><input type="checkbox" checked={wizard.wheelchair} onChange={(event) => wizard.setWheelchair(event.target.checked)} /> Fauteuil roulant</label>
          {wizard.wheelchair && (
            <p className="kd-field-hint" style={{ margin: 0 }}>
              Merci de préciser vos besoins afin que KDRIVE puisse vérifier la disponibilité d’un véhicule adapté.
            </p>
          )}

          <label className="kd-field">
            <span className="kd-field-label">Arrêt supplémentaire</span>
            <input className="kd-input" type="text" value={wizard.extraStop} onChange={(event) => wizard.setExtraStop(event.target.value)} placeholder="Adresse ou lieu (facultatif)" />
          </label>

          {wizard.isAirportTrip && (
            <label className="kd-field">
              <span className="kd-field-label">Numéro de vol</span>
              <input className="kd-input" type="text" value={wizard.flightNumber} onChange={(event) => wizard.setFlightNumber(event.target.value)} placeholder="AF1234" />
            </label>
          )}
          {wizard.isStationTrip && (
            <label className="kd-field">
              <span className="kd-field-label">Numéro de train</span>
              <input className="kd-input" type="text" value={wizard.trainNumber} onChange={(event) => wizard.setTrainNumber(event.target.value)} placeholder="TGV 6543" />
            </label>
          )}

          <label className="kd-checkbox-row"><input type="checkbox" checked={wizard.forSomeoneElse} onChange={(event) => wizard.setForSomeoneElse(event.target.checked)} /> Réservation pour une autre personne</label>
          {wizard.forSomeoneElse && (
            <div className="kd-fields" style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
              <label className="kd-field"><span className="kd-field-label">Prénom du passager</span><input className="kd-input" type="text" value={wizard.otherFirstName} onChange={(event) => wizard.setOtherFirstName(event.target.value)} /></label>
              <label className="kd-field"><span className="kd-field-label">Téléphone du passager</span><input className="kd-input" type="tel" value={wizard.otherPhone} onChange={(event) => wizard.setOtherPhone(event.target.value)} /></label>
            </div>
          )}

          <label className="kd-field">
            <span className="kd-field-label">Commentaire pour le chauffeur</span>
            <textarea className="kd-input" value={wizard.notes} maxLength={1_000} onChange={(event) => wizard.setNotes(event.target.value)} />
          </label>
        </div>
      </details>

      <div className="kd-actions" style={{ display: "flex", gap: 10 }}>
        <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.setStep(2)}>Retour</button>
        <button type="button" className="kd-btn kd-btn--gold" style={{ flex: 1 }} onClick={wizard.confirmOptions}>Continuer</button>
      </div>
    </div>
  );
}
