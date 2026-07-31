# KD Driver — Starter projet sur mesure

## Objectif
Construire en parallèle de la version WordPress une application web de réservation VTC robuste, SEO-friendly et déployable sur Netlify.

## Stack cible
- Next.js + TypeScript
- Tailwind CSS
- Netlify
- Supabase (PostgreSQL + Auth pour l'administration)
- Stripe Checkout
- API cartographique pour autocomplétion, distance et durée
- Service e-mail transactionnel
- WhatsApp officiel en phase 2

## Sous-domaine de test
`beta.kdrive-vtc-lyon.fr`

## Ordre de démarrage
1. Créer un nouveau dépôt GitHub indépendant du WordPress.
2. Importer ce dossier dans le dépôt.
3. Ouvrir le dépôt dans un nouveau projet Codex.
4. Coller le contenu de `PROMPT_CODEX_MASTER.md` comme première instruction.
5. Ne commencer que par le Sprint 1 décrit dans `PLAN_SPRINTS.md`.
6. Valider le tunnel de réservation avant de produire toutes les pages SEO.

## Règles de sécurité
- Ne jamais stocker de clé secrète dans Git.
- Recalculer le prix côté serveur.
- Ne jamais faire confiance au prix envoyé par le navigateur.
- Utiliser des variables d'environnement.
- Créer des migrations Supabase versionnées.
- Tester chaque règle tarifaire avec des scénarios reproductibles.

## Fichiers principaux
- `PROMPT_CODEX_MASTER.md` : instruction principale pour Codex
- `SPEC_FONCTIONNELLE.md` : périmètre fonctionnel
- `PLAN_SPRINTS.md` : exécution étape par étape
- `CRITERES_ACCEPTATION.md` : recette et validation
- `ARCHITECTURE_TECHNIQUE.md` : architecture cible
- `config/tarifs.example.json` : structure des règles tarifaires
- `.env.example` : variables requises
