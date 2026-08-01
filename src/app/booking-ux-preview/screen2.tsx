import { ScreenShell, StateCard } from "./screen-shell";

const vehicles = [
  { name: "Berline", body: "4 passagers · confort quotidien", passengers: 4, luggage: 3, price: "27,50 €", min: "min. 25 €", quote: false },
  { name: "Confort", body: "4 passagers · un cran au-dessus", passengers: 4, luggage: 3, price: "24,00 €", min: "min. 20 €", quote: false },
  { name: "Luxe", body: "3 passagers · haut de gamme", passengers: 3, luggage: 2, price: null, min: null, quote: true },
  { name: "Van", body: "7 passagers · groupes et familles", passengers: 7, luggage: 7, price: null, min: null, quote: true },
  { name: "Monospace", body: "6 passagers · confort et espace", passengers: 6, luggage: 5, price: null, min: null, quote: true },
];

function TripSummary({ compact = false }: { compact?: boolean }) {
  return (
    <div className="wf-card">
      <h3 className="wf-h3">Votre trajet</h3>
      <p style={{ fontSize: "0.86rem", margin: "0 0 6px" }}>Gare Part-Dieu → Aéroport Lyon-Saint Exupéry</p>
      <div className="wf-chip-row">
        <span className="wf-chip">34,8 km</span>
        <span className="wf-chip">≈ 36 min</span>
        {!compact && <span className="wf-chip">20 août, 15:00</span>}
      </div>
    </div>
  );
}

function VehicleCard({ v }: { v: (typeof vehicles)[number] }) {
  return (
    <div className="wf-card">
      <div className="wf-media-block">image véhicule</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <b>{v.name}</b>
        {v.quote ? <span className="wf-pill">Sur devis</span> : <span className="wf-pill wf-pill--accent">{v.price}</span>}
      </div>
      <p style={{ fontSize: "0.82rem", color: "var(--wf-muted)", margin: "4px 0 8px" }}>{v.body}</p>
      <div className="wf-chip-row" style={{ marginBottom: 10 }}>
        <span className="wf-chip">{v.passengers} passagers</span>
        <span className="wf-chip">{v.luggage} bagages</span>
        {v.min && <span className="wf-chip">{v.min}</span>}
      </div>
      <button className="wf-btn wf-btn--primary wf-btn--block">Choisir</button>
    </div>
  );
}

function MobileContent() {
  return (
    <>
      <TripSummary compact />
      {vehicles.slice(0, 2).map((v) => <VehicleCard key={v.name} v={v} />)}
      <p className="wf-note">↓ suite : Luxe, Van, Monospace (sur devis) — une carte par ligne, pleine largeur.</p>
    </>
  );
}

function DesktopContent() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}><TripSummary /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {vehicles.map((v) => <VehicleCard key={v.name} v={v} />)}
      </div>
      <p className="wf-note" style={{ marginTop: 16 }}>Variante possible : résumé du trajet en colonne latérale sticky plutôt qu’en bandeau au-dessus, si la liste des catégories s’allonge.</p>
    </div>
  );
}

export function Screen2() {
  return (
    <ScreenShell
      id="screen-2"
      kicker="Écran 2"
      title="Véhicules et tarifs"
      lead="Présenter les catégories disponibles après le calcul du trajet. Les catégories sur devis restent visibles et permettent de continuer la demande — jamais masquées."
      mobile={<MobileContent />}
      desktop={<DesktopContent />}
      states={
        <>
          <StateCard type="loading" label="Calcul en cours">Squelettes de cartes (media block + lignes grises) pendant l’appel pricing.</StateCard>
          <StateCard type="empty" label="Aucune catégorie disponible">Message « Aucun véhicule disponible pour ce trajet actuellement » + CTA retour recherche.</StateCard>
          <StateCard type="warning" label="Prix indisponible">Carte affichée avec « Tarif à confirmer » à la place du prix, CTA « Choisir » reste actif.</StateCard>
          <StateCard type="error" label="Erreur de calcul">Bandeau d’erreur au-dessus des cartes + bouton « Réessayer », résumé du trajet conservé.</StateCard>
          <StateCard type="normal" label="Demande sur devis">Pastille « Sur devis » remplace le prix ; texte d’aide : « Tarif confirmé par KD Driver avant paiement. »</StateCard>
          <StateCard type="warning" label="Dépassement de capacité">Si passagers/bagages saisis à l’écran 1 dépassent la capacité d’une carte, badge d’avertissement sur cette carte plutôt que blocage.</StateCard>
        </>
      }
    />
  );
}
