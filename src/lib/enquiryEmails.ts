/**
 * The two emails the website sends for each enquiry through Brevo:
 *  1. a notification to the Mobile CCTV team with every detail, and
 *  2. a short, branded acknowledgement to the customer.
 *
 * Dependency-free (testable on its own). All visitor-supplied text is HTML-
 * escaped. Inline styles and table layout are used because many email apps
 * ignore anything else.
 */

const BRAND_BLUE = "#4588c6";
const BRAND_GREY = "#666666";

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type EnquiryField = [label: string, value: string];

export type SiteDetails = {
  siteUrl: string; // e.g. https://www.mobilecctvsolutions.com.au
  businessName: string;
  phoneDisplay: string; // 1300 99 69 10
  phoneHref: string; // tel:1300996910
};

// ------------------------------------------------------ team notification --

export function buildNotificationEmail(opts: {
  fields: EnquiryField[];
  name: string;
  company?: string;
  /** Set when the CRM steps failed, so the team knows to add the contact by hand. */
  crmWarning?: boolean;
}): { subject: string; html: string; text: string } {
  const shown = opts.fields.filter(([, v]) => v.trim().length > 0);

  const rows = shown
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#888888;white-space:nowrap;vertical-align:top;">${esc(label)}</td>` +
        `<td style="padding:6px 0;">${esc(value).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");

  const warning = opts.crmWarning
    ? `<p style="margin:0 0 16px;padding:10px 12px;background:#fef3c7;border:1px solid #fcd34d;color:#92400e;">` +
      `This enquiry could not be added to the CRM automatically. Please add the contact and a deal by hand.</p>`
    : "";

  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111827;">` +
    warning +
    `<table style="font-size:14px;border-collapse:collapse;">${rows}</table></div>`;

  const text =
    (opts.crmWarning
      ? "NOTE: This enquiry could not be added to the CRM automatically. Please add the contact and a deal by hand.\n\n"
      : "") + shown.map(([label, value]) => `${label}: ${value}`).join("\n");

  return {
    subject: `New enquiry from ${opts.name}${opts.company ? ` (${opts.company})` : ""}`,
    html,
    text,
  };
}

// ------------------------------------------------- customer acknowledgement --

export const ACK_SUBJECT = "Thank you for contacting Mobile CCTV Solutions";

export function buildAcknowledgementEmail(opts: {
  firstName: string;
  site: SiteDetails;
}): { subject: string; html: string; text: string } {
  const hi = opts.firstName.trim() ? `Hi ${opts.firstName.trim()},` : "Hi,";
  const logo = `${opts.site.siteUrl}/images/logo.png`;

  const html =
    `<div style="background:#f6f7f9;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;border-top:4px solid ${BRAND_BLUE};">` +
    `<tr><td style="padding:24px 28px 8px;">` +
    `<img src="${esc(logo)}" alt="${esc(opts.site.businessName)}" width="200" style="display:block;border:0;height:auto;max-width:200px;" />` +
    `</td></tr>` +
    `<tr><td style="padding:12px 28px 8px;font-size:15px;line-height:1.6;color:#111827;">` +
    `<p style="margin:0 0 14px;">${esc(hi)}</p>` +
    `<p style="margin:0 0 14px;">Thank you for your enquiry.</p>` +
    `<p style="margin:0 0 14px;">We&rsquo;ve received your message and a member of our team will be in touch shortly.</p>` +
    `<p style="margin:0;">Kind regards,<br/><strong>Mobile CCTV Solutions</strong></p>` +
    `</td></tr>` +
    `<tr><td style="padding:18px 28px 24px;font-size:13px;color:${BRAND_GREY};border-top:1px solid #e5e7eb;">` +
    `Need something urgently? Call us on <a href="${esc(opts.site.phoneHref)}" style="color:${BRAND_BLUE};text-decoration:none;">${esc(opts.site.phoneDisplay)}</a>` +
    ` &middot; <a href="${esc(opts.site.siteUrl)}" style="color:${BRAND_BLUE};text-decoration:none;">${esc(opts.site.siteUrl.replace(/^https?:\/\//, ""))}</a>` +
    `</td></tr></table></div>`;

  const text =
    `${hi}\n\nThank you for your enquiry.\n\n` +
    `We've received your message and a member of our team will be in touch shortly.\n\n` +
    `Kind regards,\nMobile CCTV Solutions\n\n` +
    `Need something urgently? Call us on ${opts.site.phoneDisplay} · ${opts.site.siteUrl.replace(/^https?:\/\//, "")}`;

  return { subject: ACK_SUBJECT, html, text };
}

// ------------------------------------------------------------- deal note --

/** The enquiry, as the note attached to the CRM deal. Includes the dedupe reference. */
export function buildDealNote(fields: EnquiryField[], ref: string, receivedAt: string): string {
  const body = fields
    .filter(([, v]) => v.trim().length > 0)
    .map(([label, value]) => `<p><b>${esc(label)}:</b> ${esc(value).replace(/\n/g, "<br />")}</p>`)
    .join("");
  return `${body}<p><b>Received:</b> ${esc(receivedAt)}</p><p><small>Ref: ${esc(ref)}</small></p>`;
}
