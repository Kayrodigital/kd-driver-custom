# Spécification fonctionnelle — MVP

## Parcours client
1. Saisir le départ et la destination.
2. Choisir la date et l'heure.
3. Indiquer le nombre de passagers et de bagages.
4. Choisir une catégorie de véhicule.
5. Voir un prix calculé ou l'indication « sur devis ».
6. Renseigner nom, téléphone et e-mail.
7. Ajouter les informations facultatives : vol, train, siège enfant, animal, réservation pour un tiers.
8. Choisir paiement en ligne ou confirmation manuelle selon le type de réservation.
9. Recevoir un récapitulatif.

## Catégories initiales
- Berline : tarif calculé
- Confort : tarif calculé
- Luxe : sur devis
- Van : sur devis
- Monospace : sur devis

## Règles tarifaires actuellement retenues à confirmer avant production
- Berline : 2,25 €/km + 5 €, minimum 25 €
- Confort : 2 €/km + 5 €, minimum 20 €
- Luxe : sur devis
- Van : sur devis
- Monospace : sur devis
- Course supérieure à 30 km : traitement hors course ou devis, sauf trajet aéroport selon règle finale validée

## Statuts de réservation
- draft
- pending_payment
- paid
- pending_confirmation
- confirmed
- rejected
- cancelled
- completed

## Administration minimale
- Liste des réservations
- Recherche par client, date et statut
- Détail d'une réservation
- Modification du statut
- Export CSV
- Affichage du montant et du mode de calcul

## Notifications MVP
- E-mail au client
- E-mail au gestionnaire
- WhatsApp en phase 2
