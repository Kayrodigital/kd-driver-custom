-- Justificatif de réservation préalable : chauffeur/véhicule réellement
-- affecté à la course, distinct du profil propriétaire global (variables
-- d'env). Colonnes additives nullables, aucune donnée existante détruite.
-- Jamais pré-remplies par défaut : écrites uniquement au moment où l'admin
-- confirme explicitement la course (Parcours A ou chauffeur externe).

alter table reservations
  add column if not exists assigned_driver_name text,
  add column if not exists assigned_driver_phone text,
  add column if not exists assigned_vehicle_label text,
  add column if not exists assigned_vehicle_plate text;
