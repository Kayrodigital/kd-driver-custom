-- Sprint recette UX Phase 2 : transparence du prix + traçabilité de l'itinéraire.
-- Colonnes additives et nullables : aucune donnée existante n'est perturbée.

alter table reservations
  add column if not exists estimated_price_cents integer,
  add column if not exists confirmed_price_cents integer,
  add column if not exists pricing_status text,
  add column if not exists price_adjustment_reason text,
  add column if not exists price_confirmed_at timestamptz,
  add column if not exists route_provider text,
  add column if not exists route_encoded_polyline text,
  add column if not exists route_calculated_at timestamptz;

alter table reservations
  add constraint reservations_pricing_status_check
  check (pricing_status is null or pricing_status in ('estimated', 'pending_confirmation', 'confirmed', 'adjusted', 'quote_required'));

-- Rétro-remplissage des lignes existantes à partir des colonnes déjà en place
-- (amount_cents / pricing_mode) pour rester cohérent tant que confirmed_price
-- n'est pas encore géré par le back-office (Phase 5).
update reservations
set
  estimated_price_cents = amount_cents,
  pricing_status = case when pricing_mode = 'quote' then 'quote_required' else 'estimated' end,
  route_provider = 'google_routes'
where estimated_price_cents is null;
