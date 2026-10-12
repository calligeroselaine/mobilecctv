/**
 * The one message a visitor sees whenever their enquiry could not be emailed.
 * The phone number and email are repeated here (from src/lib/business.ts) on
 * purpose, so this file stays import-free and testable on its own — update
 * both places if either ever changes.
 *
 * The form shows the phone number and email as tap-to-call / tap-to-email
 * links built from these same parts; CONTACT_SEND_FAILURE_MESSAGE is the
 * identical wording as plain text (used by the API and the tests).
 */
export const CONTACT_PHONE_DISPLAY = "1300 99 69 10";
export const CONTACT_PHONE_HREF = "tel:1300996910";
export const CONTACT_EMAIL = "sales@mobilecctvsolutions.com.au";

export const CONTACT_FAILURE_LEAD =
  "Sorry, we couldn't send your enquiry right now. Please try again later or contact Mobile CCTV Solutions directly on ";

export const CONTACT_SEND_FAILURE_MESSAGE = `${CONTACT_FAILURE_LEAD}${CONTACT_PHONE_DISPLAY} or ${CONTACT_EMAIL}.`;
