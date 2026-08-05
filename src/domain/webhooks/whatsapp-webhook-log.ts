/**
 * Résumé des événements webhook WhatsApp Cloud API destiné uniquement à la
 * journalisation. Liste blanche stricte de champs (type d'événement,
 * horodatage, identifiant de message masqué, statut) — jamais l'access
 * token, l'app secret, le verify token, le téléphone complet ou le contenu
 * du message, même si le payload Meta les contient. Le filtrage se fait ici
 * (à la source), pas seulement au niveau de l'affichage.
 */
export type WebhookLogEntry = {
  eventType: "message_received" | "status_update" | "unknown";
  timestamp: string;
  maskedMessageId?: string;
  status?: string;
};

export function maskMessageId(id: string): string {
  if (id.length <= 8) return "***";
  return `${id.slice(0, 4)}…${id.slice(-4)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function toEpochIso(value: unknown): string {
  if (typeof value === "string" && /^\d+$/.test(value)) return new Date(Number(value) * 1000).toISOString();
  if (typeof value === "number") return new Date(value * 1000).toISOString();
  return nowIso();
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

/**
 * Extrait uniquement les champs autorisés à partir d'un payload webhook
 * WhatsApp Cloud API brut. Ne lance jamais d'exception sur un payload
 * inattendu — retourne une liste d'événements "unknown" plutôt que de
 * planter la route (Meta doit toujours recevoir un 200 rapide).
 */
export function summarizeWebhookEvents(body: unknown): WebhookLogEntry[] {
  if (!isRecord(body) || !Array.isArray(body.entry)) return [{ eventType: "unknown", timestamp: nowIso() }];

  const entries: WebhookLogEntry[] = [];

  for (const entry of body.entry) {
    if (!isRecord(entry) || !Array.isArray(entry.changes)) continue;

    for (const change of entry.changes) {
      if (!isRecord(change) || !isRecord(change.value)) continue;
      const value = change.value;

      const messages = Array.isArray(value.messages) ? value.messages : [];
      for (const message of messages) {
        if (!isRecord(message)) continue;
        const id = typeof message.id === "string" ? message.id : null;
        entries.push({
          eventType: "message_received",
          timestamp: toEpochIso(message.timestamp),
          ...(id ? { maskedMessageId: maskMessageId(id) } : {}),
        });
      }

      const statuses = Array.isArray(value.statuses) ? value.statuses : [];
      for (const statusEntry of statuses) {
        if (!isRecord(statusEntry)) continue;
        const id = typeof statusEntry.id === "string" ? statusEntry.id : null;
        const status = typeof statusEntry.status === "string" ? statusEntry.status : undefined;
        entries.push({
          eventType: "status_update",
          timestamp: toEpochIso(statusEntry.timestamp),
          ...(id ? { maskedMessageId: maskMessageId(id) } : {}),
          ...(status ? { status } : {}),
        });
      }
    }
  }

  return entries.length > 0 ? entries : [{ eventType: "unknown", timestamp: nowIso() }];
}
