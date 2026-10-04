import { reservationItem, type LearnMorePage } from "./_shared";

// Contenus « En savoir plus » — communes de l'ouest et du sud. Clé = slug de la page.

export const communesOuestSudLearnMore: Record<string, LearnMorePage> = {
  "vtc-ecully": {
    title: "Votre chauffeur privé à Écully",
    items: [
      {
        title: "Prise en charge à Écully",
        paragraphs: [
          "Écully, à l'ouest de Lyon, est une commune résidentielle qui accueille aussi de grandes écoles, dont l'École Centrale de Lyon, emlyon business school et l'Institut Paul Bocuse. Nous vous prenons en charge à domicile, sur un campus ou dans un hôtel.",
          "Pour un campus, indiquez-nous le bâtiment ou l'entrée : votre chauffeur vous attendra au point le plus pratique.",
        ],
      },
      {
        title: "Étudiants, intervenants et visiteurs",
        paragraphs: [
          "Les écoles d'Écully reçoivent toute l'année étudiants internationaux, intervenants et jurys. Nous les accueillons à l'aéroport ou à la gare et les conduisons jusqu'au campus, puis assurons leur retour.",
          "Pour les établissements et entreprises, nous établissons une facture au nom de la structure et pouvons organiser plusieurs trajets dans la journée.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
        ],
      },
      {
        title: "Familles et ouest lyonnais",
        paragraphs: [
          "Les familles d'Écully nous réservent pour leurs départs en vacances ou leurs trajets vers les gares, avec sièges enfants sur demande et un véhicule adapté aux bagages.",
          "Écully est voisine de Dardilly, de Tassin-la-Demi-Lune, de Champagne-au-Mont-d'Or et du 9e arrondissement.",
        ],
        links: [
          { label: "VTC Dardilly", href: "/vtc-dardilly" },
          { label: "VTC Tassin-la-Demi-Lune", href: "/vtc-tassin-la-demi-lune" },
          { label: "VTC banlieue ouest de Lyon", href: "/vtc-banlieue-ouest-lyon" },
        ],
      },
      reservationItem("à Écully", "Pour un campus, précisez le nom de l'école et l'entrée.", 1),
    ],
  },

  "vtc-dardilly": {
    title: "Votre chauffeur privé à Dardilly",
    items: [
      {
        title: "Prise en charge à Dardilly",
        paragraphs: [
          "Dardilly, au nord-ouest de Lyon, combine un village et des hameaux résidentiels avec une partie du parc d'activités Techlid et le secteur de la Porte de Lyon. Nous vous prenons en charge à domicile, à votre entreprise ou à votre hôtel.",
          "Les adresses sont parfois éloignées du centre : indiquez votre adresse complète pour une prise en charge à l'heure.",
        ],
      },
      {
        title: "Gares et aéroport sans contrainte",
        paragraphs: [
          "Depuis Dardilly, nous assurons vos transferts vers la gare Part-Dieu, la gare Perrache et l'aéroport Lyon-Saint-Exupéry, porte à porte et avec vos bagages.",
          "Au retour, nous suivons votre train ou votre vol et votre chauffeur vous attend à l'arrivée.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Entreprises et voisinage",
        paragraphs: [
          "Les entreprises de Dardilly nous confient l'accueil de leurs visiteurs et les déplacements de leurs équipes, avec facturation au nom de la société. Une mise à disposition à l'heure ou à la journée est possible.",
          "Dardilly est voisine de Limonest, d'Écully et de Champagne-au-Mont-d'Or.",
        ],
        links: [
          { label: "Mise à disposition", href: "/mise-a-disposition" },
          { label: "VTC Limonest", href: "/vtc-limonest" },
          { label: "VTC Écully", href: "/vtc-ecully" },
        ],
      },
      reservationItem("à Dardilly", "Pour Techlid, précisez le nom de l'entreprise.", 2),
    ],
  },

  "vtc-tassin-la-demi-lune": {
    title: "Votre chauffeur privé à Tassin-la-Demi-Lune",
    items: [
      {
        title: "Prise en charge à Tassin",
        paragraphs: [
          "Tassin-la-Demi-Lune, aux portes ouest de Lyon, est une commune résidentielle avec son centre animé autour de la place de la Demi-Lune et plusieurs quartiers pavillonnaires. Nous vous prenons en charge à votre porte.",
          "Indiquez-nous l'adresse exacte et, si besoin, un repère : votre chauffeur se présentera à l'heure convenue.",
        ],
      },
      {
        title: "Vers les gares, l'aéroport et Lyon",
        paragraphs: [
          "Depuis Tassin, nous vous conduisons à la gare Part-Dieu, à la gare Perrache ou à l'aéroport Lyon-Saint-Exupéry, sans changement de transport. Pour votre retour, votre chauffeur vous attend à l'arrivée.",
          "Nous assurons aussi vos trajets vers le centre de Lyon pour un rendez-vous, une soirée ou un spectacle.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
        ],
      },
      {
        title: "Familles et ouest lyonnais",
        paragraphs: [
          "Départ en vacances, mariage, sortie en famille : nous adaptons le véhicule au nombre de passagers et de bagages, avec sièges enfants sur demande.",
          "Tassin est voisine d'Écully, de Francheville, de Charbonnières-les-Bains, de Craponne et du 5e arrondissement.",
        ],
        links: [
          { label: "VTC Écully", href: "/vtc-ecully" },
          { label: "VTC Francheville", href: "/vtc-francheville" },
          { label: "VTC Charbonnières-les-Bains", href: "/vtc-charbonnieres-les-bains" },
          { label: "VTC Lyon 5e", href: "/vtc-lyon-5e-arrondissement" },
        ],
      },
      reservationItem("à Tassin-la-Demi-Lune", "Précisez le nombre de passagers et de valises.", 3),
    ],
  },

  "vtc-charbonnieres-les-bains": {
    title: "Votre chauffeur privé à Charbonnières-les-Bains",
    items: [
      {
        title: "Prise en charge à Charbonnières",
        paragraphs: [
          "Charbonnières-les-Bains, ancienne station thermale de l'ouest lyonnais, est aujourd'hui une commune résidentielle et verdoyante. Nous vous prenons en charge à votre domicile, à votre hôtel ou dans un lieu de réception.",
          "Pour une adresse un peu à l'écart, indiquez-nous un repère : votre chauffeur trouvera facilement votre porte.",
        ],
      },
      {
        title: "Gares, aéroport et Lyon",
        paragraphs: [
          "Depuis Charbonnières, nous assurons vos transferts vers la gare Part-Dieu, la gare Perrache et l'aéroport Lyon-Saint-Exupéry, en suivant l'horaire de votre train ou de votre vol.",
          "Nous vous conduisons aussi au centre de Lyon pour vos rendez-vous, sorties ou événements, et vous ramenons en fin de soirée.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Réceptions, événements et voisins",
        paragraphs: [
          "Pour un mariage, une réception ou une soirée dans l'ouest lyonnais, nous assurons le transport de vos invités ou une mise à disposition pendant l'événement.",
          "Charbonnières-les-Bains est voisine de Tassin-la-Demi-Lune, d'Écully, de Marcy-l'Étoile et de La Tour-de-Salvagny.",
        ],
        links: [
          { label: "Mise à disposition", href: "/mise-a-disposition" },
          { label: "VTC Tassin-la-Demi-Lune", href: "/vtc-tassin-la-demi-lune" },
          { label: "VTC banlieue ouest de Lyon", href: "/vtc-banlieue-ouest-lyon" },
        ],
      },
      reservationItem("à Charbonnières-les-Bains", "Pour un événement, précisez le lieu et l'heure de fin prévue.", 0),
    ],
  },

  "vtc-craponne": {
    title: "Votre chauffeur privé à Craponne",
    items: [
      {
        title: "Prise en charge à Craponne",
        paragraphs: [
          "Craponne, dans l'ouest lyonnais, est une commune résidentielle à l'ambiance de village. Nous vous prenons en charge au centre comme dans les quartiers pavillonnaires, directement devant chez vous.",
          "Indiquez-nous votre adresse complète : votre chauffeur se présentera à l'heure convenue.",
        ],
      },
      {
        title: "Gares et aéroport sans correspondance",
        paragraphs: [
          "Depuis Craponne, rejoindre une gare ou l'aéroport en transports en commun demande plusieurs changements. Avec un chauffeur privé, le trajet est direct, avec vos bagages, jusqu'à la gare Part-Dieu, la gare Perrache ou l'aéroport Lyon-Saint-Exupéry.",
          "Pour votre retour, nous suivons votre train ou votre vol.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
        ],
      },
      {
        title: "Familles et ouest lyonnais",
        paragraphs: [
          "Les familles de Craponne nous réservent pour leurs départs en vacances, avec sièges enfants sur demande. Nous assurons aussi des trajets vers Lyon pour vos sorties et rendez-vous.",
          "Craponne est voisine de Francheville, de Tassin-la-Demi-Lune et de Grézieu-la-Varenne.",
        ],
        links: [
          { label: "VTC Francheville", href: "/vtc-francheville" },
          { label: "VTC Tassin-la-Demi-Lune", href: "/vtc-tassin-la-demi-lune" },
          { label: "VTC banlieue ouest de Lyon", href: "/vtc-banlieue-ouest-lyon" },
        ],
      },
      reservationItem("à Craponne", "Pour un départ en vacances, précisez le nombre de valises.", 1),
    ],
  },

  "vtc-francheville": {
    title: "Votre chauffeur privé à Francheville",
    items: [
      {
        title: "Prise en charge à Francheville",
        paragraphs: [
          "Francheville, à l'ouest de Lyon, est traversée par la vallée de l'Yzeron et compte plusieurs quartiers, du Bourg à Bel-Air. Nous vous prenons en charge à votre adresse, quel que soit le quartier.",
          "La commune est étendue : indiquez l'adresse complète pour une prise en charge précise et à l'heure.",
        ],
      },
      {
        title: "Gares, aéroport et Lyon",
        paragraphs: [
          "Nous assurons vos transferts de Francheville vers la gare Perrache, la gare Part-Dieu et l'aéroport Lyon-Saint-Exupéry. Le trajet est direct, avec vos bagages, et nous suivons votre horaire pour le retour.",
          "Nous vous conduisons aussi au centre de Lyon pour vos rendez-vous et vos sorties.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
        ],
      },
      {
        title: "Familles et voisinage",
        paragraphs: [
          "Vacances en famille, événement, rendez-vous médical : nous adaptons le véhicule à vos besoins, avec sièges enfants sur demande.",
          "Francheville est voisine de Tassin-la-Demi-Lune, de Craponne, de Sainte-Foy-lès-Lyon et du 5e arrondissement.",
        ],
        links: [
          { label: "VTC Craponne", href: "/vtc-craponne" },
          { label: "VTC Sainte-Foy-lès-Lyon", href: "/vtc-sainte-foy-les-lyon" },
          { label: "VTC Tassin-la-Demi-Lune", href: "/vtc-tassin-la-demi-lune" },
        ],
      },
      reservationItem("à Francheville", "Précisez le quartier pour faciliter la prise en charge.", 2),
    ],
  },

  "vtc-sainte-foy-les-lyon": {
    title: "Votre chauffeur privé à Sainte-Foy-lès-Lyon",
    items: [
      {
        title: "Prise en charge sur la colline",
        paragraphs: [
          "Sainte-Foy-lès-Lyon occupe une colline au sud-ouest de Lyon, avec de beaux points de vue sur la ville. Nous vous prenons en charge au centre, à Beaunant, à la Gravière ou dans les autres quartiers de la commune.",
          "Les rues en pente et parfois étroites demandent de bien préparer l'itinéraire : indiquez-nous votre adresse précise.",
        ],
      },
      {
        title: "Gares et aéroport",
        paragraphs: [
          "La gare Perrache est proche de Sainte-Foy : nous vous y déposons ou vous y accueillons à l'arrivée de votre train. Nous assurons aussi vos transferts vers la gare Part-Dieu et l'aéroport Lyon-Saint-Exupéry.",
          "Pour votre retour, nous suivons votre vol ou votre train et votre chauffeur vous attend.",
        ],
        links: [
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
        ],
      },
      {
        title: "Familles et voisins",
        paragraphs: [
          "Les familles fidésiennes nous réservent pour les départs en vacances, avec sièges enfants sur demande, ainsi que pour les sorties et les rendez-vous à Lyon.",
          "Sainte-Foy-lès-Lyon est voisine du 5e arrondissement, de Francheville, d'Oullins-Pierre-Bénite et de La Mulatière.",
        ],
        links: [
          { label: "VTC Lyon 5e", href: "/vtc-lyon-5e-arrondissement" },
          { label: "VTC Oullins-Pierre-Bénite", href: "/vtc-oullins-pierre-benite" },
          { label: "VTC Francheville", href: "/vtc-francheville" },
        ],
      },
      reservationItem("à Sainte-Foy-lès-Lyon", "Précisez votre quartier pour faciliter l'accès.", 3),
    ],
  },

  "vtc-oullins-pierre-benite": {
    title: "Votre chauffeur privé à Oullins-Pierre-Bénite",
    items: [
      {
        title: "Oullins et Pierre-Bénite",
        paragraphs: [
          "Oullins-Pierre-Bénite, au sud de Lyon, réunit depuis 2024 les anciennes communes d'Oullins et de Pierre-Bénite. Centre d'Oullins, la Saulaie, Pierre-Bénite et ses quartiers : nous vous prenons en charge partout.",
          "La commune accueille aussi le centre hospitalier Lyon Sud : pour un rendez-vous ou une visite, précisez le bâtiment.",
        ],
      },
      {
        title: "Gares, aéroport et Lyon",
        paragraphs: [
          "Depuis Oullins-Pierre-Bénite, la gare Perrache est toute proche. Nous vous y conduisons, ainsi qu'à la gare Part-Dieu et à l'aéroport Lyon-Saint-Exupéry, porte à porte et avec vos bagages.",
          "Nous assurons aussi l'accueil à l'arrivée de votre train ou de votre vol.",
        ],
        links: [
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
        ],
      },
      {
        title: "Patients, familles et voisins",
        paragraphs: [
          "Patients et visiteurs de l'hôpital Lyon Sud, familles en départ de vacances, professionnels : nous adaptons le service à votre besoin, avec un chauffeur attentif et sièges enfants sur demande.",
          "La commune est voisine de Saint-Genis-Laval, de Sainte-Foy-lès-Lyon, d'Irigny et du 7e arrondissement.",
        ],
        links: [
          { label: "VTC Saint-Genis-Laval", href: "/vtc-saint-genis-laval" },
          { label: "VTC Sainte-Foy-lès-Lyon", href: "/vtc-sainte-foy-les-lyon" },
          { label: "VTC banlieue sud de Lyon", href: "/vtc-banlieue-sud-lyon" },
        ],
      },
      reservationItem("à Oullins-Pierre-Bénite", "Pour l'hôpital Lyon Sud, indiquez le bâtiment et l'heure de fin prévue.", 0),
    ],
  },

  "vtc-saint-genis-laval": {
    title: "Votre chauffeur privé à Saint-Genis-Laval",
    items: [
      {
        title: "Prise en charge à Saint-Genis-Laval",
        paragraphs: [
          "Saint-Genis-Laval, au sud-ouest de Lyon, associe un centre-ville commerçant, des quartiers résidentiels comme les Barolles et des zones d'activité. Nous vous prenons en charge à votre adresse, quel que soit le quartier.",
          "La commune est desservie par le prolongement de la ligne B du métro, mais avec des valises ou à des horaires décalés, un chauffeur privé reste la solution la plus simple.",
        ],
      },
      {
        title: "Gares et aéroport",
        paragraphs: [
          "Nous assurons vos transferts de Saint-Genis-Laval vers la gare Perrache, la gare Part-Dieu et l'aéroport Lyon-Saint-Exupéry, en suivant l'horaire de votre train ou de votre vol.",
          "Au retour, votre chauffeur vous attend à l'arrivée et vous ramène directement chez vous.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
        ],
      },
      {
        title: "Familles, professionnels et voisins",
        paragraphs: [
          "Départs en vacances avec sièges enfants, rendez-vous professionnels avec facture au nom de l'entreprise, sorties à Lyon : nous nous adaptons à vos besoins.",
          "Saint-Genis-Laval est voisine d'Oullins-Pierre-Bénite, de Brignais, d'Irigny et de Francheville.",
        ],
        links: [
          { label: "VTC Oullins-Pierre-Bénite", href: "/vtc-oullins-pierre-benite" },
          { label: "VTC Francheville", href: "/vtc-francheville" },
          { label: "VTC banlieue sud de Lyon", href: "/vtc-banlieue-sud-lyon" },
        ],
      },
      reservationItem("à Saint-Genis-Laval", "Précisez le nombre de passagers et de bagages.", 1),
    ],
  },

  "vtc-saint-fons": {
    title: "Votre chauffeur privé à Saint-Fons",
    items: [
      {
        title: "Prise en charge à Saint-Fons",
        paragraphs: [
          "Saint-Fons, au sud de Lyon, est une commune à la fois résidentielle et industrielle, au cœur de la vallée de la chimie. Nous vous prenons en charge à votre domicile comme sur un site d'entreprise.",
          "Pour un site industriel, indiquez-nous le nom de l'entreprise et l'accueil à utiliser : votre chauffeur s'y présentera directement.",
        ],
      },
      {
        title: "Gares et aéroport",
        paragraphs: [
          "Depuis Saint-Fons, nous assurons vos transferts vers la gare Perrache, la gare Part-Dieu et l'aéroport Lyon-Saint-Exupéry, porte à porte et avec vos bagages.",
          "Nous suivons votre train ou votre vol pour ajuster l'heure de prise en charge au retour.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
        ],
      },
      {
        title: "Entreprises et voisinage",
        paragraphs: [
          "Les entreprises de la vallée de la chimie nous confient l'accueil de leurs visiteurs, auditeurs et intervenants, avec facturation au nom de la société.",
          "Saint-Fons est voisine de Vénissieux, de Feyzin et du 7e arrondissement de Lyon.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Vénissieux", href: "/vtc-venissieux" },
          { label: "VTC Feyzin", href: "/vtc-feyzin" },
          { label: "VTC Lyon 7e", href: "/vtc-lyon-7e-arrondissement" },
        ],
      },
      reservationItem("à Saint-Fons", "Pour un site industriel, précisez le nom de l'entreprise.", 2),
    ],
  },

  "vtc-feyzin": {
    title: "Votre chauffeur privé à Feyzin",
    items: [
      {
        title: "Prise en charge à Feyzin",
        paragraphs: [
          "Feyzin, au sud de Lyon, associe un centre-ville et des quartiers résidentiels à d'importantes zones industrielles. Nous vous prenons en charge à votre domicile, à votre entreprise ou à votre hôtel.",
          "Pour un site d'entreprise, indiquez le nom de la société et l'entrée : votre chauffeur se présentera au bon endroit.",
        ],
      },
      {
        title: "Gares, aéroport et longues distances",
        paragraphs: [
          "Nous assurons vos transferts de Feyzin vers la gare Perrache, la gare Part-Dieu et l'aéroport Lyon-Saint-Exupéry, en suivant votre horaire de train ou de vol.",
          "Situé sur l'axe sud, Feyzin est aussi un bon point de départ pour des trajets longue distance vers d'autres villes.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
          { label: "Trajets longues distances", href: "/longues-distances" },
        ],
      },
      {
        title: "Professionnels et voisins",
        paragraphs: [
          "Les entreprises de Feyzin font appel à nous pour accueillir clients et partenaires et pour les déplacements de leurs équipes, avec facturation au nom de la société.",
          "Feyzin est voisine de Saint-Fons, de Vénissieux, de Corbas et de Solaize.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Saint-Fons", href: "/vtc-saint-fons" },
          { label: "VTC Corbas", href: "/vtc-corbas" },
        ],
      },
      reservationItem("à Feyzin", "Précisez l'adresse exacte et l'entrée à utiliser.", 3),
    ],
  },

  "vtc-givors": {
    title: "Votre chauffeur privé à Givors",
    items: [
      {
        title: "Prise en charge à Givors",
        paragraphs: [
          "Givors, au sud de la métropole, au confluent du Gier et du Rhône, est la commune la plus au sud de notre zone. Nous vous prenons en charge au centre-ville, près de la gare ou dans les quartiers résidentiels.",
          "Indiquez-nous votre adresse complète et un repère si besoin : votre chauffeur se présentera à l'heure convenue.",
        ],
      },
      {
        title: "Gares lyonnaises et aéroport",
        paragraphs: [
          "Depuis Givors, rejoindre l'aéroport Lyon-Saint-Exupéry ou la gare Part-Dieu en transports en commun demande du temps et des correspondances. Un chauffeur privé vous y conduit directement, avec vos bagages.",
          "Nous assurons aussi les trajets vers la gare Perrache et votre retour à l'arrivée de votre train ou de votre vol.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Familles, longues distances et sud lyonnais",
        paragraphs: [
          "Départ en vacances avec sièges enfants, rendez-vous à Lyon, trajet vers une autre ville : nous adaptons le véhicule et l'organisation à votre besoin.",
          "Givors fait partie du sud lyonnais, que nous desservons dans son ensemble, de Grigny à Saint-Genis-Laval.",
        ],
        links: [
          { label: "VTC banlieue sud de Lyon", href: "/vtc-banlieue-sud-lyon" },
          { label: "Trajets longues distances", href: "/longues-distances" },
          { label: "VTC Saint-Genis-Laval", href: "/vtc-saint-genis-laval" },
        ],
      },
      reservationItem("à Givors", "Pour un vol matinal, réservez la veille au plus tard.", 0),
    ],
  },
};
