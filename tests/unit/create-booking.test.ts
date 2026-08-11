import { describe, expect, it } from "vitest";
import { createReservation, type ReservationRecord, type ReservationRepository } from "@/application/create-booking";
import { FakeMapsProvider } from "@/infrastructure/maps/fake-maps-provider";

class MemoryRepository implements ReservationRepository {
  records = new Map<string, ReservationRecord>();
  async create(record: ReservationRecord) {
    const existing = this.records.get(record.request.idempotencyKey);
    if (existing) return { id: existing.reference, reference: existing.reference, created: false };
    this.records.set(record.request.idempotencyKey, record);
    return { id: record.reference, reference: record.reference, created: true };
  }
}

const address = { address: "10 rue de Lyon, 69000 Lyon", latitude: 45.75, longitude: 4.85, placeId: "place-1", source: "autocomplete" as const, accuracyMeters: null };
const validRequest = { idempotencyKey: "cdb9b788-e9ed-4eeb-a6b0-7604e1206b7d", pickup: address, destination: { ...address, address: "12 Avenue Foch, 69006 Lyon", placeId: "place-2" }, pickupAt: "2030-01-02T10:00:00+01:00", vehicleSlug: "premium" as const, passengers: 2, luggage: 1, customer: { firstName: "Client", phone: "+33600000000" }, notes: "" };

describe("createReservation", () => {
  it("recalcule route et prix côté serveur, véhicule par défaut sans e-mail obligatoire", async () => {
    const repository = new MemoryRepository();
    const withoutVehicle = { ...validRequest };
    Reflect.deleteProperty(withoutVehicle, "vehicleSlug");
    await createReservation(withoutVehicle, repository, new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 }), new Date("2029-01-01"));
    const record = repository.records.values().next().value;
    expect(record?.route.distanceMeters).toBe(10_000);
    expect(record?.request.vehicleSlug).toBe("essential");
    expect(record?.pricing.totalCents).toBe(3_000);
    expect(record?.status).toBe("new");
  });

  it("calcule le tarif pour Van — catégorie désormais toujours calculée, plus jamais sur devis", async () => {
    const repository = new MemoryRepository();
    await createReservation({ ...validRequest, vehicleSlug: "van" }, repository, new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 }), new Date("2029-01-01"));
    const record = repository.records.values().next().value;
    expect(record?.pricing.mode).toBe("calculated");
    expect(record?.pricing.totalCents).toBe(4_500);
    expect(record?.status).toBe("new");
  });

  it("compose les notes à partir des options facultatives", async () => {
    const repository = new MemoryRepository();
    await createReservation({ ...validRequest, childSeat: true, flightNumber: "AF1234" }, repository, new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 }), new Date("2029-01-01"));
    const record = repository.records.values().next().value;
    expect(record?.composedNotes).toContain("Siège enfant");
    expect(record?.composedNotes).toContain("AF1234");
    expect(record?.isAirportTrip).toBe(true);
  });

  it("ajoute l'option Fauteuil roulant aux notes, sans supplément tarifaire", async () => {
    const repository = new MemoryRepository();
    const withoutOption = await createReservation(validRequest, repository, new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 }), new Date("2029-01-01"));
    const withOption = await createReservation(
      { ...validRequest, idempotencyKey: "cdb9b788-e9ed-4eeb-a6b0-7604e1206b7e", wheelchair: true },
      repository,
      new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 }),
      new Date("2029-01-01"),
    );
    const recordWithOption = repository.records.get("cdb9b788-e9ed-4eeb-a6b0-7604e1206b7e");
    expect(recordWithOption?.composedNotes).toContain("Fauteuil roulant");
    expect(recordWithOption?.pricing.totalCents).toBe(withoutOption.summary.pricing.totalCents);
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

  it("calcule un tarif (sans devis) au-delà du seuil longue distance", async () => {
    const repository = new MemoryRepository();
    await createReservation({ ...validRequest, idempotencyKey: "3d6f3b0a-7a8a-4d3a-9d2a-1a2b3c4d5e6f" }, repository, new FakeMapsProvider({ distanceMeters: 200_000, durationSeconds: 7_200 }), new Date("2029-01-01"));
    const record = repository.records.values().next().value;
    expect(record?.pricing.mode).toBe("calculated");
    expect(record?.pricing.tripType).toBe("long_distance");
    expect(record?.status).toBe("new");
  });

  it("expose un notificationContext exploitable pour la notification propriétaire", async () => {
    const repository = new MemoryRepository();
    const result = await createReservation({ ...validRequest, idempotencyKey: "9f1b2c3d-4e5f-6789-abcd-ef0123456789" }, repository, new FakeMapsProvider({ distanceMeters: 10_000, durationSeconds: 1_200 }), new Date("2029-01-01"));
    expect(result.id).toBeTruthy();
    expect(result.notificationContext.customerName).toBe("Client");
    expect(result.notificationContext.vehicleLabel).toBe("Premium");
    expect(result.notificationContext.pricing.mode).toBe("calculated");
    expect(result.notificationContext.status).toBe("new");
  });
});
