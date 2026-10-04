// Types et volet "Réservation" partagé pour les contenus « En savoir plus ».
// Adapter l'import du type si KdLearnMoreAccordion exporte déjà le sien.

export type LearnMoreLink = { label: string; href: string };
export type LearnMoreItem = { title: string; paragraphs: string[]; links?: LearnMoreLink[] };
export type LearnMorePage = { title: string; items: LearnMoreItem[] };

// Services confirmés par le client : facturation entreprise, sièges enfants sur demande,
// suivi des vols et des trains. Aucun prix ni temps de trajet n'est mentionné.

const variants = [
  (lieu: string, detail: string) => [
    `Pour réserver votre chauffeur ${lieu}, appelez-nous ou utilisez le formulaire en indiquant l'adresse de départ, la destination, la date, l'heure et le nombre de passagers. ${detail}`,
    "Le tarif vous est communiqué avant toute confirmation, et chaque réservation est validée par une personne de notre équipe. Pour un vol ou un train, donnez-nous votre numéro : nous le suivons et votre chauffeur s'adapte en cas de retard. Sièges enfants sur demande, facturation possible au nom de votre entreprise.",
  ],
  (lieu: string, detail: string) => [
    `Réserver un chauffeur ${lieu} prend quelques minutes : un appel ou un message via le formulaire suffit. Précisez l'adresse de prise en charge, la destination, l'horaire et le nombre de bagages. ${detail}`,
    "Vous connaissez le prix avant de confirmer, et un membre de l'équipe valide personnellement votre course. Nous suivons les horaires des vols et des trains pour ajuster l'heure de prise en charge. Sièges enfants disponibles sur demande ; les entreprises peuvent recevoir une facture à leur nom.",
  ],
  (lieu: string, detail: string) => [
    `Pour un trajet ${lieu}, le plus simple est de nous contacter par téléphone ou par le formulaire de réservation. Indiquez-nous votre point de départ, votre destination, la date et l'heure souhaitées. ${detail}`,
    "Le tarif est annoncé à l'avance et la réservation est confirmée par une vraie personne, pas par un automate. En cas de vol ou de train retardé, nous suivons l'horaire réel. Nous installons des sièges enfants sur demande et établissons des factures pour les professionnels.",
  ],
  (lieu: string, detail: string) => [
    `La réservation d'un chauffeur ${lieu} se fait à l'avance, par téléphone ou via notre formulaire. Donnez-nous l'adresse exacte, la destination, l'horaire, le nombre de passagers et de valises. ${detail}`,
    "Le prix est fixé avec vous avant la course et chaque demande est confirmée par notre équipe. Pour un départ ou une arrivée en avion ou en train, nous suivons votre horaire et adaptons la prise en charge. Sièges enfants sur demande, facture entreprise disponible.",
  ],
];

export function reservationItem(lieu: string, detail: string, variant: number): LearnMoreItem {
  return {
    title: "Réserver votre chauffeur",
    paragraphs: variants[variant % variants.length](lieu, detail),
    links: [
      { label: "Nos tarifs", href: "/tarifs" },
      { label: "Nous contacter", href: "/contact" },
    ],
  };
}
