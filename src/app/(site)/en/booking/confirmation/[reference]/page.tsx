import { ConfirmationSummary } from "@/components/booking/confirmation-summary";

export const metadata = { title: "Booking request received | KDRIVE", robots: { index: false, follow: false } };

export default async function EnglishConfirmationPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  return <ConfirmationSummary reference={reference} locale="en" />;
}
