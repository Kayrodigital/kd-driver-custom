import { BookingWizard } from "@/components/booking/booking-wizard";

export const metadata = { title: "Réserver | KD Driver", robots: { index: false, follow: false } };

export default function BookingPage() {
  return <main className="reservation-page"><BookingWizard /></main>;
}
