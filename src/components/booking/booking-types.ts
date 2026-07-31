import type { AddressValue } from "@/domain/booking/address";
import type { PricingResult } from "@/domain/pricing/pricing-types";

export type SearchData = { pickup: AddressValue; destination: AddressValue; pickupAt: string; passengers: number; luggage: number; isAirportTrip: boolean };
export type VehicleOption = { category: string; pricing: PricingResult };
export type SearchResult = { route: { distanceMeters: number; durationSeconds: number }; options: VehicleOption[] };
export type PassengerData = { firstName: string; lastName: string; email: string; phone: string; notes: string };
