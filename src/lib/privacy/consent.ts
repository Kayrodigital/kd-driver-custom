"use client";

export const CONSENT_CHANGE_EVENT = "kdrive:consent-change";
export const GA4_SERVICE = "kdrivega4";
export const GOOGLE_ADS_SERVICE = "kdrivegoogleads";
export const GOOGLE_MAPS_SERVICE = "kdrivegooglemaps";

export function hasServiceConsent(service: string): boolean {
  return typeof window !== "undefined" && window.tarteaucitron?.state[service] === true;
}

export function notifyConsentChange(service: string, granted: boolean): void {
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { service, granted } }));
}

export function requestServiceConsent(service: string): void {
  window.tarteaucitron?.setConsent(service, true);
}

export function openCookiePanel(): void {
  window.tarteaucitron?.userInterface.openPanel();
}
