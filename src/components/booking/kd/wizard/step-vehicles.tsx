"use client";

import { SceneImage } from "@/app/design-preview/scene-image";
import { formatEuros } from "@/domain/pricing/money";
import { vehicleCatalog, type VehicleSlug } from "@/domain/pricing/vehicle-catalog";
import type { useBookingWizard } from "./use-booking-wizard";

export function StepVehicles({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 2 · Véhicule</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>Choisissez votre véhicule</h2>
      </div>

      {wizard.route && (
        <div className="kd-card kd-card--flat" style={{ padding: 14 }}>
          <p style={{ fontSize: "0.86rem", margin: 0 }}>{wizard.pickup.address} → {wizard.destination.address}</p>
          <p style={{ fontSize: "0.8rem", color: "var(--kd-muted)", margin: "4px 0 0" }}>
            {(wizard.route.distanceMeters / 1000).toFixed(1)} km · ≈ {Math.round(wizard.route.durationSeconds / 60)} min · {wizard.date} à {wizard.time}
          </p>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {vehicleCatalog.map((vehicle) => {
          const option = wizard.vehicleOptions.find((o) => o.category === vehicle.slug);
          const isQuote = option?.pricing.mode === "quote";
          return (
            <div key={vehicle.slug} className="kd-card kd-card--hover kd-vehicle-card" style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr) auto", gap: 14, alignItems: "center", padding: 14 }}>
              <SceneImage src={vehicle.image} alt={vehicle.label} note="photo à venir" style={{ minHeight: 80, borderRadius: "var(--kd-radius-md)", margin: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                  <b>{vehicle.label}</b>
                  {isQuote ? <span className="kd-pill">Sur devis</span> : option && <span style={{ color: "var(--kd-gold)", fontWeight: 700 }}>{formatEuros(option.pricing.totalCents ?? 0)}</span>}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--kd-muted)", margin: "4px 0 0" }}>{vehicle.body} · {vehicle.passengers} passagers · {vehicle.luggage} bagages</p>
              </div>
              <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.selectVehicle(vehicle.slug as VehicleSlug)}>Choisir</button>
            </div>
          );
        })}
      </div>

      <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.setStep(1)}>Retour</button>
    </div>
  );
}
