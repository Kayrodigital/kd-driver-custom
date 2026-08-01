import { describe, expect, it } from "vitest";
import {
  availableTimeSlotsForDate,
  defaultBookingDateTime,
  nextAvailableSlotMinutes,
  toDateInputValue,
} from "@/domain/booking/booking-defaults";

describe("booking-defaults", () => {
  it("arrondit 14:07 + 30 min au prochain quart d'heure (14:45)", () => {
    const now = new Date("2026-08-01T14:07:00");
    expect(nextAvailableSlotMinutes(now)).toBe(14 * 60 + 45);
  });

  it("arrondit 14:32 + 30 min au prochain quart d'heure (15:15)", () => {
    const now = new Date("2026-08-01T14:32:00");
    expect(nextAvailableSlotMinutes(now)).toBe(15 * 60 + 15);
  });

  it("propose la date du jour et le premier créneau disponible par défaut", () => {
    const now = new Date("2026-08-01T14:07:00");
    const defaults = defaultBookingDateTime(now);
    expect(defaults.date).toBe(toDateInputValue(now));
    expect(defaults.time).toBe("14:45");
  });

  it("filtre les créneaux passés pour aujourd'hui mais pas pour une date future", () => {
    const now = new Date("2026-08-01T14:07:00");
    const todaySlots = availableTimeSlotsForDate(toDateInputValue(now), now);
    expect(todaySlots[0]).toBe("14:45");
    const futureSlots = availableTimeSlotsForDate("2026-08-05", now);
    expect(futureSlots[0]).toBe("00:00");
  });
});
