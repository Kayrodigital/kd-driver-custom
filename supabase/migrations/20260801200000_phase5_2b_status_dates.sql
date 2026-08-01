-- Phase 5.2B : horodatage des transitions de statut opérationnel.
-- Colonnes additives nullables, aucune donnée existante détruite.

alter table reservations
  add column if not exists confirmed_at timestamptz,
  add column if not exists cancelled_at timestamptz,
  add column if not exists completed_at timestamptz,
  add column if not exists contacted_at timestamptz;

-- Backfill strictement limité aux lignes dont le statut actuel correspond
-- déjà : ne touche ni status, ni created_at, ni les montants, ni history.
update reservations set contacted_at = updated_at where status = 'contacted' and contacted_at is null;
update reservations set confirmed_at = updated_at where status = 'confirmed' and confirmed_at is null;
update reservations set cancelled_at = updated_at where status = 'cancelled' and cancelled_at is null;
update reservations set completed_at = updated_at where status = 'completed' and completed_at is null;
