import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { OrganizationJsonLd } from "@/lib/seo/organization-jsonld";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KDRIVE",
  description: "Chauffeur privé à Lyon.",
  robots: { index: true, follow: true },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11347885497" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11347885497');
          `}
        </Script>
        <AnalyticsTracker />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
