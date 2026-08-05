import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/justificatif/[id]/pdf/route";

const maybeSingle = vi.fn();

vi.mock("@/infrastructure/supabase/admin-client", () => ({
  createAdminClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({ maybeSingle }),
      }),
    }),
  }),
}));

const baseRow = {
  public_reference: "KD-2026-00042",
  status: "confirmed",
  created_at: "2026-08-01T10:00:00.000Z",
  pickup_at: "2026-08-10T13:45:00.000Z",
  pickup_address: "12 quai Perrache, 69002 Lyon",
  destination_address: "Aéroport Lyon-Saint-Exupéry, Terminal 1",
  confirmed_price_cents: 4500,
  assigned_driver_name: "Karamba Diaby",
  assigned_driver_phone: "0688863419",
  assigned_vehicle_label: "Berline noire",
  assigned_vehicle_plate: "AA-123-BB",
  customers: { first_name: "Mamadou", last_name: "Diallo", phone: "0600000000" },
};

beforeEach(() => {
  maybeSingle.mockReset();
});

function callRoute(id: string) {
  return GET(new Request(`https://www.kdrive-vtc-lyon.fr/api/justificatif/${id}/pdf`), { params: Promise.resolve({ id }) });
}

describe("GET /api/justificatif/[id]/pdf", () => {
  it("retourne un PDF (200, content-type application/pdf) quand la réservation est confirmée avec chauffeur affecté", async () => {
    maybeSingle.mockResolvedValue({ data: baseRow, error: null });
    const response = await callRoute("abc-123");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    const buffer = Buffer.from(await response.arrayBuffer());
    expect(buffer.subarray(0, 5).toString("latin1")).toBe("%PDF-");
  }, 20000);

  it("retourne 404 quand la réservation n'est pas confirmée", async () => {
    maybeSingle.mockResolvedValue({ data: { ...baseRow, status: "new" }, error: null });
    const response = await callRoute("abc-123");
    expect(response.status).toBe(404);
  });

  it("retourne 404 quand le chauffeur affecté est manquant", async () => {
    maybeSingle.mockResolvedValue({ data: { ...baseRow, assigned_driver_name: null }, error: null });
    const response = await callRoute("abc-123");
    expect(response.status).toBe(404);
  });

  it("retourne 404 quand la réservation n'existe pas", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null });
    const response = await callRoute("missing");
    expect(response.status).toBe(404);
  });
});
