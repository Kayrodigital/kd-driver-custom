import Link from "next/link";
import { CalculatorForm } from "./calculator-form";

export const metadata = { title: "Calculer un tarif | Administration KDRIVE", robots: { index: false, follow: false } };

const errorMessages: Record<string, string> = {
  invalid_datetime: "Renseignez une date et une heure valides avant de créer la réservation.",
  creation_failed: "La création de la réservation a échoué. Réessayez.",
};

export default async function CalculateurPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error: errorCode } = await searchParams;
  return (
    <main className="kd-admin-main kd-on-cream">
      <div className="kd-container" style={{ maxWidth: 1240 }}>
        <Link href="/admin" className="kd-admin-back">← Retour aux réservations</Link>
        <div className="kd-section-head">
          <p className="kd-eyebrow">Outil interne</p>
          <h1 className="kd-h2">Calculer un tarif</h1>
          <p className="kd-body">Pour un appel entrant : donnez un prix immédiatement, sans créer de réservation, ou créez-la directement une fois le tarif calculé.</p>
        </div>
        {errorCode && <p className="kd-field-error" role="alert">{errorMessages[errorCode] ?? "Une erreur est survenue."}</p>}
        <CalculatorForm />
      </div>
    </main>
  );
}
