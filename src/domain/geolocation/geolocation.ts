export const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10_000,
  maximumAge: 60_000,
};

export type GeolocationFailure = "unsupported" | "permission_denied" | "position_unavailable" | "timeout" | "unknown";

export class GeolocationError extends Error {
  constructor(public readonly reason: GeolocationFailure) {
    super(reason);
  }
}

export function getCurrentPosition(geolocation?: Geolocation): Promise<GeolocationPosition> {
  if (!geolocation) return Promise.reject(new GeolocationError("unsupported"));
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(resolve, (error) => {
      const reasons: Record<number, GeolocationFailure> = { 1: "permission_denied", 2: "position_unavailable", 3: "timeout" };
      reject(new GeolocationError(reasons[error.code] ?? "unknown"));
    }, geolocationOptions);
  });
}

export const geolocationMessages: Record<GeolocationFailure, string> = {
  unsupported: "La géolocalisation n’est pas disponible sur ce navigateur.",
  permission_denied: "L’autorisation a été refusée. Vous pouvez saisir l’adresse manuellement.",
  position_unavailable: "Votre position est indisponible. Saisissez l’adresse manuellement.",
  timeout: "La localisation a pris trop de temps. Réessayez ou saisissez l’adresse.",
  unknown: "La localisation a échoué. Le formulaire reste disponible.",
};
