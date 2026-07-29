import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mobile CCTV Solutions. Call 1300 99 69 10 or send us an enquiry for trailer camera and pole cam sales or hire.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Mobile CCTV Solutions" crumbs={[{ label: "Contact" }]} />

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="text-h2">Enquire Today</h2>
            <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-ink">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-ink">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-semibold text-ink">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-sm font-semibold text-ink">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="message" className="text-sm font-semibold text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="rounded-md border border-steel-200 px-3 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:col-span-2 sm:w-fit"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-h3">{business.name}</h2>
            <dl className="mt-4 space-y-4 text-steel-600">
              <div>
                <dt className="text-sm font-semibold text-ink">Phone</dt>
                <dd>
                  <a href={business.phone.href} className="hover:text-brand">
                    {business.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-ink">Email</dt>
                <dd>
                  <a href={`mailto:${business.email}`} className="hover:text-brand">
                    {business.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-ink">Address</dt>
                <dd>
                  {business.address.line1}
                  <br />
                  {business.address.suburb} {business.address.state}{" "}
                  {business.address.postcode}
                </dd>
              </div>
              {business.additionalLocations.map((loc) => (
                <div key={loc}>
                  <dt className="text-sm font-semibold text-ink">Also</dt>
                  <dd>{loc}</dd>
                </div>
              ))}
              <div>
                <dt className="text-sm font-semibold text-ink">Licence</dt>
                <dd>
                  {business.licence}
                  <br />
                  ABN {business.abn}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
