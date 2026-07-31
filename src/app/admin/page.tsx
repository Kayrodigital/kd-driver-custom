import { createAdminClient } from "@/infrastructure/supabase/admin-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Réservations | Administration", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("reservations").select("public_reference,status,pickup_at,pickup_address,destination_address,amount_cents,pricing_mode,customers(first_name,last_name,email,phone),vehicles(label)").order("created_at", { ascending: false }).limit(100);
  if (error) throw new Error("Impossible de charger les réservations.");
  return <main className="admin"><header><p className="eyebrow">Administration</p><h1>Réservations</h1><p>{data.length} réservation(s) récente(s)</p></header><div className="admin-table-wrap"><table><thead><tr><th>Référence</th><th>Date</th><th>Client</th><th>Trajet</th><th>Véhicule</th><th>Montant</th><th>Statut</th></tr></thead><tbody>{data.map((item) => { const customer = Array.isArray(item.customers) ? item.customers[0] : item.customers; const vehicle = Array.isArray(item.vehicles) ? item.vehicles[0] : item.vehicles; return <tr key={item.public_reference}><td><strong>{item.public_reference}</strong></td><td>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.pickup_at))}</td><td>{customer?.first_name} {customer?.last_name}<small>{customer?.email}</small></td><td>{item.pickup_address}<small>→ {item.destination_address}</small></td><td>{vehicle?.label}</td><td>{item.pricing_mode === "quote" ? "Sur devis" : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format((item.amount_cents ?? 0) / 100)}</td><td><span className="status">{item.status}</span></td></tr>; })}</tbody></table></div></main>;
}
