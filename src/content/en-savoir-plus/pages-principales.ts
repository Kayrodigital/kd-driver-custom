import type { LearnMorePage } from "./_shared";

// Contenus « En savoir plus » — /tarifs, /vehicules, /contact, /a-propos. Clé = slug.
// Aucun prix, modèle de véhicule ni capacité chiffrée n'est mentionné.

export const pagesPrincipalesLearnMore: Record<string, LearnMorePage> = {
  tarifs: {
    title: "Comprendre nos tarifs",
    items: [
      {
        title: "Comment le prix est calculé",
        paragraphs: [
          "Le prix d'une course dépend principalement du point de départ, de la destination, de l'horaire et du véhicule choisi. Un transfert vers l'aéroport, un trajet en ville, une mise à disposition à l'heure ou un long trajet vers une autre ville ne se calculent pas de la même manière.",
          "C'est pourquoi nous vous communiquons le tarif de votre course avant toute confirmation, par téléphone. Vous savez exactement ce que vous paierez avant de réserver.",
        ],
      },
      {
        title: "Un prix annoncé avant la course",
        paragraphs: [
          "Avec un chauffeur privé, le prix est convenu à l'avance : pas de compteur qui tourne pendant un embouteillage ni de majoration surprise à l'arrivée. Ce que nous vous annonçons au moment de la réservation est ce que vous payez.",
          "Si votre demande évolue avant le départ (arrêt supplémentaire, changement de destination, passagers en plus), nous vous indiquons le nouveau tarif avant de modifier la réservation.",
        ],
      },
      {
        title: "Ce qui est inclus dans le service",
        paragraphs: [
          "Chaque course comprend la prise en charge à l'adresse de votre choix, l'aide avec vos bagages et un trajet direct jusqu'à votre destination. Pour un vol ou un train, nous suivons votre horaire et votre chauffeur s'adapte en cas de retard.",
          "Des sièges enfants sont disponibles sur demande : signalez-le simplement à la réservation, avec l'âge des enfants, pour que nous prévoyions l'équipement adapté.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
          { label: "Nos véhicules", href: "/vehicules" },
        ],
      },
      {
        title: "Entreprises : facturation et trajets réguliers",
        paragraphs: [
          "Les professionnels peuvent recevoir une facture au nom de leur société pour chaque course. C'est la solution idéale pour l'accueil de clients, les déplacements de collaborateurs ou les rendez-vous d'affaires.",
          "Pour des besoins réguliers ou des journées complètes, la mise à disposition d'un chauffeur avec véhicule permet d'enchaîner plusieurs trajets. Contactez-nous pour en définir les modalités.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Longues distances et stations de ski",
        paragraphs: [
          "Nous assurons aussi des trajets vers d'autres villes et, en saison, des transferts vers les stations de ski des Alpes. Le tarif dépend de la destination et du nombre de passagers : nous vous le communiquons avant toute réservation.",
          "Pour ces trajets, prévenez-nous de la quantité de bagages et d'équipement (skis, poussette) afin de prévoir le véhicule adapté.",
        ],
        links: [
          { label: "Trajets longues distances", href: "/longues-distances" },
          { label: "Transferts vers les stations de ski", href: "/transfert-stations-ski-depuis-lyon" },
          { label: "Questions fréquentes", href: "/faq" },
        ],
      },
    ],
  },

  vehicules: {
    title: "Bien choisir votre véhicule",
    items: [
      {
        title: "Un véhicule adapté à votre trajet",
        paragraphs: [
          "Un voyageur seul pour un rendez-vous d'affaires, une famille avec ses valises, un petit groupe pour un événement : chaque trajet n'appelle pas le même véhicule. Au moment de la réservation, nous vous conseillons celui qui correspond à votre besoin.",
          "Indiquez-nous le nombre de passagers et de bagages, ainsi que tout équipement particulier (skis, poussette, matériel professionnel) : nous prévoyons le véhicule en conséquence.",
        ],
      },
      {
        title: "Confort et discrétion",
        paragraphs: [
          "Nos véhicules sont propres, entretenus et pensés pour que le trajet soit un moment calme : vous pouvez travailler, passer vos appels ou simplement vous reposer. Votre chauffeur reste discret et à votre écoute.",
          "Pour les déplacements professionnels, ce confort permet d'arriver à un rendez-vous détendu et à l'heure, ou d'accueillir un client dans les meilleures conditions.",
        ],
        links: [{ label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" }],
      },
      {
        title: "Familles et sièges enfants",
        paragraphs: [
          "Des sièges enfants sont disponibles sur demande. Précisez à la réservation l'âge des enfants pour que nous installions l'équipement adapté avant votre prise en charge.",
          "Pour les départs en vacances, nous vérifions avec vous l'espace nécessaire aux bagages afin que tout le monde voyage confortablement.",
        ],
      },
      {
        title: "Aéroport, gares et longues distances",
        paragraphs: [
          "Pour un transfert vers l'aéroport Lyon-Saint-Exupéry ou les gares lyonnaises, l'espace bagages compte autant que le confort. Pour un long trajet ou un transfert vers une station de ski, nous choisissons un véhicule adapté à la distance et à l'équipement.",
          "Votre chauffeur vous aide avec vos bagages au départ comme à l'arrivée.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Trajets longues distances", href: "/longues-distances" },
          { label: "Transferts vers les stations de ski", href: "/transfert-stations-ski-depuis-lyon" },
        ],
      },
      {
        title: "Réserver le bon véhicule",
        paragraphs: [
          "Le tarif dépend aussi du véhicule choisi : nous vous l'annonçons avant toute confirmation. Chaque réservation est validée par une personne de notre équipe, qui s'assure que le véhicule correspond à votre demande.",
        ],
        links: [
          { label: "Nos tarifs", href: "/tarifs" },
          { label: "Nous contacter", href: "/contact" },
        ],
      },
    ],
  },

  contact: {
    title: "Avant de nous contacter",
    items: [
      {
        title: "Les informations utiles pour réserver",
        paragraphs: [
          "Pour vous répondre rapidement, préparez l'adresse de prise en charge, la destination, la date et l'heure souhaitées, le nombre de passagers et de bagages. Pour un vol ou un train, ajoutez son numéro : nous suivons son horaire et adaptons la prise en charge en cas de retard.",
          "Signalez aussi tout besoin particulier : sièges enfants, arrêt intermédiaire, aide pour les bagages.",
        ],
      },
      {
        title: "Une réponse par une vraie personne",
        paragraphs: [
          "Chaque demande est traitée par un membre de notre équipe, pas par un automate. Nous vous confirmons la disponibilité, le véhicule et le tarif avant de valider la réservation.",
          "Le tarif est toujours communiqué à l'avance : vous savez ce que vous paierez avant de vous engager.",
        ],
        links: [{ label: "Nos tarifs", href: "/tarifs" }],
      },
      {
        title: "Demandes des entreprises",
        paragraphs: [
          "Pour un accueil de clients, un séminaire, un congrès ou des trajets réguliers, précisez le nom de votre société et vos besoins. Nous établissons une facture au nom de l'entreprise et pouvons organiser plusieurs trajets ou une mise à disposition.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Modifier ou annuler une réservation",
        paragraphs: [
          "Un changement d'horaire, de destination ou de nombre de passagers ? Contactez-nous dès que possible : nous adaptons votre réservation et vous indiquons, le cas échéant, le nouveau tarif avant de le confirmer.",
          "Pour les questions les plus courantes, consultez aussi notre page de questions fréquentes.",
        ],
        links: [{ label: "Questions fréquentes", href: "/faq" }],
      },
      {
        title: "Où intervenons-nous ?",
        paragraphs: [
          "Nous intervenons dans tout Lyon et la métropole lyonnaise : arrondissements de Lyon, communes de l'est, de l'ouest, du nord et du sud. Nous assurons aussi les transferts vers l'aéroport, les gares et les grands lieux d'événements, ainsi que des trajets longue distance.",
        ],
        links: [
          { label: "Zones desservies", href: "/zones-desservies" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
    ],
  },

  "a-propos": {
    title: "Notre façon de travailler",
    items: [
      {
        title: "Un service de chauffeur privé à Lyon",
        paragraphs: [
          "KDRIVE est un service de chauffeur privé basé à Lyon. Nous conduisons particuliers et professionnels dans toute la métropole, vers l'aéroport Lyon-Saint-Exupéry, les gares lyonnaises, les grands lieux d'événements et au-delà.",
          "Notre objectif est simple : que chaque trajet se passe sans stress, de la réservation jusqu'à l'arrivée.",
        ],
        links: [{ label: "Zones desservies", href: "/zones-desservies" }],
      },
      {
        title: "Ponctualité et suivi",
        paragraphs: [
          "Être à l'heure est la base de notre métier. Pour les vols et les trains, nous suivons l'horaire réel et votre chauffeur ajuste sa venue en cas de retard, pour que vous ne l'attendiez jamais et qu'il vous attende toujours.",
        ],
      },
      {
        title: "Transparence sur les prix",
        paragraphs: [
          "Le tarif de chaque course vous est communiqué avant la réservation. Pas de compteur, pas de supplément découvert à l'arrivée : le prix annoncé est le prix payé.",
        ],
        links: [{ label: "Nos tarifs", href: "/tarifs" }],
      },
      {
        title: "Un interlocuteur humain",
        paragraphs: [
          "Chaque réservation est confirmée par une personne de notre équipe. Vous pouvez nous joindre directement pour toute question, modification ou demande particulière.",
          "Nos chauffeurs sont des professionnels du transport de personnes, discrets et attentifs à votre confort.",
        ],
        links: [{ label: "Nous contacter", href: "/contact" }],
      },
      {
        title: "Particuliers, familles et entreprises",
        paragraphs: [
          "Nous accompagnons les familles avec des sièges enfants sur demande, les voyageurs pour leurs transferts, et les entreprises avec une facturation à leur nom, l'accueil de leurs clients et la mise à disposition de chauffeurs.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Nos véhicules", href: "/vehicules" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
    ],
  },
};
