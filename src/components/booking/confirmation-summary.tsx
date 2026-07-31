"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";

type Summary = { pickupAddress: string; destinationAddress: string; pickupAt: string; phone: string; requestType: "estimate" | "callback" };

const KD_DRIVER_PHONE = process.env.NEXT_PUBLIC_KD_DRIVER_PHONE;

export function ConfirmationSummary({ reference }: { reference: string }) {
  const stored = useSyncExternalStore(() => () => undefined, () => sessionStorage.getItem(`reservation:${reference}`), () => null);
  const summary = useMemo(() => stored ? JSON.parse(stored) as Summary : null, [stored]);
  const whatsappNumber = KD_DRIVER_PHONE?.replace(/[^\d]/g, "");

  return (
    <main className="confirmation">
      <p className="success-mark" aria-hidden="true">✓</p>
      <p className="eyebrow">Demande envoyée</p>
      <h1>Votre demande a bien été reçue.</h1>
      <p>Référence : <strong>{reference}</strong></p>
      {summary ? (
        <dl className="confirmation-grid">
          <div><dt>Trajet</dt><dd>{summary.pickupAddress}<br />→ {summary.destinationAddress}</dd></div>
          <div><dt>Date</dt><dd>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(new Date(summary.pickupAt))}</dd></div>
          <div><dt>Téléphone</dt><dd>{summary.phone}</dd></div>
        </dl>
      ) : (
        <p className="notice">Le récapitulatif détaillé n’est disponible que sur l’appareil ayant effectué la demande.</p>
      )}
      <p className="notice">KD Driver vous confirme rapidement la disponibilité et le tarif.</p>
      {KD_DRIVER_PHONE && (
        <div className="actions">
          <a className="secondary" href={`tel:${KD_DRIVER_PHONE}`}>Appeler</a>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      )}
      <Link href="/reserver">Nouvelle demande</Link>
    </main>
  );
}
