import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/reserver",
        "/reservation",
        "/booking-ux-preview",
        "/design-preview",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
