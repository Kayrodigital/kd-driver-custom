"use client";

import { useEffect, useRef, useState } from "react";
import type { AddressValue } from "@/domain/booking/address";
import { getGeometryLibrary, getGoogleMapsNamespace, getMapsLibrary } from "@/infrastructure/maps/google-maps-loader";

type RouteMapProps = {
  pickup: AddressValue;
  destination: AddressValue;
  route: { distanceMeters: number; durationSeconds: number; encodedPolyline?: string | null } | null;
};

/**
 * Carte Google consultative (pas de marqueurs déplaçables, pas de trafic,
 * pas de second calcul d'itinéraire) : réutilise exactement la distance et
 * la polyline déjà obtenues via /api/booking/options.
 */
export function RouteMap({ pickup, destination, route }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState<"loading" | "ready" | "no-polyline" | "error">("loading");

  /* eslint-disable react-hooks/set-state-in-effect -- chargement asynchrone de Google Maps, pattern loading/erreur standard */
  useEffect(() => {
    if (!visible || !route || pickup.latitude === null || destination.latitude === null) return;
    const encodedPolyline = route.encodedPolyline;
    if (!encodedPolyline) { setStatus("no-polyline"); return; }
    let cancelled = false;
    setStatus("loading");

    async function render() {
      try {
        const [mapsLib, geometryLib] = await Promise.all([getMapsLibrary(), getGeometryLibrary()]);
        if (cancelled || !containerRef.current) return;
        const google = getGoogleMapsNamespace();

        const map = new mapsLib.Map(containerRef.current, {
          disableDefaultUI: true,
          zoomControl: false,
          gestureHandling: "none",
          keyboardShortcuts: false,
          clickableIcons: false,
        });

        new google.Marker({ position: { lat: pickup.latitude, lng: pickup.longitude }, map, title: "Départ" });
        new google.Marker({ position: { lat: destination.latitude, lng: destination.longitude }, map, title: "Destination" });

        const path = geometryLib.encoding.decodePath(encodedPolyline as string);
        new google.Polyline({ path, map, strokeColor: "#b08d4f", strokeWeight: 4 }).setMap(map);

        const bounds = new google.LatLngBounds();
        path.forEach((point) => bounds.extend(point));
        (map as { fitBounds(bounds: unknown, padding?: number): void }).fitBounds(bounds, 32);

        if (!cancelled) setStatus("ready");
      } catch (error) {
        console.error("route_map_render_failed", error);
        if (!cancelled) setStatus("error");
      }
    }

    void render();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, route?.encodedPolyline]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!route) return null;

  return (
    <div className="kd-route-map-block">
      <button type="button" className="kd-more-toggle" onClick={() => setVisible((value) => !value)}>
        {visible ? "Masquer l’itinéraire" : "Voir l’itinéraire"}
      </button>
      {visible && (
        <div className="kd-route-map">
          <div className="kd-route-map-canvas">
            <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
            {status === "loading" && <p className="kd-route-map-fallback">Chargement de la carte…</p>}
            {status === "no-polyline" && <p className="kd-route-map-fallback">Aperçu de l’itinéraire indisponible pour ce trajet.</p>}
            {status === "error" && <p className="kd-route-map-fallback">La carte n’a pas pu être chargée.</p>}
          </div>
          <div className="kd-route-map-meta">
            <span>Distance estimée : {(route.distanceMeters / 1000).toFixed(1)} km</span>
            <span>Durée estimée : ≈ {Math.round(route.durationSeconds / 60)} min</span>
            <span className="kd-route-map-note">Itinéraire calculé avec Google</span>
          </div>
        </div>
      )}
    </div>
  );
}
