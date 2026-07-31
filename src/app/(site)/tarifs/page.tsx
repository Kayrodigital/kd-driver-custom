import type { Metadata } from "next";
import { TarifsPage } from "@/app/design-preview/other-pages-templates";

export const metadata: Metadata = {
  title: "Tarifs | KDRIVE",
  description: "Un tarif calculé avant confirmation pour Berline et Confort, un devis personnalisé pour les autres trajets.",
};

export default function Tarifs() {
  return <TarifsPage framed={false} />;
}
