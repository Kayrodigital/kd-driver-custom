import Link from "next/link";
import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { formatEuros } from "@/domain/pricing/money";
import { statusFilterOptions, statusLabel, statusPillClassName } from "./status-labels";

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
  customers: Customer | Customer[] | null;
  vehicles: Vehicle | Vehicle[] | null;
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

function matchesSearch(row: ReservationRow, query: string): boolean {
  const customer = one(row.customers);
  const haystack = [row.public_reference, customer?.phone, customer?.first_name, customer?.last_name]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function matchesDate(row: ReservationRow, date: string): boolean {
  return row.pickup_at.slice(0, 10) === date;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; date?: string }> }) {
  const { q = "", status = "", date = "" } = await searchParams;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("id,public_reference,created_at,pickup_at,status,pricing_status,estimated_price_cents,confirmed_price_cents,pricing_mode,pickup_address,destination_address,customers(first_name,last_name,phone,email),vehicles(label)")
    .order("pickup_at", { ascending: true })
    .limit(300);
  if (error) throw new Error("Impossible de charger les réservations.");

  const rows = (data as unknown as ReservationRow[])
    .filter((row) => (q ? matchesSearch(row, q) : true))
    .filter((row) => (status ? row.status === status : true))
    .filter((row) => (date ? matchesDate(row, date) : true));

  return (
    <main className="kd-admin-main kd-on-cream">
      <div className="kd-container">
        <div className="kd-section-head">
          <p className="kd-eyebrow">Administration</p>
          <h1 className="kd-h2">Réservations</h1>
          <p className="kd-body">{rows.length} demande(s) {(q || status || date) ? "correspondante(s)" : "au total"}</p>
        </div>

        <form method="get" className="kd-admin-filters">
          <label className="kd-field">
            <span className="kd-field-label">Recherche</span>
            <input className="kd-input" type="search" name="q" defaultValue={q} placeholder="Référence, nom, téléphone" />
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Statut</span>
            <select className="kd-input kd-select" name="status" defaultValue={status}>
              <option value="">Tous les statuts</option>
              {statusFilterOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="kd-field">
            <span className="kd-field-label">Date de course</span>
            <input className="kd-input" type="date" name="date" defaultValue={date} />
          </label>
          <div className="kd-admin-filters-actions">
            <button type="submit" className="kd-btn kd-btn--gold">Filtrer</button>
            {(q || status || date) && <Link href="/admin" className="kd-btn kd-btn--outline">Réinitialiser</Link>}
          </div>
        </form>

        <div className="kd-admin-table-wrap">
          <table className="kd-admin-table">
            <thead>
              <tr>
                <th>Référence</th><th>Course</th><th>Trajet</th><th>Client</th><th>Catégorie</th><th>Tarif</th><th>Statut</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const customer = one(row.customers);
                const vehicle = one(row.vehicles);
                return (
                  <tr key={row.id}>
                    <td><strong>{row.public_reference}</strong></td>
                    <td>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(row.pickup_at))}</td>
                    <td>{row.pickup_address}<small>→ {row.destination_address}</small></td>
                    <td>{customerName(customer)}<small>{customer?.phone}</small></td>
                    <td>{vehicle?.label ?? "—"}</td>
                    <td>{priceCell(row)}</td>
                    <td><span className={statusPillClassName(row.status)}>{statusLabel(row.status)}</span></td>
                    <td><Link href={`/admin/reservations/${row.id}`} className="kd-btn kd-btn--sm kd-btn--outline">Ouvrir</Link></td>
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
                  <strong>{row.public_reference}</strong>
                  <span className={statusPillClassName(row.status)}>{statusLabel(row.status)}</span>
                </div>
                <p className="kd-admin-card-phone">{customerName(customer)} · {customer?.phone}</p>
                <p className="kd-admin-card-route">{row.pickup_address} → {row.destination_address}</p>
                <p className="kd-body" style={{ margin: 0 }}>
                  {new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(row.pickup_at))} · {vehicle?.label ?? "—"} · {priceCell(row)}
                </p>
                <div className="kd-admin-card-actions">
                  {customer?.phone && <a className="kd-btn kd-btn--sm kd-btn--outline" href={`tel:${customer.phone}`}>Appeler</a>}
                  <Link href={`/admin/reservations/${row.id}`} className="kd-btn kd-btn--sm kd-btn--gold">Ouvrir</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
