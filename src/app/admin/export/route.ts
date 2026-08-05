import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { buildReservationsCsv, csvFilename, type CsvReservationRow } from "../csv";
import { applyReservationsQuery, buildReservationsQueryParams, RESERVATIONS_SELECT } from "../reservations-query";

/**
 * Route sous /admin/*, donc déjà couverte par le Basic Auth de src/proxy.ts
 * — pas de vérification d'accès supplémentaire nécessaire ici.
 *
 * Trois modes, cf. brief :
 * - selection : ids= répétés, export exact de la sélection ;
 * - filtered : mêmes paramètres que la liste (vue, recherche, dates, tri),
 *   réutilise applyReservationsQuery sans pagination — aucune logique de
 *   filtrage dupliquée entre la liste et l'export ;
 * - all : toutes les réservations (actives et archivées), sans filtre.
 */

type Customer = { first_name: string | null; last_name: string | null; phone: string | null; email: string | null };
type Vehicle = { label: string | null };
type RawRow = {
  public_reference: string;
  created_at: string;
  pickup_at: string;
  status: string;
  archived_at: string | null;
  estimated_price_cents: number | null;
  confirmed_price_cents: number | null;
  pickup_address: string;
  destination_address: string;
  notes: string | null;
  passengers: number;
  luggage: number;
  assigned_driver_name: string | null;
  customers: Customer | Customer[] | null;
  vehicles: Vehicle | Vehicle[] | null;
};

function one<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function toCsvRow(row: RawRow): CsvReservationRow {
  const customer = one(row.customers);
  const vehicle = one(row.vehicles);
  return {
    publicReference: row.public_reference,
    createdAt: row.created_at,
    pickupAt: row.pickup_at,
    status: row.status,
    archivedAt: row.archived_at,
    customerName: customer ? [customer.first_name, customer.last_name].filter(Boolean).join(" ") || null : null,
    customerPhone: customer?.phone ?? null,
    customerEmail: customer?.email ?? null,
    pickupAddress: row.pickup_address,
    destinationAddress: row.destination_address,
    vehicleLabel: vehicle?.label ?? null,
    estimatedPriceCents: row.estimated_price_cents,
    confirmedPriceCents: row.confirmed_price_cents,
    notes: row.notes,
    passengers: row.passengers,
    luggage: row.luggage,
    assignedDriverName: row.assigned_driver_name,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") ?? "filtered";
  const supabase = createAdminClient();

  let rawRows: RawRow[] | null = null;

  if (mode === "selection") {
    const ids = url.searchParams.getAll("ids");
    if (ids.length === 0) return new Response("Aucune réservation sélectionnée.", { status: 400 });
    const { data, error } = await supabase.from("reservations").select(RESERVATIONS_SELECT).in("id", ids);
    if (error) return new Response("Export impossible.", { status: 500 });
    rawRows = data as unknown as RawRow[];
  } else if (mode === "all") {
    const { data, error } = await supabase.from("reservations").select(RESERVATIONS_SELECT).order("created_at", { ascending: false });
    if (error) return new Response("Export impossible.", { status: 500 });
    rawRows = data as unknown as RawRow[];
  } else {
    const params = buildReservationsQueryParams(Object.fromEntries(url.searchParams));
    const { data, error } = await applyReservationsQuery(supabase, params, { paginate: false });
    if (error) return new Response("Export impossible.", { status: 500 });
    rawRows = data as unknown as RawRow[];
  }

  const csv = buildReservationsCsv((rawRows ?? []).map(toCsvRow));
  return new Response(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${csvFilename()}"`,
      "cache-control": "no-store",
    },
  });
}
