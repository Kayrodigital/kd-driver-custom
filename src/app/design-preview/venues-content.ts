import type { LocalPageContent } from "./local-page-template";
import { popularDestinations } from "@/domain/booking/popular-destinations";

/**
 * Grands lieux générateurs de déplacements. Adresses vérifiées par
 * recherche web le 2026-09-10 (Centre de Congrès de Lyon, LDLC Arena, Halle
 * Tony Garnier) ou déjà validées dans popular-destinations.ts (Eurexpo,
 * Groupama Stadium). Aucun accès privilégié, aucune dépose garantie au pied
 * de l'entrée, aucune consigne contraire aux dispositifs de circulation
 * temporaires n'est affirmée.
 *
 * Les deux dernières entrées (visite de Lyon, excursion Beaujolais) sont des
 * brouillons non indexables (`editorialStatus: "draftNoIndex"`, `noIndex:
 * true`) : la prestation n'est pas confirmée commercialement par KDRIVE à ce
 * stade. Ne pas retirer `noIndex` sans confirmation commerciale explicite.
 */

const eurexpoAddress = popularDestinations.find((d) => d.label === "Eurexpo Lyon")!.address;
const groupamaAddress = popularDestinations.find((d) => d.label === "Groupama Stadium")!.address;

const venuesPillarLinks: LocalPageContent["pillarLinks"] = [
  { href: "/chauffeur-entreprise", label: "Chauffeur entreprise" },
  { href: "/mise-a-disposition", label: "Mise à disposition" },
  { href: "/vehicules", label: "Nos véhicules" },
  { href: "/tarifs", label: "Grille tarifaire" },
  { href: "/reserver", label: "Réserver un trajet" },
];

export const venuesPages: LocalPageContent[] = [
  {
    slug: "vtc-eurexpo-lyon",
    family: "venue",
    editorialStatus: "needsEnrichment",
    title: "VTC Eurexpo Lyon | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour rejoindre Eurexpo Lyon (Chassieu) : trajets pour salons, congrès et événements professionnels.",
    eyebrow: "VTC Eurexpo",
    h1: "Chauffeur VTC pour Eurexpo Lyon",
    breadcrumbParent: { label: "Zones desservies", href: "/zones-desservies" },
    heroImage: "/images/service-affaires.jpg",
    prefillAddress: eurexpoAddress,
    prefillLabel: "Eurexpo",
    heroLead: "KDRIVE organise vos trajets vers Eurexpo Lyon, parc des expositions situé à Chassieu, pour un salon ou un événement professionnel.",
    presentationTitle: "Un transfert coordonné avec vos horaires de salon",
    presentationBody: [
      "Eurexpo Lyon, situé sur la commune de Chassieu, est le principal parc des expositions de la métropole lyonnaise. KDRIVE n'a pas d'accès privilégié au site et ne garantit pas de dépose au pied d'une entrée précise : le point de rendez-vous est confirmé selon les dispositifs de circulation en vigueur le jour du salon.",
      "Une réservation anticipée est recommandée lors des salons à forte affluence, lorsque les accès et les zones de dépose peuvent être temporairement modifiés.",
    ],
    casUsageTitle: "Motifs de déplacement courants",
    casUsageItems: [
      "Trajet vers un salon professionnel ou grand public à Eurexpo.",
      "Transfert de délégation ou de visiteurs depuis un hôtel lyonnais.",
      "Trajet retour vers une gare ou l'aéroport après un salon.",
    ],
    frequentTrips: [
      { title: "Eurexpo → Aéroport Lyon-Saint Exupéry", body: "Transfert vers l'aéroport après un salon.", href: "/transfert-aeroport" },
      { title: "Eurexpo → Gare Part-Dieu", body: "Transfert vers la gare de la Part-Dieu.", href: "/vtc-lyon-part-dieu" },
      { title: "Eurexpo → Chassieu", body: "La commune de Chassieu accueille Eurexpo.", href: "/vtc-chassieu" },
    ],
    faq: [
      { q: "KDRIVE dépose-t-il au pied de l'entrée d'Eurexpo ?", a: "Le point de dépose exact dépend des dispositifs de circulation en vigueur le jour du salon ; aucune dépose précise n'est garantie à l'avance." },
      { q: "Faut-il réserver à l'avance lors d'un grand salon ?", a: "Oui, une réservation anticipée est recommandée lors des salons à forte affluence." },
      { q: "KDRIVE peut-il prendre en charge un groupe ou une délégation ?", a: "Oui, indiquez le nombre de passagers lors de la réservation ; la catégorie Van est recommandée pour les groupes." },
    ],
    neighborLinksTitle: "Autour d'Eurexpo",
    neighborLinks: [
      { href: "/vtc-chassieu", label: "VTC Chassieu" },
      { href: "/vtc-banlieue-est-lyon", label: "Banlieue est de Lyon" },
    ],
    pillarLinksTitle: "Poursuivre votre réservation",
    pillarLinks: venuesPillarLinks,
    sources: ["Eurexpo Lyon, commune de Chassieu — adresse déjà vérifiée dans popular-destinations.ts (Google Places, 2026-08-01)."],
  },
  {
    slug: "vtc-groupama-stadium",
    family: "venue",
    editorialStatus: "needsEnrichment",
    title: "VTC Groupama Stadium | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour rejoindre le Groupama Stadium (Décines-Charpieu) : trajets pour matchs et concerts.",
    eyebrow: "VTC Groupama Stadium",
    h1: "Chauffeur VTC pour le Groupama Stadium",
    breadcrumbParent: { label: "Zones desservies", href: "/zones-desservies" },
    heroImage: "/images/service-affaires.jpg",
    prefillAddress: groupamaAddress,
    prefillLabel: "le Groupama Stadium",
    heroLead: "KDRIVE organise vos trajets vers le Groupama Stadium, à Décines-Charpieu, pour un match ou un concert.",
    presentationTitle: "Un transfert adapté aux soirs d'affluence",
    presentationBody: [
      "Le Groupama Stadium, situé à Décines-Charpieu, accueille des matchs de football et des concerts. Les soirs d'événement, la circulation et les zones de dépose sont soumises à des dispositifs temporaires : KDRIVE ne garantit pas de dépose au pied d'une entrée précise.",
      "Une réservation anticipée est recommandée, en particulier pour le trajet retour après un événement, lorsque la demande est la plus forte.",
    ],
    casUsageTitle: "Motifs de déplacement courants",
    casUsageItems: [
      "Trajet vers un match au Groupama Stadium.",
      "Trajet vers un concert ou un événement au stade.",
      "Trajet retour vers Lyon ou une autre commune après l'événement.",
    ],
    frequentTrips: [
      { title: "Groupama Stadium → Lyon centre", body: "Trajet retour vers le centre de Lyon après un événement." },
      { title: "Groupama Stadium → Aéroport Lyon-Saint Exupéry", body: "Transfert vers l'aéroport.", href: "/transfert-aeroport" },
      { title: "Groupama Stadium → Décines-Charpieu", body: "La commune qui accueille le stade et la LDLC Arena.", href: "/vtc-decines-charpieu" },
    ],
    faq: [
      { q: "KDRIVE dépose-t-il au pied du Groupama Stadium ?", a: "Le point de dépose exact dépend des dispositifs de circulation en vigueur le soir de l'événement ; aucune dépose précise n'est garantie à l'avance." },
      { q: "Une disponibilité est-elle garantie juste après un match ?", a: "Non, aucune disponibilité immédiate n'est garantie les soirs d'affluence : une réservation anticipée est recommandée, notamment pour le trajet retour." },
      { q: "KDRIVE dessert-il aussi la LDLC Arena, à proximité ?", a: "Oui, la LDLC Arena bénéficie d'une page dédiée avec les mêmes précautions concernant les soirs d'événement." },
    ],
    neighborLinksTitle: "Autour du Groupama Stadium",
    neighborLinks: [
      { href: "/vtc-ldlc-arena", label: "VTC LDLC Arena" },
      { href: "/vtc-decines-charpieu", label: "VTC Décines-Charpieu" },
    ],
    pillarLinksTitle: "Poursuivre votre réservation",
    pillarLinks: venuesPillarLinks,
    sources: ["Groupama Stadium, Décines-Charpieu — adresse déjà vérifiée dans popular-destinations.ts (Google Places, 2026-08-01)."],
  },
  {
    slug: "vtc-ldlc-arena",
    family: "venue",
    editorialStatus: "needsEnrichment",
    title: "VTC LDLC Arena | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour rejoindre la LDLC Arena (Décines-Charpieu) : trajets pour matchs de basket et concerts.",
    eyebrow: "VTC LDLC Arena",
    h1: "Chauffeur VTC pour la LDLC Arena",
    breadcrumbParent: { label: "Zones desservies", href: "/zones-desservies" },
    heroImage: "/images/service-affaires.jpg",
    heroLead: "KDRIVE organise vos trajets vers la LDLC Arena, à Décines-Charpieu, pour un match de basket ou un concert.",
    presentationTitle: "Une salle récente au sein de l'OL Vallée",
    presentationBody: [
      "La LDLC Arena, ouverte en 2023 à Décines-Charpieu, accueille notamment les matchs de basket de l'ASVEL ainsi que des concerts, à proximité immédiate du Groupama Stadium. KDRIVE ne garantit pas de dépose au pied d'une entrée précise, selon les dispositifs de circulation en vigueur le jour de l'événement.",
      "Une réservation anticipée est recommandée, en particulier pour le trajet retour après un événement.",
    ],
    casUsageTitle: "Motifs de déplacement courants",
    casUsageItems: [
      "Trajet vers un match de basket à la LDLC Arena.",
      "Trajet vers un concert à la LDLC Arena.",
      "Trajet retour vers Lyon ou une autre commune après l'événement.",
    ],
    frequentTrips: [
      { title: "LDLC Arena → Lyon centre", body: "Trajet retour vers le centre de Lyon après un événement." },
      { title: "LDLC Arena → Aéroport Lyon-Saint Exupéry", body: "Transfert vers l'aéroport.", href: "/transfert-aeroport" },
      { title: "LDLC Arena → Groupama Stadium", body: "Les deux équipements sont voisins, au sein de l'OL Vallée.", href: "/vtc-groupama-stadium" },
    ],
    faq: [
      { q: "KDRIVE dépose-t-il au pied de la LDLC Arena ?", a: "Le point de dépose exact dépend des dispositifs de circulation en vigueur le soir de l'événement ; aucune dépose précise n'est garantie à l'avance." },
      { q: "Peut-on compter sur un chauffeur disponible tout de suite après un match de basket ?", a: "Non, la sortie d'un événement à forte affluence ne garantit pas une disponibilité immédiate ; réservez votre trajet retour à l'avance." },
      { q: "La LDLC Arena est-elle proche du Groupama Stadium ?", a: "Oui, les deux équipements sont voisins, au sein du même secteur (OL Vallée) à Décines-Charpieu." },
    ],
    neighborLinksTitle: "Autour de la LDLC Arena",
    neighborLinks: [
      { href: "/vtc-groupama-stadium", label: "VTC Groupama Stadium" },
      { href: "/vtc-decines-charpieu", label: "VTC Décines-Charpieu" },
    ],
    pillarLinksTitle: "Poursuivre votre réservation",
    pillarLinks: venuesPillarLinks,
    sources: ["LDLC Arena, 5 avenue Simone Veil, Décines-Charpieu, ouverte en novembre 2023, ASVEL Basket (EuroLeague) — vérifié par recherche web le 2026-09-10."],
  },
  {
    slug: "vtc-centre-congres-lyon",
    family: "venue",
    editorialStatus: "needsEnrichment",
    title: "VTC Centre de Congrès de Lyon | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour rejoindre le Centre de Congrès de Lyon (Cité Internationale, 6e arrondissement) : trajets professionnels.",
    eyebrow: "VTC Centre de Congrès",
    h1: "Chauffeur VTC pour le Centre de Congrès de Lyon",
    breadcrumbParent: { label: "Zones desservies", href: "/zones-desservies" },
    heroImage: "/images/service-affaires.jpg",
    heroLead: "KDRIVE organise vos trajets vers le Centre de Congrès de Lyon, au sein de la Cité Internationale, dans le 6e arrondissement.",
    presentationTitle: "Un transfert professionnel adapté à vos horaires de congrès",
    presentationBody: [
      "Le Centre de Congrès de Lyon se situe au sein de la Cité Internationale, dans le 6e arrondissement, en bordure du Parc de la Tête d'Or. KDRIVE y organise des prises en charge pour des rendez-vous professionnels, des congrès ou des délégations.",
      "Le point de rendez-vous précis est confirmé selon les dispositifs d'accès en vigueur le jour de l'événement.",
    ],
    casUsageTitle: "Motifs de déplacement courants",
    casUsageItems: [
      "Trajet vers un congrès ou un salon professionnel.",
      "Transfert de délégation depuis un hôtel lyonnais.",
      "Trajet retour vers une gare ou l'aéroport après un événement.",
    ],
    frequentTrips: [
      { title: "Centre de Congrès → Gare Part-Dieu", body: "Trajet vers la gare de la Part-Dieu.", href: "/vtc-lyon-part-dieu" },
      { title: "Centre de Congrès → Aéroport Lyon-Saint Exupéry", body: "Transfert vers l'aéroport.", href: "/transfert-aeroport" },
      { title: "Centre de Congrès → 6e arrondissement", body: "Le Centre de Congrès se situe dans le 6e arrondissement de Lyon.", href: "/vtc-lyon-6e-arrondissement" },
    ],
    faq: [
      { q: "KDRIVE dépose-t-il au pied du Centre de Congrès ?", a: "Le point de dépose exact dépend des dispositifs d'accès en vigueur le jour de l'événement ; aucune dépose précise n'est garantie à l'avance." },
      { q: "KDRIVE peut-il prendre en charge une délégation ?", a: "Oui, indiquez le nombre de passagers lors de la réservation ; la catégorie Van est recommandée pour les groupes." },
      { q: "Quel véhicule pour un rendez-vous professionnel au Centre de Congrès ?", a: "La catégorie Premium est recommandée pour ce type de rendez-vous." },
    ],
    neighborLinksTitle: "Autour du Centre de Congrès",
    neighborLinks: [
      { href: "/vtc-lyon-6e-arrondissement", label: "Lyon 6e (Brotteaux)" },
      { href: "/chauffeur-entreprise", label: "Chauffeur entreprise" },
    ],
    pillarLinksTitle: "Poursuivre votre réservation",
    pillarLinks: venuesPillarLinks,
    sources: ["Centre de Congrès de Lyon, 50 quai Charles de Gaulle, Cité Internationale, 69006 Lyon — vérifié par recherche web le 2026-09-10."],
  },
  {
    slug: "vtc-halle-tony-garnier",
    family: "venue",
    editorialStatus: "needsEnrichment",
    title: "VTC Halle Tony Garnier | Chauffeur privé | KDRIVE",
    metaDescription: "Chauffeur privé pour rejoindre la Halle Tony Garnier (Lyon 7e, Gerland) : trajets pour concerts et spectacles.",
    eyebrow: "VTC Halle Tony Garnier",
    h1: "Chauffeur VTC pour la Halle Tony Garnier",
    breadcrumbParent: { label: "Zones desservies", href: "/zones-desservies" },
    heroImage: "/images/service-affaires.jpg",
    heroLead: "KDRIVE organise vos trajets vers la Halle Tony Garnier, dans le quartier de Gerland (Lyon 7e), pour un concert ou un spectacle.",
    presentationTitle: "Un transfert de soirée adapté aux horaires de spectacle",
    presentationBody: [
      "La Halle Tony Garnier, grande salle de concerts et de spectacles, se situe dans le quartier de Gerland, dans le 7e arrondissement de Lyon. KDRIVE ne garantit pas de dépose au pied d'une entrée précise, selon les dispositifs de circulation en vigueur le soir de l'événement.",
      "Une réservation anticipée est recommandée, en particulier pour le trajet retour après un concert.",
    ],
    casUsageTitle: "Motifs de déplacement courants",
    casUsageItems: [
      "Trajet vers un concert ou un spectacle à la Halle Tony Garnier.",
      "Trajet retour vers Lyon ou une autre commune après l'événement.",
    ],
    frequentTrips: [
      { title: "Halle Tony Garnier → Gare Perrache", body: "Trajet vers la gare de Perrache, à proximité.", href: "/vtc-lyon-perrache" },
      { title: "Halle Tony Garnier → Aéroport Lyon-Saint Exupéry", body: "Transfert vers l'aéroport après un événement.", href: "/transfert-aeroport" },
      { title: "Halle Tony Garnier → 7e arrondissement", body: "La Halle Tony Garnier se situe dans le 7e arrondissement, quartier de Gerland.", href: "/vtc-lyon-7e-arrondissement" },
    ],
    faq: [
      { q: "KDRIVE dépose-t-il au pied de la Halle Tony Garnier ?", a: "Le point de dépose exact dépend des dispositifs de circulation en vigueur le soir de l'événement ; aucune dépose précise n'est garantie à l'avance." },
      { q: "Une disponibilité est-elle garantie juste après un concert ?", a: "Non, aucune disponibilité immédiate n'est garantie les soirs d'affluence : une réservation anticipée est recommandée, notamment pour le trajet retour." },
      { q: "KDRIVE dessert-il un groupe pour un concert ?", a: "Oui, indiquez le nombre de passagers lors de la réservation ; la catégorie Van est recommandée pour les groupes." },
    ],
    neighborLinksTitle: "Autour de la Halle Tony Garnier",
    neighborLinks: [
      { href: "/vtc-lyon-7e-arrondissement", label: "Lyon 7e (Gerland)" },
      { href: "/vtc-lyon-perrache", label: "VTC Gare Lyon Perrache" },
    ],
    pillarLinksTitle: "Poursuivre votre réservation",
    pillarLinks: venuesPillarLinks,
    sources: ["Halle Tony Garnier, 20 place Docteurs Charles et Christophe Mérieux, 69007 Lyon — vérifié par recherche web le 2026-09-10."],
  },
  // --- Brouillons non indexables : prestation non encore confirmée commercialement ---
  {
    slug: "chauffeur-prive-visite-lyon",
    family: "venue",
    editorialStatus: "draftNoIndex",
    noIndex: true,
    title: "Chauffeur privé pour visiter Lyon | KDRIVE",
    metaDescription: "Brouillon non publié : chauffeur privé pour une visite de Lyon — prestation en cours de confirmation commerciale.",
    eyebrow: "Brouillon — non publié",
    h1: "Chauffeur privé pour visiter Lyon (brouillon)",
    heroImage: "/images/about-lyon.jpg",
    heroLead: "Cette page est un brouillon interne : la prestation de visite guidée avec chauffeur n'est pas encore confirmée commercialement par KDRIVE.",
    presentationTitle: "Page en attente de confirmation commerciale",
    presentationBody: [
      "Cette page décrit une prestation potentielle de découverte de Lyon avec chauffeur privé (Vieux Lyon, Fourvière, Presqu'île, Croix-Rousse). Elle reste volontairement non indexable tant que KDRIVE n'a pas confirmé le contenu réel de cette offre (durée, déroulé, disponibilité).",
      "Ne pas publier ni indexer cette page sans confirmation commerciale explicite : aucun tarif, durée ou déroulé n'est validé à ce stade.",
    ],
    frequentTrips: [
      { title: "Vieux Lyon et Fourvière", body: "Secteur historique pouvant faire l'objet d'un parcours, sous réserve de confirmation de l'offre." },
      { title: "Presqu'île et Croix-Rousse", body: "Autre secteur potentiel, sous réserve de confirmation de l'offre." },
    ],
    faq: [
      { q: "Cette prestation est-elle disponible ?", a: "Non, cette page est un brouillon interne : la prestation n'est pas encore confirmée commercialement par KDRIVE." },
    ],
    pillarLinksTitle: "Services confirmés",
    pillarLinks: [
      { href: "/mise-a-disposition", label: "Mise à disposition" },
      { href: "/chauffeur-entreprise", label: "Chauffeur entreprise" },
    ],
    sources: ["Aucune prestation de visite guidée confirmée par KDRIVE à ce jour — page volontairement en draftNoIndex, cf. brief section 9."],
  },
  {
    slug: "excursion-beaujolais-chauffeur",
    family: "venue",
    editorialStatus: "draftNoIndex",
    noIndex: true,
    title: "Excursion avec chauffeur dans le Beaujolais | KDRIVE",
    metaDescription: "Brouillon non publié : excursion avec chauffeur dans le Beaujolais — prestation en cours de confirmation commerciale.",
    eyebrow: "Brouillon — non publié",
    h1: "Excursion avec chauffeur dans le Beaujolais (brouillon)",
    heroImage: "/images/hero-longues-distances.jpg",
    heroLead: "Cette page est un brouillon interne : la prestation d'excursion dans le Beaujolais n'est pas encore confirmée commercialement par KDRIVE.",
    presentationTitle: "Page en attente de confirmation commerciale",
    presentationBody: [
      "Cette page décrit une prestation potentielle d'excursion à la journée ou à la demi-journée dans le vignoble du Beaujolais, au nord de Lyon. Elle reste volontairement non indexable tant que KDRIVE n'a pas confirmé le contenu réel de cette offre (durée, déroulé, partenaires éventuels, disponibilité).",
      "Ne pas publier ni indexer cette page sans confirmation commerciale explicite : aucun tarif, durée, itinéraire ou partenariat avec un domaine viticole n'est validé à ce stade.",
    ],
    frequentTrips: [
      { title: "Lyon → Beaujolais", body: "Trajet potentiel vers le vignoble du Beaujolais, sous réserve de confirmation de l'offre." },
    ],
    faq: [
      { q: "Cette prestation est-elle disponible ?", a: "Non, cette page est un brouillon interne : la prestation n'est pas encore confirmée commercialement par KDRIVE." },
    ],
    pillarLinksTitle: "Services confirmés",
    pillarLinks: [
      { href: "/mise-a-disposition", label: "Mise à disposition" },
      { href: "/longues-distances", label: "Longues distances" },
    ],
    sources: ["Aucune prestation d'excursion Beaujolais confirmée par KDRIVE à ce jour — page volontairement en draftNoIndex, cf. brief section 9."],
  },
];
