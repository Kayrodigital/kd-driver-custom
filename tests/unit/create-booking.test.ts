import { describe, expect, it } from "vitest";
import { createReservation, type ReservationRecord, type ReservationRepository } from "@/application/create-booking";
import { FakeMapsProvider } from "@/infrastructure/maps/fake-maps-provider";

class MemoryRepository implements ReservationRepository {
  records = new Map<string, ReservationRecord>();
  async create(record: ReservationRecord) {
    const existing = this.records.get(record.request.idempotencyKey);
    if (existing) return { reference: existing.reference, created: false };
    this.records.set(record.request.idempotencyKey, record);
    return { reference: record.reference, created: true };
  }
}

const address = { address: "10 rue de Lyon, 69000 Lyon", latitude: 45.75, longitude: 4.85, placeId: "place-1", source: "autocomplete" as const, accuracyMeters: null };
const validRequest = { idempotencyKey: "cdb9b788-e9ed-4eeb-a6b0-7604e1206b7d", pickup: address, destination: { ...address, address: "Aéroport Lyon Saint-Exupéry", placeId: "place-2" }, pickupAt: "2030-01-02T10:00:00+01:00", requestType: "estimate" as const, passengers: 2, luggage: 1, customer: { firstName: "Client", phone: "+33600000000" }, notes: "" };

describe("createReservation", () => {
  it("recalcule route et prix côté serveur, sans véhicule ni e-mail obligatoires", async () => {
    const repository = new MemoryRepository();
    await createReservation({ ...validRequest, distanceMeters: 1, totalCents: 1, vehicleSlug: "luxe" }, repository, new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 }), new Date("2029-01-01"));
    const record = repository.records.values().next().value;
    expect(record?.route.distanceMeters).toBe(10_000);
    expect(record?.pricing.totalCents).toBe(2_750);
    expect(record?.status).toBe("new");
  });

  it("reste idempotent", async () => {
    const repository = new MemoryRepository(); const maps = new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 });
    const first = await createReservation(validRequest, repository, maps, new Date("2029-01-01"));
    const second = await createReservation(validRequest, repository, maps, new Date("2029-01-01"));
    expect(first.created).toBe(true); expect(second.reference).toBe(first.reference); expect(repository.records.size).toBe(1);
  });

  it("refuse une date passée", async () => {
    await expect(createReservation(validRequest, new MemoryRepository(), new FakeMapsProvider({ distanceMeters: 1, durationSeconds: 1 }), new Date("2031-01-01"))).rejects.toThrow("futur");
  });

  it("marque la demande sur devis au-delà du seuil longue distance", async () => {
    const repository = new MemoryRepository();
    await createReservation({ ...validRequest, idempotencyKey: "3d6f3b0a-7a8a-4d3a-9d2a-1a2b3c4d5e6f" }, repository, new FakeMapsProvider({ distanceMeters: 200_000, durationSeconds: 7_200 }), new Date("2029-01-01"));
    const record = repository.records.values().next().value;
    expect(record?.pricing.mode).toBe("quote");
    expect(record?.status).toBe("quote_requested");
  });
});
