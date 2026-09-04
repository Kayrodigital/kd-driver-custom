import { ReviewsWidget } from "./reviews-widget";

/**
 * Séparé de sections.tsx : ce fichier importe ReviewsWidget, un composant
 * serveur asynchrone (fetch Trustindex, cf. reviews-widget.tsx). sections.tsx
 * est aussi importé par l'outil de prévisualisation client-side
 * (/design-preview), et un import ES module entraîne tout le graphe de
 * dépendances du fichier — même un export non utilisé — dans le bundle
 * client, où un composant serveur async ne peut pas être rendu.
 */
export function ReviewsSection() {
  return (
    <section id="avis" className="kd-section kd-on-cream">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Avis clients</p>
          <h2 className="kd-h2">Ce que nos clients disent de KDRIVE</h2>
        </div>
        <ReviewsWidget pid="97e48897843c59738b56f76f33b" />
      </div>
    </section>
  );
}
