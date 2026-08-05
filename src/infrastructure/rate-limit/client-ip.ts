/**
 * Vercel place l'IP réelle du client dans x-forwarded-for (le premier
 * segment, les suivants étant les proxys intermédiaires). "unknown" en
 * secours plutôt que de faire échouer la requête — dans ce cas, toutes
 * les requêtes sans IP identifiable partagent le même compteur, ce qui
 * reste un filet de sécurité correct (jamais moins strict que prévu).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}
