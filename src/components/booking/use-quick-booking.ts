"use client";

import { useState } from "react";
import { emptyAddress, type AddressValue } from "@/domain/booking/address";

export type RequestType = "estimate" | "callback";

function toIsoWithOffset(date: string, time: string): string | null {
  if (!date || !time) return null;
  const local = new Date(`${date}T${time}`);
  if (Number.isNaN(local.getTime())) return null;
  return local.toISOString();
}

export function useQuickBooking() {
  const [pickup, setPickup] = useState<AddressValue>(emptyAddress);
  const [destination, setDestination] = useState<AddressValue>(emptyAddress);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("estimate");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const valid = pickup.address.length >= 3 && destination.address.length >= 3 && Boolean(date) && Boolean(time) && phone.trim().length >= 6;

  async function submit() {
    const pickupAt = toIsoWithOffset(date, time);
    if (!valid || !pickupAt) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          pickup,
          destination,
          pickupAt,
          requestType,
          passengers,
          luggage,
          customer: { firstName: firstName || undefined, email: email || undefined, phone },
          notes,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      sessionStorage.setItem(`reservation:${payload.reference}`, JSON.stringify(payload.summary));
      window.location.assign(`/reservation/confirmation/${payload.reference}`);
    } catch {
      setError("La demande n’a pas pu être envoyée. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return {
    pickup, setPickup,
    destination, setDestination,
    date, setDate,
    time, setTime,
    requestType, setRequestType,
    firstName, setFirstName,
    email, setEmail,
    phone, setPhone,
    passengers, setPassengers,
    luggage, setLuggage,
    notes, setNotes,
    busy, error, valid,
    submit,
  };
}
