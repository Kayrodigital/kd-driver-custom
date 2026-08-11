"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { addressSchema } from "@/domain/booking/address";
import { detectAirportTrip } from "@/domain/booking/airport-detection";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { GoogleRoutesProvider } from "@/infrastructure/maps/google-routes-provider";
import { createReservation } from "@/application/create-booking";
import { SupabaseReservationRepository } from "@/infrastructure/supabase/booking-repository";
import type { PricingResult } from "@/domain/pricing/pricing-types";

const calculationInputSchema = z.object({
  pickup: addressSchema,
  destination: addressSchema,
  category: z.enum(["essential", "premium", "van"]),
  flightNumber: z.string().trim().max(20).default(""),
});

export type StandaloneCalculationResult =
  | { ok: true; distanceMeters: number; durationSeconds: number; isAirportTrip: boolean; pricing: PricingResult }
  | { ok: false; error: string };

/**
 * Calcul ponctuel, sans écriture en base : pour un appel entrant, Karamba
 * doit pouvoir donner un prix rapidement sans créer de réservation.
 */
export async function calculateStandalonePrice(rawInput: unknown): Promise<StandaloneCalculationResult> {
  const parsed = calculationInputSchema.safeParse(rawInput);
  if (!parsed.success) return { ok: false, error: "Adresses de départ et de destination requises." };
  const { pickup, destination, category, flightNumber } = parsed.data;
  try {
    const route = await new GoogleRoutesProvider().calculateRoute({ pickup, destination });
    const isAirportTrip = detectAirportTrip({ pickup, destination, flightNumber });
    const pricing = calculatePrice({ category, distanceMeters: route.distanceMeters, durationSeconds: route.durationSeconds, isAirportTrip }, pricingConfig);
    return { ok: true, distanceMeters: route.distanceMeters, durationSeconds: route.durationSeconds, isAirportTrip, pricing };
  } catch {
    return { ok: false, error: "Calcul d’itinéraire indisponible. Vérifiez les adresses." };
  }
}

/**
 * Transforme un calcul ponctuel en réservation réelle, via exactement le
 * même chemin (createReservation + SupabaseReservationRepository) qu'une
 * demande publique — aucune logique de création dupliquée. La réservation
 * créée démarre au statut "new" avec un tarif déjà estimé, prête pour
 * "Confirmer le tarif estimé" sur sa fiche.
 */
export async function createReservationFromCalculation(formData: FormData) {
  const pickupAddress = String(formData.get("pickupAddress") ?? "");
  const pickupLat = Number(formData.get("pickupLat"));
  const pickupLng = Number(formData.get("pickupLng"));
  const pickupPlaceId = formData.get("pickupPlaceId");
  const destinationAddress = String(formData.get("destinationAddress") ?? "");
  const destinationLat = Number(formData.get("destinationLat"));
  const destinationLng = Number(formData.get("destinationLng"));
  const destinationPlaceId = formData.get("destinationPlaceId");
  const category = String(formData.get("category") ?? "");
  const flightNumber = String(formData.get("flightNumber") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const passengers = Number(formData.get("passengers") ?? 1);
  const luggage = Number(formData.get("luggage") ?? 0);
  const customerFirstName = String(formData.get("customerFirstName") ?? "");
  const customerPhone = String(formData.get("customerPhone") ?? "");
  const notes = String(formData.get("notes") ?? "");

  const local = new Date(`${date}T${time}`);
  if (Number.isNaN(local.getTime())) { redirect("/admin/calculateur?error=invalid_datetime"); return; }

  const repository = new SupabaseReservationRepository();
  let createdId: string | null = null;
  try {
    const result = await createReservation(
      {
        idempotencyKey: crypto.randomUUID(),
        pickup: { address: pickupAddress, latitude: Number.isFinite(pickupLat) ? pickupLat : null, longitude: Number.isFinite(pickupLng) ? pickupLng : null, placeId: pickupPlaceId ? String(pickupPlaceId) : null, source: "autocomplete" as const, accuracyMeters: null },
        destination: { address: destinationAddress, latitude: Number.isFinite(destinationLat) ? destinationLat : null, longitude: Number.isFinite(destinationLng) ? destinationLng : null, placeId: destinationPlaceId ? String(destinationPlaceId) : null, source: "autocomplete" as const, accuracyMeters: null },
        pickupAt: local.toISOString(),
        vehicleSlug: category,
        passengers,
        luggage,
        flightNumber: flightNumber || undefined,
        customer: { firstName: customerFirstName || undefined, phone: customerPhone },
        notes: notes ? `${notes} — saisie via le calculateur admin (appel entrant)` : "Saisie via le calculateur admin (appel entrant)",
      },
      repository,
      new GoogleRoutesProvider(),
    );
    createdId = result.id;
  } catch {
    redirect("/admin/calculateur?error=creation_failed");
  }
  redirect(`/admin/reservations/${createdId}`);
}
