import { describe, expect, it } from "vitest";
import { buildWhatsAppContactUrl } from "@/domain/booking/whatsapp";
import { formatEuros } from "@/domain/pricing/money";

/**
 * Réplique exacte de whatsappLink() dans src/app/admin/reservations/[id]/page.tsx
 * (fonction privée, non exportée) : c'est le vrai flux métier — Karamba
 * contacte le client depuis la fiche admin — contrairement au bouton de la
 * page de confirmation client (destiné à joindre KDRIVE, numéro fixe).
 * `phone` ici est le téléphone du client tel que saisi dans le formulaire de
 * réservation (texte libre 6-30 caractères, aucun format imposé).
 */
function buildAdminWhatsappLink(reservation: {
  public_reference: string;
  pickup_at: string;
  pickup_address: string;
  destination_address: string;
  confirmed_price_cents: number | null;
}, phone: string): string | null {
  const when = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" }).format(new Date(reservation.pickup_at));
  let message = `Bonjour, votre demande KDRIVE ${reservation.public_reference} pour le trajet ${reservation.pickup_address} → ${reservation.destination_address} le ${when} a bien été reçue.`;
  if (reservation.confirmed_price_cents !== null) {
    message += ` Le tarif confirmé est de ${formatEuros(reservation.confirmed_price_cents)}.`;
  }
  return buildWhatsAppContactUrl({ phone, message });
}

const sampleReservation = {
  public_reference: "KD-2026-00842",
  pickup_at: "2026-08-02T13:45:00+02:00",
  pickup_address: "12 quai Perrache, 69002 Lyon",
  destination_address: "Aéroport Lyon-Saint Exupéry",
  confirmed_price_cents: 4500,
};

describe("bouton WhatsApp admin (fiche réservation, Karamba -> client)", () => {
  it("numéro client saisi au format local (06 ..) : href correct, un seul ?, un seul text=", () => {
    const url = buildAdminWhatsappLink(sampleReservation, "06 12 34 56 78");
    expect(url).toContain("https://wa.me/33612345678?text=");
    expect(url?.match(/\?/g)?.length).toBe(1);
    expect(url?.match(/text=/g)?.length).toBe(1);
    expect(url).not.toContain("+");
    expect(url).not.toContain(" ");
    expect(url).not.toContain("undefined");
    expect(url).not.toContain("null");
  });

  it("numéro client saisi avec l'indicatif ET le 0 initial conservés par erreur : corrigé, jamais 12 chiffres", () => {
    const url = buildAdminWhatsappLink(sampleReservation, "+330612345678");
    expect(url).toContain("https://wa.me/33612345678?text=");
    expect(url).not.toContain("330612345678");
  });

  it("le message contient bien la référence, le trajet et le tarif confirmé, encodés une seule fois", () => {
    const url = buildAdminWhatsappLink(sampleReservation, "0612345678")!;
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("KD-2026-00842");
    expect(decoded).toContain("12 quai Perrache, 69002 Lyon");
    expect(decoded).toContain("Aéroport Lyon-Saint Exupéry");
    expect(decoded).toContain(formatEuros(4500));
    expect(url).not.toContain("%2520");
    expect(url).not.toContain("%25E2");
  });

  it("sans tarif confirmé, aucune mention de tarif ajoutée (pas de 'undefined €')", () => {
    const url = buildAdminWhatsappLink({ ...sampleReservation, confirmed_price_cents: null }, "0612345678")!;
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).not.toContain("tarif confirmé");
    expect(decoded).not.toContain("undefined");
  });

  it("numéro client invalide (texte libre non numérique) : lien absent plutôt que cassé", () => {
    expect(buildAdminWhatsappLink(sampleReservation, "à préciser")).toBeNull();
  });
});
