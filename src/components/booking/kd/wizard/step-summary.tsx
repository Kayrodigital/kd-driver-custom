"use client";

import { formatEuros } from "@/domain/pricing/money";
import { PRICING_TRANSPARENCY_NOTE, priceHeadline } from "@/domain/pricing/pricing-display";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import type { useBookingWizard } from "./use-booking-wizard";

export function StepSummary({ wizard }: { wizard: ReturnType<typeof useBookingWizard> }) {
  const vehicle = vehicleCatalog.find((v) => v.slug === wizard.vehicleSlug);
  const pricing = wizard.selectedVehicleOption?.pricing;
  const isQuote = pricing?.mode === "quote";
  const options: string[] = [];
  if (wizard.childSeat) options.push("Siège enfant");
  if (wizard.pet) options.push("Animal");
  if (wizard.extraStop) options.push(`Arrêt : ${wizard.extraStop}`);
  if (wizard.flightNumber) options.push(`Vol ${wizard.flightNumber}`);
  if (wizard.trainNumber) options.push(`Train ${wizard.trainNumber}`);
  if (wizard.forSomeoneElse) options.push(`Pour ${wizard.otherFirstName}`);

  return (
    <div className="kd-booking-card">
      <div>
        <p className="kd-eyebrow">Étape 5 · Récapitulatif</p>
        <h2 className="kd-h3" style={{ marginTop: 6 }}>Vérifiez votre demande</h2>
      </div>

      <div className="kd-card kd-card--flat" style={{ display: "grid", gap: 10, padding: 16 }}>
        <div><span className="kd-field-label">Trajet</span><p style={{ margin: "2px 0 0" }}>{wizard.pickup.address} → {wizard.destination.address}</p></div>
        <div><span className="kd-field-label">Date et heure</span><p style={{ margin: "2px 0 0" }}>{wizard.date} à {wizard.time}</p></div>
        <div><span className="kd-field-label">Véhicule</span><p style={{ margin: "2px 0 0" }}>{vehicle?.label} · {wizard.passengers} passagers · {wizard.luggage} bagages</p></div>
        {options.length > 0 && <div><span className="kd-field-label">Options</span><p style={{ margin: "2px 0 0" }}>{options.join(" · ")}</p></div>}
        <div><span className="kd-field-label">Contact</span><p style={{ margin: "2px 0 0" }}>{wizard.phone}{wizard.email ? ` · ${wizard.email}` : ""}</p></div>
        <div>
          <span className="kd-field-label">Tarif</span>
          <p style={{ margin: "2px 0 0", fontWeight: 700 }}>{pricing ? priceHeadline(pricing) : "—"}</p>
        </div>
      </div>

      {pricing && pricing.mode === "calculated" && (
        <details>
          <summary className="kd-more-toggle">Détail du tarif</summary>
          <ul className="kd-price-detail">
            {pricing.lines.map((line) => (
              <li key={line.code}><span>{line.label}</span><span>{formatEuros(line.amountCents)}</span></li>
            ))}
            <li className="kd-price-detail-total"><span>Total</span><span>{formatEuros(pricing.totalCents ?? 0)}</span></li>
          </ul>
        </details>
      )}

      <p className="kd-body">Paiement au chauffeur. Le tarif est recalculé côté serveur avant confirmation.</p>
      {pricing && pricing.mode === "calculated" && <p className="kd-field-hint">{PRICING_TRANSPARENCY_NOTE}</p>}

      {wizard.submitError && <p className="kd-field-error" role="alert">{wizard.submitError}</p>}

      <div className="kd-actions" style={{ display: "flex", gap: 10 }}>
        <button type="button" className="kd-btn kd-btn--outline" onClick={() => wizard.setStep(4)}>Retour</button>
        <button type="button" className="kd-btn kd-btn--gold" style={{ flex: 1 }} disabled={wizard.submitBusy} onClick={() => void wizard.submitReservation()}>
          {wizard.submitBusy ? "Envoi…" : isQuote ? "Envoyer la demande de devis" : "Confirmer la réservation"}
        </button>
      </div>
    </div>
  );
}
