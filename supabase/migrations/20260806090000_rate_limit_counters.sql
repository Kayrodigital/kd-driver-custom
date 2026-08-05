-- Limite de débit applicative (réservations, tarification, brute-force
-- Basic Auth admin). Fenêtre fixe par clé (ex. "reservations:1.2.3.4"),
-- pas de données personnelles stockées au-delà de l'IP.
create table if not exists rate_limit_counters (
  key text primary key,
  window_start timestamptz not null,
  count integer not null default 1
);

alter table rate_limit_counters enable row level security;
revoke all on table rate_limit_counters from anon, authenticated;
create policy "deny direct access to rate limit counters" on rate_limit_counters for all to anon, authenticated using (false) with check (false);
