import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp } from "@/infrastructure/rate-limit/client-ip";
import { checkRateLimit } from "@/infrastructure/rate-limit/supabase-rate-limiter";

const RATE_LIMIT_WINDOW_SECONDS = 600;
const RATE_LIMIT_MAX_REQUESTS = 4;
const BREVO_TIMEOUT_MS = 8_000;

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

const sirhaLeadSchema = z.object({
  company: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: optionalText(30),
  presenceStart: z.iso.date(),
  presenceEnd: z.union([z.iso.date(), z.literal("")]).optional().default(""),
  people: z.union([z.coerce.number().int().min(1).max(100), z.literal("")]).optional().default(""),
  arrivalMode: z.enum(["Avion", "Train", "Voiture / autre", ""]).optional().default(""),
  arrivalLocation: optionalText(180),
  hotel: optionalText(180),
  approxTrips: z.union([z.coerce.number().int().min(1).max(100), z.literal("")]).optional().default(""),
  chauffeurService: z.enum(["Oui", "Non", "À déterminer"]),
  message: optionalText(2500),
  website: optionalText(200),
}).superRefine((data, context) => {
  if (data.presenceEnd && data.presenceEnd < data.presenceStart) {
    context.addIssue({ code: "custom", path: ["presenceEnd"], message: "La date de fin doit être postérieure à la date de début." });
  }
});

type SirhaLead = z.infer<typeof sirhaLeadSchema>;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function display(value: string | number): string {
  return value === "" ? "—" : String(value);
}

function buildText(lead: SirhaLead): string {
  return [
    "Nouvelle demande entreprise — SIRHA Lyon",
    `Entreprise : ${lead.company}`,
    `Contact : ${lead.name}`,
    `E-mail : ${lead.email}`,
    `Téléphone : ${display(lead.phone)}`,
    `Présence : ${lead.presenceStart}${lead.presenceEnd ? ` au ${lead.presenceEnd}` : ""}`,
    `Nombre de personnes : ${display(lead.people)}`,
    `Mode d’arrivée : ${display(lead.arrivalMode)}`,
    `Aéroport / gare : ${display(lead.arrivalLocation)}`,
    `Hôtel : ${display(lead.hotel)}`,
    `Nombre approximatif de trajets : ${display(lead.approxTrips)}`,
    `Mise à disposition : ${lead.chauffeurService}`,
    `Message / planning : ${display(lead.message)}`,
  ].join("\n");
}

function buildHtml(lead: SirhaLead): string {
  const rows: [string, string | number][] = [
    ["Entreprise", lead.company],
    ["Contact", lead.name],
    ["E-mail", lead.email],
    ["Téléphone", display(lead.phone)],
    ["Présence", `${lead.presenceStart}${lead.presenceEnd ? ` au ${lead.presenceEnd}` : ""}`],
    ["Nombre de personnes", display(lead.people)],
    ["Mode d’arrivée", display(lead.arrivalMode)],
    ["Aéroport / gare", display(lead.arrivalLocation)],
    ["Hôtel", display(lead.hotel)],
    ["Nombre de trajets", display(lead.approxTrips)],
    ["Mise à disposition", lead.chauffeurService],
  ];

  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f5efe0;font-family:Arial,Helvetica,sans-serif;padding:24px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:100%;background:#fff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#1b1812;padding:20px 24px;color:#f5efe0;font-size:18px;font-weight:bold">KDRIVE</td></tr>
        <tr><td style="padding:24px">
          <p style="margin:0 0 6px;color:#8a692f;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.08em">Demande entreprise</p>
          <h1 style="margin:0 0 18px;color:#1b1812;font-size:22px">Organisation SIRHA Lyon</h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rows.map(([label, value]) => `<tr><td style="padding:7px 0;color:#746c60;font-size:13px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 0;color:#1b1812;font-size:13px;text-align:right">${escapeHtml(String(value))}</td></tr>`).join("")}
          </table>
          <div style="margin-top:20px;padding:16px;background:#faf6ef;border-radius:8px;color:#1b1812;font-size:13px;line-height:1.6;white-space:pre-wrap"><strong>Message / planning</strong><br>${escapeHtml(display(lead.message))}</div>
          <div style="margin-top:20px"><a href="mailto:${encodeURIComponent(lead.email)}" style="display:inline-block;background:#b08d4f;color:#1b1812;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:8px">Répondre au contact</a></div>
        </td></tr>
      </table>
    </td></tr></table>
  </body></html>`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSeconds } = await checkRateLimit(`sirha-leads:${ip}`, RATE_LIMIT_WINDOW_SECONDS, RATE_LIMIT_MAX_REQUESTS);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans quelques minutes." },
      { status: 429, headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined },
    );
  }

  try {
    const lead = sirhaLeadSchema.parse(await request.json());
    if (lead.website) return NextResponse.json({ ok: true }, { status: 201 });

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.BREVO_FROM_EMAIL;
    const fromName = process.env.BREVO_FROM_NAME;
    const ownerEmail = process.env.BREVO_OWNER_EMAIL;
    if (!apiKey || !fromEmail || !fromName || !ownerEmail) {
      console.error("sirha_lead_notification_not_configured");
      return NextResponse.json({ error: "Le formulaire est momentanément indisponible. Contactez Kdrive par téléphone." }, { status: 503 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS);
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { name: fromName, email: fromEmail },
          to: [{ email: ownerEmail }],
          replyTo: { email: lead.email, name: lead.name },
          subject: `Demande SIRHA — ${lead.company} — ${lead.name}`,
          htmlContent: buildHtml(lead),
          textContent: buildText(lead),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error("sirha_lead_notification_http_error", response.status);
        return NextResponse.json({ error: "Votre demande n’a pas pu être envoyée. Contactez Kdrive par téléphone." }, { status: 502 });
      }
    } finally {
      clearTimeout(timeout);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Vérifiez les informations du formulaire." }, { status: 400 });
    }
    console.error("sirha_lead_submission_failed", error instanceof Error ? error.message : "unknown_error");
    return NextResponse.json({ error: "Votre demande n’a pas pu être envoyée. Contactez Kdrive par téléphone." }, { status: 503 });
  }
}
