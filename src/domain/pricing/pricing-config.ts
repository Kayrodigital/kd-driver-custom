import rawConfig from "../../../config/tarifs.example.json";
import { z } from "zod";

/**
 * Tarif Berline : 2,50 €/km. Confirmé par la dernière consigne explicite du
 * projet ("Petite modif : Confort 2€/km, Berline 2,50€/km, Luxe 3€/km"),
 * donc conservé tel quel — ce n'est pas un point resté ouvert.
 */

/**
 * Minimum de catégorie explicitement décomposé par type de trajet.
 * Confort (20 €) et Berline (25 €) : minimum confirmé pour les trois types
 * de trajet calculés (standard, aéroport, longue distance) — portée
 * explicitement validée par le client, jamais copiée silencieusement d'un
 * type à l'autre, chaque valeur est répétée dans la config à dessein.
 * Luxe (40 €) : seule la valeur "standard" est définitivement validée ;
 * "airport" et "longDistance" restent à confirmer et sont laissés à `null`
 * (aucun minimum appliqué) tant qu'aucune décision n'est prise pour cette
 * catégorie — portée volontairement différente de Confort/Berline, à ne
 * pas aligner sans nouvelle confirmation explicite.
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
