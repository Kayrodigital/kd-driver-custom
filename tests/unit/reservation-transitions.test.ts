import { describe, expect, it } from "vitest";
import {
  canAccept,
  canCancelConfirmed,
  canComplete,
  canDecline,
  canMarkContacted,
  priceIsConfirmed,
} from "@/app/admin/reservations/[id]/transitions";

const calculatedConfirmed = { pricingMode: "calculated", pricingStatus: "confirmed", confirmedPriceCents: 2500 };
const calculatedAdjusted = { pricingMode: "calculated", pricingStatus: "adjusted", confirmedPriceCents: 3000 };
const calculatedEstimated = { pricingMode: "calculated", pricingStatus: "estimated", confirmedPriceCents: null };
const calculatedPending = { pricingMode: "calculated", pricingStatus: "pending_confirmation", confirmedPriceCents: null };
const quoteRequired = { pricingMode: "quote", pricingStatus: "quote_required", confirmedPriceCents: null };
const quotePriced = { pricingMode: "quote", pricingStatus: "confirmed", confirmedPriceCents: 12000 };

describe("reservation-transitions", () => {
  it("new avec tarif confirmé -> acceptation autorisée", () => {
    expect(canAccept("new", calculatedConfirmed)).toBe(true);
  });

  it("new sans tarif confirmé (estimated) -> acceptation rejetée", () => {
    expect(canAccept("new", calculatedEstimated)).toBe(false);
  });

  it("new avec pricing_status pending_confirmation -> acceptation rejetée", () => {
    expect(canAccept("new", calculatedPending)).toBe(false);
  });

  it("tarif ajusté compte comme confirmé pour l'acceptation", () => {
    expect(canAccept("new", calculatedAdjusted)).toBe(true);
  });

  it("quote_requested sans prix -> acceptation rejetée", () => {
    expect(canAccept("quote_requested", quoteRequired)).toBe(false);
  });

  it("quote_requested avec prix défini -> acceptation autorisée", () => {
    expect(canAccept("quote_requested", quotePriced)).toBe(true);
  });

  it("contacted avec tarif confirmé -> acceptation autorisée", () => {
    expect(canAccept("contacted", calculatedConfirmed)).toBe(true);
  });

  it("confirmed, completed, cancelled -> acceptation toujours rejetée même avec un prix", () => {
    expect(canAccept("confirmed", calculatedConfirmed)).toBe(false);
    expect(canAccept("completed", calculatedConfirmed)).toBe(false);
    expect(canAccept("cancelled", calculatedConfirmed)).toBe(false);
  });

  it("refus disponible pour new, contacted, quote_requested uniquement", () => {
    expect(canDecline("new")).toBe(true);
    expect(canDecline("contacted")).toBe(true);
    expect(canDecline("quote_requested")).toBe(true);
    expect(canDecline("confirmed")).toBe(false);
    expect(canDecline("completed")).toBe(false);
    expect(canDecline("cancelled")).toBe(false);
  });

  it("annulation d'une course confirmée disponible uniquement depuis confirmed", () => {
    expect(canCancelConfirmed("confirmed")).toBe(true);
    expect(canCancelConfirmed("new")).toBe(false);
    expect(canCancelConfirmed("completed")).toBe(false);
    expect(canCancelConfirmed("cancelled")).toBe(false);
  });

  it("terminaison disponible uniquement depuis confirmed", () => {
    expect(canComplete("confirmed")).toBe(true);
    expect(canComplete("new")).toBe(false);
    expect(canComplete("contacted")).toBe(false);
    expect(canComplete("completed")).toBe(false);
    expect(canComplete("cancelled")).toBe(false);
  });

  it("marquage contacté disponible depuis new et quote_requested uniquement", () => {
    expect(canMarkContacted("new")).toBe(true);
    expect(canMarkContacted("quote_requested")).toBe(true);
    expect(canMarkContacted("contacted")).toBe(false);
    expect(canMarkContacted("confirmed")).toBe(false);
  });

  it("priceIsConfirmed distingue calculée et sur devis", () => {
    expect(priceIsConfirmed(calculatedEstimated)).toBe(false);
    expect(priceIsConfirmed(calculatedConfirmed)).toBe(true);
    expect(priceIsConfirmed(calculatedAdjusted)).toBe(true);
    expect(priceIsConfirmed(quoteRequired)).toBe(false);
    expect(priceIsConfirmed(quotePriced)).toBe(true);
  });
});
