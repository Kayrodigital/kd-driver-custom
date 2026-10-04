import { reservationItem, type LearnMorePage } from "./_shared";

// Contenus « En savoir plus » — 9 arrondissements de Lyon. Clé = slug de la page.

export const arrondissementsLearnMore: Record<string, LearnMorePage> = {
  "vtc-lyon-1er-arrondissement": {
    title: "Votre chauffeur privé dans le 1er arrondissement",
    items: [
      {
        title: "Prise en charge entre Terreaux et Pentes",
        paragraphs: [
          "Le 1er arrondissement concentre une grande partie de la vie culturelle lyonnaise : place des Terreaux, Hôtel de Ville, Opéra, musée des Beaux-Arts et pentes de la Croix-Rousse. Nous venons vous chercher à votre adresse, à votre hôtel ou à la sortie d'un spectacle, au plus près de votre porte.",
          "Les rues des Pentes sont étroites et souvent en sens unique : indiquez-nous un repère précis (numéro, entrée, traboule) et votre chauffeur choisira le point d'arrêt le plus pratique pour vous et vos bagages.",
        ],
      },
      {
        title: "Trajets fréquents depuis le 1er",
        paragraphs: [
          "Depuis la Presqu'île nord, nos clients rejoignent surtout l'aéroport Lyon-Saint-Exupéry, la gare Part-Dieu ou la gare Perrache. Un chauffeur privé vous évite les correspondances en métro avec des valises et vous dépose directement devant le terminal ou le hall de la gare.",
          "Nous assurons aussi les trajets vers le Centre de Congrès de la Cité Internationale, la Halle Tony Garnier ou les grandes salles de l'est lyonnais pour un congrès, un concert ou un match.",
        ],
        links: [
          { label: "Transfert aéroport Lyon-Saint-Exupéry", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "VTC Centre de Congrès de Lyon", href: "/vtc-centre-congres-lyon" },
        ],
      },
      {
        title: "Soirées, culture et voyageurs d'affaires",
        paragraphs: [
          "Après une représentation à l'Opéra ou un dîner sur les Pentes, réservez votre retour à l'avance : votre chauffeur vous attend à l'heure prévue, sans recherche de taxi en fin de soirée. Le service convient aussi aux visiteurs qui logent dans le quartier et souhaitent découvrir Lyon et ses environs.",
          "Pour les professionnels, la mise à disposition d'un chauffeur permet d'enchaîner plusieurs rendez-vous dans la journée sans se soucier du stationnement, rare dans l'arrondissement.",
        ],
        links: [
          { label: "Mise à disposition avec chauffeur", href: "/mise-a-disposition" },
          { label: "VTC Lyon 2e", href: "/vtc-lyon-2e-arrondissement" },
          { label: "VTC Lyon 4e (Croix-Rousse)", href: "/vtc-lyon-4e-arrondissement" },
        ],
      },
      reservationItem("dans le 1er arrondissement", "Pour les Pentes, précisez la rue et le numéro exacts.", 0),
    ],
  },

  "vtc-lyon-2e-arrondissement": {
    title: "Votre chauffeur privé dans le 2e arrondissement",
    items: [
      {
        title: "De Bellecour à Confluence",
        paragraphs: [
          "Le 2e arrondissement couvre le cœur de la Presqu'île : Cordeliers, Bellecour, Ainay, Perrache et le quartier de la Confluence. Nous vous prenons en charge à domicile, à votre hôtel, à votre bureau ou devant un commerce, de la rue de la République jusqu'au musée des Confluences.",
          "La circulation est dense et de nombreuses rues sont piétonnes : votre chauffeur vous indique à l'avance le point de rendez-vous le plus proche accessible en voiture, pour un départ sans attente.",
        ],
      },
      {
        title: "Gare Perrache, aéroport et Part-Dieu",
        paragraphs: [
          "La gare Perrache se trouve dans l'arrondissement : nous y accueillons les voyageurs à l'arrivée de leur train et les conduisons à leur adresse lyonnaise ou plus loin. À l'inverse, nous vous déposons à Perrache pour votre départ.",
          "Depuis la Presqu'île, nous assurons aussi les transferts vers l'aéroport Lyon-Saint-Exupéry et la gare Part-Dieu, de jour comme de nuit, en suivant l'horaire de votre vol ou de votre train.",
        ],
        links: [
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
        ],
      },
      {
        title: "Shopping, hôtels et rendez-vous d'affaires",
        paragraphs: [
          "Hôtels, boutiques, cabinets et sièges d'entreprises se concentrent sur la Presqu'île et à Confluence. Un chauffeur privé vous permet d'arriver à l'heure à vos rendez-vous, de recevoir des clients avec soin ou de rentrer chargé de vos achats.",
          "Pour un événement, un mariage ou une journée de rendez-vous, nous adaptons le véhicule au nombre de passagers et proposons une mise à disposition à l'heure ou à la journée.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Lyon 1er", href: "/vtc-lyon-1er-arrondissement" },
          { label: "VTC Lyon 5e (Vieux Lyon)", href: "/vtc-lyon-5e-arrondissement" },
        ],
      },
      reservationItem("dans le 2e arrondissement", "Pour une arrivée à Perrache, indiquez-nous votre numéro de train.", 1),
    ],
  },

  "vtc-lyon-3e-arrondissement": {
    title: "Votre chauffeur privé dans le 3e arrondissement",
    items: [
      {
        title: "Part-Dieu, Préfecture, Montchat",
        paragraphs: [
          "Le 3e arrondissement est le plus peuplé de Lyon et réunit des quartiers très différents : le pôle d'affaires de la Part-Dieu, la Préfecture, la Villette, Sans-Souci, Dauphiné-Lacassagne ou encore le quartier résidentiel de Montchat. Nous vous prenons en charge à l'adresse de votre choix.",
          "Autour de la gare et des tours de bureaux, la circulation et les travaux évoluent souvent : votre chauffeur connaît les accès et vous propose le point de rendez-vous le plus simple.",
        ],
      },
      {
        title: "La gare Part-Dieu au pied de chez vous",
        paragraphs: [
          "La gare Part-Dieu est la principale gare de Lyon. Nous accueillons les voyageurs à leur arrivée et les conduisons partout dans la métropole ou au-delà, et nous déposons ceux qui partent au plus près du hall.",
          "Pour l'aéroport Lyon-Saint-Exupéry, un chauffeur privé vous conduit directement au terminal depuis votre domicile ou votre bureau du 3e, sans changement ni attente sur le quai.",
        ],
        links: [
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Gare Lyon-Saint-Exupéry TGV", href: "/vtc-gare-lyon-saint-exupery-tgv" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      {
        title: "Quartier d'affaires, santé et culture",
        paragraphs: [
          "Entreprises de la Part-Dieu, Auditorium Maurice-Ravel, Halles Paul Bocuse : le 3e accueille chaque jour des visiteurs professionnels et des événements. Nous assurons l'accueil de vos clients ou intervenants à la gare et leurs trajets entre rendez-vous.",
          "Nos clients habitant Montchat ou Sans-Souci nous réservent aussi pour leurs départs en vacances en famille, avec un véhicule adapté aux bagages et des sièges enfants sur demande.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Lyon 6e", href: "/vtc-lyon-6e-arrondissement" },
          { label: "VTC Lyon 8e", href: "/vtc-lyon-8e-arrondissement" },
          { label: "VTC Villeurbanne", href: "/vtc-villeurbanne" },
        ],
      },
      reservationItem("dans le 3e arrondissement", "Si vous êtes à la Part-Dieu, précisez le côté de la gare (Vivier-Merle ou Villette).", 2),
    ],
  },

  "vtc-lyon-4e-arrondissement": {
    title: "Votre chauffeur privé à la Croix-Rousse",
    items: [
      {
        title: "Prise en charge sur le plateau",
        paragraphs: [
          "Le 4e arrondissement occupe le plateau de la Croix-Rousse, avec son ambiance de village, son boulevard et son marché, le Gros Caillou et les quartiers de Serin et des quais de Saône. Nous venons vous chercher directement à votre porte.",
          "L'accès au plateau se fait par des montées et des rues parfois étroites : en nous indiquant votre adresse exacte, vous permettez à votre chauffeur de prévoir le meilleur itinéraire et le meilleur point d'arrêt.",
        ],
      },
      {
        title: "Descendre vers les gares et l'aéroport",
        paragraphs: [
          "Avec des valises, descendre les pentes ou prendre plusieurs transports pour rejoindre une gare n'a rien de pratique. Nous vous conduisons de la Croix-Rousse à la gare Part-Dieu, à la gare Perrache ou à l'aéroport Lyon-Saint-Exupéry, porte à porte.",
          "Au retour, votre chauffeur vous attend à l'arrivée de votre train ou de votre vol et vous ramène sur le plateau, même tard le soir.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Familles, sorties et communes voisines",
        paragraphs: [
          "Les familles du plateau nous réservent pour leurs départs en vacances, avec des sièges enfants installés sur demande. Nous assurons aussi les retours de soirée, de spectacle ou de restaurant, partout dans Lyon.",
          "Le 4e touche Caluire-et-Cuire et domine la Saône : nous effectuons les courtes liaisons vers les communes voisines et le reste de la ville.",
        ],
        links: [
          { label: "VTC Caluire-et-Cuire", href: "/vtc-caluire-et-cuire" },
          { label: "VTC Lyon 1er", href: "/vtc-lyon-1er-arrondissement" },
          { label: "VTC Lyon 9e", href: "/vtc-lyon-9e-arrondissement" },
          { label: "Nos véhicules", href: "/vehicules" },
        ],
      },
      reservationItem("à la Croix-Rousse", "Pour un départ tôt le matin, réservez la veille au plus tard.", 3),
    ],
  },

  "vtc-lyon-5e-arrondissement": {
    title: "Votre chauffeur privé dans le Vieux Lyon et à Fourvière",
    items: [
      {
        title: "Vieux Lyon, Fourvière, Point du Jour",
        paragraphs: [
          "Le 5e arrondissement s'étend du Vieux Lyon (Saint-Jean, Saint-Paul, Saint-Georges) à la colline de Fourvière, puis aux quartiers résidentiels de Saint-Just, Point du Jour, Champvert et Ménival. Nous vous prenons en charge dans chacun de ces quartiers.",
          "Le Vieux Lyon est en grande partie piéton : votre chauffeur vous retrouve au point accessible le plus proche, sur les quais de Saône ou près de la gare Saint-Paul, à l'heure convenue.",
        ],
      },
      {
        title: "Visiteurs, hôtels et visites",
        paragraphs: [
          "De nombreux visiteurs logent dans le Vieux Lyon ou viennent découvrir la basilique de Fourvière et les théâtres romains. Un chauffeur privé vous conduit de votre hôtel aux sites incontournables ou vous accueille à votre arrivée en gare ou à l'aéroport.",
          "Pour une journée de visite de Lyon et de ses environs, la mise à disposition d'un chauffeur vous laisse libre de votre programme, sans contrainte de stationnement.",
        ],
        links: [
          { label: "Mise à disposition avec chauffeur", href: "/mise-a-disposition" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
        ],
      },
      {
        title: "Résidents des hauteurs de l'ouest",
        paragraphs: [
          "Les habitants du Point du Jour, de Ménival ou de Champvert nous réservent pour leurs trajets vers les gares et l'aéroport, souvent plus longs en transports en commun depuis les hauteurs. Le trajet en voiture est direct, avec vos bagages.",
          "Le 5e est voisin de Sainte-Foy-lès-Lyon, de Tassin-la-Demi-Lune et du 9e : nous assurons aussi ces liaisons de proximité.",
        ],
        links: [
          { label: "VTC Sainte-Foy-lès-Lyon", href: "/vtc-sainte-foy-les-lyon" },
          { label: "VTC Tassin-la-Demi-Lune", href: "/vtc-tassin-la-demi-lune" },
          { label: "VTC Lyon 9e (Vaise)", href: "/vtc-lyon-9e-arrondissement" },
        ],
      },
      reservationItem("dans le 5e arrondissement", "Dans le Vieux Lyon, nous convenons ensemble du point de rendez-vous.", 0),
    ],
  },

  "vtc-lyon-6e-arrondissement": {
    title: "Votre chauffeur privé aux Brotteaux et dans le 6e",
    items: [
      {
        title: "Brotteaux, Foch, Tête d'Or",
        paragraphs: [
          "Le 6e arrondissement, entre le Rhône et le parc de la Tête d'Or, regroupe les quartiers des Brotteaux, Foch, Masséna et Bellecombe ainsi que la Cité Internationale. Nous vous prenons en charge à domicile, au bureau ou à votre hôtel.",
          "Les grandes avenues du quartier facilitent la prise en charge : votre chauffeur se présente devant votre adresse à l'heure prévue.",
        ],
      },
      {
        title: "Cité Internationale et Centre de Congrès",
        paragraphs: [
          "Le Centre de Congrès de Lyon, à la Cité Internationale, accueille congrès médicaux, salons et conventions tout au long de l'année. Nous assurons les transferts des participants entre les gares, l'aéroport, les hôtels et le centre de congrès.",
          "Pour les organisateurs, nous pouvons prévoir plusieurs trajets dans la journée ou une mise à disposition pendant toute la durée de l'événement.",
        ],
        links: [
          { label: "VTC Centre de Congrès de Lyon", href: "/vtc-centre-congres-lyon" },
          { label: "Événements et salons à Lyon", href: "/blog/evenements-lyon" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Gares, aéroport et voisins",
        paragraphs: [
          "Depuis le 6e, la gare Part-Dieu est toute proche et l'aéroport Lyon-Saint-Exupéry se rejoint directement par l'est lyonnais. Nous vous déposons devant le hall ou le terminal, et nous vous attendons à votre retour.",
          "L'arrondissement est voisin de Villeurbanne, du 3e et de Caluire-et-Cuire : nous assurons ces trajets courts comme les plus longs.",
        ],
        links: [
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "VTC Villeurbanne", href: "/vtc-villeurbanne" },
          { label: "VTC Lyon 3e", href: "/vtc-lyon-3e-arrondissement" },
        ],
      },
      reservationItem("dans le 6e arrondissement", "Pour un congrès, indiquez-nous le nom de l'événement et vos horaires.", 1),
    ],
  },

  "vtc-lyon-7e-arrondissement": {
    title: "Votre chauffeur privé à Gerland et dans le 7e",
    items: [
      {
        title: "Guillotière, Jean-Macé, Gerland",
        paragraphs: [
          "Le 7e arrondissement, sur la rive gauche du Rhône, va de la Guillotière et Jean-Macé jusqu'à Gerland et son quartier d'entreprises. Nous vous prenons en charge à votre adresse, à votre bureau ou devant votre campus.",
          "Gerland s'est fortement développé ces dernières années : indiquez-nous le nom de l'immeuble ou de l'entreprise, votre chauffeur se présentera à la bonne entrée.",
        ],
      },
      {
        title: "Halle Tony Garnier et grands événements",
        paragraphs: [
          "La Halle Tony Garnier accueille concerts, spectacles et salons. Réservez votre aller et votre retour : à la sortie, votre chauffeur vous attend à un point de rendez-vous convenu, sans file d'attente ni recherche de taxi.",
          "Le quartier accueille aussi le Matmut Stadium de Gerland et de nombreux événements professionnels : nous assurons les trajets des participants depuis les gares et l'aéroport.",
        ],
        links: [
          { label: "VTC Halle Tony Garnier", href: "/vtc-halle-tony-garnier" },
          { label: "VTC Gare routière Lyon Gerland", href: "/vtc-gare-routiere-lyon-gerland" },
          { label: "Événements à Lyon", href: "/blog/evenements-lyon" },
        ],
      },
      {
        title: "Entreprises, universités et voyageurs",
        paragraphs: [
          "Entreprises du Biodistrict, écoles et universités des quais du Rhône : le 7e reçoit de nombreux visiteurs professionnels. Nous accueillons vos invités à la gare Part-Dieu ou à l'aéroport et les conduisons jusqu'à vos locaux, avec une facture au nom de votre société.",
          "Le 7e est voisin du 8e, de Saint-Fons et de Vénissieux : nous assurons aussi ces liaisons.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Lyon 8e", href: "/vtc-lyon-8e-arrondissement" },
          { label: "VTC Saint-Fons", href: "/vtc-saint-fons" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      reservationItem("dans le 7e arrondissement", "Pour un concert, réservez aussi votre retour dès maintenant.", 2),
    ],
  },

  "vtc-lyon-8e-arrondissement": {
    title: "Votre chauffeur privé à Monplaisir et dans le 8e",
    items: [
      {
        title: "Monplaisir, États-Unis, Bachut",
        paragraphs: [
          "Le 8e arrondissement réunit des quartiers résidentiels et animés : Monplaisir, le Bachut, les États-Unis, Mermoz, Grand Trou et Grange Blanche. Nous venons vous chercher à votre domicile, à votre travail ou devant votre hôtel.",
          "Les avenues de l'arrondissement permettent une prise en charge simple : votre chauffeur se présente à votre porte à l'heure convenue.",
        ],
      },
      {
        title: "Vers l'aéroport, les gares et l'est lyonnais",
        paragraphs: [
          "Le 8e est bien placé pour rejoindre l'aéroport Lyon-Saint-Exupéry par l'est, ainsi que la gare Part-Dieu. Nous vous conduisons porte à porte avec vos bagages, et nous suivons votre vol ou votre train pour votre retour.",
          "Nous assurons aussi les trajets vers Eurexpo et les grands équipements de l'est, comme le Groupama Stadium et la LDLC Arena.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "VTC Eurexpo Lyon", href: "/vtc-eurexpo-lyon" },
          { label: "VTC Groupama Stadium", href: "/vtc-groupama-stadium" },
        ],
      },
      {
        title: "Culture, santé et quotidien",
        paragraphs: [
          "Visite à l'Institut Lumière, rendez-vous dans un établissement de santé du secteur Grange Blanche, sortie au restaurant : nous vous accompagnons pour vos déplacements, avec un véhicule confortable et un chauffeur attentif.",
          "Le 8e est voisin de Bron, de Vénissieux et du 7e : nous effectuons ces trajets de proximité comme les plus longs.",
        ],
        links: [
          { label: "VTC Bron", href: "/vtc-bron" },
          { label: "VTC Vénissieux", href: "/vtc-venissieux" },
          { label: "VTC Lyon 7e", href: "/vtc-lyon-7e-arrondissement" },
        ],
      },
      reservationItem("dans le 8e arrondissement", "Précisez si vous avez besoin d'aide pour vos bagages.", 3),
    ],
  },

  "vtc-lyon-9e-arrondissement": {
    title: "Votre chauffeur privé à Vaise et dans le 9e",
    items: [
      {
        title: "Vaise, Duchère, Saint-Rambert",
        paragraphs: [
          "Le 9e arrondissement, au nord-ouest de Lyon, comprend Vaise, Gorge de Loup, l'Industrie, la Duchère, Saint-Rambert et le quartier de l'Île Barbe. Nous vous prenons en charge à votre domicile, à votre bureau ou dans les zones d'activité.",
          "Indiquez-nous l'adresse exacte et, pour les entreprises, le nom du bâtiment : votre chauffeur se présentera directement au bon endroit.",
        ],
      },
      {
        title: "Gares et aéroport depuis le 9e",
        paragraphs: [
          "Depuis Vaise, rejoindre l'aéroport Lyon-Saint-Exupéry ou la gare Part-Dieu en transports demande plusieurs changements. Avec un chauffeur privé, le trajet est direct, avec vos bagages, et votre chauffeur vous dépose devant le terminal ou le hall.",
          "Nous assurons également les départs vers la gare Perrache et l'accueil à l'arrivée de votre train.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Entreprises et ouest lyonnais",
        paragraphs: [
          "Le 9e accueille de nombreuses entreprises, notamment autour de Vaise et de l'Industrie. Nous assurons les trajets de vos collaborateurs et de vos clients, avec facturation au nom de votre société.",
          "L'arrondissement est la porte de l'ouest et du nord-ouest lyonnais : nous desservons aussi Écully, Dardilly, Limonest et les Monts d'Or.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Écully", href: "/vtc-ecully" },
          { label: "VTC Dardilly", href: "/vtc-dardilly" },
          { label: "VTC Limonest", href: "/vtc-limonest" },
        ],
      },
      reservationItem("dans le 9e arrondissement", "Pour une zone d'activité, précisez le nom de l'entreprise.", 0),
    ],
  },
};
