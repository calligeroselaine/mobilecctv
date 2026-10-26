// Read-only check of a Brevo account before switching the website over.
//   BREVO_API_KEY=xkeysib-... node scripts/brevo-check.mjs
// It only READS (plan, pipeline + stages, contact attributes, senders and
// sender-domain authentication). It changes nothing and prints no key and no
// customer data. Run it on your own computer; never paste the key into chat.

const key = process.env.BREVO_API_KEY;
if (!key) {
  console.error("Set BREVO_API_KEY first (it is only read from the environment).");
  process.exit(1);
}

async function get(path) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, { headers: { "api-key": key, accept: "application/json" } });
  let body = null;
  try {
    body = await res.json();
  } catch {}
  return { status: res.status, body };
}

const line = (ok, text) => console.log(`${ok ? "OK  " : "FIX "} ${text}`);

const account = await get("/account");
if (account.status !== 200) {
  console.log(`Could not read the account (HTTP ${account.status}). Check the API key.`);
  process.exit(1);
}
const plans = (account.body.plan ?? []).map((p) => `${p.type}${p.credits != null ? ` (${p.credits} ${p.creditsType ?? "credits"})` : ""}`);
console.log(`Account plan: ${plans.join(", ") || "unknown"}`);

const pipes = await get("/crm/pipeline/details/all");
if (pipes.status === 200 && Array.isArray(pipes.body) && pipes.body.length) {
  for (const p of pipes.body) {
    const names = (p.stages ?? []).map((s) => s.name);
    const hasStart = names.some((n) => ["new enquiry", "new"].includes(n.trim().toLowerCase()));
    line(hasStart, `Pipeline "${p.pipeline_name}": stages = ${names.join(" > ")}${hasStart ? "" : '  (needs a "New Enquiry" or "New" stage)'}`);
  }
  if (pipes.body.length > 1) console.log('NOTE more than one pipeline: set BREVO_DEAL_PIPELINE to the one to use.');
} else {
  line(false, `No pipeline found (HTTP ${pipes.status}). Open Deals in Brevo once so the default pipeline is created.`);
}

const attrs = await get("/contacts/attributes");
const names = new Set((attrs.body?.attributes ?? []).map((a) => a.name));
for (const wanted of ["FIRSTNAME", "LASTNAME", "SMS", "ENQUIRY_SOURCE", "LAST_ENQUIRY_DATE"]) {
  line(names.has(wanted), `Contact attribute ${wanted}${names.has(wanted) ? "" : "  (create it in Contacts > Settings > Contact attributes; the site still works without the last two)"}`);
}

const senders = await get("/senders");
const list = senders.body?.senders ?? [];
console.log(`Senders: ${list.map((s) => `${s.email} [${s.active ? "active" : "inactive"}]`).join(", ") || "none"}`);

const domains = await get("/senders/domains");
const doms = domains.body?.domains ?? [];
if (doms.length === 0) line(false, "No sender domain added yet (Senders, Domains & Dedicated IPs > Domains).");
for (const d of doms) line(d.authenticated === true, `Domain ${d.domain_name}: ${d.authenticated ? "authenticated" : "NOT authenticated yet (DNS records still to be added/verified)"}`);
