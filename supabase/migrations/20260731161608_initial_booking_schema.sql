create extension if not exists pgcrypto;
create schema if not exists private;

create table public.vehicle_categories (
  slug text primary key,
  label text not null,
  pricing_mode text not null check (pricing_mode in ('calculated', 'quote')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  rules jsonb not null,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  check (jsonb_typeof(rules) = 'object')
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  idempotency_key uuid not null unique,
  status text not null check (status in ('draft','pending_payment','paid','pending_confirmation','confirmed','rejected','cancelled','completed')),
  pickup_address text not null,
  destination_address text not null,
  pickup_at timestamptz not null,
  passengers smallint not null check (passengers between 1 and 20),
  luggage smallint not null check (luggage between 0 and 30),
  vehicle_category_slug text not null references public.vehicle_categories(slug),
  distance_meters integer not null check (distance_meters between 0 and 2000000),
  is_airport_trip boolean not null default false,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  pricing_mode text not null check (pricing_mode in ('calculated', 'quote')),
  amount_cents integer check (amount_cents is null or amount_cents >= 0),
  currency text not null default 'EUR' check (currency = 'EUR'),
  pricing_breakdown jsonb not null,
  pricing_rule_version text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((pricing_mode = 'quote' and amount_cents is null) or (pricing_mode = 'calculated' and amount_cents is not null))
);

create table public.booking_options (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  option_code text not null,
  quantity integer not null default 1 check (quantity > 0),
  amount_cents integer check (amount_cents is null or amount_cents >= 0),
  details jsonb not null default '{}'::jsonb,
  unique (booking_id, option_code)
);

create table public.booking_events (
  id bigint generated always as identity primary key,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  event_type text not null,
  from_status text,
  to_status text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create index bookings_pickup_at_idx on public.bookings (pickup_at);
create index bookings_status_idx on public.bookings (status);
create index bookings_customer_email_idx on public.bookings (lower(customer_email));
create index booking_events_booking_id_idx on public.booking_events (booking_id, created_at);

alter table public.vehicle_categories enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_options enable row level security;
alter table public.booking_events enable row level security;
alter table public.admin_users enable row level security;

revoke all on table public.vehicle_categories from anon, authenticated;
revoke all on table public.pricing_rules from anon, authenticated;
revoke all on table public.bookings from anon, authenticated;
revoke all on table public.booking_options from anon, authenticated;
revoke all on table public.booking_events from anon, authenticated;
revoke all on table public.admin_users from anon, authenticated;

create function private.log_booking_created()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.booking_events (booking_id, event_type, to_status)
  values (new.id, 'booking.created', new.status);
  return new;
end;
$$;

revoke all on function private.log_booking_created() from public;

create trigger bookings_log_created
after insert on public.bookings
for each row execute function private.log_booking_created();

insert into public.vehicle_categories (slug, label, pricing_mode) values
  ('berline', 'Berline', 'calculated'),
  ('confort', 'Confort', 'calculated'),
  ('luxe', 'Luxe', 'quote'),
  ('van', 'Van', 'quote'),
  ('monospace', 'Monospace', 'quote');
