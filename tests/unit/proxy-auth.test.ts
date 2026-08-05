import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const checkRateLimit = vi.fn();

vi.mock("@/infrastructure/rate-limit/supabase-rate-limiter", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimit(...args),
}));

const { proxy } = await import("@/proxy");

const originalEnv = { ...process.env };

function requestWithAuth(user: string, password: string, ip = "1.2.3.4") {
  const headers = new Headers();
  headers.set("authorization", `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`);
  headers.set("x-forwarded-for", ip);
  return new NextRequest("https://www.kdrive-vtc-lyon.fr/admin", { headers });
}

function requestWithoutAuth(ip = "1.2.3.4") {
  const headers = new Headers();
  headers.set("x-forwarded-for", ip);
  return new NextRequest("https://www.kdrive-vtc-lyon.fr/admin", { headers });
}

beforeEach(() => {
  process.env = { ...originalEnv, ADMIN_USERNAME: "karamba", ADMIN_PASSWORD: "s3cret-pass" };
  checkRateLimit.mockReset();
  checkRateLimit.mockResolvedValue({ allowed: true, retryAfterSeconds: null });
});

describe("proxy (Basic Auth admin)", () => {
  it("laisse passer avec les bons identifiants, sans jamais toucher le verrou anti-brute-force", async () => {
    const response = await proxy(requestWithAuth("karamba", "s3cret-pass"));
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(429);
    expect(checkRateLimit).not.toHaveBeenCalled();
  });

  it("refuse sans en-tête Authorization, sans consommer le budget anti-brute-force", async () => {
    const response = await proxy(requestWithoutAuth());
    expect(response.status).toBe(401);
    expect(checkRateLimit).not.toHaveBeenCalled();
  });

  it("refuse avec un mauvais mot de passe et interroge le verrou anti-brute-force", async () => {
    const response = await proxy(requestWithAuth("karamba", "wrong-password"));
    expect(response.status).toBe(401);
    expect(checkRateLimit).toHaveBeenCalledWith("admin_auth:1.2.3.4", 900, 5);
  });

  it("refuse avec un mauvais identifiant", async () => {
    const response = await proxy(requestWithAuth("wrong-user", "s3cret-pass"));
    expect(response.status).toBe(401);
    expect(checkRateLimit).toHaveBeenCalled();
  });

  it("retourne 429 une fois le verrou anti-brute-force déclenché", async () => {
    checkRateLimit.mockResolvedValue({ allowed: false, retryAfterSeconds: 42 });
    const response = await proxy(requestWithAuth("karamba", "wrong-password"));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("42");
  });

  it("refuse si ADMIN_USERNAME/ADMIN_PASSWORD ne sont pas configurés", async () => {
    process.env.ADMIN_USERNAME = "";
    const response = await proxy(requestWithAuth("karamba", "s3cret-pass"));
    expect(response.status).toBe(401);
  });
});
