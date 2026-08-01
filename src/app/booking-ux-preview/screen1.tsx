import { ScreenShell, StateCard } from "./screen-shell";

function MobileContent() {
  return (
    <>
      <div className="wf-field">
        <span className="wf-field-label">Départ</span>
        <div className="wf-input">Adresse de départ</div>
      </div>
      <button className="wf-btn wf-btn--secondary wf-btn--block">📍 Utiliser ma position actuelle</button>
      <div className="wf-field">
        <span className="wf-field-label">Destination</span>
        <div className="wf-input">Destination</div>
      </div>
      <div className="wf-row">
        <div className="wf-field"><span className="wf-field-label">Date</span><div className="wf-input">jj/mm/aaaa</div></div>
        <div className="wf-field"><span className="wf-field-label">Heure</span><div className="wf-input">--:--</div></div>
      </div>
      <button className="wf-btn wf-btn--primary wf-btn--block">Voir les véhicules et les tarifs</button>
    </>
  );
}

function DesktopContent() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div className="wf-row" style={{ alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
        <div className="wf-field" style={{ flex: 2, minWidth: 200 }}>
          <span className="wf-field-label">Départ</span>
          <div className="wf-input">Adresse de départ · 📍</div>
        </div>
        <div className="wf-field" style={{ flex: 2, minWidth: 200 }}>
          <span className="wf-field-label">Destination</span>
          <div className="wf-input">Destination</div>
        </div>
        <div className="wf-field" style={{ flex: 1, minWidth: 130 }}>
          <span className="wf-field-label">Date</span>
          <div className="wf-input">jj/mm/aaaa</div>
        </div>
        <div className="wf-field" style={{ flex: 1, minWidth: 110 }}>
          <span className="wf-field-label">Heure</span>
          <div className="wf-input">--:--</div>
        </div>
        <button className="wf-btn wf-btn--primary" style={{ flex: "none" }}>Voir les véhicules et les tarifs</button>
      </div>
      <p className="wf-note" style={{ marginTop: 16 }}>Une seule ligne équilibrée dès que la largeur le permet ; repli sur deux lignes (adresses / date-heure-CTA) entre ~900 et 1200px pour éviter des champs trop étroits.</p>
    </div>
  );
}

export function Screen1() {
  return (
    <ScreenShell
      id="screen-1"
      kicker="Écran 1"
      title="Recherche rapide"
      lead="Permettre au visiteur de commencer une réservation en quelques secondes. Cinq champs maximum, aucune identification, aucun choix de véhicule à ce stade."
      mobile={<MobileContent />}
      desktop={<DesktopContent />}
      states={
        <>
          <StateCard type="normal" label="Normal">Les 5 champs vides, CTA désactivé tant que départ, destination, date et heure ne sont pas renseignés.</StateCard>
          <StateCard type="loading" label="Chargement">CTA en état « Calcul en cours… », champs verrouillés pendant l’appel Routes.</StateCard>
          <StateCard type="loading" label="Géolocalisation en cours">Icône 📍 en cours d’animation, champ départ désactivé jusqu’à la réponse du navigateur.</StateCard>
          <StateCard type="warning" label="Autorisation GPS refusée">Message discret sous le champ départ : « Position indisponible. Saisissez l’adresse manuellement. » Le formulaire reste utilisable.</StateCard>
          <StateCard type="error" label="Adresse introuvable">Message sous le champ concerné, sans bloquer les autres champs.</StateCard>
          <StateCard type="error" label="Erreur Google Maps">Message générique « Calcul d’itinéraire indisponible, réessayez. », CTA reste actif pour relancer.</StateCard>
          <StateCard type="warning" label="Date passée">Validation douce sous le champ date, CTA désactivé.</StateCard>
          <StateCard type="warning" label="Heure passée">Idem si la date est aujourd’hui et l’heure déjà dépassée.</StateCard>
          <StateCard type="warning" label="Départ = destination">Message « Départ et destination identiques » sous le champ destination.</StateCard>
        </>
      }
    />
  );
}
