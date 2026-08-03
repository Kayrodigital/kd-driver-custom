import { describe, expect, it } from "vitest";
import { buildWhatsappLink, normalizePhoneForWhatsapp } from "@/domain/booking/whatsapp";

describe("normalizePhoneForWhatsapp", () => {
  it("convertit un numéro français local à 10 chiffres avec le 0 initial", () => {
    expect(normalizePhoneForWhatsapp("0612345678")).toBe("33612345678");
  });

  it("supprime les espaces d'un numéro français local", () => {
    expect(normalizePhoneForWhatsapp("06 12 34 56 78")).toBe("33612345678");
  });

  it("supprime les points et tirets", () => {
    expect(normalizePhoneForWhatsapp("06.12.34.56.78")).toBe("33612345678");
    expect(normalizePhoneForWhatsapp("06-12-34-56-78")).toBe("33612345678");
  });

  it("garde un numéro déjà au format international avec +", () => {
    expect(normalizePhoneForWhatsapp("+33612345678")).toBe("33612345678");
    expect(normalizePhoneForWhatsapp("+33 6 12 34 56 78")).toBe("33612345678");
  });

  it("convertit un préfixe international composé 00", () => {
    expect(normalizePhoneForWhatsapp("0033612345678")).toBe("33612345678");
  });

  it("supprime les parenthèses", () => {
    expect(normalizePhoneForWhatsapp("+33 (0)6 12 34 56 78")).toBe("33612345678");
  });

  it("garde un numéro déjà sans 0 initial ni + s'il ressemble à un indicatif+numéro", () => {
    expect(normalizePhoneForWhatsapp("33612345678")).toBe("33612345678");
  });

  it("gère un numéro fixe français à 10 chiffres (01)", () => {
    expect(normalizePhoneForWhatsapp("0142345678")).toBe("33142345678");
  });

  it("retourne null pour une chaîne vide ou sans chiffre", () => {
    expect(normalizePhoneForWhatsapp("")).toBeNull();
    expect(normalizePhoneForWhatsapp("abc")).toBeNull();
  });

  it("retourne null pour un numéro trop court pour être un E.164 valide", () => {
    expect(normalizePhoneForWhatsapp("1234")).toBeNull();
  });

  it("retourne null pour un numéro trop long", () => {
    expect(normalizePhoneForWhatsapp("123456789012345678")).toBeNull();
  });
});

describe("buildWhatsappLink", () => {
  it("construit une URL wa.me avec le numéro normalisé et le message encodé", () => {
    const link = buildWhatsappLink("06 12 34 56 78", "Bonjour KDRIVE");
    expect(link).toBe("https://wa.me/33612345678?text=Bonjour%20KDRIVE");
  });

  it("retourne null si le numéro ne peut pas être normalisé", () => {
    expect(buildWhatsappLink("abc", "Bonjour")).toBeNull();
  });
});
