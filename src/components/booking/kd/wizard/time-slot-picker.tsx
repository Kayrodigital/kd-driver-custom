"use client";

import { useEffect, useRef, useState } from "react";
import { availableTimeSlotsForDate } from "@/domain/booking/booking-defaults";

export function TimeSlotPicker({ label, date, value, onChange }: { label: string; date: string; value: string; onChange(value: string): void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const slots = availableTimeSlotsForDate(date, new Date());

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function openList() {
    const index = Math.max(0, slots.indexOf(value));
    setHighlighted(index);
    setOpen(true);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") { event.preventDefault(); openList(); }
      return;
    }
    if (event.key === "ArrowDown") { event.preventDefault(); setHighlighted((index) => (index + 1) % slots.length); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setHighlighted((index) => (index - 1 + slots.length) % slots.length); }
    else if (event.key === "Enter") { event.preventDefault(); if (slots[highlighted]) { onChange(slots[highlighted]); setOpen(false); } }
    else if (event.key === "Escape") { setOpen(false); }
  }

  return (
    <div className="kd-field kd-time-picker" ref={containerRef}>
      <span className="kd-field-label">{label}</span>
      <button
        type="button"
        className="kd-input kd-time-picker-trigger"
        role="combobox"
        aria-expanded={open}
        aria-controls="time-slot-listbox"
        aria-label={label}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        {value || "Choisir une heure"}
      </button>
      {open && (
        <ul className="kd-time-slot-list" id="time-slot-listbox" role="listbox">
          {slots.length === 0 && <li className="kd-time-slot-empty">Plus aucun créneau aujourd’hui</li>}
          {slots.map((slot, index) => (
            <li key={slot} role="option" aria-selected={slot === value}>
              <button
                type="button"
                className={`${slot === value ? "is-selected " : ""}${index === highlighted ? "is-highlighted" : ""}`}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => { onChange(slot); setOpen(false); }}
              >
                {slot}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
