import { reservationRequestSchema, type ReservationRequest } from "@/domain/booking/booking-schema";
import type { RouteResult } from "@/domain/maps/route";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { vehicleCatalog } from "@/domain/pricing/vehicle-catalog";
import type { MapsProvider } from "@/infrastructure/maps/maps-provider";

export type ReservationStatus = "new" | "quote_requested";

/**
 * confirmed / adjusted / pending_confirmation n'existent pas encore côté
 * création (réservées au workflow propriétaire, Phase 5) : à la création,
 * seuls "estimated" et "quote_required" sont produits.
 */
export type PricingStatus = "estimated" | "pending_confirmation" | "confirmed" | "adjusted" | "quote_required";

export type ReservationRecord = {
  reference: string;
  request: ReservationRequest;
  route: RouteResult;
  pricing: ReturnType<typeof calculatePrice>;
  status: ReservationStatus;
  pricingStatus: PricingStatus;
  isAirportTrip: boolean;
  composedNotes: string;
};

export interface ReservationRepository {
  create(record: ReservationRecord): Promise<{ id: string; reference: string; created: boolean }>;
  appendHistoryEvent?(id: string, entry: Record<string, unknown>): Promise<void>;
}

function createReference(now: Date): string {
  return `KD-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function composeNotes(request: ReservationRequest): string {
  const extras: string[] = [];
  if (request.childSeat) extras.push("Siège enfant");
  if (request.pet) extras.push("Animal");
  if (request.extraStop) extras.push(`Arrêt supplémentaire : ${request.extraStop}`);
  if (request.flightNumber) extras.push(`Vol : ${request.flightNumber}`);
  if (request.trainNumber) extras.push(`Train : ${request.trainNumber}`);
  if (request.bookingForSomeoneElse) extras.push(`Réservé pour : ${request.bookingForSomeoneElse.firstName} (${request.bookingForSomeoneElse.phone})`);
  return [request.notes, extras.join(" · ")].filter(Boolean).join(" — ");
}

export async function createReservation(untrustedInput: unknown, repository: ReservationRepository, maps: MapsProvider, now = new Date()) {
  const request = reservationRequestSchema.parse(untrustedInput);
  if (new Date(request.pickupAt).getTime() <= now.getTime()) throw new RangeError("La date de prise en charge doit être dans le futur.");
  const route = await maps.calculateRoute({ pickup: request.pickup, destination: request.destination });
  // Détection provisoire et fragile : aucun champ trip_type explicite n'existe encore
  // dans le tunnel. Un client peut aller à l'aéroport sans numéro de vol (aucune
  // détection) ou renseigner un vol pour une prise en charge indirecte (faux
  // positif). Le tarif reste toujours vérifiable et ajustable par le propriétaire
  // dans l'admin — cf. docs/CLIENT_CONTENT_VALIDATION.md.
  const isAirportTrip = Boolean(request.flightNumber);
  const pricing = calculatePrice({ category: request.vehicleSlug, distanceMeters: route.distanceMeters, durationSeconds: route.durationSeconds, isAirportTrip }, pricingConfig);
  const status: ReservationStatus = pricing.mode === "quote" ? "quote_requested" : "new";
  const pricingStatus: PricingStatus = pricing.mode === "quote" ? "quote_required" : "estimated";
  const composedNotes = composeNotes(request);
  const result = await repository.create({ reference: createReference(now), request, route, pricing, status, pricingStatus, isAirportTrip, composedNotes });
  return {
    ...result,
    summary: {
      pickupAddress: request.pickup.address,
      destinationAddress: request.destination.address,
      pickupAt: request.pickupAt,
      phone: request.customer.phone,
      vehicleSlug: request.vehicleSlug,
      passengers: request.passengers,
      luggage: request.luggage,
      pricing,
    },
    // Réservé à l'orchestration des notifications propriétaire côté Route
    // Handler (cf. src/app/api/reservations/route.ts) : ne pas renvoyer
    // ce champ tel quel dans la réponse HTTP au client.
    notificationContext: {
      createdAt: now.toISOString(),
      customerName: request.customer.firstName ?? null,
      customerEmail: request.customer.email ?? null,
      pickupAddress: request.pickup.address,
      destinationAddress: request.destination.address,
      pickupAt: request.pickupAt,
      distanceMeters: route.distanceMeters,
      durationSeconds: route.durationSeconds,
      vehicleLabel: vehicleCatalog.find((v) => v.slug === request.vehicleSlug)?.label ?? request.vehicleSlug,
      passengers: request.passengers,
      luggage: request.luggage,
      optionsSummary: composedNotes,
      pricing,
      status,
    },
  };
}
