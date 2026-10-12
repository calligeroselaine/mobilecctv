/**
 * Sends one enquiry email through Resend and reports — truthfully — whether
 * Resend accepted it. A send only counts as successful when Resend answers
 * with a 2xx status AND an email id. Anything else (rate limit, daily or
 * monthly quota, API/validation error, network failure, timeout, an
 * unexpected response) is reported as a failure so the caller never tells a
 * visitor "sent" when it wasn't.
 *
 * Deliberately has no imports so it can be unit-tested on its own
 * (see scripts/test-contact-safeguards.mjs).
 */

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const DEFAULT_TIMEOUT_MS = 15_000;

export type SendEnquiryInput = {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type SendFailureReason =
  | "rate_limited"
  | "quota_exceeded"
  | "rejected"
  | "bad_response"
  | "network"
  | "timeout";

export type SendResult =
  | { ok: true }
  | {
      ok: false;
      reason: SendFailureReason;
      /** HTTP status from Resend, when there was a response. */
      status?: number;
      /** Resend's own error name/message, scrubbed — safe to log. */
      detail?: string;
    };

type Options = {
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  url?: string;
};

/** Removes anything that could identify a customer or leak a key before it is logged. */
export function scrubForLog(value: unknown): string {
  return String(value ?? "")
    .replace(/re_[A-Za-z0-9_]{8,}/g, "[api-key]")
    .replace(/[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+/g, "[email]")
    .slice(0, 200);
}

export async function sendEnquiryEmail(
  input: SendEnquiryInput,
  { fetchImpl = fetch, timeoutMs = DEFAULT_TIMEOUT_MS, url = RESEND_EMAILS_URL }: Options = {}
): Promise<SendResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetchImpl(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return {
      ok: false,
      reason: aborted ? "timeout" : "network",
      detail: scrubForLog(err instanceof Error ? err.name : "unknown error"),
    };
  } finally {
    clearTimeout(timer);
  }

  let payload: { id?: unknown; name?: unknown; message?: unknown } | null = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (res.ok) {
    if (payload && typeof payload.id === "string" && payload.id.length > 0) {
      return { ok: true };
    }
    // A 2xx without an email id is not proof Resend queued anything.
    return { ok: false, reason: "bad_response", status: res.status };
  }

  const name = typeof payload?.name === "string" ? payload.name : "";
  const message = typeof payload?.message === "string" ? payload.message : "";
  const detail = scrubForLog([name, message].filter(Boolean).join(": "));
  const looksLikeQuota = /quota/i.test(name) || /quota/i.test(message);

  if (looksLikeQuota) return { ok: false, reason: "quota_exceeded", status: res.status, detail };
  if (res.status === 429) return { ok: false, reason: "rate_limited", status: res.status, detail };
  return { ok: false, reason: "rejected", status: res.status, detail };
}
