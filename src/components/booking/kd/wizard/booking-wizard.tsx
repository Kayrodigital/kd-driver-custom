"use client";

import { StepIdentification } from "./step-identification";
import { StepReservation } from "./step-reservation";
import { StepSearch } from "./step-search";
import { useBookingWizard } from "./use-booking-wizard";

export function BookingWizard() {
  const wizard = useBookingWizard();

  return (
    <div className="kd-card" style={{ maxWidth: 560, margin: "0 auto" }}>
      <div className="kd-wizard-progress" aria-hidden="true">
        {[1, 2, 3].map((n) => <span key={n} className={n < wizard.step ? "is-done" : n === wizard.step ? "is-active" : ""} />)}
      </div>
      {wizard.step === 1 && <StepSearch wizard={wizard} />}
      {wizard.step === 2 && <StepReservation wizard={wizard} />}
      {wizard.step === 3 && <StepIdentification wizard={wizard} />}
    </div>
  );
}
