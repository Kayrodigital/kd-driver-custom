import type { RouteRequest, RouteResult } from "@/domain/maps/route";

export interface MapsProvider {
  calculateRoute(request: RouteRequest): Promise<RouteResult>;
}
