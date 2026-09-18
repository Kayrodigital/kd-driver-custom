/**
 * Motif d'annulation ou de refus (liste fermée), saisi obligatoirement par
 * l'admin lorsqu'une réservation passe au statut "cancelled" — que ce soit
 * un refus avant confirmation (declineReservation) ou une annulation d'une
 * course déjà confirmée (cancelConfirmedReservation). Distinct de
 * `decline-reasons.ts` (motif de refus historique, Parcours C, qui pilote
 * le message client auto-généré) : ce module-ci alimente uniquement le
 * suivi interne (colonnes cancellation_reason_code / cancellation_reason_note),
 * sans toucher au mécanisme existant.
 */
export const CANCELLATION_REASON_CODES = [
  "client_unreachable",
  "no_response_after_followup",
  "price_declined",
  "driver_unavailable",
  "schedule_incompatible",
  "destination_not_served",
  "client_found_another_driver",
  "booking_error",
  "duplicate_request",
  "cancelled_by_client",
  "other",
] as const;

export type CancellationReasonCode = (typeof CANCELLATION_REASON_CODES)[number];

const REASON_LABELS: Record<CancellationReasonCode, string> = {
  client_unreachable: "Client injoignable",
  no_response_after_followup: "Aucune réponse après relance",
  price_declined: "Prix refusé",
  driver_unavailable: "Chauffeur indisponible",
  schedule_incompatible: "Horaire incompatible",
  destination_not_served: "Destination non desservie",
  client_found_another_driver: "Client ayant trouvé un autre chauffeur",
  booking_error: "Erreur de réservation",
  duplicate_request: "Demande en double",
  cancelled_by_client: "Annulation par le client",
  other: "Autre",
};

export function isCancellationReasonCode(value: string): value is CancellationReasonCode {
  return (CANCELLATION_REASON_CODES as readonly string[]).includes(value);
}

export function cancellationReasonLabel(code: CancellationReasonCode): string {
  return REASON_LABELS[code];
}

export type CancellationReasonResult =
  | { ok: true; code: CancellationReasonCode; note: string | null }
  | { ok: false; error: "cancellation_reason_required" | "cancellation_reason_note_required" };

/**
 * Validation pure (testable sans Supabase) du couple motif/commentaire
 * soumis par le formulaire admin : motif obligatoire parmi la liste
 * fermée, commentaire obligatoire uniquement si le motif choisi est "other".
 * Codes d'erreur préfixés `cancellation_` pour ne jamais entrer en
 * collision avec le "reason_required" déjà utilisé par l'ajustement de
 * tarif (adjustPrice, cf. actions.ts) — erreurs distinctes, messages distincts.
 */
export function validateCancellationReason(input: { code: string; note: string }): CancellationReasonResult {
  if (!isCancellationReasonCode(input.code)) return { ok: false, error: "cancellation_reason_required" };
  const note = input.note.trim();
  if (input.code === "other" && !note) return { ok: false, error: "cancellation_reason_note_required" };
  return { ok: true, code: input.code, note: input.code === "other" ? note : null };
}
