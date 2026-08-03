/**
 * Maquette visuelle uniquement du tunnel de réservation (étape 2 :
 * véhicule + tarif). Aucune logique réelle : pas de calcul, pas
 * d'appel API, pas de champ connecté au moteur de réservation. Sert
 * uniquement à illustrer la direction artistique V2 (indicateur d'étape
 * en traits fins, libellés flottants, montant en Display M).
 */
export function BookingScreenV2() {
  return (
    <section id="tunnel-v2" className="v2-section v2-section--tight v2-on-white">
      <div className="v2-container">
        <div className="v2-section-head" style={{ margin: "0 auto var(--v2-space-6)", textAlign: "center", justifyItems: "center" }}>
          <p className="v2-kicker">Écran réservation V2</p>
          <h2 className="v2-h2">Un tunnel plus épuré</h2>
          <p className="v2-lead">Maquette visuelle uniquement — aucune logique de réservation réelle n&apos;est modifiée.</p>
        </div>

        <div className="v2-booking-mock">
          <div className="v2-step-track" aria-hidden="true">
            <span className="v2-step-dot" data-done="true" />
            <span className="v2-step-line" data-done="true" />
            <span className="v2-step-dot" data-done="true" />
            <span className="v2-step-line" />
            <span className="v2-step-dot" />
            <span className="v2-step-line" />
            <span className="v2-step-dot" />
          </div>
          <p className="v2-caption" style={{ textAlign: "center" }}>Étape 2 sur 4 — Véhicule</p>

          <div className="v2-field-float"><label>Départ</label><input defaultValue="12 quai Perrache, Lyon" readOnly /></div>
          <div className="v2-field-float"><label>Destination</label><input defaultValue="Aéroport Lyon-Saint Exupéry" readOnly /></div>

          <div className="v2-price-card">
            <p className="v2-kicker">Berline</p>
            <p className="v2-price-total">45 €</p>
            <p className="v2-caption">Tarif estimé, confirmé avant votre trajet</p>
          </div>

          <button className="v2-btn v2-btn--gold" style={{ width: "100%" }}>Continuer</button>
        </div>
      </div>
    </section>
  );
}
