import { describe, expect, it } from "vitest";
import { buildReservationsCsv, buildReservationsCsvRow, extractFlightNumber, sanitizeCsvCell, type CsvReservationRow } from "@/app/admin/csv";

const baseRow: CsvReservationRow = {
  publicReference: "KD-2026-00042",
  createdAt: "2026-08-01T10:00:00.000Z",
  pickupAt: "2026-08-10T13:45:00.000Z",
  status: "confirmed",
  archivedAt: null,
  customerName: "Mamadou Diallo",
  customerPhone: "0600000000",
  customerEmail: "client@example.com",
  pickupAddress: "12 quai Perrache, 69002 Lyon",
  destinationAddress: "Aéroport Lyon-Saint-Exupéry, Terminal 1",
  vehicleLabel: "Berline",
  estimatedPriceCents: 4500,
  confirmedPriceCents: 4500,
  notes: "Fauteuil roulant · Vol : AF1234",
  passengers: 2,
  luggage: 1,
  assignedDriverName: "Karamba Diaby",
};

describe("extractFlightNumber", () => {
  it("extrait le numéro de vol depuis le format 'Vol : XXXX' des notes aplaties", () => {
    expect(extractFlightNumber("Fauteuil roulant · Vol : AF1234")).toBe("AF1234");
  });

  it("retourne une chaîne vide si aucun numéro de vol n'est présent", () => {
    expect(extractFlightNumber("Fauteuil roulant · Animal")).toBe("");
    expect(extractFlightNumber(null)).toBe("");
  });
});

describe("sanitizeCsvCell", () => {
  it("neutralise les cellules commençant par =, +, -, @", () => {
    expect(sanitizeCsvCell("=SUM(A1)")).toBe("'=SUM(A1)");
    expect(sanitizeCsvCell("+33600000000")).toBe("'+33600000000");
    expect(sanitizeCsvCell("-1")).toBe("'-1");
    expect(sanitizeCsvCell("@mention")).toBe("'@mention");
  });

  it("laisse les cellules normales inchangées", () => {
    expect(sanitizeCsvCell("KD-2026-00042")).toBe("KD-2026-00042");
    expect(sanitizeCsvCell("Mamadou Diallo")).toBe("Mamadou Diallo");
  });
});

describe("buildReservationsCsvRow", () => {
  it("contient toutes les colonnes attendues, dans l'ordre", () => {
    const row = buildReservationsCsvRow(baseRow);
    expect(row).toHaveLength(19);
    expect(row[0]).toBe("KD-2026-00042");
    expect(row[17]).toBe("AF1234"); // numéro de vol
    expect(row[18]).toBe("Karamba Diaby"); // chauffeur affecté
  });

  it("affiche 'Oui'/'Non' pour l'archivage selon archivedAt", () => {
    expect(buildReservationsCsvRow(baseRow)[4]).toBe("Non");
    expect(buildReservationsCsvRow({ ...baseRow, archivedAt: "2026-08-06T10:00:00.000Z" })[4]).toBe("Oui");
  });

  it("champs client vides plutôt que 'null' littéral", () => {
    const row = buildReservationsCsvRow({ ...baseRow, customerName: null, customerEmail: null });
    expect(row).not.toContain("null");
  });
});

describe("buildReservationsCsv", () => {
  it("commence par le BOM UTF-8", () => {
    const csv = buildReservationsCsv([baseRow]);
    expect(csv.codePointAt(0)).toBe(0xfeff);
  });

  it("utilise le point-virgule comme séparateur", () => {
    const csv = buildReservationsCsv([baseRow]);
    const firstDataLine = csv.split("\r\n")[1];
    expect(firstDataLine.split(";").length).toBeGreaterThanOrEqual(19);
  });

  it("inclut la ligne d'en-têtes en français", () => {
    const csv = buildReservationsCsv([baseRow]);
    expect(csv).toContain("Référence");
    expect(csv).toContain("Chauffeur affecté");
  });

  it("neutralise l'injection CSV même dans un vrai export complet", () => {
    const maliciousRow: CsvReservationRow = { ...baseRow, customerName: "=cmd|'/c calc'!A1" };
    const csv = buildReservationsCsv([maliciousRow]);
    expect(csv).toContain("'=cmd");
    expect(csv).not.toMatch(/;=cmd/);
  });

  it("n'exporte jamais de donnée technique (id interne, token, historique brut)", () => {
    const csv = buildReservationsCsv([baseRow]);
    expect(csv.toLowerCase()).not.toContain("token");
    expect(csv.toLowerCase()).not.toContain("secret");
  });

  it("gère une liste vide sans lever d'exception", () => {
    expect(() => buildReservationsCsv([])).not.toThrow();
    expect(buildReservationsCsv([])).toContain("Référence");
  });
});
