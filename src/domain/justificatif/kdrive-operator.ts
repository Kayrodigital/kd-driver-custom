/**
 * Informations fixes de l'exploitant, requises sur tout justificatif de
 * réservation préalable VTC. Valeurs communiquées par le client — jamais
 * dupliquées ailleurs dans le code, toujours importées d'ici.
 */
export const KDRIVE_OPERATOR = {
  exploitantName: "Karamba DIABY",
  commercialName: "KDRIVE",
  address: "4 rue d’Aguesseau, 69007 Lyon",
  siren: "852 641 000",
  vtcRegistryNumber: "EVTC069240679",
  professionalCardNumber: "06924023501",
  phone: "06 88 86 34 19",
  email: "contact@kdrive-vtc-lyon.fr",
} as const;

export const JUSTIFICATIF_LEGAL_REFERENCE = {
  articleLabel: "Article R. 3120-2 du Code des transports",
  decreeLabel:
    "Arrêté du 6 août 2025 relatif au justificatif de la réservation préalable applicable aux voitures de transport avec chauffeur.",
} as const;
