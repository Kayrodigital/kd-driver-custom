import { reservationRequestSchema, type ReservationRequest } from "@/domain/booking/booking-schema";
import type { RouteResult } from "@/domain/maps/route";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import type { MapsProvider } from "@/infrastructure/maps/maps-provider";

export type ReservationRecord = {
  reference: string;
  request: ReservationRequest;
  route: RouteResult;
  pricing: ReturnType<typeof calculatePrice>;
  status: "pending_confirmation";
};

export interface ReservationRepository {
  create(record: ReservationRecord): Promise<{ reference: string; created: boolean }>;
}

function createReference(now: Date): string {
  return `KD-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function createReservation(untrustedInput: unknown, repository: ReservationRepository, maps: MapsProvider, now = new Date()) {
  const request = reservationRequestSchema.parse(untrustedInput);
  if (new Date(request.pickupAt).getTime() <= now.getTime()) throw new RangeError("La date de prise en charge doit être dans le futur.");
  const route = await maps.calculateRoute({ pickup: request.pickup, destination: request.destination });
  const pricing = calculatePrice({ category: request.vehicleSlug, distanceMeters: route.distanceMeters, isAirportTrip: request.isAirportTrip }, pricingConfig);
  const result = await repository.create({ reference: createReference(now), request, route, pricing, status: "pending_confirmation" });
  return {
    ...result,
    summary: {
      pickupAddress: request.pickup.address,
      destinationAddress: request.destination.address,
      pickupAt: request.pickupAt,
      passengers: request.passengers,
      luggage: request.luggage,
      vehicleSlug: request.vehicleSlug,
      distanceMeters: route.distanceMeters,
      durationSeconds: route.durationSeconds,
      pricing,
      customerName: `${request.customer.firstName} ${request.customer.lastName}`,
    },
  };
}
