import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit } from "@/infrastructure/rate-limit/supabase-rate-limiter";
import { getClientIp } from "@/infrastructure/rate-limit/client-ip";

// Verrou anti-brute-force : ne compte que les tentatives échouées (jamais
// les requêtes réussies, qui renvoient sans arrêt les identifiants mis en
// cache par le navigateur — les compter aurait bloqué un usage normal).
const ADMIN_LOCKOUT_WINDOW_SECONDS = 900;
const ADMIN_LOCKOUT_MAX_ATTEMPTS = 5;

function unauthorized() {
  return new NextResponse("Authentification requise", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="KDRIVE Admin", charset="UTF-8"' } });
}

function tooManyAttempts(retryAfterSeconds: number | null) {
  return new NextResponse("Trop de tentatives. Réessayez plus tard.", {
    status: 429,
    headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined,
  });
}

/**
 * Comparaison à temps constant portable (proxy.ts tourne en Edge Runtime,
 * où `node:crypto`/`timingSafeEqual` n'est pas disponible — contrairement
 * à meta-signature.ts, qui tourne en runtime Node). Parcourt toujours la
 * longueur totale des deux chaînes, jamais de sortie anticipée au premier
 * caractère différent, pour ne pas fuiter de signal de timing exploitable.
 */
function timingSafeStringEqual(a: string, b: string): boolean {
  const maxLength = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let i = 0; i < maxLength; i++) {
    mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return mismatch === 0;
}

export async function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return unauthorized();
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return unauthorized();

  let providedUser = "";
  let providedPassword = "";
  try {
    [providedUser, providedPassword] = atob(authorization.slice(6)).split(":");
  } catch {
    return unauthorized();
  }

  const userMatches = timingSafeStringEqual(providedUser ?? "", username);
  const passwordMatches = timingSafeStringEqual(providedPassword ?? "", password);
  if (userMatches && passwordMatches) return NextResponse.next();

  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = await checkRateLimit(`admin_auth:${ip}`, ADMIN_LOCKOUT_WINDOW_SECONDS, ADMIN_LOCKOUT_MAX_ATTEMPTS);
  if (!allowed) return tooManyAttempts(retryAfterSeconds);
  return unauthorized();
}

export const config = { matcher: ["/admin/:path*"] };
