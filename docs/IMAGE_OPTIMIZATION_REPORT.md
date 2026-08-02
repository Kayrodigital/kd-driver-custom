# Rapport d'optimisation des images — Phase SEO 2C-B

## Constat général

Toutes les images passent déjà par `next/image` (composant `SceneImage`,
`src/app/design-preview/scene-image.tsx`), qui gère automatiquement :
- la conversion à la volée en AVIF/WebP selon le navigateur (vérifié en
  production : les URLs servies sont du type `/_next/image?url=...&w=...`) ;
- le redimensionnement selon la largeur réellement demandée (`sizes`) ;
- l'absence de CLS : tous les conteneurs (`.kd-scene`) ont un `min-height`
  CSS fixe avant chargement, l'image est en `fill` par-dessus.

**Le point réellement corrigé dans cette phase est l'attribut `sizes`**, qui
était identique et générique partout (`(max-width:700px) 100vw, 50vw`), sans
rapport avec la largeur réelle de rendu de chaque image selon son contexte
(hero plein écran, grille à 2 ou 3 colonnes).

## Inventaire

| Fichier | Page(s) | Dimensions source | Poids source | Composant / contexte | `sizes` avant | `sizes` après | `priority` | Alt |
|---|---|---|---|---|---|---|---|---|
| `hero-lyon.jpg` | Accueil (hero) | 1672×941 | 452 Ko | `SceneImage`, hero plein écran, **LCP de la page** | générique (50vw desktop) | `100vw` | ✅ conservé | `""` (décoratif, texte en overlay) |
| `airport-transfer.jpg` | Accueil (AirportSection), hero `/transfert-aeroport` | 1672×941 | 332 Ko | Section 2 colonnes / hero service | générique | `(max-width:680px) 100vw, 50vw` (accueil) / `100vw` (hero service) | non (accueil) / **ajouté** (hero service, LCP de cette page) | "Transfert aéroport" / `""` |
| `corporate.jpg` | Accueil (CorporateSection) | 1672×941 | 301 Ko | Section 2 colonnes | générique | `(max-width:680px) 100vw, 50vw` | non | "Déplacements professionnels" |
| `service-affaires.jpg` | Accueil (carte Services), hero `/chauffeur-entreprise` | 900×600 | 137 Ko | Grille 3 colonnes / hero service | générique | 3-col (accueil) / `100vw` (hero, LCP) | non / **ajouté** | "Trajets d'affaires" / `""` |
| `service-transferts.jpg` | Accueil (carte Services), hero `/transfert-gare` | 900×600 | 122 Ko | Idem | générique | idem | non / **ajouté** | "Transferts aéroport & gares" / `""` |
| `service-disposition.jpg` | Accueil (carte Services) | 900×600 | 152 Ko | Grille 3 colonnes | générique | 3-col | non | "Mise à disposition" |
| `service-vip.jpg` | Hero `/mise-a-disposition` | 900×600 | 163 Ko | Hero service, LCP de cette page | générique | `100vw` | **ajouté** | `""` |
| `hero-longues-distances.jpg` | Hero `/longues-distances` | 1600×900 | 198 Ko | Hero service, LCP de cette page | générique | `100vw` | **ajouté** | `""` |
| `about-lyon.jpg` | `/a-propos`, visuel `/longues-distances` | **300×169** | 22 Ko | Scène pleine largeur (`kd-scene--tall`, min-height 420px) | générique | `100vw` | non | "Lyon" / `""` |
| `vehicle-berline.jpg` | Accueil + `/vehicules` | 1003×1568 | 516 Ko | Grille 3 colonnes | générique | 3-col | non | "Berline" |
| `vehicle-confort.jpg` | Accueil + `/vehicules` | 1122×1402 | 515 Ko | Grille 3 colonnes | générique | 3-col | non | "Confort" |
| `vehicle-luxe.jpg` | `/vehicules` | 1122×1402 | 459 Ko | Grille 3 colonnes | générique | 3-col | non | "Luxe" |
| `vehicle-van.jpg` | Accueil + `/vehicules` | 1122×1402 | 511 Ko | Grille 3 colonnes | générique | 3-col | non | "Van" |
| `vehicle-monospace.jpg` | `/vehicules` | 1122×1402 | 537 Ko | Grille 3 colonnes | générique | 3-col | non | "Monospace" |

`sizes` 3-col = `(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw` (aligné sur les points de rupture réels de `.kd-grid-3`).

## Optimisations réalisées

1. `sizes` corrigé pour chaque contexte réel (hero plein écran, grille 2 ou 3 colonnes) au lieu d'une valeur générique unique — évite de sous-charger le hero (image plus petite que nécessaire, rendu flou) et de sur-charger les cartes de grille (image deux fois trop large).
2. `priority` ajouté sur le hero de chacune des 5 pages service (`/transfert-aeroport`, `/transfert-gare`, `/chauffeur-entreprise`, `/mise-a-disposition`, `/longues-distances`) — chacune a son propre hero comme véritable LCP de la page, ce qui n'était pas le cas avant (seul le hero de l'accueil avait `priority`). Aucun risque de préchargement concurrent : une seule image `priority` par page.
3. Polices : `Cormorant Garamond` réduite à la graisse 500 / style normal sur le layout public (voir section Polices).

## Optimisations non nécessaires grâce à next/image

- Conversion AVIF/WebP : déjà automatique, aucune action.
- Dimensions explicites / prévention de CLS : déjà garanties par `fill` + conteneur à `min-height` fixe.
- Lazy loading : déjà le comportement par défaut de `next/image` pour toute image sans `priority`.

## Points reportés (hors périmètre de cette phase)

- **`about-lyon.jpg` (300×169 px)** : résolution source nettement insuffisante pour un rendu plein écran (`kd-scene--tall`, ≥420px de hauteur, souvent >800px de large sur desktop) — l'image sera rendue en agrandissement au-delà de sa définition native, donc visiblement moins nette que les autres visuels. Ce n'est pas un défaut de configuration next/image mais un besoin de photo source plus grande — inscrit dans `docs/IMAGE_SHOTLIST.md` pour un futur remplacement, non traité ici (« ne pas remplacer les visuels dans cette phase »).
- **Résolution source des `vehicle-*.jpg`** (jusqu'à 1122×1402) plus élevée que nécessaire pour des cartes affichées en ~300-400px de large : next/image gère déjà le redimensionnement côté client (aucun octet superflu envoyé au navigateur), impact réel limité au traitement serveur — priorité basse, non traité.
