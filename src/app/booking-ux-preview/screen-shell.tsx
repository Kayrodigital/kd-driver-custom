import type { ReactNode } from "react";

export function ScreenShell({
  id, kicker, title, lead, mobile, desktop, states,
}: {
  id: string; kicker: string; title: string; lead: string;
  mobile: ReactNode; desktop: ReactNode; states?: ReactNode;
}) {
  return (
    <section id={id} className="wf-section">
      <div className="wf-container">
        <div className="wf-section-head">
          <p className="wf-kicker">{kicker}</p>
          <h2 className="wf-h2">{title}</h2>
          <p className="wf-lead">{lead}</p>
        </div>

        <div className="wf-frames">
          <div>
            <p className="wf-frame-label">Mobile</p>
            <div className="wf-mobile-frame">
              <div className="wf-mobile-screen"><div className="wf-mobile-screen-inner">{mobile}</div></div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 320 }}>
            <p className="wf-frame-label">Desktop</p>
            <div className="wf-desktop-frame">
              <div className="wf-desktop-bar"><span /><span /><span /></div>
              <div className="wf-desktop-screen">{desktop}</div>
            </div>
          </div>
        </div>

        {states && (
          <>
            <h3 className="wf-h3" style={{ marginTop: 36 }}>États à prévoir</h3>
            <div className="wf-state-gallery">{states}</div>
          </>
        )}
      </div>
    </section>
  );
}

export function StateCard({ type, label, children }: { type: "normal" | "loading" | "error" | "empty" | "success" | "warning"; label: string; children: ReactNode }) {
  return (
    <div className="wf-state-card">
      <span className={`wf-state-card-label ${type}`}>{type === "loading" && <span className="wf-spinner" />}{label}</span>
      <p>{children}</p>
    </div>
  );
}
