import { SceneImage } from "./scene-image";
import { SiteNav, FooterSection } from "./sections";

export type ServicePageContent = {
  key: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  ctaLabel: string;
  heroImage: string;
  presentationEyebrow: string;
  presentationTitle: string;
  presentationBody: string;
  benefits: { title: string; body: string }[];
  visualImage: string;
  steps: { title: string; body: string }[];
  usefulInfo: string[];
  reassuranceTitle: string;
  reassuranceBody: string;
  ctaFinalTitle: string;
};

/**
 * Template de page service générique — appliqué à Transfert aéroport,
 * Transfert gare, Chauffeur privé entreprise, Mise à disposition et
 * Longues distances. Structure fixe (brief) : hero, présentation, trois
 * bénéfices, visuel, déroulement de réservation, infos utiles,
 * réassurance, CTA final.
 */
export function ServicePageTemplate({ content, framed = true }: { content: ServicePageContent; framed?: boolean }) {
  const frameStyle = framed ? { border: "1px solid var(--kd-line)", borderRadius: "var(--kd-radius-lg)", overflow: "hidden", boxShadow: "var(--kd-shadow-lg)" } : undefined;
  return (
    <div style={frameStyle}>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>

      <section className="kd-hero kd-hero--a kd-on-dark">
        <SceneImage src={content.heroImage} alt="" className="kd-hero-photo" />
        <div className="kd-container kd-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div className="kd-hero-copy">
            <p className="kd-eyebrow">{content.eyebrow}</p>
            <h1 className="kd-h1">{content.title}</h1>
            <p className="kd-lead">{content.lead}</p>
            <a className="kd-btn kd-btn--gold" href="#reserver" style={{ marginTop: 8, alignSelf: "start" }}>
              {content.ctaLabel} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container kd-stack" style={{ maxWidth: 720 }}>
          <p className="kd-eyebrow">{content.presentationEyebrow}</p>
          <h2 className="kd-h2">{content.presentationTitle}</h2>
          <p className="kd-lead">{content.presentationBody}</p>
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-grid-3">
            {content.benefits.map((benefit) => (
              <div key={benefit.title} className="kd-card kd-card--flat">
                <h3 className="kd-h4">{benefit.title}</h3>
                <p className="kd-body" style={{ marginTop: 8 }}>{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream" style={{ paddingTop: 0 }}>
        <div className="kd-container">
          <SceneImage src={content.visualImage} alt="" className="kd-scene--tall" style={{ minHeight: 420 }} />
        </div>
      </section>

      <section className="kd-section kd-on-white">
        <div className="kd-container">
          <div className="kd-section-head">
            <p className="kd-eyebrow">Réservation</p>
            <h2 className="kd-h2">Trois étapes, aucune attente</h2>
          </div>
          <div className="kd-grid-3">
            {content.steps.map((step, index) => (
              <div key={step.title} className="kd-advantage">
                <span className="kd-advantage-num">{index + 1}</span>
                <div>
                  <h3 className="kd-h4">{step.title}</h3>
                  <p className="kd-body">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kd-section kd-on-cream">
        <div className="kd-container" style={{ maxWidth: 640 }}>
          <p className="kd-eyebrow">Informations utiles</p>
          <ul className="kd-stack" style={{ marginTop: 16, listStyle: "none", padding: 0 }}>
            {content.usefulInfo.map((info) => (
              <li key={info} className="kd-body" style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <span aria-hidden="true" style={{ color: "var(--kd-gold)" }}>—</span> {info}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="kd-section kd-on-dark">
        <div className="kd-container kd-section-head--center kd-stack">
          <p className="kd-eyebrow">Réassurance</p>
          <h2 className="kd-h2">{content.reassuranceTitle}</h2>
          <p className="kd-lead" style={{ margin: "0 auto" }}>{content.reassuranceBody}</p>
        </div>
      </section>

      <section id="reserver" className="kd-section kd-on-white">
        <div className="kd-container kd-cta">
          <p className="kd-eyebrow">Réservation</p>
          <h2 className="kd-h2">{content.ctaFinalTitle}</h2>
          <a className="kd-btn kd-btn--primary" href="/reserver">Demander une réservation <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
