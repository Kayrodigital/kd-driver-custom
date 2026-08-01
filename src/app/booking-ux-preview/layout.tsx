import type { Metadata } from "next";
import "./wireframe.css";

export const metadata: Metadata = {
  title: "UX Preview — Module de réservation | KDRIVE",
  description: "Wireframes, parcours et user stories du module de réservation (sprint UX, sans impact production).",
  robots: { index: false, follow: false },
};

export default function BookingUxPreviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="wf">{children}</div>;
}
