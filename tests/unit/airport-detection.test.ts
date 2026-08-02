import { describe, expect, it } from "vitest";
import { detectAirportTrip } from "@/domain/booking/airport-detection";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";

const AIRPORT_PLACE_ID = "ChIJzYSfACvJ9EcR8FWyyQxR3IY";

function address(overrides: Partial<AddressValue>): AddressValue {
  return { ...emptyAddress, source: "autocomplete", ...overrides };
}

const airportByPlaceId = address({ address: "Aéroport Lyon Saint-Exupéry, 69125 Colombier-Saugnieu, France", placeId: AIRPORT_PLACE_ID });
const lyonCenter = address({ address: "Place Bellecour, 69002 Lyon, France", placeId: "ChIJs1rce1Pq9EcRRyCL9YWTnV0" });
const villeurbanne = address({ address: "4 Cours Tolstoï, 69100 Villeurbanne, France", placeId: "ChIJ-random-villeurbanne" });

describe("detectAirportTrip", () => {
  it("départ aéroport sans numéro de vol → détecté (place_id)", () => {
    expect(detectAirportTrip({ pickup: airportByPlaceId, destination: lyonCenter })).toBe(true);
  });

  it("destination aéroport sans numéro de vol → détecté (place_id)", () => {
    expect(detectAirportTrip({ pickup: lyonCenter, destination: airportByPlaceId })).toBe(true);
  });

  it("trajet aéroport avec numéro de vol → détecté (redondant, cohérent)", () => {
    expect(detectAirportTrip({ pickup: lyonCenter, destination: airportByPlaceId, flightNumber: "AF1234" })).toBe(true);
  });

  it("trajet standard avec numéro de vol incohérent → détecté par le seul signal complémentaire (limite connue et documentée)", () => {
    expect(detectAirportTrip({ pickup: lyonCenter, destination: villeurbanne, flightNumber: "AF1234" })).toBe(true);
  });

  it("trajet standard sans aucun signal → non détecté", () => {
    expect(detectAirportTrip({ pickup: lyonCenter, destination: villeurbanne })).toBe(false);
  });

  it("aéroport < 10 km (trajet court vers l'aéroport) → détecté malgré la distance courte", () => {
    // La distance n'entre pas dans detectAirportTrip lui-même (responsabilité du moteur tarifaire) ;
    // on vérifie ici que la détection ne dépend en rien de la distance du trajet.
    expect(detectAirportTrip({ pickup: address({ address: "Colombier-Saugnieu centre", placeId: AIRPORT_PLACE_ID }), destination: lyonCenter })).toBe(true);
  });

  it("aéroport > 30 km → toujours détecté (la distance ne change rien à la détection)", () => {
    expect(detectAirportTrip({ pickup: villeurbanne, destination: airportByPlaceId })).toBe(true);
  });

  it("standard 30 km sans signal aéroport → non détecté", () => {
    expect(detectAirportTrip({ pickup: lyonCenter, destination: villeurbanne })).toBe(false);
  });

  it.each([
    "Saint-Exupéry",
    "saint exupery",
    "SAINT-EXUPERY",
    "Aéroport Lyon Saint-Exupéry, 69125 Colombier-Saugnieu",
    "colombier-saugnieu",
  ])("alias texte reconnu sans accents/casse : %s", (text) => {
    expect(detectAirportTrip({ pickup: lyonCenter, destination: address({ address: text, placeId: null }) })).toBe(true);
  });

  it("faux positif évité : une adresse contenant seulement le mot « aéroport » sans alias reconnu n'est pas détectée", () => {
    const fakeAirportStreet = address({ address: "15 Rue de l'Aéroport, 69100 Villeurbanne, France", placeId: null });
    expect(detectAirportTrip({ pickup: lyonCenter, destination: fakeAirportStreet })).toBe(false);
  });

  it("le type explicite, si fourni, est prioritaire sur le numéro de vol", () => {
    expect(detectAirportTrip({ pickup: lyonCenter, destination: villeurbanne, explicitTripType: "standard", flightNumber: "AF1234" })).toBe(false);
    expect(detectAirportTrip({ pickup: lyonCenter, destination: villeurbanne, explicitTripType: "airport" })).toBe(true);
  });
});
