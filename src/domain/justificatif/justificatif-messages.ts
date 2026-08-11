import { formatDateTimeParis } from "@/lib/format-date";
import { formatEuros } from "@/domain/pricing/money";

function formatPickupAt(iso: string): string {
  return formatDateTimeParis(iso, { dateStyle: "long", timeStyle: "short" });
}

export type BookingReceivedInput = {
  publicReference: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupAt: string;
};

/**
 * booking_received : demande reçue, aucun tarif ni chauffeur annoncé comme
 * confirmé — le nouveau parcours ne calcule plus de prix côté public
 * (sprint "nouveau parcours sans prix") : KDRIVE communique le tarif par
 * téléphone après étude du trajet dans son calculateur interne.
 */
export function buildBookingReceivedMessage(input: BookingReceivedInput): string {
  return (
    `Bonjour, votre demande KDRIVE ${input.publicReference} a bien été reçue : ` +
    `${input.pickupAddress} → ${input.destinationAddress}, le ${formatPickupAt(input.pickupAt)}. ` +
    `KDRIVE étudie votre trajet et vous contacte par téléphone pour vous communiquer le tarif avant confirmation.`
  );
}

export type BookingConfirmedInput = {
  publicReference: string;
  pickupAt: string;
  confirmedPriceCents: number;
  justificatifUrl: string;
};

/**
 * booking_confirmed : tarif confirmé, chauffeur affecté. Le message inclut
 * le lien vers le justificatif — jamais les coordonnées complètes du
 * chauffeur en clair ici (elles sont dans le justificatif lui-même).
 */
export function buildBookingConfirmedMessage(input: BookingConfirmedInput): string {
  return (
    `Bonjour, votre course KDRIVE ${input.publicReference} est confirmée pour le ${formatPickupAt(input.pickupAt)}. ` +
    `Tarif confirmé : ${formatEuros(input.confirmedPriceCents)}. ` +
    `Votre justificatif de réservation : ${input.justificatifUrl}`
  );
}
