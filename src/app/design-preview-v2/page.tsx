import { NavV2 } from "./nav-v2";
import { HeroV2 } from "./hero-v2";
import { ServicesV2, VehiclesV2, ReassuranceV2, CtaV2 } from "./sections-v2";
import { BookingScreenV2 } from "./booking-screen-v2";
import { FadeUpObserver } from "./fade-up-observer";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function DesignPreviewV2Page() {
  return (
    <>
      <div style={{ background: "#0b0a09", color: "#f3ecdf", padding: "10px 24px", fontSize: "0.8rem", textAlign: "center" }}>
        Direction artistique V2 — proposition à valider. Route isolée, aucune page de production n&apos;est modifiée.
        Voir <code>docs/DESIGN_DIRECTION_V2.md</code>.
      </div>
      <NavV2 />
      <HeroV2 />
      <ServicesV2 />
      <VehiclesV2 />
      <ReassuranceV2 />
      <BookingScreenV2 />
      <CtaV2 />
      <footer className="v2-on-dark" style={{ padding: "48px 0", textAlign: "center" }}>
        <p className="v2-footer-note">© {new Date().getFullYear()} KDRIVE — Direction artistique V2 (proposition)</p>
      </footer>
      <FadeUpObserver />
    </>
  );
}
