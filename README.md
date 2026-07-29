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
**but no email provider is connected yet.** Until you set the two environment
variables below, every valid submission gets a clear error message back
("the enquiry form isn't fully set up yet, please call/email us directly")
instead of a fake success. This is intentional: we do not want visitors to
think their enquiry was received when nobody actually gets it.

To connect it:

1. Create a free account at [resend.com](https://resend.com) (or swap the
   fetch call in `src/app/api/contact/route.ts` for whichever email
   provider/CRM you'd rather use — Postmark, SendGrid, a Zapier webhook,
   your CRM's inbound API, etc. The route is a single, small function, not
   tied to Resend specifically).
2. Verify a sending domain in Resend (or use their `onboarding@resend.dev`
   test address for a quick check).
3. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY` — from your Resend dashboard.
   - `CONTACT_TO_EMAIL` — the inbox that should receive enquiries (defaults
     to `sales@mobilecctvsolutions.com.au` if left blank).
4. Restart the dev server / redeploy. No code changes needed.

Once those two variables are set in production (Vercel → Project Settings →
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
