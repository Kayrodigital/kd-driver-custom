# Checklist de préparation à la production

État réel constaté à la fin de ce sprint, sur la branche
`feature/autonomous-polish-and-ux-v2` (non mergée). Les cases cochées
correspondent à un point **effectivement vérifié pendant ce sprint** ou
lors d'un sprint antérieur documenté ; les cases non cochées sont soit
non vérifiées, soit connues comme manquantes.

## Moteur tarifaire

- [x] Berline confirmée à 2,50 €/km, cohérente sur `/tarifs`, les 3
      documents UX V2 et les tests unitaires.
- [x] Hiérarchie de priorité aéroport → longue distance → seuil 10 km
      testée (cas limites 9.99/10/10.01 km, 29.99/30/30.01 km).
- [x] Minimum Luxe (40 €) appliqué uniquement en course standard,
      explicitement `null` pour aéroport/longue distance (non confirmé
      par KDRIVE, documenté dans `CLIENT_CONTENT_VALIDATION.md`).
- [ ] Taux/montant de commission KDRIVE pour la délégation chauffeur —
      **non confirmé**, ne pas implémenter avant validation.

## WhatsApp

- [x] `normalizePhoneForWhatsApp` / `buildWhatsAppContactUrl` /
      `buildWhatsAppShareUrl` implémentées et testées (24 tests).
- [x] Cause probable du bug identifiée et corrigée (absence d'indicatif
      pays sur les numéros locaux).
- [ ] **Confirmation visuelle définitive sur la preview réelle non
      effectuée dans ce sprint** (pas d'envoi de vrai message WhatsApp
      autorisé) — à valider par vous au retour en cliquant réellement
      sur un bouton WhatsApp de la preview.

## Variables d'environnement

- [x] `NEXT_PUBLIC_KD_DRIVER_PHONE` confirmée présente sur Vercel
      (Development, Preview, Production) via `vercel env ls`.
- [ ] Revue complète de toutes les variables d'environnement de
      production (clés API Google Maps, Supabase, Brevo) — non refaite
      dans ce sprint, aucune modification effectuée (règle de sécurité).

## Sécurité

- [x] `/admin` renvoie 401 sans authentification (vérifié ce sprint).
- [ ] Authentification admin actuelle = Basic Auth simple ; migration
      vers un système plus robuste (session, rôle) à évaluer avant une
      utilisation à plusieurs personnes.
- [x] RLS Supabase confirmée `deny all` pour `anon`/`authenticated` sur
      les tables principales (vérifié lors d'un sprint antérieur,
      non ré-audité ce sprint-ci).

## Supabase

- [ ] Aucune migration nouvelle appliquée dans ce sprint (conforme à la
      règle de sécurité). Les migrations du plan dispatch
      (`docs/DISPATCH_IMPLEMENTATION_PLAN.md`) restent à faire, dans
      l'ordre documenté, uniquement après validation.
- [ ] Politique de sauvegarde Supabase non auditée dans ce sprint.

## Brevo

- [ ] Aucun e-mail réel envoyé dans ce sprint (conforme à la règle de
      sécurité). Le lien WhatsApp dans le gabarit d'e-mail propriétaire
      a été corrigé (`owner-notifier.ts`) mais non testé par un envoi
      réel.

## Admin

- [x] Page liste des réservations et fiche détail fonctionnelles
      (vérifié par navigation, hors envoi réel de notification).
- [ ] Nouveau workflow simplifié (Je prends / Je délègue / Je refuse)
      **non implémenté dans l'admin réel** — seulement maquetté sur
      `/booking-ux-preview-v2`.

## SEO

- [x] 5 premières pages locales créées, title/meta/canonical/H1 uniques,
      `BreadcrumbList` + `FAQPage` JSON-LD présents (vérifiés ce sprint).
- [x] Sitemap de production non modifié, 5 nouvelles pages absentes du
      sitemap de branche (vérifié ce sprint).
- [ ] Merge et ajout au sitemap : à faire uniquement après validation
      explicite du contenu par KDRIVE.

## Responsive

- [x] 0 débordement horizontal constaté sur 19 pages × 6 largeurs
      (320/360/390/430/820/1440 px), vérifié sur build propre ce sprint.
- [x] Menu mobile (hamburger) fonctionnel, aucun lien mort.

## Accessibilité

- [ ] axe-core non disponible sur cette machine (installation trouvée
      précédemment incomplète, uniquement des fichiers de locales
      restants) — **non exécuté dans ce sprint**, à refaire avec une
      installation complète.
- [ ] Test clavier/lecteur d'écran manuel non effectué (nécessite un
      humain).
- [x] Contrastes AA vérifiés pour `--kd-gold-ink` sur fond clair lors
      d'un sprint antérieur (audit axe-core alors disponible).

## Performance

- [ ] Lighthouse non lancé dans ce sprint (à faire depuis un navigateur
      réel ou un environnement disposant de Chrome/Lighthouse CLI).
- [x] Build de production généré sans erreur, 28 routes.

## Mentions légales / CGV / confidentialité / cookies

- [ ] **Aucune page mentions légales trouvée dans le code.**
- [ ] **Aucune page CGV trouvée dans le code.**
- [ ] **Aucune page politique de confidentialité trouvée dans le code.**
- [ ] **Aucun bandeau de consentement cookies trouvé dans le code.**

Ces quatre points sont **bloquants pour une mise en production légale en
France/UE** (RGPD, obligations d'information) et n'ont pas été traités
dans ce sprint (hors périmètre demandé). À signaler explicitement à
KDRIVE avant toute mise en production réelle.

## Sauvegarde

- [ ] Politique de sauvegarde (Supabase, code) non auditée dans ce
      sprint — voir `docs/CLIENT_DELIVERY_CHECKLIST.md`.

## Rollback

- [x] Rollback natif Vercel disponible (redéploiement d'une version
      antérieure en un clic) — fonctionnalité de plateforme, non
      spécifique à ce projet.
- [ ] Plan de rollback Supabase écrit uniquement pour les migrations
      futures du plan dispatch (section 15 du plan) ; aucune migration
      réelle n'existe encore à faire rollback.
