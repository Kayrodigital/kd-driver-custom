import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

const PUBLIC_PATHS = [
  "/",
  "/a-propos",
  "/chauffeur-entreprise",
  "/contact",
  "/faq",
  "/longues-distances",
  "/mise-a-disposition",
  "/tarifs",
  "/transfert-aeroport",
  "/transfert-gare",
  "/vehicules",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
