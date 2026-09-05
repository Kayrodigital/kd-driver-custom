/**
 * Récupération côté serveur du HTML statique d'un widget Trustindex (avis,
 * badge...) — voir reviews-widget.tsx pour le détail de pourquoi leur
 * loader.js (basé sur document.currentScript) ne fonctionne pas dans
 * l'App Router. Réutilisé par tout widget Trustindex du site.
 *
 * Pas de garde "server-only" : other-pages-templates.tsx (qui rend
 * TrustBadge via PageHero) est aussi importé par l'outil de
 * prévisualisation client-side /design-preview, qui désactive le badge via
 * `showTrustBadge={false}` — TrustBadge n'y est donc jamais réellement
 * appelé, mais la seule présence de l'import dans ce graphe de modules
 * suffirait à faire échouer le build avec la garde stricte.
 */
export async function fetchTrustindexWidgetHtml(pid: string): Promise<string | null> {
  try {
    const response = await fetch(`https://cdn.trustindex.io/widgets/${pid.slice(0, 2)}/${pid}/content.html`, {
      next: { revalidate: 3600 },
    });
    return response.ok ? await response.text() : null;
  } catch {
    return null;
  }
}

/**
 * Le client veut réserver l'ajout d'avis aux seuls clients ayant réellement
 * réservé, à qui il envoie lui-même le lien — jamais à un visiteur du site
 * qui cliquerait sur le widget. On retire donc tout ce qui rend les liens
 * du HTML Trustindex navigables (href, target, role="button" qui n'a plus
 * de sens sans href), sans changer la structure ni le rendu visuel.
 */
export function neutralizeTrustindexLinks(html: string): string {
  return html
    .replace(/\s+href="[^"]*"/g, "")
    .replace(/\s+target="_blank"/g, "")
    .replace(/\s+role="button"/g, "");
}

export function extractTrustindexCssPreset(html: string): string | null {
  const layoutId = /data-layout-id="([^"]+)"/.exec(html)?.[1];
  const setId = /data-set-id="([^"]+)"/.exec(html)?.[1];
  const cssVersion = /data-css-version="([^"]+)"/.exec(html)?.[1];
  if (!layoutId || !setId || !cssVersion) return null;
  return `https://cdn.trustindex.io/assets/widget-presetted-css/v${cssVersion}/${layoutId}-${setId}.css`;
}
