"use client";

import { useEffect, useRef, useState } from "react";
import type { AddressValue } from "@/domain/booking/address";
import {
  createAutocompleteSession,
  fetchAddressSuggestions,
  type PlacePrediction,
} from "@/infrastructure/maps/google-maps-loader";
import { useCurrentLocation } from "./use-current-location";

function suggestionIcon(types: string[]): string {
  if (types.includes("airport")) return "✈";
  if (types.includes("train_station") || types.includes("transit_station")) return "🚆";
  return "📍";
}

export function AddressAutocomplete({ label, value, onChange, allowGeolocation = false }: { label: string; value: AddressValue; onChange(value: AddressValue): void; allowGeolocation?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  const sessionRef = useRef<unknown>(null);
  const requestIdRef = useRef(0);
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [open, setOpen] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const [detected, setDetected] = useState<AddressValue | null>(null);
  const location = useCurrentLocation();
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  useEffect(() => {
    const query = value.address.trim();
    if (value.source !== "manual" || query.length < 2) { requestIdRef.current += 1; return; }
    const requestId = ++requestIdRef.current;
    const timeout = setTimeout(async () => {
      try {
        if (!sessionRef.current) sessionRef.current = await createAutocompleteSession();
        const results = await fetchAddressSuggestions(query, sessionRef.current);
        if (requestIdRef.current !== requestId) return;
        setSuggestions(results);
        setOpen(results.length > 0);
        setHighlighted(0);
        setLoadError("");
      } catch {
        if (requestIdRef.current !== requestId) return;
        setLoadError("L’autocomplétion est indisponible. Utilisez la saisie manuelle.");
      }
    }, 220);
    return () => clearTimeout(timeout);
  }, [value.address, value.source]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  async function selectSuggestion(prediction: PlacePrediction) {
    setOpen(false);
    setSuggestions([]);
    sessionRef.current = null;
    const place = prediction.toPlace();
    await place.fetchFields({ fields: ["id", "formattedAddress", "location"] });
    if (!place.formattedAddress || !place.location) return;
    onChangeRef.current({ address: place.formattedAddress, latitude: place.location.lat(), longitude: place.location.lng(), placeId: place.id ?? null, source: "autocomplete", accuracyMeters: null });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setHighlighted((index) => (index + 1) % suggestions.length); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setHighlighted((index) => (index - 1 + suggestions.length) % suggestions.length); }
    else if (event.key === "Enter") { event.preventDefault(); void selectSuggestion(suggestions[highlighted]); }
    else if (event.key === "Escape") { setOpen(false); }
  }

  async function locate() {
    const result = await location.locate();
    if (!result) return;
    setDetected(result);
  }

  return (
    <div className="address-field" ref={containerRef}>
      <label htmlFor={`address-${label}`}>{label}</label>
      <div className="address-control">
        <span className="address-icon" aria-hidden="true">🔍</span>
        <input
          id={`address-${label}`}
          ref={inputRef}
          aria-label={label}
          value={value.address}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={`address-listbox-${label}`}
          onChange={(event) => {
            setDetected(null);
            if (event.target.value.trim().length < 2) { setOpen(false); setSuggestions([]); }
            onChange({ address: event.target.value, latitude: null, longitude: null, placeId: null, source: "manual", accuracyMeters: null });
          }}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          onKeyDown={onKeyDown}
        />
        {allowGeolocation && <button type="button" className="locate-icon" onClick={locate} disabled={location.loading} aria-label="Utiliser ma position actuelle">⌖</button>}
      </div>
      {open && suggestions.length > 0 && (
        <ul className="address-suggestions" id={`address-listbox-${label}`} role="listbox">
          {suggestions.map((prediction, index) => (
            <li key={prediction.placeId} role="option" aria-selected={index === highlighted}>
              <button type="button" className={index === highlighted ? "is-highlighted" : ""} onMouseEnter={() => setHighlighted(index)} onClick={() => void selectSuggestion(prediction)}>
                <span className="suggestion-icon" aria-hidden="true">{suggestionIcon(prediction.types)}</span>
                <span className="suggestion-text">
                  <b>{prediction.mainText?.text ?? prediction.text.text}</b>
                  {prediction.secondaryText?.text && <small>{prediction.secondaryText.text}</small>}
                </span>
              </button>
            </li>
          ))}
          <li className="address-suggestions-footer" aria-hidden="true">Résultats fournis par Google</li>
        </ul>
      )}
      {allowGeolocation && <button type="button" className="locate-mobile" onClick={locate} disabled={location.loading}>📍 {location.loading ? "Localisation…" : "Utiliser ma position actuelle"}</button>}
      {detected && <div className="location-confirm" role="status"><span>Adresse détectée : {detected.address}</span><button type="button" onClick={() => { onChange(detected); setDetected(null); }}>Confirmer cette adresse</button></div>}
      {(location.error || loadError) && <p className="field-error" role="alert">{location.error || loadError}</p>}
    </div>
  );
}
