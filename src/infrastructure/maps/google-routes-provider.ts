import "server-only";
import type { RouteRequest, RouteResult } from "@/domain/maps/route";
import type { MapsProvider } from "./maps-provider";

type GoogleRoute = { distanceMeters?: number; duration?: string };

function waypoint(value: RouteRequest["pickup"]) {
  if (value.placeId) return { placeId: value.placeId };
  if (value.latitude !== null && value.longitude !== null) {
    return { location: { latLng: { latitude: value.latitude, longitude: value.longitude } } };
  }
  return { address: value.address };
}

export class GoogleRoutesProvider implements MapsProvider {
  async calculateRoute(request: RouteRequest): Promise<RouteResult> {
    const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;
    if (!apiKey) throw new Error("Clé Google Maps serveur manquante.");
    const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin: waypoint(request.pickup),
        destination: waypoint(request.destination),
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_UNAWARE",
        languageCode: "fr-FR",
        units: "METRIC",
      }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Google Routes indisponible (${response.status}).`);
    const data = (await response.json()) as { routes?: GoogleRoute[] };
    const route = data.routes?.[0];
    if (!route?.distanceMeters || !route.duration) throw new RangeError("Aucun itinéraire trouvé.");
    return { distanceMeters: route.distanceMeters, durationSeconds: Math.round(Number.parseFloat(route.duration)) };
  }
}
