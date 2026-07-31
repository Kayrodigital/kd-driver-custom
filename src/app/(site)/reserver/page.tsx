import type { Metadata } from "next";
import { BookingFormCard } from "@/components/booking/kd/booking-form-card";
import { SiteNav } from "@/app/design-preview/sections";

export const metadata: Metadata = { title: "Réserver | KD Driver", robots: { index: false, follow: false } };

export default function BookingPage() {
  return (
    <>
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><SiteNav /></header>
      <main className="kd-on-cream" style={{ padding: "var(--kd-space-7) 0", minHeight: "70vh" }}>
        <div className="kd-container" style={{ maxWidth: 560 }}>
          <div className="kd-section-head kd-section-head--center">
            <p className="kd-eyebrow">Réservation</p>
            <h1 className="kd-h2">Demander une course</h1>
          </div>
          <BookingFormCard />
        </div>
      </main>
    </>
  );
}
