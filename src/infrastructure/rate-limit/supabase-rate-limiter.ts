import "server-only";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { decideRateLimit, type RateLimitState } from "@/domain/rate-limit/rate-limit";

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number | null };

/**
 * Lecture-puis-écriture, pas de fonction Postgres atomique dédiée — même
 * choix que appendHistoryEvent (booking-repository.ts) pour ce projet : le
 * risque de concurrence (compter légèrement plus ou moins de requêtes lors
 * d'un pic simultané exact) est acceptable pour un rate limiter, qui n'a
 * pas besoin d'une exactitude parfaite, seulement d'un ordre de grandeur
 * fiable.
 */
export async function checkRateLimit(key: string, windowSeconds: number, maxRequests: number, now = new Date()): Promise<RateLimitResult> {
  const supabase = createAdminClient();
  const { data } = await supabase.from("rate_limit_counters").select("window_start,count").eq("key", key).maybeSingle();
  const state: RateLimitState = data ? { windowStart: data.window_start, count: data.count } : null;

  const decision = decideRateLimit(state, now, windowSeconds, maxRequests);

  await supabase
    .from("rate_limit_counters")
    .upsert({ key, window_start: decision.nextState.windowStart, count: decision.nextState.count }, { onConflict: "key" });

  return { allowed: decision.allowed, retryAfterSeconds: decision.retryAfterSeconds };
}
