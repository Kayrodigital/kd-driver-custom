import { reservationItem, type LearnMoreItem, type LearnMorePage } from "./_shared";

// Contenus « En savoir plus » — 12 stations de ski. Clé = slug.
// Aucun prix, temps de trajet ni altitude chiffrée.

function preparerItem(station: string, variant: number): LearnMoreItem {
  const textes = [
    [
      `Pour votre transfert vers ${station}, indiquez-nous le nombre de passagers, de valises et de housses de skis ou de snowboards : nous prévoyons un véhicule avec l'espace nécessaire. Sièges enfants sur demande.`,
      "En hiver, les conditions de route en montagne peuvent changer vite : votre chauffeur adapte son itinéraire et son horaire de départ pour vous déposer en toute sécurité.",
    ],
    [
      `Skis, chaussures, poussette, bagages de toute la famille : pour ${station}, précisez votre équipement à la réservation afin que tout tienne dans le véhicule. Nous installons des sièges enfants sur demande.`,
      "Votre chauffeur tient compte de la météo et de l'affluence des week-ends de vacances pour choisir le meilleur horaire de départ.",
    ],
    [
      `Un transfert réussi vers ${station} commence par une réservation précise : adresse de départ, résidence ou chalet d'arrivée, nombre de skieurs et volume d'équipement. Nous choisissons le véhicule en conséquence, avec sièges enfants si besoin.`,
      "Les samedis de vacances scolaires sont les jours les plus chargés en direction des Alpes : réservez tôt, votre chauffeur organisera le départ pour limiter l'attente sur la route.",
    ],
  ];
  return {
    title: "Préparer votre transfert",
    paragraphs: textes[variant % textes.length],
    links: [
      { label: "Nos véhicules", href: "/vehicules" },
      { label: "Toutes les stations desservies", href: "/transfert-stations-ski-depuis-lyon" },
    ],
  };
}

function depuisItem(station: string): LearnMoreItem {
  return {
    title: "Depuis l'aéroport, les gares ou votre domicile",
    paragraphs: [
      `Nous vous prenons en charge à l'aéroport Lyon-Saint-Exupéry, à la gare Lyon-Saint-Exupéry TGV, à la Part-Dieu ou directement chez vous dans la métropole lyonnaise, et vous conduisons jusqu'à la porte de votre hébergement à ${station}. Pour un vol ou un train, nous suivons votre horaire.`,
    ],
    links: [
      { label: "Transfert aéroport", href: "/transfert-aeroport" },
      { label: "Gare Lyon-Saint-Exupéry TGV", href: "/vtc-gare-lyon-saint-exupery-tgv" },
    ],
  };
}

function station(
  nom: string,
  titre: string,
  presentation: string[],
  specifique: LearnMoreItem,
  variant: number,
): LearnMorePage {
  return {
    title: titre,
    items: [
      { title: `${nom.charAt(0).toUpperCase()}${nom.slice(1)}, la station`, paragraphs: presentation },
      specifique,
      depuisItem(nom),
      preparerItem(nom, variant),
      reservationItem(`pour ${nom}`, "Indiquez le nom de votre résidence, chalet ou hôtel.", variant),
    ],
  };
}

export const stationsSkiLearnMore: Record<string, LearnMorePage> = {
  "transfert-lyon-courchevel": station("Courchevel", "Votre transfert Lyon – Courchevel avec chauffeur", [
    "Courchevel, en Savoie, fait partie du domaine des 3 Vallées, l'un des plus grands domaines skiables reliés au monde. La station regroupe plusieurs villages, de Courchevel 1850 au Praz, en passant par Courchevel Moriond et Courchevel Village.",
    "Indiquez-nous le village et l'hébergement exacts : votre chauffeur vous dépose devant votre chalet ou votre hôtel.",
  ], {
    title: "Un transfert à la hauteur de votre séjour",
    paragraphs: [
      "Courchevel accueille une clientèle exigeante, habituée aux services haut de gamme. Nos chauffeurs sont discrets, ponctuels et attentifs à vos bagages. Pour un séjour d'affaires ou un événement, la facture peut être établie au nom de votre société.",
    ],
    links: [
      { label: "Transfert Lyon – Méribel", href: "/transfert-lyon-meribel" },
      { label: "Chauffeur privé entreprise", href: "/chauffeur-entreprise" },
    ],
  }, 0),

  "transfert-lyon-meribel": station("Méribel", "Votre transfert Lyon – Méribel avec chauffeur", [
    "Méribel, au centre du domaine des 3 Vallées, est réputée pour son architecture de chalets en bois et en pierre. La station s'étend de Méribel Centre à Méribel-Mottaret et aux villages de la vallée.",
    "Précisez le secteur de votre hébergement pour que votre chauffeur vous dépose au bon endroit.",
  ], {
    title: "Familles et groupes d'amis",
    paragraphs: [
      "Méribel accueille de nombreuses familles et groupes. Nous adaptons le véhicule au nombre de personnes et d'équipements, avec sièges enfants sur demande. Pour un groupe, un seul véhicule évite de se répartir entre plusieurs transports.",
    ],
    links: [
      { label: "Transfert Lyon – Courchevel", href: "/transfert-lyon-courchevel" },
      { label: "Transfert Lyon – Val Thorens", href: "/transfert-lyon-val-thorens" },
    ],
  }, 1),

  "transfert-lyon-val-thorens": station("Val Thorens", "Votre transfert Lyon – Val Thorens avec chauffeur", [
    "Val Thorens, au fond de la vallée des Belleville, est l'une des stations les plus hautes d'Europe et fait partie des 3 Vallées. Son altitude lui assure en général un bon enneigement tout au long de la saison.",
    "La station est piétonne en grande partie : votre chauffeur vous dépose au point d'accès le plus proche de votre résidence.",
  ], {
    title: "Une montée bien préparée",
    paragraphs: [
      "La route d'accès monte jusqu'en haut de la vallée : votre chauffeur connaît l'itinéraire et adapte l'horaire aux conditions météo. Vous profitez du trajet, sans vous soucier de la conduite en montagne ni du stationnement en station.",
    ],
    links: [
      { label: "Transfert Lyon – Les Menuires", href: "/transfert-lyon-les-menuires" },
      { label: "Transfert Lyon – Méribel", href: "/transfert-lyon-meribel" },
    ],
  }, 2),

  "transfert-lyon-les-menuires": station("Les Menuires", "Votre transfert Lyon – Les Menuires avec chauffeur", [
    "Les Menuires, dans la vallée des Belleville, offrent un accès direct au domaine des 3 Vallées. La station comprend plusieurs quartiers, de La Croisette à Reberty, ainsi que le village de Saint-Martin-de-Belleville en contrebas.",
    "Indiquez-nous le quartier de votre hébergement pour une dépose au plus près.",
  ], {
    title: "Une station appréciée des familles",
    paragraphs: [
      "Avec ses nombreuses résidences au pied des pistes, la station accueille beaucoup de familles. Nous prévoyons l'espace pour les bagages et l'équipement de chacun, et installons des sièges enfants sur demande.",
    ],
    links: [
      { label: "Transfert Lyon – Val Thorens", href: "/transfert-lyon-val-thorens" },
      { label: "Transfert Lyon – Courchevel", href: "/transfert-lyon-courchevel" },
    ],
  }, 0),

  "transfert-lyon-les-arcs": station("Les Arcs", "Votre transfert Lyon – Les Arcs avec chauffeur", [
    "Les Arcs, au-dessus de Bourg-Saint-Maurice, forment avec La Plagne le domaine Paradiski. La station se compose de plusieurs sites : Arc 1600, Arc 1800, Arc 1950 et Arc 2000, chacun avec son ambiance.",
    "Précisez le site de votre hébergement : la route n'est pas la même pour chacun.",
  ], {
    title: "Route ou funiculaire, à vous de choisir",
    paragraphs: [
      "Nous pouvons vous déposer directement à votre résidence par la route, ou à Bourg-Saint-Maurice si vous préférez rejoindre Arc 1600 par le funiculaire. Dites-nous ce qui vous convient le mieux.",
    ],
    links: [
      { label: "Transfert Lyon – La Plagne", href: "/transfert-lyon-la-plagne" },
      { label: "Transfert Lyon – Tignes", href: "/transfert-lyon-tignes" },
    ],
  }, 1),

  "transfert-lyon-la-plagne": station("La Plagne", "Votre transfert Lyon – La Plagne avec chauffeur", [
    "La Plagne, en Tarentaise, est l'une des plus grandes stations de France et fait partie du domaine Paradiski avec Les Arcs. Elle réunit de nombreux sites d'altitude, comme Plagne Centre, Belle Plagne ou Plagne Bellecôte, et des villages comme Montchavin-Les Coches ou Champagny.",
    "Le nom exact de votre site est indispensable pour vous déposer au bon endroit.",
  ], {
    title: "Des sites nombreux, une dépose précise",
    paragraphs: [
      "Les accès diffèrent selon les sites de La Plagne. Votre chauffeur choisit la bonne route et vous dépose devant votre résidence, avec vos bagages et votre équipement.",
    ],
    links: [
      { label: "Transfert Lyon – Les Arcs", href: "/transfert-lyon-les-arcs" },
      { label: "Transfert Lyon – Courchevel", href: "/transfert-lyon-courchevel" },
    ],
  }, 2),

  "transfert-lyon-tignes": station("Tignes", "Votre transfert Lyon – Tignes avec chauffeur", [
    "Tignes, en haute Tarentaise, partage son domaine skiable avec Val-d'Isère. Grâce au glacier de la Grande Motte, la station offre une longue saison de ski. Elle se compose de plusieurs secteurs, dont Tignes le Lac, Val Claret et Tignes les Brévières.",
    "Indiquez votre secteur pour une dépose au plus près de votre hébergement.",
  ], {
    title: "Haute Tarentaise, en toute tranquillité",
    paragraphs: [
      "La route vers Tignes remonte toute la vallée de la Tarentaise. Votre chauffeur s'occupe de la conduite et adapte l'horaire aux conditions, pour que vous arriviez reposé et prêt à profiter de votre séjour.",
    ],
    links: [
      { label: "Transfert Lyon – Val-d'Isère", href: "/transfert-lyon-val-disere" },
      { label: "Transfert Lyon – Les Arcs", href: "/transfert-lyon-les-arcs" },
    ],
  }, 0),

  "transfert-lyon-val-disere": station("Val-d'Isère", "Votre transfert Lyon – Val-d'Isère avec chauffeur", [
    "Val-d'Isère, au bout de la vallée de la Tarentaise, est une station-village de renommée internationale, qui accueille régulièrement des épreuves de Coupe du monde de ski. Elle partage son domaine avec Tignes.",
    "Indiquez-nous votre hôtel, chalet ou résidence pour une dépose devant la porte.",
  ], {
    title: "Une clientèle internationale",
    paragraphs: [
      "De nombreux visiteurs étrangers rejoignent Val-d'Isère depuis l'aéroport Lyon-Saint-Exupéry. Nous les accueillons à leur arrivée, en suivant leur vol, et les conduisons directement à la station.",
    ],
    links: [
      { label: "Transfert Lyon – Tignes", href: "/transfert-lyon-tignes" },
      { label: "Transfert aéroport", href: "/transfert-aeroport" },
    ],
  }, 1),

  "transfert-lyon-les-deux-alpes": station("Les Deux Alpes", "Votre transfert Lyon – Les Deux Alpes avec chauffeur", [
    "Les Deux Alpes, dans l'Oisans en Isère, sont connues pour leur glacier, qui permet de skier sur une longue période, et pour leur ambiance animée. La station s'étend en longueur sur un plateau d'altitude.",
    "Indiquez votre résidence : votre chauffeur vous dépose dans le bon quartier.",
  ], {
    title: "Par Grenoble et l'Oisans",
    paragraphs: [
      "Le trajet passe par Grenoble puis par la vallée de la Romanche. Nous pouvons aussi vous prendre en charge à Grenoble si vous y faites étape.",
    ],
    links: [
      { label: "Lyon – Grenoble", href: "/vtc-lyon-grenoble" },
      { label: "Transfert Lyon – Alpe d'Huez", href: "/transfert-lyon-alpe-dhuez" },
    ],
  }, 2),

  "transfert-lyon-alpe-dhuez": station("l'Alpe d'Huez", "Votre transfert Lyon – Alpe d'Huez avec chauffeur", [
    "L'Alpe d'Huez, dans l'Oisans, est surnommée « l'île au soleil » et reste célèbre pour ses 21 virages, rendus mythiques par le Tour de France. La station offre un vaste domaine skiable.",
    "Précisez votre hébergement pour une dépose au plus près.",
  ], {
    title: "Les 21 virages sans conduire",
    paragraphs: [
      "La montée finale vers la station est spectaculaire mais exigeante en hiver. Avec un chauffeur, vous profitez du paysage pendant qu'il s'occupe de la route, en adaptant l'horaire aux conditions.",
    ],
    links: [
      { label: "Lyon – Grenoble", href: "/vtc-lyon-grenoble" },
      { label: "Transfert Lyon – Les Deux Alpes", href: "/transfert-lyon-les-deux-alpes" },
    ],
  }, 0),

  "transfert-lyon-chamonix": station("Chamonix", "Votre transfert Lyon – Chamonix avec chauffeur", [
    "Chamonix-Mont-Blanc, au pied du plus haut sommet des Alpes, est une destination de montagne mythique, été comme hiver : ski, alpinisme, randonnée, Aiguille du Midi ou Mer de Glace.",
    "Indiquez votre hébergement à Chamonix ou dans les villages de la vallée, comme Argentière ou Les Houches.",
  ], {
    title: "Toute l'année",
    paragraphs: [
      "Contrairement aux stations uniquement hivernales, Chamonix accueille des visiteurs toute l'année. Nous assurons vos transferts en hiver comme en été, pour un séjour sportif, un séminaire ou des vacances en famille.",
    ],
    links: [
      { label: "Transfert Lyon – Megève", href: "/transfert-lyon-megeve" },
      { label: "Transfert Lyon – Genève", href: "/transfert-lyon-geneve" },
    ],
  }, 1),

  "transfert-lyon-megeve": station("Megève", "Votre transfert Lyon – Megève avec chauffeur", [
    "Megève, en Haute-Savoie, est un village de montagne élégant, réputé pour son centre médiéval, ses chalets et sa vue sur le Mont-Blanc. Son domaine skiable s'étend notamment sur le Mont d'Arbois et Rochebrune.",
    "Indiquez votre chalet ou votre hôtel : votre chauffeur vous dépose devant la porte.",
  ], {
    title: "Un séjour raffiné dès le trajet",
    paragraphs: [
      "Megève attire une clientèle à la recherche de confort et de discrétion. Nos chauffeurs s'occupent de vos bagages et vous conduisent jusqu'à votre hébergement dans un véhicule calme et soigné. Pour un séminaire, la facture peut être établie au nom de votre société.",
    ],
    links: [
      { label: "Transfert Lyon – Chamonix", href: "/transfert-lyon-chamonix" },
      { label: "Transfert Lyon – Annecy", href: "/transfert-lyon-annecy" },
    ],
  }, 2),
};
