import { describe, expect, it } from "vitest";
import { formatDateTimeParis } from "@/lib/format-date";

describe("formatDateTimeParis", () => {
  it("convertit en heure de Paris (CEST, UTC+2) en été, jamais l'heure UTC brute", () => {
    // 04:45 UTC le 6 août 2026 = 06:45 heure de Paris (été, CEST) — c'est
    // exactement l'écart de 2h signalé par le client (dashboard affichait
    // l'heure UTC brute au lieu de l'heure française).
    const result = formatDateTimeParis("2026-08-06T04:45:00.000Z", { dateStyle: "short", timeStyle: "short" });
    expect(result).toContain("06:45");
    expect(result).not.toContain("04:45");
  });

  it("convertit en heure de Paris (CET, UTC+1) en hiver", () => {
    const result = formatDateTimeParis("2026-01-15T10:00:00.000Z", { dateStyle: "short", timeStyle: "short" });
    expect(result).toContain("11:00");
  });

  it("respecte les options de style demandées (dateStyle/timeStyle)", () => {
    const result = formatDateTimeParis("2026-08-06T04:45:00.000Z", { dateStyle: "full", timeStyle: "short" });
    expect(result.toLowerCase()).toContain("jeudi");
    expect(result).toContain("6 août 2026");
  });
});
