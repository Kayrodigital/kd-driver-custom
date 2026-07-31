import { NextResponse, type NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentification requise", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="KD Driver Admin", charset="UTF-8"' } });
}

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return unauthorized();
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return unauthorized();
  try {
    const [providedUser, providedPassword] = atob(authorization.slice(6)).split(":");
    if (providedUser !== username || providedPassword !== password) return unauthorized();
    return NextResponse.next();
  } catch { return unauthorized(); }
}

export const config = { matcher: ["/admin/:path*"] };
