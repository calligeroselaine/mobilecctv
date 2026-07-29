import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * Quote-request form UI. Submission wiring (API route or form service) is a
 * later integration stage — this section builds the accessible markup only.
 */
export function QuoteRequest() {
  return (
    <Section id="get-a-quote" tone="alt">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Get A Quote Today"
          align="center"
        />
        <p className="mt-3 text-steel-600">
          Tell us about your site and we&rsquo;ll recommend the right
          solution — trailer, pole camera, or a mix of both.
        </p>
      </div>

      <form className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quote-name" className="text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            required
            className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="quote-email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            required
            className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="quote-phone" className="text-sm font-semibold text-ink">
            Phone
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="quote-site" className="text-sm font-semibold text-ink">
            Site Type
          </label>
          <input
            id="quote-site"
            name="siteType"
            type="text"
            placeholder="e.g. construction site, event, council"
            className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="quote-message" className="text-sm font-semibold text-ink">
            Message
          </label>
          <textarea
            id="quote-message"
            name="message"
            rows={4}
            required
            className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:col-span-2 sm:w-fit"
        >
          Request A Quote
        </button>
      </form>
    </Section>
  );
}
