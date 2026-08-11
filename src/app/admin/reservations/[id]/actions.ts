"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { eurosToCents, formatEuros } from "@/domain/pricing/money";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { declineReasonLabel, isDeclineReasonCode } from "@/domain/dispatch/decline-reasons";
import { getOwnerDriverProfile } from "@/domain/dispatch/owner-driver-profile";
import { BrevoClientNotifier } from "@/infrastructure/notifications/client-notifier";
import { notifyClientOfBookingConfirmed } from "@/infrastructure/notifications/notify-client-of-booking";
import { SupabaseReservationRepository } from "@/infrastructure/supabase/booking-repository";
import { appendHistory, type HistoryEntry } from "../../history-entry";
import { canAccept, canCancelConfirmed, canComplete, canDecline, canMarkContacted, priceIsConfirmed } from "./transitions";

type ReservationGuardRow = {
  status: string;
  pricing_mode: string;
  pricing_status: string | null;
  estimated_price_cents: number | null;
  confirmed_price_cents: number | null;
  history: HistoryEntry[] | null;
};

function backTo(id: string, params: Record<string, string>) {
  const search = new URLSearchParams(params).toString();
  redirect(`/admin/reservations/${id}${search ? `?${search}` : ""}`);
}

async function loadGuardRow(id: string): Promise<ReservationGuardRow> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("status,pricing_mode,pricing_status,estimated_price_cents,confirmed_price_cents,history")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) redirect(`/admin/reservations/${id}?error=not_found`);
  return data as ReservationGuardRow;
}

export async function markContacted(id: string) {
  const row = await loadGuardRow(id);
  if (!canMarkContacted(row.status)) {
    backTo(id, { error: "invalid_transition" });
    return;
  }
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "contacted", message: "Client contacté", from_status: row.status, to_status: "contacted" });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ status: "contacted", contacted_at: now, history })
    .eq("id", id)
    .eq("status", row.status)
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "contacted" });
}

export async function confirmEstimatedPrice(id: string) {
  const row = await loadGuardRow(id);
  if (row.pricing_mode !== "calculated" || row.estimated_price_cents === null || row.pricing_status !== "estimated") {
    backTo(id, { error: "invalid_transition" });
    return;
  }
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "price_confirmed", message: `Tarif confirmé : ${formatEuros(row.estimated_price_cents)}` });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ confirmed_price_cents: row.estimated_price_cents, pricing_status: "confirmed", price_confirmed_at: now, history })
    .eq("id", id)
    .eq("pricing_status", "estimated")
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "price_confirmed" });
}

/**
 * Relance le moteur tarifaire avec la config actuelle contre la
 * distance/durée/catégorie déjà enregistrées (ne recalcule jamais
 * l'itinéraire, contrairement à la création) — utile si la config tarifaire
 * a changé depuis la demande initiale. Refusé une fois le tarif
 * confirmé/ajusté : ne doit jamais écraser silencieusement un montant déjà
 * convenu avec le client.
 */
export async function recalculatePrice(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("status,pricing_status,history,distance_meters,duration_seconds,is_airport_trip,vehicles(slug)")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) { backTo(id, { error: "not_found" }); return; }
  if (data.pricing_status !== "estimated" && data.pricing_status !== "quote_required") {
    backTo(id, { error: "invalid_transition" });
    return;
  }
  const vehicle = Array.isArray(data.vehicles) ? data.vehicles[0] : data.vehicles;
  if (!vehicle?.slug) { backTo(id, { error: "invalid_transition" }); return; }

  const pricing = calculatePrice(
    { category: vehicle.slug, distanceMeters: data.distance_meters, durationSeconds: data.duration_seconds, isAirportTrip: data.is_airport_trip },
    pricingConfig,
  );
  const pricingStatus = pricing.mode === "quote" ? "quote_required" : "estimated";
  const history = appendHistory(data.history as HistoryEntry[] | null, {
    action: "price_recalculated",
    message: pricing.mode === "quote" ? "Tarif recalculé : sur devis" : `Tarif recalculé : ${formatEuros(pricing.totalCents ?? 0)}`,
  });
  const { error: updateError } = await supabase
    .from("reservations")
    .update({
      pricing_mode: pricing.mode,
      estimated_price_cents: pricing.totalCents,
      pricing_status: pricingStatus,
      pricing_snapshot: pricing,
      pricing_rule_version: pricing.ruleVersion,
      history,
    })
    .eq("id", id);
  if (updateError) { backTo(id, { error: "update_failed" }); return; }
  backTo(id, { success: "price_recalculated" });
}

export async function adjustPrice(id: string, formData: FormData) {
  const row = await loadGuardRow(id);
  const amountRaw = String(formData.get("amount") ?? "").replace(",", ".");
  const reason = String(formData.get("reason") ?? "").trim();
  const amount = Number.parseFloat(amountRaw);

  if (!reason) { backTo(id, { error: "reason_required" }); return; }
  if (!Number.isFinite(amount) || amount <= 0) { backTo(id, { error: "invalid_amount" }); return; }
  if (row.status === "completed" || row.status === "cancelled") { backTo(id, { error: "invalid_transition" }); return; }

  let amountCents: number;
  try {
    amountCents = eurosToCents(amount);
  } catch {
    backTo(id, { error: "invalid_amount" });
    return;
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "price_adjusted", message: `Tarif ajusté : ${formatEuros(amountCents)} (motif : ${reason})`, reason });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ confirmed_price_cents: amountCents, pricing_status: "adjusted", price_adjustment_reason: reason, price_confirmed_at: now, history })
    .eq("id", id)
    .eq("status", row.status)
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "price_adjusted" });
}

export async function setQuotePrice(id: string, formData: FormData) {
  const row = await loadGuardRow(id);
  const amountRaw = String(formData.get("amount") ?? "").replace(",", ".");
  const amount = Number.parseFloat(amountRaw);

  if (row.pricing_mode !== "quote" || row.pricing_status !== "quote_required") { backTo(id, { error: "invalid_transition" }); return; }
  if (!Number.isFinite(amount) || amount <= 0) { backTo(id, { error: "invalid_amount" }); return; }

  let amountCents: number;
  try {
    amountCents = eurosToCents(amount);
  } catch {
    backTo(id, { error: "invalid_amount" });
    return;
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "price_set", message: `Tarif défini : ${formatEuros(amountCents)}` });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ confirmed_price_cents: amountCents, pricing_status: "confirmed", price_confirmed_at: now, history })
    .eq("id", id)
    .eq("pricing_status", "quote_required")
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "price_set" });
}

/**
 * Parcours A : le propriétaire prend la course lui-même. Le chauffeur
 * affecté vient du profil propriétaire (variables d'env) — jamais laissé
 * vide, jamais une autre valeur par défaut. Si le profil n'est pas
 * configuré (nom/véhicule/plaque manquants), la course est bien confirmée
 * mais le justificatif restera indisponible tant que ces champs ne sont
 * pas renseignés (buildJustificatif refuse tout document partiel).
 */
export async function acceptReservation(id: string) {
  const row = await loadGuardRow(id);
  const pricing = { pricingMode: row.pricing_mode, pricingStatus: row.pricing_status, confirmedPriceCents: row.confirmed_price_cents };
  if (!canAccept(row.status, pricing)) {
    backTo(id, { error: priceIsConfirmed(pricing) ? "invalid_transition" : "price_not_confirmed" });
    return;
  }
  const ownerProfile = getOwnerDriverProfile();
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "reservation_confirmed", message: "Course acceptée (le propriétaire conduit)", from_status: row.status, to_status: "confirmed" });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({
      status: "confirmed",
      confirmed_at: now,
      assigned_driver_name: ownerProfile.name,
      assigned_driver_phone: ownerProfile.phone,
      assigned_vehicle_label: ownerProfile.vehicleLabel,
      assigned_vehicle_plate: ownerProfile.vehiclePlate,
      history,
    })
    .eq("id", id)
    .eq("status", row.status)
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "reservation_confirmed" });
}

/**
 * Confirmation avec un chauffeur externe (course déléguée) : formulaire
 * manuel minimal, PAS le Parcours B complet du plan de dispatch (pas de
 * commission, pas d'annonce groupe, pas de table `drivers`) — juste assez
 * pour qu'un justificatif correct puisse être généré. Les 4 champs sont
 * obligatoires ici : jamais de confirmation avec un chauffeur à moitié
 * renseigné.
 */
export async function confirmWithExternalDriver(id: string, formData: FormData) {
  const row = await loadGuardRow(id);
  const pricing = { pricingMode: row.pricing_mode, pricingStatus: row.pricing_status, confirmedPriceCents: row.confirmed_price_cents };
  if (!canAccept(row.status, pricing)) {
    backTo(id, { error: priceIsConfirmed(pricing) ? "invalid_transition" : "price_not_confirmed" });
    return;
  }

  const driverName = String(formData.get("driverName") ?? "").trim();
  const driverPhone = String(formData.get("driverPhone") ?? "").trim();
  const vehicleLabel = String(formData.get("vehicleLabel") ?? "").trim();
  const vehiclePlate = String(formData.get("vehiclePlate") ?? "").trim();

  if (!driverName || !driverPhone || !vehicleLabel || !vehiclePlate) {
    backTo(id, { error: "driver_fields_required" });
    return;
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, {
    action: "reservation_confirmed",
    message: `Course acceptée (chauffeur externe : ${driverName})`,
    from_status: row.status,
    to_status: "confirmed",
  });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({
      status: "confirmed",
      confirmed_at: now,
      assigned_driver_name: driverName,
      assigned_driver_phone: driverPhone,
      assigned_vehicle_label: vehicleLabel,
      assigned_vehicle_plate: vehiclePlate,
      history,
    })
    .eq("id", id)
    .eq("status", row.status)
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "reservation_confirmed" });
}

/**
 * Bouton "Envoyer au client" : action explicite, jamais déclenchée
 * automatiquement à la confirmation. Envoie l'e-mail (si le client a
 * fourni une adresse) avec le lien du justificatif — le lien WhatsApp
 * (pré-rempli, à envoyer manuellement) reste affiché sur la fiche par
 * ailleurs, cf. page.tsx.
 */
export async function sendJustificatifToClient(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("status,public_reference,pickup_at,confirmed_price_cents,customers(email)")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) { backTo(id, { error: "not_found" }); return; }
  if (data.status !== "confirmed" || data.confirmed_price_cents === null) {
    backTo(id, { error: "invalid_transition" });
    return;
  }

  const customer = Array.isArray(data.customers) ? data.customers[0] : data.customers;
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");
  const justificatifUrl = `${base}/api/justificatif/${id}/pdf`;

  const repository = new SupabaseReservationRepository();
  await notifyClientOfBookingConfirmed(new BrevoClientNotifier(), repository, id, {
    reference: data.public_reference,
    customerEmail: customer?.email ?? null,
    pickupAt: data.pickup_at,
    confirmedPriceCents: data.confirmed_price_cents,
    justificatifUrl,
  });

  backTo(id, { success: "justificatif_sent" });
}

export async function declineReservation(id: string, formData: FormData) {
  const row = await loadGuardRow(id);
  if (!canDecline(row.status)) {
    backTo(id, { error: "invalid_transition" });
    return;
  }
  const reasonCode = String(formData.get("reasonCode") ?? "");
  if (!isDeclineReasonCode(reasonCode)) {
    backTo(id, { error: "decline_reason_required" });
    return;
  }
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, {
    action: "reservation_declined",
    message: `Course refusée (motif : ${declineReasonLabel(reasonCode)})`,
    from_status: row.status,
    to_status: "cancelled",
    reason: reasonCode,
  });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ status: "cancelled", cancelled_at: now, history })
    .eq("id", id)
    .eq("status", row.status)
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "reservation_declined" });
}

export async function cancelConfirmedReservation(id: string, formData: FormData) {
  const row = await loadGuardRow(id);
  if (!canCancelConfirmed(row.status)) {
    backTo(id, { error: "invalid_transition" });
    return;
  }
  const reason = String(formData.get("reason") ?? "").trim() || undefined;
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, {
    action: "reservation_cancelled",
    message: reason ? `Course annulée (motif : ${reason})` : "Course annulée",
    from_status: "confirmed",
    to_status: "cancelled",
    reason,
  });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ status: "cancelled", cancelled_at: now, history })
    .eq("id", id)
    .eq("status", "confirmed")
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "reservation_cancelled" });
}

export async function completeReservation(id: string) {
  const row = await loadGuardRow(id);
  if (!canComplete(row.status)) {
    backTo(id, { error: "invalid_transition" });
    return;
  }
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "reservation_completed", message: "Course terminée", from_status: "confirmed", to_status: "completed" });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ status: "completed", completed_at: now, history })
    .eq("id", id)
    .eq("status", "confirmed")
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "reservation_completed" });
}
