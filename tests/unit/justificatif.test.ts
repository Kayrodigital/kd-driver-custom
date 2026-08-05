import { describe, expect, it } from "vitest";
import { buildJustificatif, type ReservationForJustificatif } from "@/domain/justificatif/justificatif";

const validReservation: ReservationForJustificatif = {
  publicReference: "KD-2026-00042",
  status: "confirmed",
  createdAt: "2026-08-01T10:00:00.000Z",
  pickupAt: "2026-08-10T13:45:00.000Z",
  pickupAddress: "12 quai Perrache, 69002 Lyon",
  destinationAddress: "Aéroport Lyon-Saint-Exupéry, Terminal 1",
  confirmedPriceCents: 4500,
  customerName: "Mamadou Diallo",
  customerPhone: "0600000000",
  assignedDriverName: "Karamba Diaby",
  assignedDriverPhone: "0688863419",
  assignedVehicleLabel: "Berline noire",
  assignedVehiclePlate: "AA-123-BB",
};

describe("buildJustificatif", () => {
  it("génère le document complet quand tous les champs obligatoires sont présents", () => {
    const justificatif = buildJustificatif(validReservation);
    expect(justificatif).not.toBeNull();
    expect(justificatif?.reference).toBe("KD-2026-00042");
    expect(justificatif?.passengerName).toBe("Mamadou Diallo");
    expect(justificatif?.driverName).toBe("Karamba Diaby");
    expect(justificatif?.vehiclePlate).toBe("AA-123-BB");
    expect(justificatif?.agreedPriceLabel).toContain("45");
  });

  it("inclut l'identité complète de l'exploitant (SIREN, registre VTC, carte pro)", () => {
    const justificatif = buildJustificatif(validReservation);
    expect(justificatif?.operator.exploitantName).toBe("Karamba DIABY");
    expect(justificatif?.operator.siren).toBe("852 641 000");
    expect(justificatif?.operator.vtcRegistryNumber).toBe("EVTC069240679");
    expect(justificatif?.operator.professionalCardNumber).toBe("06924023501");
  });

  it("utilise la bonne référence légale (R. 3120-2, arrêté du 6 août 2025)", () => {
    const justificatif = buildJustificatif(validReservation);
    expect(justificatif?.legalReference.articleLabel).toBe("Article R. 3120-2 du Code des transports");
    expect(justificatif?.legalReference.decreeLabel).toContain("6 août 2025");
  });

  it("ne mentionne jamais l'ancienne référence R. 3122-9", () => {
    const justificatif = buildJustificatif(validReservation);
    expect(JSON.stringify(justificatif)).not.toContain("3122-9");
  });

  it("retourne null tant que la réservation n'est pas confirmée", () => {
    for (const status of ["new", "contacted", "quote_requested", "cancelled", "completed"]) {
      expect(buildJustificatif({ ...validReservation, status })).toBeNull();
    }
  });

  it("retourne null si le tarif n'est pas confirmé", () => {
    expect(buildJustificatif({ ...validReservation, confirmedPriceCents: null })).toBeNull();
  });

  it("retourne null si le nom ou le téléphone du passager manque", () => {
    expect(buildJustificatif({ ...validReservation, customerName: null })).toBeNull();
    expect(buildJustificatif({ ...validReservation, customerPhone: null })).toBeNull();
    expect(buildJustificatif({ ...validReservation, customerName: "   " })).toBeNull();
  });

  it("retourne null si un des champs chauffeur/véhicule manque — jamais de document partiel", () => {
    expect(buildJustificatif({ ...validReservation, assignedDriverName: null })).toBeNull();
    expect(buildJustificatif({ ...validReservation, assignedDriverPhone: null })).toBeNull();
    expect(buildJustificatif({ ...validReservation, assignedVehicleLabel: null })).toBeNull();
    expect(buildJustificatif({ ...validReservation, assignedVehiclePlate: null })).toBeNull();
  });

  it("ne code jamais Karamba DIABY par défaut : un chauffeur différent reste tel quel", () => {
    const justificatif = buildJustificatif({ ...validReservation, assignedDriverName: "Jean Martin", assignedVehiclePlate: "CC-999-DD" });
    expect(justificatif?.driverName).toBe("Jean Martin");
    expect(justificatif?.vehiclePlate).toBe("CC-999-DD");
  });
});
