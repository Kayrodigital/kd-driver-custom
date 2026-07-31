import rawConfig from "../../../config/tarifs.example.json";
import { z } from "zod";

const calculatedCategorySchema = z.object({
  mode: z.literal("calculated"),
  baseFee: z.number().nonnegative(),
  pricePerKm: z.number().nonnegative(),
  minimumPrice: z.number().nonnegative(),
});

const quoteCategorySchema = z.object({ mode: z.literal("quote") });

export const pricingConfigSchema = z.object({
  version: z.string().min(1).default("provisional-2026-07"),
  currency: z.literal("EUR"),
  distanceUnit: z.literal("km"),
  categories: z.record(
    z.string().min(1),
    z.discriminatedUnion("mode", [calculatedCategorySchema, quoteCategorySchema]),
  ),
  longDistance: z.object({
    thresholdKm: z.number().positive(),
    mode: z.literal("quote"),
    airportException: z.boolean(),
  }),
});

export type PricingConfig = z.infer<typeof pricingConfigSchema>;

export const pricingConfig = pricingConfigSchema.parse(rawConfig);
