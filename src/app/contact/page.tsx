import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { business } from "@/lib/business";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Get A Quote",
  description:
    "Request a quote or deployment for a mobile CCTV trailer or pole camera. Call 1300 99 69 10 or send an enquiry — Australia-wide, sale or hire.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Mobile CCTV Solutions" crumbs={[{ label: "Contact" }]} />

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="text-h2">Enquire Today</h2>
            <div className="mt-6">
              <ContactForm variant="full" />
            </div>
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
