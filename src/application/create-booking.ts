import { reservationRequestSchema, type ReservationRequest } from "@/domain/booking/booking-schema";
import type { RouteResult } from "@/domain/maps/route";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import type { MapsProvider } from "@/infrastructure/maps/maps-provider";

export type ReservationStatus = "new" | "quote_requested";

export type ReservationRecord = {
  reference: string;
  request: ReservationRequest;
  route: RouteResult;
  pricing: ReturnType<typeof calculatePrice>;
  status: ReservationStatus;
  isAirportTrip: boolean;
  composedNotes: string;
};

export interface ReservationRepository {
  create(record: ReservationRecord): Promise<{ reference: string; created: boolean }>;
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
  const isAirportTrip = Boolean(request.flightNumber);
  const pricing = calculatePrice({ category: request.vehicleSlug, distanceMeters: route.distanceMeters, isAirportTrip }, pricingConfig);
  const status: ReservationStatus = pricing.mode === "quote" ? "quote_requested" : "new";
  const composedNotes = composeNotes(request);
  const result = await repository.create({ reference: createReference(now), request, route, pricing, status, isAirportTrip, composedNotes });
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
  };
}
