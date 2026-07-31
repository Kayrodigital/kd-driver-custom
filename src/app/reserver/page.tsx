import { QuickBookingForm } from "@/components/booking/quick-booking-form";

export const metadata = { title: "Réserver | KD Driver", robots: { index: false, follow: false } };

export default function BookingPage() {
  return <main className="reservation-page"><QuickBookingForm /></main>;
}
