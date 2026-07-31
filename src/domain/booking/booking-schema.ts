import { addressSchema } from "./address";
import { z } from "zod";

export const reservationRequestSchema = z.object({
  idempotencyKey: z.uuid(),
  pickup: addressSchema,
  destination: addressSchema,
  pickupAt: z.iso.datetime({ offset: true }),
  requestType: z.enum(["estimate", "callback"]).default("estimate"),
  passengers: z.number().int().min(1).max(20).default(1),
  luggage: z.number().int().min(0).max(30).default(0),
  customer: z.object({
    firstName: z.string().trim().min(1).max(80).optional(),
    email: z.email().max(254).optional(),
    phone: z.string().trim().min(6).max(30),
  }),
  notes: z.string().trim().max(1_000).default(""),
});

export type ReservationRequest = z.infer<typeof reservationRequestSchema>;
