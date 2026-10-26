/**
 * What happens to one valid website enquiry when the Brevo provider is on.
 *
 * Order and safety rules:
 *  1. CRM (contact -> deal -> note). Best effort: any failure here is logged
 *     (codes only) and NEVER stops the enquiry.
 *  2. The team notification email — the one thing that must reach a human.
 *     If Brevo cannot send it, `fallbackNotify` (Resend, while it is still
 *     configured) is tried. Only if that also fails is the enquiry reported
 *     as not sent, so the visitor can try again or call.
 *  3. The customer acknowledgement. Best effort.
 *
 * Nothing here logs a customer's name, email, phone or message.
 */

import {
  createDealWithNote,
  enquiryRef,
  isDuplicateDeal,
  lookupContactId,
  resolvePipelineTarget,
  sendTransactionalEmail,
  splitName,
  upsertContact,
  type BrevoOptions,
} from "./brevo.ts";
import {
  buildAcknowledgementEmail,
  buildDealNote,
  buildNotificationEmail,
  type EnquiryField,
  type SiteDetails,
} from "./enquiryEmails.ts";

export type EnquiryInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  /** Every field to show the team, in display order (includes the extras the form already collects). */
  fields: EnquiryField[];
};

export type ProcessConfig = {
  apiKey: string;
  sender: { email: string; name: string };
  notifyTo: string;
  site: SiteDetails;
  /** Pipeline name or id, only needed when the account has several. */
  pipelinePreferred?: string;
  /** Starting-stage names to look for, in order, e.g. ["New Enquiry", "New"]. */
  stageNames: string[];
  /** "Website enquiry - www.mobilecctvsolutions.com.au" */
  sourceLabel: string;
  log?: (message: string) => void;
  brevo?: BrevoOptions;
  now?: () => Date;
};

export type ProcessResult =
  | {
      ok: true;
      notifiedVia: "brevo" | "fallback";
      crm: "created" | "duplicate" | "skipped-failed";
      acknowledged: boolean;
    }
  | { ok: false };

/** In-memory guard against an instant double-submit on a warm server instance. */
const recentRefs = new Map<string, number>();
const REF_WINDOW_MS = 10 * 60 * 1000;
export function _resetRecentRefs() {
  recentRefs.clear();
}

async function runCrm(
  input: EnquiryInput,
  cfg: ProcessConfig,
  ref: string,
  receivedAt: Date
): Promise<"created" | "duplicate" | "skipped-failed"> {
  const log = cfg.log ?? (() => {});
  const nowMs = receivedAt.getTime();
  for (const [k, at] of recentRefs) if (nowMs - at > REF_WINDOW_MS) recentRefs.delete(k);
  if (recentRefs.has(ref)) return "duplicate";
  recentRefs.set(ref, nowMs);

  const fail = (reason: string) => {
    recentRefs.delete(ref); // let a genuine retry try again
    log(`CRM step skipped: ${reason}`);
    return "skipped-failed" as const;
  };

  const contact = await upsertContact(
    cfg.apiKey,
    {
      email: input.email,
      name: input.name,
      phone: input.phone,
      sourceLabel: cfg.sourceLabel,
      dateIso: receivedAt.toISOString().slice(0, 10),
    },
    cfg.brevo
  );
  if (!contact.ok) return fail(`contact (status ${contact.status}, code ${contact.code ?? "unknown"})`);
  if (contact.degraded) log("CRM contact saved without some attributes (check the custom attributes exist in Brevo)");

  const contactId = contact.contactId ?? (await lookupContactId(cfg.apiKey, input.email, cfg.brevo));
  if (contactId === null) return fail("contact id unavailable");

  const dealName = `Website Enquiry – ${input.name.trim().slice(0, 100)}`;
  if (await isDuplicateDeal(cfg.apiKey, contactId, dealName, ref, cfg.brevo)) return "duplicate";

  const target = await resolvePipelineTarget(cfg.apiKey, cfg.stageNames, cfg.pipelinePreferred, cfg.brevo);
  if (!target.ok) return fail(target.reason);

  const deal = await createDealWithNote(
    cfg.apiKey,
    {
      dealName,
      contactId,
      target: target.target,
      noteHtml: buildDealNote(input.fields, ref, receivedAt.toISOString()),
    },
    cfg.brevo
  );
  if (!deal.ok) return fail(deal.reason);
  if (!deal.noteOk) log("CRM deal created but its note could not be saved");
  return "created";
}

export async function processEnquiry(
  input: EnquiryInput,
  cfg: ProcessConfig,
  /** Called only if Brevo cannot send the team notification. Return true when it did send. */
  fallbackNotify?: (email: { subject: string; text: string; replyTo: string }) => Promise<boolean>
): Promise<ProcessResult> {
  const log = cfg.log ?? (() => {});
  const receivedAt = (cfg.now ?? (() => new Date()))();
  const ref = enquiryRef(input.email, input.message);

  // 1. CRM — never throws, never blocks the enquiry.
  let crm: "created" | "duplicate" | "skipped-failed";
  try {
    crm = await runCrm(input, cfg, ref, receivedAt);
  } catch (err) {
    log(`CRM step error (${err instanceof Error ? err.name : "unknown"})`);
    crm = "skipped-failed";
  }

  // 2. Team notification — the must-deliver part.
  const note = buildNotificationEmail({
    fields: input.fields,
    name: input.name,
    company: input.company,
    crmWarning: crm === "skipped-failed",
  });
  const sent = await sendTransactionalEmail(
    cfg.apiKey,
    {
      sender: cfg.sender,
      to: [{ email: cfg.notifyTo }],
      replyTo: { email: input.email, name: input.name },
      subject: note.subject,
      htmlContent: note.html,
      textContent: note.text,
      tags: ["website-enquiry", "team-notification"],
    },
    cfg.brevo
  );

  let notifiedVia: "brevo" | "fallback" = "brevo";
  if (!sent.ok) {
    log(`team notification via Brevo failed: ${sent.reason}`);
    const ok = fallbackNotify
      ? await fallbackNotify({ subject: note.subject, text: note.text, replyTo: input.email }).catch(() => false)
      : false;
    if (!ok) {
      recentRefs.delete(ref);
      return { ok: false };
    }
    notifiedVia = "fallback";
  }

  // 3. Acknowledgement to the customer — best effort.
  let acknowledged = false;
  try {
    const ack = buildAcknowledgementEmail({ firstName: splitName(input.name).first, site: cfg.site });
    const r = await sendTransactionalEmail(
      cfg.apiKey,
      {
        sender: cfg.sender,
        to: [{ email: input.email, name: input.name }],
        subject: ack.subject,
        htmlContent: ack.html,
        textContent: ack.text,
        tags: ["website-enquiry", "customer-acknowledgement"],
      },
      cfg.brevo
    );
    acknowledged = r.ok;
    if (!r.ok) log(`acknowledgement email failed: ${r.reason}`);
  } catch (err) {
    log(`acknowledgement error (${err instanceof Error ? err.name : "unknown"})`);
  }

  return { ok: true, notifiedVia, crm, acknowledged };
}
