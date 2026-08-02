export type PricingMode = "calculated" | "quote";
export type TripType = "standard_short" | "standard_long" | "transfer_or_long_distance";

export type PriceLine = {
  code: "base_fee" | "distance" | "extra_minutes" | "minimum_adjustment";
  label: string;
  amountCents: number;
};
export type PricingResult = {
  mode: PricingMode;
  currency: "EUR";
  category: string;
  distanceMeters: number;
  durationSeconds: number;
  tripType: TripType | null;
  totalCents: number | null;
  lines: PriceLine[];
  quoteReason: "category" | null;
  ruleVersion: string;
};

export type PricingInput = {
  category: string;
  distanceMeters: number;
  durationSeconds: number;
  isAirportTrip?: boolean;
};
