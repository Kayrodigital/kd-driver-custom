import { extractTrustindexCssPreset, fetchTrustindexWidgetHtml, redirectTrustindexLinks } from "@/lib/trustindex";

const TRUST_BADGE_PID = "920961080814756abd260023787";

/**
 * Badge compact "EXCELLENT ★★★★★" (widget Trustindex distinct du carrousel
 * d'avis — cf. reviews-widget.tsx pour le détail de la récupération HTML
 * côté serveur). Destiné aux bannières héro de page, à côté du titre.
 *
 * Seule la section avis de l'accueil existe sur le site (aucune autre page
 * n'a de carrousel d'avis) : le badge y renvoie toujours, y compris depuis
 * les autres pages ("/#avis" déclenche la navigation puis le défilement).
 */
export async function TrustBadge() {
  const rawHtml = await fetchTrustindexWidgetHtml(TRUST_BADGE_PID);
  if (!rawHtml) return null;

  const cssHref = extractTrustindexCssPreset(rawHtml);
  // Le lien pointe vers la section avis du site plutôt que vers le
  // formulaire public Trustindex — l'ajout d'avis reste réservé aux
  // clients ayant réellement réservé, à qui KDRIVE envoie lui-même le lien.
  const html = redirectTrustindexLinks(rawHtml, "/#avis");

  return (
    <div className="kd-trust-badge">
      {cssHref && <link rel="stylesheet" href={cssHref} />}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
