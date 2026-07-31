create index bookings_vehicle_category_slug_idx
on public.bookings (vehicle_category_slug);

create policy "deny direct access to vehicle categories"
on public.vehicle_categories for all
to anon, authenticated
using (false)
with check (false);

create policy "deny direct access to pricing rules"
on public.pricing_rules for all
to anon, authenticated
using (false)
with check (false);

create policy "deny direct access to bookings"
on public.bookings for all
to anon, authenticated
using (false)
with check (false);

create policy "deny direct access to booking options"
on public.booking_options for all
to anon, authenticated
using (false)
with check (false);

create policy "deny direct access to booking events"
on public.booking_events for all
to anon, authenticated
using (false)
with check (false);

create policy "deny direct access to admin users"
on public.admin_users for all
to anon, authenticated
using (false)
with check (false);
