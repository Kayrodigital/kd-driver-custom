type PlaceLike = {
  id?: string;
  formattedAddress?: string;
  location?: { lat(): number; lng(): number };
  fetchFields(options: { fields: string[] }): Promise<void>;
};

type PlacePrediction = { toPlace(): PlaceLike };
export type PlaceSelectEvent = Event & { placePrediction: PlacePrediction };

export type PlaceAutocompleteLike = HTMLElement & {
  value: string;
  placeholder: string;
  includedRegionCodes: string[];
};

type GoogleMapsWindow = Window & {
  google?: {
    maps: {
      importLibrary(name: "places"): Promise<{
        PlaceAutocompleteElement: new () => PlaceAutocompleteLike;
      }>;
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

export async function createAutocomplete() {
  await loadGoogleMaps();
  const google = (window as GoogleMapsWindow).google;
  if (!google) throw new Error("Google Maps indisponible.");
  const { PlaceAutocompleteElement } = await google.maps.importLibrary("places");
  return new PlaceAutocompleteElement();
}
