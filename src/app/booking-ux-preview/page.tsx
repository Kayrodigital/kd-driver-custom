import { ClientFlowSection, OwnerFlowSection } from "./flows";
import { GapAnalysisSection } from "./gap-analysis";
import { Screen1 } from "./screen1";
import { Screen2 } from "./screen2";
import { Screen3 } from "./screen3";
import { Screen4 } from "./screen4";
import { Screen5 } from "./screen5";
import { Screen6 } from "./screen6";
import { Screen7 } from "./screen7";
import { Screen8 } from "./screen8";
import { UserStoriesSection } from "./user-stories";

const navItems = [
  { href: "#intro", label: "Intro" },
  { href: "#flow-client", label: "Parcours client" },
  { href: "#flow-owner", label: "Workflow propriétaire" },
  { href: "#screen-1", label: "1. Recherche" },
  { href: "#screen-2", label: "2. Véhicules" },
  { href: "#screen-3", label: "3. Options" },
  { href: "#screen-4", label: "4. Identification" },
  { href: "#screen-5", label: "5. Récapitulatif" },
  { href: "#screen-6", label: "6. Confirmation" },
  { href: "#screen-7", label: "7. Liste (owner)" },
  { href: "#screen-8", label: "8. Fiche (owner)" },
  { href: "#user-stories", label: "User stories" },
  { href: "#components", label: "Composants & écarts" },
];

export default function BookingUxPreviewPage() {
  return (
    <>
      <div className="wf-topbar">
        <strong>KD Driver — UX Preview · Module de réservation (sprint UX, aucun impact production)</strong>
        <nav>{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      </div>

      <section id="intro" className="wf-section">
        <div className="wf-container">
          <p className="wf-kicker">Sprint UX</p>
          <h1 className="wf-h1">Écrans du module de réservation</h1>
          <p className="wf-lead">
            Cette page présente l’expérience complète cible du module de réservation KD Driver : parcours client,
            workflow propriétaire, huit écrans (mobile et desktop), user stories et critères d’acceptation. Il s’agit
            de wireframes — structure et hiérarchie, pas de rendu final — volontairement distincts du design de
            production pour ne pas être confondus avec un écran fini.
          </p>
          <div className="wf-note" style={{ marginTop: 20 }}>
            Aucune modification de la production, du moteur tarifaire, des migrations Supabase ou de la charte
            graphique n’a été effectuée pour produire cette page. Stripe et Google OAuth ne sont pas intégrés — ils
            sont représentés à l’état de wireframe uniquement.
          </div>
        </div>
      </section>

      <ClientFlowSection />
      <OwnerFlowSection />

      <Screen1 />
      <Screen2 />
      <Screen3 />
      <Screen4 />
      <Screen5 />
      <Screen6 />
      <Screen7 />
      <Screen8 />

      <UserStoriesSection />
      <GapAnalysisSection />

      <section className="wf-section">
        <div className="wf-container">
          <p className="wf-note">
            Fin de la maquette UX. Aucun déploiement en production n’a été effectué dans le cadre de ce sprint — cette
            page reste isolée à <code>/booking-ux-preview</code>.
          </p>
        </div>
      </section>
    </>
  );
}
