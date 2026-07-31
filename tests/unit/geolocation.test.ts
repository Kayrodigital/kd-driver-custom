import { describe, expect, it, vi } from "vitest";
import { GeolocationError, geolocationOptions, getCurrentPosition } from "@/domain/geolocation/geolocation";

function mockGeolocation(errorCode?: number) {
  return { getCurrentPosition: vi.fn((success: PositionCallback, error?: PositionErrorCallback, options?: PositionOptions) => {
    expect(options).toEqual(geolocationOptions);
    if (errorCode) error?.({ code: errorCode, message: "test", PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as GeolocationPositionError);
    else success({ coords: { latitude: 45.75, longitude: 4.85, accuracy: 12, altitude: null, altitudeAccuracy: null, heading: null, speed: null }, timestamp: 1 } as GeolocationPosition);
  }) } as unknown as Geolocation;
}

describe("getCurrentPosition", () => {
  it("utilise les options demandées et renvoie la précision", async () => { const result = await getCurrentPosition(mockGeolocation()); expect(result.coords.accuracy).toBe(12); });
  it("gère le navigateur incompatible", async () => { await expect(getCurrentPosition()).rejects.toMatchObject({ reason: "unsupported" }); });
  it.each([[1, "permission_denied"], [2, "position_unavailable"], [3, "timeout"], [99, "unknown"]])("traduit l'erreur %s", async (code, reason) => {
    await expect(getCurrentPosition(mockGeolocation(code as number))).rejects.toEqual(new GeolocationError(reason as GeolocationError["reason"]));
  });
});
