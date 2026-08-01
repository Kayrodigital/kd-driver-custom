"use client";

import { useEffect, useRef, useState } from "react";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";
import { defaultBookingDateTime } from "@/domain/booking/booking-defaults";
import type { PricingResult } from "@/domain/pricing/pricing-types";
import type { VehicleSlug } from "@/domain/pricing/vehicle-catalog";

export type WizardStep = 1 | 2 | 3 | 4 | 5;
export type VehicleOption = { category: string; pricing: PricingResult };

const PREFILL_KEY = "kd-booking-prefill";

type Prefill = { pickup: AddressValue; destination: AddressValue; date: string; time: string };

export function storeSearchPrefill(data: Prefill) {
  sessionStorage.setItem(PREFILL_KEY, JSON.stringify(data));
}

function readPrefill(): Prefill | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(PREFILL_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(PREFILL_KEY);
  try {
    return JSON.parse(raw) as Prefill;
  } catch {
    return null;
  }
}

function toIsoWithOffset(date: string, time: string): string | null {
  if (!date || !time) return null;
  const local = new Date(`${date}T${time}`);
  if (Number.isNaN(local.getTime())) return null;
  return local.toISOString();
}

function looksLikeAirport(value: string) { return /a[ée]roport|airport/i.test(value); }
function looksLikeStation(value: string) { return /\bgare\b|station/i.test(value); }

export function useBookingWizard() {
  // /reserver est une page statique (générée une fois au build) : la valeur
  // initiale de chaque champ doit être identique entre le HTML figé au build
  // et la première passe d'hydratation côté client, sinon React lève une
  // erreur d'hydratation (observée en production, #418) et peut désactiver
  // l'interactivité de la zone concernée. `new Date()` et sessionStorage ne
  // sont donc jamais lus dans un initializer : tout part d'un état neutre,
  // et seul un effet post-montage (strictement client) applique le préremplissage
  // ou la date/heure par défaut.
  const prefillConsumed = useRef(false);

  const [step, setStep] = useState<WizardStep>(1);

  const [firstAvailableTime, setFirstAvailableTime] = useState("");
  const [pickup, setPickup] = useState<AddressValue>(emptyAddress);
  const [destination, setDestination] = useState<AddressValue>(emptyAddress);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [route, setRoute] = useState<{ distanceMeters: number; durationSeconds: number } | null>(null);
  const [vehicleOptions, setVehicleOptions] = useState<VehicleOption[]>([]);
  const [vehicleSlug, setVehicleSlug] = useState<VehicleSlug | null>(null);

  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [childSeat, setChildSeat] = useState(false);
  const [pet, setPet] = useState(false);
  const [extraStop, setExtraStop] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [forSomeoneElse, setForSomeoneElse] = useState(false);
  const [otherFirstName, setOtherFirstName] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [submitBusy, setSubmitBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const isAirportTrip = looksLikeAirport(pickup.address) || looksLikeAirport(destination.address);
  const isStationTrip = looksLikeStation(pickup.address) || looksLikeStation(destination.address);

  const sameAddress = pickup.address.trim().toLowerCase() === destination.address.trim().toLowerCase() && pickup.address.trim().length > 0;
  const searchValid = pickup.address.length >= 3 && destination.address.length >= 3 && Boolean(date) && Boolean(time) && !sameAddress;

  async function submitSearch(overridePickup?: AddressValue, overrideDestination?: AddressValue) {
    const searchPickup = overridePickup ?? pickup;
    const searchDestination = overrideDestination ?? destination;
    if (searchPickup.address.length < 3 || searchDestination.address.length < 3) return;
    setSearchBusy(true); setSearchError("");
    try {
      const response = await fetch("/api/booking/options", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pickup: searchPickup, destination: searchDestination, isAirportTrip: looksLikeAirport(searchPickup.address) || looksLikeAirport(searchDestination.address) }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      setRoute(payload.route);
      setVehicleOptions(payload.options);
      setStep(2);
    } catch {
      setSearchError("Impossible de calculer ce trajet. Vérifiez les adresses.");
    } finally {
      setSearchBusy(false);
    }
  }

  // Effet post-montage strictement client : applique le préremplissage venu du
  // hero (s'il existe) ou, sinon, la date/heure par défaut (jour même,
  // premier créneau après le délai minimum). Ne s'exécute qu'une fois.
  // Ces valeurs dépendent de sessionStorage et de new Date(), indisponibles
  // (ou différentes) au build de cette page statique : elles ne peuvent
  // donc pas être posées avant le montage sans provoquer une erreur
  // d'hydratation (cf. commentaire plus haut, #418 constaté en production).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (prefillConsumed.current) return;
    prefillConsumed.current = true;
    const prefill = readPrefill();
    if (prefill) {
      setPickup(prefill.pickup);
      setDestination(prefill.destination);
      setDate(prefill.date);
      setTime(prefill.time);
      void submitSearch(prefill.pickup, prefill.destination);
      return;
    }
    const defaults = defaultBookingDateTime(new Date());
    setDate(defaults.date);
    setTime(defaults.time);
    setFirstAvailableTime(defaults.time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function selectVehicle(slug: VehicleSlug) {
    setVehicleSlug(slug);
    setStep(3);
  }

  function confirmOptions() {
    setStep(4);
  }

  const identificationValid = phone.trim().length >= 6 && termsAccepted;
  function confirmIdentification() {
    if (!identificationValid) return;
    setStep(5);
  }

  async function submitReservation() {
    const pickupAt = toIsoWithOffset(date, time);
    if (!pickupAt || !vehicleSlug) return;
    setSubmitBusy(true); setSubmitError("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          pickup, destination, pickupAt,
          vehicleSlug,
          passengers, luggage,
          childSeat, pet,
          extraStop: extraStop || undefined,
          flightNumber: flightNumber || undefined,
          trainNumber: trainNumber || undefined,
          bookingForSomeoneElse: forSomeoneElse ? { firstName: otherFirstName, phone: otherPhone } : undefined,
          customer: { firstName: firstName || undefined, email: email || undefined, phone },
          notes,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      sessionStorage.setItem(`reservation:${payload.reference}`, JSON.stringify(payload.summary));
      window.location.assign(`/reservation/confirmation/${payload.reference}`);
    } catch {
      setSubmitError("La demande n’a pas pu être envoyée. Réessayez.");
    } finally {
      setSubmitBusy(false);
    }
  }

  const selectedVehicleOption = vehicleOptions.find((option) => option.category === vehicleSlug) ?? null;

  return {
    step, setStep,
    pickup, setPickup, destination, setDestination, date, setDate, time, setTime,
    firstAvailableTime,
    searchBusy, searchError, searchValid, sameAddress, submitSearch,
    route, vehicleOptions, vehicleSlug, selectVehicle, selectedVehicleOption,
    passengers, setPassengers, luggage, setLuggage,
    childSeat, setChildSeat, pet, setPet,
    extraStop, setExtraStop, flightNumber, setFlightNumber, trainNumber, setTrainNumber,
    forSomeoneElse, setForSomeoneElse, otherFirstName, setOtherFirstName, otherPhone, setOtherPhone,
    notes, setNotes, confirmOptions,
    isAirportTrip, isStationTrip,
    firstName, setFirstName, email, setEmail, phone, setPhone,
    termsAccepted, setTermsAccepted, identificationValid, confirmIdentification,
    submitBusy, submitError, submitReservation,
  };
}
