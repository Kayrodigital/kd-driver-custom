# Plan de production de contenu SEO

Ce document fixe la checklist à respecter pour chaque nouvelle page SEO
locale ou satellite, afin d'éviter toute duplication et de garder un
niveau de qualité homogène. Il s'applique aux 5 pages déjà produites dans
ce sprint et à toutes les suivantes.

## Champs obligatoires par page

- `title` unique (balise `<title>`, jamais recopié d'une autre page)
- `meta description` unique, jamais recopiée
- `canonical` propre vers l'URL de la page elle-même (géré automatiquement
  par `buildMetadata({ path })`, ne jamais l'omettre)
- `H1` unique, contient la ville/l'axe ciblé, jamais identique à une autre
  page locale
- Fil d'Ariane (`BreadcrumbList` via le composant `Breadcrumb`)
- `FAQPage` JSON-LD si une FAQ est visible sur la page (jamais de schéma
  sans contenu visible correspondant)
- Au moins un lien vers une page pilier pertinente (voir
  `docs/SEO_SILO_ARCHITECTURE.md` et `docs/INTERNAL_LINKING_MAP.md`)
- Un CTA de réservation (`/reserver`)

## Contenu unique — règle anti-duplication

- Introduction, contexte local, trajets fréquents et FAQ doivent être
  rédigés spécifiquement pour chaque page : aucun paragraphe copié mot
  pour mot d'une autre page locale.
- Reformuler systématiquement les phrases-type (« KDRIVE dessert [ville] »,
  « trajet vers l'aéroport ») avec une structure de phrase différente
  d'une page à l'autre, même si l'idée est similaire.
- Ne jamais réutiliser exactement le même triplet question/réponse de FAQ
  entre deux pages locales.

## Ce qu'il est interdit d'inventer

- Aucun avis client, note ou témoignage fictif.
- Aucun prix fixe ou tarif chiffré qui ne provienne pas du moteur
  tarifaire réel (`pricing-engine.ts` / `/tarifs`) — les pages locales
  renvoient vers `/tarifs`, elles n'affichent pas de prix inventé.
- Aucune promesse de délai ou de temps de trajet non vérifié.
- Aucune promesse de disponibilité garantie.
- Aucune preuve de clientèle non confirmée (ex. ne pas présenter Eurexpo,
  un CHU ou une zone d'affaires comme une clientèle établie — seulement
  comme un usage possible, formulé au conditionnel ou en présentant
  l'usage plutôt que le client).

## Structure type d'une page satellite locale

1. Fil d'Ariane
2. Hero (H1 + accroche + formulaire de réservation réel)
3. Présentation locale (1-2 paragraphes)
4. Trajets fréquents (cartes, 3 exemples typiques)
5. Section contextuelle optionnelle (ex. déplacements professionnels)
6. Liens vers les pages piliers
7. FAQ locale (2-3 questions, réponses prudentes)
8. CTA final de réservation

## Checklist de validation avant publication

- [ ] Title, meta description, H1, canonical uniques et vérifiés par
      recherche du texte exact dans les autres pages du projet
- [ ] Aucun paragraphe partagé mot pour mot avec une autre page locale
- [ ] Liens vers au moins un pilier pertinent, matrice mise à jour dans
      `INTERNAL_LINKING_MAP.md`
- [ ] `BreadcrumbList` et `FAQPage` (si FAQ visible) présents et valides
- [ ] Aucune donnée Semrush inventée : les volumes/CPC cités proviennent
      exclusivement de `docs/SEO_LOCAL_PLAN.md`
- [ ] Statut de publication documenté (voir ci-dessous)
- [ ] `pnpm lint`, tests, build passent sans erreur
- [ ] 0 débordement mobile (320/360/390/430px) et desktop (1440px)
- [ ] Marque toujours écrite « KDRIVE »

## Données Semrush utilisées

Les 5 pages de ce sprint reprennent les mots-clés déjà validés dans
`docs/SEO_LOCAL_PLAN.md` (section 3 bis/ter) : « vtc villeurbanne »,
« chauffeur privé villeurbanne », « vtc lyon part dieu », « vtc gare part
dieu », « vtc lyon grenoble », « vtc bron », « vtc saint priest ». Aucune
nouvelle recherche de mot-clé n'a été effectuée dans ce sprint ; toute
page future doit d'abord vérifier si un volume Semrush existe déjà dans ce
document avant rédaction.

## Statut publié ou preview

| Page | Statut | Emplacement |
|---|---|---|
| `/vtc-villeurbanne` | Preview (branche `feature/autonomous-polish-and-ux-v2`) | Non mergée, non sitemappée |
| `/vtc-lyon-part-dieu` | Preview | Non mergée, non sitemappée |
| `/vtc-lyon-grenoble` | Preview | Non mergée, non sitemappée |
| `/vtc-bron` | Preview | Non mergée, non sitemappée |
| `/vtc-saint-priest` | Preview | Non mergée, non sitemappée |

Passage à « publié » : merge sur `main` + ajout de la route dans
`src/app/sitemap.ts` + validation explicite du client — aucune des deux
actions n'a été faite dans ce sprint.
