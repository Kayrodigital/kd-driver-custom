"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { eurosToCents, formatEuros } from "@/domain/pricing/money";
import { declineReasonLabel, isDeclineReasonCode } from "@/domain/dispatch/decline-reasons";
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

export async function acceptReservation(id: string) {
  const row = await loadGuardRow(id);
  const pricing = { pricingMode: row.pricing_mode, pricingStatus: row.pricing_status, confirmedPriceCents: row.confirmed_price_cents };
  if (!canAccept(row.status, pricing)) {
    backTo(id, { error: priceIsConfirmed(pricing) ? "invalid_transition" : "price_not_confirmed" });
    return;
  }
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "reservation_confirmed", message: "Course acceptée", from_status: row.status, to_status: "confirmed" });
  const { data: updated, error } = await supabase
    .from("reservations")
    .update({ status: "confirmed", confirmed_at: now, history })
    .eq("id", id)
    .eq("status", row.status)
    .select("id")
    .maybeSingle();
  if (error) backTo(id, { error: "update_failed" });
  if (!updated) backTo(id, { error: "invalid_transition" });
  backTo(id, { success: "reservation_confirmed" });
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
