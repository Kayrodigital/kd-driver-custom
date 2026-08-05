/**
 * Fenêtre fixe (fixed window), fonction pure et testable sans dépendance
 * réseau. Le stockage (lecture/écriture de l'état persistant) est géré
 * séparément par l'adaptateur infra — cette fonction ne fait que décider,
 * à partir d'un état déjà lu, si la requête doit passer.
 */

export type RateLimitState = { windowStart: string; count: number } | null;

export type RateLimitDecision = {
  allowed: boolean;
  retryAfterSeconds: number | null;
  nextState: { windowStart: string; count: number };
};

export function decideRateLimit(state: RateLimitState, now: Date, windowSeconds: number, maxRequests: number): RateLimitDecision {
  const nowMs = now.getTime();
  const windowStartMs = state ? new Date(state.windowStart).getTime() : null;
  const withinWindow = windowStartMs !== null && nowMs - windowStartMs < windowSeconds * 1000;

  if (!withinWindow) {
    return { allowed: true, retryAfterSeconds: null, nextState: { windowStart: now.toISOString(), count: 1 } };
  }

  const nextCount = state!.count + 1;
  if (nextCount > maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((windowStartMs! + windowSeconds * 1000 - nowMs) / 1000));
    return { allowed: false, retryAfterSeconds, nextState: { windowStart: state!.windowStart, count: state!.count } };
  }

  return { allowed: true, retryAfterSeconds: null, nextState: { windowStart: state!.windowStart, count: nextCount } };
}
