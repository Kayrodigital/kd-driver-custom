"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { SiteNav } from "@/app/design-preview/sections";
import { EnglishSiteNav } from "@/app/design-preview/en/english-site-components";
import { formatDateTimeParis } from "@/lib/format-date";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import { trackEvent } from "@/lib/analytics/gtag";

type Summary = {
  pickupAddress: string; destinationAddress: string; pickupAt: string; phone: string;
  vehicleSlug: string; passengers: number; luggage: number;
};

const KD_DRIVER_PHONE = process.env.NEXT_PUBLIC_KD_DRIVER_PHONE;

/**
 * Aucun tarif affiché : le nouveau parcours ne calcule plus de prix côté
 * public (cf. sprint "nouveau parcours sans prix"). Le tarif est communiqué
 * par téléphone par KDRIVE, après étude du trajet dans son calculateur
 * interne (admin).
 */
export function ConfirmationSummary({ reference, locale = "fr" }: { reference: string; locale?: "fr" | "en" }) {
  const en = locale === "en";
  const stored = useSyncExternalStore(() => () => undefined, () => sessionStorage.getItem(`reservation:${reference}`), () => null);
  const summary = useMemo(() => stored ? JSON.parse(stored) as Summary : null, [stored]);
  const vehicleLabel = vehicleCatalog.find((v) => v.slug === summary?.vehicleSlug)?.label ?? summary?.vehicleSlug;

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    // Nom d'événement générique en attendant un libellé de conversion
    // Google Ads dédié (Ads > Conversions > Nouvelle action) : une fois créé,
    // ajouter { send_to: "AW-11347885497/<libellé>" } aux paramètres pour
    // que ça remonte comme une vraie conversion Ads, pas juste un événement.
    trackEvent("booking_request_submitted", { transaction_id: reference });
  }, [reference]);

  return (
    <>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}>{en ? <EnglishSiteNav /> : <SiteNav />}</header>
      <main className="kd-section kd-on-cream" style={{ minHeight: "70vh" }}>
        <div className="kd-container kd-cta" style={{ maxWidth: 560 }}>
          <span className="kd-service-icon" aria-hidden="true" style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--kd-gold)", color: "var(--kd-black)", fontSize: "1.4rem" }}>✓</span>
          <p className="kd-eyebrow">{en ? "Request received" : "Demande reçue"}</p>
          <h1 className="kd-h2">{en ? "Your request has been sent." : "Votre demande a bien été envoyée."}</h1>
          <p className="kd-body">{en ? "Reference" : "Référence"} : <strong>{reference}</strong></p>

          {summary ? (
            <dl className="kd-card kd-stack" style={{ textAlign: "left", width: "100%" }}>
              <div><dt className="kd-field-label">{en ? "Journey" : "Trajet"}</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{summary.pickupAddress}<br />→ {summary.destinationAddress}</dd></div>
              <div><dt className="kd-field-label">Date</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{formatDateTimeParis(summary.pickupAt, { dateStyle: "full" }, en ? "en-GB" : "fr-FR")}</dd></div>
              <div><dt className="kd-field-label">{en ? "Time" : "Heure"}</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{formatDateTimeParis(summary.pickupAt, { timeStyle: "short" }, en ? "en-GB" : "fr-FR")}</dd></div>
              <div><dt className="kd-field-label">{en ? "Category" : "Catégorie"}</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{vehicleLabel} · {summary.passengers} {en ? "passengers" : "passagers"} · {summary.luggage} {en ? "bags" : "bagages"}</dd></div>
              <div><dt className="kd-field-label">Status</dt><dd className="kd-body" style={{ margin: "4px 0 0" }}>{en ? "Request received" : "Demande reçue"}</dd></div>
            </dl>
          ) : (
            <p className="kd-body">{en ? "The detailed summary is only available on the device used to send the request." : "Le récapitulatif détaillé n’est disponible que sur l’appareil ayant effectué la demande."}</p>
          )}

          <p className="kd-body">{en ? "KDRIVE reviews your journey and contacts you by telephone to confirm the fare before final confirmation." : "KDRIVE étudie votre trajet et vous contacte par téléphone pour vous communiquer le tarif avant confirmation."}</p>

          {KD_DRIVER_PHONE && (
            <a className="kd-btn kd-btn--gold" href={`tel:${KD_DRIVER_PHONE}`}>📞 {en ? "Call KDRIVE" : "Appeler KDRIVE"} — {KD_DRIVER_PHONE}</a>
          )}

          <Link href={en ? "/en/book" : "/reserver"} className="kd-card-link">{en ? "New request" : "Nouvelle demande"} <span aria-hidden="true">→</span></Link>
        </div>
      </main>
    </>
  );
}
