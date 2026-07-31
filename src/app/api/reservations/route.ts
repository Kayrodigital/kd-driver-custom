import { NextResponse } from "next/server";
import { z } from "zod";
import { createReservation } from "@/application/create-booking";
import { GoogleRoutesProvider } from "@/infrastructure/maps/google-routes-provider";
import { SupabaseReservationRepository } from "@/infrastructure/supabase/booking-repository";

export async function POST(request: Request) {
  try {
    const result = await createReservation(await request.json(), new SupabaseReservationRepository(), new GoogleRoutesProvider());
    return NextResponse.json(result, { status: result.created ? 201 : 200 });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof RangeError) return NextResponse.json({ error: "Réservation invalide." }, { status: 400 });
    console.error("reservation_creation_failed", error);
    return NextResponse.json({ error: "Réservation momentanément indisponible." }, { status: 503 });
  }
}
