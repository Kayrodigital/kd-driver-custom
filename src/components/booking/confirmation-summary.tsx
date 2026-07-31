"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { formatEuros } from "@/domain/pricing/money";
import type { PricingResult } from "@/domain/pricing/pricing-types";

type Summary = { pickupAddress: string; destinationAddress: string; pickupAt: string; passengers: number; luggage: number; vehicleSlug: string; distanceMeters: number; durationSeconds: number; pricing: PricingResult; customerName: string };

export function ConfirmationSummary({ reference }: { reference: string }) {
  const stored = useSyncExternalStore(() => () => undefined, () => sessionStorage.getItem(`reservation:${reference}`), () => null);
  const summary = useMemo(() => stored ? JSON.parse(stored) as Summary : null, [stored]);
  return <main className="confirmation"><p className="success-mark" aria-hidden="true">✓</p><p className="eyebrow">Réservation enregistrée</p><h1>Votre demande est confirmée.</h1><p>Référence : <strong>{reference}</strong></p>{summary ? <dl className="confirmation-grid"><div><dt>Trajet</dt><dd>{summary.pickupAddress}<br />→ {summary.destinationAddress}</dd></div><div><dt>Date</dt><dd>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(new Date(summary.pickupAt))}</dd></div><div><dt>Passager</dt><dd>{summary.customerName} · {summary.passengers} pers. · {summary.luggage} bagage(s)</dd></div><div><dt>Véhicule</dt><dd>{summary.vehicleSlug} · {(summary.distanceMeters / 1000).toFixed(1)} km</dd></div><div><dt>Tarif</dt><dd>{summary.pricing.mode === "quote" ? "Sur devis" : formatEuros(summary.pricing.totalCents ?? 0)}</dd></div></dl> : <p className="notice">Le récapitulatif détaillé n’est disponible que sur l’appareil ayant effectué la réservation.</p>}<p>Aucun paiement, e-mail ou message n’a été déclenché.</p><Link href="/reserver">Nouvelle réservation</Link></main>;
}
