# Shotlist image finale — repasse graphique premium

Ce document consolide, pour chaque visuel du site public, les caractéristiques
techniques cibles (ratio, version mobile/desktop, point focal, ambiance, poids
cible, texte alternatif). Il ne remplace pas `IMAGE_SHOTLIST.md` (liste de
travail des visuels restant à produire ou acheter) : il documente l'état
final attendu pour les visuels déjà en place ou en cours de finalisation,
afin qu'un remplacement futur respecte le cadrage et l'intention déjà
validés. Aucun visuel n'a été recherché sur Internet ni remplacé par une
image générique dans le cadre de ce sprint ; seuls le recadrage, l'overlay et
le `object-position` peuvent avoir été ajustés sur les visuels existants.

## Règle générale

- Jamais de flotte non réelle : chaque visuel de véhicule doit correspondre à
  une catégorie effectivement vendue (Confort, Berline, Luxe, Van,
  Monospace).
- Format portrait recadré en `object-fit: cover` pour les cartes véhicules
  (les fichiers sources sont en 1003×1568 / 1122×1402, donc déjà proches d'un
  ratio 2:3 — pas de déformation nécessaire).
- Poids cible : viser < 200 Ko par image après compression (WebP/AVIF si le
  pipeline Next/Image le permet), jamais > 600 Ko en source brute.
- Texte alternatif : toujours descriptif du service rendu (prise en charge,
  catégorie de véhicule, lieu), jamais une simple répétition du nom de
  fichier.

## Visuels véhicules (`/vehicules`, cartes accueil, `/tarifs`)

| Catégorie | Fichier | Ratio source | Version mobile | Version desktop | Point focal | Ambiance | Poids cible | Texte alternatif |
|---|---|---|---|---|---|---|---|---|
| Confort | `vehicle-confort.jpg` | à confirmer (visuel générique actuel) | recadrage centré véhicule | recadrage centré véhicule, léger crop latéral | calandre / 3/4 avant | sobre, urbain, neutre | < 200 Ko | « Véhicule catégorie Confort KDRIVE, berline standard pour trajet urbain » |
| Berline | `vehicle-berline.jpg` (Tesla blanche, confirmé ce sprint) | 1122×1402 (≈2:2.5) | crop resserré sur le véhicule, ciel/quai en fond réduit | cadrage large conservé (quai, bâtiments, ciel) | 3/4 avant, calandre/logo | urbain contemporain, lumière naturelle, clair | < 200 Ko | « Tesla blanche KDRIVE, catégorie Berline, devant un quartier d'affaires » |
| Luxe | `vehicle-luxe.jpg` (Mercedes Classe S noire, confirmé ce sprint) | 1003×1568 (≈2:3.1) | crop resserré sur le véhicule, façade hôtel réduite | cadrage large conservé (porche, façade pierre, lumière dorée) | 3/4 avant, calandre étoile visible | premium, doré, hôtel/palace, nocturne/golden hour | < 200 Ko | « Mercedes Classe S noire KDRIVE, catégorie Luxe, devant un hôtel particulier » |
| Van | `vehicle-van.jpg` | à confirmer (mode devis, visuel générique actuel) | recadrage centré | recadrage centré, léger crop latéral | 3/4 avant, volume du véhicule visible | pratique, groupe/bagages | < 200 Ko | « Van KDRIVE pour groupe ou bagages volumineux, sur devis » |
| Monospace | `vehicle-monospace.jpg` | à confirmer (mode devis, visuel générique actuel) | recadrage centré | recadrage centré, léger crop latéral | 3/4 avant | familial, pratique | < 200 Ko | « Monospace KDRIVE pour trajet familial ou groupe, sur devis » |

**Point de vigilance non résolu** : le remplacement Confort/Van/Monospace par
des visuels réels (marque/modèle confirmés) reste en attente, comme déjà
noté dans `IMAGE_SHOTLIST.md` et `CLIENT_CONTENT_VALIDATION.md` (point
« Flotte réelle »). Ce sprint n'a corrigé que l'inversion Berline/Luxe
détectée pendant l'audit visuel (voir compte rendu).

## Visuels de page (hero et sections)

| Page | Sujet | Ratio | Version mobile | Version desktop | Point focal | Ambiance | Poids cible | Texte alternatif |
|---|---|---|---|---|---|---|---|---|
| Accueil (hero) | Scène urbaine/business à Lyon, berline premium | 16:9 large en desktop, recadrage plus vertical en mobile (crop centré sur le véhicule) | crop vertical resserré, texte hero lisible en surimpression | plein cadre, overlay dégradé bas pour lisibilité du texte | véhicule + repère urbain lyonnais | doré, haut de gamme, discret | < 250 Ko | « Chauffeur privé KDRIVE à Lyon, prise en charge en centre-ville » |
| `/transfert-aeroport` (hero) | Aéroport Lyon-Saint-Exupéry, véhicule à l'arrêt | 16:9 desktop / recadrage carré-ish mobile | crop centré sur le véhicule et un repère aéroport | plein cadre avec architecture identifiable | véhicule + signalétique/architecture aéroport | fonctionnel, rassurant, pro | < 250 Ko | « Transfert aéroport Lyon-Saint-Exupéry avec chauffeur privé KDRIVE » |
| `/tarifs` | Illustration tarifaire (si utilisée) ou pas de visuel dominant | — | — | — | — | clair, lisible, pas de visuel qui détourne l'attention du tableau de prix | < 150 Ko si présent | « Grille tarifaire KDRIVE, Confort Berline Luxe Van Monospace » |
| `/chauffeur-entreprise` | Passager professionnel, sacoche/ordinateur | 4:3 ou 16:9 | crop centré sur le passager | cadrage large avec contexte bureau/business | passager + geste professionnel | corporate, neutre, confiant | < 200 Ko | « Service chauffeur entreprise KDRIVE pour déplacement professionnel » |
| `/longues-distances` | Route/autoroute, véhicule en mouvement | 16:9 | crop resserré sur le véhicule | cadrage large route/paysage | véhicule en mouvement | dynamique, voyage, longue distance | < 220 Ko | « Trajet longue distance en berline KDRIVE » |
| `/a-propos` | Chauffeur en costume, portrait ou plan large | 4:3 ou 1:1 | crop portrait serré | cadrage large avec contexte | visage/posture professionnelle | confiance, sérieux, identité KDRIVE | < 200 Ko | « Chauffeur professionnel KDRIVE en costume » |

## Suivi

- Les lignes « à confirmer » restent dans `CLIENT_CONTENT_VALIDATION.md` tant
  que les vrais visuels Confort/Van/Monospace n'ont pas été fournis.
- Ce document doit être mis à jour à chaque remplacement réel de visuel, en
  conservant le point focal et l'ambiance déjà validés pour ne pas
  redécider à chaque fois les mêmes arbitrages.
