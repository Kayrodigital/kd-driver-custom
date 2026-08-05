import { renderToBuffer } from "@react-pdf/renderer";
import { describe, expect, it } from "vitest";
import { buildJustificatif, type ReservationForJustificatif } from "@/domain/justificatif/justificatif";
import { JustificatifDocument } from "@/domain/justificatif/justificatif-pdf";

const reservation: ReservationForJustificatif = {
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

describe("JustificatifDocument (PDF)", () => {
  it("génère un buffer PDF non vide sans lever d'exception", async () => {
    const justificatif = buildJustificatif(reservation);
    expect(justificatif).not.toBeNull();
    if (!justificatif) return;

    const buffer = await renderToBuffer(<JustificatifDocument justificatif={justificatif} />);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
    expect(buffer.subarray(0, 5).toString("latin1")).toBe("%PDF-");
  });
});
