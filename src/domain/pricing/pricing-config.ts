import rawConfig from "../../../config/tarifs.example.json";
import { z } from "zod";

/**
 * Sprint "nouveau parcours sans prix" (2026-08) : la gamme publique devient
 * Essentiel / Premium / Van. Seuls les minimums de course ont été redéfinis
 * explicitement (23 € / 30 € / 45 €, appliqués aux 3 types de trajet). Les
 * tarifs kilométriques d'Essentiel et Premium reprennent tels quels ceux des
 * anciennes catégories qu'elles remplacent (Confort 2 €/km, Berline
 * 2,50 €/km) — non redéfinis par le brief, donc conservés sans invention.
 * Van devient calculé (3 €/km, explicitement fourni) au lieu de "sur devis".
 * Le squelette tarifaire (frais fixes, seuils de distance, minutes
 * incluses) reste inchangé — cf. docs/CLIENT_CONTENT_VALIDATION.md pour
 * l'historique des décisions antérieures (Confort/Berline/Luxe).
 */

/**
 * Minimum de catégorie décomposé par type de trajet, mais désormais
 * identique pour les 3 types (standard, aéroport, longue distance) sur les
 * 3 catégories publiques — portée volontairement uniformisée par ce sprint
 * (contrairement à l'ancienne catégorie Luxe, qui laissait `airport` et
 * `longDistance` à `null`, cas révolu depuis son retrait de la gamme
 * publique).
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
