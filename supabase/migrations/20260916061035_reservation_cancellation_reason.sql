-- Motif d'annulation ou de refus, saisi obligatoirement par l'admin
-- (liste fermée, cf. src/domain/dispatch/cancellation-reasons.ts).
-- Colonnes additives nullables, aucune donnée existante détruite ni modifiée :
-- les réservations déjà annulées/refusées restent valides avec ces colonnes
-- à null (aucun backfill, le motif n'existait pas avant cette migration).
-- Validation de la liste fermée faite côté application (isCancellationReasonCode),
-- comme pour le motif de refus historique (decline_reason_code n'existe pas
-- en base non plus, même logique) — pas de contrainte CHECK, cohérent avec
-- les migrations précédentes de ce projet.

alter table reservations
  add column if not exists cancellation_reason_code text,
  add column if not exists cancellation_reason_note text;
