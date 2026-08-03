# Architecture SEO en silos

Ce document définit la structure pilier → hub → satellite → conversion
pour organiser la croissance du contenu SEO de KDRIVE sans dupliquer les
pages existantes ni créer de routes concurrentes.

## Principe

```
PILIER (page forte existante, généraliste)
  → HUB (page de regroupement thématique, à créer)
      → SATELLITE (page locale ou de niche, très ciblée)
          → CONVERSION (/reserver, formulaire, appel)
```

Chaque satellite doit lier au minimum un pilier et, quand il existe, son
hub thématique. Chaque hub doit lier ses piliers et ses satellites. Aucun
satellite ne doit rester orphelin (sans lien entrant depuis un hub ou un
pilier).

## Piliers existants (ne pas dupliquer)

| Pilier | Route | Rôle |
|---|---|---|
| Accueil | `/` | Point d'entrée généraliste, conversion directe |
| Transfert aéroport | `/transfert-aeroport` | Pilier service |
| Transfert gare | `/transfert-gare` | Pilier service |
| Chauffeur entreprise | `/chauffeur-entreprise` | Pilier service |
| Mise à disposition | `/mise-a-disposition` | Pilier service |
| Longues distances | `/longues-distances` | Pilier service **et** futur hub (voir ci-dessous) |
| Véhicules | `/vehicules` | Pilier catalogue |
| Tarifs | `/tarifs` | Pilier conversion |
| FAQ | `/faq` | Pilier support |
| À propos | `/a-propos` | Pilier confiance |
| Contact | `/contact` | Pilier conversion |
| Réserver | `/reserver` | Conversion finale |

**Attention** : `/longues-distances` existe déjà comme pilier de service.
Elle ne doit pas être dupliquée par une nouvelle route hub concurrente
(ex. ne pas créer `/longue-distance` ou `/trajets-longue-distance`) — elle
doit progressivement absorber le rôle de hub pour les satellites de type
« VTC Lyon–Grenoble », « VTC Lyon–Genève », « VTC Lyon–Annecy », en
ajoutant une section de liens vers ces satellites une fois publiés.

## Hubs prévus (non créés dans ce sprint)

| Hub | Route prévue | Statut | Regroupe |
|---|---|---|---|
| Services | `/services` | Non créé | Liens vers les 6 pages service (aéroport, gare, entreprise, disposition, longues distances, van) |
| Destinations | `/destinations` | Non créé | Liens vers stations de ski, longues distances, aéroports, circuits touristiques |
| Stations de ski | `/stations-de-ski` | Non créé | Futures pages satellites saisonnières |
| Longues distances | `/longues-distances` | **Existe déjà (pilier)** | Absorbe le rôle de hub pour les satellites longue distance |
| Aéroports | `/aeroports` | Non créé | Regroupe les variantes aéroport si plusieurs aéroports sont un jour desservis (actuellement un seul : Lyon-Saint Exupéry) |
| VTC Lyon métropole | `/vtc-lyon-metropole` | Non créé | Regroupe les satellites communes (Villeurbanne, Bron, Saint-Priest, etc.) |

Aucun de ces hubs n'existe encore. Tant qu'un hub n'existe pas, ses
satellites lient directement vers le pilier le plus pertinent (voir
`INTERNAL_LINKING_MAP.md`) plutôt que vers une route hub inexistante.

## Satellites créés dans ce sprint (branche uniquement)

| Satellite | Route | Pilier(s) cible(s) | Futur hub |
|---|---|---|---|
| VTC Villeurbanne | `/vtc-villeurbanne` | Transfert aéroport, transfert gare, chauffeur entreprise | VTC Lyon métropole |
| VTC Lyon Part-Dieu | `/vtc-lyon-part-dieu` | Transfert gare, transfert aéroport | Services |
| VTC Lyon Grenoble | `/vtc-lyon-grenoble` | Longues distances | Longues distances (pilier + hub) |
| VTC Bron | `/vtc-bron` | Transfert aéroport, chauffeur entreprise | VTC Lyon métropole |
| VTC Saint-Priest | `/vtc-saint-priest` | Transfert aéroport, longues distances | VTC Lyon métropole |

## Satellites futurs (priorité déjà établie, `SEO_LOCAL_PLAN.md`)

Caluire-et-Cuire, Oullins-Pierre-Bénite, VTC Lyon–Genève, VTC Lyon–Annecy,
VTC Van Lyon, minibus avec chauffeur Lyon — non créés dans ce sprint,
ordre de priorité déjà documenté dans `docs/SEO_LOCAL_PLAN.md`.

## Règle de non-duplication

- Un satellite ne doit jamais recopier le contenu d'un pilier : il
  approfondit un angle local ou de niche que le pilier ne traite pas.
- Un satellite ne doit jamais recopier un autre satellite : voir
  `docs/SEO_CONTENT_PRODUCTION_PLAN.md` pour la checklist de contenu
  unique.
- Avant de créer un nouveau hub, vérifier qu'aucune route existante ne
  joue déjà ce rôle (cas de `/longues-distances`).

## État d'indexation

Les satellites créés dans ce sprint sont **techniquement indexables**
(métadonnées complètes, canonical propre, pas de balise `noindex`
individuelle) mais restent invisibles en pratique tant que :
1. ils ne sont pas mergés sur `main` ;
2. ils ne sont pas ajoutés à `src/app/sitemap.ts` ;
3. la preview Vercel de la branche reste protégée par le header
   `X-Robots-Tag: noindex` appliqué automatiquement par Vercel à tous les
   déploiements de preview (vérifié : présent sur la racine de la
   preview de cette branche).

Voir `docs/SEO_LOCAL_PLAN.md` (section indexation) pour la procédure
d'ajout au sitemap après validation.
