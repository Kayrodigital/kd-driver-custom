"use client";

import { useState } from "react";
import type { AddressValue } from "@/domain/booking/address";
import { GeolocationError, geolocationMessages, getCurrentPosition } from "@/domain/geolocation/geolocation";

export function useCurrentLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function locate(): Promise<AddressValue | null> {
    setLoading(true); setError("");
    try {
      const position = await getCurrentPosition(navigator.geolocation);
      const response = await fetch("/api/maps/reverse-geocode", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      });
      if (!response.ok) throw new Error("reverse_geocoding_failed");
      const result = await response.json();
      return {
        address: result.address,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        placeId: result.placeId,
        source: "geolocation",
        accuracyMeters: position.coords.accuracy,
      };
    } catch (cause) {
      setError(cause instanceof GeolocationError ? geolocationMessages[cause.reason] : "Aucune adresse n’a été trouvée. Saisissez-la manuellement.");
      return null;
    } finally { setLoading(false); }
  }
  return { locate, loading, error, clearError: () => setError("") };
}
