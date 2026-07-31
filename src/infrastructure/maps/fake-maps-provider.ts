import type { RouteRequest, RouteResult } from "@/domain/maps/route";
import type { MapsProvider } from "./maps-provider";

export class FakeMapsProvider implements MapsProvider {
  constructor(private readonly result: RouteResult) {}
  async calculateRoute(request: RouteRequest) {
    if (!request.pickup.address || !request.destination.address) throw new RangeError("Adresses obligatoires.");
    return this.result;
  }
}
