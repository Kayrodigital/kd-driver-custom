"use client";

import Script from "next/script";
import { useCallback } from "react";
import {
  GA4_SERVICE,
  GOOGLE_ADS_SERVICE,
  GOOGLE_MAPS_SERVICE,
  notifyConsentChange,
} from "@/lib/privacy/consent";

const GA4_ID = "G-FRMHN6NWCY";

let initialized = false;
let googleTagPromise: Promise<void> | null = null;
const configuredGoogleIds = new Set<string>();

function consentUpdate(update: Record<string, "granted" | "denied">): void {
  window.tac_gtag?.("consent", "update", update);
}

function loadGoogleTag(id: string): Promise<void> {
  if (googleTagPromise) return googleTagPromise;

  googleTagPromise = new Promise((resolve, reject) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.tac_gtag ?? function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());

    const script = document.createElement("script");
    script.id = "kdrive-google-tag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.onload = () => resolve();
    script.onerror = () => {
      googleTagPromise = null;
      reject(new Error("Google Tag n’a pas pu être chargé."));
    };
    document.head.appendChild(script);
  });

  return googleTagPromise;
}

async function configureGoogleId(id: string, options?: Record<string, unknown>): Promise<void> {
  await loadGoogleTag(id);
  if (configuredGoogleIds.has(id)) return;
  window.gtag?.("config", id, options ?? {});
  configuredGoogleIds.add(id);
}

function initializeTarteaucitron(): void {
  if (initialized || !window.tarteaucitron) return;
  initialized = true;

  const tac = window.tarteaucitron;
  tac.job = tac.job || [];
  tac.init({
    privacyUrl: "/politique-de-confidentialite",
    bodyPosition: "top",
    hashtag: "#tarteaucitron",
    cookieName: "tarteaucitron",
    orientation: "bottom",
    groupServices: true,
    showDetailsOnClick: true,
    serviceDefaultState: "wait",
    showAlertSmall: false,
    showTitleBanner: false,
    cookieslist: false,
    cookieslistEmbed: false,
    closePopup: false,
    showIcon: false,
    adblocker: false,
    DenyAllCta: true,
    AcceptAllCta: true,
    highPrivacy: true,
    alwaysNeedConsent: false,
    handleBrowserDNTRequest: false,
    removeCredit: false,
    moreInfoLink: true,
    useExternalCss: false,
    useExternalJs: false,
    readmoreLink: "/politique-de-confidentialite",
    mandatory: true,
    mandatoryCta: false,
    googleConsentMode: true,
    bingConsentMode: false,
    pianoConsentMode: false,
    piwikConsentMode: false,
    softConsentMode: true,
    dataLayer: false,
    serverSide: false,
    partnersList: false,
  });

  document.addEventListener(`${GA4_SERVICE}_consentModeOk`, () => {
    consentUpdate({ analytics_storage: "granted" });
    notifyConsentChange(GA4_SERVICE, true);
    void configureGoogleId(GA4_ID, { send_page_view: !location.pathname.startsWith("/admin") }).catch(() => {
      // Le blocage du traceur ne doit jamais affecter le site ni la réservation.
    });
  });
  document.addEventListener(`${GA4_SERVICE}_consentModeKo`, () => {
    consentUpdate({ analytics_storage: "denied" });
    notifyConsentChange(GA4_SERVICE, false);
  });
  document.addEventListener(`${GOOGLE_ADS_SERVICE}_consentModeOk`, () => {
    consentUpdate({
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    notifyConsentChange(GOOGLE_ADS_SERVICE, true);
  });
  document.addEventListener(`${GOOGLE_ADS_SERVICE}_consentModeKo`, () => {
    consentUpdate({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    notifyConsentChange(GOOGLE_ADS_SERVICE, false);
  });
  document.addEventListener(`${GOOGLE_MAPS_SERVICE}_consentModeOk`, () => {
    notifyConsentChange(GOOGLE_MAPS_SERVICE, true);
  });
  document.addEventListener(`${GOOGLE_MAPS_SERVICE}_consentModeKo`, () => {
    notifyConsentChange(GOOGLE_MAPS_SERVICE, false);
  });

  tac.services[GA4_SERVICE] = {
    key: GA4_SERVICE,
    type: "analytic",
    name: "Google Analytics 4",
    uri: "https://policies.google.com/privacy",
    needConsent: true,
    cookies: ["_ga", "_gid", "_gat"],
    js() {},
    fallback() {},
  };

  tac.services[GOOGLE_ADS_SERVICE] = {
    key: GOOGLE_ADS_SERVICE,
    type: "ads",
    name: "Google Ads",
    uri: "https://policies.google.com/privacy",
    needConsent: true,
    cookies: ["_gcl_au", "_gcl_aw", "_gac"],
    js() {},
    fallback() {},
  };

  tac.services[GOOGLE_MAPS_SERVICE] = {
    key: GOOGLE_MAPS_SERVICE,
    type: "api",
    name: "Google Maps et suggestions d’adresses",
    uri: "https://policies.google.com/privacy",
    needConsent: true,
    cookies: [],
    js() {},
    fallback() {},
  };

  tac.job.push(GA4_SERVICE, GOOGLE_ADS_SERVICE, GOOGLE_MAPS_SERVICE);
}

export function CookieConsent() {
  const initialize = useCallback(() => initializeTarteaucitron(), []);

  return (
    <>
      <Script id="kdrive-cookie-language" strategy="beforeInteractive">
        {`
          var kdriveCookieEnglish = location.pathname.indexOf('/en') === 0;
          window.tarteaucitronForceLanguage = kdriveCookieEnglish ? 'en' : 'fr';
          window.tarteaucitronCustomText = kdriveCookieEnglish ? {
            alertBigPrivacy: "With your permission, KDRIVE uses audience measurement, advertising and mapping services. You can accept, refuse or customize your choice.",
            mandatoryText: "The preference cookie only stores your consent choices."
          } : {
            alertBigPrivacy: "KDRIVE utilise, avec votre accord, des services de mesure, de publicité et de cartographie. Vous pouvez accepter, refuser ou personnaliser votre choix.",
            mandatoryText: "Le cookie de préférence mémorise uniquement votre choix de consentement."
          };
        `}
      </Script>
      <Script
        id="tarteaucitron-script"
        src="/tarteaucitron/tarteaucitron.min.js"
        strategy="afterInteractive"
        onLoad={initialize}
        onReady={initialize}
      />
    </>
  );
}
