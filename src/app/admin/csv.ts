import { formatEuros } from "@/domain/pricing/money";
import { statusLabel } from "./status-labels";

export type CsvReservationRow = {
  publicReference: string;
  createdAt: string;
  pickupAt: string;
  status: string;
  archivedAt: string | null;
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  pickupAddress: string;
  destinationAddress: string;
  vehicleLabel: string | null;
  estimatedPriceCents: number | null;
  confirmedPriceCents: number | null;
  notes: string | null;
  passengers: number;
  luggage: number;
  assignedDriverName: string | null;
};

const CSV_HEADERS = [
  "Référence",
  "Date de création",
  "Date de course",
  "Statut",
  "Archivée",
  "Date d’archivage",
  "Nom client",
  "Téléphone",
  "E-mail",
  "Départ",
  "Destination",
  "Catégorie",
  "Tarif estimé",
  "Tarif confirmé",
  "Options",
  "Passagers",
  "Bagages",
  "Numéro de vol",
  "Chauffeur affecté",
];

/**
 * Le numéro de vol n'a pas de colonne dédiée en base — il est aplati dans
 * `notes` par composeNotes() (create-booking.ts), au format "Vol : XXXX".
 * Extraction ciblée sur ce format exact, jamais un champ structuré séparé.
 */
export function extractFlightNumber(notes: string | null): string {
  if (!notes) return "";
  const match = notes.match(/Vol\s*:\s*([^\s·—]+)/);
  return match ? match[1] : "";
}

/**
 * Neutralise l'injection CSV : toute cellule commençant par =, +, -, @ est
 * préfixée d'une apostrophe, qui force Excel/Sheets à la traiter comme du
 * texte plutôt que comme une formule.
 */
export function sanitizeCsvCell(value: string): string {
  if (/^[=+\-@]/.test(value)) return `'${value}`;
  return value;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(iso));
}

function quoteCsvField(value: string): string {
  const sanitized = sanitizeCsvCell(value);
  if (/[";\n\r]/.test(sanitized)) return `"${sanitized.replaceAll('"', '""')}"`;
  return sanitized;
}

export function buildReservationsCsvRow(row: CsvReservationRow): string[] {
  return [
    row.publicReference,
    formatDateTime(row.createdAt),
    formatDateTime(row.pickupAt),
    statusLabel(row.status),
    row.archivedAt ? "Oui" : "Non",
    formatDateTime(row.archivedAt),
    row.customerName ?? "",
    row.customerPhone ?? "",
    row.customerEmail ?? "",
    row.pickupAddress,
    row.destinationAddress,
    row.vehicleLabel ?? "",
    row.estimatedPriceCents !== null ? formatEuros(row.estimatedPriceCents) : "",
    row.confirmedPriceCents !== null ? formatEuros(row.confirmedPriceCents) : "",
    row.notes ?? "",
    String(row.passengers),
    String(row.luggage),
    extractFlightNumber(row.notes),
    row.assignedDriverName ?? "",
  ];
}

/**
 * Séparateur `;` + BOM UTF-8 : le couple le plus fiable pour qu'Excel FR
 * ouvre le fichier correctement par double-clic, sans casser Google Sheets
 * qui accepte les deux formats.
 */
const UTF8_BOM = "﻿";

export function buildReservationsCsv(rows: CsvReservationRow[]): string {
  const lines = [CSV_HEADERS, ...rows.map(buildReservationsCsvRow)].map((cells) => cells.map(quoteCsvField).join(";"));
  return UTF8_BOM + lines.join("\r\n");
}

export function csvFilename(now = new Date()): string {
  return `kdrive-reservations-${now.toISOString().slice(0, 10)}.csv`;
}
