import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { formatEuros } from "@/domain/pricing/money";
import type { PricingResult } from "@/domain/pricing/pricing-types";
import type { HistoryEntry } from "../../history-entry";
import { statusLabel, statusPillClassName } from "../../status-labels";
import {
  acceptReservation,
  adjustPrice,
  cancelConfirmedReservation,
  completeReservation,
  confirmEstimatedPrice,
  declineReservation,
  markContacted,
  setQuotePrice,
} from "./actions";
import { canAccept, canCancelConfirmed, canComplete, canDecline, canMarkContacted, priceIsConfirmed } from "./transitions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Fiche réservation | Administration KDRIVE", robots: { index: false, follow: false } };

type Customer = { first_name: string | null; last_name: string | null; phone: string; email: string | null };
type Vehicle = { label: string; max_passengers: number; max_luggage: number };
type ReservationDetail = {
  id: string;
  public_reference: string;
  created_at: string;
  pickup_at: string;
  status: string;
  pricing_status: string | null;
  estimated_price_cents: number | null;
  confirmed_price_cents: number | null;
  price_adjustment_reason: string | null;
  price_confirmed_at: string | null;
  contacted_at: string | null;
  confirmed_at: string | null;
  cancelled_at: string | null;
  completed_at: string | null;
  pricing_mode: string;
  pricing_rule_version: string;
  pricing_snapshot: PricingResult | null;
  pickup_address: string;
  pickup_latitude: number | null;
  pickup_longitude: number | null;
  destination_address: string;
  destination_latitude: number | null;
  destination_longitude: number | null;
  distance_meters: number;
  duration_seconds: number;
  is_airport_trip: boolean;
  passengers: number;
  luggage: number;
  notes: string | null;
  history: HistoryEntry[] | null;
  customers: Customer | Customer[] | null;
  vehicles: Vehicle | Vehicle[] | null;
};

const pricingStatusLabels: Record<string, string> = {
  estimated: "Estimé",
  pending_confirmation: "En attente de confirmation",
  confirmed: "Confirmé",
  adjusted: "Ajusté",
  quote_required: "Devis à établir",
};

const errorMessages: Record<string, string> = {
  reason_required: "Le motif est obligatoire pour ajuster un tarif.",
  invalid_amount: "Le montant saisi est invalide.",
  invalid_transition: "Cette action n’est plus disponible pour l’état actuel de la réservation.",
  price_not_confirmed: "Confirmez ou définissez d’abord le tarif avant d’accepter cette course.",
  update_failed: "L’enregistrement a échoué. Réessayez.",
  not_found: "Réservation introuvable.",
};

const successMessages: Record<string, string> = {
  contacted: "Client marqué comme contacté.",
  price_confirmed: "Tarif estimé confirmé.",
  price_adjusted: "Tarif ajusté avec le motif renseigné.",
  price_set: "Tarif défini pour cette demande sur devis.",
  reservation_confirmed: "Course acceptée.",
  reservation_declined: "Course refusée.",
  reservation_cancelled: "Course annulée.",
  reservation_completed: "Course marquée comme terminée.",
};

function one<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function googleMapsLink(reservation: ReservationDetail): string | null {
  const { pickup_latitude, pickup_longitude, destination_latitude, destination_longitude } = reservation;
  if (pickup_latitude === null || destination_latitude === null) return null;
  return `https://www.google.com/maps/dir/?api=1&origin=${pickup_latitude},${pickup_longitude}&destination=${destination_latitude},${destination_longitude}`;
}

function whatsappLink(reservation: ReservationDetail, phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  const when = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" }).format(new Date(reservation.pickup_at));
  let message = `Bonjour, votre demande KDRIVE ${reservation.public_reference} pour le trajet ${reservation.pickup_address} → ${reservation.destination_address} le ${when} a bien été reçue.`;
  if (reservation.confirmed_price_cents !== null) {
    message += ` Le tarif confirmé est de ${formatEuros(reservation.confirmed_price_cents)}.`;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default async function ReservationDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; success?: string }> }) {
  const { id } = await params;
  const { error: errorCode, success: successCode } = await searchParams;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select(
      "id,public_reference,created_at,pickup_at,status,pricing_status,estimated_price_cents,confirmed_price_cents,price_adjustment_reason,price_confirmed_at,contacted_at,confirmed_at,cancelled_at,completed_at,pricing_mode,pricing_rule_version,pricing_snapshot,pickup_address,pickup_latitude,pickup_longitude,destination_address,destination_latitude,destination_longitude,distance_meters,duration_seconds,is_airport_trip,passengers,luggage,notes,history,customers(first_name,last_name,phone,email),vehicles(label,max_passengers,max_luggage)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Impossible de charger cette réservation.");
  if (!data) notFound();

  const reservation = data as unknown as ReservationDetail;
  const customer = one(reservation.customers);
  const vehicle = one(reservation.vehicles);
  const mapsLink = googleMapsLink(reservation);
  const pricing = reservation.pricing_snapshot;
  const history = [...(reservation.history ?? [])].sort((a, b) => b.at.localeCompare(a.at));

  const status = reservation.status;
  const isOpen = status !== "completed" && status !== "cancelled";
  const pricingContext = { pricingMode: reservation.pricing_mode, pricingStatus: reservation.pricing_status, confirmedPriceCents: reservation.confirmed_price_cents };

  const showMarkContacted = canMarkContacted(status);
  const showConfirmEstimated = isOpen && reservation.pricing_mode === "calculated" && reservation.pricing_status === "estimated";
  const showAdjust = isOpen && reservation.pricing_status !== "quote_required";
  const showSetQuotePrice = isOpen && reservation.pricing_mode === "quote" && reservation.pricing_status === "quote_required";
  const priceConfirmed = priceIsConfirmed(pricingContext);
  const showAccept = canAccept(status, pricingContext);
  const showAcceptBlocked = !showAccept && new Set(["new", "contacted", "quote_requested"]).has(status) && !priceConfirmed;
  const showDecline = canDecline(status);
  const showCancelConfirmed = canCancelConfirmed(status);
  const showComplete = canComplete(status);

  const markContactedWithId = markContacted.bind(null, id);
  const confirmEstimatedPriceWithId = confirmEstimatedPrice.bind(null, id);
  const adjustPriceWithId = adjustPrice.bind(null, id);
  const setQuotePriceWithId = setQuotePrice.bind(null, id);
  const acceptReservationWithId = acceptReservation.bind(null, id);
  const declineReservationWithId = declineReservation.bind(null, id);
  const cancelConfirmedReservationWithId = cancelConfirmedReservation.bind(null, id);
  const completeReservationWithId = completeReservation.bind(null, id);

  return (
    <main className="kd-admin-main kd-on-cream">
      <div className="kd-container" style={{ maxWidth: 1240 }}>
        <Link href="/admin" className="kd-admin-back">← Retour aux réservations</Link>

        <div className="kd-section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p className="kd-eyebrow">Réservation {reservation.public_reference}</p>
            <h1 className="kd-h2">{customer ? [customer.first_name, customer.last_name].filter(Boolean).join(" ") || "Client" : "Client"}</h1>
          </div>
          <span className={statusPillClassName(status)}>{statusLabel(status)}</span>
        </div>

        {errorCode && <p className="kd-field-error" role="alert">{errorMessages[errorCode] ?? "Une erreur est survenue."}</p>}
        {successCode && <p className="kd-field-hint" role="status" style={{ color: "var(--kd-success, #2f7a42)", fontWeight: 700 }}>{successMessages[successCode] ?? "Action effectuée."}</p>}

        <div className="kd-admin-fiche">
          <div className="kd-card kd-admin-fiche-section">
            <h2 className="kd-h4">Client</h2>
            <p className="kd-admin-fiche-row"><span>Téléphone</span><span>{customer?.phone ? <a href={`tel:${customer.phone}`}>{customer.phone}</a> : "—"}</span></p>
            <p className="kd-admin-fiche-row"><span>E-mail</span><span>{customer?.email ?? "—"}</span></p>

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Trajet</h2>
            <p className="kd-admin-fiche-row"><span>Départ</span><span>{reservation.pickup_address}</span></p>
            <p className="kd-admin-fiche-row"><span>Destination</span><span>{reservation.destination_address}</span></p>
            <p className="kd-admin-fiche-row"><span>Date et heure</span><span>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(new Date(reservation.pickup_at))}</span></p>
            <p className="kd-admin-fiche-row"><span>Distance</span><span>{(reservation.distance_meters / 1000).toFixed(1)} km</span></p>
            <p className="kd-admin-fiche-row"><span>Durée</span><span>≈ {Math.round(reservation.duration_seconds / 60)} min</span></p>
            {mapsLink && <a href={mapsLink} target="_blank" rel="noreferrer" className="kd-card-link">Voir l’itinéraire sur Google Maps →</a>}

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Véhicule et passagers</h2>
            <p className="kd-admin-fiche-row"><span>Catégorie</span><span>{vehicle?.label ?? "—"}</span></p>
            <p className="kd-admin-fiche-row"><span>Passagers</span><span>{reservation.passengers}</span></p>
            <p className="kd-admin-fiche-row"><span>Bagages</span><span>{reservation.luggage}</span></p>
            <p className="kd-admin-fiche-row"><span>Trajet aéroport</span><span>{reservation.is_airport_trip ? "Oui" : "Non"}</span></p>

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Options et commentaires</h2>
            <p className="kd-body" style={{ margin: 0 }}>{reservation.notes || "Aucune option ni commentaire."}</p>

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Tarification</h2>
            <p className="kd-admin-fiche-row"><span>Tarif estimé</span><span>{reservation.pricing_mode === "quote" ? "Sur devis" : formatEuros(reservation.estimated_price_cents ?? 0)}</span></p>
            <p className="kd-admin-fiche-row"><span>Tarif confirmé</span><span>{reservation.confirmed_price_cents !== null ? formatEuros(reservation.confirmed_price_cents) : "Non confirmé"}</span></p>
            <p className="kd-admin-fiche-row"><span>État tarifaire</span><span>{reservation.pricing_status ? (pricingStatusLabels[reservation.pricing_status] ?? reservation.pricing_status) : "—"}</span></p>
            {reservation.price_adjustment_reason && <p className="kd-admin-fiche-row"><span>Motif d’ajustement</span><span>{reservation.price_adjustment_reason}</span></p>}
            {reservation.price_confirmed_at && <p className="kd-admin-fiche-row"><span>Confirmé le</span><span>{formatDateTime(reservation.price_confirmed_at)}</span></p>}
            <p className="kd-admin-fiche-row"><span>Règle tarifaire</span><span>{reservation.pricing_rule_version}</span></p>
            {pricing && pricing.mode === "calculated" && (
              <details>
                <summary className="kd-more-toggle">Détail du calcul</summary>
                <ul className="kd-price-detail">
                  {pricing.lines.map((line) => (
                    <li key={line.code}><span>{line.label}</span><span>{formatEuros(line.amountCents)}</span></li>
                  ))}
                  <li className="kd-price-detail-total"><span>Total</span><span>{formatEuros(pricing.totalCents ?? 0)}</span></li>
                </ul>
              </details>
            )}

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Mode de paiement</h2>
            <p className="kd-body" style={{ margin: 0, color: "var(--kd-muted)" }}>Non défini pour l’instant (à venir avec l’intégration du paiement).</p>

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Suivi du statut</h2>
            {reservation.contacted_at && <p className="kd-admin-fiche-row"><span>Contactée le</span><span>{formatDateTime(reservation.contacted_at)}</span></p>}
            {reservation.confirmed_at && <p className="kd-admin-fiche-row"><span>Confirmée le</span><span>{formatDateTime(reservation.confirmed_at)}</span></p>}
            {reservation.completed_at && <p className="kd-admin-fiche-row"><span>Terminée le</span><span>{formatDateTime(reservation.completed_at)}</span></p>}
            {reservation.cancelled_at && <p className="kd-admin-fiche-row"><span>Annulée le</span><span>{formatDateTime(reservation.cancelled_at)}</span></p>}

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Historique</h2>
            {history.length === 0 ? (
              <p className="kd-body" style={{ margin: 0, color: "var(--kd-muted)" }}>Aucun événement enregistré.</p>
            ) : (
              <ul className="kd-price-detail">
                {history.map((entry, index) => (
                  <li key={`${entry.at}-${index}`} style={{ alignItems: "flex-start" }}>
                    <span style={{ whiteSpace: "nowrap" }}>{formatDateTime(entry.at)}</span>
                    <span style={{ textAlign: "right" }}>
                      {entry.message}
                      {entry.from_status && entry.to_status && (
                        <><br /><small style={{ color: "var(--kd-muted)" }}>{statusLabel(entry.from_status)} → {statusLabel(entry.to_status)}</small></>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="kd-card kd-admin-fiche-section">
            <h2 className="kd-h4">Actions rapides</h2>

            {customer?.phone && <a className="kd-btn kd-btn--outline kd-btn--block" href={`tel:${customer.phone}`}>Appeler {customer.phone}</a>}
            {customer?.phone && <a className="kd-btn kd-btn--gold kd-btn--block" href={whatsappLink(reservation, customer.phone)} target="_blank" rel="noreferrer">WhatsApp</a>}

            {showAccept && (
              <form action={acceptReservationWithId}>
                <button type="submit" className="kd-btn kd-btn--gold kd-btn--block">Accepter la course</button>
              </form>
            )}
            {showAcceptBlocked && (
              <p className="kd-field-hint" style={{ margin: 0 }}>
                {reservation.pricing_mode === "quote" ? "Définissez d’abord un tarif pour pouvoir accepter cette course." : "Confirmez ou ajustez d’abord le tarif estimé pour pouvoir accepter cette course."}
              </p>
            )}

            {showMarkContacted && (
              <form action={markContactedWithId}>
                <button type="submit" className="kd-btn kd-btn--outline kd-btn--block">Marquer comme contacté</button>
              </form>
            )}

            {showConfirmEstimated && (
              <form action={confirmEstimatedPriceWithId}>
                <button type="submit" className="kd-btn kd-btn--outline kd-btn--block">
                  Confirmer le tarif estimé ({formatEuros(reservation.estimated_price_cents ?? 0)})
                </button>
              </form>
            )}

            {showSetQuotePrice && (
              <form action={setQuotePriceWithId} style={{ display: "grid", gap: 10 }}>
                <label className="kd-field">
                  <span className="kd-field-label">Définir un tarif (€)</span>
                  <input className="kd-input" type="number" name="amount" min="0" step="0.01" required />
                </label>
                <button type="submit" className="kd-btn kd-btn--outline kd-btn--block">Définir ce tarif</button>
              </form>
            )}

            {showAdjust && (
              <form action={adjustPriceWithId} style={{ display: "grid", gap: 10 }}>
                <label className="kd-field">
                  <span className="kd-field-label">Ajuster le tarif (€)</span>
                  <input className="kd-input" type="number" name="amount" min="0" step="0.01" required />
                </label>
                <label className="kd-field">
                  <span className="kd-field-label">Motif (obligatoire)</span>
                  <input className="kd-input" type="text" name="reason" required maxLength={300} />
                </label>
                <button type="submit" className="kd-btn kd-btn--outline kd-btn--block">Ajuster le tarif</button>
              </form>
            )}

            {showComplete && (
              <details>
                <summary className="kd-more-toggle">Marquer comme terminée</summary>
                <form action={completeReservationWithId} style={{ marginTop: 10 }}>
                  <p className="kd-field-hint">Confirmez : la course sera marquée comme terminée.</p>
                  <button type="submit" className="kd-btn kd-btn--gold kd-btn--block">Confirmer — course terminée</button>
                </form>
              </details>
            )}

            {(showDecline || showCancelConfirmed) && (
              <div className="kd-admin-danger-zone">
                {showCancelConfirmed && (
                  <details>
                    <summary className="kd-more-toggle kd-more-toggle--danger">Annuler la course</summary>
                    <form action={cancelConfirmedReservationWithId} style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      <p className="kd-field-hint">Cette course est confirmée. L’annulation est définitive ; les données restent conservées.</p>
                      <label className="kd-field">
                        <span className="kd-field-label">Motif interne (facultatif)</span>
                        <input className="kd-input" type="text" name="reason" maxLength={300} />
                      </label>
                      <button type="submit" className="kd-btn kd-btn--outline kd-btn--block">Confirmer l’annulation</button>
                    </form>
                  </details>
                )}
                {showDecline && (
                  <details>
                    <summary className="kd-more-toggle kd-more-toggle--danger">Refuser la course</summary>
                    <form action={declineReservationWithId} style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      <p className="kd-field-hint">La réservation sera conservée avec le statut « Annulée ».</p>
                      <label className="kd-field">
                        <span className="kd-field-label">Motif interne (facultatif)</span>
                        <input className="kd-input" type="text" name="reason" maxLength={300} />
                      </label>
                      <button type="submit" className="kd-btn kd-btn--outline kd-btn--block">Confirmer le refus</button>
                    </form>
                  </details>
                )}
              </div>
            )}

            {!isOpen && <p className="kd-field-hint" style={{ margin: 0 }}>Réservation {statusLabel(status).toLowerCase()} — aucune action de statut disponible.</p>}

            <h2 className="kd-h4" style={{ marginTop: 8 }}>Suivi</h2>
            <p className="kd-admin-fiche-row"><span>Créée le</span><span>{formatDateTime(reservation.created_at)}</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
