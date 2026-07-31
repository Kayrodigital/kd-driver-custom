# Critères d'acceptation

## Tarification
- Le prix est identique entre l'interface et le recalcul serveur.
- Un prix modifié manuellement dans le navigateur est ignoré.
- Le minimum par catégorie est respecté.
- Les catégories sur devis ne créent pas de paiement automatique.
- Les suppléments sont détaillés dans le récapitulatif.

## Réservation
- Une réservation valide est enregistrée une seule fois.
- Les champs obligatoires sont contrôlés côté client et serveur.
- Les dates passées sont refusées.
- Le client reçoit un identifiant de réservation.
- Le gestionnaire peut retrouver la réservation.

## Paiement
- Une réservation n'est marquée payée qu'après webhook valide.
- Les webhooks rejoués ne créent pas de doublon.
- Les erreurs Stripe sont journalisées sans exposer les secrets.

## Mobile
- Le formulaire fonctionne à 360 px de largeur.
- Les boutons restent accessibles.
- Les erreurs sont lisibles.
- La navigation clavier est possible.

## SEO
- Chaque page possède un H1 unique.
- Les pages commerciales ont title et description.
- Le sitemap est accessible.
- Les pages de confirmation et d'administration ne sont pas indexables.

## Performance et sécurité
- Aucun secret dans le dépôt.
- Les dépendances critiques sont documentées.
- Les données personnelles ne sont pas exposées publiquement.
