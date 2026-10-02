import { describe, expect, it } from "vitest";
import { sitemapEntries } from "@/app/sitemap";
import { allDestinationPages } from "@/app/design-preview/destinations-registry";
import { localPages } from "@/app/design-preview/local-pages-content";
import { hubPages } from "@/app/design-preview/hub-pages-content";
import { isIndexable } from "@/lib/seo/editorial-status";
import { SITE_URL } from "@/lib/seo/site";

describe("sitemap", () => {
  const sitemapUrls = new Set(sitemapEntries().map((entry) => entry.url));

  it("contient toutes les pages [slug] indexables, et aucune page noindex", () => {
    for (const page of allDestinationPages) {
      const url = `${SITE_URL}/${page.slug}`;
      if (isIndexable(page.editorialStatus, page.noIndex)) {
        expect(sitemapUrls.has(url)).toBe(true);
      } else {
        expect(sitemapUrls.has(url)).toBe(false);
      }
    }
  });

  it("contient toutes les pages à route dédiée (local-pages-content) indexables", () => {
    for (const page of localPages) {
      const url = `${SITE_URL}/${page.slug}`;
      if (isIndexable(page.editorialStatus, page.noIndex)) {
        expect(sitemapUrls.has(url)).toBe(true);
      } else {
        expect(sitemapUrls.has(url)).toBe(false);
      }
    }
  });

  it("contient toutes les pages hub (toujours indexables via leur route dédiée)", () => {
    for (const page of hubPages) {
      expect(sitemapUrls.has(`${SITE_URL}/${page.slug}`)).toBe(true);
    }
  });

  it("ne contient aucune date de type new Date() au moment de l'appel (dates figées, pas le build courant)", () => {
    const now = Date.now();
    const allSameInstant = sitemapEntries().every((entry) => {
      const lastModified = entry.lastModified;
      return lastModified instanceof Date && Math.abs(lastModified.getTime() - now) < 5000;
    });
    expect(allSameInstant).toBe(false);
  });

  it("n'a pas d'URL en doublon", () => {
    const urls = sitemapEntries().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
