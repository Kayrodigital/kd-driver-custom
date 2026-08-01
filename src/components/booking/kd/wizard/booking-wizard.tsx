"use client";

import { StepIdentification } from "./step-identification";
import { StepOptions } from "./step-options";
import { StepSearch } from "./step-search";
import { StepSummary } from "./step-summary";
import { StepVehicles } from "./step-vehicles";
import { useBookingWizard } from "./use-booking-wizard";

export function BookingWizard() {
  const wizard = useBookingWizard();

  return (
    <div className="kd-card" style={{ maxWidth: 560, margin: "0 auto" }}>
      <div className="kd-wizard-progress" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => <span key={n} className={n < wizard.step ? "is-done" : n === wizard.step ? "is-active" : ""} />)}
      </div>
      {wizard.step === 1 && <StepSearch wizard={wizard} />}
      {wizard.step === 2 && <StepVehicles wizard={wizard} />}
      {wizard.step === 3 && <StepOptions wizard={wizard} />}
      {wizard.step === 4 && <StepIdentification wizard={wizard} />}
      {wizard.step === 5 && <StepSummary wizard={wizard} />}
    </div>
  );
}
