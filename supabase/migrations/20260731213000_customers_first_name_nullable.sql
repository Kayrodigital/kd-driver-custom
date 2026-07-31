-- Sprint 3A (correctif) : le prénom est facultatif dans la demande rapide,
-- mais customers.first_name était resté not null par oubli.
alter table public.customers alter column first_name drop not null;
