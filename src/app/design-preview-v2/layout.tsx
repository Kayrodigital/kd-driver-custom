import { Cormorant_Garamond, Inter } from "next/font/google";
import "./design-preview-v2.css";

// Direction V2 : graisses étendues (400/500/600) au lieu de 500 seul en
// production, pour créer du contraste éditorial sans changer de police
// (voir docs/DESIGN_DIRECTION_V2.md, section 5).
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--v2-font-display" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--v2-font-sans" });

export const metadata = {
  robots: { index: false, follow: false },
};

export default function DesignPreviewV2Layout({ children }: { children: React.ReactNode }) {
  return <div className={`kdv2 ${display.variable} ${sans.variable}`}>{children}</div>;
}
