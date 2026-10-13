import type { Metadata } from "next";
import "./globals.css";
import "./cookie-consent.css";
import { OrganizationJsonLd } from "@/lib/seo/organization-jsonld";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { CookieConsent } from "@/components/privacy/cookie-consent";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KDRIVE",
  description: "Chauffeur privé à Lyon.",
  robots: { index: true, follow: true },
  verification: { other: { "msvalidate.01": "D29F59C020FECE88312BD5FFA644D032" } },
  openGraph: {
    title: "KDRIVE",
    description: "Chauffeur privé à Lyon.",
    url: "/",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 512, height: 512 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <CookieConsent />
        <AnalyticsTracker />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
