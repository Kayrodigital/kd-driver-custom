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
    `trip_type` explicite n'existe encore dans le tunnel de réservation.
    Depuis `src/domain/booking/airport-detection.ts`, la détection suit un
    ordre de priorité : place_id reconnu (départ ou destination) → alias
    texte reconnu → type explicite si un jour fourni → numéro de vol en
    dernier recours uniquement. Le place_id de l'aéroport Lyon-Saint-Exupéry
    est le même que celui déjà validé dans `popular-destinations.ts`. Limite
    connue et testée (`tests/unit/airport-detection.test.ts`) : si le client
    saisit une adresse manuelle non reconnue (sans place_id ni alias) et
    sans numéro de vol pour un trajet réellement à l'aéroport, il n'est pas
    détecté. Le tarif reste vérifiable et ajustable par le propriétaire dans
    l'admin quel que soit le résultat de cette détection.
20. **Minimum Luxe pour transfert aéroport et longue distance** — seule la
    valeur pour une course standard (40 €) est définitivement validée. Le
    minimum applicable à un transfert aéroport ou à une longue distance
    reste à confirmer ; en attendant, la configuration
    (`config/tarifs.example.json`, champ `minimumByTripType`) fixe
    explicitement `airport: null` et `longDistance: null` (aucun minimum
    appliqué) comme règle provisoire clairement documentée, jamais comme une
    valeur confirmée.
21. **Minimums Confort (20 €) et Berline (26 €)** — confirmés par le client
    et appliqués aux trois types de trajet calculés (course standard,
    transfert aéroport, longue distance), contrairement au minimum Luxe
    ci-dessus qui reste limité à la course standard. Rétablis le
    2026-08-04 après un signalement client (les valeurs avaient été
    laissées à `null` lors d'un sprint antérieur, sans minimum confirmé à
    l'époque pour ces deux catégories). Minimum Berline corrigé de 25 € à
    26 € le 2026-08-05 sur demande client.
22. **Lien du justificatif PDF (`/api/justificatif/[id]/pdf`)** — la
    "sécurité" du lien repose uniquement sur le fait que l'URL est
    construite sur l'identifiant UUID interne de la réservation (non
    énumérable), pas sur un jeton signé ni expirant. Suffisant pour éviter
    qu'un lien soit deviné au hasard, mais pas un vrai contrôle d'accès. À
    renforcer (jeton signé à durée limitée) si le client le juge nécessaire
    une fois le volume réel de justificatifs envoyés observé.
