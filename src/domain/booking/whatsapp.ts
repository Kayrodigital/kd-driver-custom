/**
 * Normalisation des numéros de téléphone pour les liens wa.me.
 *
 * Le formulaire client n'impose aucun format (voir booking-schema.ts,
 * simple chaîne 6-30 caractères) : un client français tape le plus souvent
 * un numéro local ("06 12 34 56 78" ou "0612345678"). Le code précédent
 * (`phone.replace(/[^\d]/g, "")`) ne faisait que retirer les caractères non
 * numériques sans jamais ajouter l'indicatif pays ni retirer le 0 initial,
 * produisant un lien wa.me invalide ("0612345678" au lieu de "33612345678")
 * — cause probable du "Ce lien n'a pas pu être ouvert" observé sur WhatsApp,
 * qui refuse un numéro sans indicatif pays valide.
 */
export function normalizePhoneForWhatsApp(
  rawPhone: string | null | undefined,
  defaultCountryCode: string = "33",
): string | null {
  if (!rawPhone) return null;

  // "+33 (0)6 12 34 56 78" : le "(0)" est une convention d'affichage du
  // trunk code français, à retirer avant de compter les chiffres restants
  // (sinon son "0" se retrouve mélangé aux chiffres du numéro).
  const withoutTrunkHint = rawPhone.trim().replace(/\(0\)/g, "");
  if (withoutTrunkHint.length === 0) return null;

  // On n'accepte que des séparateurs de présentation usuels (espace, point,
  // tiret, parenthèses vides déjà retirées ci-dessus) et un "+" initial.
  // Toute lettre ou caractère inattendu rend le numéro invalide plutôt que
  // d'être silencieusement ignoré.
  const cleaned = withoutTrunkHint.replace(/[\s.\-]/g, "");
  if (!/^\+?\d+$/.test(cleaned)) return null;

  const hasPlusPrefix = cleaned.startsWith("+");
  let digits = cleaned.replace(/^\+/, "");
  if (digits.length === 0) return null;

  if (hasPlusPrefix) {
    // Déjà au format international ("+33 6 12 34 56 78" -> "33612345678").
  } else if (digits.startsWith("00")) {
    // Préfixe international composé ("0033612345678" -> "33612345678").
    digits = digits.slice(2);
  } else if (digits.startsWith("0") && digits.length === 10) {
    // Numéro local à 10 chiffres ("0612345678" -> "33612345678" par défaut).
    digits = `${defaultCountryCode}${digits.slice(1)}`;
  }
  // Sinon : on suppose que l'indicatif pays est déjà présent (ex. un
  // utilisateur qui a saisi "33612345678" directement), on ne le retire pas.

  // Un numéro E.164 fait entre 8 et 15 chiffres (indicatif compris). En
  // dehors de cette plage, le lien wa.me serait de toute façon invalide :
  // on retourne null plutôt que de générer une URL cassée silencieusement.
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

/** Lien WhatsApp vers un contact précis : https://wa.me/{numero}?text=... */
export function buildWhatsAppContactUrl({
  phone, message, defaultCountryCode = "33",
}: { phone: string | null | undefined; message: string; defaultCountryCode?: string }): string | null {
  const digits = normalizePhoneForWhatsApp(phone, defaultCountryCode);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * Lien de partage WhatsApp sans destinataire fixé : ouvre le sélecteur de
 * conversation/contact/groupe de l'utilisateur (utile pour "partager dans
 * le groupe chauffeurs", où KDRIVE choisit le groupe au moment du partage).
 */
export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
