export type PlaceLike = {
  id?: string;
  formattedAddress?: string;
  location?: { lat(): number; lng(): number };
  fetchFields(options: { fields: string[] }): Promise<void>;
};

export type PlacePrediction = {
  placeId: string;
  types: string[];
  text: { text: string };
  mainText?: { text: string };
  secondaryText?: { text: string };
  toPlace(): PlaceLike;
};

type AutocompleteSuggestion = { placePrediction: PlacePrediction | null };

type FetchSuggestionsRequest = {
  input: string;
  sessionToken: unknown;
  includedRegionCodes?: string[];
  language?: string;
};

type PlacesLibrary = {
  AutocompleteSessionToken: new () => unknown;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions(request: FetchSuggestionsRequest): Promise<{ suggestions: AutocompleteSuggestion[] }>;
  };
};

type MapsLibrary = { Map: new (element: HTMLElement, options: unknown) => unknown; LatLngBounds: new () => { extend(point: unknown): void }; Marker?: new (options: unknown) => unknown };
type MarkerLibrary = { AdvancedMarkerElement: new (options: unknown) => unknown };
type GeometryLibrary = { encoding: { decodePath(encoded: string): unknown[] } };

type GoogleMapsWindow = Window & {
  google?: {
    maps: {
      importLibrary(name: "places"): Promise<PlacesLibrary>;
      importLibrary(name: "maps"): Promise<MapsLibrary>;
      importLibrary(name: "marker"): Promise<MarkerLibrary>;
      importLibrary(name: "geometry"): Promise<GeometryLibrary>;
      Polyline: new (options: unknown) => { setMap(map: unknown): void };
      Marker: new (options: unknown) => unknown;
      LatLngBounds: new () => { extend(point: unknown): void };
    };
  };
};

let loader: Promise<void> | null = null;

export function loadGoogleMaps(): Promise<void> {
  if ((window as GoogleMapsWindow).google?.maps) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key) return reject(new Error("Clé Google Maps publique manquante."));
    const callback = `initKdMaps_${Date.now()}`;
    const target = window as unknown as GoogleMapsWindow & Record<string, unknown>;
    target[callback] = () => { delete target[callback]; resolve(); };
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&libraries=places&language=fr&region=FR&callback=${callback}`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps n’a pas pu être chargé."));
    document.head.appendChild(script);
  });
  return loader;
}

let placesLibrary: Promise<PlacesLibrary> | null = null;

async function getPlacesLibrary(): Promise<PlacesLibrary> {
  await loadGoogleMaps();
  const google = (window as GoogleMapsWindow).google;
  if (!google) throw new Error("Google Maps indisponible.");
  if (!placesLibrary) placesLibrary = google.maps.importLibrary("places");
  return placesLibrary;
}

let mapsLibrary: Promise<MapsLibrary> | null = null;
let geometryLibrary: Promise<GeometryLibrary> | null = null;

export async function getMapsLibrary(): Promise<MapsLibrary> {
  await loadGoogleMaps();
  const google = (window as GoogleMapsWindow).google;
  if (!google) throw new Error("Google Maps indisponible.");
  if (!mapsLibrary) mapsLibrary = google.maps.importLibrary("maps");
  return mapsLibrary;
}

export async function getGeometryLibrary(): Promise<GeometryLibrary> {
  await loadGoogleMaps();
  const google = (window as GoogleMapsWindow).google;
  if (!google) throw new Error("Google Maps indisponible.");
  if (!geometryLibrary) geometryLibrary = google.maps.importLibrary("geometry");
  return geometryLibrary;
}

export function getGoogleMapsNamespace() {
  const google = (window as GoogleMapsWindow).google;
  if (!google) throw new Error("Google Maps indisponible.");
  return google.maps;
}

export async function createAutocompleteSession() {
  const places = await getPlacesLibrary();
  return new places.AutocompleteSessionToken();
}

export async function fetchAddressSuggestions(input: string, sessionToken: unknown): Promise<PlacePrediction[]> {
  const places = await getPlacesLibrary();
  const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input,
    sessionToken,
    includedRegionCodes: ["fr"],
    language: "fr",
  });
  return suggestions
    .map((suggestion) => suggestion.placePrediction)
    .filter((prediction): prediction is PlacePrediction => prediction !== null);
}
