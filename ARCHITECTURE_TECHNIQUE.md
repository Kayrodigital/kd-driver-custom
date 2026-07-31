# Architecture technique cible

## Frontend
- Next.js App Router
- TypeScript strict
- Composants réutilisables
- Formulaire multi-étapes
- Validation partagée avec Zod

## Backend
- Route handlers ou fonctions serveur compatibles Netlify
- Service `pricing-engine`
- Service `maps-provider`
- Service `booking-service`
- Service `payment-service`
- Service `notification-service`

## Base de données
Tables minimales :
- `vehicle_categories`
- `pricing_rules`
- `bookings`
- `booking_options`
- `booking_events`
- `admin_users`

## Sécurité
- Row Level Security Supabase
- Tableau de bord protégé
- Validation serveur systématique
- Idempotence pour les webhooks Stripe
- Journal d'événements pour les changements de statut
- Limitation de fréquence sur les routes publiques

## Paiement
- Stripe Checkout
- Création de la session côté serveur
- Montant calculé côté serveur
- Confirmation par webhook signé
- Aucun statut `paid` basé sur le retour navigateur seul

## Cartographie
Créer une interface interne afin de pouvoir changer de fournisseur :
- autocompleteAddress
- geocodeAddress
- calculateRoute
- normalizeDistance

## SEO
- Pages serveur ou statiques selon le contenu
- Métadonnées par page
- JSON-LD
- Sitemap
- Canonical
- Hreflang lors de l'ajout de l'anglais
