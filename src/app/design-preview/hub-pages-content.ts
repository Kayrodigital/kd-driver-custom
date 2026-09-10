import type { HubPageContent } from "./hub-page-template";

/**
 * Pages "hub" : la page centrale /zones-desservies, les 4 hubs de banlieue
 * et le hub des stations de ski. Le regroupement en 4 zones (nord/ouest/
 * est/sud) est un choix commercial de navigation, pas un découpage
 * administratif officiel de la Métropole de Lyon — précisé sur chaque page.
 */
export const hubPages: HubPageContent[] = [
  {
    slug: "zones-desservies",
    eyebrow: "Zones desservies",
    h1: "Votre chauffeur VTC à Lyon et dans sa région",
    title: "Zones desservies par KDRIVE | Lyon et sa région | KDRIVE",
    metaDescription: "Toutes les zones desservies par KDRIVE : arrondissements de Lyon, communes de la métropole, gares, aéroport, longues distances et stations de ski.",
    heroImage: "/images/hero-lyon.jpg",
    heroLead: "KDRIVE dessert Lyon et sa région : les 9 arrondissements, les communes de la métropole, les gares, l'aéroport, les longues distances et les stations de ski.",
    presentationTitle: "Une seule page pour choisir votre secteur",
    presentationBody: [
      "Cette page rassemble l'ensemble des zones et destinations desservies par KDRIVE, afin de retrouver facilement la page correspondant à votre trajet : votre arrondissement, votre commune, une gare, l'aéroport, une longue distance ou une station de ski.",
      "Le classement par grande zone (nord, ouest, est, sud) est un repère commercial destiné à faciliter la navigation ; il ne correspond pas à un découpage administratif officiel de la Métropole de Lyon.",
    ],
    sections: [
      {
        eyebrow: "Lyon par arrondissement",
        title: "Les 9 arrondissements de Lyon",
        cards: [
          { label: "Lyon 1er", href: "/vtc-lyon-1er-arrondissement", body: "Terreaux, Hôtel de Ville, Croix-Rousse (pentes)." },
          { label: "Lyon 2e", href: "/vtc-lyon-2e-arrondissement", body: "Bellecour, Cordeliers, Perrache, Confluence." },
          { label: "Lyon 3e", href: "/vtc-lyon-3e-arrondissement", body: "Part-Dieu, Montchat, Halles Paul Bocuse." },
          { label: "Lyon 4e", href: "/vtc-lyon-4e-arrondissement", body: "Plateau de la Croix-Rousse, Gros Caillou." },
          { label: "Lyon 5e", href: "/vtc-lyon-5e-arrondissement", body: "Vieux Lyon, Fourvière, Point-du-Jour." },
          { label: "Lyon 6e", href: "/vtc-lyon-6e-arrondissement", body: "Brotteaux, Parc de la Tête d'Or, Cité Internationale." },
          { label: "Lyon 7e", href: "/vtc-lyon-7e-arrondissement", body: "Gerland, Guillotière, Jean Macé, Halle Tony Garnier." },
          { label: "Lyon 8e", href: "/vtc-lyon-8e-arrondissement", body: "Monplaisir, Institut Lumière, Grange-Blanche." },
          { label: "Lyon 9e", href: "/vtc-lyon-9e-arrondissement", body: "Vaise, Gorge de Loup, La Duchère." },
        ],
      },
      {
        eyebrow: "Métropole",
        title: "La métropole par grande zone",
        intro: "Un repère de navigation commercial, pas un découpage administratif officiel.",
        cards: [
          { label: "Banlieue nord", href: "/vtc-banlieue-nord-lyon", body: "Caluire-et-Cuire, Rillieux-la-Pape, Neuville-sur-Saône." },
          { label: "Banlieue ouest", href: "/vtc-banlieue-ouest-lyon", body: "Écully, Tassin-la-Demi-Lune, Dardilly, Sainte-Foy-lès-Lyon…" },
          { label: "Banlieue est", href: "/vtc-banlieue-est-lyon", body: "Villeurbanne, Bron, Vaulx-en-Velin, Saint-Priest…" },
          { label: "Banlieue sud", href: "/vtc-banlieue-sud-lyon", body: "Vénissieux, Oullins-Pierre-Bénite, Saint-Fons, Givors…" },
        ],
      },
      {
        eyebrow: "Communes",
        title: "Communes les plus demandées",
        cards: [
          { label: "Villeurbanne", href: "/vtc-villeurbanne", body: "Limitrophe de Lyon, proche de la Part-Dieu." },
          { label: "Vénissieux", href: "/vtc-venissieux", body: "Sud-est de la métropole." },
          { label: "Caluire-et-Cuire", href: "/vtc-caluire-et-cuire", body: "Nord, limitrophe de la Croix-Rousse." },
          { label: "Bron", href: "/vtc-bron", body: "Est, sur l'axe aéroport." },
          { label: "Écully", href: "/vtc-ecully", body: "Ouest, EM Lyon et Institut Paul Bocuse." },
          { label: "Oullins-Pierre-Bénite", href: "/vtc-oullins-pierre-benite", body: "Sud-ouest, proche de la Confluence." },
        ],
      },
      {
        eyebrow: "Gares et aéroport",
        title: "Gares, aéroport et grands équipements",
        cards: [
          { label: "Transfert aéroport", href: "/transfert-aeroport", body: "Aéroport Lyon-Saint Exupéry, arrivées et départs." },
          { label: "Transfert gare", href: "/transfert-gare", body: "Part-Dieu, Perrache et gare TGV Saint-Exupéry." },
          { label: "Eurexpo Lyon", href: "/vtc-eurexpo-lyon", body: "Salons et événements professionnels à Chassieu." },
          { label: "Groupama Stadium", href: "/vtc-groupama-stadium", body: "Matchs et concerts à Décines-Charpieu." },
          { label: "LDLC Arena", href: "/vtc-ldlc-arena", body: "Basket et concerts à Décines-Charpieu." },
          { label: "Centre de Congrès de Lyon", href: "/vtc-centre-congres-lyon", body: "Cité Internationale, 6e arrondissement." },
        ],
      },
      {
        eyebrow: "Longues distances",
        title: "Longues distances au départ de Lyon",
        intro: "Un devis personnalisé est établi avant toute confirmation, selon la distance réelle du trajet.",
        cards: [
          { label: "Toutes les longues distances", href: "/longues-distances", body: "Page pilier : le fonctionnement du devis longue distance." },
          { label: "Lyon – Grenoble", href: "/vtc-lyon-grenoble", body: "Trajet longue distance vers Grenoble." },
          { label: "Lyon – Genève", href: "/transfert-lyon-geneve", body: "Trajet transfrontalier vers la Suisse." },
          { label: "Lyon – Paris", href: "/transfert-lyon-paris", body: "Le trajet le plus long proposé par KDRIVE." },
        ],
      },
      {
        eyebrow: "Stations de ski",
        title: "Transferts vers les stations de ski",
        intro: "Aucune condition hivernale ni disponibilité de matériel de ski n'est garantie à l'avance.",
        cards: [
          { label: "Toutes les stations de ski", href: "/transfert-stations-ski-depuis-lyon", body: "Page pilier : organisation générale du transfert ski." },
          { label: "Courchevel", href: "/transfert-lyon-courchevel", body: "Domaine Les 3 Vallées." },
          { label: "Val Thorens", href: "/transfert-lyon-val-thorens", body: "La plus haute station d'Europe." },
          { label: "Chamonix", href: "/transfert-lyon-chamonix", body: "Au pied du mont Blanc." },
        ],
      },
    ],
    faq: [
      { q: "KDRIVE dessert-il toute la métropole de Lyon ?", a: "KDRIVE prend en charge les demandes dans l'ensemble des arrondissements et communes présentés sur cette page, au cas par cas, chaque demande étant confirmée individuellement." },
      { q: "Le classement par zone nord/ouest/est/sud est-il officiel ?", a: "Non, il s'agit d'un repère de navigation commercial destiné à faciliter le choix de votre secteur, pas d'un découpage administratif de la Métropole de Lyon." },
      { q: "Ma commune n'apparaît pas sur cette page, KDRIVE peut-il quand même m'y prendre en charge ?", a: "Contactez KDRIVE pour vérifier la faisabilité de votre trajet : de nombreuses communes de la région sont desservies au cas par cas, au-delà des pages déjà publiées." },
    ],
    editorialStatus: "readyForIndexing",
  },
  {
    slug: "vtc-banlieue-nord-lyon",
    eyebrow: "Banlieue nord",
    h1: "VTC banlieue nord de Lyon",
    title: "VTC banlieue nord de Lyon | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour la banlieue nord de Lyon : Caluire-et-Cuire, Rillieux-la-Pape, Neuville-sur-Saône et le Val de Saône.",
    heroImage: "/images/hero-lyon.jpg",
    heroLead: "KDRIVE dessert les communes du nord de la métropole lyonnaise, entre Caluire-et-Cuire et le Val de Saône.",
    presentationTitle: "Un secteur résidentiel en bord de Saône",
    presentationBody: [
      "La banlieue nord regroupe les communes situées au nord de Lyon, principalement le long de la Saône : Caluire-et-Cuire, limitrophe directe de la Croix-Rousse, Rillieux-la-Pape et Neuville-sur-Saône, plus éloignée. Ce regroupement est un repère commercial, pas un découpage administratif officiel de la Métropole de Lyon.",
      "D'autres communes du Val de Saône (Sathonay-Camp, Fontaines-sur-Saône) font partie de ce même secteur géographique ; elles ne disposent pas encore d'une page dédiée mais peuvent faire l'objet d'une demande de VTC au cas par cas.",
    ],
    sections: [
      {
        eyebrow: "Communes",
        title: "Communes du secteur nord",
        cards: [
          { label: "Caluire-et-Cuire", href: "/vtc-caluire-et-cuire", body: "Limitrophe directe du 1er et du 4e arrondissement de Lyon." },
          { label: "Rillieux-la-Pape", href: "/vtc-rillieux-la-pape", body: "Au-delà de Caluire, en surplomb du Val de Saône." },
          { label: "Neuville-sur-Saône", href: "/vtc-neuville-sur-saone", body: "À l'extrémité nord de la métropole lyonnaise." },
        ],
      },
      {
        eyebrow: "Trajets",
        title: "Rejoindre Lyon, une gare ou l'aéroport",
        cards: [
          { label: "Lyon 1er (Terreaux)", href: "/vtc-lyon-1er-arrondissement", body: "Le centre de Lyon, limitrophe de Caluire-et-Cuire." },
          { label: "Transfert gare", href: "/transfert-gare", body: "Part-Dieu, Perrache et gare TGV Saint-Exupéry." },
          { label: "Transfert aéroport", href: "/transfert-aeroport", body: "Aéroport Lyon-Saint Exupéry." },
        ],
      },
    ],
    faq: [
      { q: "KDRIVE dessert-il toutes les communes de la banlieue nord ?", a: "KDRIVE dessert les communes présentées sur cette page ; pour une commune voisine non listée (Sathonay-Camp, Fontaines-sur-Saône), contactez KDRIVE pour vérifier la faisabilité de votre trajet." },
      { q: "Le centre de Lyon est-il proche depuis la banlieue nord ?", a: "Caluire-et-Cuire est directement limitrophe de Lyon ; Rillieux-la-Pape et Neuville-sur-Saône sont plus éloignées. Aucun délai n'est garanti à l'avance." },
    ],
    editorialStatus: "needsEnrichment",
  },
  {
    slug: "vtc-banlieue-ouest-lyon",
    eyebrow: "Banlieue ouest",
    h1: "VTC banlieue ouest de Lyon",
    title: "VTC banlieue ouest de Lyon | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour la banlieue ouest de Lyon : Écully, Tassin-la-Demi-Lune, Dardilly, Limonest et les coteaux résidentiels.",
    heroImage: "/images/hero-lyon.jpg",
    heroLead: "KDRIVE dessert les communes de l'ouest lyonnais, entre coteaux résidentiels et pôles d'activité proches de l'A6.",
    presentationTitle: "Entre coteaux résidentiels et pôle d'activité de l'A6",
    presentationBody: [
      "La banlieue ouest regroupe des communes résidentielles sur les coteaux (Sainte-Foy-lès-Lyon, Francheville, Craponne, Charbonnières-les-Bains), des communes accueillant des établissements d'enseignement reconnus (Écully, Tassin-la-Demi-Lune) et des communes proches de l'échangeur autoroutier de l'A6 (Dardilly, Limonest). Ce regroupement est un repère commercial, pas un découpage administratif officiel.",
      "KDRIVE y assure des prises en charge résidentielles, professionnelles et étudiantes, chaque demande étant confirmée individuellement.",
    ],
    sections: [
      {
        eyebrow: "Communes",
        title: "Communes du secteur ouest",
        cards: [
          { label: "Écully", href: "/vtc-ecully", body: "EM Lyon Business School, Institut Paul Bocuse." },
          { label: "Tassin-la-Demi-Lune", href: "/vtc-tassin-la-demi-lune", body: "Porte d'entrée résidentielle de l'ouest lyonnais." },
          { label: "Charbonnières-les-Bains", href: "/vtc-charbonnieres-les-bains", body: "Commune résidentielle à l'histoire thermale." },
          { label: "Craponne", href: "/vtc-craponne", body: "Commune résidentielle, plus éloignée du centre." },
          { label: "Dardilly", href: "/vtc-dardilly", body: "Proche de l'échangeur autoroutier A6." },
          { label: "Limonest", href: "/vtc-limonest", body: "Pôle de bureaux Porte de Lyon." },
          { label: "Francheville", href: "/vtc-francheville", body: "Commune résidentielle des coteaux." },
          { label: "Sainte-Foy-lès-Lyon", href: "/vtc-sainte-foy-les-lyon", body: "Coteaux surplombant Lyon, limitrophe directe." },
        ],
      },
      {
        eyebrow: "Trajets",
        title: "Rejoindre Lyon, une gare ou l'aéroport",
        cards: [
          { label: "Lyon 9e (Vaise)", href: "/vtc-lyon-9e-arrondissement", body: "Arrondissement lyonnais le plus proche de l'ouest." },
          { label: "Transfert gare", href: "/transfert-gare", body: "Part-Dieu, Perrache et gare TGV Saint-Exupéry." },
          { label: "Transfert aéroport", href: "/transfert-aeroport", body: "Aéroport Lyon-Saint Exupéry." },
        ],
      },
    ],
    faq: [
      { q: "KDRIVE dessert-il toutes les communes de la banlieue ouest ?", a: "KDRIVE dessert les communes présentées sur cette page ; pour une commune voisine non listée, contactez KDRIVE pour vérifier la faisabilité de votre trajet." },
      { q: "KDRIVE dessert-il un trajet étudiant vers Écully ?", a: "Oui, un trajet vers l'EM Lyon Business School ou l'Institut Paul Bocuse est traité comme toute autre demande de VTC." },
    ],
    editorialStatus: "needsEnrichment",
  },
  {
    slug: "vtc-banlieue-est-lyon",
    eyebrow: "Banlieue est",
    h1: "VTC banlieue est de Lyon",
    title: "VTC banlieue est de Lyon | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour la banlieue est de Lyon : Villeurbanne, Bron, Vaulx-en-Velin, Saint-Priest, Meyzieu et l'axe aéroport.",
    heroImage: "/images/hero-lyon.jpg",
    heroLead: "KDRIVE dessert les communes de l'est lyonnais, sur l'axe menant à l'aéroport Lyon-Saint Exupéry.",
    presentationTitle: "L'axe est, entre Lyon et l'aéroport",
    presentationBody: [
      "La banlieue est regroupe les communes situées entre Lyon et l'aéroport Lyon-Saint Exupéry : Villeurbanne, limitrophe directe de Lyon, puis Vaulx-en-Velin, Bron, Décines-Charpieu, Meyzieu, Chassieu et Saint-Priest, plus à l'est. Plusieurs grands équipements (Groupama Stadium, LDLC Arena, Eurexpo) se trouvent dans ce secteur. Ce regroupement est un repère commercial, pas un découpage administratif officiel.",
      "KDRIVE y assure des prises en charge résidentielles, professionnelles et vers l'aéroport, chaque demande étant confirmée individuellement.",
    ],
    sections: [
      {
        eyebrow: "Communes",
        title: "Communes du secteur est",
        cards: [
          { label: "Villeurbanne", href: "/vtc-villeurbanne", body: "Limitrophe directe de Lyon, proche de la Part-Dieu." },
          { label: "Vaulx-en-Velin", href: "/vtc-vaulx-en-velin", body: "Campus universitaires, quartier du Mas du Taureau." },
          { label: "Bron", href: "/vtc-bron", body: "Sur l'axe menant à l'aéroport." },
          { label: "Décines-Charpieu", href: "/vtc-decines-charpieu", body: "Groupama Stadium et LDLC Arena." },
          { label: "Meyzieu", href: "/vtc-meyzieu", body: "Parc de loisirs du Grand Large." },
          { label: "Chassieu", href: "/vtc-chassieu", body: "Parc des expositions Eurexpo." },
          { label: "Saint-Priest", href: "/vtc-saint-priest", body: "Sud-est de la métropole, zones d'activité." },
        ],
      },
      {
        eyebrow: "Trajets",
        title: "Rejoindre Lyon, une gare ou l'aéroport",
        cards: [
          { label: "Lyon 3e (Part-Dieu)", href: "/vtc-lyon-3e-arrondissement", body: "Quartier d'affaires et gare, limitrophe de Villeurbanne." },
          { label: "Transfert aéroport", href: "/transfert-aeroport", body: "Aéroport Lyon-Saint Exupéry, à l'extrémité est du secteur." },
          { label: "Transfert gare", href: "/transfert-gare", body: "Part-Dieu, Perrache et gare TGV Saint-Exupéry." },
        ],
      },
    ],
    faq: [
      { q: "KDRIVE dessert-il toutes les communes de la banlieue est ?", a: "KDRIVE dessert les communes présentées sur cette page ; pour une commune voisine non listée, contactez KDRIVE pour vérifier la faisabilité de votre trajet." },
      { q: "L'aéroport est-il proche depuis la banlieue est ?", a: "Oui, ce secteur se situe sur l'axe menant à l'aéroport Lyon-Saint Exupéry ; aucun délai n'est garanti à l'avance." },
    ],
    editorialStatus: "needsEnrichment",
  },
  {
    slug: "vtc-banlieue-sud-lyon",
    eyebrow: "Banlieue sud",
    h1: "VTC banlieue sud de Lyon",
    title: "VTC banlieue sud de Lyon | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour la banlieue sud de Lyon : Vénissieux, Oullins-Pierre-Bénite, Saint-Fons, Feyzin, Givors et la vallée du Rhône.",
    heroImage: "/images/hero-lyon.jpg",
    heroLead: "KDRIVE dessert les communes du sud lyonnais, entre la Confluence et la vallée de la chimie.",
    presentationTitle: "De la Confluence à la vallée de la chimie",
    presentationBody: [
      "La banlieue sud regroupe les communes situées au sud de Lyon, le long du Rhône : Oullins-Pierre-Bénite et Vénissieux, proches de la Confluence, puis Saint-Fons, Feyzin et Corbas, dans le couloir industriel de la vallée de la chimie, jusqu'à Givors et Saint-Genis-Laval, plus au sud. Ce regroupement est un repère commercial, pas un découpage administratif officiel.",
      "KDRIVE y assure des prises en charge résidentielles et professionnelles, chaque demande étant confirmée individuellement.",
    ],
    sections: [
      {
        eyebrow: "Communes",
        title: "Communes du secteur sud",
        cards: [
          { label: "Vénissieux", href: "/vtc-venissieux", body: "Quartier des Minguettes, zones industrielles." },
          { label: "Oullins-Pierre-Bénite", href: "/vtc-oullins-pierre-benite", body: "Limitrophe de la Confluence, terminus métro B." },
          { label: "Saint-Genis-Laval", href: "/vtc-saint-genis-laval", body: "Commune résidentielle au sud d'Oullins." },
          { label: "Corbas", href: "/vtc-corbas", body: "Zones d'activité logistique." },
          { label: "Saint-Fons", href: "/vtc-saint-fons", body: "Vallée de la chimie." },
          { label: "Feyzin", href: "/vtc-feyzin", body: "Vallée de la chimie." },
          { label: "Givors", href: "/vtc-givors", body: "Confluent Gier-Rhône, axe vers Saint-Étienne." },
        ],
      },
      {
        eyebrow: "Trajets",
        title: "Rejoindre Lyon, une gare ou l'aéroport",
        cards: [
          { label: "Lyon 2e (Confluence)", href: "/vtc-lyon-2e-arrondissement", body: "Quartier limitrophe d'Oullins-Pierre-Bénite." },
          { label: "Transfert gare", href: "/transfert-gare", body: "Part-Dieu, Perrache et gare TGV Saint-Exupéry." },
          { label: "Lyon – Saint-Étienne", href: "/transfert-lyon-saint-etienne", body: "Prolongement de l'axe sud, via Givors." },
        ],
      },
    ],
    faq: [
      { q: "KDRIVE dessert-il toutes les communes de la banlieue sud ?", a: "KDRIVE dessert les communes présentées sur cette page ; pour une commune voisine non listée, contactez KDRIVE pour vérifier la faisabilité de votre trajet." },
      { q: "KDRIVE dessert-il un trajet vers la vallée de la chimie ?", a: "Oui, un trajet professionnel vers un site de Saint-Fons ou Feyzin est traité comme toute autre demande de VTC." },
    ],
    editorialStatus: "needsEnrichment",
  },
  {
    slug: "transfert-stations-ski-depuis-lyon",
    eyebrow: "Transferts ski",
    h1: "Transferts vers les stations de ski depuis Lyon",
    title: "Transfert stations de ski depuis Lyon | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour rejoindre les principales stations de ski des Alpes depuis Lyon, une gare ou l'aéroport, sur réservation à l'avance.",
    heroImage: "/images/hero-longues-distances.jpg",
    heroLead: "KDRIVE organise vos transferts vers les principales stations de ski des Alpes, au départ de Lyon, d'une gare ou de l'aéroport.",
    presentationTitle: "Un transfert préparé avant votre séjour à la montagne",
    presentationBody: [
      "KDRIVE organise des transferts vers les principales stations de ski des Alpes françaises depuis Lyon, une gare (dont la gare TGV Saint-Exupéry) ou l'aéroport. Chaque trajet est traité comme une longue distance, avec un tarif calculé sur la distance réelle et confirmé avant votre départ.",
      "Le transport de bagages et de matériel de ski dépend de l'espace disponible dans le véhicule choisi et doit être signalé lors de la réservation. Aucune condition de circulation hivernale n'est garantie à l'avance : les conditions réelles du jour peuvent affecter le trajet.",
    ],
    sections: [
      {
        eyebrow: "Les 3 Vallées",
        title: "Domaine Les 3 Vallées",
        cards: [
          { label: "Courchevel", href: "/transfert-lyon-courchevel", body: "Saint-Bon-Tarentaise, plusieurs altitudes." },
          { label: "Méribel", href: "/transfert-lyon-meribel", body: "Les Allues, cœur du domaine." },
          { label: "Val Thorens", href: "/transfert-lyon-val-thorens", body: "La plus haute station d'Europe." },
          { label: "Les Menuires", href: "/transfert-lyon-les-menuires", body: "Vallée des Belleville." },
        ],
      },
      {
        eyebrow: "Paradiski",
        title: "Domaine Paradiski",
        cards: [
          { label: "Les Arcs", href: "/transfert-lyon-les-arcs", body: "Bourg-Saint-Maurice, plusieurs sites d'altitude." },
          { label: "La Plagne", href: "/transfert-lyon-la-plagne", body: "Plusieurs villages d'un même domaine." },
        ],
      },
      {
        eyebrow: "Espace Killy",
        title: "Domaine Espace Killy",
        cards: [
          { label: "Tignes", href: "/transfert-lyon-tignes", body: "Tignes-le-Lac et Val Claret." },
          { label: "Val d'Isère", href: "/transfert-lyon-val-disere", body: "L'un des plus grands domaines des Alpes françaises." },
        ],
      },
      {
        eyebrow: "Oisans",
        title: "Massif de l'Oisans",
        cards: [
          { label: "Les Deux Alpes", href: "/transfert-lyon-les-deux-alpes", body: "Glacier accessible en saison." },
          { label: "Alpe d'Huez", href: "/transfert-lyon-alpe-dhuez", body: "Commune de Huez, route en lacets." },
        ],
      },
      {
        eyebrow: "Haute-Savoie",
        title: "Mont-Blanc et Haute-Savoie",
        cards: [
          { label: "Chamonix", href: "/transfert-lyon-chamonix", body: "Au pied du mont Blanc." },
          { label: "Megève", href: "/transfert-lyon-megeve", body: "Station de ski et de villégiature." },
        ],
      },
    ],
    faq: [
      { q: "KDRIVE transporte-t-il le matériel de ski ?", a: "L'espace disponible pour le matériel de ski dépend du véhicule et du nombre de passagers : signalez-le lors de la réservation, KDRIVE confirme la faisabilité avant votre départ." },
      { q: "Les conditions hivernales sont-elles garanties ?", a: "Non, aucune condition de circulation hivernale n'est garantie à l'avance ; le trajet reste soumis aux conditions réelles du jour." },
      { q: "Faut-il réserver longtemps à l'avance en période de vacances scolaires ?", a: "Oui, une réservation anticipée est fortement recommandée en haute saison, lorsque la demande est la plus forte." },
      { q: "KDRIVE dessert-il une station qui n'est pas listée sur cette page ?", a: "Contactez KDRIVE pour vérifier la faisabilité de votre trajet vers une autre station des Alpes." },
    ],
    editorialStatus: "needsEnrichment",
  },
];
