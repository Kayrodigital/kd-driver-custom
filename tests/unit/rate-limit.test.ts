import { describe, expect, it } from "vitest";
import { decideRateLimit } from "@/domain/rate-limit/rate-limit";

describe("decideRateLimit", () => {
  const now = new Date("2026-08-06T10:00:00.000Z");

  it("autorise la première requête (aucun état préexistant)", () => {
    const decision = decideRateLimit(null, now, 60, 5);
    expect(decision.allowed).toBe(true);
    expect(decision.nextState).toEqual({ windowStart: now.toISOString(), count: 1 });
  });

  it("autorise et incrémente tant que le nombre max n'est pas atteint", () => {
    const state = { windowStart: now.toISOString(), count: 3 };
    const decision = decideRateLimit(state, now, 60, 5);
    expect(decision.allowed).toBe(true);
    expect(decision.nextState.count).toBe(4);
  });

  it("refuse une fois le nombre max dépassé, sans incrémenter davantage", () => {
    const state = { windowStart: now.toISOString(), count: 5 };
    const decision = decideRateLimit(state, now, 60, 5);
    expect(decision.allowed).toBe(false);
    expect(decision.nextState.count).toBe(5);
    expect(decision.retryAfterSeconds).not.toBeNull();
  });

  it("réinitialise la fenêtre une fois la durée écoulée, même après un dépassement", () => {
    const oldWindowStart = new Date(now.getTime() - 61_000).toISOString();
    const state = { windowStart: oldWindowStart, count: 999 };
    const decision = decideRateLimit(state, now, 60, 5);
    expect(decision.allowed).toBe(true);
    expect(decision.nextState).toEqual({ windowStart: now.toISOString(), count: 1 });
  });

  it("reste dans la même fenêtre juste avant son expiration", () => {
    const windowStart = new Date(now.getTime() - 59_000).toISOString();
    const state = { windowStart, count: 1 };
    const decision = decideRateLimit(state, now, 60, 5);
    expect(decision.nextState.windowStart).toBe(windowStart);
    expect(decision.nextState.count).toBe(2);
  });

  it("retryAfterSeconds correspond au temps restant avant la fin de la fenêtre", () => {
    const windowStart = new Date(now.getTime() - 45_000).toISOString();
    const state = { windowStart, count: 5 };
    const decision = decideRateLimit(state, now, 60, 5);
    expect(decision.retryAfterSeconds).toBe(15);
  });

  it("respecte des seuils différents selon la limite configurée", () => {
    const state = { windowStart: now.toISOString(), count: 29 };
    expect(decideRateLimit(state, now, 60, 30).allowed).toBe(true);
    expect(decideRateLimit(state, now, 60, 29).allowed).toBe(false);
  });
});
