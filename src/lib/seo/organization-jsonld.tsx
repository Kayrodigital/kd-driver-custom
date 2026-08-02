import { SITE_URL } from "./site";

export function OrganizationJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "KDRIVE",
        inLanguage: "fr-FR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "KDRIVE",
        url: SITE_URL,
        logo: `${SITE_URL}/logo-icon.png`,
      },
      {
        "@type": ["LocalBusiness", "TaxiService"],
        "@id": `${SITE_URL}/#localbusiness`,
        name: "KDRIVE",
        url: SITE_URL,
        image: `${SITE_URL}/logo-icon.png`,
        telephone: "+33652211292",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lyon",
          addressCountry: "FR",
        },
        areaServed: "Lyon",
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
