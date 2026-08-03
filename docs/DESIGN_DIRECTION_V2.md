# KDRIVE — Direction artistique V2

Proposition à valider avant toute généralisation. Rien dans ce document
n'est appliqué aux pages en production : tout est démontré sur la route
isolée `/design-preview-v2`, additive, qui ne remplace aucune page
existante et ne touche ni au moteur de réservation, ni à la tarification,
ni à Supabase, ni aux API, ni aux notifications, ni au workflow métier, ni
au SEO technique.

---

## 1. Diagnostic visuel actuel

Le design system actuel (`design-preview.css`, palette noir/crème/or,
Cormorant Garamond + Inter) est déjà cohérent, sobre et clairement
premium par rapport à un site VTC générique. Trois limites concrètes
freinent le passage à un niveau "acteur international" :

- **Une seule graisse de display** (Cormorant Garamond 500 uniquement) :
  impossible de créer un contraste éditorial fort entre un très grand
  titre et un sous-titre plus léger — tout est visuellement à la même
  "température".
- **Un système de cartes fonctionnel mais plat** : padding uniforme,
  radius uniforme, pas de hiérarchie entre carte "produit" (véhicule) et
  carte "contenu" (service) — les deux se ressemblent alors qu'elles
  jouent des rôles différents.
- **Aucune micro-interaction** au-delà d'un `translateY` au survol des
  boutons : le site est statique, ce qui se sent immédiatement à côté
  d'un acteur premium (Blacklane, sites constructeurs automobiles haut de
  gamme) sans qu'il s'agisse d'un défaut grave — juste d'un manque de
  raffinement final.

Le fond (structure, accessibilité, contenu, tokens de couleur) est bon.
La V2 est une évolution du système existant, pas une refonte.

## 2. Concept créatif

**"Le chauffeur, pas le chauffeur de VTC."** L'idée directrice est de
traiter KDRIVE comme un service d'hospitalité privée plutôt que comme une
appli de transport : moins d'icônes fonctionnelles, plus de typographie
éditoriale, plus de respiration, une photographie qui montre des gestes
(ouvrir une porte, porter un bagage, attendre) plutôt que des flottes
alignées. On ne copie pas Blacklane (pas de fond bleu nuit ni de mise en
page identique) : KDRIVE garde son identité noir/crème/or, mais la pousse
vers plus de contraste dramatique et plus d'espace vide assumé.

## 3. Principes de marque (V2)

1. **Silence visuel** — chaque section a un seul message principal ;
   jamais deux CTA de poids égal côte à côte.
2. **Chaleur, pas froideur** — le noir reste chaud (jamais bleu nuit),
   l'or reste discret (jamais criard, jamais en aplat large).
3. **Geste humain avant véhicule** — la photographie montre d'abord une
   interaction humaine, le véhicule vient en second plan.
4. **Confiance par la clarté** — la hiérarchie typographique doit rendre
   évident, sans lire tout le texte, où est le prix, où est l'action, où
   est le réconfort ("confirmation humaine").

## 4. Moodboard textuel

Noir de nuit lyonnaise plutôt que noir studio · reflets dorés sur
carrosserie noire · pierre claire des façades du 2ᵉ arrondissement ·
lumière rasante de fin de journée · cuir et présence discrète en
habitacle · silence d'un hall d'hôtel · un geste (porte ouverte, valise
posée) plutôt qu'un sourire face caméra · typographie de faire-part plutôt
que d'application mobile.

## 5. Nouvelle échelle typographique

Base identique (Cormorant Garamond display, Inter texte), graisses
étendues (400/500/600 au lieu de 500 seul) pour créer du contraste sans
changer de police :

| Rôle | Taille | Graisse | Usage |
|---|---|---|---|
| Display XL | `clamp(2.6rem, 5.4vw, 4.8rem)` | 500 | Hero uniquement, un seul par page — taille corrigée après test réel sur `/design-preview-v2` (une valeur plus grande faisait déborder le titre au-dessus du cadre du hero) |
| Display L (H1) | `clamp(2.6rem, 5.2vw, 4.6rem)` | 500 | Inchangé (déjà juste) |
| Display M (H2) | `clamp(2rem, 3.6vw, 3rem)` | 500 | Inchangé |
| Display S (H3) | `clamp(1.4rem, 2.2vw, 1.9rem)` | 600 | Titres de carte premium (véhicules), plus affirmés qu'avant |
| Display Quote | `clamp(1.3rem, 2vw, 1.7rem)` | 400 italique | Réassurance, citations courtes |
| Label / kicker | `0.72rem`, uppercase, tracking `0.18em` | 700 (Inter) | Inchangé |
| Corps L (lead) | `clamp(1.05rem, 1.6vw, 1.25rem)` | 400 (Inter) | Inchangé |
| Corps M | `0.98rem` | 400 (Inter) | Inchangé |
| Caption | `0.82rem` | 500 (Inter) | Légendes, mentions discrètes |

## 6. Système d'espacement

Conserve les jetons existants (`--kd-space-1` à `-8`, 4→112px) et ajoute
deux paliers pour l'ampleur éditoriale en V2, sans les substituer :

- `--kdv2-space-9: 160px` — respiration entre sections hero et contenu
- `--kdv2-space-10: 220px` — respiration exceptionnelle (rupture avant CTA final)

Règle : jamais deux paliers consécutifs identiques dans une même page
(évite l'effet "mur de blocs égaux" du système actuel par endroits).

## 7. Cartes services (V2)

Passage d'une carte "boîte" à une carte "éditoriale" : image en haut sur
un ratio plus cinématographique (`16/10` au lieu de `4/3`), kicker
au-dessus du titre (catégorie du service), titre en Display S 600,
séparateur fin doré (1px, 40px de large, jamais pleine largeur) entre le
titre et le texte, lien final en soulignement animé plutôt qu'en flèche
statique.

## 8. Cartes véhicules (V2)

Différenciées des cartes services par un traitement plus produit : image
en ratio portrait `3/4`, nom du véhicule en Display S 600 aligné à gauche,
tagline de positionnement (déjà existante : "Entrée de gamme", "Catégorie
supérieure", "Premium") en petit texte or au-dessus, prix/mode affiché en
étiquette à coin coupé discrète plutôt qu'en pastille pleine, léger zoom
d'image (1.04) au survol desktop uniquement (pas de zoom sur tap mobile).

## 9. CTA

Bouton primaire inchangé dans sa forme (radius sm, noir/or), mais ajout
d'un **soulignement qui se révèle de gauche à droite au survol** sous le
texte plutôt qu'un simple changement de fond — plus discret, plus
"maison de luxe". Bouton secondaire ("ghost") avec bordure fine dorée qui
s'épaissit légèrement au survol (1px → 1.5px), sans changement de fond.

## 10. Hero

Image plein cadre avec un dégradé plus profond et plus chaud en bas
(lisibilité du texte sans bandeau opaque), kicker + Display XL, lead
raccourci à une seule phrase, formulaire de réservation dans une carte à
fond noir semi-translucide (effet verre discret, pas de blur lourd),
bandeau de réassurance sous le hero avec trois icônes fines (trait, pas
de remplissage) au lieu de simples points texte.

## 11. Menu desktop

Structure identique (logo, liens, téléphone, CTA) mais : trait fin doré
qui se révèle sous le lien actif/survolé (au lieu d'aucun état visuel
hors couleur), légère transparence + flou du fond de nav à partir du
scroll (`backdrop-filter`, discret), sous-menus "Services"/"À propos"
transformés en mini-cartes avec description courte plutôt qu'une liste de
texte brut.

## 12. Menu mobile

Passage d'un menu liste simple à un tiroir plein écran fond noir, liens
en Display S avec apparition décalée (stagger) à l'ouverture, bouton de
fermeture repositionné en haut à droite, barre d'action basse (Appeler /
Réserver) conservée à l'identique (déjà efficace).

**Point technique corrigé pendant ce sprint** : le tiroir (`position:
fixed; inset: 0`) était initialement imbriqué dans le `<header>` de
navigation. Or ce header utilise un `backdrop-filter` (voir point 11),
qui — comme `transform` ou `filter` — crée un bloc englobant pour ses
descendants en `position: fixed`. Résultat observé en test réel : le
tiroir restait confiné à la hauteur de la barre de navigation (~88px) au
lieu de couvrir l'écran entier, laissant transparaître le hero derrière
le menu. Corrigé en sortant le tiroir du `<header>` (rendu en frère,
non en enfant). À retenir pour toute future implémentation utilisant
`backdrop-filter` sur un conteneur parent d'un élément en position fixe.

## 13. Tunnel de réservation

**Maquette visuelle uniquement** (aucune logique modifiée) : indicateur
d'étape redessiné (traits fins plutôt que puces rondes), champs de
formulaire avec libellé flottant discret, carte de récapitulatif de prix
avec le montant en Display M au lieu de sans-serif brut, bouton final
pleine largeur.

## 14. Direction photo

Grain naturel léger, étalonnage chaud constant (pas de photo froide ou
bleutée), toujours un geste humain visible (porte, bagage, accueil),
cadrage 3/4 avant pour les véhicules (cohérent avec les photos déjà
utilisées : Tesla Berline, Mercedes Luxe), jamais de sourire forcé face
caméra, lumière naturelle ou golden hour plutôt que studio.

## 15. Micro-interactions

- Soulignement de lien/CTA qui se révèle au survol (transform-origin
  gauche).
- Léger zoom image (1.04, 300ms) au survol des cartes véhicules/services,
  desktop uniquement.
- Apparition en fondu + léger décalage vertical (12px) des titres de
  section à l'entrée dans le viewport (`IntersectionObserver`, pas de
  librairie ajoutée).
- États focus clavier toujours visibles (anneau doré 2px, déjà conforme
  AA), jamais supprimés par une micro-interaction.
- Aucun effet lourd : pas de parallaxe, pas de carrousel, pas de vidéo,
  pas de nouvelle librairie UI (conforme à la contrainte du sprint).

## 16. Règles responsive

Mobile-first inchangé dans l'esprit : la barre d'action basse mobile
reste prioritaire, les grilles de cartes passent de 3 à 1 colonne avec un
espacement constant, le hero passe d'un dégradé pleine hauteur à un
cadrage plus court en mobile pour laisser voir le formulaire sans
scroller, le menu mobile plein écran remplace le menu desktop dès 768px.
Aucun débordement horizontal toléré à 320/360/390/430/820/1440px (vérifié
sur `/design-preview-v2`, voir rapport de vérification).

---

## Portée de ce sprint

Route strictement isolée : `/design-preview-v2`. Aucune page de
production modifiée, aucun composant partagé de production modifié,
aucun changement au moteur de réservation, à la tarification, à
Supabase, aux API, aux notifications, au workflow métier ou au SEO
technique. Cette route n'est ni liée depuis le menu public, ni ajoutée
au sitemap.

**En attente de validation de cette direction artistique avant toute
généralisation aux pages réelles.**
