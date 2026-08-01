export const MINIMUM_BOOKING_NOTICE_MINUTES = 30;
export const TIME_SLOT_STEP_MINUTES = 15;
export const BOOKING_HOURS_RANGE = { startHour: 0, endHour: 24 } as const;

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatTimeSlot(minutesFromMidnight: number): string {
  return `${pad(Math.floor(minutesFromMidnight / 60))}:${pad(minutesFromMidnight % 60)}`;
}

export function toDateInputValue(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Arrondit `date + MINIMUM_BOOKING_NOTICE_MINUTES` au prochain multiple de TIME_SLOT_STEP_MINUTES. */
export function nextAvailableSlotMinutes(now: Date): number {
  const withNotice = now.getHours() * 60 + now.getMinutes() + MINIMUM_BOOKING_NOTICE_MINUTES;
  return Math.ceil(withNotice / TIME_SLOT_STEP_MINUTES) * TIME_SLOT_STEP_MINUTES;
}

export function listTimeSlots(minMinutesFromMidnight = 0): string[] {
  const slots: string[] = [];
  const start = Math.max(BOOKING_HOURS_RANGE.startHour * 60, minMinutesFromMidnight);
  for (let minutes = start; minutes < BOOKING_HOURS_RANGE.endHour * 60; minutes += TIME_SLOT_STEP_MINUTES) {
    slots.push(formatTimeSlot(minutes));
  }
  return slots;
}

/** Créneaux disponibles pour une date donnée (format yyyy-mm-dd), en tenant compte du délai minimum si c'est aujourd'hui. */
export function availableTimeSlotsForDate(dateInputValue: string, now: Date): string[] {
  const isToday = dateInputValue === toDateInputValue(now);
  if (!isToday) return listTimeSlots();
  return listTimeSlots(nextAvailableSlotMinutes(now));
}

export function defaultBookingDateTime(now: Date): { date: string; time: string } {
  const minMinutes = nextAvailableSlotMinutes(now);
  if (minMinutes < BOOKING_HOURS_RANGE.endHour * 60) {
    return { date: toDateInputValue(now), time: formatTimeSlot(minMinutes) };
  }
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return { date: toDateInputValue(tomorrow), time: formatTimeSlot(BOOKING_HOURS_RANGE.startHour * 60) };
}
