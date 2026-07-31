import { createAdminClient } from "@/infrastructure/supabase/admin-client";
import { formatEuros } from "@/domain/pricing/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Demandes | Administration", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("public_reference,status,pickup_at,pickup_address,destination_address,amount_cents,pricing_mode,customers(phone)")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error("Impossible de charger les demandes.");
  return (
    <main className="admin">
      <header>
        <p className="eyebrow">Administration</p>
        <h1>Demandes</h1>
        <p>{data.length} demande(s) récente(s)</p>
      </header>
      <div className="admin-table-wrap">
        <table>
          <thead>
            <tr><th>Référence</th><th>Date</th><th>Trajet</th><th>Téléphone</th><th>Estimation</th><th>Statut</th></tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const customer = Array.isArray(item.customers) ? item.customers[0] : item.customers;
              return (
                <tr key={item.public_reference}>
                  <td><strong>{item.public_reference}</strong></td>
                  <td>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.pickup_at))}</td>
                  <td>{item.pickup_address}<small>→ {item.destination_address}</small></td>
                  <td>{customer?.phone}</td>
                  <td>{item.pricing_mode === "quote" ? "Sur devis" : formatEuros(item.amount_cents ?? 0)}</td>
                  <td><span className="status">{item.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
