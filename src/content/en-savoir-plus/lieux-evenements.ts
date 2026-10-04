import { reservationItem, type LearnMorePage } from "./_shared";

// Contenus « En savoir plus » — lieux, événements, visite de Lyon et Beaujolais. Clé = slug.
// Aucun prix, horaire ni durée chiffrée.

export const lieuxEvenementsLearnMore: Record<string, LearnMorePage> = {
  "vtc-eurexpo-lyon": {
    title: "Votre chauffeur pour Eurexpo Lyon",
    items: [
      {
        title: "Le grand parc des expositions de Lyon",
        paragraphs: [
          "Eurexpo, à Chassieu, est le plus grand parc des expositions de Lyon. Il accueille chaque année de grands salons professionnels et grand public, comme le Sirha, la Foire de Lyon ou Equita Lyon, ainsi que de nombreux congrès et événements d'entreprise.",
          "Les jours de salon, les accès et les parkings sont très sollicités : avec un chauffeur, vous êtes déposé et repris au point convenu, sans chercher de place.",
        ],
      },
      {
        title: "Exposants et visiteurs",
        paragraphs: [
          "Pour les exposants, nous assurons les trajets quotidiens entre l'hôtel et le parc pendant toute la durée du salon, ainsi que l'accueil de vos équipes et de vos clients à l'aéroport ou à la gare. Pour les visiteurs, nous organisons l'aller le matin et le retour en fin de journée.",
          "La facture est établie au nom de votre société, et une mise à disposition sur plusieurs jours est possible.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Depuis l'aéroport, les gares et les hôtels",
        paragraphs: [
          "Eurexpo se trouve dans l'est lyonnais, à proximité de l'aéroport Lyon-Saint-Exupéry et de la gare Saint-Exupéry TGV. Nous assurons aussi les liaisons depuis la Part-Dieu et les hôtels du centre de Lyon.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Gare Lyon Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "VTC Chassieu", href: "/vtc-chassieu" },
          { label: "Événements et salons à Lyon", href: "/blog/evenements-lyon" },
        ],
      },
      reservationItem("pour Eurexpo", "Indiquez le nom du salon et vos horaires d'arrivée et de départ.", 0),
    ],
  },

  "vtc-groupama-stadium": {
    title: "Votre chauffeur pour le Groupama Stadium",
    items: [
      {
        title: "Matchs, concerts et grands événements",
        paragraphs: [
          "Le Groupama Stadium, à Décines-Charpieu, est le stade de l'Olympique Lyonnais. Il accueille aussi de grands concerts, des matchs internationaux et des événements d'entreprise dans ses espaces de réception.",
          "Les soirs d'événement, la circulation est réglementée autour du stade : votre chauffeur connaît les accès et vous dépose au point le plus pratique.",
        ],
      },
      {
        title: "Un retour sans attente",
        paragraphs: [
          "À la fin d'un match ou d'un concert, des dizaines de milliers de personnes quittent le stade en même temps. Réservez votre retour : votre chauffeur vous attend à un point de rendez-vous convenu, à l'écart de la foule, et vous ramène directement chez vous ou à votre hôtel.",
        ],
      },
      {
        title: "Loges, invités et groupes",
        paragraphs: [
          "Pour les entreprises qui invitent clients ou collaborateurs en loge ou en espace de réception, nous assurons le transport des invités depuis Lyon, les gares ou l'aéroport, avec facturation au nom de la société. Pour un groupe d'amis ou de supporters, nous adaptons le véhicule au nombre de personnes.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC LDLC Arena", href: "/vtc-ldlc-arena" },
          { label: "VTC Décines-Charpieu", href: "/vtc-decines-charpieu" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      reservationItem("pour le Groupama Stadium", "Indiquez l'événement et l'heure de fin prévue pour le retour.", 1),
    ],
  },

  "vtc-ldlc-arena": {
    title: "Votre chauffeur pour la LDLC Arena",
    items: [
      {
        title: "La grande salle de l'est lyonnais",
        paragraphs: [
          "La LDLC Arena, à Décines-Charpieu, juste à côté du Groupama Stadium, est l'une des plus grandes salles couvertes de France. Elle accueille concerts, spectacles, compétitions sportives et événements d'entreprise.",
          "Votre chauffeur vous dépose au plus près de l'entrée, selon le plan de circulation prévu pour l'événement.",
        ],
      },
      {
        title: "Aller et retour réservés",
        paragraphs: [
          "Réservez l'aller et le retour en même temps : à la sortie, votre chauffeur vous attend au point convenu, sans file d'attente pour les transports en commun ni recherche de taxi en fin de soirée.",
          "Nous venons vous chercher à Lyon, dans toute la métropole, à la gare ou à l'aéroport.",
        ],
        links: [
          { label: "Gare Lyon Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      {
        title: "Artistes, équipes et entreprises",
        paragraphs: [
          "Nous assurons aussi les trajets des professionnels de l'événementiel, des équipes et des invités d'entreprise, avec facturation au nom de la société et mise à disposition possible.",
        ],
        links: [
          { label: "VTC Groupama Stadium", href: "/vtc-groupama-stadium" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
          { label: "Événements à Lyon", href: "/blog/evenements-lyon" },
        ],
      },
      reservationItem("pour la LDLC Arena", "Indiquez le spectacle et l'heure de fin prévue.", 2),
    ],
  },

  "vtc-centre-congres-lyon": {
    title: "Votre chauffeur pour le Centre de Congrès de Lyon",
    items: [
      {
        title: "La Cité Internationale",
        paragraphs: [
          "Le Centre de Congrès de Lyon se trouve à la Cité Internationale, dans le 6e arrondissement, entre le Rhône et le parc de la Tête d'Or. Il accueille tout au long de l'année des congrès scientifiques et médicaux, des conventions d'entreprise et de grands événements internationaux.",
          "Votre chauffeur vous dépose devant l'entrée du centre de congrès et vous attend au même endroit pour le retour.",
        ],
      },
      {
        title: "Participants, intervenants et organisateurs",
        paragraphs: [
          "Nous accueillons les participants et intervenants à l'aéroport Lyon-Saint-Exupéry ou à la gare Part-Dieu, en suivant leur vol ou leur train, et les conduisons à leur hôtel ou directement au congrès.",
          "Pour les organisateurs, nous assurons plusieurs trajets dans la journée ou une mise à disposition pendant toute la durée de l'événement, avec facturation au nom de la structure.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Gare Lyon Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Dîners et soirées de gala",
        paragraphs: [
          "Après les sessions, nous vous conduisons à vos dîners d'affaires ou soirées de gala dans Lyon, et vous ramenons à votre hôtel en fin de soirée.",
        ],
        links: [
          { label: "VTC Lyon 6e arrondissement", href: "/vtc-lyon-6e-arrondissement" },
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Événements à Lyon", href: "/blog/evenements-lyon" },
        ],
      },
      reservationItem("pour le Centre de Congrès", "Indiquez le nom du congrès et vos horaires.", 3),
    ],
  },

  "vtc-halle-tony-garnier": {
    title: "Votre chauffeur pour la Halle Tony Garnier",
    items: [
      {
        title: "Une salle emblématique de Gerland",
        paragraphs: [
          "La Halle Tony Garnier, dans le quartier de Gerland (7e arrondissement), est une ancienne halle industrielle devenue l'une des grandes salles de spectacle de Lyon. Elle accueille concerts, spectacles et salons.",
          "Votre chauffeur vous dépose au plus près de l'entrée et convient avec vous d'un point de reprise pour la sortie.",
        ],
      },
      {
        title: "Sortir de concert sans attendre",
        paragraphs: [
          "À la fin d'un concert, les transports et les taxis sont pris d'assaut. En réservant votre retour à l'avance, vous retrouvez votre chauffeur au point convenu et rentrez directement chez vous, à Lyon ou dans la métropole.",
        ],
      },
      {
        title: "Venir de loin",
        paragraphs: [
          "Vous venez d'une autre ville pour un concert ? Nous vous accueillons à la gare ou à l'aéroport, vous conduisons à votre hôtel puis à la Halle, et assurons le retour.",
        ],
        links: [
          { label: "Gare Lyon Perrache", href: "/vtc-lyon-perrache" },
          { label: "Gare Lyon Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "VTC Lyon 7e arrondissement", href: "/vtc-lyon-7e-arrondissement" },
          { label: "Événements à Lyon", href: "/blog/evenements-lyon" },
        ],
      },
      reservationItem("pour la Halle Tony Garnier", "Indiquez le spectacle et l'heure de fin prévue.", 0),
    ],
  },

  "chauffeur-prive-visite-lyon": {
    title: "Découvrir Lyon avec un chauffeur privé",
    items: [
      {
        title: "Une ville classée au patrimoine mondial",
        paragraphs: [
          "Le site historique de Lyon est inscrit au patrimoine mondial de l'UNESCO. Avec un chauffeur privé, vous composez votre parcours : colline de Fourvière et sa basilique, Vieux Lyon et ses traboules, Presqu'île et place Bellecour, Croix-Rousse et ses pentes, musée des Confluences.",
          "Votre chauffeur vous dépose au départ de chaque visite à pied et vous retrouve à la sortie, sans contrainte de stationnement.",
        ],
      },
      {
        title: "Un programme à votre rythme",
        paragraphs: [
          "Demi-journée ou journée complète : vous choisissez les étapes et le rythme. Nous pouvons vous conseiller un parcours selon vos envies (patrimoine, gastronomie, points de vue, shopping) et vos contraintes.",
          "C'est une formule idéale pour les visiteurs en escale, les familles, les personnes à mobilité réduite ou les invités d'entreprise.",
        ],
        links: [{ label: "Mise à disposition", href: "/mise-a-disposition" }],
      },
      {
        title: "Gastronomie lyonnaise",
        paragraphs: [
          "Capitale de la gastronomie, Lyon se découvre aussi à table : bouchons, Halles Paul Bocuse, grandes tables. Votre chauffeur vous y conduit et vous ramène, pour que vous profitiez pleinement du repas.",
          "Pour prolonger l'expérience, découvrez aussi notre excursion dans le Beaujolais.",
        ],
        links: [
          { label: "Excursion dans le Beaujolais", href: "/excursion-beaujolais-chauffeur" },
          { label: "VTC Lyon 5e (Vieux Lyon)", href: "/vtc-lyon-5e-arrondissement" },
          { label: "VTC Lyon 2e (Presqu'île)", href: "/vtc-lyon-2e-arrondissement" },
        ],
      },
      reservationItem("pour une visite de Lyon", "Indiquez vos centres d'intérêt et la durée souhaitée.", 1),
    ],
  },

  "excursion-beaujolais-chauffeur": {
    title: "Excursion dans le Beaujolais avec chauffeur",
    items: [
      {
        title: "Vignobles, crus et villages",
        paragraphs: [
          "Au nord de Lyon, le Beaujolais offre des paysages de collines couvertes de vignes, des villages de caractère et de nombreux domaines viticoles. Au nord, les crus comme Morgon, Fleurie, Moulin-à-Vent ou Brouilly ; au sud, les villages des Pierres Dorées, comme Oingt, construits en pierre ocre.",
          "Nous composons avec vous un itinéraire selon vos envies : dégustations, villages, panoramas.",
        ],
      },
      {
        title: "Déguster en toute tranquillité",
        paragraphs: [
          "Avec un chauffeur, personne n'a à conduire après une dégustation. Vous profitez pleinement des caves et des domaines pendant que votre chauffeur s'occupe de la route et vous ramène à Lyon en fin de journée.",
          "Pensez à réserver vos visites de domaines à l'avance, en particulier pendant les vendanges et le week-end.",
        ],
      },
      {
        title: "Entre amis, en famille ou entre collègues",
        paragraphs: [
          "Anniversaire, séjour touristique, sortie d'équipe : nous adaptons le véhicule à la taille du groupe. Pour les entreprises, la facture peut être établie au nom de la société.",
        ],
        links: [
          { label: "Visite privée de Lyon", href: "/chauffeur-prive-visite-lyon" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
        ],
      },
      reservationItem("pour le Beaujolais", "Indiquez le nombre de participants et les domaines déjà réservés.", 2),
    ],
  },
};
