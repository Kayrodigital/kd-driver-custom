import { renderToBuffer } from "@react-pdf/renderer";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { buildJustificatif, type ReservationForJustificatif } from "@/domain/justificatif/justificatif";
import { JustificatifDocument } from "@/domain/justificatif/justificatif-pdf";

export const runtime = "nodejs";

/**
 * PDF généré à la demande à partir de l'état actuel de la réservation —
 * jamais stocké, donc toujours à jour après une modification du tarif, du
 * chauffeur, du véhicule ou de l'horaire (pas de logique de régénération
 * séparée à maintenir). 404 tant que la course n'est pas confirmée avec un
 * chauffeur réellement affecté (buildJustificatif refuse tout document
 * partiel). L'URL est construite sur l'id UUID interne (non énumérable),
 * pas sur la référence publique — cf. limite documentée dans
 * docs/CLIENT_CONTENT_VALIDATION.md (pas un vrai contrôle d'accès signé).
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select(
      "public_reference,status,created_at,pickup_at,pickup_address,destination_address,confirmed_price_cents,assigned_driver_name,assigned_driver_phone,assigned_vehicle_label,assigned_vehicle_plate,customers(first_name,last_name,phone)",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return new Response("Not Found", { status: 404 });

  const customer = Array.isArray(data.customers) ? data.customers[0] : data.customers;
  const reservation: ReservationForJustificatif = {
    publicReference: data.public_reference,
    status: data.status,
    createdAt: data.created_at,
    pickupAt: data.pickup_at,
    pickupAddress: data.pickup_address,
    destinationAddress: data.destination_address,
    confirmedPriceCents: data.confirmed_price_cents,
    customerName: customer ? [customer.first_name, customer.last_name].filter(Boolean).join(" ") || null : null,
    customerPhone: customer?.phone ?? null,
    assignedDriverName: data.assigned_driver_name,
    assignedDriverPhone: data.assigned_driver_phone,
    assignedVehicleLabel: data.assigned_vehicle_label,
    assignedVehiclePlate: data.assigned_vehicle_plate,
  };

  const justificatif = buildJustificatif(reservation);
  if (!justificatif) return new Response("Not Found", { status: 404 });

  const buffer = await renderToBuffer(<JustificatifDocument justificatif={justificatif} />);
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="justificatif-${justificatif.reference}.pdf"`,
      "cache-control": "no-store",
    },
  });
}
