export type UserStory = { role: string; goal: string; benefit: string; criteria: string[] };

export const userStories: UserStory[] = [
  {
    role: "visiteur", goal: "réserver rapidement un trajet", benefit: "obtenir une estimation sans perdre de temps",
    criteria: ["L’écran 1 affiche au maximum 5 champs avant le premier résultat.", "Le CTA reste désactivé tant que départ, destination, date et heure ne sont pas valides.", "Le calcul se lance en une seule action."],
  },
  {
    role: "visiteur", goal: "utiliser la géolocalisation", benefit: "ne pas saisir mon adresse de départ manuellement",
    criteria: ["Le bouton « Utiliser ma position actuelle » est visible sous ou dans le champ départ.", "L’adresse détectée est proposée pour confirmation, jamais appliquée sans validation.", "En cas de refus GPS, la saisie manuelle reste immédiatement disponible."],
  },
  {
    role: "visiteur", goal: "modifier l’adresse détectée", benefit: "corriger une détection imprécise",
    criteria: ["L’adresse proposée après géolocalisation reste éditable comme un champ texte normal.", "La modification manuelle annule la source « géolocalisation » au profit de « manuel »."],
  },
  {
    role: "visiteur", goal: "comparer les catégories de véhicules", benefit: "choisir celle qui correspond à mon besoin",
    criteria: ["Toutes les catégories actives sont affichées, y compris celles sur devis.", "Chaque carte affiche capacité passagers, capacité bagages et tarif ou « Sur devis ».", "Le choix d’une carte ne recalcule jamais le prix côté client."],
  },
  {
    role: "visiteur", goal: "comprendre un prix estimé", benefit: "savoir ce qui est inclus avant de continuer",
    criteria: ["Le prix affiché est explicitement qualifié d’« estimé ».", "Un minimum tarifaire, s’il s’applique, est visible sur la carte.", "Le prix final est toujours recalculé côté serveur avant confirmation."],
  },
  {
    role: "visiteur", goal: "continuer avec une catégorie sur devis", benefit: "réserver même sans prix immédiat",
    criteria: ["La mention « Sur devis » n’empêche jamais de cliquer sur « Choisir ».", "Le récapitulatif et la confirmation reflètent le statut « sur devis » sans afficher de faux prix."],
  },
  {
    role: "visiteur", goal: "ajouter des passagers et des bagages", benefit: "que le chauffeur soit informé de mes besoins",
    criteria: ["Les champs passagers/bagages sont visibles sans dépliage sur l’écran 3.", "Un dépassement de la capacité du véhicule choisi affiche un avertissement, sans bloquer."],
  },
  {
    role: "visiteur", goal: "ajouter un siège enfant", benefit: "voyager en sécurité avec un enfant",
    criteria: ["L’option est disponible dans le bloc « Ajouter des options », désactivée par défaut.", "L’absence de sélection n’empêche jamais de continuer."],
  },
  {
    role: "visiteur", goal: "ajouter un animal", benefit: "informer le chauffeur avant le trajet",
    criteria: ["L’option est visible dans le même bloc que le siège enfant.", "Aucune validation supplémentaire n’est requise pour cette option."],
  },
  {
    role: "visiteur", goal: "ajouter un numéro de vol", benefit: "que mon chauffeur suive mon horaire réel",
    criteria: ["Le champ n’apparaît que si le trajet est identifié comme un transfert aéroport.", "Le champ reste facultatif même dans ce contexte."],
  },
  {
    role: "visiteur", goal: "réserver pour une autre personne", benefit: "organiser un trajet que je ne prends pas moi-même",
    criteria: ["Une case à cocher fait apparaître les champs du passager (prénom, téléphone).", "Ces champs restent masqués tant que la case n’est pas cochée."],
  },
  {
    role: "visiteur", goal: "réserver sans compte", benefit: "ne pas perdre de temps à m’inscrire",
    criteria: ["« Continuer sans compte » est le parcours par défaut, mis en avant visuellement.", "Seul le téléphone est obligatoire ; e-mail et prénom restent facultatifs.", "Aucune étape du parcours n’exige la création d’un compte avant la confirmation."],
  },
  {
    role: "visiteur", goal: "continuer avec Google", benefit: "aller plus vite si j’ai déjà un compte Google",
    criteria: ["Le bouton Google est présenté comme une option secondaire, jamais comme un préalable.", "Un échec (pop-up bloqué, refus) ramène immédiatement au formulaire invité, données conservées."],
  },
  {
    role: "visiteur", goal: "payer au chauffeur", benefit: "régler simplement sans passer par une carte bancaire",
    criteria: ["« Payer au chauffeur » est le choix par défaut du récapitulatif.", "Ce choix n’implique aucun appel à Stripe.", "Le bouton principal devient « Confirmer la réservation »."],
  },
  {
    role: "visiteur", goal: "payer en ligne", benefit: "régler à l’avance quand c’est possible",
    criteria: ["Le paiement en ligne est proposé comme option, jamais imposé.", "Le prix est recalculé côté serveur avant toute tentative de paiement.", "Une catégorie sur devis ne déclenche jamais Stripe automatiquement."],
  },
  {
    role: "visiteur", goal: "attendre la confirmation du chauffeur", benefit: "savoir que ma demande est bien prise en compte pendant l’attente",
    criteria: ["Le statut affiché reste compréhensible (« Nouvelle », « Client contacté »…).", "Aucun message n’implique une confirmation ferme tant qu’elle n’a pas eu lieu."],
  },
  {
    role: "visiteur", goal: "recevoir une confirmation claire", benefit: "être rassuré immédiatement après ma demande",
    criteria: ["La référence de la demande est visible immédiatement.", "Le message distingue « réservation confirmée » de « demande transmise, en attente ».", "Toutes les informations saisies (trajet, véhicule, tarif, contact) sont récapitulées."],
  },
  {
    role: "visiteur", goal: "appeler ou contacter KD Driver", benefit: "obtenir une réponse rapide en cas de besoin",
    criteria: ["Un bouton Appeler et un bouton WhatsApp sont visibles sur l’écran de confirmation.", "Le numéro utilisé est celui de KD Driver, jamais celui du client."],
  },
  {
    role: "équipe KD Driver", goal: "voir une nouvelle réservation", benefit: "la traiter sans délai",
    criteria: ["La demande apparaît dans la liste avec référence, trajet, date, téléphone et statut.", "Le statut initial est « Nouvelle » ou « Devis demandé » selon le cas."],
  },
  {
    role: "équipe KD Driver", goal: "modifier ou confirmer un tarif", benefit: "ajuster le prix avant paiement",
    criteria: ["Le tarif final est modifiable depuis la fiche réservation.", "La modification est tracée dans l’historique des événements."],
  },
  {
    role: "équipe KD Driver", goal: "générer un lien Stripe", benefit: "proposer un paiement en ligne à la demande",
    criteria: ["Le lien est généré à la demande depuis la fiche, jamais automatiquement.", "Le lien généré peut être copié et renvoyé au client."],
  },
  {
    role: "équipe KD Driver", goal: "mettre à jour le statut", benefit: "refléter l’avancement réel de la course",
    criteria: ["Les statuts disponibles correspondent à la liste validée (Nouvelle → … → Terminée/Annulée).", "Chaque changement de statut est horodaté dans l’historique."],
  },
  {
    role: "équipe KD Driver", goal: "terminer ou annuler une réservation", benefit: "clore proprement le dossier",
    criteria: ["L’annulation demande une confirmation explicite avant d’être appliquée.", "Une réservation terminée reste consultable dans l’historique, avec son statut final."],
  },
];
