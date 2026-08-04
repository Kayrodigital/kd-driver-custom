import { describe, expect, it } from "vitest";
import { generateClientVoucher, generateInternalDispatchSheet, type ReservationForDocuments } from "@/domain/dispatch/vouchers";
import type { OwnerDriverProfile } from "@/domain/dispatch/owner-driver-profile";

const reservation: ReservationForDocuments = {
  publicReference: "KD-2026-00042",
  pickupAddress: "12 quai Perrache, 69002 Lyon",
  destinationAddress: "Aéroport Lyon-Saint-Exupéry, Terminal 1",
  pickupAt: "2026-08-10T13:45:00.000Z",
  vehicleLabel: "Berline",
  confirmedPriceCents: 4500,
  customerName: "Mamadou Diallo",
  customerPhone: "0600000000",
  notes: "Fauteuil roulant pliable",
  priceAdjustmentReason: null,
};

const fullOwnerProfile: OwnerDriverProfile = { name: "Karamba", vehicle: "Berline noire · AA-123-BB", phone: "+33600000001" };
const emptyOwnerProfile: OwnerDriverProfile = { name: null, vehicle: null, phone: null };

describe("generateClientVoucher", () => {
  it("contient la référence, le trajet, le tarif et la catégorie", () => {
    const voucher = generateClientVoucher(reservation, fullOwnerProfile);
    expect(voucher.reference).toBe("KD-2026-00042");
    expect(voucher.pickupAddress).toBe(reservation.pickupAddress);
    expect(voucher.destinationAddress).toBe(reservation.destinationAddress);
    expect(voucher.vehicleLabel).toBe("Berline");
    expect(voucher.priceLabel).toContain("45");
  });

  it("affiche le profil chauffeur (propriétaire) quand configuré", () => {
    const voucher = generateClientVoucher(reservation, fullOwnerProfile);
    expect(voucher.driverName).toBe("Karamba");
    expect(voucher.driverVehicle).toBe("Berline noire · AA-123-BB");
    expect(voucher.driverPhone).toBe("+33600000001");
  });

  it("laisse les champs chauffeur vides plutôt que d'inventer une plaque, quand le profil n'est pas configuré", () => {
    const voucher = generateClientVoucher(reservation, emptyOwnerProfile);
    expect(voucher.driverName).toBeNull();
    expect(voucher.driverVehicle).toBeNull();
    expect(voucher.driverPhone).toBeNull();
  });

  it("affiche un tarif explicite quand le prix n'est pas encore confirmé", () => {
    const voucher = generateClientVoucher({ ...reservation, confirmedPriceCents: null }, fullOwnerProfile);
    expect(voucher.priceLabel).toBe("Tarif à confirmer");
  });

  it("ne contient jamais de champ commission ou net chauffeur (Parcours A uniquement)", () => {
    const voucher = generateClientVoucher(reservation, fullOwnerProfile);
    expect(voucher).not.toHaveProperty("commissionCents");
    expect(voucher).not.toHaveProperty("driverNetCents");
  });
});

describe("generateInternalDispatchSheet", () => {
  it("reprend tous les champs du bon client et ajoute les coordonnées client", () => {
    const sheet = generateInternalDispatchSheet(reservation, fullOwnerProfile);
    expect(sheet.reference).toBe("KD-2026-00042");
    expect(sheet.customerName).toBe("Mamadou Diallo");
    expect(sheet.customerPhone).toBe("0600000000");
    expect(sheet.notes).toBe("Fauteuil roulant pliable");
  });

  it("ne contient jamais de champ commission ou net chauffeur (Parcours A uniquement)", () => {
    const sheet = generateInternalDispatchSheet(reservation, fullOwnerProfile);
    expect(sheet).not.toHaveProperty("commissionCents");
    expect(sheet).not.toHaveProperty("driverNetCents");
  });

  it("retombe sur des tirets plutôt que des champs vides quand le client n'a pas de nom", () => {
    const sheet = generateInternalDispatchSheet({ ...reservation, customerName: null }, fullOwnerProfile);
    expect(sheet.customerName).toBe("—");
  });
});
