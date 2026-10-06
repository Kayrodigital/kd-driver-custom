"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/gtag";
import styles from "./sirha.module.css";

type SubmitState = "idle" | "sending" | "success" | "error";

export function SirhaLeadForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/sirha-leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Votre demande n’a pas pu être envoyée.");

      trackEvent("sirha_form_submit", { page_path: "/chauffeur-vtc-sirha-lyon" });
      form.reset();
      setState("success");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Votre demande n’a pas pu être envoyée.");
      setState("error");
    }
  }

  return (
    <form className={`kd-card ${styles.form}`} onSubmit={handleSubmit} noValidate={false}>
      <div className={styles.formGrid}>
        <label className="kd-field">
          <span className="kd-field-label">Entreprise *</span>
          <input className="kd-input" name="company" autoComplete="organization" required maxLength={120} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Nom et prénom *</span>
          <input className="kd-input" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">E-mail professionnel *</span>
          <input className="kd-input" type="email" name="email" autoComplete="email" required maxLength={180} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Téléphone</span>
          <input className="kd-input" type="tel" name="phone" autoComplete="tel" maxLength={30} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Début de présence au SIRHA *</span>
          <input className="kd-input" type="date" name="presenceStart" required />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Fin de présence</span>
          <input className="kd-input" type="date" name="presenceEnd" />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Nombre de personnes</span>
          <input className="kd-input" type="number" name="people" min="1" max="100" inputMode="numeric" />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Mode d’arrivée</span>
          <select className="kd-select" name="arrivalMode" defaultValue="">
            <option value="">À préciser</option>
            <option value="Avion">Avion</option>
            <option value="Train">Train</option>
            <option value="Voiture / autre">Voiture / autre</option>
          </select>
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Aéroport ou gare d’arrivée</span>
          <input className="kd-input" name="arrivalLocation" maxLength={180} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Hôtel à Lyon</span>
          <input className="kd-input" name="hotel" maxLength={180} />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Nombre approximatif de trajets</span>
          <input className="kd-input" type="number" name="approxTrips" min="1" max="100" inputMode="numeric" />
        </label>
        <label className="kd-field">
          <span className="kd-field-label">Besoin de mise à disposition</span>
          <select className="kd-select" name="chauffeurService" defaultValue="À déterminer">
            <option>Oui</option>
            <option>Non</option>
            <option>À déterminer</option>
          </select>
        </label>
      </div>

      <label className="kd-field">
        <span className="kd-field-label">Message / planning</span>
        <textarea className={`kd-input ${styles.textarea}`} name="message" rows={6} maxLength={2500} placeholder="Horaires d’arrivée, hôtels, rendez-vous, nombre de véhicules ou toute autre précision utile…" />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        Ne pas remplir ce champ
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button className="kd-btn kd-btn--primary kd-btn--block" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Envoi en cours…" : "Recevoir une proposition"}
      </button>

      <p className="kd-field-hint">
        Les informations transmises servent uniquement à traiter votre demande. Consultez notre <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
      <div aria-live="polite" aria-atomic="true">
        {state === "success" && <p className={styles.success}>Votre demande a bien été envoyée. Kdrive vous recontactera pour étudier votre organisation.</p>}
        {state === "error" && <p className="kd-field-error" role="alert">{error}</p>}
      </div>
    </form>
  );
}
