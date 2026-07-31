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
to `src/app/api/contact/route.ts`) is fully built and functional — validation,
accessibility, spam prevention and loading/error/success states all work —
**but no email provider is connected yet.** Until you set the environment
variables below, every valid submission gets a clear error message back
("the enquiry form isn't fully set up yet, please call/email us directly")
instead of a fake success. This is intentional: we do not want visitors to
think their enquiry was received when nobody actually gets it.

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
