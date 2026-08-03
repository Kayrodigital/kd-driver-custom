import { describe, expect, it } from "vitest";
import { buildWhatsAppContactUrl, buildWhatsAppShareUrl, normalizePhoneForWhatsApp } from "@/domain/booking/whatsapp";

describe("normalizePhoneForWhatsApp", () => {
  it("06 - numéro local à 10 chiffres", () => {
    expect(normalizePhoneForWhatsApp("06 88 86 34 19")).toBe("33688863419");
  });

  it("07 - numéro local mobile à 10 chiffres", () => {
    expect(normalizePhoneForWhatsApp("07 88 86 34 19")).toBe("33788863419");
  });

  it("+33 avec espaces", () => {
    expect(normalizePhoneForWhatsApp("+33 6 88 86 34 19")).toBe("33688863419");
  });

  it("0033 préfixe international composé", () => {
    expect(normalizePhoneForWhatsApp("0033 6 88 86 34 19")).toBe("33688863419");
  });

  it("déjà normalisé (33 sans +)", () => {
    expect(normalizePhoneForWhatsApp("33688863419")).toBe("33688863419");
  });

  it("points comme séparateurs", () => {
    expect(normalizePhoneForWhatsApp("06.88.86.34.19")).toBe("33688863419");
  });

  it("tirets comme séparateurs", () => {
    expect(normalizePhoneForWhatsApp("06-88-86-34-19")).toBe("33688863419");
  });

  it("parenthèses (0) convention d'affichage international", () => {
    expect(normalizePhoneForWhatsApp("+33 (0)6 88 86 34 19")).toBe("33688863419");
  });

  it("defaultCountryCode paramétrable (Belgique)", () => {
    expect(normalizePhoneForWhatsApp("0488123456", "32")).toBe("32488123456");
  });

  it("rejette une chaîne vide", () => {
    expect(normalizePhoneForWhatsApp("")).toBeNull();
  });

  it("rejette undefined et null", () => {
    expect(normalizePhoneForWhatsApp(undefined)).toBeNull();
    expect(normalizePhoneForWhatsApp(null)).toBeNull();
  });

  it("rejette un numéro contenant des lettres", () => {
    expect(normalizePhoneForWhatsApp("06AB863419")).toBeNull();
    expect(normalizePhoneForWhatsApp("abc")).toBeNull();
  });

  it("rejette un numéro trop court", () => {
    expect(normalizePhoneForWhatsApp("1234")).toBeNull();
  });

  it("rejette un numéro trop long", () => {
    expect(normalizePhoneForWhatsApp("123456789012345678")).toBeNull();
  });
});

describe("buildWhatsAppContactUrl", () => {
  it("construit une URL wa.me avec le numéro normalisé et le message encodé", () => {
    const url = buildWhatsAppContactUrl({ phone: "06 88 86 34 19", message: "Bonjour KDRIVE" });
    expect(url).toBe("https://wa.me/33688863419?text=Bonjour%20KDRIVE");
  });

  it("retourne null si le numéro ne peut pas être normalisé", () => {
    expect(buildWhatsAppContactUrl({ phone: "abc", message: "Bonjour" })).toBeNull();
    expect(buildWhatsAppContactUrl({ phone: "", message: "Bonjour" })).toBeNull();
    expect(buildWhatsAppContactUrl({ phone: undefined, message: "Bonjour" })).toBeNull();
  });

  it("encode correctement les accents", () => {
    const url = buildWhatsAppContactUrl({ phone: "0688863419", message: "Réservation confirmée à Lyon" });
    expect(url).toContain(encodeURIComponent("Réservation confirmée à Lyon"));
  });

  it("encode correctement les apostrophes", () => {
    const url = buildWhatsAppContactUrl({ phone: "0688863419", message: "N'hésitez pas à nous contacter" });
    expect(url).toContain(encodeURIComponent("N'hésitez pas à nous contacter"));
  });

  it("encode correctement le symbole €", () => {
    const url = buildWhatsAppContactUrl({ phone: "0688863419", message: "Tarif : 45 €" });
    expect(url).toContain(encodeURIComponent("Tarif : 45 €"));
    expect(url).toContain("%E2%82%AC");
  });

  it("encode correctement les retours à la ligne", () => {
    const url = buildWhatsAppContactUrl({ phone: "0688863419", message: "Ligne 1\nLigne 2" });
    expect(url).toContain("%0A");
  });

  it("encode correctement &, ?, #", () => {
    const url = buildWhatsAppContactUrl({ phone: "0688863419", message: "Aller & retour ? #urgent" });
    expect(url).toContain("%26");
    expect(url).toContain("%3F");
    expect(url).toContain("%23");
  });
});

describe("buildWhatsAppShareUrl", () => {
  it("construit un lien de partage sans destinataire", () => {
    const url = buildWhatsAppShareUrl("Course disponible");
    expect(url).toBe("https://wa.me/?text=Course%20disponible");
  });

  it("n'exige aucun numéro de téléphone", () => {
    expect(() => buildWhatsAppShareUrl("Message sans destinataire")).not.toThrow();
    expect(buildWhatsAppShareUrl("")).toBe("https://wa.me/?text=");
  });

  it("encode correctement un message complexe (accents, €, &, retours à la ligne)", () => {
    const message = "Course à 45 € — départ 13h45\nAller & retour ?";
    const url = buildWhatsAppShareUrl(message);
    expect(url).toBe(`https://wa.me/?text=${encodeURIComponent(message)}`);
  });
});
