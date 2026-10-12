/**
 * The one message a visitor sees whenever their enquiry could not be emailed.
 * The phone number and email are repeated here (from src/lib/business.ts) on
 * purpose, so this file stays import-free and testable on its own — update
 * both places if either ever changes.
 */
export const CONTACT_SEND_FAILURE_MESSAGE =
  "Sorry, we couldn't send your enquiry right now. Please try again later or contact Mobile CCTV Solutions directly on 1300 99 69 10 or sales@mobilecctvsolutions.com.au.";
