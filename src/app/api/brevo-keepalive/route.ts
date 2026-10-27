import { NextResponse } from "next/server";
import { pingBrevo } from "@/lib/brevo";
import { isAuthorisedCron } from "@/lib/cronAuth";

/**
 * Weekly keep-alive for the Brevo API key (Brevo expires keys after 90 days of
 * no use). Called by the Vercel Cron job in vercel.json. It only runs when the
 * request carries the project's CRON_SECRET, and it only does one read-only
 * call to Brevo. Nothing about any customer is touched or logged.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAuthorisedCron(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    // Nothing to keep alive (the Brevo flow isn't configured) — not an error.
    return NextResponse.json({ ok: true, skipped: "BREVO_API_KEY not set" });
  }

  const result = await pingBrevo(apiKey);
  if (!result.ok) {
    console.error(`[/api/brevo-keepalive] Brevo key check FAILED (status ${result.status}, code ${result.code ?? "unknown"}) — the key may have expired or been deleted.`);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
