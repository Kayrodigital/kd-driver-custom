import rawConfig from "../../../config/tarifs.example.json";
import { z } from "zod";

/**
 * Minimum de catégorie explicitement décomposé par type de trajet : seule
 * la valeur "standard" est définitivement validée (40 € pour Luxe).
 * "airport" et "longDistance" restent à confirmer avec le client — laissés
 * à `null` (aucun minimum appliqué) tant qu'aucune décision n'est prise,
 * jamais silencieusement copiés depuis "standard".
 */
const minimumByTripTypeSchema = z.object({
  standard: z.number().nonnegative().nullable(),
  airport: z.number().nonnegative().nullable(),
  longDistance: z.number().nonnegative().nullable(),
});

const calculatedCategorySchema = z.object({
  mode: z.literal("calculated"),
  pricePerKm: z.number().nonnegative(),
  minimumByTripType: minimumByTripTypeSchema,
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
