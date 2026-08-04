/**
 * Motifs de refus fermés (Parcours C). Le message client est toujours généré
 * à partir d'un motif de cette liste, jamais rédigé librement, pour éviter
 * qu'une formulation inappropriée soit envoyée par erreur (exigence
 * explicite du client — cf. docs/DISPATCH_IMPLEMENTATION_PLAN.md section 17).
 */
export const DECLINE_REASON_CODES = [
  "no_driver_available",
  "schedule_impossible",
  "zone_not_covered",
  "incomplete_request",
  "other",
] as const;

export type DeclineReasonCode = (typeof DECLINE_REASON_CODES)[number];

const REASON_LABELS: Record<DeclineReasonCode, string> = {
  no_driver_available: "Aucun chauffeur disponible",
  schedule_impossible: "Horaire impossible à honorer",
  zone_not_covered: "Zone non desservie",
  incomplete_request: "Demande incomplète",
  other: "Autre motif",
};

const CLIENT_MESSAGE_BY_REASON: Record<DeclineReasonCode, string> = {
  no_driver_available: "nous n’avons malheureusement aucun chauffeur disponible pour ce créneau",
  schedule_impossible: "l’horaire demandé ne peut malheureusement pas être honoré",
  zone_not_covered: "ce trajet se situe en dehors de notre zone de desserte actuelle",
  incomplete_request: "il nous manque des informations pour confirmer cette demande",
  other: "nous ne sommes malheureusement pas en mesure de donner suite à cette demande",
};

export function isDeclineReasonCode(value: string): value is DeclineReasonCode {
  return (DECLINE_REASON_CODES as readonly string[]).includes(value);
}

export function declineReasonLabel(code: DeclineReasonCode): string {
  return REASON_LABELS[code];
}

export type DeclineMessageInput = {
  publicReference: string;
};

export function buildDeclineClientMessage(reasonCode: DeclineReasonCode, reservation: DeclineMessageInput): string {
  return `Bonjour, concernant votre demande KDRIVE ${reservation.publicReference} : ${CLIENT_MESSAGE_BY_REASON[reasonCode]}. N’hésitez pas à nous recontacter pour une autre date ou un autre trajet.`;
}
