"use client";

import { SceneImage } from "@/app/design-preview/scene-image";
import { vehicleCatalog, VEHICLE_EXAMPLES_DISCLAIMER, type VehicleSlug } from "@/domain/pricing/vehicle-catalog";
import { RouteMap } from "./route-map";
import type { useBookingWizard } from "./use-booking-wizard";

/**
 * Fusion des anciennes étapes "Véhicule" et "Options" (5 étapes → 3) :
 * la catégorie choisie n'affiche plus aucun prix calculé, seulement le
 * point de départ indicatif du catalogue ("à partir de X €", statique).
 */
export function StepReservation({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  const vehicle = vehicleCatalog.find((v) => v.slug === wizard.vehicleSlug);
  const capacityExceeded = Boolean(vehicle && (wizard.passengers > vehicle.passengers || wizard.luggage > vehicle.luggage));

  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 2 · Votre réservation</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>Choisissez votre catégorie</h2>
      </div>

      {wizard.route && (
        <div className="kd-card kd-card--flat" style={{ padding: 14 }}>
          <p style={{ fontSize: "0.86rem", margin: 0 }}>{wizard.pickup.address} → {wizard.destination.address}</p>
          <p style={{ fontSize: "0.8rem", color: "var(--kd-muted)", margin: "4px 0 0" }}>
            {(wizard.route.distanceMeters / 1000).toFixed(1)} km · ≈ {Math.round(wizard.route.durationSeconds / 60)} min · {wizard.date} à {wizard.time}
          </p>
        </div>
      )}

      <RouteMap pickup={wizard.pickup} destination={wizard.destination} route={wizard.route} />

      <div style={{ display: "grid", gap: 12 }}>
        {vehicleCatalog.map((option) => {
          const isSelected = wizard.vehicleSlug === option.slug;
          return (
            <button
              key={option.slug}
              type="button"
              className={`kd-card kd-card--hover kd-wizard-vehicle-card ${isSelected ? "is-selected" : ""}`}
              style={{ textAlign: "left", cursor: "pointer", border: isSelected ? "2px solid var(--kd-gold)" : undefined }}
              onClick={() => wizard.selectVehicle(option.slug as VehicleSlug)}
            >
              <SceneImage className="kd-wizard-vehicle-card-image" src={option.image} alt={option.label} note="photo à venir" style={{ minHeight: 80, borderRadius: "var(--kd-radius-md)", margin: 0 }} />
              <div className="kd-wizard-vehicle-card-body" style={{ minWidth: 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                  <b>{option.label}</b>
                  <span style={{ color: "var(--kd-gold)", fontWeight: 700, fontSize: "0.88rem" }}>À partir de {option.fromPriceEuros} €</span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--kd-muted)", margin: "4px 0 0" }}>{option.examples.join(" · ")}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--kd-muted)", margin: "2px 0 0" }}>{option.passengers} passagers · {option.luggage} bagages</p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="kd-field-hint">{VEHICLE_EXAMPLES_DISCLAIMER}</p>

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
            <span className="kd-field-label">Informations complémentaires</span>
            <textarea className="kd-input" value={wizard.notes} maxLength={1_000} onChange={(event) => wizard.setNotes(event.target.value)} />
          </label>
        </div>
      </details>

      <div className="kd-actions" style={{ display: "flex", gap: 10 }}>
        <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.setStep(1)}>Retour</button>
        <button type="button" className="kd-btn kd-btn--gold" style={{ flex: 1 }} disabled={!wizard.reservationValid} onClick={wizard.confirmReservation}>Continuer</button>
      </div>
    </div>
  );
}
