-- Nouvelle gamme publique (Essentiel/Premium/Van) : additive, réversible.
-- Les anciennes catégories (confort/berline/luxe/monospace) restent en base
-- (intégrité référentielle des réservations existantes) mais désactivées :
-- elles ne peuvent plus être sélectionnées pour une nouvelle réservation
-- (cf. SupabaseReservationRepository.create, qui filtre sur active = true).
-- "van" garde le même identifiant : seule sa configuration tarifaire change
-- (passe de "sur devis" à calculé, cf. config/tarifs.example.json), pas sa
-- ligne dans cette table — on met juste pricing_mode à jour pour rester
-- cohérent avec la config réelle.

insert into vehicles (slug, label, pricing_mode, max_passengers, max_luggage, sort_order, active)
values
  ('essential', 'Essentiel', 'calculated', 4, 3, 10, true),
  ('premium', 'Premium', 'calculated', 4, 3, 20, true)
on conflict (slug) do nothing;

update vehicles set pricing_mode = 'calculated', sort_order = 30 where slug = 'van';

update vehicles
set active = false
where slug in ('confort', 'berline', 'luxe', 'monospace');
