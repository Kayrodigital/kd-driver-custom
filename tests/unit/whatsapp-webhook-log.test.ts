import { describe, expect, it } from "vitest";
import { maskMessageId, summarizeWebhookEvents } from "@/domain/webhooks/whatsapp-webhook-log";

describe("maskMessageId", () => {
  it("masque un identifiant long en ne gardant que le début et la fin", () => {
    const masked = maskMessageId("wamid.HBgLNjY2MDAwMDAwMDAVAgARGBI5QUY3MDBBRTQ4RUQ0RkYzOTUA");
    expect(masked).toBe("wami…OTUA");
    expect(masked).not.toContain("6660000000");
  });

  it("masque totalement un identifiant court plutôt que de l'exposer", () => {
    expect(maskMessageId("abc")).toBe("***");
  });
});

describe("summarizeWebhookEvents", () => {
  it("extrait un événement message_received avec identifiant masqué, sans autre champ", () => {
    const body = {
      entry: [
        {
          changes: [
            {
              value: {
                messages: [{ id: "wamid.ABCDEFGH1234", timestamp: "1735689600", from: "33612345678", text: { body: "Bonjour" } }],
              },
            },
          ],
        },
      ],
    };
    const events = summarizeWebhookEvents(body);
    expect(events).toHaveLength(1);
    expect(events[0].eventType).toBe("message_received");
    expect(events[0].maskedMessageId).toBeDefined();
    expect(JSON.stringify(events[0])).not.toContain("33612345678");
    expect(JSON.stringify(events[0])).not.toContain("Bonjour");
  });

  it("extrait un événement status_update avec le statut delivered", () => {
    const body = { entry: [{ changes: [{ value: { statuses: [{ id: "wamid.STATUS1234", status: "delivered", timestamp: "1735689600" }] } }] }] };
    const events = summarizeWebhookEvents(body);
    expect(events[0]).toMatchObject({ eventType: "status_update", status: "delivered" });
  });

  it("extrait un événement status_update avec le statut failed", () => {
    const body = { entry: [{ changes: [{ value: { statuses: [{ id: "wamid.FAIL1234", status: "failed", timestamp: "1735689600" }] } }] }] };
    const events = summarizeWebhookEvents(body);
    expect(events[0]).toMatchObject({ eventType: "status_update", status: "failed" });
  });

  it("retourne un événement unknown pour un payload sans champ entry", () => {
    expect(summarizeWebhookEvents({ foo: "bar" })).toEqual([{ eventType: "unknown", timestamp: expect.any(String) }]);
  });

  it("retourne un événement unknown pour un payload null", () => {
    expect(summarizeWebhookEvents(null)).toEqual([{ eventType: "unknown", timestamp: expect.any(String) }]);
  });

  it("ne lève jamais d'exception sur une structure entry/changes malformée", () => {
    expect(() => summarizeWebhookEvents({ entry: [{ changes: "not-an-array" }] })).not.toThrow();
    expect(() => summarizeWebhookEvents({ entry: "not-an-array" })).not.toThrow();
    expect(() => summarizeWebhookEvents({ entry: [{ changes: [{ value: null }] }] })).not.toThrow();
  });

  it("ne journalise jamais le numéro de téléphone même dans un cas limite (aucun id de message)", () => {
    const body = { entry: [{ changes: [{ value: { messages: [{ from: "33600000000", timestamp: "1735689600" }] } }] }] };
    const events = summarizeWebhookEvents(body);
    expect(JSON.stringify(events)).not.toContain("33600000000");
  });
});
