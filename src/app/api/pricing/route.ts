import { NextResponse } from "next/server";
import { z } from "zod";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";
import { checkRateLimit } from "@/infrastructure/rate-limit/supabase-rate-limiter";
import { getClientIp } from "@/infrastructure/rate-limit/client-ip";

const schema = z.object({
  category: z.string(),
  distanceMeters: z.number().int().min(0).max(2_000_000),
  durationSeconds: z.number().int().min(0).max(500_000),
  isAirportTrip: z.boolean().optional(),
});

// Un utilisateur légitime peut appeler ce calcul plusieurs fois en ajustant
// son trajet/véhicule — limite plus généreuse que /api/reservations.
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUESTS = 30;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = await checkRateLimit(`pricing:${ip}`, RATE_LIMIT_WINDOW_SECONDS, RATE_LIMIT_MAX_REQUESTS);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans quelques instants." },
      { status: 429, headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined },
    );
  }

  try {
    const input = schema.parse(await request.json());
    return NextResponse.json(calculatePrice(input, pricingConfig));
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof RangeError) {
      return NextResponse.json({ error: "Données tarifaires invalides." }, { status: 400 });
    }
    return NextResponse.json({ error: "Calcul indisponible." }, { status: 500 });
  }
}
