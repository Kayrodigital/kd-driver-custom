const colors = [
  { name: "Noir profond", token: "--kd-black", value: "#0e0d0c" },
  { name: "Noir doux", token: "--kd-black-soft", value: "#17140f" },
  { name: "Crème", token: "--kd-cream", value: "#f3ecdf" },
  { name: "Crème claire", token: "--kd-cream-soft", value: "#faf6ef" },
  { name: "Blanc", token: "--kd-white", value: "#ffffff" },
  { name: "Or discret", token: "--kd-gold", value: "#b08d4f" },
  { name: "Or clair", token: "--kd-gold-soft", value: "#d9c495" },
  { name: "Encre (texte)", token: "--kd-ink", value: "#1b1812" },
  { name: "Gris chaud (muted)", token: "--kd-muted", value: "#746c60" },
  { name: "Ligne", token: "--kd-line", value: "#e4dcc9" },
  { name: "Erreur", token: "--kd-error", value: "#a8412a" },
  { name: "Succès", token: "--kd-success", value: "#3f6b4d" },
];

const spacing = [
  { label: "4", value: "4px" }, { label: "8", value: "8px" }, { label: "12", value: "12px" },
  { label: "20", value: "20px" }, { label: "32", value: "32px" }, { label: "48", value: "48px" },
  { label: "72", value: "72px" }, { label: "112", value: "112px" },
];

export function DesignSystemShowcase() {
  return (
    <section id="design-system" className="kd-section kd-on-cream">
      <div className="kd-container kd-stack" style={{ gap: "var(--kd-space-7)" }}>
        <div className="kd-section-head">
          <p className="kd-eyebrow">Design system</p>
          <h2 className="kd-h2">Couleurs, typographies, composants</h2>
          <p className="kd-lead">Noir profond, crème et or discret — un service premium et local, sobre, sans surcharge d’effets.</p>
        </div>

        {/* Couleurs */}
        <div>
          <h3 className="kd-h4" style={{ marginBottom: 16 }}>Couleurs</h3>
          <div className="kd-swatch-grid">
            {colors.map((color) => (
              <div key={color.token} className="kd-swatch">
                <div className="kd-swatch-block" style={{ background: color.value, borderColor: color.value === "#ffffff" ? "var(--kd-line)" : color.value }} />
                <div className="kd-swatch-meta"><b>{color.name}</b>{color.token} · {color.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Typographies */}
        <div>
          <h3 className="kd-h4" style={{ marginBottom: 16 }}>Typographies</h3>
          <div className="kd-card">
            <div className="kd-type-row"><span className="kd-type-tag">Display / H1</span><span className="kd-h1" style={{ fontSize: "2.6rem" }}>Votre chauffeur, à l’heure près</span></div>
            <div className="kd-type-row"><span className="kd-type-tag">Display / H2</span><span className="kd-h2" style={{ fontSize: "2rem" }}>Un service sur mesure</span></div>
            <div className="kd-type-row"><span className="kd-type-tag">Display italic</span><span className="kd-h2" style={{ fontSize: "1.7rem", fontStyle: "italic" }}>Lyon, avec vous</span></div>
            <div className="kd-type-row"><span className="kd-type-tag">Interface / titre</span><span className="kd-h4">Trajets d’affaires</span></div>
            <div className="kd-type-row"><span className="kd-type-tag">Eyebrow</span><span className="kd-eyebrow">Réservation</span></div>
            <div className="kd-type-row"><span className="kd-type-tag">Lead</span><span className="kd-lead">Départ, destination, date et téléphone suffisent pour envoyer votre demande.</span></div>
            <div className="kd-type-row"><span className="kd-type-tag">Corps de texte</span><span className="kd-body">Une équipe de chauffeurs locaux, sélectionnés avec exigence, disponible jour et nuit pour vos trajets à Lyon et dans sa région.</span></div>
          </div>
          <p className="kd-field-hint" style={{ marginTop: 10 }}>Titres : Fraunces (serif élégante) · Interface : Inter (sans-serif très lisible).</p>
        </div>

        {/* Boutons */}
        <div>
          <h3 className="kd-h4" style={{ marginBottom: 16 }}>Boutons</h3>
          <div className="kd-card" style={{ display: "flex", flexWrap: "wrap", gap: "var(--kd-space-4)", alignItems: "center" }}>
            <button type="button" className="kd-btn kd-btn--primary">Demander une réservation</button>
            <button type="button" className="kd-btn kd-btn--gold">Confirmer</button>
            <button type="button" className="kd-btn kd-btn--outline">En savoir plus</button>
            <button type="button" className="kd-btn kd-btn--primary" disabled>Indisponible</button>
          </div>
          <div className="kd-card kd-card--dark" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: "var(--kd-space-4)", alignItems: "center" }}>
            <button type="button" className="kd-btn kd-btn--gold">Demander une réservation</button>
            <button type="button" className="kd-btn kd-btn--ghost-dark">Voir les tarifs</button>
          </div>
        </div>

        {/* Champs */}
        <div>
          <h3 className="kd-h4" style={{ marginBottom: 16 }}>Champs</h3>
          <div className="kd-card kd-state-grid">
            <div className="kd-state-card">
              <span className="kd-state-label">Par défaut</span>
              <label className="kd-field"><span className="kd-field-label">Téléphone</span><input className="kd-input" placeholder="06 12 34 56 78" /></label>
            </div>
            <div className="kd-state-card">
              <span className="kd-state-label">Focus</span>
              <label className="kd-field"><span className="kd-field-label">Téléphone</span><input className="kd-input" defaultValue="06 12 34 56 78" style={{ borderColor: "var(--kd-gold)", boxShadow: "0 0 0 4px rgba(176,141,79,.16)" }} /></label>
            </div>
            <div className="kd-state-card">
              <span className="kd-state-label">Erreur</span>
              <div className="kd-field kd-field--error">
                <span className="kd-field-label">Téléphone</span>
                <input className="kd-input" defaultValue="06" />
                <p className="kd-field-error">Numéro de téléphone incomplet.</p>
              </div>
            </div>
            <div className="kd-state-card">
              <span className="kd-state-label">Désactivé</span>
              <label className="kd-field"><span className="kd-field-label">Téléphone</span><input className="kd-input" placeholder="Indisponible" disabled /></label>
            </div>
          </div>
        </div>

        {/* Cartes */}
        <div>
          <h3 className="kd-h4" style={{ marginBottom: 16 }}>Cartes</h3>
          <div className="kd-grid-3">
            <div className="kd-card kd-card--hover">
              <p className="kd-eyebrow">Carte claire</p>
              <h4 className="kd-h4" style={{ margin: "8px 0" }}>Survol actif</h4>
              <p className="kd-body">Légère élévation et liseré or au survol.</p>
            </div>
            <div className="kd-card kd-card--dark">
              <p className="kd-eyebrow">Carte sombre</p>
              <h4 className="kd-h4" style={{ margin: "8px 0" }}>Sur fond noir</h4>
              <p className="kd-body" style={{ color: "var(--kd-muted-on-dark)" }}>Utilisée sur les sections d’ambiance.</p>
            </div>
            <div className="kd-card kd-card--flat">
              <p className="kd-eyebrow">Carte plate</p>
              <h4 className="kd-h4" style={{ margin: "8px 0" }}>Sans ombre</h4>
              <p className="kd-body">Pour les listes denses (ex. tableau admin).</p>
            </div>
          </div>
        </div>

        {/* Espacements */}
        <div>
          <h3 className="kd-h4" style={{ marginBottom: 16 }}>Espacements</h3>
          <div className="kd-card kd-stack">
            {spacing.map((space) => (
              <div key={space.label} className="kd-space-row">
                <span className="kd-space-label">{space.label}px</span>
                <span className="kd-space-bar" style={{ width: space.value }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
