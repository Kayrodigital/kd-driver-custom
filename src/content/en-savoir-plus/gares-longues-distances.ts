import { reservationItem, type LearnMorePage } from "./_shared";

// Contenus « En savoir plus » — gares, Lyon–Grenoble et longues distances. Clé = slug.
// Aucun prix, temps de trajet ni distance chiffrée.

export const garesLonguesDistancesLearnMore: Record<string, LearnMorePage> = {
  "vtc-lyon-part-dieu": {
    title: "Votre chauffeur à la gare Lyon Part-Dieu",
    items: [
      {
        title: "Accueil à l'arrivée de votre train",
        paragraphs: [
          "La gare Part-Dieu est la plus grande gare de Lyon et l'une des plus fréquentées de France. À votre arrivée, inutile de chercher la file des taxis ou de traverser la gare avec vos valises : votre chauffeur vous attend au point de rendez-vous convenu à la réservation.",
          "Donnez-nous votre numéro de train : nous suivons son horaire réel et votre chauffeur ajuste sa venue en cas de retard, sans frais d'attente imprévus.",
        ],
      },
      {
        title: "Côté Vivier-Merle ou côté Villette ?",
        paragraphs: [
          "La Part-Dieu possède deux grands côtés d'accès, Vivier-Merle à l'ouest et Villette à l'est, et le quartier connaît régulièrement des travaux. Nous choisissons avec vous le point de prise en charge le plus pratique selon votre voie d'arrivée et la circulation du moment.",
          "Pour un départ, votre chauffeur vous dépose au plus près de l'entrée la plus adaptée à votre train.",
        ],
      },
      {
        title: "Où allez-vous depuis la Part-Dieu ?",
        paragraphs: [
          "Nous vous conduisons partout dans Lyon et la métropole, à votre hôtel, à votre domicile ou à votre rendez-vous d'affaires. Nous assurons aussi les correspondances vers l'aéroport Lyon-Saint-Exupéry et vers les grands lieux d'événements comme Eurexpo ou le Centre de Congrès.",
          "Pour les entreprises, nous accueillons vos clients et intervenants à leur descente du train, avec une facture au nom de votre société.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "VTC Lyon 3e arrondissement", href: "/vtc-lyon-3e-arrondissement" },
          { label: "VTC Centre de Congrès", href: "/vtc-centre-congres-lyon" },
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
        ],
      },
      {
        title: "Autres gares de Lyon",
        paragraphs: [
          "Votre train arrive à Perrache ou à la gare Lyon-Saint-Exupéry TGV ? Nous assurons les mêmes prises en charge dans toutes les gares lyonnaises.",
        ],
        links: [
          { label: "Gare Lyon Perrache", href: "/vtc-lyon-perrache" },
          { label: "Gare Lyon-Saint-Exupéry TGV", href: "/vtc-gare-lyon-saint-exupery-tgv" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
        ],
      },
      reservationItem("à la gare Part-Dieu", "Indiquez votre numéro de train et la voiture dans laquelle vous voyagez si vous avez beaucoup de bagages.", 0),
    ],
  },

  "vtc-lyon-perrache": {
    title: "Votre chauffeur à la gare Lyon Perrache",
    items: [
      {
        title: "Une gare au cœur de la Presqu'île",
        paragraphs: [
          "La gare Perrache se trouve au sud de la Presqu'île, entre Bellecour et la Confluence. Elle accueille des TGV, des TER et un important pôle d'échanges. Nous vous y attendons à votre arrivée ou vous y déposons pour votre départ.",
          "Le pôle d'échanges est vaste et sur plusieurs niveaux : nous convenons à l'avance d'un point de rendez-vous précis pour que vous retrouviez facilement votre chauffeur.",
        ],
      },
      {
        title: "Suivi de votre train",
        paragraphs: [
          "Communiquez-nous votre numéro de train : nous suivons son horaire et votre chauffeur adapte son arrivée en cas de retard. Il vous aide ensuite avec vos bagages jusqu'au véhicule.",
        ],
      },
      {
        title: "Destinations depuis Perrache",
        paragraphs: [
          "Depuis Perrache, nous vous conduisons dans tout Lyon, notamment dans le 2e, le 5e et le 7e arrondissement, ainsi que dans les communes de l'ouest et du sud comme Sainte-Foy-lès-Lyon ou Oullins-Pierre-Bénite. Nous assurons aussi les transferts vers l'aéroport Lyon-Saint-Exupéry.",
          "Pour un groupe, une famille ou un voyage d'affaires, nous adaptons le véhicule au nombre de passagers et de bagages.",
        ],
        links: [
          { label: "VTC Lyon 2e arrondissement", href: "/vtc-lyon-2e-arrondissement" },
          { label: "VTC Lyon 5e arrondissement", href: "/vtc-lyon-5e-arrondissement" },
          { label: "VTC Sainte-Foy-lès-Lyon", href: "/vtc-sainte-foy-les-lyon" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      {
        title: "Autres gares de Lyon",
        paragraphs: [
          "Nous accueillons aussi les voyageurs à la gare Part-Dieu et à la gare Lyon-Saint-Exupéry TGV.",
        ],
        links: [
          { label: "Gare Lyon Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Gare Lyon-Saint-Exupéry TGV", href: "/vtc-gare-lyon-saint-exupery-tgv" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
        ],
      },
      reservationItem("à la gare Perrache", "Précisez si vous arrivez en TGV ou en TER.", 1),
    ],
  },

  "vtc-gare-routiere-lyon-gerland": {
    title: "Votre chauffeur à la gare routière de Gerland",
    items: [
      {
        title: "Arriver en car longue distance",
        paragraphs: [
          "De nombreux voyageurs arrivent à Lyon en car longue distance. À la descente du car, votre chauffeur vous attend et vous conduit directement à votre destination, sans avoir à chercher un transport en commun avec vos bagages.",
          "Indiquez-nous la compagnie et l'horaire prévu de votre car : nous adaptons la prise en charge en cas de retard.",
        ],
      },
      {
        title: "Gerland et le sud de Lyon",
        paragraphs: [
          "Le quartier de Gerland, dans le 7e arrondissement, accueille entreprises, écoles, le Matmut Stadium et la Halle Tony Garnier. Nous vous déposons à votre hôtel, à votre rendez-vous ou à votre domicile, à Lyon comme dans les communes voisines.",
        ],
        links: [
          { label: "VTC Lyon 7e (Gerland)", href: "/vtc-lyon-7e-arrondissement" },
          { label: "VTC Halle Tony Garnier", href: "/vtc-halle-tony-garnier" },
        ],
      },
      {
        title: "Correspondances vers les gares et l'aéroport",
        paragraphs: [
          "Vous enchaînez avec un train ou un avion ? Nous assurons la correspondance vers la gare Part-Dieu, la gare Perrache ou l'aéroport Lyon-Saint-Exupéry, en tenant compte de l'heure de votre départ.",
        ],
        links: [
          { label: "Gare Lyon Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Gare Lyon Perrache", href: "/vtc-lyon-perrache" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      reservationItem("à la gare routière", "Indiquez la compagnie de car et l'horaire d'arrivée prévu.", 2),
    ],
  },

  "vtc-gare-lyon-saint-exupery-tgv": {
    title: "Votre chauffeur à la gare Lyon-Saint-Exupéry TGV",
    items: [
      {
        title: "Une gare TGV à côté de l'aéroport",
        paragraphs: [
          "La gare Lyon-Saint-Exupéry TGV, reconnaissable à son architecture signée Santiago Calatrava, est reliée à l'aéroport. Elle est desservie par des TGV qui ne passent pas toujours par le centre de Lyon. Nous vous y attendons à votre arrivée ou vous y déposons pour votre départ.",
          "La gare est éloignée du centre-ville : un chauffeur privé est la façon la plus directe de rejoindre votre destination avec vos bagages.",
        ],
      },
      {
        title: "Suivi des trains et point de rendez-vous",
        paragraphs: [
          "Communiquez-nous votre numéro de train : nous suivons son horaire et votre chauffeur vous attend au point convenu, même en cas de retard.",
          "Nous assurons aussi les correspondances entre la gare TGV et les terminaux de l'aéroport.",
        ],
        links: [{ label: "Transfert aéroport", href: "/transfert-aeroport" }],
      },
      {
        title: "Est lyonnais, Lyon et Alpes",
        paragraphs: [
          "Depuis la gare TGV, nous vous conduisons à Lyon, dans les communes de l'est comme Meyzieu, Saint-Priest ou Décines-Charpieu, à Eurexpo, ou plus loin vers les Alpes et les stations de ski.",
        ],
        links: [
          { label: "VTC Meyzieu", href: "/vtc-meyzieu" },
          { label: "VTC Saint-Priest", href: "/vtc-saint-priest" },
          { label: "VTC Eurexpo Lyon", href: "/vtc-eurexpo-lyon" },
          { label: "Transferts vers les stations de ski", href: "/transfert-stations-ski-depuis-lyon" },
        ],
      },
      reservationItem("à la gare Saint-Exupéry TGV", "Indiquez votre numéro de train.", 3),
    ],
  },

  "vtc-lyon-grenoble": {
    title: "Votre trajet Lyon – Grenoble avec chauffeur",
    items: [
      {
        title: "Un trajet direct, porte à porte",
        paragraphs: [
          "Nous assurons les trajets entre Lyon et Grenoble dans les deux sens, de l'adresse de votre choix jusqu'à votre destination : domicile, hôtel, entreprise, campus ou gare. Pas de correspondance ni de changement de transport avec vos bagages.",
          "Le tarif est annoncé avant la réservation, selon les adresses de départ et d'arrivée et le véhicule choisi.",
        ],
      },
      {
        title: "Professionnels et chercheurs",
        paragraphs: [
          "Grenoble accueille de nombreux centres de recherche, entreprises technologiques et établissements d'enseignement supérieur. Pour un rendez-vous, une soutenance ou un séminaire, voyager avec un chauffeur vous permet de travailler pendant le trajet. La facture peut être établie au nom de votre société.",
        ],
        links: [{ label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" }],
      },
      {
        title: "Aéroport, gares et stations de l'Oisans",
        paragraphs: [
          "Nous assurons aussi les trajets entre l'aéroport Lyon-Saint-Exupéry et Grenoble. En hiver, Grenoble est la porte des stations de l'Oisans comme l'Alpe d'Huez et Les Deux Alpes, que nous desservons également.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Transfert Lyon – Alpe d'Huez", href: "/transfert-lyon-alpe-dhuez" },
          { label: "Transfert Lyon – Les Deux Alpes", href: "/transfert-lyon-les-deux-alpes" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
      reservationItem("pour Grenoble", "Précisez si vous souhaitez un aller simple ou un aller-retour.", 0),
    ],
  },

  "transfert-lyon-annecy": {
    title: "Votre transfert Lyon – Annecy avec chauffeur",
    items: [
      {
        title: "De Lyon au bord du lac",
        paragraphs: [
          "Annecy, la « Venise des Alpes », attire visiteurs, familles et professionnels toute l'année. Nous vous conduisons de Lyon ou de l'aéroport Lyon-Saint-Exupéry jusqu'à votre adresse à Annecy ou autour du lac, et inversement.",
          "Le trajet est direct, avec vos bagages, et le prix est fixé avant la réservation.",
        ],
      },
      {
        title: "Séjours, mariages et séminaires",
        paragraphs: [
          "Les bords du lac accueillent de nombreux mariages, séminaires et séjours. Nous assurons le transport des mariés, des invités ou des participants, depuis Lyon ou depuis l'aéroport, avec un véhicule adapté au groupe.",
          "Pour les entreprises, la facture est établie au nom de la société.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Vers les stations de Haute-Savoie",
        paragraphs: [
          "Annecy est aussi une étape vers les stations de Haute-Savoie. Nous assurons les transferts directs vers Megève ou Chamonix depuis Lyon.",
        ],
        links: [
          { label: "Transfert Lyon – Megève", href: "/transfert-lyon-megeve" },
          { label: "Transfert Lyon – Chamonix", href: "/transfert-lyon-chamonix" },
          { label: "Transfert Lyon – Genève", href: "/transfert-lyon-geneve" },
        ],
      },
      reservationItem("pour Annecy", "Indiquez votre adresse exacte à Annecy ou autour du lac.", 1),
    ],
  },

  "transfert-lyon-chambery": {
    title: "Votre transfert Lyon – Chambéry avec chauffeur",
    items: [
      {
        title: "Lyon et la Savoie reliées porte à porte",
        paragraphs: [
          "Chambéry, ancienne capitale des ducs de Savoie, est la préfecture de la Savoie. Nous assurons les trajets entre Lyon, l'aéroport Lyon-Saint-Exupéry et Chambéry, dans les deux sens, directement d'adresse à adresse.",
          "Le tarif est communiqué avant toute confirmation.",
        ],
      },
      {
        title: "Déplacements professionnels et administratifs",
        paragraphs: [
          "Rendez-vous d'affaires, réunion dans une administration, déplacement vers une entreprise savoyarde : voyager avec un chauffeur vous permet de travailler pendant le trajet et d'arriver à l'heure. Facturation possible au nom de votre société.",
        ],
        links: [{ label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" }],
      },
      {
        title: "La porte des Alpes et des lacs",
        paragraphs: [
          "Chambéry se trouve entre le lac du Bourget et les massifs alpins. Nous assurons aussi les transferts directs depuis Lyon vers les stations de Tarentaise, comme Courchevel, Méribel, Les Arcs ou La Plagne, ainsi que vers Annecy.",
        ],
        links: [
          { label: "Transfert Lyon – Annecy", href: "/transfert-lyon-annecy" },
          { label: "Transferts vers les stations de ski", href: "/transfert-stations-ski-depuis-lyon" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
      reservationItem("pour Chambéry", "Précisez si vous souhaitez un aller-retour dans la journée.", 2),
    ],
  },

  "transfert-lyon-geneve": {
    title: "Votre transfert Lyon – Genève avec chauffeur",
    items: [
      {
        title: "Lyon, Genève et son aéroport",
        paragraphs: [
          "Nous assurons les trajets entre Lyon et Genève, de l'adresse de votre choix jusqu'au centre de Genève, à une organisation internationale, à un hôtel ou à l'aéroport de Genève. Le trajet est direct, avec vos bagages.",
          "Pour un vol au départ ou à l'arrivée de Genève, indiquez-nous votre numéro de vol : nous suivons son horaire.",
        ],
      },
      {
        title: "Passage de la frontière",
        paragraphs: [
          "Genève se trouve en Suisse : pensez à prendre vos papiers d'identité en cours de validité pour le passage de la frontière. Votre chauffeur s'occupe de l'itinéraire, vous n'avez qu'à vous installer.",
        ],
      },
      {
        title: "Affaires, organisations internationales et voyages",
        paragraphs: [
          "Banques, organisations internationales, congrès : Genève reçoit chaque jour des voyageurs d'affaires. Un chauffeur privé vous permet de préparer vos rendez-vous pendant le trajet, et la facture peut être établie au nom de votre entreprise.",
          "Genève est aussi proche des stations de Haute-Savoie comme Chamonix et Megève.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Transfert Lyon – Chamonix", href: "/transfert-lyon-chamonix" },
          { label: "Transfert Lyon – Annecy", href: "/transfert-lyon-annecy" },
        ],
      },
      reservationItem("pour Genève", "Indiquez votre numéro de vol si vous partez de l'aéroport de Genève.", 3),
    ],
  },

  "transfert-lyon-saint-etienne": {
    title: "Votre transfert Lyon – Saint-Étienne avec chauffeur",
    items: [
      {
        title: "Un trajet direct vers la Loire",
        paragraphs: [
          "Nous assurons les trajets entre Lyon, l'aéroport Lyon-Saint-Exupéry et Saint-Étienne, dans les deux sens, directement d'adresse à adresse. Pas de correspondance, pas de parking à chercher.",
          "Le tarif est communiqué avant la réservation.",
        ],
      },
      {
        title: "Match, design et rendez-vous",
        paragraphs: [
          "Un match au stade Geoffroy-Guichard, une visite à la Cité du design, un rendez-vous professionnel ou médical : nous vous conduisons et pouvons prévoir votre retour à l'heure de votre choix.",
          "Pour les entreprises, la facture est établie au nom de la société.",
        ],
        links: [{ label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" }],
      },
      {
        title: "Ouest et sud lyonnais",
        paragraphs: [
          "Si vous partez de l'ouest ou du sud de la métropole, comme Saint-Genis-Laval, Givors ou Oullins-Pierre-Bénite, nous venons vous chercher directement chez vous.",
        ],
        links: [
          { label: "VTC Givors", href: "/vtc-givors" },
          { label: "VTC Saint-Genis-Laval", href: "/vtc-saint-genis-laval" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
      reservationItem("pour Saint-Étienne", "Précisez l'adresse exacte à Saint-Étienne.", 0),
    ],
  },

  "transfert-lyon-valence": {
    title: "Votre transfert Lyon – Valence avec chauffeur",
    items: [
      {
        title: "Lyon et la Drôme reliées",
        paragraphs: [
          "Nous assurons les trajets entre Lyon et Valence, préfecture de la Drôme, dans les deux sens, ainsi que vers la gare Valence TGV. Le trajet est direct, d'adresse à adresse, avec vos bagages.",
          "Le tarif est annoncé avant toute confirmation.",
        ],
      },
      {
        title: "Correspondances et voyages d'affaires",
        paragraphs: [
          "Un train manqué, une correspondance délicate, un rendez-vous dans la Drôme : un chauffeur privé vous évite les contraintes d'horaires. Les entreprises peuvent recevoir une facture à leur nom.",
        ],
        links: [{ label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" }],
      },
      {
        title: "Depuis l'aéroport et le sud lyonnais",
        paragraphs: [
          "Nous assurons aussi les transferts entre l'aéroport Lyon-Saint-Exupéry et Valence, et venons vous chercher dans les communes du sud lyonnais comme Feyzin ou Givors.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "VTC Feyzin", href: "/vtc-feyzin" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
      reservationItem("pour Valence", "Précisez s'il s'agit de Valence centre ou de la gare Valence TGV.", 1),
    ],
  },

  "transfert-lyon-clermont-ferrand": {
    title: "Votre transfert Lyon – Clermont-Ferrand avec chauffeur",
    items: [
      {
        title: "Lyon et l'Auvergne, porte à porte",
        paragraphs: [
          "Nous assurons les trajets entre Lyon et Clermont-Ferrand dans les deux sens, de votre adresse jusqu'à votre destination en Auvergne. Le trajet est direct, avec vos bagages, et le tarif est fixé avant la réservation.",
        ],
      },
      {
        title: "Voyages professionnels",
        paragraphs: [
          "Clermont-Ferrand accueille de grandes entreprises industrielles, des centres de recherche et des universités. Pour un rendez-vous ou une réunion, un chauffeur privé vous permet de travailler pendant le trajet et d'arriver reposé. Facture au nom de votre entreprise sur demande.",
          "Un aller-retour dans la journée est possible : votre chauffeur peut vous attendre ou revenir vous chercher à l'heure convenue.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Volcans et séjours",
        paragraphs: [
          "La région de Clermont-Ferrand est aussi une destination de loisirs, avec la chaîne des Puys. Nous assurons les transferts vers votre lieu de séjour, en famille ou en groupe, avec sièges enfants sur demande.",
        ],
        links: [
          { label: "Trajets longues distances", href: "/longues-distances" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      reservationItem("pour Clermont-Ferrand", "Précisez si vous souhaitez que le chauffeur vous attende sur place.", 2),
    ],
  },

  "transfert-lyon-dijon": {
    title: "Votre transfert Lyon – Dijon avec chauffeur",
    items: [
      {
        title: "Lyon et la Bourgogne reliées",
        paragraphs: [
          "Nous assurons les trajets entre Lyon et Dijon dans les deux sens, d'adresse à adresse. Le trajet traverse le Beaujolais et la Bourgogne : installez-vous, votre chauffeur s'occupe de la route.",
          "Le tarif est communiqué avant la réservation.",
        ],
      },
      {
        title: "Affaires, gastronomie et vignobles",
        paragraphs: [
          "Rendez-vous professionnel, visite de la Cité internationale de la gastronomie et du vin, découverte des vignobles de Bourgogne : nous adaptons le trajet à votre programme et pouvons prévoir des arrêts sur demande, annoncés dans le tarif.",
          "Les entreprises peuvent recevoir une facture à leur nom.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Excursion dans le Beaujolais", href: "/excursion-beaujolais-chauffeur" },
        ],
      },
      {
        title: "Au départ de toute la métropole",
        paragraphs: [
          "Nous venons vous chercher à Lyon, à l'aéroport Lyon-Saint-Exupéry ou dans les communes du nord lyonnais comme Neuville-sur-Saône.",
        ],
        links: [
          { label: "VTC Neuville-sur-Saône", href: "/vtc-neuville-sur-saone" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
      reservationItem("pour Dijon", "Indiquez les éventuels arrêts souhaités en route.", 3),
    ],
  },

  "transfert-lyon-paris": {
    title: "Votre transfert Lyon – Paris avec chauffeur",
    items: [
      {
        title: "Une alternative au train, de porte à porte",
        paragraphs: [
          "Le train reste rapide entre Lyon et Paris, mais il impose de rejoindre les gares, de porter ses bagages et de suivre des horaires. Avec un chauffeur, vous partez de votre adresse et arrivez directement à destination, à Paris ou en Île-de-France, ou dans un aéroport parisien.",
          "C'est une solution particulièrement adaptée en cas de grève, de train complet, de bagages volumineux ou de voyage en famille.",
        ],
      },
      {
        title: "Voyager en groupe ou en famille",
        paragraphs: [
          "À plusieurs, le trajet en véhicule privé devient intéressant : tout le monde voyage ensemble, avec ses bagages, sans transfert supplémentaire à l'arrivée. Sièges enfants sur demande.",
          "Le tarif est fixé à l'avance, selon le véhicule et les adresses exactes.",
        ],
        links: [{ label: "Nos véhicules", href: "/vehicules" }],
      },
      {
        title: "Déplacements professionnels",
        paragraphs: [
          "Pour un dirigeant ou une équipe, le trajet devient un temps de travail ou de repos, dans un véhicule calme. Nous établissons une facture au nom de votre société.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
      reservationItem("pour Paris", "Pour un si long trajet, réservez le plus tôt possible.", 0),
    ],
  },
};
