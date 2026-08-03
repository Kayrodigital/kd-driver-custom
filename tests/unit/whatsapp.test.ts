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

  describe("régression : double indicatif (bug NO-GO)", () => {
    it("+33 6 12 34 56 78 -> 33612345678", () => {
      expect(normalizePhoneForWhatsApp("+33 6 12 34 56 78")).toBe("33612345678");
    });
    it("0033 6 12 34 56 78 -> 33612345678", () => {
      expect(normalizePhoneForWhatsApp("0033 6 12 34 56 78")).toBe("33612345678");
    });
    it("33 6 12 34 56 78 -> 33612345678", () => {
      expect(normalizePhoneForWhatsApp("33 6 12 34 56 78")).toBe("33612345678");
    });
    it("33612345678 -> 33612345678 (déjà normalisé)", () => {
      expect(normalizePhoneForWhatsApp("33612345678")).toBe("33612345678");
    });
    it("+33612345678 -> 33612345678", () => {
      expect(normalizePhoneForWhatsApp("+33612345678")).toBe("33612345678");
    });
    it("00336 12 34 56 78 -> 33612345678", () => {
      expect(normalizePhoneForWhatsApp("00336 12 34 56 78")).toBe("33612345678");
    });
    it("+330612345678 (indicatif ET 0 initial conservés par erreur) -> 33612345678, jamais 3330612345678", () => {
      const result = normalizePhoneForWhatsApp("+330612345678");
      expect(result).toBe("33612345678");
      expect(result).not.toBe("3330612345678");
      expect(result).not.toContain("330612345678");
    });
    it("0033 0612345678 (préfixe 00 composé + 0 initial conservé) -> 33612345678", () => {
      expect(normalizePhoneForWhatsApp("00330612345678")).toBe("33612345678");
    });
    it("aucun résultat ne fait plus de 11 chiffres pour un numéro français", () => {
      const cases = ["06 12 34 56 78", "+33612345678", "0033612345678", "+330612345678", "00330612345678"];
      for (const c of cases) {
        const result = normalizePhoneForWhatsApp(c);
        expect(result).toBe("33612345678");
        expect(result?.length).toBe(11);
        expect(result?.startsWith("33")).toBe(true);
        expect(result?.startsWith("3333")).toBe(false);
        expect(result?.startsWith("330")).toBe(false);
      }
    });
  });

  describe("garde-fou : une URL complète n'est jamais un numéro", () => {
    it("rejette une valeur qui est déjà un lien wa.me complet", () => {
      expect(normalizePhoneForWhatsApp("https://wa.me/33612345678")).toBeNull();
    });
    it("rejette une valeur contenant tel: ou un texte parasite", () => {
      expect(normalizePhoneForWhatsApp("tel:+33612345678")).toBeNull();
      expect(normalizePhoneForWhatsApp("Tel: 06 12 34 56 78")).toBeNull();
    });
    it("rejette une valeur avec des guillemets résiduels (erreur de copier-coller de variable d'env)", () => {
      expect(normalizePhoneForWhatsApp('"+33612345678"')).toBeNull();
    });
    it("tolère un retour à la ligne parasite en début/fin (trim), sans le confondre avec un chiffre", () => {
      expect(normalizePhoneForWhatsApp("+33612345678\n")).toBe("33612345678");
      expect(normalizePhoneForWhatsApp("\n+33612345678")).toBe("33612345678");
    });
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

describe("buildWhatsAppContactUrl — test en escalier (numéro seul -> Bonjour -> message complet)", () => {
  const testDigits = "33612345678"; // numéro de test synthétique, jamais le vrai secret Vercel

  it("étape 1 : numéro seul, aucun paramètre text", () => {
    const url = buildWhatsAppContactUrl({ phone: "+330612345678", message: "" });
    expect(url).toBe(`https://wa.me/${testDigits}?text=`);
  });

  it("étape 2 : numéro + 'Bonjour'", () => {
    const url = buildWhatsAppContactUrl({ phone: "+330612345678", message: "Bonjour" });
    expect(url).toBe(`https://wa.me/${testDigits}?text=Bonjour`);
  });

  it("étape 3 : message complet (accents, flèche, €, retour ligne, référence)", () => {
    const message = "Bonjour, votre demande KDRIVE KD-2026-00842 pour le trajet Lyon → Aéroport le 08/02/2026 a bien été reçue. Tarif : 45 €.";
    const url = buildWhatsAppContactUrl({ phone: "+330612345678", message });
    expect(url).toBe(`https://wa.me/${testDigits}?text=${encodeURIComponent(message)}`);
    // un seul point d'interrogation, un seul paramètre text
    expect(url?.match(/\?/g)?.length).toBe(1);
    expect(url?.match(/text=/g)?.length).toBe(1);
  });

  it("aucun double encodage (pas de %2520, %25E2, %250A)", () => {
    const message = "Ligne 1\nLigne 2 — 45 €, N'hésitez pas à répondre.";
    const url = buildWhatsAppContactUrl({ phone: "+330612345678", message })!;
    expect(url).not.toContain("%2520");
    expect(url).not.toContain("%25E2");
    expect(url).not.toContain("%250A");
    expect(url).not.toContain("undefined");
    expect(url).not.toContain("null");
    expect(url).not.toContain("+");
    expect(url).not.toContain(" ");
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
