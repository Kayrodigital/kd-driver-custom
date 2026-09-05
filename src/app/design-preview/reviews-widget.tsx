import { extractTrustindexCssPreset, fetchTrustindexWidgetHtml, neutralizeTrustindexLinks } from "@/lib/trustindex";

/**
 * Le loader JS de Trustindex (cdn.trustindex.io/loader.js) suppose un
 * <script> analysé nativement par le navigateur et exposé via
 * document.currentScript pour se retrouver et se remplacer par le widget.
 * Dans l'App Router, tout élément JSX (même un <script> littéral, même via
 * next/script) est recréé côté client par React au lieu d'être une vraie
 * balise HTML analysée par le parseur — document.currentScript reste donc
 * `null` et l'auto-initialisation du script échoue silencieusement (avis
 * absents, ou, selon le timing, un widget vide créé au mauvais endroit —
 * d'où le bug initial : les avis sous le footer sur toutes les pages).
 *
 * Le contenu du widget (avis, notes, photos) est en réalité du HTML statique
 * servi tel quel par leur CDN (content.html) — la partie JS ne sert qu'aux
 * interactions du carrousel. On récupère donc ce HTML côté serveur et on
 * l'intègre directement : fiable, dans le bon conteneur, sans dépendre du
 * comportement d'un script tiers incompatible avec cette architecture.
 */

const WIDGET_PID = "97e48897843c59738b56f76f33b";

export async function ReviewsWidget({ pid = WIDGET_PID }: { pid?: string }) {
  const rawHtml = await fetchTrustindexWidgetHtml(pid);
  if (!rawHtml) return <div className="kd-reviews-widget" />;

  const cssHref = extractTrustindexCssPreset(rawHtml);
  // L'ajout d'avis reste réservé aux clients ayant réellement réservé, à
  // qui KDRIVE envoie lui-même le lien — jamais à un visiteur du site.
  const html = neutralizeTrustindexLinks(rawHtml);

  return (
    <div className="kd-reviews-widget">
      {cssHref && <link rel="stylesheet" href={cssHref} />}
      {/* HTML statique fourni par Trustindex pour ce pid — même contenu que
          leur propre script insérerait via t.innerHTML. */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
