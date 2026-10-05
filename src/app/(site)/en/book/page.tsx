import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/kd/wizard/booking-wizard";
import { EnglishFooter, EnglishSiteNav } from "@/app/design-preview/en/english-site-components";

export const metadata: Metadata = { title: "Book a private chauffeur | KDRIVE", robots: { index: false, follow: false } };

export default function EnglishBookingPage() {
  return (
    <div lang="en">
      <header className="kd-on-dark" style={{ borderBottom: "1px solid var(--kd-line-on-dark)" }}><EnglishSiteNav /></header>
      <main className="kd-on-cream" style={{ padding: "var(--kd-space-7) 0", minHeight: "70vh" }}>
        <div className="kd-container" style={{ maxWidth: 560 }}>
          <div className="kd-section-head kd-section-head--center"><p className="kd-eyebrow">Booking request</p><h1 className="kd-h2">Request a chauffeur</h1><p className="kd-body">Complete the three steps below. KDRIVE will then confirm availability and the fare by telephone.</p></div>
          <BookingWizard locale="en" />
        </div>
      </main>
      <EnglishFooter />
    </div>
  );
}
