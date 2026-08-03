/**
 * Configuration du futur menu principal, une fois les pages hub créées
 * (voir docs/SEO_SILO_ARCHITECTURE.md).
 *
 * IMPORTANT : ce fichier n'est PAS importé par le SiteNav réel
 * (src/app/design-preview/sections.tsx). Plusieurs routes ci-dessous
 * (/services, /destinations, /stations-de-ski, /lyon-metropole et ses
 * sous-pages) n'existent pas encore. Le rendre actif dans le menu
 * afficherait des liens morts en production. À activer route par route,
 * au fur et à mesure que chaque page hub est réellement créée — jamais
 * en bloc.
 */

export type FutureMenuItem = {
  label: string;
  href: string;
  exists: boolean;
  children?: FutureMenuItem[];
};

export const futureMainMenu: FutureMenuItem[] = [
  { label: "Accueil", href: "/", exists: true },
  { label: "Réserver", href: "/reserver", exists: true },
  {
    label: "Services", href: "/services", exists: false,
    children: [
      { label: "Transfert aéroport", href: "/transfert-aeroport", exists: true },
      { label: "Transfert gare", href: "/transfert-gare", exists: true },
      { label: "Chauffeur entreprise", href: "/chauffeur-entreprise", exists: true },
      { label: "Mise à disposition", href: "/mise-a-disposition", exists: true },
      { label: "Longues distances", href: "/longues-distances", exists: true },
      { label: "Van avec chauffeur", href: "/van-avec-chauffeur", exists: false },
    ],
  },
  {
    label: "Destinations", href: "/destinations", exists: false,
    children: [
      { label: "Stations de ski", href: "/stations-de-ski", exists: false },
      { label: "Longues distances", href: "/longues-distances", exists: true },
      { label: "Aéroports", href: "/aeroports", exists: false },
      { label: "Circuits touristiques", href: "/circuits-touristiques", exists: false },
    ],
  },
  {
    label: "Lyon et métropole", href: "/vtc-lyon-metropole", exists: false,
    children: [
      { label: "Arrondissements", href: "/vtc-lyon-arrondissements", exists: false },
      { label: "Est lyonnais", href: "/vtc-lyon-est", exists: false },
      { label: "Ouest lyonnais", href: "/vtc-lyon-ouest", exists: false },
      { label: "Nord lyonnais", href: "/vtc-lyon-nord", exists: false },
      { label: "Sud lyonnais", href: "/vtc-lyon-sud", exists: false },
      { label: "Villeurbanne", href: "/vtc-villeurbanne", exists: true },
    ],
  },
  { label: "Véhicules", href: "/vehicules", exists: true },
  { label: "Tarifs", href: "/tarifs", exists: true },
  { label: "FAQ", href: "/faq", exists: true },
  { label: "À propos", href: "/a-propos", exists: true },
  { label: "Contact", href: "/contact", exists: true },
];

/**
 * Aide de développement : renvoie uniquement les entrées de premier niveau
 * dont la route existe réellement, pour un futur menu "safe" qui ne montre
 * jamais de lien mort avant qu'une page ne soit publiée. Les sous-menus
 * ("Services", "Destinations", "Lyon et métropole") ne doivent être promus
 * en lien de premier niveau qu'une fois leur page hub créée.
 */
export function getExistingFutureMenuItems(): FutureMenuItem[] {
  return futureMainMenu.filter((item) => item.exists);
}
