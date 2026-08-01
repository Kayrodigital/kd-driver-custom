"use client";

import { useEffect, useRef, useState } from "react";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";
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
  const [prefill] = useState(() => readPrefill());
  const prefillConsumed = useRef(false);

  const [step, setStep] = useState<WizardStep>(1);

  const [pickup, setPickup] = useState<AddressValue>(prefill?.pickup ?? emptyAddress);
  const [destination, setDestination] = useState<AddressValue>(prefill?.destination ?? emptyAddress);
  const [date, setDate] = useState(prefill?.date ?? "");
  const [time, setTime] = useState(prefill?.time ?? "");
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

  async function submitSearch() {
    if (!searchValid) return;
    setSearchBusy(true); setSearchError("");
    try {
      const response = await fetch("/api/booking/options", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pickup, destination, isAirportTrip }),
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

  useEffect(() => {
    if (!prefill || prefillConsumed.current) return;
    prefillConsumed.current = true;
    void submitSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
