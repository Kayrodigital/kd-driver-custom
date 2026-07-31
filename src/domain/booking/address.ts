import { z } from "zod";

export const addressSchema = z.object({
  address: z.string().trim().min(3).max(300),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  placeId: z.string().trim().min(1).max(300).nullable(),
  source: z.enum(["manual", "autocomplete", "geolocation"]),
  accuracyMeters: z.number().nonnegative().nullable().optional(),
});

export type AddressValue = z.infer<typeof addressSchema>;

export const emptyAddress: AddressValue = {
  address: "",
  latitude: null,
  longitude: null,
  placeId: null,
  source: "manual",
  accuracyMeters: null,
};
