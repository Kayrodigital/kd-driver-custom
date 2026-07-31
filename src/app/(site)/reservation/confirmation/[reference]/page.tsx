import { ConfirmationSummary } from "@/components/booking/confirmation-summary";

export const metadata = { title: "Confirmation | KD Driver", robots: { index: false, follow: false } };
export default async function ConfirmationPage({ params }: { params: Promise<{ reference: string }> }) { const { reference } = await params; return <ConfirmationSummary reference={reference} />; }
