export type ReverseGeocodeResult = { address: string; placeId: string };

export async function reverseGeocode(latitude: number, longitude: number, apiKey: string, fetcher: typeof fetch = fetch): Promise<ReverseGeocodeResult> {
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("latlng", `${latitude},${longitude}`);
  url.searchParams.set("language", "fr"); url.searchParams.set("region", "fr"); url.searchParams.set("key", apiKey);
  const response = await fetcher(url, { cache: "no-store" });
  const data = await response.json() as { status: string; results?: { formatted_address: string; place_id: string }[] };
  const result = data.results?.[0];
  if (!response.ok || data.status !== "OK" || !result) throw new RangeError("Aucune adresse trouvée.");
  return { address: result.formatted_address, placeId: result.place_id };
}
