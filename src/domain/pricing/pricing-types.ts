export type PricingMode = "calculated" | "quote";

export type PriceLine = {
  code: "base_fee" | "distance" | "minimum_adjustment";
  label: string;
  amountCents: number;
};
export type PricingResult = {
  mode: PricingMode;
  currency: "EUR";
  category: string;
  distanceMeters: number;
  totalCents: number | null;
  lines: PriceLine[];
  quoteReason: "category" | "long_distance" | null;
  ruleVersion: string;
};

export type PricingInput = {
  category: string;
  distanceMeters: number;
  isAirportTrip?: boolean;
};
