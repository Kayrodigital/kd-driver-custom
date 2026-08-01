const reusable = [
  { name: "useQuickBooking", path: "src/components/booking/use-quick-booking.ts", note: "État, validation, appel /api/reservations — logique à conserver telle quelle." },
  { name: "AddressAutocomplete", path: "src/components/booking/address-autocomplete.tsx", note: "Autocomplétion Google Places + géolocalisation, adresse toujours modifiable." },
  { name: "BookingFormCard / Inline / Mobile", path: "src/components/booking/kd/", note: "Présentations existantes du formulaire écran 1." },
  { name: "Design system kd-*", path: "src/app/design-preview/design-preview.css", note: "Boutons, champs, cartes, couleurs déjà validés en production." },
  { name: "SiteNav, Logo, FooterSection", path: "src/app/design-preview/sections.tsx", note: "Habillage des pages, menu déroulant." },
  { name: "pricing-engine.ts", path: "src/domain/pricing/pricing-engine.ts", note: "Calcul serveur, catégories calculées vs sur devis, seuil longue distance." },
  { name: "booking-schema.ts", path: "src/domain/booking/booking-schema.ts", note: "Téléphone obligatoire, e-mail optionnel, requestType estimate/callback déjà en place." },
  { name: "SupabaseReservationRepository", path: "src/infrastructure/supabase/booking-repository.ts", note: "Persistance idempotente (idempotencyKey)." },
  { name: "ConfirmationSummary", path: "src/components/booking/confirmation-summary.tsx", note: "Écran de confirmation actuel, à faire évoluer plutôt qu’à remplacer." },
  { name: "Page /admin", path: "src/app/admin/page.tsx", note: "Liste minimale existante, base pour l’écran 7." },
];

const missing = [
  { name: "Étape « Véhicules et tarifs » (écran 2)", note: "N’existe plus dans le tunnel actuel : le Sprint 3A a volontairement supprimé le choix de véhicule pour simplifier au maximum." },
  { name: "Étape « Options et précisions » (écran 3)", note: "Siège enfant, animal, arrêt supplémentaire, n° vol/train, réservation pour un tiers — aucun de ces champs n’existe aujourd’hui." },
  { name: "Connexion « Continuer avec Google »", note: "Aucune intégration OAuth dans la codebase actuelle." },
  { name: "Choix du mode de paiement", note: "Aucune intégration Stripe ; le concept « payer au chauffeur / en ligne / devis » n’existe pas encore comme choix explicite." },
  { name: "Génération de lien Stripe (admin)", note: "Aucun back-office de paiement." },
  { name: "Statuts priced / payment_link_sent", note: "Absents du schéma Supabase actuel (new, contacted, confirmed, completed, cancelled, quote_requested)." },
  { name: "Recherche, filtres, tri (écran 7)", note: "La page /admin actuelle est une liste statique sans interaction." },
  { name: "Fiche réservation détaillée (écran 8)", note: "Aucune vue détail ; /admin n’affiche qu’un tableau." },
  { name: "Actions rapides admin (appeler, WhatsApp, confirmer, annuler…)", note: "Aucune action n’est disponible aujourd’hui, lecture seule." },
  { name: "Historique des événements", note: "La table booking_events a été supprimée lors du nettoyage Sprint 3A (doublon mort) ; à réintroduire si l’écran 8 est validé." },
];

const gaps = [
  "Changement de philosophie : le tunnel Sprint 3A a été volontairement réduit à 5 champs sans étape véhicule. Ce sprint UX réintroduit deux écrans (véhicule, options). À trancher : les rendre optionnels/masquables, ou assumer un tunnel plus long qu’aujourd’hui.",
  "Le récapitulatif actuel (confirmation-summary.tsx) ne montre ni véhicule, ni mode de paiement, ni options — il faudra l’étendre, pas le remplacer.",
  "/admin est aujourd’hui une simple liste en lecture seule : les écrans 7 et 8 supposent un vrai back-office (filtres, actions, fiche détail) qui n’existe pas.",
  "Aucun paiement, aucune authentification : ces deux blocs restent entièrement à construire si validés, hors périmètre technique de ce sprint (wireframes uniquement).",
];

export function GapAnalysisSection() {
  return (
    <section id="components" className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">Composants & écarts</p>
          <h2 className="wf-h2">Ce qui existe, ce qui manque, ce qui change</h2>
        </div>

        <h3 className="wf-h3">Composants existants à réutiliser</h3>
        <div className="wf-list-grid" style={{ marginBottom: 32 }}>
          {reusable.map((item) => (
            <div className="wf-card" key={item.name}>
              <b style={{ fontSize: "0.9rem" }}>{item.name}</b>
              <p style={{ fontSize: "0.78rem", margin: "4px 0" }}><code>{item.path}</code></p>
              <p style={{ fontSize: "0.82rem", color: "var(--wf-muted)", margin: 0 }}>{item.note}</p>
            </div>
          ))}
        </div>

        <h3 className="wf-h3">Composants manquants pour le parcours cible</h3>
        <div style={{ marginBottom: 32 }}>
          {missing.map((item) => (
            <div className="wf-gap-item" key={item.name}>
              <span className="wf-icon-dot">–</span>
              <div><b style={{ fontSize: "0.88rem" }}>{item.name}</b><p style={{ margin: "2px 0 0", color: "var(--wf-muted)" }}>{item.note}</p></div>
            </div>
          ))}
        </div>

        <h3 className="wf-h3">Écarts production actuelle ↔ parcours cible</h3>
        <div className="wf-note" style={{ display: "grid", gap: 10 }}>
          {gaps.map((g) => <p key={g} style={{ margin: 0 }}>• {g}</p>)}
        </div>
      </div>
    </section>
  );
}
