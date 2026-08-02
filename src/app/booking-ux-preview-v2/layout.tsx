import type { Metadata } from "next";
import "../booking-ux-preview/wireframe.css";

export const metadata: Metadata = {
  title: "UX Preview V2 — Parcours client, propriétaire et affectation chauffeur | KDRIVE",
  description: "Fiche UX du parcours réel KDRIVE (client → KDRIVE → groupe de chauffeurs → chauffeur retenu → client confirmé). Sprint UX, sans impact production.",
  robots: { index: false, follow: false },
};

export default function BookingUxPreviewV2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="wf">{children}</div>;
}
