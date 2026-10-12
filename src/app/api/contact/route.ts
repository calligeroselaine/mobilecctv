import { NextResponse } from "next/server";
import { business } from "@/lib/business";
import { CONTACT_SEND_FAILURE_MESSAGE } from "@/lib/contactMessages";
import { sendEnquiryEmail } from "@/lib/sendEnquiryEmail";

/**
 * Contact/quote form submission endpoint.
 *
 * A visitor is only told "ok" when Resend has actually accepted the email
 * (2xx + an email id — see sendEnquiryEmail). Every other outcome (missing
 * key, rate limit, daily/monthly quota, API error, network failure,
 * timeout) returns the same failure message so nobody is ever told their
 * enquiry was sent when it wasn't. Failures are logged server-side without
 * the API key or any of the visitor's details.
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

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || business.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) {
    // Log the problem, never the visitor's details.
    console.error("[/api/contact] enquiry NOT sent: RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false, error: CONTACT_SEND_FAILURE_MESSAGE }, { status: 503 });
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

  const result = await sendEnquiryEmail({
    apiKey: resendApiKey,
    from: `${business.name} Website <${fromEmail}>`,
    to: toEmail,
    replyTo: body.email as string,
    subject: `New enquiry from ${body.name}${body.company ? ` (${body.company})` : ""}`,
    text: lines.join("\n"),
  });

  if (!result.ok) {
    // Only the reason, HTTP status and Resend's scrubbed error text are
    // logged — no API key, no name/email/message from the visitor.
    console.error("[/api/contact] enquiry NOT sent:", {
      reason: result.reason,
      status: result.status,
      detail: result.detail,
    });
    const retryable = result.reason === "rate_limited" || result.reason === "quota_exceeded";
    return NextResponse.json(
      { ok: false, error: CONTACT_SEND_FAILURE_MESSAGE },
      { status: retryable ? 503 : 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
