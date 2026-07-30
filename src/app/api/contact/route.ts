import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { business } from "@/lib/business";

/**
 * Contact/quote form submission endpoint.
 *
 * IMPORTANT — this does not yet send real emails. No SMTP account is
 * configured for this project. Until SMTP_USER, SMTP_PASS and
 * CONTACT_TO_EMAIL are set (see README.md § "Contact form setup"), every
 * valid submission gets a clear 501 error back — never a fake "success".
 * Once those env vars are set, this route sends real emails via SMTP
 * (defaults to Gmail's SMTP server) with no further code changes required.
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

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || business.email;

  if (!smtpUser || !smtpPass) {
    console.warn(
      "[/api/contact] SMTP_USER / SMTP_PASS not set — see README.md 'Contact form setup'. Submission was NOT sent:",
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
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false", // true for port 465
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `${business.name} Website <${smtpUser}>`,
      to: toEmail,
      replyTo: body.email,
      subject: `New enquiry from ${body.name}${body.company ? ` (${body.company})` : ""}`,
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] SMTP send error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your enquiry. Please try again or call us directly." },
      { status: 502 }
    );
  }
}
