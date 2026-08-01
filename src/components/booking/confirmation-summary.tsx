"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { SiteNav } from "@/app/design-preview/sections";
import { formatEuros } from "@/domain/pricing/money";
import type { PricingResult } from "@/domain/pricing/pricing-types";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";

type Summary = {
  pickupAddress: string; destinationAddress: string; pickupAt: string; phone: string;
  vehicleSlug: string; passengers: number; luggage: number; pricing: PricingResult;
};

const KD_DRIVER_PHONE = process.env.NEXT_PUBLIC_KD_DRIVER_PHONE;

export function ConfirmationSummary({ reference }: { reference: string }) {
  const stored = useSyncExternalStore(() => () => undefined, () => sessionStorage.getItem(`reservation:${reference}`), () => null);
  const summary = useMemo(() => stored ? JSON.parse(stored) as Summary : null, [stored]);
  const whatsappNumber = KD_DRIVER_PHONE?.replace(/[^\d]/g, "");
  const vehicleLabel = vehicleCatalog.find((v) => v.slug === summary?.vehicleSlug)?.label ?? summary?.vehicleSlug;
  const isQuote = summary?.pricing.mode === "quote";

  return (
    <>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>
      <main className="kd-section kd-on-cream" style={{ minHeight: "70vh" }}>
        <div className="kd-container kd-cta" style={{ maxWidth: 560 }}>
          <span className="kd-service-icon" aria-hidden="true" style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--kd-gold)", color: "var(--kd-black)", fontSize: "1.4rem" }}>✓</span>
          <p className="kd-eyebrow">{isQuote ? "Demande transmise" : "Réservation enregistrée"}</p>
          <h1 className="kd-h2">{isQuote ? "Votre demande a bien été transmise." : "Votre réservation a bien été enregistrée."}</h1>
          <p className="kd-body">Référence : <strong>{reference}</strong></p>

          {summary ? (
            <dl className="kd-card kd-stack" style={{ textAlign: "left", width: "100%" }}>
              <div><dt className="kd-field-label">Trajet</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{summary.pickupAddress}<br />→ {summary.destinationAddress}</dd></div>
              <div><dt className="kd-field-label">Date</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(new Date(summary.pickupAt))}</dd></div>
              <div><dt className="kd-field-label">Véhicule</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{vehicleLabel} · {summary.passengers} passagers · {summary.luggage} bagages</dd></div>
              <div><dt className="kd-field-label">Téléphone</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{summary.phone}</dd></div>
              <div><dt className="kd-field-label">Tarif</dt><dd className="kd-body" style={{ margin: "4px 0 0", fontWeight: 700 }}>{isQuote ? "Sur devis" : formatEuros(summary.pricing.totalCents ?? 0)}</dd></div>
            </dl>
          ) : (
            <p className="kd-body">Le récapitulatif détaillé n’est disponible que sur l’appareil ayant effectué la demande.</p>
          )}

          <p className="kd-body">KDRIVE vous confirme rapidement la disponibilité et le tarif. Paiement au chauffeur.</p>

          {KD_DRIVER_PHONE && (
            <div style={{ display: "flex", gap: 12 }}>
              <a className="kd-btn kd-btn--outline" href={`tel:${KD_DRIVER_PHONE}`}>Appeler</a>
              <a className="kd-btn kd-btn--gold" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          )}

          <Link href="/reserver" className="kd-card-link">Nouvelle demande <span aria-hidden="true">→</span></Link>
        </div>
      </main>
    </>
  );
}
