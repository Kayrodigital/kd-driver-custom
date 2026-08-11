import { NextResponse, after } from "next/server";
import { z } from "zod";
import { createReservation } from "@/application/create-booking";
import { BrevoOwnerNotifier } from "@/infrastructure/notifications/owner-notifier";
import { notifyOwnerOfNewBooking, notifyOwnerOfNewBookingByWhatsApp, notifyOwnerOfNewBookingBySms } from "@/infrastructure/notifications/notify-owner-of-new-booking";
import { MetaWhatsAppSender } from "@/infrastructure/notifications/whatsapp-sender";
import { TwilioBookingSmsSender } from "@/lib/twilio/send-booking-sms";
import { BrevoClientNotifier } from "@/infrastructure/notifications/client-notifier";
import { notifyClientOfBookingReceived } from "@/infrastructure/notifications/notify-client-of-booking";
import { GoogleRoutesProvider } from "@/infrastructure/maps/google-routes-provider";
import { SupabaseReservationRepository } from "@/infrastructure/supabase/booking-repository";
import { checkRateLimit } from "@/infrastructure/rate-limit/supabase-rate-limiter";
import { getClientIp } from "@/infrastructure/rate-limit/client-ip";

// Création de réservation : action rare et délibérée pour un utilisateur
// légitime — 5 par IP sur 10 minutes laisse de la marge (essais, erreurs
// de saisie) tout en bloquant un spam automatisé.
const RATE_LIMIT_WINDOW_SECONDS = 600;
const RATE_LIMIT_MAX_REQUESTS = 5;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = await checkRateLimit(`reservations:${ip}`, RATE_LIMIT_WINDOW_SECONDS, RATE_LIMIT_MAX_REQUESTS);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans quelques minutes." },
      { status: 429, headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined },
    );
  }

  try {
    const repository = new SupabaseReservationRepository();
    const result = await createReservation(await request.json(), repository, new GoogleRoutesProvider());
    const { notificationContext, ...clientResult } = result;

    if (result.created) {
      after(() =>
        notifyOwnerOfNewBooking(new BrevoOwnerNotifier(), repository, result.id, result.reference, notificationContext, result.summary.phone),
      );
      after(() =>
        notifyOwnerOfNewBookingByWhatsApp(new MetaWhatsAppSender(), repository, result.id, result.reference, notificationContext, result.summary.phone),
      );
      after(() =>
        notifyOwnerOfNewBookingBySms(new TwilioBookingSmsSender(), repository, result.id, result.reference, notificationContext, result.summary.phone),
      );
      after(() =>
        notifyClientOfBookingReceived(new BrevoClientNotifier(), repository, result.id, {
          reference: result.reference,
          customerEmail: notificationContext.customerEmail,
          pickupAddress: notificationContext.pickupAddress,
          destinationAddress: notificationContext.destinationAddress,
          pickupAt: notificationContext.pickupAt,
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
