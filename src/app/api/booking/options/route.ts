import { NextResponse } from "next/server";
import { z } from "zod";
import { routeRequestSchema } from "@/domain/maps/route";
import { GoogleRoutesProvider } from "@/infrastructure/maps/google-routes-provider";

const schema = routeRequestSchema.extend({ isAirportTrip: z.boolean().default(false) });

/**
 * Retourne uniquement le trajet (distance, durée, tracé) — jamais de tarif :
 * le client public ne voit plus de prix (cf. sprint "nouveau parcours sans
 * prix"). Le calcul tarifaire reste un outil interne (fiche réservation
 * admin et /admin/calculateur), jamais exposé par cette route publique.
 */
export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const route = await new GoogleRoutesProvider().calculateRoute(input);
    return NextResponse.json({ route });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof RangeError) return NextResponse.json({ error: "Trajet invalide ou introuvable." }, { status: 400 });
    console.error("booking_options_failed", error);
    return NextResponse.json({ error: "Calcul d’itinéraire indisponible." }, { status: 503 });
  }
}
