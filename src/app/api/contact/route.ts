import { NextResponse } from "next/server";
import { business } from "@/lib/business";

/**
 * Contact/quote form submission endpoint.
 *
 * IMPORTANT — this does not yet send real emails. No email provider is
 * configured for this project. Until RESEND_API_KEY and CONTACT_TO_EMAIL
 * are set (see README.md § "Contact form setup"), every valid submission
 * gets a clear 501 error back — never a fake "success". Once those two
 * env vars are set, this route sends real emails via the Resend HTTP API
 * with no further code changes required.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBMIT_MS = 1500; // real users take longer than this to fill the form out

type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  location?: string;
  solution?: string;
  engagement?: string;
  timing?: string;
  message: string;
  privacyAccepted: boolean;
  // Anti-spam fields — not shown to real users, see ContactForm.tsx
  honeypot?: string;
  formStartedAt?: number;
};

function validate(body: Partial<ContactPayload>) {
  const fieldErrors: Record<string, string> = {};

  if (!body.name || !body.name.trim()) fieldErrors.name = "Name is required.";
  if (!body.email || !EMAIL_RE.test(body.email)) {
    fieldErrors.email = "A valid email address is required.";
  }
  if (!body.message || !body.message.trim()) {
    fieldErrors.message = "Message is required.";
  }
  if (!body.privacyAccepted) {
    fieldErrors.privacyAccepted = "Please acknowledge the privacy policy to continue.";
  }

  return fieldErrors;
}

/** Silently discards bot traffic without exposing detection logic to the client. */
function looksLikeSpam(body: Partial<ContactPayload>) {
  if (body.honeypot && body.honeypot.trim() !== "") return true;
  if (body.formStartedAt && Date.now() - body.formStartedAt < MIN_SUBMIT_MS) return true;
  return false;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (looksLikeSpam(body)) {
    // Respond as if it worked so bots don't learn their submission was
    // rejected — this is standard honeypot practice, not the "fake
    // success for a real user" the brief warns against, since nothing
    // was actually rejected here from a genuine visitor.
    return NextResponse.json({ ok: true });
  }

  const fieldErrors = validate(body);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Please fix the errors below.", fieldErrors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || business.email;

  if (!apiKey) {
    console.warn(
      "[/api/contact] RESEND_API_KEY is not set — see README.md 'Contact form setup'. Submission was NOT sent:",
      { name: body.name, email: body.email }
    );
    return NextResponse.json(
      {
        error:
          "Sorry, the enquiry form isn't fully set up yet. Please call us on " +
          business.phone.display +
          " or email " +
          business.email +
          " directly.",
      },
      { status: 501 }
    );
  }

  const lines = [
    `Name: ${body.name}`,
    body.company && `Company: ${body.company}`,
    `Email: ${body.email}`,
    body.phone && `Phone: ${body.phone}`,
    body.location && `Location / project area: ${body.location}`,
    body.solution && `Solution required: ${body.solution}`,
    body.engagement && `Hire / purchase: ${body.engagement}`,
    body.timing && `Approximate timing: ${body.timing}`,
    "",
    "Message:",
    body.message,
  ].filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${business.name} Website <onboarding@resend.dev>`,
        to: [toEmail],
        reply_to: body.email,
        subject: `New enquiry from ${body.name}${body.company ? ` (${body.company})` : ""}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[/api/contact] Resend API error:", res.status, errText);
      return NextResponse.json(
        { error: "Something went wrong sending your enquiry. Please try again or call us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your enquiry. Please try again or call us directly." },
      { status: 502 }
    );
  }
}
