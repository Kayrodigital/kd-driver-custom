-- Archivage réversible des réservations : colonnes additives nullables,
-- aucune donnée existante détruite. `archived_at` non null = archivée ;
-- restaurer = remettre `archived_at`/`archived_by` à null (jamais de
-- suppression physique de ligne).
alter table reservations
  add column if not exists archived_at timestamptz,
  add column if not exists archived_by text;
