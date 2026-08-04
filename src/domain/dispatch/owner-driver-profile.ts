/**
 * Profil du propriétaire lorsqu'il réalise lui-même la course (Parcours A).
 * Aucune flotte réelle n'est confirmée à ce jour (cf.
 * docs/CLIENT_CONTENT_VALIDATION.md point 4) : les champs restent vides
 * plutôt que d'afficher une plaque ou un véhicule fictif sur un document
 * remis au client.
 */
export type OwnerDriverProfile = {
  name: string | null;
  vehicle: string | null;
  phone: string | null;
};

export function getOwnerDriverProfile(): OwnerDriverProfile {
  return {
    name: process.env.KD_OWNER_DRIVER_NAME || null,
    vehicle: process.env.KD_OWNER_DRIVER_VEHICLE || null,
    phone: process.env.NEXT_PUBLIC_KD_DRIVER_PHONE || null,
  };
}
