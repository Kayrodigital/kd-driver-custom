// Volet complémentaire « Questions pratiques » par page locale (questions/réponses courtes).
// Ajouté automatiquement par index.ts. Clé = slug.

export const faqLocales: Record<string, { lieu: string; qa: [string, string][] }> = {
  "vtc-lyon-1er-arrondissement": { lieu: "dans le 1er arrondissement", qa: [
    ["Pouvez-vous venir me chercher à la sortie de l'Opéra ?", "Oui. Nous convenons à l'avance d'un point de rendez-vous accessible en voiture à proximité, et votre chauffeur vous y attend à l'heure de fin du spectacle."],
    ["Mon logement est sur les Pentes, l'accès est-il possible ?", "Dans la grande majorité des cas, oui. Donnez-nous l'adresse exacte : si la rue est trop étroite ou piétonne, nous vous proposons le point d'arrêt le plus proche."],
    ["Faites-vous les trajets vers la Croix-Rousse ou le Vieux Lyon ?", "Oui, nous assurons les trajets courts dans Lyon comme les transferts vers les gares, l'aéroport et les communes de la métropole."],
  ]},
  "vtc-lyon-2e-arrondissement": { lieu: "dans le 2e arrondissement", qa: [
    ["Où me retrouvez-vous si ma rue est piétonne ?", "Nous fixons ensemble un point accessible en voiture au plus près, par exemple à l'angle d'une rue voisine. Votre chauffeur vous attend à l'heure convenue."],
    ["Pouvez-vous m'accueillir à ma descente du train à Perrache ?", "Oui. Indiquez-nous votre numéro de train : nous suivons son horaire et votre chauffeur vous attend à l'arrivée, même en cas de retard."],
    ["Desservez-vous le quartier de la Confluence ?", "Oui, tout le 2e arrondissement, de Bellecour et Ainay jusqu'à la Confluence et au musée des Confluences."],
  ]},
  "vtc-lyon-3e-arrondissement": { lieu: "dans le 3e arrondissement", qa: [
    ["De quel côté de la gare Part-Dieu me prenez-vous en charge ?", "Nous convenons du point de rendez-vous à la réservation, côté Vivier-Merle ou côté Villette, selon votre arrivée et la circulation du moment."],
    ["Intervenez-vous à Montchat et à Sans-Souci ?", "Oui, dans tous les quartiers du 3e arrondissement, y compris les secteurs résidentiels plus éloignés de la gare."],
    ["Pouvez-vous accueillir un client pour mon entreprise ?", "Oui. Nous l'accueillons à la gare ou à l'aéroport et le conduisons jusqu'à vos locaux. La facture est établie au nom de votre société."],
  ]},
  "vtc-lyon-4e-arrondissement": { lieu: "à la Croix-Rousse", qa: [
    ["Venez-vous me chercher en haut du plateau ?", "Oui, directement à votre adresse sur le plateau de la Croix-Rousse, au Gros Caillou, à Serin ou sur les quais de Saône."],
    ["Puis-je réserver un retour de soirée vers la Croix-Rousse ?", "Oui. Réservez à l'avance en indiquant l'adresse et l'heure : votre chauffeur vous attendra à la sortie du restaurant ou du spectacle."],
    ["Avez-vous des sièges enfants pour un départ en vacances ?", "Oui, sur demande. Précisez l'âge des enfants à la réservation pour que nous installions l'équipement adapté."],
  ]},
  "vtc-lyon-5e-arrondissement": { lieu: "dans le 5e arrondissement", qa: [
    ["Pouvez-vous me prendre en charge dans le Vieux Lyon ?", "Oui. Le quartier étant largement piéton, nous convenons d'un point de rendez-vous proche, par exemple sur les quais de Saône ou près de la gare Saint-Paul."],
    ["Desservez-vous Fourvière et le Point du Jour ?", "Oui, toute la colline et les quartiers résidentiels de l'ouest de l'arrondissement : Saint-Just, Point du Jour, Champvert, Ménival."],
    ["Proposez-vous une journée de visite avec chauffeur ?", "Oui, avec la mise à disposition d'un chauffeur à l'heure ou à la journée, pour organiser librement votre programme."],
  ]},
  "vtc-lyon-6e-arrondissement": { lieu: "dans le 6e arrondissement", qa: [
    ["Pouvez-vous déposer des participants au Centre de Congrès ?", "Oui. Nous assurons les transferts entre gares, aéroport, hôtels et Cité Internationale, y compris pour plusieurs participants."],
    ["Intervenez-vous autour du parc de la Tête d'Or ?", "Oui, dans tout le 6e : Brotteaux, Foch, Masséna, Bellecombe et la Cité Internationale."],
    ["Peut-on réserver plusieurs trajets pour un événement ?", "Oui. Indiquez-nous le programme : nous organisons les trajets aller et retour ou une mise à disposition sur la durée de l'événement."],
  ]},
  "vtc-lyon-7e-arrondissement": { lieu: "dans le 7e arrondissement", qa: [
    ["Où me récupérez-vous après un concert à la Halle Tony Garnier ?", "Nous convenons d'un point de rendez-vous à proximité, plus facile d'accès que l'entrée principale à la sortie du public. Votre chauffeur vous y attend."],
    ["Desservez-vous les entreprises de Gerland ?", "Oui. Indiquez le nom de l'immeuble ou de la société : votre chauffeur se présente à la bonne entrée, et la facture peut être établie au nom de l'entreprise."],
    ["Intervenez-vous à la Guillotière et à Jean-Macé ?", "Oui, dans tout le 7e arrondissement, de la Guillotière jusqu'au sud de Gerland."],
  ]},
  "vtc-lyon-8e-arrondissement": { lieu: "dans le 8e arrondissement", qa: [
    ["Pouvez-vous m'accompagner à un rendez-vous médical ?", "Oui. Nous vous déposons à l'entrée de l'établissement et pouvons prévoir votre retour si vous nous indiquez l'heure de fin estimée."],
    ["Desservez-vous Monplaisir et les États-Unis ?", "Oui, tout le 8e arrondissement : Monplaisir, Bachut, États-Unis, Mermoz, Grand Trou et Grange Blanche."],
    ["Faites-vous les trajets vers Eurexpo ?", "Oui, depuis le 8e comme depuis toute la métropole, pour les exposants comme pour les visiteurs."],
  ]},
  "vtc-lyon-9e-arrondissement": { lieu: "dans le 9e arrondissement", qa: [
    ["Venez-vous à la Duchère et à Saint-Rambert ?", "Oui, dans tout le 9e : Vaise, Gorge de Loup, l'Industrie, la Duchère, Saint-Rambert et l'Île Barbe."],
    ["Pouvez-vous transporter des collaborateurs depuis une entreprise de Vaise ?", "Oui. Nous assurons les trajets de vos équipes et de vos visiteurs, avec une facture au nom de votre société."],
    ["Desservez-vous aussi les Monts d'Or ?", "Oui, depuis le 9e nous rejoignons facilement Écully, Dardilly, Limonest et les communes des Monts d'Or."],
  ]},
  "vtc-bron": { lieu: "à Bron", qa: [
    ["Pouvez-vous me déposer aux hôpitaux de Bron ?", "Oui. Indiquez le nom de l'établissement et le bâtiment : nous vous déposons au plus près de l'entrée et pouvons prévoir le retour."],
    ["Desservez-vous le campus de la Porte des Alpes ?", "Oui, pour les étudiants, enseignants et intervenants, au départ comme à l'arrivée du campus."],
    ["Faites-vous les trajets vers Eurexpo depuis Bron ?", "Oui, Eurexpo est proche : nous assurons les trajets aller et retour pendant les salons."],
  ]},
  "vtc-venissieux": { lieu: "à Vénissieux", qa: [
    ["Intervenez-vous aux Minguettes et à Parilly ?", "Oui, dans tous les quartiers de Vénissieux, du centre-ville aux Minguettes, à Parilly et à Moulin-à-Vent."],
    ["Pouvez-vous venir sur un site industriel ?", "Oui. Précisez le nom de l'entreprise et l'accueil à utiliser pour que votre chauffeur se présente au bon endroit."],
    ["Les entreprises peuvent-elles recevoir une facture ?", "Oui, nous établissons une facture au nom de votre société pour chaque course."],
  ]},
  "vtc-saint-priest": { lieu: "à Saint-Priest", qa: [
    ["Desservez-vous Manissieux et Revaison ?", "Oui, ainsi que le centre-ville et les parcs d'activités de Saint-Priest."],
    ["L'aéroport est-il loin de Saint-Priest ?", "Saint-Priest fait partie des communes les mieux placées pour rejoindre l'aéroport Lyon-Saint-Exupéry. Nous vous communiquons le tarif du transfert avant la réservation."],
    ["Pouvez-vous accueillir un visiteur pour une entreprise du Parc technologique ?", "Oui, à l'aéroport ou à la gare, puis jusqu'à vos locaux, avec facturation au nom de la société."],
  ]},
  "vtc-chassieu": { lieu: "à Chassieu", qa: [
    ["Pouvez-vous nous conduire à Eurexpo chaque jour d'un salon ?", "Oui. Nous organisons les trajets quotidiens entre votre hôtel et Eurexpo, ou une mise à disposition pendant la durée du salon."],
    ["Où me déposez-vous à Eurexpo ?", "Nous convenons du point de dépose et de reprise selon l'organisation du salon, pour éviter les zones les plus encombrées."],
    ["Intervenez-vous aussi dans les quartiers résidentiels ?", "Oui, partout à Chassieu, pas seulement autour du parc des expositions."],
  ]},
  "vtc-decines-charpieu": { lieu: "à Décines-Charpieu", qa: [
    ["Où me retrouvez-vous après un match au Groupama Stadium ?", "Nous convenons d'un point de rendez-vous en dehors des zones fermées à la circulation. Votre chauffeur vous y attend à la fin de l'événement."],
    ["Pouvez-vous transporter un groupe de supporters ?", "Oui, en adaptant le véhicule au nombre de personnes. Précisez-le à la réservation."],
    ["Desservez-vous le Grand Large ?", "Oui, ainsi que tous les quartiers de Décines-Charpieu."],
  ]},
  "vtc-meyzieu": { lieu: "à Meyzieu", qa: [
    ["Assurez-vous les transferts vers l'aéroport très tôt le matin ?", "Oui. Réservez de préférence la veille : votre chauffeur sera devant chez vous à l'heure convenue."],
    ["Pouvez-vous venir dans la zone industrielle ?", "Oui. Indiquez le nom de l'entreprise et l'entrée à utiliser."],
    ["Faites-vous les trajets vers le stade les soirs de match ?", "Oui, aller et retour, avec un point de rendez-vous convenu à l'avance."],
  ]},
  "vtc-vaulx-en-velin": { lieu: "à Vaulx-en-Velin", qa: [
    ["Desservez-vous le Carré de Soie ?", "Oui, ainsi que le Village, le centre-ville, le Mas du Taureau et les écoles de la commune."],
    ["Pouvez-vous emmener des étudiants à la gare avec leurs bagages ?", "Oui. Précisez le nombre de valises pour que nous prévoyions le véhicule adapté."],
    ["Faites-vous les trajets vers la LDLC Arena ?", "Oui, la salle est voisine : nous assurons l'aller et le retour."],
  ]},
  "vtc-corbas": { lieu: "à Corbas", qa: [
    ["Venez-vous dans les zones logistiques ?", "Oui. Indiquez le nom de l'entreprise et le quai ou l'accueil à utiliser."],
    ["Puis-je réserver un transfert vers l'aéroport depuis Corbas ?", "Oui, porte à porte, avec suivi de votre vol pour le retour."],
    ["Les entreprises reçoivent-elles une facture ?", "Oui, chaque course peut être facturée au nom de votre société."],
  ]},
  "vtc-caluire-et-cuire": { lieu: "à Caluire-et-Cuire", qa: [
    ["Desservez-vous Saint-Clair et Cuire-le-Bas ?", "Oui, ainsi que Montessuy, Vassieux et le centre de Caluire."],
    ["Pouvez-vous m'accompagner à la gare Part-Dieu avec des bagages ?", "Oui, votre chauffeur vous aide avec vos valises et vous dépose devant le hall."],
    ["Assurez-vous les retours de soirée depuis Lyon ?", "Oui, réservez à l'avance en indiquant l'adresse et l'heure de départ."],
  ]},
  "vtc-rillieux-la-pape": { lieu: "à Rillieux-la-Pape", qa: [
    ["Venez-vous jusqu'à Vancia ?", "Oui, ainsi qu'à Rillieux-Village, dans la Ville nouvelle et à Crépieux-la-Pape."],
    ["Puis-je réserver un aller-retour pour l'aéroport ?", "Oui. Indiquez vos numéros de vol : nous suivons l'horaire pour votre retour."],
    ["Pouvez-vous me conduire à un rendez-vous à Lyon et me ramener ?", "Oui, avec un aller et un retour réservés, ou une mise à disposition si votre programme est chargé."],
  ]},
  "vtc-neuville-sur-saone": { lieu: "à Neuville-sur-Saône", qa: [
    ["Venez-vous dans les communes voisines du Val de Saône ?", "Oui, sur demande. Indiquez votre adresse complète à la réservation."],
    ["Pouvez-vous assurer un départ très matinal vers l'aéroport ?", "Oui. Réservez la veille : votre chauffeur sera devant chez vous à l'heure convenue."],
    ["Faites-vous les transferts vers les stations de ski ?", "Oui, en saison, avec un véhicule adapté à vos bagages et à votre équipement."],
  ]},
  "vtc-limonest": { lieu: "à Limonest", qa: [
    ["Pouvez-vous accueillir un client pour une entreprise de Techlid ?", "Oui, à la gare ou à l'aéroport, puis jusqu'à vos bureaux, avec une facture au nom de votre société."],
    ["Proposez-vous une mise à disposition pour une journée de rendez-vous ?", "Oui, à l'heure ou à la journée, selon votre programme."],
    ["Desservez-vous les Monts d'Or ?", "Oui, Limonest et les communes voisines des Monts d'Or."],
  ]},
  "vtc-ecully": { lieu: "à Écully", qa: [
    ["Pouvez-vous accueillir un étudiant international à l'aéroport ?", "Oui. Nous l'attendons à son arrivée, en suivant son vol, et le conduisons jusqu'à son logement ou son école."],
    ["Les écoles peuvent-elles recevoir une facture ?", "Oui, la facture est établie au nom de l'établissement ou de l'entreprise."],
    ["Desservez-vous tout Écully ?", "Oui, le centre, les quartiers résidentiels et les campus."],
  ]},
  "vtc-dardilly": { lieu: "à Dardilly", qa: [
    ["Venez-vous dans les hameaux de Dardilly ?", "Oui. Indiquez votre adresse complète pour que votre chauffeur la trouve facilement."],
    ["Desservez-vous la Porte de Lyon ?", "Oui, ainsi que le parc d'activités Techlid et le village."],
    ["Puis-je réserver pour un collègue en déplacement ?", "Oui, en indiquant son nom et son numéro. La facture peut être établie au nom de votre entreprise."],
  ]},
  "vtc-tassin-la-demi-lune": { lieu: "à Tassin-la-Demi-Lune", qa: [
    ["Pouvez-vous me conduire à la gare Perrache ?", "Oui, porte à porte, avec vos bagages."],
    ["Faites-vous les trajets pour un mariage ou une réception ?", "Oui, pour les mariés comme pour les invités, avec un aller, un retour ou une mise à disposition."],
    ["Desservez-vous tous les quartiers de Tassin ?", "Oui, le centre comme les quartiers résidentiels de la commune."],
  ]},
  "vtc-charbonnieres-les-bains": { lieu: "à Charbonnières-les-Bains", qa: [
    ["Pouvez-vous ramener des invités après une réception ?", "Oui. Indiquez le lieu et l'heure de fin prévue : nous organisons les retours de vos invités."],
    ["Desservez-vous Marcy-l'Étoile et La Tour-de-Salvagny ?", "Oui, sur demande, comme l'ensemble de l'ouest lyonnais."],
    ["Puis-je réserver un transfert vers l'aéroport ?", "Oui, porte à porte, avec suivi de votre vol."],
  ]},
  "vtc-craponne": { lieu: "à Craponne", qa: [
    ["Venez-vous jusqu'à Craponne pour un transfert aéroport ?", "Oui, directement à votre domicile, à l'heure convenue."],
    ["Avez-vous des sièges enfants ?", "Oui, sur demande. Précisez l'âge des enfants à la réservation."],
    ["Desservez-vous Grézieu-la-Varenne ?", "Oui, sur demande, comme les autres communes voisines de l'ouest lyonnais."],
  ]},
  "vtc-francheville": { lieu: "à Francheville", qa: [
    ["Intervenez-vous au Bourg et à Bel-Air ?", "Oui, dans tous les quartiers de Francheville."],
    ["Pouvez-vous m'accompagner à un rendez-vous médical à Lyon ?", "Oui, avec un aller et, si vous le souhaitez, un retour à l'heure de fin prévue."],
    ["Faites-vous les trajets vers la gare Perrache ?", "Oui, c'est l'un des trajets les plus demandés depuis Francheville."],
  ]},
  "vtc-sainte-foy-les-lyon": { lieu: "à Sainte-Foy-lès-Lyon", qa: [
    ["Venez-vous à Beaunant et à la Gravière ?", "Oui, dans tous les quartiers de Sainte-Foy-lès-Lyon."],
    ["Pouvez-vous m'accueillir à la gare Perrache ?", "Oui. Donnez-nous votre numéro de train : votre chauffeur vous attend à l'arrivée."],
    ["Assurez-vous les trajets vers le Vieux Lyon ?", "Oui, avec un point de dépose convenu au plus près, le quartier étant en grande partie piéton."],
  ]},
  "vtc-oullins-pierre-benite": { lieu: "à Oullins-Pierre-Bénite", qa: [
    ["Pouvez-vous me conduire à l'hôpital Lyon Sud ?", "Oui. Précisez le bâtiment : nous vous déposons au plus près et pouvons prévoir votre retour."],
    ["Desservez-vous la Saulaie et Pierre-Bénite ?", "Oui, l'ensemble de la commune nouvelle d'Oullins-Pierre-Bénite."],
    ["Faites-vous les transferts vers l'aéroport ?", "Oui, porte à porte, avec suivi de votre vol."],
  ]},
  "vtc-saint-genis-laval": { lieu: "à Saint-Genis-Laval", qa: [
    ["Venez-vous dans le quartier des Barolles ?", "Oui, ainsi que dans le centre et l'ensemble des quartiers de la commune."],
    ["Pourquoi un chauffeur plutôt que le métro ?", "Avec des valises, des enfants ou à des horaires décalés, un trajet direct porte à porte reste plus simple et plus confortable."],
    ["Pouvez-vous me conduire à la gare Part-Dieu ?", "Oui, directement, avec vos bagages."],
  ]},
  "vtc-saint-fons": { lieu: "à Saint-Fons", qa: [
    ["Pouvez-vous accueillir un auditeur pour un site de la vallée de la chimie ?", "Oui, à la gare ou à l'aéroport, puis jusqu'au site, avec une facture au nom de l'entreprise."],
    ["Intervenez-vous dans les quartiers résidentiels ?", "Oui, partout à Saint-Fons."],
    ["Faites-vous les trajets vers Perrache ?", "Oui, porte à porte, au départ comme à l'arrivée de votre train."],
  ]},
  "vtc-feyzin": { lieu: "à Feyzin", qa: [
    ["Venez-vous sur les sites industriels ?", "Oui. Indiquez le nom de l'entreprise et l'accueil à utiliser."],
    ["Assurez-vous des trajets vers d'autres villes ?", "Oui, nous effectuons des trajets longue distance au départ de Feyzin. Le tarif est annoncé avant la réservation."],
    ["Pouvez-vous me conduire à l'aéroport ?", "Oui, porte à porte, avec suivi de votre vol."],
  ]},
  "vtc-givors": { lieu: "à Givors", qa: [
    ["Venez-vous jusqu'à Givors pour un transfert aéroport ?", "Oui, directement à votre domicile. Réservez à l'avance pour un départ matinal."],
    ["Desservez-vous Grigny et les communes voisines ?", "Oui, sur demande, comme l'ensemble du sud lyonnais."],
    ["Pouvez-vous me récupérer à la gare Part-Dieu pour rentrer à Givors ?", "Oui. Donnez-nous votre numéro de train : votre chauffeur vous attend à l'arrivée."],
  ]},
};
