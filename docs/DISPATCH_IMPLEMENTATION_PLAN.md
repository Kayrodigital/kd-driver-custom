# Plan d'implémentation — Dispatch chauffeurs (groupe WhatsApp)

Ce document est **uniquement de la documentation de préparation**. Aucun
code, aucune migration Supabase, aucun webhook WhatsApp n'a été implémenté
dans le cadre de ce sprint. Il décrit le travail nécessaire pour faire
correspondre le système réel (Supabase + admin) au parcours validé dans
`/booking-ux-preview-v2` : client → KDRIVE → annonce anonymisée dans un
groupe WhatsApp de chauffeurs → chauffeur retenu → message privé → bon →
confirmation client. Paiement au chauffeur (TPE), pas de paiement en ligne.

## 1. Nouveau modèle de statuts

Statuts actuels (`reservations.status`, sprint 3A) : `new`, `contacted`,
`confirmed`, `completed`, `cancelled`, `quote_requested`.

Statuts cibles pour représenter le cycle de dispatch complet :

| Statut | Sens |
|---|---|
| `new` | Demande reçue, non encore traitée par le propriétaire |
| `quote_requested` | Catégorie sur devis (Van/Monospace) ou hors barème, en attente de contact |
| `dispatch_pending` | Tarif confirmé par le propriétaire, annonce pas encore diffusée dans le groupe |
| `dispatch_broadcast` | Annonce diffusée dans le groupe WhatsApp, en attente d'un chauffeur intéressé |
| `assigned` | Un chauffeur a été retenu, informations complètes transmises en privé |
| `confirmed` | Client informé que la course est confirmée (chauffeur + véhicule) |
| `completed` | Course réalisée |
| `cancelled` | Annulée à n'importe quelle étape |

Ordre de transition strict : `new`/`quote_requested` → `dispatch_pending` →
`dispatch_broadcast` → `assigned` → `confirmed` → `completed`, avec
`cancelled` atteignable depuis n'importe quel statut non terminal.

## 2. Nouvelles colonnes probables

Sur `reservations` :
- `dispatch_status_changed_at` (timestamptz) — horodatage du dernier
  changement de statut de dispatch, pour historique et éventuel SLA.
- `assigned_driver_id` (uuid, nullable, FK vers une future table
  `drivers`) — chauffeur retenu.
- `commission_rate` ou `commission_cents` (numeric/integer, nullable) —
  valeur figée au moment de l'affectation (ne doit pas bouger
  rétroactivement si la règle de commission change plus tard).
- `driver_net_cents` (integer, nullable) — montant net dû au chauffeur,
  calculé et figé à l'affectation.
- `broadcast_message` (text, nullable) — texte exact de l'annonce
  anonymisée envoyée dans le groupe (pour traçabilité, copié/collé
  manuellement en V1).
- `broadcast_sent_at` (timestamptz, nullable).

Nouvelle table `dispatch_events` (append-only, historique) :
- `id`, `reservation_id` (FK), `event_type` (`broadcast`, `assigned`,
  `reassigned`, `cancelled_by_driver`, `confirmed_to_client`, …),
  `actor` (texte libre : nom du propriétaire ou "système"), `created_at`,
  `note` (texte libre).

## 3. Modèle chauffeur futur (`drivers`)

Table minimale envisagée (non créée ce sprint) :
- `id`, `full_name`, `phone`, `vehicle_category` (référence aux catégories
  existantes), `vehicle_plate`, `active` (boolean), `created_at`.
- Pas de compte utilisateur/authentification chauffeur en V1 (le chauffeur
  n'a pas d'accès à l'admin ni à Supabase) — uniquement une fiche
  administrative interne pour retrouver rapidement ses coordonnées et
  éviter de ressaisir un numéro à chaque affectation.
- Relation `reservations.assigned_driver_id → drivers.id`, nullable tant
  qu'aucun chauffeur n'est affecté.

## 4. Génération de l'annonce anonymisée

Contenu strictement limité pour respecter la confidentialité client :
trajet (villes/quartiers, jamais l'adresse exacte), date/heure, catégorie
de véhicule, durée estimée, tarif net proposé au chauffeur — **jamais** le
nom, le téléphone ou l'adresse précise du client tant que le chauffeur n'a
pas été retenu. Génération V1 : gabarit de texte pré-rempli affiché dans
l'admin, à copier-coller manuellement dans le groupe WhatsApp (pas
d'intégration API WhatsApp Business en V1, cf. `docs/CLIENT_CONTENT_VALIDATION.md`
et la contrainte "pas de vrais messages WhatsApp envoyés automatiquement").

## 5. Calcul de la commission

- Le taux de commission doit être une valeur de configuration (pas codée en
  dur), avec un historique de versions similaire à `config/tarifs.example.json`
  pour la grille tarifaire, afin qu'un changement de taux futur n'affecte
  pas rétroactivement les courses déjà affectées.
- Calculée et figée (`commission_cents`) au moment du passage à
  `assigned`, jamais recalculée dynamiquement ensuite.
- Le taux exact n'est pas encore confirmé par le client — à documenter
  comme point en attente dans `CLIENT_CONTENT_VALIDATION.md` avant toute
  implémentation réelle.

## 6. Net chauffeur

- `driver_net_cents = pricing.totalCents - commission_cents`, calculé et
  figé au même moment que la commission.
- Affiché dans l'annonce anonymisée (le chauffeur voit le net proposé, pas
  le calcul de commission détaillé).

## 7. Affectation

- Action manuelle dans l'admin : le propriétaire sélectionne le chauffeur
  qui a répondu dans le groupe, saisit/retrouve sa fiche `drivers`, et
  déclenche le passage à `assigned`.
- Cette action doit être atomique (transaction) : mise à jour du statut,
  écriture de `assigned_driver_id`, `commission_cents`, `driver_net_cents`,
  et insertion d'un `dispatch_events` en une seule opération, pour éviter
  un état incohérent en cas d'échec partiel.

## 8. Génération du bon

- Deux versions distinctes déjà maquettées dans `/booking-ux-preview-v2`
  (`voucher.tsx`) : bon client (référence, trajet, date/heure, catégorie,
  tarif, sans coordonnées chauffeur tant que non confirmé) et bon interne
  (mêmes informations + chauffeur affecté + net chauffeur + commission,
  réservé à l'usage du propriétaire).
- Génération V1 envisagée : rendu HTML/PDF simple à la demande depuis
  l'admin, pas d'envoi automatique par e-mail/SMS dans un premier temps.

## 9. Notifications client

- Notification à la confirmation (`assigned` → `confirmed`) uniquement :
  chauffeur, véhicule, plaque, heure de prise en charge.
- Pas de notification à chaque changement de statut intermédiaire
  (`dispatch_pending`, `dispatch_broadcast`) pour ne pas inquiéter le
  client avec des étapes internes qui ne le concernent pas.
- Canal à confirmer (SMS via un futur fournisseur, ou e-mail Brevo comme le
  reste du site) — aucun envoi réel dans ce sprint.

## 10. Notifications propriétaire

- Le propriétaire est notifié dès `new`/`quote_requested` (comportement
  déjà existant), et doit ensuite piloter manuellement les étapes
  suivantes depuis l'admin (pas de notification automatique supplémentaire
  nécessaire pour `dispatch_broadcast`, puisque c'est lui qui déclenche
  cette étape).

## 11. Historique

- `dispatch_events` (voir point 2) sert de source de vérité pour
  l'historique affiché dans l'écran "Historique" de `/booking-ux-preview-v2`
  (screens-owner.tsx, écran P11).
- Conserver l'historique même après `completed`/`cancelled` (append-only,
  jamais de suppression).

## 12. Confidentialité

Reprend et formalise la matrice déjà présente dans
`/booking-ux-preview-v2` (`confidentiality-matrix.tsx`) :

| Information | Visible dans l'annonce groupe | Visible chauffeur (après affectation) | Visible client |
|---|---|---|---|
| Nom du client | Non | Oui (privé) | — (le sien) |
| Téléphone du client | Non | Oui (privé) | — (le sien) |
| Adresse exacte | Non (ville/quartier seulement) | Oui (privé) | Oui (la sienne) |
| Tarif net chauffeur | Oui (dans l'annonce) | Oui | Non |
| Commission | Non | Non | Non |
| Nom/téléphone du chauffeur | Non (avant affectation) | — (le sien) | Oui (après confirmation) |

## 13. Ordre des migrations

Migrations à prévoir, dans cet ordre, chacune testée isolément avant la
suivante :
1. Ajout des nouveaux statuts à la contrainte `reservations_status_check`
   (`ALTER TABLE ... DROP CONSTRAINT ... ADD CONSTRAINT ...`), en gardant
   les statuts existants pour ne rien casser en production.
2. Ajout des colonnes nullables sur `reservations` (`assigned_driver_id`,
   `commission_cents`, `driver_net_cents`, `broadcast_message`,
   `broadcast_sent_at`, `dispatch_status_changed_at`) — nullable partout,
   donc sans effet sur les lignes existantes.
3. Création de la table `drivers` (vide au départ).
4. Ajout de la FK `reservations.assigned_driver_id → drivers.id`.
5. Création de la table `dispatch_events`.
6. RLS : `deny all` pour `anon`/`authenticated` sur `drivers` et
   `dispatch_events`, à l'identique du modèle déjà en place sur
   `reservations`/`customers` (service role uniquement, bypass RLS côté
   admin).

## 14. Plan de tests

- Tests unitaires purs sur le calcul commission/net chauffeur (fonction
  pure, comme `pricing-engine.ts`), avant tout branchement Supabase.
- Tests unitaires sur les transitions de statut autorisées (refuser une
  transition qui saute une étape, ex. `new` → `assigned` directement).
- Tests d'intégration sur l'affectation atomique (statut + colonnes +
  event en une seule transaction), y compris le cas d'échec partiel
  (rollback complet attendu).
- Test manuel de bout en bout sur un environnement de preview (jamais en
  production) avant toute mise en service réelle.

## 15. Plan de rollback

- Chaque migration listée au point 13 doit avoir sa migration inverse
  écrite avant application (`DROP COLUMN`, restauration de l'ancienne
  contrainte de statut, `DROP TABLE`).
- Aucune migration de ce plan ne doit être appliquée en production tant
  que le workflow n'a pas été validé explicitement par le client sur un
  environnement de preview.
- En cas de problème après mise en service : possibilité de revenir au
  comportement actuel (statuts existants uniquement, pas de dispatch) en
  gardant les nouvelles colonnes nullables inutilisées plutôt que de les
  supprimer immédiatement, pour ne pas perdre les données déjà saisies
  pendant la période de test.

## 16. Risques et points de vigilance

- Le taux de commission et les modalités exactes de paiement du chauffeur
  ne sont pas confirmés — ne rien implémenter de réel tant que ce point
  n'est pas validé (cf. `CLIENT_CONTENT_VALIDATION.md`).
- Le processus WhatsApp reste 100 % manuel en V1 (copier-coller) : aucune
  intégration API WhatsApp Business ne doit être ajoutée sans validation
  explicite, pour éviter tout envoi de message réel non souhaité pendant
  le développement.
- La confidentialité (point 12) est la contrainte la plus sensible du
  projet : toute implémentation doit être revue spécifiquement sous cet
  angle avant mise en production (ne jamais exposer les coordonnées client
  dans l'annonce groupe, même par erreur de gabarit).

## Découpage en sous-sprints

- **PHASE 5.4A — Statuts et données de dispatch** : migrations 1 et 2
  (nouveaux statuts, nouvelles colonnes nullables sur `reservations`),
  fonctions pures de transition de statut, tests unitaires.
- **PHASE 5.4B — Calcul commission et net chauffeur** : configuration du
  taux, fonction pure de calcul, tests unitaires (indépendant de Supabase).
- **PHASE 5.4C — Annonce et affectation** : génération du gabarit
  d'annonce anonymisée dans l'admin, action d'affectation atomique
  (migrations 3 et 4 : table `drivers` + FK), tests d'intégration.
- **PHASE 5.4D — Notifications et bon** : notification client à la
  confirmation, génération des deux bons (client/interne), sans envoi
  automatique réel.
- **PHASE 5.4E — Historique** : migration 5 (`dispatch_events`),
  écran Historique branché sur les vraies données.
- **PHASE 5.4F — Base chauffeurs future** : évolution de la table
  `drivers` vers une gestion plus riche (disponibilité, zones, préférences
  de catégorie de véhicule), hors périmètre immédiat, à ne considérer
  qu'après validation du fonctionnement manuel des phases 5.4A–5.4E.

Aucune de ces phases n'a été commencée en dehors de la présente
documentation.
