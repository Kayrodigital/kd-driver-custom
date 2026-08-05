import { formatEuros } from "@/domain/pricing/money";
import { JUSTIFICATIF_LEGAL_REFERENCE, KDRIVE_OPERATOR } from "./kdrive-operator";

/**
 * Sous-ensemble des champs d'une réservation nécessaires au justificatif.
 * Le chauffeur/véhicule affecté vient d'une affectation réelle par
 * réservation (colonnes `assigned_*`) — jamais du profil propriétaire
 * global appliqué par défaut.
 */
export type ReservationForJustificatif = {
  publicReference: string;
  status: string;
  createdAt: string;
  pickupAt: string;
  pickupAddress: string;
  destinationAddress: string;
  confirmedPriceCents: number | null;
  customerName: string | null;
  customerPhone: string | null;
  assignedDriverName: string | null;
  assignedDriverPhone: string | null;
  assignedVehicleLabel: string | null;
  assignedVehiclePlate: string | null;
};

export type Justificatif = {
  reference: string;
  operator: typeof KDRIVE_OPERATOR;
  legalReference: typeof JUSTIFICATIF_LEGAL_REFERENCE;
  passengerName: string;
  passengerPhone: string;
  bookedAt: string;
  pickupAt: string;
  pickupAddress: string;
  destinationAddress: string;
  agreedPriceLabel: string;
  driverName: string;
  driverPhone: string;
  vehicleLabel: string;
  vehiclePlate: string;
};

/**
 * Construit le justificatif définitif, ou `null` si un des champs
 * obligatoires manque — jamais un document partiel. En particulier :
 * jamais généré tant que status !== "confirmed", et jamais de chauffeur
 * par défaut si l'affectation réelle (assigned_*) n'a pas été renseignée.
 */
export function buildJustificatif(reservation: ReservationForJustificatif): Justificatif | null {
  if (reservation.status !== "confirmed") return null;
  if (reservation.confirmedPriceCents === null) return null;

  const passengerName = reservation.customerName?.trim();
  const passengerPhone = reservation.customerPhone?.trim();
  const driverName = reservation.assignedDriverName?.trim();
  const driverPhone = reservation.assignedDriverPhone?.trim();
  const vehicleLabel = reservation.assignedVehicleLabel?.trim();
  const vehiclePlate = reservation.assignedVehiclePlate?.trim();

  if (!passengerName || !passengerPhone) return null;
  if (!driverName || !driverPhone || !vehicleLabel || !vehiclePlate) return null;

  return {
    reference: reservation.publicReference,
    operator: KDRIVE_OPERATOR,
    legalReference: JUSTIFICATIF_LEGAL_REFERENCE,
    passengerName,
    passengerPhone,
    bookedAt: reservation.createdAt,
    pickupAt: reservation.pickupAt,
    pickupAddress: reservation.pickupAddress,
    destinationAddress: reservation.destinationAddress,
    agreedPriceLabel: formatEuros(reservation.confirmedPriceCents),
    driverName,
    driverPhone,
    vehicleLabel,
    vehiclePlate,
  };
}
