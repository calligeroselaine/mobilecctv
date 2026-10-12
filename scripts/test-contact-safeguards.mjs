// Run with:  npm run test:contact
// Checks that the enquiry email helper only reports success when Resend
// really accepted the email, and never leaks keys or customer details into
// the failure details that get logged.
import test from "node:test";
import assert from "node:assert/strict";
import { sendEnquiryEmail, scrubForLog } from "../src/lib/sendEnquiryEmail.ts";
import { CONTACT_SEND_FAILURE_MESSAGE } from "../src/lib/contactMessages.ts";

const input = {
  apiKey: "re_TESTKEY1234567890abcdef",
  from: "Mobile CCTV Solutions Website <enquiries@example.com>",
  to: "sales@example.com",
  replyTo: "customer@example.org",
  subject: "New enquiry",
  text: "Hello",
};

const reply = (status, body) => async () =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), { status });

test("success only when Resend returns 2xx AND an email id", async () => {
  const r = await sendEnquiryEmail(input, { fetchImpl: reply(200, { id: "abc-123" }) });
  assert.deepEqual(r, { ok: true });
});

test("2xx without an email id is NOT treated as sent", async () => {
  const r = await sendEnquiryEmail(input, { fetchImpl: reply(200, {}) });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "bad_response");
});

test("2xx with an unreadable body is NOT treated as sent", async () => {
  const r = await sendEnquiryEmail(input, { fetchImpl: reply(200, "not json") });
  assert.equal(r.ok, false);
});

test("rate limit (429) is a failure", async () => {
  const r = await sendEnquiryEmail(input, {
    fetchImpl: reply(429, { name: "rate_limit_exceeded", message: "Too many requests" }),
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "rate_limited");
});

test("daily quota reached is a failure", async () => {
  const r = await sendEnquiryEmail(input, {
    fetchImpl: reply(429, { name: "daily_quota_exceeded", message: "You have reached your daily email sending quota." }),
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "quota_exceeded");
});

test("monthly quota reached is a failure", async () => {
  const r = await sendEnquiryEmail(input, {
    fetchImpl: reply(429, { name: "monthly_quota_exceeded", message: "monthly limit" }),
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "quota_exceeded");
});

test("domain not verified / API validation errors are failures", async () => {
  const r = await sendEnquiryEmail(input, {
    fetchImpl: reply(403, { name: "validation_error", message: "The example.com domain is not verified." }),
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "rejected");
  assert.equal(r.status, 403);
});

test("invalid API key (401) and server errors (500) are failures", async () => {
  for (const status of [401, 500, 503]) {
    const r = await sendEnquiryEmail(input, { fetchImpl: reply(status, { name: "x", message: "y" }) });
    assert.equal(r.ok, false, `status ${status}`);
  }
});

test("network failure is a failure", async () => {
  const r = await sendEnquiryEmail(input, {
    fetchImpl: async () => {
      throw new TypeError("fetch failed");
    },
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "network");
});

test("a hung request times out and is a failure", async () => {
  const r = await sendEnquiryEmail(input, {
    timeoutMs: 50,
    fetchImpl: (_url, init) =>
      new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          const e = new Error("aborted");
          e.name = "AbortError";
          reject(e);
        });
      }),
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "timeout");
});

test("logged details never contain the API key or a customer's email address", async () => {
  const r = await sendEnquiryEmail(input, {
    fetchImpl: reply(422, {
      name: "validation_error",
      message: `Invalid reply_to customer@example.org with key ${input.apiKey}`,
    }),
  });
  assert.equal(r.ok, false);
  assert.ok(!r.detail.includes(input.apiKey));
  assert.ok(!r.detail.includes("customer@example.org"));
  assert.ok(r.detail.includes("[api-key]") && r.detail.includes("[email]"));
  assert.ok(!JSON.stringify(r).includes("Hello"));
});

test("scrubForLog caps length", () => {
  assert.equal(scrubForLog("x".repeat(1000)).length, 200);
});

test("the failure message is the agreed wording", () => {
  assert.equal(
    CONTACT_SEND_FAILURE_MESSAGE,
    "Sorry, we couldn't send your enquiry right now. Please try again later or contact Mobile CCTV Solutions directly."
  );
});
