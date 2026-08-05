import { beforeEach, describe, expect, it, vi } from "vitest";

const checkRateLimit = vi.fn();

vi.mock("@/infrastructure/rate-limit/supabase-rate-limiter", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimit(...args),
}));

const { POST } = await import("@/app/api/reservations/route");

function postRequest() {
  return new Request("https://www.kdrive-vtc-lyon.fr/api/reservations", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "9.9.9.9" },
    body: JSON.stringify({}),
  });
}

beforeEach(() => {
  checkRateLimit.mockReset();
});

describe("POST /api/reservations — limite de débit", () => {
  it("retourne 429 avant même de lire/valider le corps de la requête", async () => {
    checkRateLimit.mockResolvedValue({ allowed: false, retryAfterSeconds: 300 });
    const response = await POST(postRequest());
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("300");
    expect(checkRateLimit).toHaveBeenCalledWith("reservations:9.9.9.9", 600, 5);
  });
});
