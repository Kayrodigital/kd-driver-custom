/**
 * Toute date affichée sur ce site concerne une activité à Lyon — jamais le
 * fuseau du serveur qui l'exécute. Sans `timeZone` explicite,
 * `Intl.DateTimeFormat` retombe sur le fuseau du runtime : correct par
 * accident côté navigateur (fuseau du visiteur), mais faux côté serveur
 * (Vercel exécute en UTC), d'où un décalage de 1 à 2 h selon l'heure d'été
 * observé en production (ex. 6h45 réel affiché 4h45). `Europe/Paris` suit
 * automatiquement les changements d'heure française — jamais un décalage
 * fixe comme "+02:00", qui casserait à chaque changement d'heure.
 */
export function formatDateTimeParis(iso: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("fr-FR", { ...options, timeZone: "Europe/Paris" }).format(new Date(iso));
}
