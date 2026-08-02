# Informations à valider avec le client

Ce document liste les informations mentionnées ou évoquées dans les contenus du
site qui ne sont pas confirmées techniquement ou contractuellement, et qui ne
doivent donc pas être affirmées comme des faits tant qu'elles n'ont pas été
validées. Les textes actuels ont été formulés de façon prudente en attendant
ces validations.

## Points à confirmer

1. **Suivi de vol** — le champ « numéro de vol » du formulaire de réservation
   est un champ texte libre transmis à l'équipe KDRIVE ; aucune intégration
   technique ne suit automatiquement les vols en temps réel. À confirmer si
   une telle fonction doit être développée, ou si la formulation actuelle
   (transmission manuelle, ajustement sur contact) doit rester définitive.
2. **Panneau nominatif à l'accueil** — non mentionné dans les contenus actuels
   tant que ce point n'est pas confirmé par le client.
3. **Capacités bagages par catégorie de véhicule** (Berline, Confort, Luxe,
   Van, Monospace) — non affichées avec un chiffre précis, en attente des
   valeurs réelles.
4. **Flotte réelle** — modèles et marques des véhicules effectivement utilisés,
   pour remplacer les visuels et descriptions génériques.
5. **Modalités de paiement par carte** — non affirmées comme disponibles tant
   que l'intégration de paiement (Stripe ou autre) n'est pas finalisée ; le
   site indique que les modalités de règlement sont confirmées avec KDRIVE
   lors de la prise en charge.
6. **Facturation** (entreprise) — à confirmer avant toute promesse de
   facturation automatisée ou de compte entreprise.
7. **Horaires ou disponibilité** — aucune plage horaire ni disponibilité
   24 h/24 ou 7 j/7 n'est affirmée ; à confirmer si une plage réelle doit être
   communiquée.
8. **Zones réellement desservies** — au-delà de Lyon, Villeurbanne et
   l'agglomération lyonnaise déjà mentionnées, toute extension de zone doit
   être confirmée avant d'être ajoutée aux contenus.
9. **Prestations incluses dans Luxe, Van et Monospace** — actuellement décrites
   de façon volontairement générale (catégorie premium sur devis, solution
   adaptée aux groupes, solution modulable) en l'absence de détails confirmés
   sur le contenu exact de ces prestations.
10. **WhatsApp public** — aucun bouton WhatsApp public n'a été ajouté au menu
    mobile ni à la barre d'actions basse tant que les points suivants ne sont
    pas confirmés :
    - numéro WhatsApp public à confirmer (ne pas réutiliser automatiquement
      un numéro interne ou propriétaire déjà utilisé pour les notifications
      de réservation) ;
    - consentement du propriétaire à exposer ce numéro publiquement ;
    - message prérempli à valider avant intégration ;
    - horaires ou disponibilité à ne pas promettre en l'absence de
      confirmation.
11. **Siège enfant** — évoqué dans le brief initial du sprint SEO, jamais
    confirmé comme service réellement proposé ; non ajouté à la FAQ ni aux
    pages tant que ce n'est pas confirmé.
12. **Réservation pour une autre personne** — le site indique qu'une demande
    peut être faite pour un tiers en renseignant ses coordonnées dans le
    formulaire et le champ commentaire ; il n'existe pas de fonction dédiée
    (compte, profil tiers) — à confirmer que cette formulation reste
    suffisante ou si une fonction spécifique doit être développée.
13. **E-mail public** — aucune adresse e-mail de contact n'est affichée sur le
    site ; à fournir si un e-mail destiné aux visiteurs doit être publié.
14. **Conditions d'annulation** — la FAQ indique de contacter KDRIVE par
    téléphone pour modifier ou annuler une demande ; aucune condition
    (délai, frais éventuels) n'est affirmée tant qu'elle n'est pas confirmée.
15. **Justificatifs** (factures, reçus) — non mentionnés sur le site ; à
    confirmer si KDRIVE peut en fournir avant d'ajouter cette information.
16. **Péages et arrêts inclus** (longues distances) — aucune mention de
    péages ou d'arrêts inclus/gratuits n'est faite ; à confirmer avant tout
    ajout de ce type de précision.
17. **Mise à disposition** — durée minimale, tarif horaire ou conditions
    précises non affichés ; le site indique que la disponibilité et le tarif
    sont confirmés au cas par cas par KDRIVE.
18. **Zones longues distances** — aucune destination précise n'est citée ;
    le site indique uniquement que les trajets hors zone Lyon et
    agglomération font l'objet d'un devis, sans lister de villes tant
    qu'elles ne sont pas confirmées.
19. **Détection du trajet aéroport (moteur tarifaire)** — aucun champ
    `trip_type` explicite n'existe encore dans le tunnel de réservation. La
    détection actuelle (`isAirportTrip`, dans `create-booking.ts`) repose
    uniquement sur la présence d'un numéro de vol renseigné par le client :
    - un client se rendant à l'aéroport sans indiquer de numéro de vol ne
      sera pas détecté comme trajet aéroport ;
    - un client indiquant un numéro de vol pour une prise en charge
      indirecte (pas à l'aéroport) sera détecté à tort comme trajet
      aéroport.
    Ce mécanisme reste volontairement documenté comme fragile plutôt que
    présenté comme fiable. Le tarif reste vérifiable et ajustable par le
    propriétaire dans l'admin quel que soit le résultat de cette détection.
    Une piste d'amélioration (non développée) : détection assistée par
    `place_id`/catégorie Google du lieu de départ ou de destination, utilisée
    uniquement comme aide, avec confirmation ou correction manuelle côté
    propriétaire.
20. **Minimum Luxe pour transfert aéroport et longue distance** — seule la
    valeur pour une course standard (40 €) est définitivement validée. Le
    minimum applicable à un transfert aéroport ou à une longue distance
    reste à confirmer ; en attendant, la configuration
    (`config/tarifs.example.json`, champ `minimumByTripType`) fixe
    explicitement `airport: null` et `longDistance: null` (aucun minimum
    appliqué) comme règle provisoire clairement documentée, jamais comme une
    valeur confirmée.
