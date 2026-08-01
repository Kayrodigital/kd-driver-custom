-- Phase 5.2A : historique des actions propriétaire sur une réservation.
-- Colonne additive nullable-safe (défaut '[]') plutôt qu'une nouvelle table
-- d'événements relationnelle : à ce stade un seul type d'entité (la
-- réservation) est concerné, l'historique lui est strictement rattaché,
-- et une table séparée ajouterait une jointure + RLS pour un gain nul tant
-- qu'aucune autre partie du produit n'a besoin d'interroger les événements
-- indépendamment de leur réservation. Ne recrée pas booking_events
-- (supprimée au Sprint 3A comme table morte, jamais utilisée par le code).

alter table reservations
  add column if not exists history jsonb not null default '[]'::jsonb;

-- Rétro-remplissage : une entrée "créée" pour les réservations existantes,
-- à partir de created_at (déjà en base), pour que l'historique ne parte pas
-- vide sur les demandes déjà reçues.
update reservations
set history = jsonb_build_array(
  jsonb_build_object('at', created_at, 'action', 'created', 'message', 'Réservation créée')
)
where history = '[]'::jsonb;
