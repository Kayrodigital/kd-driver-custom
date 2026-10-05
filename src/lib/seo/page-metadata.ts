import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "./site";

export function buildMetadata({
  title,
  description,
  path,
  noIndex,
  locale = "fr_FR",
  languages,
}: {
  title: string;
  description: string;
  path: string;
  /** Brouillon volontairement non indexable (cf. registre SEO, editorialStatus "draftNoIndex"). */
  noIndex?: boolean;
  locale?: string;
  languages?: Record<string, string>;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    /**
     * `follow: true` même en noindex : une page encore trop légère pour être
     * indexée (brouillon, contenu à enrichir) continue de transmettre le
     * maillage interne vers les pages qu'elle référence, plutôt que de
     * couper ce lien — cf. audit SEO du 02/10/2026.
     */
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 512, height: 512 }],
    },
  };
}
