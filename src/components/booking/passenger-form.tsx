"use client";

import { useState } from "react";
import type { PassengerData } from "./booking-types";

export function PassengerForm({ onBack, onSubmit, busy }: { onBack(): void; onSubmit(data: PassengerData): void; busy: boolean }) {
  const [data, setData] = useState<PassengerData>({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  function field(key: keyof PassengerData, label: string, type = "text") { return <label>{label}<input type={type} value={data[key]} onChange={(event) => setData({ ...data, [key]: event.target.value })} required={key !== "notes"} /></label>; }
  const valid = data.firstName && data.lastName && data.email && data.phone;
  return <section className="flow-section"><p className="eyebrow">Étape 3</p><h1>Informations passager</h1><div className="grid-two">{field("firstName", "Prénom")}{field("lastName", "Nom")}</div>{field("email", "E-mail", "email")}{field("phone", "Téléphone", "tel")}<label>Note facultative<textarea value={data.notes} maxLength={1000} onChange={(event) => setData({ ...data, notes: event.target.value })} /></label><p className="notice">Le trajet, la distance et le tarif seront recalculés côté serveur lors de la confirmation.</p><div className="actions"><button className="secondary" onClick={onBack}>Retour</button><button onClick={() => onSubmit(data)} disabled={!valid || busy}>{busy ? "Enregistrement…" : "Confirmer la réservation"}</button></div></section>;
}
