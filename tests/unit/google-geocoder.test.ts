import { describe, expect, it, vi } from "vitest";
import { reverseGeocode } from "@/infrastructure/maps/google-geocoder";

describe("reverseGeocode", () => {
  it("retourne adresse et place id", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: "OK", results: [{ formatted_address: "Lyon, France", place_id: "abc" }] }) });
    await expect(reverseGeocode(45.75, 4.85, "key", fetcher)).resolves.toEqual({ address: "Lyon, France", placeId: "abc" });
  });
  it("gère une réponse sans résultat", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: "ZERO_RESULTS", results: [] }) });
    await expect(reverseGeocode(0, 0, "key", fetcher)).rejects.toThrow("Aucune adresse");
  });
});
