import Link from "next/link";
import type { BlogArticle } from "@/domain/blog/types";
import { endedStatusLabel } from "@/domain/blog/registry";

function formatEventDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Plage de dates lisible ("16 – 18 mars 2027") à partir de deux dates ISO. */
export function formatEventDateRange(article: BlogArticle): string | undefined {
  const start = formatEventDate(article.eventStartDate);
  const end = formatEventDate(article.eventEndDate);
  if (start && end && start !== end) return `${start} – ${end}`;
  return start ?? end;
}

export function StatusPill({ article }: { article: BlogArticle }) {
  const label = article.status === "a-venir" ? "À venir" : endedStatusLabel(article);
  return <span className="kd-pill">{label}</span>;
}

/** Carte article réutilisée sur l'accueil (section "Prochains événements") et sur la page catégorie. */
export function ArticleCard({ article }: { article: BlogArticle }) {
  const dateRange = formatEventDateRange(article);
  return (
    <Link href={`/blog/${article.slug}`} className="kd-card kd-card--hover" style={{ display: "grid", gap: 10 }}>
      <StatusPill article={article} />
      <h3 className="kd-h4">{article.h1}</h3>
      {(dateRange || article.eventLocation) && (
        <p className="kd-body" style={{ margin: 0, fontWeight: 600 }}>
          {dateRange}
          {dateRange && article.eventLocation ? " · " : ""}
          {article.eventLocation}
        </p>
      )}
      <p className="kd-body" style={{ margin: 0 }}>{article.excerpt}</p>
      <span className="kd-card-link">Voir le guide <span aria-hidden="true">→</span></span>
    </Link>
  );
}
