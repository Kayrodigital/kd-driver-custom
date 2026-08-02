# Carte du maillage interne — Phases SEO 2A et 2B

Liens contextuels ajoutés dans le contenu des pages (hors menu et footer, déjà
exhaustifs par ailleurs).

| Page source | Page cible | Ancre | Emplacement | Justification |
|---|---|---|---|---|
| `/` | `/longues-distances` | « trajets longue distance » | Phrase sous la grille Services | Complète l'offre de services affichée (3 cartes) avec les deux services non représentés en carte |
| `/` | `/transfert-gare` | « transfert gare » | Phrase sous la grille Services | Idem |
| `/` | `/tarifs` | « tarifs par catégorie » | Phrase sous la grille Véhicules | Permet d'accéder au détail des prix depuis la section véhicules |
| `/` | `/faq` | « FAQ » | Phrase de réassurance sous le CTA final | Répond aux questions avant la décision finale de réservation |
| `/transfert-aeroport` | `/vehicules` | « Voir les véhicules disponibles » | Bloc « Poursuivre votre réservation » | Aide à choisir un véhicule adapté aux bagages/passagers |
| `/transfert-aeroport` | `/tarifs` | « Consulter la grille tarifaire » | Bloc « Poursuivre votre réservation » | Rassure sur le prix avant réservation |
| `/transfert-aeroport` | `/longues-distances` | « Trajet au-delà de Lyon » | Bloc « Poursuivre votre réservation » | Oriente les trajets dépassant la zone standard |
| `/transfert-gare` | `/transfert-aeroport` | « Transfert aéroport » | Bloc « Poursuivre votre réservation » | Pages proches par intention (transferts) |
| `/transfert-gare` | `/chauffeur-entreprise` | « Déplacements professionnels » | Bloc « Poursuivre votre réservation » | Public voyageant par train souvent professionnel |
| `/transfert-gare` | `/vehicules` | « Voir les véhicules disponibles » | Bloc « Poursuivre votre réservation » | Aide au choix du véhicule |
| `/transfert-gare` | `/tarifs` | « Consulter la grille tarifaire » | Bloc « Poursuivre votre réservation » | Rassure sur le prix avant réservation |
| `/vehicules` | `/tarifs` | « Consulter la grille tarifaire » | Bloc « Poursuivre votre réservation » | Complète la fiche véhicule par le prix détaillé |
| `/vehicules` | `/transfert-aeroport` | « Transfert aéroport » | Bloc « Poursuivre votre réservation » | Cas d'usage fréquent nécessitant un véhicule |
| `/vehicules` | `/chauffeur-entreprise` | « Déplacements professionnels » | Bloc « Poursuivre votre réservation » | Cas d'usage fréquent (Confort/Berline) |
| `/tarifs` | `/vehicules` | « Voir les véhicules disponibles » | Bloc « Poursuivre votre réservation » | Permet de choisir un véhicule après avoir vu le prix |
| `/tarifs` | `/faq` | « Consulter la FAQ » | Bloc « Poursuivre votre réservation » | Répond aux questions sur le paiement et l'ajustement du tarif |
| `/tarifs` | `/contact` | « Nous contacter » | Bloc « Poursuivre votre réservation » | Alternative à la réservation directe pour les questions tarifaires |
| `/chauffeur-entreprise` | `/contact` | « Nous contacter » | Bloc « Services complémentaires » | Point de contact direct pour cadrer une demande professionnelle |
| `/mise-a-disposition` | `/contact` | « Nous contacter » | Bloc « Services complémentaires » | Contact nécessaire pour confirmer durée/programme |
| `/longues-distances` | `/contact` | « Nous contacter » | Bloc « Services complémentaires » | Contact nécessaire pour confirmer le devis |
| `/a-propos` | `/vehicules` | « Voir les véhicules disponibles » | Bloc « En savoir plus » | Prolonge la présentation par l'offre concrète |
| `/a-propos` | `/tarifs` | « Consulter la grille tarifaire » | Bloc « En savoir plus » | Illustre la transparence tarifaire évoquée dans le texte |
| `/a-propos` | `/contact` | « Nous contacter » | Bloc « En savoir plus » | Alternative à la réservation directe |
| `/contact` | `/faq` | « Consulter la FAQ » | Bloc « Aller plus loin » | Répond aux questions avant de contacter directement |
| `/contact` | `/tarifs` | « Consulter la grille tarifaire » | Bloc « Aller plus loin » | Question fréquente avant contact |
| `/contact` | `/vehicules` | « Voir les véhicules disponibles » | Bloc « Aller plus loin » | Question fréquente avant contact |
| `/contact` | `/reserver` | « Réserver en ligne » | Bloc « Aller plus loin » | Rappelle l'alternative la plus rapide au contact direct |
| `/faq` | `/reserver`, `/tarifs`, `/vehicules`, `/transfert-aeroport`, `/transfert-gare`, `/contact` | ancre contextuelle par question (ex. « Voir la grille tarifaire ») | Lien discret sous chaque réponse concernée | Oriente vers la page qui traite le sujet en détail, question par question |

## Fil d'Ariane (Phase SEO 2B)

Ajouté sur les 5 pages service (`transfert-aeroport`, `transfert-gare`,
`chauffeur-entreprise`, `mise-a-disposition`, `longues-distances`, via le
template partagé) ainsi que `/a-propos`, `/contact` et `/faq`. Format :
« Accueil › Services › [Page] » pour les pages service (« Services » affiché
en texte non cliquable, aucune route `/services` n'existant), « Accueil ›
[Page] » pour les autres. `BreadcrumbList` JSON-LD généré à l'identique du
fil visible. Non affiché sur l'accueil, ni sur `/tarifs`/`/vehicules`
(non demandé pour cette phase).
