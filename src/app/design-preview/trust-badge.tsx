import { extractTrustindexCssPreset, fetchTrustindexWidgetHtml, neutralizeTrustindexLinks } from "@/lib/trustindex";

const TRUST_BADGE_PID = "920961080814756abd260023787";

/**
 * Badge compact "EXCELLENT ★★★★★" (widget Trustindex distinct du carrousel
 * d'avis — cf. reviews-widget.tsx pour le détail de la récupération HTML
 * côté serveur). Destiné aux bannières héro de page, à côté du titre.
 */
export async function TrustBadge() {
  const rawHtml = await fetchTrustindexWidgetHtml(TRUST_BADGE_PID);
  if (!rawHtml) return null;

  const cssHref = extractTrustindexCssPreset(rawHtml);
  // L'ajout d'avis reste réservé aux clients ayant réellement réservé, à
  // qui KDRIVE envoie lui-même le lien — jamais à un visiteur du site.
  const html = neutralizeTrustindexLinks(rawHtml);

  return (
    <div className="kd-trust-badge">
      {cssHref && <link rel="stylesheet" href={cssHref} />}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
