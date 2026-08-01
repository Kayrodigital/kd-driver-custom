export const statusLabels: Record<string, string> = {
  new: "Nouvelle",
  quote_requested: "Devis demandé",
  contacted: "Contactée",
  confirmed: "Confirmée",
  completed: "Terminée",
  cancelled: "Annulée",
};

export function statusLabel(status: string): string {
  return statusLabels[status] ?? status;
}

export function statusPillClassName(status: string): string {
  return `kd-status-pill kd-status-pill--${status}`;
}

export const statusFilterOptions = Object.entries(statusLabels);
