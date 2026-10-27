# Mobile CCTV Solutions — Website Rebuild

Next.js (App Router) + TypeScript + Tailwind CSS rebuild of
mobilecctvsolutions.com.au, replacing the previous WordPress site.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form setup (required before launch)

The enquiry/quote form (`src/components/contact/ContactForm.tsx`, submitting
to `src/app/api/contact/route.ts`) only tells a visitor their enquiry was
sent when Resend has actually accepted the email (a 2xx response with an
email id). If the key is missing, Resend rejects the email (invalid key,
unverified domain, rate limit, daily/monthly quota, API error) or the
request fails or times out, the visitor sees *"Sorry, we couldn't send your
enquiry right now. Please try again later or contact Mobile CCTV Solutions
directly on 1300 99 69 10 or sales@mobilecctvsolutions.com.au."*, keeps everything they typed, and can press Send again. Failures
are logged on the server (reason, HTTP status and Resend's error text, with
keys and email addresses scrubbed) — never the visitor's details.

Run `npm run test:contact` to check these safeguards.

### Brevo CRM (optional, off by default)

When `CONTACT_EMAIL_PROVIDER=brevo` and `BREVO_API_KEY` are set, each enquiry
is also recorded in Brevo: the contact is created/updated (name, email, phone,
source and date), a deal "Website Enquiry – [Name]" is created in the
pipeline's starting stage with the enquiry as a note, the team gets the
notification email and the customer gets an acknowledgement email — all from
`BREVO_SENDER_EMAIL`. CRM problems never stop an enquiry reaching the team;
if Brevo cannot send the team email, Resend is used as a fallback while it is
still configured. Nobody is added to any marketing list.

Important: Brevo accepts a send from an unauthenticated sender and then rejects
it a moment later, which cannot be detected afterwards. So before each send the
site checks that the sender's domain is authenticated in Brevo (the DKIM
records). If it is not, the team email goes through the Resend fallback instead
and no Brevo email is attempted — so authenticate the domain before relying on
Brevo emails, and keep Resend configured until you have.

Code: `src/lib/brevo.ts`, `src/lib/processEnquiry.ts`, `src/lib/enquiryEmails.ts`,
wired in `src/app/api/contact/route.ts`. Tests: `npm run test:contact`.
Account check (read-only): `BREVO_API_KEY=… npm run brevo:check`.

Key keep-alive: Brevo expires an API key after 90 days without use, so
`vercel.json` schedules a weekly call to `/api/brevo-keepalive` (one read-only
Brevo request). It needs a `CRON_SECRET` environment variable in Vercel (any
long random string, e.g. from `openssl rand -hex 24`); without it the endpoint
refuses every request.


Sending is done via [Resend](https://resend.com).

To connect it:

1. Create a Resend account and generate an API key from the
   [API Keys](https://resend.com/api-keys) page.
2. (Optional) Verify a sending domain under
   [Domains](https://resend.com/domains) so emails come from your own
   address (e.g. `no-reply@mobilecctvsolutions.com.au`) instead of Resend's
   shared sandbox address. Skipping this is fine to start — Resend's
   `onboarding@resend.dev` sandbox sender works immediately, with some
   sending limits.
3. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY` — from step 1.
   - `RESEND_FROM_EMAIL` — leave blank to use the sandbox sender, or set to
     a verified address from step 2.
   - `CONTACT_TO_EMAIL` — the inbox that should receive enquiries.
4. Restart the dev server / redeploy. No code changes needed.

Once those variables are set in production (Vercel → Project Settings →
Environment Variables, or your host's equivalent), real enquiries will be
emailed through immediately.

### Anti-spam approach

Two lightweight, no-dependency techniques, both handled server-side in
`src/app/api/contact/route.ts`:

- **Honeypot field** — a hidden `website` input real visitors never see or
  fill in. If it arrives non-empty, the submission is silently accepted
  (200 response) but never sent — this avoids tipping off bots that they
  were caught, which is standard honeypot practice, and is not the "fake
  success" the brief warns against since no genuine visitor is affected.
- **Time trap** — the form records when it mounted; submissions completed
  in under 1.5 seconds are treated as bot activity (no human fills out this
  many fields that fast) and handled the same way as the honeypot case.

If spam becomes a real problem after launch, the next step up would be
adding Cloudflare Turnstile or hCaptcha — deliberately not added now since
neither was needed to ship a working form.

## Redirects

All legacy URL redirects (renamed pages, dropped duplicate blog post, the
untitled post, `/login/` removal) live in `next.config.ts` under
`redirects()`. See Stage 5 notes for the full old-URL → new-URL map.

## Blog content

Posts are Markdown files in `content/blog/*.md`, loaded by `src/lib/blog.ts`
(via `gray-matter` + `marked`). No CMS — add a new post by adding a new
`.md` file with the same frontmatter shape as the existing ones.
