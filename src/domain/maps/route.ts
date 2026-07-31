import { addressSchema } from "@/domain/booking/address";
import { z } from "zod";

export const routeRequestSchema = z.object({
  pickup: addressSchema,
  destination: addressSchema,
});

export type RouteRequest = z.infer<typeof routeRequestSchema>;

export type RouteResult = {
  distanceMeters: number;
  durationSeconds: number;
};
