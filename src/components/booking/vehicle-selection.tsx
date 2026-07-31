"use client";

import { formatEuros } from "@/domain/pricing/money";
import type { SearchResult, VehicleOption } from "./booking-types";

const labels: Record<string, string> = { berline: "Berline", confort: "Confort", luxe: "Luxe", van: "Van", monospace: "Monospace" };

export function VehicleSelection({ result, selected, onSelect, onBack, onContinue }: { result: SearchResult; selected: VehicleOption | null; onSelect(option: VehicleOption): void; onBack(): void; onContinue(): void }) {
  return <section className="flow-section"><p className="eyebrow">Étape 2</p><h1>Choisir un véhicule</h1><p className="route-meta">{(result.route.distanceMeters / 1000).toFixed(1)} km · environ {Math.ceil(result.route.durationSeconds / 60)} min</p><div className="vehicle-list">{result.options.map((option) => <button type="button" className={`vehicle-card ${selected?.category === option.category ? "selected" : ""}`} onClick={() => onSelect(option)} key={option.category}><span><strong>{labels[option.category]}</strong><small>{option.pricing.mode === "quote" ? "Confirmation manuelle" : "Tarif estimé"}</small></span><b>{option.pricing.mode === "quote" ? "Sur devis" : formatEuros(option.pricing.totalCents ?? 0)}</b></button>)}</div><div className="actions"><button className="secondary" onClick={onBack}>Retour</button><button onClick={onContinue} disabled={!selected}>Continuer</button></div></section>;
}
