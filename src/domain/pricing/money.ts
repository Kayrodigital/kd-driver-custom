export function eurosToCents(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError("Le montant doit être un nombre positif fini.");
  }

  return Math.round(value * 100);
}
export function formatEuros(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
