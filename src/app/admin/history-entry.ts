/**
 * Format d'une entrée de reservations.history (jsonb), utilisé depuis la
 * Phase 5.2A. `at` reste la date canonique, `action` reste l'identifiant
 * technique de l'événement, `message` reste le libellé lisible affiché
 * tel quel. `from_status`/`to_status`/`reason` sont des champs optionnels
 * ajoutés en Phase 5.2B pour les événements de transition de statut —
 * les anciennes entrées (Phase 5.2A, ex. "Réservation créée") n'ont pas
 * ces champs et restent valides : tout lecteur de l'historique doit donc
 * traiter from_status/to_status/reason comme facultatifs.
 */
export type HistoryEntry = {
  at: string;
  action: string;
  message: string;
  from_status?: string;
  to_status?: string;
  reason?: string | null;
};

export function appendHistory(current: HistoryEntry[] | null | undefined, entry: Omit<HistoryEntry, "at">): HistoryEntry[] {
  return [...(current ?? []), { at: new Date().toISOString(), ...entry }];
}
