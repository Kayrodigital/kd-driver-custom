import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "./site";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 512, height: 512 }],
    },
  };
}
