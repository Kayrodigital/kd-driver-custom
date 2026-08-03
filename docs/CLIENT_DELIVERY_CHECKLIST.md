# Checklist de livraison client

Checklist à parcourir avec KDRIVE au moment de la livraison réelle
(après validation de cette branche et merge sur `main`). Aucune case
n'est cochée ici : ce document liste ce qu'il reste à faire, pas ce qui
a déjà été fait pendant ce sprint (voir le compte rendu final pour l'état
réel).

## Accès

- [ ] Accès admin (`/admin`) transmis à KDRIVE : identifiants Basic Auth
      actuels, ou migration vers un système d'authentification dédié à
      confirmer avant livraison finale.
- [ ] Accès au dashboard Vercel transmis ou compte ajouté en
      collaborateur, selon la préférence de KDRIVE.
- [ ] Accès au projet Supabase transmis ou compte ajouté en
      collaborateur.
- [ ] Accès au compte Brevo (notifications e-mail) transmis ou vérifié.
- [ ] Accès au dépôt GitHub (`Kayrodigital/kd-driver-custom`) confirmé.

## Outils

- [ ] Liste des outils utilisés remise à KDRIVE (Next.js, Supabase,
      Google Maps Places/Routes, Brevo, Vercel).
- [ ] Coûts récurrents connus de KDRIVE (API Google Maps, Supabase,
      Brevo, hébergement Vercel) — à chiffrer avant livraison finale si
      ce n'est pas déjà fait.

## Formation

- [ ] Session de prise en main de l'admin (`/admin`) : consultation des
      demandes, statuts, actions.
- [ ] Explication du futur workflow dispatch (Je prends / Je délègue /
      Je refuse) une fois implémenté réellement — pour l'instant, seule
      la maquette `/booking-ux-preview-v2` existe.
- [ ] Procédure à suivre en cas de demande urgente ou de panne du site.

## Livraison

- [ ] Validation explicite de KDRIVE sur le contenu des 5 premières
      pages SEO avant tout merge sur `main` (voir
      `docs/SEO_CONTENT_PRODUCTION_PLAN.md`).
- [ ] Validation explicite du nouveau texte véhicules (Confort, Berline,
      Luxe, Van, Monospace) avant merge.
- [ ] Validation du tarif Berline 2,50 €/km comme définitif (déjà
      confirmé par KDRIVE dans les échanges de ce sprint, à reconfirmer
      formellement avant mise en production si nécessaire).
- [ ] Merge sur `main` réalisé uniquement après validation explicite —
      **non fait dans ce sprint**.
- [ ] Déploiement en production réalisé uniquement après validation
      explicite — **non fait dans ce sprint**.

## Sauvegardes

- [ ] Politique de sauvegarde Supabase confirmée (fréquence, rétention) —
      à vérifier dans les réglages du projet Supabase, non audité dans
      ce sprint.
- [ ] Export ponctuel des données `reservations`/`customers` recommandé
      avant toute migration future (dispatch, voir
      `docs/DISPATCH_IMPLEMENTATION_PLAN.md`).

## Support

- [ ] Canal de support convenu avec KDRIVE (e-mail, téléphone, autre).
- [ ] Délai de réponse indicatif communiqué à KDRIVE.

## Maintenance

- [ ] Fréquence de mise à jour des dépendances (Next.js, packages npm)
      convenue.
- [ ] Responsable du renouvellement des clés API (Google Maps, Brevo,
      Supabase) identifié.

## Procédure d'urgence

- [ ] Contact d'urgence en cas de panne du site en production.
- [ ] Procédure de rollback documentée (voir
      `docs/PRODUCTION_READINESS_CHECKLIST.md`, section rollback) et
      testée au moins une fois avant la mise en production réelle.

## Rollback

- [ ] Vérifier que la dernière version stable de `main` reste déployable
      en un clic depuis Vercel (rollback natif de plateforme) avant
      toute mise en production de ce sprint.
- [ ] Vérifier qu'aucune migration Supabase irréversible n'est appliquée
      sans plan de rollback écrit au préalable (voir
      `docs/DISPATCH_IMPLEMENTATION_PLAN.md`, section 15).
