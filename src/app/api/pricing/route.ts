import { NextResponse } from "next/server";
import { z } from "zod";
import { calculatePrice } from "@/domain/pricing/pricing-engine";
import { pricingConfig } from "@/domain/pricing/pricing-config";

const schema = z.object({
  category: z.string(),
  distanceMeters: z.number().int().min(0).max(2_000_000),
  isAirportTrip: z.boolean().optional(),
});

export async function POST(request: Request) {
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
