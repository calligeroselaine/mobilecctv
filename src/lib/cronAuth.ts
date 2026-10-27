import { timingSafeEqual } from "node:crypto";

/**
 * Checks the `Authorization: Bearer <secret>` header that Vercel Cron sends
 * when a CRON_SECRET environment variable is set on the project. Returns
 * false when no secret is configured, so the endpoint is never open to the
 * public. Comparison is constant-time.
 */
export function isAuthorisedCron(authorizationHeader: string | null | undefined, secret: string | undefined): boolean {
  const s = secret?.trim();
  if (!s || !authorizationHeader) return false;
  const expected = Buffer.from(`Bearer ${s}`);
  const given = Buffer.from(authorizationHeader.trim());
  return expected.length === given.length && timingSafeEqual(expected, given);
}
