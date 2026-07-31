-- Sprint 3A: simplification du tunnel en une demande rapide sans véhicule ni paiement.

-- Le véhicule n'est plus choisi par le client ; il sera assigné par le chauffeur/l'admin.
alter table public.reservations alter column vehicle_id drop not null;

-- Le nom de famille et l'e-mail deviennent facultatifs côté client.
alter table public.customers alter column last_name drop not null;
alter table public.customers alter column email drop not null;

-- Distingue une demande d'estimation d'une demande de rappel.
alter table public.reservations
  add column request_type text not null default 'estimate'
  check (request_type in ('estimate', 'callback'));

-- Nouveau cycle de statut minimal (remplace pending_confirmation/rejected).
alter table public.reservations drop constraint reservations_status_check;
update public.reservations set status = 'new' where status not in ('new', 'contacted', 'confirmed', 'completed', 'cancelled', 'quote_requested');
alter table public.reservations
  add constraint reservations_status_check
  check (status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled', 'quote_requested'));
alter table public.reservations alter column status set default 'new';

-- Nettoyage : tables du schéma sprint 1 remplacées par customers/vehicles/reservations
-- (sprint 2) et jamais utilisées par l'application, source de confusion pour l'admin.
drop trigger if exists bookings_log_created on public.bookings;
drop function if exists private.log_booking_created();
drop table if exists public.booking_options;
drop table if exists public.booking_events;
drop table if exists public.bookings;
drop table if exists public.vehicle_categories;
