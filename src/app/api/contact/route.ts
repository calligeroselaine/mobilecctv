import { NextResponse } from "next/server";
import { business } from "@/lib/business";
import { CONTACT_SEND_FAILURE_MESSAGE } from "@/lib/contactMessages";
import { sendEnquiryEmail } from "@/lib/sendEnquiryEmail";
import { processEnquiry } from "@/lib/processEnquiry";

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

  // ---- Brevo provider (CRM + notification + acknowledgement) --------------
  // Off by default. Turn on with CONTACT_EMAIL_PROVIDER=brevo. While Resend is
  // still configured it stays as the fallback if Brevo cannot send the team
  // notification, so no enquiry is lost during the changeover.
  if (process.env.CONTACT_EMAIL_PROVIDER?.trim().toLowerCase() === "brevo") {
    const brevoKey = process.env.BREVO_API_KEY?.trim();
    const senderEmail = (process.env.BREVO_SENDER_EMAIL || process.env.RESEND_FROM_EMAIL || "").trim();
    if (!brevoKey || !senderEmail) {
      // Misconfigured: say so in the log, then carry on with the Resend path below.
      console.error("[/api/contact] CONTACT_EMAIL_PROVIDER=brevo but BREVO_API_KEY or BREVO_SENDER_EMAIL is missing; using Resend.");
    } else {
      const notifyTo = process.env.CONTACT_TO_EMAIL || business.email;
      const host = business.siteUrl.replace(/^https?:\/\//, "");
      const fields: [string, string][] = [
        ["Name", body.name ?? ""],
        ["Company", body.company ?? ""],
        ["Email", body.email ?? ""],
        ["Phone", body.phone ?? ""],
        ["Location / project area", body.location ?? ""],
        ["Solution required", body.solution ?? ""],
        ["Hire / purchase", body.engagement ?? ""],
        ["Approximate timing", body.timing ?? ""],
        ["Message", body.message ?? ""],
        ["Source", `Website enquiry - ${host}`],
      ];
      const resendKey = process.env.RESEND_API_KEY;
      const outcome = await processEnquiry(
        {
          name: body.name as string,
          email: body.email as string,
          phone: body.phone,
          company: body.company,
          message: body.message as string,
          fields,
        },
        {
          apiKey: brevoKey,
          sender: { email: senderEmail, name: process.env.BREVO_SENDER_NAME?.trim() || business.name },
          notifyTo,
          site: {
            siteUrl: business.siteUrl,
            businessName: business.name,
            phoneDisplay: business.phone.display,
            phoneHref: business.phone.href,
          },
          pipelinePreferred: process.env.BREVO_DEAL_PIPELINE,
          stageNames: process.env.BREVO_DEAL_STAGE
            ? process.env.BREVO_DEAL_STAGE.split(",").map((x) => x.trim()).filter(Boolean)
            : ["New Enquiry", "New"],
          sourceLabel: `Website enquiry - ${host}`,
          log: (m) => console.error(`[/api/contact] ${m}`),
        },
        // Fallback while Resend is still set up: same email, sent the old way.
        resendKey
          ? async ({ subject, text, replyTo }) => {
              const r = await sendEnquiryEmail({
                apiKey: resendKey,
                from: `${business.name} Website <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
                to: notifyTo,
                replyTo,
                subject,
                text,
              });
              if (!r.ok) console.error(`[/api/contact] Resend fallback also failed: ${r.reason}${r.status ? ` (status ${r.status})` : ""}${r.detail ? `: ${r.detail}` : ""}`);
              return r.ok;
            }
          : undefined
      );
      if (!outcome.ok) {
        console.error("[/api/contact] enquiry NOT sent: Brevo notification failed and no fallback delivered it.");
        return NextResponse.json({ ok: false, error: CONTACT_SEND_FAILURE_MESSAGE }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }
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
