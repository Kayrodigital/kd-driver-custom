"use client";

import { SceneImage } from "@/app/design-preview/scene-image";
import { PRICING_TRANSPARENCY_NOTE, priceHeadline } from "@/domain/pricing/pricing-display";
import { vehicleCatalog, type VehicleSlug } from "@/domain/pricing/vehicle-catalog";
import { RouteMap } from "./route-map";
import type { useBookingWizard } from "./use-booking-wizard";

export function StepVehicles({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  const hasCalculatedOption = wizard.vehicleOptions.some((option) => option.pricing.mode === "calculated");

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

      <RouteMap pickup={wizard.pickup} destination={wizard.destination} route={wizard.route} />

      <div style={{ display: "grid", gap: 12 }}>
        {vehicleCatalog.map((vehicle) => {
          const option = wizard.vehicleOptions.find((o) => o.category === vehicle.slug);
          const isQuote = option?.pricing.mode === "quote";
          return (
            <div key={vehicle.slug} className="kd-card kd-card--hover kd-wizard-vehicle-card">
              <SceneImage className="kd-wizard-vehicle-card-image" src={vehicle.image} alt={vehicle.label} note="photo à venir" style={{ minHeight: 80, borderRadius: "var(--kd-radius-md)", margin: 0 }} />
              <div className="kd-wizard-vehicle-card-body" style={{ minWidth: 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                  <b>{vehicle.label}</b>
                  {isQuote ? (
                    <span className="kd-pill">Sur devis</span>
                  ) : (
                    option && <span style={{ color: "var(--kd-gold)", fontWeight: 700, fontSize: "0.88rem" }}>{priceHeadline(option.pricing)}</span>
                  )}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--kd-muted)", margin: "4px 0 0" }}>{vehicle.body} · {vehicle.passengers} passagers · {vehicle.luggage} bagages</p>
              </div>
              <button type="button" className="kd-btn kd-btn--outline kd-wizard-vehicle-card-action" onClick={() => wizard.selectVehicle(vehicle.slug as VehicleSlug)}>Choisir</button>
            </div>
          );
        })}
      </div>

      {hasCalculatedOption && <p className="kd-field-hint">{PRICING_TRANSPARENCY_NOTE}</p>}

      <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.setStep(1)}>Retour</button>
    </div>
  );
}
