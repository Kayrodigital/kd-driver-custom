"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavDropdownItem = { label: string; href: string };

export function NavDropdown({ label, items }: { label: string; items: NavDropdownItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="kd-nav-dropdown" ref={ref}>
      <button type="button" className="kd-nav-dropdown-trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {label}
        <span aria-hidden="true" className={`kd-nav-dropdown-chevron ${open ? "is-open" : ""}`}>⌄</span>
      </button>
      {open && (
        <ul className="kd-nav-dropdown-panel" role="menu">
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link href={item.href} role="menuitem" onClick={() => setOpen(false)}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
