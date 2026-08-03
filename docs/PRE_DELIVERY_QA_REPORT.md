# Recette pré-livraison — sprint autonome

Recette réalisée sur un build propre de la branche
`feature/autonomous-polish-and-ux-v2` (build local + serveur `next start`,
sans cache résiduel, pour éviter les faux résultats déjà rencontrés avec
le cache d'optimisation d'image de Next.js lors d'un sprint précédent).

## Méthode

- Vérification HTTP (code de statut) sur chaque page listée.
- Capture des erreurs console navigateur (Playwright, Chromium) sur
  chaque page.
- Vérification `document.documentElement.scrollWidth === clientWidth`
  (absence de débordement horizontal) sur 320 / 360 / 390 / 430 / 820 /
  1440 px, pour les 19 pages réelles (hors page 404 volontaire).
- Vérification du menu mobile (hamburger, ouverture, liens), du fil
  d'Ariane, des liens `tel:`/`wa.me`, du nombre d'accordéons FAQ, de la
  protection de `/admin`.

## Pages testées

Accueil, Réserver, Transfert aéroport, Transfert gare, Chauffeur
entreprise, Mise à disposition, Longues distances, Véhicules, Tarifs, À
propos, Contact, FAQ, 404, `/design-preview`, `/booking-ux-preview-v2`,
et les 5 nouvelles pages locales (Villeurbanne, Lyon Part-Dieu, Lyon
Grenoble, Bron, Saint-Priest).

## Résultats

| Vérification | Résultat |
|---|---|
| Code HTTP des 19 pages réelles | 200 sur toutes |
| Code HTTP page inexistante | 404 (correct) |
| Erreurs console (19 pages réelles) | 0 |
| Débordement horizontal (19 pages × 6 largeurs = 114 combinaisons) | 0 |
| Menu mobile (hamburger) | Présent, s'ouvre, 14 liens visibles, aucun lien mort (aucune route `/services`, `/destinations` inexistante) |
| Lien `tel:` en bas mobile et header | Présent (`tel:+33652211292`) |
| Fil d'Ariane (`/transfert-aeroport`, `/vtc-villeurbanne`, `/a-propos`) | Présent sur les 3 |
| Accordéons FAQ (`/faq`) | 10 blocs `<details>` fonctionnels |
| `/admin` sans authentification | 401 (protection Basic Auth active, correct) |

## Défauts constatés

**Aucun défaut bloquant, important, mineur ou cosmétique constaté** lors
de cette recette automatisée sur le build propre de la branche.

## Point informatif (non un défaut)

- **Page / description** : `/reservation/confirmation/[reference]`,
  boutons Appeler/WhatsApp du bas de page.
- **Largeur** : toutes.
- **Gravité** : informatif (pas un défaut).
- **Description** : en environnement de build local, ces deux boutons ne
  s'affichent pas car ils dépendent de la variable d'environnement
  `NEXT_PUBLIC_KD_DRIVER_PHONE`, absente du `.env.local` local (fichier
  non versionné, propre à cette machine).
- **Cause** : absence locale de la variable, pas un bug de code.
- **Vérification faite** : `vercel env ls` confirme que
  `NEXT_PUBLIC_KD_DRIVER_PHONE` est bien configurée sur Vercel
  (Development, Preview **et** Production) — la variable est présente là
  où ça compte réellement.
- **Correction** : aucune nécessaire côté code. À reconfirmer visuellement
  sur l'URL de preview Vercel (pas testable en local sans dupliquer le
  `.env.local`, ce qui n'a pas été fait pour ne pas risquer d'y placer une
  valeur incorrecte).
- **Statut** : à vérifier visuellement sur la preview par vous-même au
  retour (case non cochée dans ce rapport faute d'accès à l'environnement
  réel depuis ce sprint).

## Non couvert par cette recette automatisée

- Interaction réelle avec l'autocomplete Google Places (nécessite une
  clé API valide et une connexion réseau autorisée dans l'environnement
  d'exécution des tests ; non exercée ici au-delà de la présence du champ
  et de l'absence d'erreur console au chargement).
- Envoi réel d'e-mail Brevo ou de message WhatsApp (interdit par les
  règles de sécurité du sprint).
- Test manuel humain du clavier/lecteur d'écran (voir section
  accessibilité du compte rendu final — axe-core non disponible sur cette
  machine, voir plus bas).
- Comportement de la carte de géolocalisation (`navigator.geolocation`),
  qui dépend de permissions navigateur non simulables simplement en mode
  automatisé.

## Conclusion

Sur la base de cette recette, la branche est dans un état **propre**
(0 défaut bloquant/important/mineur/cosmétique constaté). Le seul point
à vérifier manuellement au retour est visuel et concerne une variable
d'environnement déjà confirmée présente côté Vercel.
