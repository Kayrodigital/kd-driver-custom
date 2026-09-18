"use client";

import { useState } from "react";
import { CANCELLATION_REASON_CODES, cancellationReasonLabel, type CancellationReasonCode } from "@/domain/dispatch/cancellation-reasons";

/**
 * Champ "Motif" (liste fermée obligatoire) + commentaire conditionnel
 * obligatoire uniquement quand "Autre" est choisi. Réutilisé à l'identique
 * par le formulaire de refus (declineReservation) et par le formulaire
 * d'annulation d'une course confirmée (cancelConfirmedReservation) — un
 * seul composant, deux usages, cf. brief "réutilise les composants".
 */
export function CancellationReasonField({ codeFieldName = "cancellationReasonCode", noteFieldName = "cancellationReasonNote" }: { codeFieldName?: string; noteFieldName?: string }) {
  const [code, setCode] = useState<CancellationReasonCode | "">("");
  const isOther = code === "other";

  return (
    <>
      <label className="kd-field">
        <span className="kd-field-label">Motif (obligatoire)</span>
        <select
          className="kd-input kd-select"
          name={codeFieldName}
          required
          value={code}
          onChange={(event) => setCode(event.target.value as CancellationReasonCode)}
        >
          <option value="" disabled>Choisir un motif…</option>
          {CANCELLATION_REASON_CODES.map((reasonCode) => (
            <option key={reasonCode} value={reasonCode}>{cancellationReasonLabel(reasonCode)}</option>
          ))}
        </select>
      </label>
      {isOther && (
        <label className="kd-field">
          <span className="kd-field-label">Précisez le motif (obligatoire)</span>
          <textarea className="kd-input" name={noteFieldName} required maxLength={300} rows={2} />
        </label>
      )}
    </>
  );
}
