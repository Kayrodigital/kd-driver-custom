import { NextResponse } from "next/server";
import { z } from "zod";
import { reverseGeocode } from "@/infrastructure/maps/google-geocoder";

const schema = z.object({ latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180) });

export async function POST(request: Request) {
  try {
    const { latitude, longitude } = schema.parse(await request.json());
    const key = process.env.GOOGLE_MAPS_SERVER_API_KEY;
    if (!key) throw new Error("missing_key");
    return NextResponse.json(await reverseGeocode(latitude, longitude, key));
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Coordonnées invalides." }, { status: 400 });
    if (error instanceof RangeError) return NextResponse.json({ error: "Adresse introuvable." }, { status: 404 });
    return NextResponse.json({ error: "Géocodage indisponible." }, { status: 503 });
  }
}
