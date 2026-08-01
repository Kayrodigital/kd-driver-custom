"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { eurosToCents, formatEuros } from "@/domain/pricing/money";

type HistoryEntry = { at: string; action: string; message: string };
type ReservationGuardRow = {
  status: string;
  pricing_mode: string;
  pricing_status: string | null;
  estimated_price_cents: number | null;
  history: HistoryEntry[] | null;
};

const OPEN_STATUSES = new Set(["new", "quote_requested", "contacted"]);

function backTo(id: string, params: Record<string, string>) {
  const search = new URLSearchParams(params).toString();
  redirect(`/admin/reservations/${id}${search ? `?${search}` : ""}`);
}

async function loadGuardRow(id: string): Promise<ReservationGuardRow> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("status,pricing_mode,pricing_status,estimated_price_cents,history")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) redirect(`/admin/reservations/${id}?error=not_found`);
  return data as ReservationGuardRow;
}

function appendHistory(current: HistoryEntry[] | null, action: string, message: string): HistoryEntry[] {
  return [...(current ?? []), { at: new Date().toISOString(), action, message }];
}

export async function markContacted(id: string) {
  const row = await loadGuardRow(id);
  if (!OPEN_STATUSES.has(row.status) || row.status === "contacted") {
    backTo(id, { error: "invalid_transition" });
    return;
  }
  const supabase = createAdminClient();
  const history = appendHistory(row.history, "contacted", "Client contacté");
  const { error } = await supabase
    .from("reservations")
    .update({ status: "contacted", history })
    .eq("id", id)
    .eq("status", row.status);
  if (error) backTo(id, { error: "update_failed" });
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
  const history = appendHistory(row.history, "price_confirmed", `Tarif confirmé : ${formatEuros(row.estimated_price_cents)}`);
  const { error } = await supabase
    .from("reservations")
    .update({ confirmed_price_cents: row.estimated_price_cents, pricing_status: "confirmed", price_confirmed_at: now, history })
    .eq("id", id)
    .eq("pricing_status", "estimated");
  if (error) backTo(id, { error: "update_failed" });
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
  const history = appendHistory(row.history, "price_adjusted", `Tarif ajusté : ${formatEuros(amountCents)} (motif : ${reason})`);
  const { error } = await supabase
    .from("reservations")
    .update({ confirmed_price_cents: amountCents, pricing_status: "adjusted", price_adjustment_reason: reason, price_confirmed_at: now, history })
    .eq("id", id)
    .eq("status", row.status);
  if (error) backTo(id, { error: "update_failed" });
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
  const history = appendHistory(row.history, "price_set", `Tarif défini : ${formatEuros(amountCents)}`);
  const { error } = await supabase
    .from("reservations")
    .update({ confirmed_price_cents: amountCents, pricing_status: "confirmed", price_confirmed_at: now, history })
    .eq("id", id)
    .eq("pricing_status", "quote_required");
  if (error) backTo(id, { error: "update_failed" });
  backTo(id, { success: "price_set" });
}
