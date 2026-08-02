import { NextResponse } from "next/server";
import { z } from "zod";
import { routeRequestSchema } from "@/domain/maps/route";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { GoogleRoutesProvider } from "@/infrastructure/maps/google-routes-provider";

const schema = routeRequestSchema.extend({ isAirportTrip: z.boolean().default(false) });

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const route = await new GoogleRoutesProvider().calculateRoute(input);
    const options = Object.keys(pricingConfig.categories).map((category) => ({
      category,
      pricing: calculatePrice({ category, distanceMeters: route.distanceMeters, durationSeconds: route.durationSeconds, isAirportTrip: input.isAirportTrip }, pricingConfig),
    }));
    return NextResponse.json({ route, options });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof RangeError) return NextResponse.json({ error: "Trajet invalide ou introuvable." }, { status: 400 });
    console.error("booking_options_failed", error);
    return NextResponse.json({ error: "Calcul d’itinéraire indisponible." }, { status: 503 });
  }
}
