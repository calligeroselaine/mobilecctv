/**
 * Thin, dependency-free helpers for the parts of the Brevo API the website
 * enquiry flow uses: contacts, CRM deals + notes, and transactional email.
 *
 * Rules every function here follows:
 *  - Nothing throws. Each returns a plain result object so one failing step
 *    can never lose an enquiry.
 *  - Every request has a timeout.
 *  - Failures are reported as a short Brevo error *code* only. Brevo's error
 *    *messages* can echo customer details, so they are never returned or
 *    logged.
 *
 * No imports from the app, so it can be tested on its own
 * (scripts/test-brevo-integration.mjs).
 */

import { createHash } from "node:crypto";

const BREVO_API = "https://api.brevo.com/v3";

export type FetchLike = typeof fetch;

export type BrevoOptions = {
  fetchImpl?: FetchLike;
  /** Per-request timeout. */
  timeoutMs?: number;
};

type CallResult = {
  ok: boolean;
  status: number;
  /** Parsed JSON body (when there is one). */
  data: unknown;
  /** Brevo's machine-readable error code, never its message. */
  code?: string;
};

async function call(
  apiKey: string,
  path: string,
  init: { method?: string; body?: unknown },
  { fetchImpl = fetch, timeoutMs = 4000 }: BrevoOptions = {}
): Promise<CallResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl(`${BREVO_API}${path}`, {
      method: init.method ?? "GET",
      headers: {
        "api-key": apiKey,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      signal: controller.signal,
    });
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (res.ok) return { ok: true, status: res.status, data };
    const code =
      data && typeof (data as { code?: unknown }).code === "string"
        ? ((data as { code: string }).code)
        : "unknown";
    return { ok: false, status: res.status, data: null, code };
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return { ok: false, status: 0, data: null, code: aborted ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}

/** What gets logged for a failed Brevo step — never any customer detail. */
export function describeFailure(step: string, r: { status: number; code?: string }): string {
  return `${step} failed (status ${r.status}, code ${r.code ?? "unknown"})`;
}

// ---------------------------------------------------------------- helpers --

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** "Jane Citizen" -> { first: "Jane", last: "Citizen" }. A single word is the first name. */
export function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

/**
 * Brevo's SMS attribute only accepts international format. Converts a typed
 * Australian number ("0400 000 000", "(02) 9999 9999", "+61 400 000 000") to
 * "+61…". Anything it can't be sure about (1300/1800 numbers, odd lengths,
 * overseas numbers) returns null — the number is then kept in the deal note
 * instead, so it is never lost.
 */
export function normalizeAuPhone(raw: string | undefined | null): string | null {
  if (!raw) return null;
  let s = raw.trim();
  const hasPlus = s.startsWith("+");
  s = s.replace(/[^\d]/g, "");
  if (!s) return null;

  if (hasPlus || s.startsWith("0061")) {
    if (s.startsWith("0061")) s = s.slice(2);
    if (s.startsWith("61") && s.length === 11) return `+${s}`;
    return null; // overseas or malformed: leave to the note
  }
  if (s.startsWith("61") && s.length === 11) return `+${s}`;
  if (s.startsWith("0") && s.length === 10) {
    // 13xx / 1300 / 1800 style numbers don't start with 0, so they never get here.
    return `+61${s.slice(1)}`;
  }
  return null;
}

/** Stable short reference for "same person + same message" — used to spot retries. */
export function enquiryRef(email: string, message: string): string {
  const normal = `${email.trim().toLowerCase()}|${message.trim().replace(/\s+/g, " ").toLowerCase()}`;
  return createHash("sha256").update(normal).digest("hex").slice(0, 12);
}

// --------------------------------------------------------------- contacts --

export type ContactInput = {
  email: string;
  name: string;
  phone?: string;
  /** e.g. "Website enquiry - www.mobilecctvsolutions.com.au" */
  sourceLabel: string;
  /** YYYY-MM-DD, the day the enquiry arrived. */
  dateIso: string;
};

export type ContactResult =
  | { ok: true; contactId: number | null; degraded: boolean }
  | { ok: false; status: number; code?: string };

/**
 * Creates the contact or updates it if the email already exists. If Brevo
 * rejects the extra attributes (for example the two custom ones haven't been
 * created yet, or the phone number format) it retries with less, so the
 * contact is still saved. `degraded` tells the caller something was dropped.
 *
 * Never adds the contact to a marketing list or subscribes them to anything.
 */
export async function upsertContact(
  apiKey: string,
  input: ContactInput,
  opts?: BrevoOptions
): Promise<ContactResult> {
  const { first, last } = splitName(input.name);
  const sms = normalizeAuPhone(input.phone);

  const base: Record<string, string> = { FIRSTNAME: first };
  if (last) base.LASTNAME = last;

  const attempts: Record<string, string>[] = [
    {
      ...base,
      ...(sms ? { SMS: sms } : {}),
      ENQUIRY_SOURCE: input.sourceLabel,
      LAST_ENQUIRY_DATE: input.dateIso,
    },
    { ...base, ...(sms ? { SMS: sms } : {}) },
    base,
  ];
  // Drop attempts that would repeat an earlier one.
  const unique = attempts.filter((a, i) => attempts.findIndex((b) => JSON.stringify(b) === JSON.stringify(a)) === i);

  let lastResult: CallResult | null = null;
  for (let i = 0; i < unique.length; i++) {
    const r = await call(
      apiKey,
      "/contacts",
      { method: "POST", body: { email: input.email, updateEnabled: true, attributes: unique[i] } },
      opts
    );
    if (r.ok) {
      const id = (r.data as { id?: unknown } | null)?.id;
      return { ok: true, contactId: typeof id === "number" ? id : null, degraded: i > 0 };
    }
    lastResult = r;
    // Only a 400 (bad attribute / format) is worth retrying with less.
    if (r.status !== 400) break;
  }
  return { ok: false, status: lastResult?.status ?? 0, code: lastResult?.code };
}

/** Brevo only returns the contact id on creation; for an updated contact we look it up. */
export async function lookupContactId(apiKey: string, email: string, opts?: BrevoOptions): Promise<number | null> {
  const r = await call(apiKey, `/contacts/${encodeURIComponent(email)}?identifierType=email_id`, {}, opts);
  const id = (r.data as { id?: unknown } | null)?.id;
  return r.ok && typeof id === "number" ? id : null;
}

// -------------------------------------------------------------- pipeline --

export type PipelineTarget = { pipelineId: string; stageId: string };

type PipelineDetails = {
  pipeline: string;
  pipeline_name: string;
  stages?: { id: string; name: string }[];
};

let cachedTarget: PipelineTarget | null = null;
export function _resetPipelineCache() {
  cachedTarget = null;
}

/**
 * Finds the starting stage by NAME, so no pipeline or stage IDs are stored
 * anywhere. `stageNames` are tried in order (the site uses ["New Enquiry",
 * "New"]: a custom "New Enquiry" stage if the account has one, otherwise
 * Brevo's built-in "New" stage on the free plan's default pipeline).
 *
 * With one pipeline it is used automatically. With several, the one that
 * contains one of those stages is used if exactly one does; otherwise
 * `preferred` (a pipeline name or id) decides. It never guesses.
 */
export async function resolvePipelineTarget(
  apiKey: string,
  stageNames: string[],
  preferred: string | undefined,
  opts?: BrevoOptions
): Promise<{ ok: true; target: PipelineTarget } | { ok: false; reason: string }> {
  if (cachedTarget) return { ok: true, target: cachedTarget };

  const r = await call(apiKey, "/crm/pipeline/details/all", {}, opts);
  if (!r.ok) return { ok: false, reason: describeFailure("pipeline lookup", r) };
  const pipelines = r.data as PipelineDetails[] | null;
  if (!Array.isArray(pipelines) || pipelines.length === 0) {
    return { ok: false, reason: "no pipelines in the Brevo account" };
  }

  const stageOf = (p: PipelineDetails) => {
    for (const name of stageNames) {
      const hit = p.stages?.find((s) => s.name.trim().toLowerCase() === name.toLowerCase());
      if (hit) return hit;
    }
    return undefined;
  };

  let pipeline: PipelineDetails | undefined;
  const want = preferred?.trim();
  if (want) {
    pipeline = pipelines.find((p) => p.pipeline === want || p.pipeline_name.trim().toLowerCase() === want.toLowerCase());
  } else if (pipelines.length === 1) {
    pipeline = pipelines[0];
  } else {
    const withStage = pipelines.filter((p) => stageOf(p));
    if (withStage.length === 1) pipeline = withStage[0];
  }
  if (!pipeline) return { ok: false, reason: "could not choose a pipeline (set BREVO_DEAL_PIPELINE)" };

  const stage = stageOf(pipeline);
  if (!stage) return { ok: false, reason: `none of the stages (${stageNames.join(", ")}) found in the pipeline` };

  cachedTarget = { pipelineId: pipeline.pipeline, stageId: stage.id };
  return { ok: true, target: cachedTarget };
}

// ----------------------------------------------------------------- deals --

type DealItem = { id?: string; attributes?: { deal_name?: string } };

async function recentDeals(apiKey: string, contactId: number, sinceMs: number, opts?: BrevoOptions) {
  const since = new Date(Date.now() - sinceMs).toISOString();
  const r = await call(
    apiKey,
    `/crm/deals?filters[linkedContactsIds]=${contactId}&createdSince=${encodeURIComponent(since)}&limit=20`,
    {},
    opts
  );
  if (!r.ok) return null;
  return ((r.data as { items?: DealItem[] } | null)?.items ?? []).filter((d) => typeof d.id === "string");
}

/**
 * True if this person already has a deal for the *same enquiry* (same name
 * and same reference) from the last few minutes — i.e. a retry or a
 * double-click. A genuinely different second enquiry is NOT a duplicate and
 * gets its own deal.
 */
export async function isDuplicateDeal(
  apiKey: string,
  contactId: number,
  dealName: string,
  ref: string,
  opts?: BrevoOptions
): Promise<boolean> {
  const windowMs = 10 * 60 * 1000;
  const deals = await recentDeals(apiKey, contactId, windowMs, opts);
  if (!deals) return false; // can't tell: prefer creating the deal over losing the enquiry
  const sameName = deals.filter((d) => d.attributes?.deal_name === dealName);
  for (const d of sameName) {
    const r = await call(apiKey, `/crm/notes?entity=deals&entityIds=${encodeURIComponent(d.id as string)}`, {}, opts);
    if (!r.ok) {
      // Notes unreadable: fall back to "same name within the last 2 minutes" so a
      // double-click is still caught but a later genuine enquiry is not.
      const tight = await recentDeals(apiKey, contactId, 2 * 60 * 1000, opts);
      return (tight ?? []).some((t) => t.attributes?.deal_name === dealName);
    }
    // Brevo's notes endpoint returns a plain array (verified against a real account);
    // accept an {items: [...]} wrapper too in case that ever changes.
    const raw = r.data as { text?: string }[] | { items?: { text?: string }[] } | null;
    const notes: { text?: string }[] = Array.isArray(raw) ? raw : raw?.items ?? [];
    if (notes.some((n) => typeof n.text === "string" && n.text.includes(`Ref: ${ref}`))) return true;
  }
  return false;
}

export type DealResult =
  | { ok: true; dealId: string; noteOk: boolean; /** true when Brevo's default pipeline/stage was used */ defaultStage: boolean }
  | { ok: false; reason: string };

/**
 * Creates the deal, then attaches the enquiry as a note.
 *
 * First tries to place the deal in the resolved pipeline + starting stage.
 * Some Brevo accounts reject those two attributes (their deal fields haven't
 * been initialised yet — Brevo answers 400 "Invalid attribute"). In that case
 * it retries without them, which puts the deal in the account's default
 * pipeline, first stage ("New"). Either way the deal is created.
 */
export async function createDealWithNote(
  apiKey: string,
  params: { dealName: string; contactId: number; target: PipelineTarget; noteHtml: string },
  opts?: BrevoOptions
): Promise<DealResult> {
  const base = { name: params.dealName, linkedContactsIds: [params.contactId] };

  let defaultStage = false;
  let d = await call(
    apiKey,
    "/crm/deals",
    { method: "POST", body: { ...base, attributes: { pipeline: params.target.pipelineId, deal_stage: params.target.stageId } } },
    opts
  );
  if (!d.ok && d.status === 400) {
    d = await call(apiKey, "/crm/deals", { method: "POST", body: base }, opts);
    defaultStage = true;
  }
  if (!d.ok) return { ok: false, reason: describeFailure("deal create", d) };
  const id = (d.data as { id?: unknown } | null)?.id;
  if (typeof id !== "string" || !id) return { ok: false, reason: "deal create returned no id" };

  const n = await call(apiKey, "/crm/notes", { method: "POST", body: { text: params.noteHtml, dealIds: [id] } }, opts);
  return { ok: true, dealId: id, noteOk: n.ok, defaultStage };
}

// ------------------------------------------------------------ transactional --

export type TransactionalEmail = {
  sender: { email: string; name: string };
  to: { email: string; name?: string }[];
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent: string;
  tags?: string[];
};

/**
 * Sends one transactional email. Counts as sent only when Brevo returns 2xx
 * with a messageId.
 */
export async function sendTransactionalEmail(
  apiKey: string,
  email: TransactionalEmail,
  opts?: BrevoOptions
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const r = await call(apiKey, "/smtp/email", { method: "POST", body: email }, { timeoutMs: 5000, ...opts });
  if (!r.ok) return { ok: false, reason: describeFailure("email send", r) };
  const messageId = (r.data as { messageId?: unknown } | null)?.messageId;
  if (typeof messageId !== "string" || !messageId) return { ok: false, reason: "email send returned no messageId" };
  return { ok: true };
}
