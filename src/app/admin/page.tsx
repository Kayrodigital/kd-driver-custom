import Link from "next/link";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { formatEuros } from "@/domain/pricing/money";
import { statusFilterOptions, statusLabel, statusPillClassName } from "./status-labels";
import { archiveReservation, restoreReservation } from "./actions";
import {
  PAGE_SIZES,
  RESERVATION_VIEWS,
  SORT_OPTIONS,
  applyReservationsQuery,
  buildReservationsQueryParams,
  type ReservationView,
  type SortOption,
} from "./reservations-query";
import { BulkActionBar, HeaderCheckbox, RowCheckbox, SelectionProvider } from "./selection-controls";

export const dynamic = "force-dynamic";
export const metadata = { title: "Réservations | Administration KDRIVE", robots: { index: false, follow: false } };

type Customer = { first_name: string | null; last_name: string | null; phone: string; email: string | null };
type Vehicle = { label: string };
type ReservationRow = {
  id: string;
  public_reference: string;
  created_at: string;
  pickup_at: string;
  status: string;
  pricing_status: string | null;
  estimated_price_cents: number | null;
  confirmed_price_cents: number | null;
  pricing_mode: string;
  pickup_address: string;
  destination_address: string;
  archived_at: string | null;
  customers: Customer | Customer[] | null;
  vehicles: Vehicle | Vehicle[] | null;
};

const VIEW_LABELS: Record<ReservationView, string> = {
  todo: "À traiter",
  upcoming: "Courses à venir",
  archives: "Archives",
  all: "Toutes les courses",
};

const SORT_LABELS: Record<SortOption, string> = {
  created_desc: "Création récente",
  created_asc: "Création ancienne",
  pickup_asc: "Course la plus proche",
  pickup_desc: "Course la plus éloignée",
  price_asc: "Tarif croissant",
  price_desc: "Tarif décroissant",
};

function one<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function customerName(customer: Customer | null): string {
  if (!customer) return "—";
  return [customer.first_name, customer.last_name].filter(Boolean).join(" ") || "—";
}

function priceCell(row: ReservationRow): string {
  if (row.confirmed_price_cents !== null) return formatEuros(row.confirmed_price_cents);
  if (row.pricing_mode === "quote") return "Sur devis";
  if (row.estimated_price_cents !== null) return formatEuros(row.estimated_price_cents);
  return "—";
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

type RawSearchParams = { [key: string]: string | string[] | undefined };

function toFlatParams(searchParams: RawSearchParams): Record<string, string | undefined> {
  const flat: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "ids") continue;
    flat[key] = Array.isArray(value) ? value[0] : value;
  }
  return flat;
}

function buildHref(base: Record<string, string | undefined>, overrides: Record<string, string | number | undefined>): string {
  const merged = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...base, ...overrides })) {
    if (value === undefined || value === "" || key === "page") continue;
    merged.set(key, String(value));
  }
  // `page` géré séparément : reset à 1 sauf si explicitement fourni dans overrides.
  const page = overrides.page ?? undefined;
  if (page !== undefined && page !== 1 && page !== "1") merged.set("page", String(page));
  const query = merged.toString();
  return query ? `/admin?${query}` : "/admin";
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const rawSearchParams = await searchParams;
  const flat = toFlatParams(rawSearchParams);
  const params = buildReservationsQueryParams(flat);

  const supabase = createAdminClient();
  const { data, error, count } = await applyReservationsQuery(supabase, params);
  if (error) throw new Error("Impossible de charger les réservations.");

  const rows = data as unknown as ReservationRow[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize));
  const pageIds = rows.map((row) => row.id);

  return (
    <main className="kd-admin-main kd-on-cream">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Administration</p>
          <h1 className="kd-h2">Réservations</h1>
        </div>

        <div className="kd-admin-tabs" role="tablist" aria-label="Vues des réservations">
          {RESERVATION_VIEWS.map((view) => (
            <Link key={view} href={buildHref(flat, { view, page: undefined, sort: undefined })} role="tab" aria-selected={params.view === view} className={`kd-admin-tab ${params.view === view ? "is-active" : ""}`}>
              {VIEW_LABELS[view]}
            </Link>
          ))}
        </div>

        <form method="get" className="kd-admin-filters">
          <input type="hidden" name="view" value={params.view} />
          <label className="kd-field">
            <span className="kd-field-label">Recherche</span>
            <input className="kd-input" type="search" name="q" defaultValue={params.search} placeholder="Référence, nom, téléphone" />
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Statut</span>
            <select className="kd-input kd-select" name="status" defaultValue={params.status}>
              <option value="">Tous les statuts</option>
              {statusFilterOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Créée entre</span>
            <div style={{ display: "flex", gap: 6 }}>
              <input className="kd-input" type="date" name="createdFrom" defaultValue={params.createdFrom} />
              <input className="kd-input" type="date" name="createdTo" defaultValue={params.createdTo} />
            </div>
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Course entre</span>
            <div style={{ display: "flex", gap: 6 }}>
              <input className="kd-input" type="date" name="courseFrom" defaultValue={params.courseFrom} />
              <input className="kd-input" type="date" name="courseTo" defaultValue={params.courseTo} />
            </div>
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Trier par</span>
            <select className="kd-input kd-select" name="sort" defaultValue={params.sort}>
              {SORT_OPTIONS.map((option) => <option key={option} value={option}>{SORT_LABELS[option]}</option>)}
            </select>
          </label>
          {params.view === "all" && (
            <label className="kd-checkbox-row">
              <input type="checkbox" name="includeArchived" value="1" defaultChecked={params.includeArchived} /> Inclure les archivées
            </label>
          )}
          <div className="kd-admin-filters-actions">
            <button type="submit" className="kd-btn kd-btn--gold">Filtrer</button>
            <Link href={buildHref({}, { view: params.view })} className="kd-btn kd-btn--outline">Réinitialiser</Link>
          </div>
        </form>

        <p className="kd-body">{total} demande(s) — page {params.page} sur {totalPages}</p>

        <SelectionProvider>
          <div className="kd-admin-table-wrap">
            <table className="kd-admin-table">
              <thead>
                <tr>
                  <th><HeaderCheckbox pageIds={pageIds} /></th>
                  <th>Référence</th>
                  <th aria-sort={params.sort.startsWith("created") ? (params.sort === "created_asc" ? "ascending" : "descending") : "none"}>Créée le</th>
                  <th aria-sort={params.sort.startsWith("pickup") ? (params.sort === "pickup_asc" ? "ascending" : "descending") : "none"}>Course le</th>
                  <th>Trajet</th>
                  <th>Client</th>
                  <th>Catégorie</th>
                  <th aria-sort={params.sort.startsWith("price") ? (params.sort === "price_asc" ? "ascending" : "descending") : "none"}>Tarif</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const customer = one(row.customers);
                  const vehicle = one(row.vehicles);
                  return (
                    <tr key={row.id}>
                      <td><RowCheckbox id={row.id} label={row.public_reference} /></td>
                      <td><strong>{row.public_reference}</strong>{row.archived_at && <small> · Archivée</small>}</td>
                      <td>{formatDateTime(row.created_at)}</td>
                      <td>{formatDateTime(row.pickup_at)}</td>
                      <td>{row.pickup_address}<small>→ {row.destination_address}</small></td>
                      <td>{customerName(customer)}<small>{customer?.phone}</small></td>
                      <td>{vehicle?.label ?? "—"}</td>
                      <td>{priceCell(row)}</td>
                      <td><span className={statusPillClassName(row.status)}>{statusLabel(row.status)}</span></td>
                      <td style={{ display: "flex", gap: 6 }}>
                        <Link href={`/admin/reservations/${row.id}`} className="kd-btn kd-btn--sm kd-btn--outline">Ouvrir</Link>
                        {row.archived_at ? (
                          <form action={restoreReservation.bind(null, row.id)}><button type="submit" className="kd-btn kd-btn--sm kd-btn--outline">Restaurer</button></form>
                        ) : (
                          <form action={archiveReservation.bind(null, row.id)}><button type="submit" className="kd-btn kd-btn--sm kd-btn--outline">Archiver</button></form>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="kd-admin-cards">
            {rows.map((row) => {
              const customer = one(row.customers);
              const vehicle = one(row.vehicles);
              return (
                <div key={row.id} className="kd-card kd-admin-card">
                  <div className="kd-admin-card-top">
                    <RowCheckbox id={row.id} label={row.public_reference} />
                    <strong>{row.public_reference}</strong>
                    <span className={statusPillClassName(row.status)}>{statusLabel(row.status)}</span>
                  </div>
                  <p className="kd-admin-card-phone">{customerName(customer)} · {customer?.phone}</p>
                  <p className="kd-admin-card-route">{row.pickup_address} → {row.destination_address}</p>
                  <p className="kd-body" style={{ margin: 0 }}>Créée le {formatDateTime(row.created_at)}</p>
                  <p className="kd-body" style={{ margin: 0 }}>Course le {formatDateTime(row.pickup_at)} · {vehicle?.label ?? "—"} · {priceCell(row)}</p>
                  <div className="kd-admin-card-actions">
                    {customer?.phone && <a className="kd-btn kd-btn--sm kd-btn--outline" href={`tel:${customer.phone}`}>Appeler</a>}
                    <Link href={`/admin/reservations/${row.id}`} className="kd-btn kd-btn--sm kd-btn--gold">Ouvrir</Link>
                  </div>
                </div>
              );
            })}
          </div>

          <BulkActionBar exportBaseUrl={`/admin/export?${new URLSearchParams(flat as Record<string, string>).toString()}`} />
        </SelectionProvider>

        <div className="kd-admin-pagination">
          <div className="kd-admin-pagination-sizes">
            {PAGE_SIZES.map((size) => (
              <Link key={size} href={buildHref(flat, { pageSize: size, page: 1 })} className={`kd-btn kd-btn--sm ${params.pageSize === size ? "kd-btn--gold" : "kd-btn--outline"}`}>{size}</Link>
            ))}
          </div>
          <div className="kd-admin-pagination-nav">
            {params.page > 1 && <Link href={buildHref(flat, { page: params.page - 1 })} className="kd-btn kd-btn--sm kd-btn--outline">← Précédent</Link>}
            <span className="kd-field-hint">Page {params.page} / {totalPages} ({total} au total)</span>
            {params.page < totalPages && <Link href={buildHref(flat, { page: params.page + 1 })} className="kd-btn kd-btn--sm kd-btn--outline">Suivant →</Link>}
          </div>
          <div className="kd-admin-pagination-export">
            <a href={`/admin/export?mode=all`} className="kd-btn kd-btn--sm kd-btn--outline">Exporter tout (CSV)</a>
            <a href={`/admin/export?${new URLSearchParams(flat as Record<string, string>).toString()}`} className="kd-btn kd-btn--sm kd-btn--outline">Exporter les résultats filtrés (CSV)</a>
          </div>
        </div>
      </div>
    </main>
  );
}
