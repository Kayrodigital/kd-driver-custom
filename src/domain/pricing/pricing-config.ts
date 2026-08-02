import rawConfig from "../../../config/tarifs.example.json";
import { z } from "zod";

const calculatedCategorySchema = z.object({
  mode: z.literal("calculated"),
  pricePerKm: z.number().nonnegative(),
  minimumPrice: z.number().nonnegative().nullable(),
});

const quoteCategorySchema = z.object({ mode: z.literal("quote") });

export const pricingConfigSchema = z.object({
  version: z.string().min(1),
  currency: z.literal("EUR"),
  distanceUnit: z.literal("km"),
  categories: z.record(
    z.string().min(1),
    z.discriminatedUnion("mode", [calculatedCategorySchema, quoteCategorySchema]),
  ),
  standardBaseFee: z.number().nonnegative(),
  transferBaseFee: z.number().nonnegative(),
  standardShortDistanceThresholdKm: z.number().positive(),
  longDistanceThresholdKm: z.number().positive(),
  includedMinutes: z.number().nonnegative(),
  extraMinutePrice: z.number().nonnegative(),
});

export type PricingConfig = z.infer<typeof pricingConfigSchema>;

export const pricingConfig = pricingConfigSchema.parse(rawConfig);
