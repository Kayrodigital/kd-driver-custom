# Carte du maillage interne — Phase SEO 2A

Liens contextuels ajoutés dans le contenu des pages (hors menu et footer, déjà
exhaustifs par ailleurs). Complétée en Phase SEO 2B pour les pages restantes.

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

## Reporté à la Phase SEO 2B

- Maillage contextuel de `/chauffeur-entreprise`, `/mise-a-disposition`,
  `/longues-distances`, `/a-propos`, `/contact`, `/faq` (au-delà du bloc
  « Services complémentaires » déjà câblé sur les pages service par la
  réutilisation du composant créé en 2A).
- Fil d'Ariane et `BreadcrumbList` JSON-LD associé.
