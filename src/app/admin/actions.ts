"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { appendHistory, type HistoryEntry } from "./history-entry";

/**
 * Archivage réversible, même pattern d'accès optimiste que
 * src/app/admin/reservations/[id]/actions.ts : lecture fraîche, garde,
 * écriture conditionnée sur l'état lu. `status` n'est jamais modifié —
 * l'archivage est un état orthogonal, pas une nouvelle valeur de statut.
 */

async function loadArchiveGuardRow(id: string): Promise<{ archived_at: string | null; history: HistoryEntry[] | null } | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("reservations").select("archived_at,history").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function archiveReservation(id: string) {
  const row = await loadArchiveGuardRow(id);
  if (!row || row.archived_at !== null) return;
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const history = appendHistory(row.history, { action: "reservation_archived", message: "Réservation archivée" });
  await supabase.from("reservations").update({ archived_at: now, history }).eq("id", id).is("archived_at", null);
  redirect("/admin");
}

export async function restoreReservation(id: string) {
  const row = await loadArchiveGuardRow(id);
  if (!row || row.archived_at === null) return;
  const supabase = createAdminClient();
  const history = appendHistory(row.history, { action: "reservation_restored", message: "Réservation restaurée" });
  await supabase.from("reservations").update({ archived_at: null, archived_by: null, history }).eq("id", id).not("archived_at", "is", null);
  redirect("/admin");
}

/**
 * Boucle simple sur les actions unitaires (pas de RPC Postgres dédiée),
 * cohérent avec le choix déjà documenté dans booking-repository.ts. Le
 * volume attendu (sélection manuelle sur une page de résultats) ne
 * justifie pas une fonction SQL groupée.
 */
export async function archiveReservations(formData: FormData) {
  const ids = formData.getAll("ids").map(String);
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  for (const id of ids) {
    const row = await loadArchiveGuardRow(id);
    if (!row || row.archived_at !== null) continue;
    const history = appendHistory(row.history, { action: "reservation_archived", message: "Réservation archivée (action groupée)" });
    await supabase.from("reservations").update({ archived_at: now, history }).eq("id", id).is("archived_at", null);
  }
  redirect("/admin");
}

export async function restoreReservations(formData: FormData) {
  const ids = formData.getAll("ids").map(String);
  const supabase = createAdminClient();
  for (const id of ids) {
    const row = await loadArchiveGuardRow(id);
    if (!row || row.archived_at === null) continue;
    const history = appendHistory(row.history, { action: "reservation_restored", message: "Réservation restaurée (action groupée)" });
    await supabase.from("reservations").update({ archived_at: null, archived_by: null, history }).eq("id", id).not("archived_at", "is", null);
  }
  redirect("/admin");
}
