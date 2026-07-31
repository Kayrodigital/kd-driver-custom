"use client";

import { useEffect, useRef, useState } from "react";
import type { AddressValue } from "@/domain/booking/address";
import { createAutocomplete, type PlaceSelectEvent, type PlaceAutocompleteLike } from "@/infrastructure/maps/google-maps-loader";
import { useCurrentLocation } from "./use-current-location";

export function AddressAutocomplete({ label, value, onChange, allowGeolocation = false }: { label: string; value: AddressValue; onChange(value: AddressValue): void; allowGeolocation?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<PlaceAutocompleteLike | null>(null);
  const onChangeRef = useRef(onChange);
  const [loadError, setLoadError] = useState("");
  const [detected, setDetected] = useState<AddressValue | null>(null);
  const location = useCurrentLocation();
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  useEffect(() => {
    let disposed = false;
    createAutocomplete().then((element) => {
      if (disposed || !hostRef.current) return;
      element.placeholder = label;
      element.includedRegionCodes = ["fr"];
      element.addEventListener("input", () => {
        setDetected(null);
        onChangeRef.current({ address: element.value, latitude: null, longitude: null, placeId: null, source: "manual", accuracyMeters: null });
      });
      element.addEventListener("gmp-select", async (event) => {
        const place = (event as PlaceSelectEvent).placePrediction.toPlace();
        await place.fetchFields({ fields: ["id", "formattedAddress", "location"] });
        if (!place.formattedAddress || !place.location) return;
        onChangeRef.current({ address: place.formattedAddress, latitude: place.location.lat(), longitude: place.location.lng(), placeId: place.id ?? null, source: "autocomplete", accuracyMeters: null });
      });
      hostRef.current.replaceChildren(element);
      elementRef.current = element;
    }).catch(() => setLoadError("L’autocomplétion est indisponible. Utilisez la saisie manuelle."));
    return () => { disposed = true; elementRef.current?.remove(); };
  }, [label]);

  useEffect(() => {
    if (elementRef.current && elementRef.current.value !== value.address) elementRef.current.value = value.address;
  }, [value.address]);

  async function locate() {
    const result = await location.locate();
    if (!result) return;
    setDetected(result);
    if (elementRef.current) elementRef.current.value = result.address;
  }

  return <div className="address-field"><label>{label}</label><div className="address-control"><div className="places-host" ref={hostRef}><input aria-label={label} value={value.address} onChange={(event) => onChange({ ...value, address: event.target.value, source: "manual", placeId: null, latitude: null, longitude: null })} /></div>{allowGeolocation && <button type="button" className="locate-icon" onClick={locate} disabled={location.loading} aria-label="Utiliser ma position actuelle">⌖</button>}</div>{allowGeolocation && <button type="button" className="locate-mobile" onClick={locate} disabled={location.loading}>📍 {location.loading ? "Localisation…" : "Utiliser ma position actuelle"}</button>}{detected && <div className="location-confirm" role="status"><span>Adresse détectée : {detected.address}</span><button type="button" onClick={() => { onChange(detected); setDetected(null); }}>Confirmer cette adresse</button></div>}{(location.error || loadError) && <p className="field-error" role="alert">{location.error || loadError}</p>}</div>;
}
