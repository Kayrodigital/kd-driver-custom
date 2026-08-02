import { ClientFlowSection, DriverFlowSection, OwnerFlowSection } from "./flows";
import { ConfidentialityMatrixSection } from "./confidentiality-matrix";
import { AutomationMapSection } from "./automation-map";
import { PricingSpecSection } from "./pricing-spec";
import {
  ScreenTrajet, ScreenCategorie, ScreenOptions, ScreenIdentification, ScreenRecap,
  ScreenDemandeRecue, ScreenCourseConfirmee, ScreenBonClient,
} from "./screens-client";
import {
  ScreenListeDemandes, ScreenNouvelleDemande, ScreenTarifCommission, ScreenAnnonceGroupe,
  ScreenRechercheChauffeur, ScreenAucunChauffeur, ScreenAffectation, ScreenMessagePrive, ScreenGenerationBon,
  ScreenConfirmationClient, ScreenHistorique,
} from "./screens-owner";

const navItems = [
  { href: "#intro", label: "Intro" },
  { href: "#flow-client", label: "Parcours client" },
  { href: "#flow-owner", label: "Parcours propriétaire" },
  { href: "#flow-driver", label: "Parcours chauffeur" },
  { href: "#pricing-spec", label: "Grille tarifaire" },
  { href: "#screen-c1", label: "C1. Trajet" },
  { href: "#screen-c2", label: "C2. Catégorie" },
  { href: "#screen-c3", label: "C3. Options" },
  { href: "#screen-c4", label: "C4. Identification" },
  { href: "#screen-c5", label: "C5. Récapitulatif" },
  { href: "#screen-c6", label: "C6. Demande reçue" },
  { href: "#screen-c7", label: "C7. Course confirmée" },
  { href: "#screen-c8", label: "C8. Bon (client)" },
  { href: "#screen-o1", label: "P1. Liste demandes" },
  { href: "#screen-o2", label: "P2. Nouvelle demande" },
  { href: "#screen-o3", label: "P3. Tarif/commission" },
  { href: "#screen-o4", label: "P4. Annonce groupe" },
  { href: "#screen-o5", label: "P5. Recherche chauffeur" },
  { href: "#screen-o6", label: "P6. Aucun chauffeur" },
  { href: "#screen-o7", label: "P7. Affectation" },
  { href: "#screen-o8", label: "P8. Message privé" },
  { href: "#screen-o9", label: "P9. Bon (interne)" },
  { href: "#screen-o10", label: "P10. Confirmation client" },
  { href: "#screen-o11", label: "P11. Historique" },
  { href: "#confidentiality", label: "Confidentialité" },
  { href: "#automations", label: "Automatisations" },
];

export default function BookingUxPreviewV2Page() {
  return (
    <>
      <div className="wf-topbar">
        <strong>KDRIVE — UX Preview V2 · Parcours réel (client → KDRIVE → groupe chauffeurs → chauffeur retenu)</strong>
        <nav>{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      </div>

      <section id="intro" className="wf-section">
        <div className="wf-container">
          <p className="wf-kicker">Sprint UX V2</p>
          <h1 className="wf-h1">Parcours client, propriétaire et affectation chauffeur</h1>
          <p className="wf-lead">
            Cette fiche remplace le modèle « client → chauffeur direct » par le fonctionnement réel de KDRIVE :
            le client envoie une demande, le propriétaire confirme le tarif et diffuse une annonce anonymisée dans
            un groupe WhatsApp de chauffeurs, choisit le chauffeur intéressé, lui transmet les informations
            complètes en privé, puis confirme la course au client. Le paiement se fait directement au chauffeur,
            généralement par TPE — il n’y a pas de paiement en ligne dans cette version.
          </p>
          <div className="wf-note" style={{ marginTop: 20 }}>
            Wireframes uniquement — données entièrement fictives (Mamadou Diallo, 06 00 00 00 00, Karim B.,
            plaque AA-123-BB). Aucune modification de Supabase, des migrations, de l’API, des statuts en
            production, de Brevo, du tunnel existant ou de l’administration actuelle. Page isolée à
            <code> /booking-ux-preview-v2</code>, non indexée, non liée dans le menu public.
          </div>
        </div>
      </section>

      <ClientFlowSection />
      <OwnerFlowSection />
      <DriverFlowSection />
      <PricingSpecSection />

      <ScreenTrajet />
      <ScreenCategorie />
      <ScreenOptions />
      <ScreenIdentification />
      <ScreenRecap />
      <ScreenDemandeRecue />
      <ScreenCourseConfirmee />
      <ScreenBonClient />

      <ScreenListeDemandes />
      <ScreenNouvelleDemande />
      <ScreenTarifCommission />
      <ScreenAnnonceGroupe />
      <ScreenRechercheChauffeur />
      <ScreenAucunChauffeur />
      <ScreenAffectation />
      <ScreenMessagePrive />
      <ScreenGenerationBon />
      <ScreenConfirmationClient />
      <ScreenHistorique />

      <ConfidentialityMatrixSection />
      <AutomationMapSection />

      <section className="wf-section">
        <div className="wf-container">
          <p className="wf-note">
            Fin de la fiche UX V2. Aucune implémentation métier n’a été effectuée dans le cadre de ce sprint — cette
            page reste isolée à <code>/booking-ux-preview-v2</code>, distincte de <code>/booking-ux-preview</code>
            (V1) et du tunnel de réservation réel.
          </p>
        </div>
      </section>
    </>
  );
}
