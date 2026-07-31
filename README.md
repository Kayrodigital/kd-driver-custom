# KD Driver — application sur mesure

Application de réservation VTC KD Driver. Ce dépôt est indépendant du projet WordPress et ne reprend aucune dépendance de Chauffeur Booking.

## Périmètre du Sprint 1

- Next.js App Router, TypeScript strict et Tailwind CSS
- moteur tarifaire isolé et testé
- recalcul systématique côté serveur
- catégories à prix calculé ou sur devis
- tunnel mobile : trajet, date, véhicule, estimation et coordonnées
- enregistrement Supabase idempotent
- page de confirmation sans paiement réel
- migration PostgreSQL avec RLS activé

Les règles de `config/tarifs.example.json` sont **provisoires**. Elles ne doivent pas être utilisées en production avant validation écrite des tarifs, suppléments et exceptions longue distance.

## Prérequis

- Node.js 20.9 ou plus récent
- pnpm
- un projet Supabase pour tester l’enregistrement réel

## Installation

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Puis ouvrir `http://localhost:3000/reserver`.

## Variables d’environnement

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
SUPABASE_SECRET_KEY=<secret-key-server-only>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<browser-key-restricted-by-domain>
GOOGLE_MAPS_SERVER_API_KEY=<server-key-restricted-to-required-apis>
ADMIN_USERNAME=<admin-basic-auth-user>
ADMIN_PASSWORD=<long-random-password>
```

La clé secrète est réservée aux route handlers serveur. Elle ne doit jamais être préfixée par `NEXT_PUBLIC_`, envoyée au navigateur ou ajoutée à Git.

Dans Google Cloud, activer **Maps JavaScript API**, **Places API (New)**, **Geocoding API** et **Routes API**. Restreindre la clé publique aux domaines autorisés et aux API navigateur. Restreindre séparément la clé serveur à Geocoding et Routes API. La géolocalisation du navigateur nécessite HTTPS en dehors de `localhost`.

## Sprint 2 — tunnel sans paiement

- `BookingSearch` réutilisable en variantes `inline`, `card` et `mobile`
- Google Place Autocomplete pour le départ et la destination
- géolocalisation ponctuelle du départ avec confirmation explicite
- reverse geocoding Google côté serveur
- calcul de distance et durée par Routes API côté serveur
- sélection des véhicules et tarif centralisé
- informations passager
- création idempotente dans `customers` et `reservations`
- récapitulatif de confirmation
- administration minimale protégée par HTTP Basic sur `/admin`

La position détectée reste uniquement dans l’état du formulaire jusqu’à la confirmation finale. L’application n’utilise jamais `watchPosition()` et une erreur de localisation ne bloque pas la saisie manuelle.

## Base de données

La migration initiale se trouve dans `supabase/migrations/`. Elle crée les catégories, règles tarifaires, réservations, options, événements et administrateurs. Toutes les tables du schéma `public` ont RLS activé et aucun accès direct n’est accordé aux rôles publics.

Après authentification et association du projet Supabase :

```bash
pnpm dlx supabase login
pnpm dlx supabase link --project-ref <project-ref>
pnpm dlx supabase db push
```

Vérifier la migration sur un projet de développement avant tout environnement de production.

## Vérification

```bash
pnpm test
pnpm lint
pnpm build
```

Le build peut aussi être validé avec `pnpm exec next build --webpack` dans un environnement qui interdit le port de travail interne de Turbopack.

## Garanties du moteur tarifaire

- distances normalisées en mètres
- monnaie calculée en centimes
- minimum appliqué après base et distance
- seuil longue distance testé à la frontière
- catégories Luxe, Van et Monospace sur devis
- détail du calcul et version des règles conservés avec la réservation
- prix éventuellement injecté par le navigateur ignoré

## Limites volontaires

- aucun paiement Stripe
- aucun e-mail ou WhatsApp
- aucune disponibilité chauffeur
- aucune page commerciale ou SEO complète
