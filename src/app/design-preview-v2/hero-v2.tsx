import { SceneImage } from "@/app/design-preview/scene-image";

function IconClock() {
  return (
    <svg className="v2-reassurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  );
}
function IconHandshake() {
  return (
    <svg className="v2-reassurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 11l4-4 4 3 3-3 4 4" /><path d="M3 11l3 5 4 2 5-2 3-5" /></svg>
  );
}
function IconPhone() {
  return (
    <svg className="v2-reassurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
  );
}

export function HeroV2() {
  return (
    <section className="v2-hero v2-on-dark">
      <SceneImage src="/images/hero-lyon.jpg" alt="" className="v2-hero-photo" priority sizes="100vw" style={{ position: "absolute", inset: 0 }} />
      <div className="v2-hero-scrim" />
      <div className="v2-container v2-hero-inner">
        <div className="v2-hero-copy">
          <p className="v2-kicker">Chauffeur privé · Lyon</p>
          <h1 className="v2-display-xl">Votre trajet, réservé en toute sérénité.</h1>
          <p className="v2-lead">Réservez votre trajet à Lyon en quelques instants. KDRIVE confirme ensuite la disponibilité et le tarif.</p>
        </div>
        <div className="v2-hero-form-card">
          <p className="v2-kicker">Réservation</p>
          <h2 className="v2-h3" style={{ marginTop: 8, marginBottom: 20 }}>Réserver votre trajet</h2>
          <div style={{ display: "grid", gap: 14 }}>
            <div className="v2-field-float"><label>Départ</label><input placeholder="" /></div>
            <div className="v2-field-float"><label>Destination</label><input placeholder="" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="v2-field-float"><label>Date</label><input placeholder="" /></div>
              <div className="v2-field-float"><label>Heure</label><input placeholder="" /></div>
            </div>
            <button className="v2-btn v2-btn--gold" style={{ width: "100%" }}>Voir les véhicules et les tarifs</button>
          </div>
        </div>
      </div>
      <div className="v2-container" style={{ position: "relative", zIndex: 2, marginTop: 32 }}>
        <div className="v2-reassurance">
          <span className="v2-reassurance-item"><IconClock /> Tarif estimé avant confirmation</span>
          <span className="v2-reassurance-item"><IconHandshake /> Confirmation humaine</span>
          <span className="v2-reassurance-item"><IconPhone /> Contact direct</span>
        </div>
      </div>
    </section>
  );
}
