import { beforeEach, describe, expect, it, vi } from "vitest";

const checkRateLimit = vi.fn();

vi.mock("@/infrastructure/rate-limit/supabase-rate-limiter", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimit(...args),
}));

const { POST } = await import("@/app/api/pricing/route");

function postRequest(body: unknown) {
  return new Request("https://www.kdrive-vtc-lyon.fr/api/pricing", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "9.9.9.9" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  checkRateLimit.mockReset();
});

describe("POST /api/pricing — limite de débit", () => {
  it("retourne 429 quand la limite est dépassée, sans calculer de tarif", async () => {
    checkRateLimit.mockResolvedValue({ allowed: false, retryAfterSeconds: 12 });
    const response = await POST(postRequest({ category: "premium", distanceMeters: 1000, durationSeconds: 60 }));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("12");
    expect(checkRateLimit).toHaveBeenCalledWith("pricing:9.9.9.9", 60, 30);
  });

  it("calcule normalement quand la limite n'est pas dépassée", async () => {
    checkRateLimit.mockResolvedValue({ allowed: true, retryAfterSeconds: null });
    const response = await POST(postRequest({ category: "premium", distanceMeters: 5000, durationSeconds: 600 }));
    expect(response.status).toBe(200);
  });
});
