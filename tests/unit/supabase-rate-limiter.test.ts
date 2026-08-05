import { beforeEach, describe, expect, it, vi } from "vitest";

const maybeSingle = vi.fn();
const upsert = vi.fn();

vi.mock("@/infrastructure/supabase/admin-client", () => ({
  createAdminClient: () => ({
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle }) }),
      upsert,
    }),
  }),
}));

const { checkRateLimit } = await import("@/infrastructure/rate-limit/supabase-rate-limiter");

beforeEach(() => {
  maybeSingle.mockReset();
  upsert.mockReset();
  upsert.mockResolvedValue({ error: null });
});

describe("checkRateLimit (Supabase)", () => {
  it("autorise et crée un nouveau compteur quand aucun état n'existe", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null });
    const now = new Date("2026-08-06T10:00:00.000Z");
    const result = await checkRateLimit("test:1.2.3.4", 60, 5, now);
    expect(result.allowed).toBe(true);
    expect(upsert).toHaveBeenCalledWith({ key: "test:1.2.3.4", window_start: now.toISOString(), count: 1 }, { onConflict: "key" });
  });

  it("refuse et n'incrémente pas au-delà du maximum", async () => {
    const now = new Date("2026-08-06T10:00:00.000Z");
    maybeSingle.mockResolvedValue({ data: { window_start: now.toISOString(), count: 5 }, error: null });
    const result = await checkRateLimit("test:1.2.3.4", 60, 5, now);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).not.toBeNull();
    expect(upsert).toHaveBeenCalledWith({ key: "test:1.2.3.4", window_start: now.toISOString(), count: 5 }, { onConflict: "key" });
  });
});
