import { NextResponse, after } from "next/server";
import { z } from "zod";
import { createReservation } from "@/application/create-booking";
import { BrevoOwnerNotifier } from "@/infrastructure/notifications/owner-notifier";
import { notifyOwnerOfNewBooking } from "@/infrastructure/notifications/notify-owner-of-new-booking";
import { BrevoClientNotifier } from "@/infrastructure/notifications/client-notifier";
import { notifyClientOfBookingReceived } from "@/infrastructure/notifications/notify-client-of-booking";
import { GoogleRoutesProvider } from "@/infrastructure/maps/google-routes-provider";
import { SupabaseReservationRepository } from "@/infrastructure/supabase/booking-repository";

export async function POST(request: Request) {
  try {
    const repository = new SupabaseReservationRepository();
    const result = await createReservation(await request.json(), repository, new GoogleRoutesProvider());
    const { notificationContext, ...clientResult } = result;

    if (result.created) {
      after(() =>
        notifyOwnerOfNewBooking(new BrevoOwnerNotifier(), repository, result.id, result.reference, notificationContext, result.summary.phone),
      );
      after(() =>
        notifyClientOfBookingReceived(new BrevoClientNotifier(), repository, result.id, {
          reference: result.reference,
          customerEmail: notificationContext.customerEmail,
          pickupAddress: notificationContext.pickupAddress,
          destinationAddress: notificationContext.destinationAddress,
          pickupAt: notificationContext.pickupAt,
          estimatedPriceCents: notificationContext.pricing.mode === "quote" ? null : notificationContext.pricing.totalCents,
        }),
      );
    }

    return NextResponse.json(clientResult, { status: result.created ? 201 : 200 });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof RangeError) return NextResponse.json({ error: "Réservation invalide." }, { status: 400 });
    console.error("reservation_creation_failed", error);
    return NextResponse.json({ error: "Réservation momentanément indisponible." }, { status: 503 });
  }
}
