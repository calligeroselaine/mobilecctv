// Run with:  npm run test:contact
// Tests the Brevo enquiry flow against a fake in-memory Brevo (no network,
// no real account). Covers contacts, deals/notes, duplicates, failures,
// fallbacks, emails and what gets logged.
import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeAuPhone,
  splitName,
  enquiryRef,
  resolvePipelineTarget,
  _resetPipelineCache,
} from "../src/lib/brevo.ts";
import { processEnquiry, _resetRecentRefs } from "../src/lib/processEnquiry.ts";
import { buildAcknowledgementEmail, buildNotificationEmail, ACK_SUBJECT } from "../src/lib/enquiryEmails.ts";

const SITE = {
  siteUrl: "https://www.mobilecctvsolutions.com.au",
  businessName: "Mobile CCTV Solutions",
  phoneDisplay: "1300 99 69 10",
  phoneHref: "tel:1300996910",
};
const KEY = "xkeysib-SECRET-TEST-KEY-123";

// Brevo's free-plan default pipeline.
const DEFAULT_PIPELINE = [
  {
    pipeline: "pipe1",
    pipeline_name: "Sales pipeline",
    stages: ["New", "In progress", "Demo scheduled", "Proposal sent", "Negotiation", "Won", "Lost"].map((n, i) => ({ id: `s${i}`, name: n })),
  },
];

/** A tiny fake of the Brevo endpoints the site uses. */
function fakeBrevo(opts = {}) {
  const s = {
    contacts: new Map(),
    nextContact: 100,
    deals: [],
    notes: [],
    emails: [],
    calls: [],
    pipelines: opts.pipelines ?? DEFAULT_PIPELINE,
  };
  const json = (status, body) =>
    new Response(body === null ? null : JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  const impl = async (url, init = {}) => {
    const u = new URL(url);
    const path = u.pathname.replace("/v3", "");
    const method = init.method ?? "GET";
    const body = init.body ? JSON.parse(init.body) : null;
    s.calls.push(`${method} ${path}`);
    assert.equal(init.headers["api-key"], KEY);
    if (opts.allDown) return json(500, { code: "internal_error", message: "boom customer@example.org" });

    if (method === "POST" && path === "/contacts") {
      assert.ok(!("listIds" in body), "must never add a contact to a marketing list");
      if (opts.rejectCustomAttrs && ("ENQUIRY_SOURCE" in body.attributes || "LAST_ENQUIRY_DATE" in body.attributes))
        return json(400, { code: "invalid_parameter", message: "attribute does not exist for customer@example.org" });
      if (opts.rejectSms && "SMS" in body.attributes) return json(400, { code: "invalid_parameter", message: "bad sms" });
      const existing = s.contacts.get(body.email.toLowerCase());
      if (existing) {
        Object.assign(existing.attributes, body.attributes);
        return new Response(null, { status: 204 });
      }
      const id = s.nextContact++;
      s.contacts.set(body.email.toLowerCase(), { id, attributes: { ...body.attributes } });
      return json(201, { id });
    }
    if (method === "GET" && path.startsWith("/contacts/")) {
      const c = s.contacts.get(decodeURIComponent(path.slice("/contacts/".length)).toLowerCase());
      return c ? json(200, { id: c.id }) : json(404, { code: "document_not_found" });
    }
    if (method === "GET" && path === "/crm/pipeline/details/all") return json(200, s.pipelines);
    if (method === "GET" && path === "/crm/deals") {
      const cid = Number(u.searchParams.get("filters[linkedContactsIds]"));
      const since = new Date(u.searchParams.get("createdSince")).getTime();
      return json(200, {
        items: s.deals.filter((d) => d.contactId === cid && d.createdAt >= since).map((d) => ({ id: d.id, attributes: { deal_name: d.name } })),
      });
    }
    if (method === "POST" && path === "/crm/deals") {
      if (opts.dealFails) return json(400, { code: "deal_limit", message: "limit for x@y.z" });
      const id = `deal${s.deals.length + 1}`;
      s.deals.push({
        id,
        name: body.name,
        contactId: body.linkedContactsIds[0],
        stage: body.attributes.deal_stage,
        pipeline: body.attributes.pipeline,
        createdAt: Date.now(),
      });
      return json(200, { id });
    }
    if (method === "POST" && path === "/crm/notes") {
      s.notes.push({ dealId: body.dealIds[0], text: body.text });
      return json(200, { id: `n${s.notes.length}` });
    }
    if (method === "GET" && path === "/crm/notes") {
      const id = u.searchParams.get("entityIds");
      if (opts.notesUnreadable) return json(500, { code: "internal_error" });
      return json(200, { items: s.notes.filter((n) => n.dealId === id).map((n) => ({ text: n.text })) });
    }
    if (method === "POST" && path === "/smtp/email") {
      const to = body.to[0].email;
      const isAck = body.tags.includes("customer-acknowledgement");
      if (opts.failTeamEmail && !isAck) return json(500, { code: "internal_error" });
      if (opts.failAck && isAck) return json(500, { code: "internal_error" });
      s.emails.push({ to, isAck, body });
      return json(201, { messageId: `<m${s.emails.length}@brevo>` });
    }
    return json(404, { code: "not_found" });
  };
  return { s, impl };
}

function run(input, { fake, fallback, cfg = {} } = {}) {
  const logs = [];
  const f = fake ?? fakeBrevo();
  const promise = processEnquiry(
    {
      name: "Jane Citizen",
      email: "jane@example.org",
      phone: "0400 000 000",
      company: "Citizen Co",
      message: "Please quote for two trailers.",
      fields: [
        ["Name", "Jane Citizen"],
        ["Email", "jane@example.org"],
        ["Phone", "0400 000 000"],
        ["Message", "Please quote for two trailers."],
      ],
      ...input,
    },
    {
      apiKey: KEY,
      sender: { email: "enquiries@mobilecctvsolutions.com.au", name: "Mobile CCTV Solutions" },
      notifyTo: "sales@mobilecctvsolutions.com.au",
      site: SITE,
      stageNames: ["New Enquiry", "New"],
      sourceLabel: "Website enquiry - www.mobilecctvsolutions.com.au",
      log: (m) => logs.push(m),
      brevo: { fetchImpl: f.impl, timeoutMs: 500 },
      ...cfg,
    },
    fallback
  );
  return promise.then((result) => ({ result, logs, ...f }));
}

test.beforeEach(() => {
  _resetPipelineCache();
  _resetRecentRefs();
});

// ----------------------------------------------------------------- helpers --

test("Australian phone numbers are converted to +61 format; anything unsure returns null", () => {
  assert.equal(normalizeAuPhone("0400 000 000"), "+61400000000");
  assert.equal(normalizeAuPhone("(02) 9999 9999"), "+61299999999");
  assert.equal(normalizeAuPhone("+61 400 000 000"), "+61400000000");
  assert.equal(normalizeAuPhone("61400000000"), "+61400000000");
  assert.equal(normalizeAuPhone("0061 400 000 000"), "+61400000000");
  assert.equal(normalizeAuPhone("1300 99 69 10"), null);
  assert.equal(normalizeAuPhone("1800 123 456"), null);
  assert.equal(normalizeAuPhone("+1 415 555 0100"), null);
  assert.equal(normalizeAuPhone("12345"), null);
  assert.equal(normalizeAuPhone(""), null);
  assert.equal(normalizeAuPhone(undefined), null);
});

test("names split into first and last", () => {
  assert.deepEqual(splitName("Jane Citizen"), { first: "Jane", last: "Citizen" });
  assert.deepEqual(splitName("  Mary  Jane  Watson "), { first: "Mary", last: "Jane Watson" });
  assert.deepEqual(splitName("Cher"), { first: "Cher", last: "" });
});

test("the retry reference ignores case and spacing but not different messages", () => {
  assert.equal(enquiryRef("A@x.com", "Hello   there"), enquiryRef("a@x.com ", "hello there"));
  assert.notEqual(enquiryRef("a@x.com", "Hello"), enquiryRef("a@x.com", "Different"));
});

// --------------------------------------------------------------- happy path --

test("a normal enquiry creates the contact, a linked deal in New, a note, and sends both emails", async () => {
  const { result, s, logs } = await run();
  assert.deepEqual(result, { ok: true, notifiedVia: "brevo", crm: "created", acknowledged: true });

  const contact = s.contacts.get("jane@example.org");
  assert.equal(contact.attributes.FIRSTNAME, "Jane");
  assert.equal(contact.attributes.LASTNAME, "Citizen");
  assert.equal(contact.attributes.SMS, "+61400000000");
  assert.equal(contact.attributes.ENQUIRY_SOURCE, "Website enquiry - www.mobilecctvsolutions.com.au");
  assert.match(contact.attributes.LAST_ENQUIRY_DATE, /^\d{4}-\d{2}-\d{2}$/);

  assert.equal(s.deals.length, 1);
  assert.equal(s.deals[0].name, "Website Enquiry – Jane Citizen"); // en dash
  assert.equal(s.deals[0].contactId, contact.id);
  assert.equal(s.deals[0].stage, "s0"); // the "New" stage
  assert.equal(s.deals[0].pipeline, "pipe1");
  assert.equal(s.notes.length, 1);
  assert.match(s.notes[0].text, /Please quote for two trailers\./);
  assert.match(s.notes[0].text, /Received:/);

  const team = s.emails.find((e) => !e.isAck);
  assert.equal(team.to, "sales@mobilecctvsolutions.com.au");
  assert.equal(team.body.replyTo.email, "jane@example.org");
  assert.equal(team.body.sender.email, "enquiries@mobilecctvsolutions.com.au");
  const ack = s.emails.find((e) => e.isAck);
  assert.equal(ack.to, "jane@example.org");
  assert.equal(ack.body.sender.email, "enquiries@mobilecctvsolutions.com.au"); // same address as the notifications
  assert.equal(ack.body.subject, "Thank you for contacting Mobile CCTV Solutions");
  assert.deepEqual(logs, []);
});

// ----------------------------------------------------------- deals / dupes --

test("an existing contact submitting a different enquiry gets a separate deal", async () => {
  const fake = fakeBrevo();
  await run({ message: "First enquiry", fields: [["Message", "First enquiry"]] }, { fake });
  const second = await run({ message: "Something else entirely", fields: [["Message", "Something else entirely"]] }, { fake });
  assert.equal(second.result.crm, "created");
  assert.equal(fake.s.deals.length, 2);
  assert.equal(fake.s.contacts.size, 1); // same contact, updated not duplicated
  assert.equal(fake.s.deals[0].contactId, fake.s.deals[1].contactId);
});

test("an instant double-submit or retry of the same enquiry makes only one deal (in-memory guard)", async () => {
  const fake = fakeBrevo();
  const [a, b] = await Promise.all([run({}, { fake }), run({}, { fake })]);
  assert.equal(fake.s.deals.length, 1);
  assert.deepEqual([a.result.crm, b.result.crm].sort(), ["created", "duplicate"]);
});

test("a retry that reaches a different server instance is still caught by checking Brevo", async () => {
  const fake = fakeBrevo();
  await run({}, { fake });
  _resetRecentRefs(); // simulate a cold / different instance with no memory
  const again = await run({}, { fake });
  assert.equal(again.result.crm, "duplicate");
  assert.equal(fake.s.deals.length, 1);
});

test("if notes can't be read, a same-name deal from the last 2 minutes still counts as a duplicate", async () => {
  const fake = fakeBrevo({ notesUnreadable: true });
  await run({}, { fake });
  _resetRecentRefs();
  const again = await run({}, { fake });
  assert.equal(again.result.crm, "duplicate");
  assert.equal(fake.s.deals.length, 1);
});

// ------------------------------------------------------------ degraded saves --

test("if Brevo rejects the custom attributes the contact is still saved (and the deal made)", async () => {
  const { result, s, logs } = await run({}, { fake: fakeBrevo({ rejectCustomAttrs: true }) });
  assert.equal(result.crm, "created");
  assert.ok(s.contacts.get("jane@example.org"));
  assert.ok(!("ENQUIRY_SOURCE" in s.contacts.get("jane@example.org").attributes));
  assert.ok(logs.some((l) => /without some attributes/.test(l)));
});

test("if the phone is rejected or not mobile-formatted, the contact is saved without it and the phone stays in the note", async () => {
  const a = await run({ phone: "1300 99 69 10", fields: [["Phone", "1300 99 69 10"], ["Message", "x"]] });
  assert.ok(!("SMS" in a.s.contacts.get("jane@example.org").attributes));
  assert.match(a.s.notes[0].text, /1300 99 69 10/);
  _resetPipelineCache();
  _resetRecentRefs();
  const b = await run({}, { fake: fakeBrevo({ rejectSms: true }) });
  assert.equal(b.result.crm, "created");
  assert.ok(!("SMS" in b.s.contacts.get("jane@example.org").attributes));
});

// ---------------------------------------------------------------- failures --

test("if the whole CRM is down the enquiry is still emailed to the team, with an 'add it by hand' warning", async () => {
  const fake = fakeBrevo();
  const impl = fake.impl;
  const patched = async (url, init) =>
    /\/smtp\/email/.test(url) ? impl(url, init) : new Response(JSON.stringify({ code: "internal_error" }), { status: 500 });
  const { result, s } = await run({}, { fake: { s: fake.s, impl: patched } });
  assert.equal(result.ok, true);
  assert.equal(result.crm, "skipped-failed");
  const team = s.emails.find((e) => !e.isAck);
  assert.match(team.body.htmlContent, /could not be added to the CRM/);
  assert.match(team.body.textContent, /could not be added to the CRM/);
});

test("deal creation failing (e.g. the free plan's open-deal limit) does not lose the enquiry", async () => {
  const { result, s } = await run({}, { fake: fakeBrevo({ dealFails: true }) });
  assert.equal(result.ok, true);
  assert.equal(result.crm, "skipped-failed");
  assert.ok(s.emails.some((e) => !e.isAck));
});

test("a missing starting stage or unclear pipeline is a CRM failure, not a lost enquiry", async () => {
  const noStage = fakeBrevo({ pipelines: [{ pipeline: "p", pipeline_name: "X", stages: [{ id: "1", name: "Other" }] }] });
  const a = await run({}, { fake: noStage });
  assert.equal(a.result.ok, true);
  assert.equal(a.result.crm, "skipped-failed");
  _resetPipelineCache();
  _resetRecentRefs();
  const two = fakeBrevo({
    pipelines: [
      { pipeline: "a", pipeline_name: "A", stages: [{ id: "1", name: "New" }] },
      { pipeline: "b", pipeline_name: "B", stages: [{ id: "2", name: "New" }] },
    ],
  });
  const b = await run({}, { fake: two });
  assert.equal(b.result.crm, "skipped-failed"); // two candidates: refuses to guess
});

test("if Brevo can't send the team email but the Resend fallback can, the enquiry is delivered", async () => {
  let fallbackCalled = null;
  const { result } = await run(
    {},
    {
      fake: fakeBrevo({ failTeamEmail: true }),
      fallback: async (e) => {
        fallbackCalled = e;
        return true;
      },
    }
  );
  assert.equal(result.ok, true);
  assert.equal(result.notifiedVia, "fallback");
  assert.equal(fallbackCalled.replyTo, "jane@example.org");
  assert.match(fallbackCalled.subject, /New enquiry from Jane Citizen/);
});

test("if neither Brevo nor the fallback can deliver the team email, the enquiry is reported as NOT sent", async () => {
  const none = await run({}, { fake: fakeBrevo({ failTeamEmail: true }) });
  assert.deepEqual(none.result, { ok: false });
  _resetRecentRefs();
  const bad = await run({}, { fake: fakeBrevo({ failTeamEmail: true }), fallback: async () => false });
  assert.deepEqual(bad.result, { ok: false });
  _resetRecentRefs();
  const threw = await run(
    {},
    {
      fake: fakeBrevo({ failTeamEmail: true }),
      fallback: async () => {
        throw new Error("x");
      },
    }
  );
  assert.deepEqual(threw.result, { ok: false });
});

test("a failing acknowledgement email never fails the enquiry", async () => {
  const { result, s } = await run({}, { fake: fakeBrevo({ failAck: true }) });
  assert.equal(result.ok, true);
  assert.equal(result.acknowledged, false);
  assert.ok(s.emails.some((e) => !e.isAck));
});

test("a hung Brevo request times out instead of hanging the form", async () => {
  const hang = (_url, init) =>
    new Promise((_res, rej) => init.signal.addEventListener("abort", () => rej(Object.assign(new Error("a"), { name: "AbortError" }))));
  const r = await processEnquiry(
    { name: "Jane Citizen", email: "jane@example.org", message: "m", fields: [["Message", "m"]] },
    {
      apiKey: KEY,
      sender: { email: "e@x.com", name: "N" },
      notifyTo: "t@x.com",
      site: SITE,
      stageNames: ["New"],
      sourceLabel: "s",
      log: () => {},
      brevo: { fetchImpl: hang, timeoutMs: 40 },
    },
    async () => true
  );
  assert.equal(r.ok, true); // delivered through the fallback
  assert.equal(r.notifiedVia, "fallback");
});

// ------------------------------------------------------------------ privacy --

test("logs never contain the API key or any customer detail", async () => {
  const all = [];
  for (const o of [{ allDown: true }, { dealFails: true }, { failTeamEmail: true }, { failAck: true }, { rejectCustomAttrs: true }]) {
    _resetPipelineCache();
    _resetRecentRefs();
    const { logs } = await run({}, { fake: fakeBrevo(o), fallback: async () => true });
    all.push(...logs);
  }
  const blob = all.join("\n");
  assert.ok(blob.length > 0, "something should have been logged");
  for (const secret of [KEY, "jane@example.org", "Jane", "Citizen", "0400", "two trailers", "customer@example.org"]) {
    assert.ok(!blob.includes(secret), `log leaked: ${secret}`);
  }
});

// ---------------------------------------------------------------- pipelines --

test("pipeline choice: custom 'New Enquiry' is preferred over 'New'; a named pipeline wins when several exist", async () => {
  const custom = fakeBrevo({
    pipelines: [{ pipeline: "p", pipeline_name: "Sales", stages: [{ id: "a", name: "New" }, { id: "b", name: "New Enquiry" }] }],
  });
  let r = await resolvePipelineTarget(KEY, ["New Enquiry", "New"], undefined, { fetchImpl: custom.impl });
  assert.deepEqual(r, { ok: true, target: { pipelineId: "p", stageId: "b" } });

  _resetPipelineCache();
  const two = fakeBrevo({
    pipelines: [
      { pipeline: "a", pipeline_name: "Alpha", stages: [{ id: "1", name: "New" }] },
      { pipeline: "b", pipeline_name: "Mobile CCTV", stages: [{ id: "2", name: "New" }] },
    ],
  });
  r = await resolvePipelineTarget(KEY, ["New"], "Mobile CCTV", { fetchImpl: two.impl });
  assert.deepEqual(r, { ok: true, target: { pipelineId: "b", stageId: "2" } });
});

// ------------------------------------------------------------------- emails --

test("the acknowledgement email has the agreed subject and wording, uses the first name, and the site's branding", () => {
  const e = buildAcknowledgementEmail({ firstName: "Jane", site: SITE });
  assert.equal(ACK_SUBJECT, "Thank you for contacting Mobile CCTV Solutions");
  assert.equal(e.subject, ACK_SUBJECT);
  for (const part of ["Hi Jane,", "Thank you for your enquiry.", "a member of our team will be in touch shortly.", "Kind regards,", "Mobile CCTV Solutions"]) {
    assert.ok(e.text.includes(part), `text missing: ${part}`);
  }
  assert.match(e.html, /Hi Jane,/);
  assert.match(e.html, /images\/logo\.png/);
  assert.match(e.html, /#4588c6/);
  assert.equal(buildAcknowledgementEmail({ firstName: "", site: SITE }).text.startsWith("Hi,"), true);
});

test("visitor text is HTML-escaped in both emails", () => {
  const evil = `<script>alert(1)</script> & "quotes"`;
  const n = buildNotificationEmail({ fields: [["Message", evil]], name: evil });
  assert.ok(!n.html.includes("<script>"));
  assert.ok(n.html.includes("&lt;script&gt;"));
  const a = buildAcknowledgementEmail({ firstName: evil, site: SITE });
  assert.ok(!a.html.includes("<script>"));
});
