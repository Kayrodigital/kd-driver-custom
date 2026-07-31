import { addressSchema } from "./address";
import { z } from "zod";

export const reservationRequestSchema = z.object({
  idempotencyKey: z.uuid(),
  pickup: addressSchema,
  destination: addressSchema,
  pickupAt: z.iso.datetime({ offset: true }),
  passengers: z.number().int().min(1).max(20),
  luggage: z.number().int().min(0).max(30),
  vehicleSlug: z.enum(["berline", "confort", "luxe", "van", "monospace"]),
  isAirportTrip: z.boolean().default(false),
  customer: z.object({
    firstName: z.string().trim().min(2).max(80),
    lastName: z.string().trim().min(2).max(80),
    email: z.email().max(254),
    phone: z.string().trim().min(6).max(30),
  }),
  notes: z.string().trim().max(1_000).default(""),
});

export type ReservationRequest = z.infer<typeof reservationRequestSchema>;
