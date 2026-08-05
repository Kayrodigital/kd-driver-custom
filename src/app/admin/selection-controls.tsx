"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { archiveReservations, restoreReservations } from "./actions";

/**
 * Sélection multiple sur une liste server-rendered : le tableau/les cartes
 * restent des Server Components (children), seules les cases à cocher et la
 * barre d'actions sont des composants client consommant un contexte partagé
 * — pattern standard Next.js App Router (îlots client dans un arbre serveur).
 */

type SelectionContextValue = {
  selected: Set<string>;
  toggle: (id: string) => void;
  toggleMany: (ids: string[]) => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection doit être utilisé sous SelectionProvider");
  return ctx;
}

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleMany = (ids: string[]) => {
    setSelected((prev) => {
      const allSelected = ids.every((id) => prev.has(id));
      const next = new Set(prev);
      for (const id of ids) {
        if (allSelected) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  };

  const value = useMemo(() => ({ selected, toggle, toggleMany }), [selected]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function RowCheckbox({ id, label }: { id: string; label: string }) {
  const { selected, toggle } = useSelection();
  return <input type="checkbox" checked={selected.has(id)} onChange={() => toggle(id)} aria-label={`Sélectionner la réservation ${label}`} />;
}

export function HeaderCheckbox({ pageIds }: { pageIds: string[] }) {
  const { selected, toggleMany } = useSelection();
  const ref = useRef<HTMLInputElement>(null);
  const selectedOnPage = pageIds.filter((id) => selected.has(id));
  const allSelected = pageIds.length > 0 && selectedOnPage.length === pageIds.length;
  const indeterminate = selectedOnPage.length > 0 && !allSelected;

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  if (pageIds.length === 0) return null;
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={allSelected}
      onChange={() => toggleMany(pageIds)}
      aria-label="Sélectionner toutes les lignes visibles de la page"
    />
  );
}

export function BulkActionBar({ exportBaseUrl }: { exportBaseUrl: string }) {
  const { selected } = useSelection();
  const ids = [...selected];
  if (ids.length === 0) return null;

  const exportUrl = `${exportBaseUrl}${exportBaseUrl.includes("?") ? "&" : "?"}mode=selection&${ids.map((id) => `ids=${encodeURIComponent(id)}`).join("&")}`;

  return (
    <div className="kd-admin-bulkbar" role="region" aria-label="Actions groupées">
      <span>{ids.length} réservation{ids.length > 1 ? "s" : ""} sélectionnée{ids.length > 1 ? "s" : ""}</span>
      <div className="kd-admin-bulkbar-actions">
        <form
          action={archiveReservations}
          onSubmit={(event) => {
            if (!window.confirm(`Archiver ${ids.length} réservation${ids.length > 1 ? "s" : ""} ?`)) event.preventDefault();
          }}
        >
          {ids.map((id) => <input key={id} type="hidden" name="ids" value={id} />)}
          <button type="submit" className="kd-btn kd-btn--sm kd-btn--outline">Archiver</button>
        </form>
        <form action={restoreReservations}>
          {ids.map((id) => <input key={id} type="hidden" name="ids" value={id} />)}
          <button type="submit" className="kd-btn kd-btn--sm kd-btn--outline">Restaurer</button>
        </form>
        <a href={exportUrl} className="kd-btn kd-btn--sm kd-btn--gold">Exporter en CSV</a>
      </div>
    </div>
  );
}
