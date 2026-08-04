import { formatEuros } from "@/domain/pricing/money";
import type { OwnerDriverProfile } from "./owner-driver-profile";

/**
 * Sous-ensemble des champs d'une réservation nécessaires à la génération
 * des documents (Parcours A : le propriétaire réalise lui-même la course,
 * pas de commission ni de net chauffeur — ces champs n'existent que pour
 * le Parcours B, hors périmètre ici).
 */
export type ReservationForDocuments = {
  publicReference: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupAt: string;
  vehicleLabel: string | null;
  confirmedPriceCents: number | null;
  customerName: string | null;
  customerPhone: string | null;
  notes: string | null;
  priceAdjustmentReason: string | null;
};

export type ClientVoucher = {
  reference: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupAtLabel: string;
  vehicleLabel: string;
  priceLabel: string;
  driverName: string | null;
  driverVehicle: string | null;
  driverPhone: string | null;
};

export type InternalDispatchSheet = ClientVoucher & {
  customerName: string;
  customerPhone: string;
  notes: string | null;
  priceAdjustmentReason: string | null;
};

function formatPickupAt(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(new Date(iso));
}

function priceLabelFor(cents: number | null): string {
  return cents !== null ? formatEuros(cents) : "Tarif à confirmer";
}

export function generateClientVoucher(reservation: ReservationForDocuments, ownerProfile: OwnerDriverProfile): ClientVoucher {
  return {
    reference: reservation.publicReference,
    pickupAddress: reservation.pickupAddress,
    destinationAddress: reservation.destinationAddress,
    pickupAtLabel: formatPickupAt(reservation.pickupAt),
    vehicleLabel: reservation.vehicleLabel ?? "—",
    priceLabel: priceLabelFor(reservation.confirmedPriceCents),
    driverName: ownerProfile.name,
    driverVehicle: ownerProfile.vehicle,
    driverPhone: ownerProfile.phone,
  };
}

export function generateInternalDispatchSheet(reservation: ReservationForDocuments, ownerProfile: OwnerDriverProfile): InternalDispatchSheet {
  return {
    ...generateClientVoucher(reservation, ownerProfile),
    customerName: reservation.customerName ?? "—",
    customerPhone: reservation.customerPhone ?? "—",
    notes: reservation.notes,
    priceAdjustmentReason: reservation.priceAdjustmentReason,
  };
}
