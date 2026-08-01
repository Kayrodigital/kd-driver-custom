import "server-only";
import type { ReservationRecord, ReservationRepository } from "@/application/create-booking";
import { createAdminClient } from "./admin-client";

export class SupabaseReservationRepository implements ReservationRepository {
  async create(record: ReservationRecord) {
    const supabase = createAdminClient();
    const email = record.request.customer.email?.toLowerCase() ?? null;
    const customerPayload = {
      email,
      first_name: record.request.customer.firstName ?? null,
      phone: record.request.customer.phone,
    };
    const customerResult = email
      ? await supabase.from("customers").upsert(customerPayload, { onConflict: "email" }).select("id").single()
      : await supabase.from("customers").insert(customerPayload).select("id").single();
    if (customerResult.error) throw customerResult.error;

    const vehicleResult = await supabase.from("vehicles").select("id").eq("slug", record.request.vehicleSlug).eq("active", true).single();
    if (vehicleResult.error) throw vehicleResult.error;

    const payload = {
      public_reference: record.reference,
      idempotency_key: record.request.idempotencyKey,
      customer_id: customerResult.data.id,
      vehicle_id: vehicleResult.data.id,
      status: record.status,
      request_type: "estimate",
      pickup_address: record.request.pickup.address,
      pickup_latitude: record.request.pickup.latitude,
      pickup_longitude: record.request.pickup.longitude,
      pickup_place_id: record.request.pickup.placeId,
      pickup_source: record.request.pickup.source,
      pickup_accuracy_meters: record.request.pickup.accuracyMeters ?? null,
      destination_address: record.request.destination.address,
      destination_latitude: record.request.destination.latitude,
      destination_longitude: record.request.destination.longitude,
      destination_place_id: record.request.destination.placeId,
      pickup_at: record.request.pickupAt,
      passengers: record.request.passengers,
      luggage: record.request.luggage,
      distance_meters: record.route.distanceMeters,
      duration_seconds: record.route.durationSeconds,
      is_airport_trip: record.isAirportTrip,
      pricing_mode: record.pricing.mode,
      amount_cents: record.pricing.totalCents,
      currency: record.pricing.currency,
      pricing_rule_version: record.pricing.ruleVersion,
      pricing_snapshot: record.pricing,
      notes: record.composedNotes || null,
      estimated_price_cents: record.pricing.totalCents,
      pricing_status: record.pricingStatus,
      route_provider: "google_routes",
      route_encoded_polyline: record.route.encodedPolyline ?? null,
      route_calculated_at: new Date().toISOString(),
    };
    const inserted = await supabase.from("reservations").upsert(payload, { onConflict: "idempotency_key", ignoreDuplicates: true }).select("id,public_reference").maybeSingle();
    if (inserted.error) throw inserted.error;
    if (inserted.data) return { id: inserted.data.id, reference: inserted.data.public_reference, created: true };
    const existing = await supabase.from("reservations").select("id,public_reference").eq("idempotency_key", record.request.idempotencyKey).single();
    if (existing.error) throw existing.error;
    return { id: existing.data.id, reference: existing.data.public_reference, created: false };
  }

  /**
   * Lecture-puis-écriture (pas de fonction Postgres atomique — en créer une
   * serait aussi une migration). Risque de concurrence négligeable : appelé
   * juste après la création d'une réservation neuve, dont `history` vaut
   * encore `[]` à ce stade.
   */
  async appendHistoryEvent(id: string, entry: Record<string, unknown>) {
    const supabase = createAdminClient();
    const current = await supabase.from("reservations").select("history").eq("id", id).maybeSingle();
    if (current.error || !current.data) return;
    const history = [...(current.data.history ?? []), { at: new Date().toISOString(), ...entry }];
    await supabase.from("reservations").update({ history }).eq("id", id);
  }
}
