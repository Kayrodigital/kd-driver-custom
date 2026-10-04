import { reservationItem, type LearnMorePage } from "./_shared";

// Contenus « En savoir plus » — communes de l'est et du nord. Clé = slug de la page.

export const communesEstNordLearnMore: Record<string, LearnMorePage> = {
  "vtc-bron": {
    title: "Votre chauffeur privé à Bron",
    items: [
      {
        title: "Prise en charge partout à Bron",
        paragraphs: [
          "Bron, à l'est de Lyon, mêle quartiers résidentiels, campus universitaire de la Porte des Alpes, grands établissements hospitaliers et parc de Parilly. Nous vous prenons en charge à votre domicile, à votre travail, à l'hôpital ou à l'université.",
          "Pour un établissement de santé ou un campus, précisez le bâtiment ou l'entrée : votre chauffeur vous attendra au point le plus pratique.",
        ],
      },
      {
        title: "Aéroport, gares et événements",
        paragraphs: [
          "Bron est idéalement placée pour rejoindre l'aéroport Lyon-Saint-Exupéry ou la gare Part-Dieu. Nous assurons ces transferts porte à porte, en suivant l'horaire de votre vol ou de votre train.",
          "La commune est aussi proche d'Eurexpo, du Groupama Stadium et de la LDLC Arena : réservez votre trajet aller et retour pour un salon, un match ou un concert.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "VTC Eurexpo Lyon", href: "/vtc-eurexpo-lyon" },
        ],
      },
      {
        title: "Patients, visiteurs et professionnels",
        paragraphs: [
          "De nombreux patients et visiteurs se rendent chaque jour dans les hôpitaux de Bron. Nous vous accompagnons pour un rendez-vous ou une visite, avec un chauffeur attentif et ponctuel, et pouvons prévoir le trajet retour.",
          "Pour les professionnels, nous assurons les trajets entre Bron, Lyon et l'aéroport, avec facturation au nom de votre entreprise. Bron est voisine de Vénissieux, Saint-Priest, Chassieu et du 8e arrondissement.",
        ],
        links: [
          { label: "VTC Vénissieux", href: "/vtc-venissieux" },
          { label: "VTC Saint-Priest", href: "/vtc-saint-priest" },
          { label: "VTC Lyon 8e", href: "/vtc-lyon-8e-arrondissement" },
        ],
      },
      reservationItem("à Bron", "Pour un rendez-vous médical, indiquez l'heure de fin prévue si vous souhaitez un retour.", 1),
    ],
  },

  "vtc-venissieux": {
    title: "Votre chauffeur privé à Vénissieux",
    items: [
      {
        title: "Tous les quartiers de Vénissieux",
        paragraphs: [
          "Vénissieux, au sud-est de Lyon, est l'une des plus grandes communes de la métropole. Centre-ville, Parilly, Moulin-à-Vent, les Minguettes ou les zones d'activité : nous vous prenons en charge à l'adresse de votre choix.",
          "La commune accueille d'importants sites industriels et logistiques : indiquez-nous le nom de l'entreprise et l'entrée à utiliser.",
        ],
      },
      {
        title: "Gares, aéroport et liaisons",
        paragraphs: [
          "Depuis Vénissieux, nous assurons les transferts vers l'aéroport Lyon-Saint-Exupéry, la gare Part-Dieu et la gare Perrache, directement depuis votre porte, avec vos bagages.",
          "Nous effectuons aussi les trajets vers les grands lieux de l'est lyonnais, comme Eurexpo pour un salon professionnel.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
          { label: "VTC Eurexpo Lyon", href: "/vtc-eurexpo-lyon" },
        ],
      },
      {
        title: "Entreprises et voisinage",
        paragraphs: [
          "Pour les entreprises de Vénissieux, nous assurons l'accueil de clients, de fournisseurs ou de collaborateurs en déplacement, ainsi que leurs trajets vers la gare ou l'aéroport. La facturation se fait au nom de votre société.",
          "Vénissieux est voisine de Bron, de Saint-Fons, de Corbas, de Feyzin et du 8e arrondissement de Lyon.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Saint-Fons", href: "/vtc-saint-fons" },
          { label: "VTC Corbas", href: "/vtc-corbas" },
          { label: "VTC Bron", href: "/vtc-bron" },
        ],
      },
      reservationItem("à Vénissieux", "Pour une zone d'activité, précisez le nom de l'entreprise.", 2),
    ],
  },

  "vtc-saint-priest": {
    title: "Votre chauffeur privé à Saint-Priest",
    items: [
      {
        title: "Centre, Manissieux, parcs d'activités",
        paragraphs: [
          "Saint-Priest, à l'est de Lyon, associe un centre-ville, des quartiers résidentiels comme Manissieux et Revaison, et de grands parcs d'activités, dont le Parc technologique. Nous vous prenons en charge à domicile comme au bureau.",
          "Pour les zones d'activité, indiquez-nous le nom de la société et du bâtiment : votre chauffeur se présentera à la bonne entrée.",
        ],
      },
      {
        title: "L'aéroport à proximité",
        paragraphs: [
          "Saint-Priest est l'une des communes les mieux placées pour rejoindre l'aéroport Lyon-Saint-Exupéry. Nous assurons vos transferts aller et retour, en suivant votre vol pour ajuster l'heure de prise en charge.",
          "Nous vous conduisons aussi à la gare Part-Dieu, à la gare Saint-Exupéry TGV et à Eurexpo, toute proche.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Gare Lyon-Saint-Exupéry TGV", href: "/vtc-gare-lyon-saint-exupery-tgv" },
          { label: "VTC Eurexpo Lyon", href: "/vtc-eurexpo-lyon" },
        ],
      },
      {
        title: "Déplacements professionnels",
        paragraphs: [
          "Les entreprises installées à Saint-Priest reçoivent régulièrement clients et partenaires. Nous les accueillons à l'aéroport ou à la gare et les conduisons jusqu'à vos locaux, avec facturation au nom de votre société.",
          "Saint-Priest est voisine de Bron, de Chassieu, de Corbas et de Vénissieux.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Chassieu", href: "/vtc-chassieu" },
          { label: "VTC Bron", href: "/vtc-bron" },
          { label: "VTC Corbas", href: "/vtc-corbas" },
        ],
      },
      reservationItem("à Saint-Priest", "Pour un vol matinal, réservez la veille au plus tard.", 3),
    ],
  },

  "vtc-chassieu": {
    title: "Votre chauffeur privé à Chassieu",
    items: [
      {
        title: "Prise en charge à Chassieu",
        paragraphs: [
          "Chassieu, à l'est de Lyon, est connue pour accueillir le parc des expositions Eurexpo, mais c'est aussi une commune résidentielle avec ses zones d'activité. Nous vous prenons en charge à votre domicile, à votre entreprise ou à votre hôtel.",
          "Pendant les grands salons, la circulation autour d'Eurexpo est dense : votre chauffeur adapte son itinéraire et son horaire en conséquence.",
        ],
      },
      {
        title: "Eurexpo et salons professionnels",
        paragraphs: [
          "Exposants et visiteurs nous réservent pour rejoindre Eurexpo depuis l'aéroport, les gares ou leur hôtel. Nous pouvons prévoir l'aller le matin et le retour en fin de journée, ou une mise à disposition pendant toute la durée du salon.",
          "Consultez notre page dédiée et notre guide des événements lyonnais pour préparer vos déplacements.",
        ],
        links: [
          { label: "VTC Eurexpo Lyon", href: "/vtc-eurexpo-lyon" },
          { label: "Événements et salons à Lyon", href: "/blog/evenements-lyon" },
          { label: "Mise à disposition", href: "/mise-a-disposition" },
        ],
      },
      {
        title: "Aéroport et communes voisines",
        paragraphs: [
          "Depuis Chassieu, l'aéroport Lyon-Saint-Exupéry et la gare Part-Dieu sont accessibles rapidement. Nous assurons vos transferts porte à porte, avec suivi de votre vol ou de votre train.",
          "Chassieu est voisine de Bron, de Saint-Priest, de Décines-Charpieu et de Genas.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "VTC Décines-Charpieu", href: "/vtc-decines-charpieu" },
          { label: "VTC Saint-Priest", href: "/vtc-saint-priest" },
        ],
      },
      reservationItem("à Chassieu", "Pendant un salon, réservez vos trajets le plus tôt possible.", 0),
    ],
  },

  "vtc-decines-charpieu": {
    title: "Votre chauffeur privé à Décines-Charpieu",
    items: [
      {
        title: "Prise en charge à Décines-Charpieu",
        paragraphs: [
          "Décines-Charpieu, à l'est de Lyon, accueille le Groupama Stadium et la LDLC Arena, mais aussi des quartiers résidentiels et les bords du Grand Large. Nous vous prenons en charge partout dans la commune.",
          "Les soirs de match ou de concert, la circulation est réglementée autour du stade : votre chauffeur connaît les accès et le point de rendez-vous adapté.",
        ],
      },
      {
        title: "Groupama Stadium et LDLC Arena",
        paragraphs: [
          "Pour un match, un concert ou un événement d'entreprise, réservez votre aller et votre retour. À la sortie, votre chauffeur vous attend au point convenu : pas de file d'attente pour les transports ni de parking à chercher.",
          "Nous accueillons aussi les supporters et spectateurs venus de loin à l'aéroport ou à la gare, et les conduisons jusqu'au stade.",
        ],
        links: [
          { label: "VTC Groupama Stadium", href: "/vtc-groupama-stadium" },
          { label: "VTC LDLC Arena", href: "/vtc-ldlc-arena" },
          { label: "Événements à Lyon", href: "/blog/evenements-lyon" },
        ],
      },
      {
        title: "Aéroport et voisinage",
        paragraphs: [
          "Décines-Charpieu est proche de l'aéroport Lyon-Saint-Exupéry : nous assurons vos transferts porte à porte, en suivant l'horaire de votre vol. Nous vous conduisons aussi à la gare Part-Dieu.",
          "La commune est voisine de Meyzieu, de Vaulx-en-Velin et de Chassieu.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "VTC Meyzieu", href: "/vtc-meyzieu" },
          { label: "VTC Vaulx-en-Velin", href: "/vtc-vaulx-en-velin" },
        ],
      },
      reservationItem("à Décines-Charpieu", "Pour un événement au stade, indiquez l'heure de fin prévue.", 1),
    ],
  },

  "vtc-meyzieu": {
    title: "Votre chauffeur privé à Meyzieu",
    items: [
      {
        title: "Centre, Grand Large et zone industrielle",
        paragraphs: [
          "Meyzieu, à l'est de Lyon, s'étend du centre-ville aux rives du Grand Large et à sa vaste zone industrielle. Nous vous prenons en charge à votre domicile, à votre entreprise ou à proximité de la station de tram.",
          "Pour la zone industrielle, précisez le nom de l'entreprise et l'entrée : votre chauffeur se présentera directement au bon endroit.",
        ],
      },
      {
        title: "Aéroport tout proche",
        paragraphs: [
          "Meyzieu est l'une des communes les plus proches de l'aéroport Lyon-Saint-Exupéry. Nous assurons vos transferts aller et retour, à toute heure, en suivant l'horaire réel de votre vol.",
          "Nous vous conduisons aussi à la gare Part-Dieu ou à la gare Saint-Exupéry TGV pour vos départs en train.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Gare Lyon-Saint-Exupéry TGV", href: "/vtc-gare-lyon-saint-exupery-tgv" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
        ],
      },
      {
        title: "Stade, entreprises et voisins",
        paragraphs: [
          "Le Groupama Stadium et la LDLC Arena sont à deux pas : nous assurons vos trajets les soirs d'événement. Pour les entreprises de Meyzieu, nous accueillons clients et collaborateurs, avec facturation au nom de la société.",
          "Meyzieu est voisine de Décines-Charpieu, de Jonage et de Genas.",
        ],
        links: [
          { label: "VTC Groupama Stadium", href: "/vtc-groupama-stadium" },
          { label: "VTC Décines-Charpieu", href: "/vtc-decines-charpieu" },
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
        ],
      },
      reservationItem("à Meyzieu", "Pour un vol tôt le matin, réservez la veille.", 2),
    ],
  },

  "vtc-vaulx-en-velin": {
    title: "Votre chauffeur privé à Vaulx-en-Velin",
    items: [
      {
        title: "Carré de Soie, Village, Mas du Taureau",
        paragraphs: [
          "Vaulx-en-Velin, à l'est de Lyon, regroupe des quartiers très divers : le Carré de Soie et son pôle commercial, le Village, le centre-ville, le Mas du Taureau ou encore le secteur des écoles d'ingénieurs et d'architecture. Nous vous prenons en charge partout dans la commune.",
          "Indiquez-nous l'adresse précise ou le nom de l'établissement : votre chauffeur vous attendra au bon endroit.",
        ],
      },
      {
        title: "Gares, aéroport et stade",
        paragraphs: [
          "Depuis Vaulx-en-Velin, nous assurons vos transferts vers l'aéroport Lyon-Saint-Exupéry et la gare Part-Dieu, directement depuis votre porte, avec vos bagages.",
          "La commune est voisine du Groupama Stadium et de la LDLC Arena à Décines : réservez votre trajet pour un match ou un concert, aller et retour.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "VTC LDLC Arena", href: "/vtc-ldlc-arena" },
        ],
      },
      {
        title: "Étudiants, familles et voisins",
        paragraphs: [
          "Étudiants et enseignants des écoles de Vaulx-en-Velin, familles en départ de vacances, professionnels en déplacement : nous adaptons le véhicule au nombre de passagers et de bagages, avec des sièges enfants sur demande.",
          "Vaulx-en-Velin est voisine de Villeurbanne, de Décines-Charpieu et de Rillieux-la-Pape.",
        ],
        links: [
          { label: "VTC Villeurbanne", href: "/vtc-villeurbanne" },
          { label: "VTC Décines-Charpieu", href: "/vtc-decines-charpieu" },
          { label: "Nos véhicules", href: "/vehicules" },
        ],
      },
      reservationItem("à Vaulx-en-Velin", "Précisez le nombre de valises pour que nous prévoyions le bon véhicule.", 3),
    ],
  },

  "vtc-corbas": {
    title: "Votre chauffeur privé à Corbas",
    items: [
      {
        title: "Prise en charge à Corbas",
        paragraphs: [
          "Corbas, au sud-est de Lyon, associe quartiers pavillonnaires et importantes zones d'activité et de logistique. Nous vous prenons en charge à votre domicile comme sur votre lieu de travail.",
          "Pour une entreprise, indiquez le nom de la société et l'accès à utiliser : votre chauffeur se présentera directement à l'entrée.",
        ],
      },
      {
        title: "Aéroport, gares et salons",
        paragraphs: [
          "Corbas est bien placée pour rejoindre l'aéroport Lyon-Saint-Exupéry par l'est. Nous assurons vos transferts porte à porte et suivons votre vol pour ajuster la prise en charge au retour.",
          "Nous vous conduisons aussi à la gare Part-Dieu et à Eurexpo pour vos salons professionnels.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "VTC Eurexpo Lyon", href: "/vtc-eurexpo-lyon" },
        ],
      },
      {
        title: "Professionnels et voisinage",
        paragraphs: [
          "Les entreprises de Corbas font appel à nous pour accueillir leurs clients et partenaires ou pour les déplacements de leurs équipes, avec facturation au nom de la société.",
          "Corbas est voisine de Vénissieux, de Saint-Priest, de Feyzin et de Mions.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Vénissieux", href: "/vtc-venissieux" },
          { label: "VTC Feyzin", href: "/vtc-feyzin" },
        ],
      },
      reservationItem("à Corbas", "Pour une zone d'activité, précisez le nom de l'entreprise.", 0),
    ],
  },

  "vtc-caluire-et-cuire": {
    title: "Votre chauffeur privé à Caluire-et-Cuire",
    items: [
      {
        title: "Entre Rhône et Saône",
        paragraphs: [
          "Caluire-et-Cuire s'étend sur le plateau entre le Rhône et la Saône, au nord de la Croix-Rousse. Montessuy, Cuire, Saint-Clair, Vassieux ou le centre : nous vous prenons en charge dans tous les quartiers.",
          "Certaines rues sont en pente et étroites : en indiquant votre adresse exacte, vous permettez à votre chauffeur de prévoir le meilleur accès.",
        ],
      },
      {
        title: "Gares et aéroport",
        paragraphs: [
          "Depuis Caluire, nous assurons vos transferts vers la gare Part-Dieu, la gare Perrache et l'aéroport Lyon-Saint-Exupéry. Le trajet est direct, avec vos bagages, sans correspondance.",
          "Pour votre retour, votre chauffeur vous attend à l'arrivée de votre train ou de votre vol, dont nous suivons l'horaire.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Familles, sorties et voisins",
        paragraphs: [
          "Les familles caluirardes nous réservent pour leurs départs en vacances, avec des sièges enfants sur demande. Nous assurons aussi les retours de soirée et les sorties à Lyon.",
          "Caluire-et-Cuire est voisine de la Croix-Rousse, de Rillieux-la-Pape, de Villeurbanne et du 6e arrondissement.",
        ],
        links: [
          { label: "VTC Lyon 4e (Croix-Rousse)", href: "/vtc-lyon-4e-arrondissement" },
          { label: "VTC Rillieux-la-Pape", href: "/vtc-rillieux-la-pape" },
          { label: "VTC Villeurbanne", href: "/vtc-villeurbanne" },
        ],
      },
      reservationItem("à Caluire-et-Cuire", "Précisez le nombre de passagers et de valises.", 1),
    ],
  },

  "vtc-rillieux-la-pape": {
    title: "Votre chauffeur privé à Rillieux-la-Pape",
    items: [
      {
        title: "Village, Ville nouvelle, Crépieux, Vancia",
        paragraphs: [
          "Rillieux-la-Pape, au nord de Lyon, regroupe plusieurs secteurs : Rillieux-Village, la Ville nouvelle, Crépieux-la-Pape au bord du Rhône et Vancia. Nous vous prenons en charge dans chacun d'eux.",
          "Les distances entre quartiers sont importantes : indiquez votre adresse exacte pour une prise en charge à l'heure.",
        ],
      },
      {
        title: "Vers Lyon, les gares et l'aéroport",
        paragraphs: [
          "Depuis Rillieux, nous vous conduisons à la gare Part-Dieu, à la gare Perrache ou à l'aéroport Lyon-Saint-Exupéry, sans changement de transport et avec vos bagages.",
          "Nous assurons aussi les trajets vers le centre de Lyon pour vos rendez-vous, sorties ou événements.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Transferts gares de Lyon", href: "/transfert-gare" },
        ],
      },
      {
        title: "Familles, professionnels et nord lyonnais",
        paragraphs: [
          "Familles en départ de vacances, professionnels en déplacement, personnes qui préfèrent ne pas conduire : nous adaptons le véhicule à votre besoin, avec sièges enfants sur demande et facture entreprise si nécessaire.",
          "Rillieux-la-Pape est voisine de Caluire-et-Cuire, de Sathonay et de Vaulx-en-Velin. Nous desservons tout le nord lyonnais.",
        ],
        links: [
          { label: "VTC banlieue nord de Lyon", href: "/vtc-banlieue-nord-lyon" },
          { label: "VTC Caluire-et-Cuire", href: "/vtc-caluire-et-cuire" },
          { label: "VTC Vaulx-en-Velin", href: "/vtc-vaulx-en-velin" },
        ],
      },
      reservationItem("à Rillieux-la-Pape", "Indiquez le quartier (Village, Ville nouvelle, Crépieux ou Vancia).", 2),
    ],
  },

  "vtc-neuville-sur-saone": {
    title: "Votre chauffeur privé à Neuville-sur-Saône",
    items: [
      {
        title: "Prise en charge au Val de Saône",
        paragraphs: [
          "Neuville-sur-Saône, au nord de la métropole, est le pôle du Val de Saône, au bord de la rivière. Nous vous prenons en charge en centre-ville, sur les quais ou dans les quartiers résidentiels alentour.",
          "Nous desservons aussi les communes voisines du Val de Saône sur demande : précisez simplement votre adresse.",
        ],
      },
      {
        title: "Un accès simple aux gares et à l'aéroport",
        paragraphs: [
          "Depuis Neuville, rejoindre l'aéroport ou les gares lyonnaises en transports en commun prend du temps. Un chauffeur privé vous y conduit directement, avec vos bagages, à l'heure de votre choix.",
          "Pour votre retour, nous suivons votre vol ou votre train et votre chauffeur vous attend à l'arrivée.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Familles et longues distances",
        paragraphs: [
          "Les familles du Val de Saône nous réservent pour leurs départs en vacances, avec sièges enfants sur demande. Nous assurons aussi des trajets plus longs, vers d'autres villes ou, en hiver, vers les stations de ski.",
          "Neuville-sur-Saône fait partie du nord lyonnais, que nous desservons dans son ensemble.",
        ],
        links: [
          { label: "Trajets longues distances", href: "/longues-distances" },
          { label: "Transferts vers les stations de ski", href: "/transfert-stations-ski-depuis-lyon" },
          { label: "VTC banlieue nord de Lyon", href: "/vtc-banlieue-nord-lyon" },
        ],
      },
      reservationItem("à Neuville-sur-Saône", "Pour un départ très matinal, réservez la veille.", 3),
    ],
  },

  "vtc-limonest": {
    title: "Votre chauffeur privé à Limonest",
    items: [
      {
        title: "Monts d'Or et Techlid",
        paragraphs: [
          "Limonest, au nord-ouest de Lyon, au pied des Monts d'Or, accueille une partie du parc d'activités Techlid et de nombreuses entreprises. Nous vous prenons en charge à votre domicile, à votre bureau ou à votre hôtel.",
          "Pour un site d'entreprise, indiquez le nom de la société et du bâtiment : votre chauffeur se présentera au bon accueil.",
        ],
      },
      {
        title: "Gares, aéroport et centre de Lyon",
        paragraphs: [
          "Depuis Limonest, nous assurons les transferts vers la gare Part-Dieu, la gare Perrache et l'aéroport Lyon-Saint-Exupéry, sans contrainte de parking ni de correspondance.",
          "Nous vous accueillons aussi à l'arrivée de votre train ou de votre vol pour vous ramener à Limonest.",
        ],
        links: [
          { label: "Transfert aéroport", href: "/transfert-aeroport" },
          { label: "Chauffeur gare Part-Dieu", href: "/vtc-lyon-part-dieu" },
          { label: "Chauffeur gare Perrache", href: "/vtc-lyon-perrache" },
        ],
      },
      {
        title: "Déplacements d'affaires",
        paragraphs: [
          "Les entreprises de Limonest et de Techlid nous confient l'accueil de leurs clients, l'organisation de rendez-vous ou les trajets de leurs dirigeants. Nous établissons la facture au nom de votre société, et une mise à disposition à la journée est possible.",
          "Limonest est voisine de Dardilly, de Champagne-au-Mont-d'Or et du 9e arrondissement.",
        ],
        links: [
          { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
          { label: "VTC Dardilly", href: "/vtc-dardilly" },
          { label: "VTC Lyon 9e", href: "/vtc-lyon-9e-arrondissement" },
        ],
      },
      reservationItem("à Limonest", "Pour un rendez-vous d'affaires, indiquez-nous l'heure à laquelle vous devez arriver.", 0),
    ],
  },
};
