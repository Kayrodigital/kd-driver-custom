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
  estimatedPriceCents: number | null;
};

/**
 * booking_received : demande reçue, tarif encore *estimé*, aucun chauffeur
 * annoncé comme confirmé. Ne jamais laisser croire que la course est
 * confirmée à ce stade.
 */
export function buildBookingReceivedMessage(input: BookingReceivedInput): string {
  const priceLabel = input.estimatedPriceCents !== null ? `Tarif estimé : ${formatEuros(input.estimatedPriceCents)}.` : "Tarif sur devis, à confirmer par notre équipe.";
  return (
    `Bonjour, votre demande KDRIVE ${input.publicReference} a bien été reçue : ` +
    `${input.pickupAddress} → ${input.destinationAddress}, le ${formatPickupAt(input.pickupAt)}. ` +
    `${priceLabel} Un chauffeur vous sera confirmé avant votre course.`
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
