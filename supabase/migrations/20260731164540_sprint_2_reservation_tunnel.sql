create table public.customers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  pricing_mode text not null check (pricing_mode in ('calculated', 'quote')),
  max_passengers smallint not null check (max_passengers > 0),
  max_luggage smallint not null check (max_luggage >= 0),
  sort_order smallint not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  idempotency_key uuid not null unique,
  customer_id uuid not null references public.customers(id),
  vehicle_id uuid not null references public.vehicles(id),
  status text not null check (status in ('pending_confirmation','confirmed','rejected','cancelled','completed')),
  pickup_address text not null,
  pickup_latitude double precision,
  pickup_longitude double precision,
  pickup_place_id text,
  pickup_source text not null check (pickup_source in ('manual','autocomplete','geolocation')),
  pickup_accuracy_meters double precision check (pickup_accuracy_meters is null or pickup_accuracy_meters >= 0),
  destination_address text not null,
  destination_latitude double precision,
  destination_longitude double precision,
  destination_place_id text,
  pickup_at timestamptz not null,
  passengers smallint not null check (passengers between 1 and 20),
  luggage smallint not null check (luggage between 0 and 30),
  distance_meters integer not null check (distance_meters > 0),
  duration_seconds integer not null check (duration_seconds > 0),
  is_airport_trip boolean not null default false,
  pricing_mode text not null check (pricing_mode in ('calculated', 'quote')),
  amount_cents integer check (amount_cents is null or amount_cents >= 0),
  currency text not null default 'EUR' check (currency = 'EUR'),
  pricing_rule_version text not null,
  pricing_snapshot jsonb not null check (jsonb_typeof(pricing_snapshot) = 'object'),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (pickup_latitude is null or pickup_latitude between -90 and 90),
  check (pickup_longitude is null or pickup_longitude between -180 and 180),
  check (destination_latitude is null or destination_latitude between -90 and 90),
  check (destination_longitude is null or destination_longitude between -180 and 180),
  check ((pricing_mode = 'quote' and amount_cents is null) or (pricing_mode = 'calculated' and amount_cents is not null))
);

create index reservations_customer_id_idx on public.reservations (customer_id);
create index reservations_vehicle_id_idx on public.reservations (vehicle_id);
create index reservations_pickup_at_idx on public.reservations (pickup_at);
create index reservations_status_idx on public.reservations (status);
create index reservations_created_at_idx on public.reservations (created_at desc);

alter table public.customers enable row level security;
alter table public.vehicles enable row level security;
alter table public.reservations enable row level security;

revoke all on table public.customers from anon, authenticated;
revoke all on table public.vehicles from anon, authenticated;
revoke all on table public.reservations from anon, authenticated;

create policy "deny direct access to customers" on public.customers for all to anon, authenticated using (false) with check (false);
create policy "deny direct access to vehicles" on public.vehicles for all to anon, authenticated using (false) with check (false);
create policy "deny direct access to reservations" on public.reservations for all to anon, authenticated using (false) with check (false);

insert into public.vehicles (slug, label, pricing_mode, max_passengers, max_luggage, sort_order) values
  ('berline', 'Berline', 'calculated', 4, 3, 10),
  ('confort', 'Confort', 'calculated', 4, 3, 20),
  ('luxe', 'Luxe', 'quote', 3, 2, 30),
  ('van', 'Van', 'quote', 7, 7, 40),
  ('monospace', 'Monospace', 'quote', 6, 5, 50);

insert into public.pricing_rules (version, rules, active)
values ('provisional-2026-07', '{"source":"config/tarifs.example.json","status":"provisional"}'::jsonb, true)
on conflict (version) do update set rules = excluded.rules, active = excluded.active;
