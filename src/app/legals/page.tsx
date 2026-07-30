import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { buildMetadata } from "@/lib/metadata";
import { business } from "@/lib/business";

export const metadata: Metadata = buildMetadata({
  title: "Legals",
  description: "Legal information, licence details and terms for Mobile CCTV Solutions.",
  path: "/legals",
});

export default function LegalsPage() {
  return (
    <>
      <PageHero title="Legals" crumbs={[{ label: "Legals" }]} />
      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <ReviewFlag note="This page did not exist on the old site (the footer link was dead). Drafted below for sign-off — please confirm licence terms, hire terms and website terms of use are accurate before this goes live." />
          </div>
          <h2 className="text-h2">Business Details</h2>
          <p className="mt-3 text-steel-600">
            {business.legalName}
            <br />
            {business.licence}
            <br />
            ABN {business.abn}
          </p>
          <h2 className="text-h2 mt-8">Website Terms Of Use</h2>
          <p className="mt-3 text-steel-600">
            The content on this website is provided for general information
            purposes only. While we make every effort to keep information
            up to date, we make no warranties about the completeness,
            reliability or accuracy of this information.
          </p>
          <h2 className="text-h2 mt-8">Hire &amp; Sale Terms</h2>
          <p className="mt-3 text-steel-600">
            Specific terms and conditions apply to the sale and hire of
            Mobile CCTV Solutions equipment. Please contact us for a copy
            of our current hire agreement or sale terms.
          </p>
          <h2 className="text-h2 mt-8">Contact Us</h2>
          <p className="mt-3 text-steel-600">
            For questions regarding these legal terms, please contact us at{" "}
            <a href={`mailto:${business.email}`} className="text-brand hover:text-brand-dark">
              {business.email}
            </a>{" "}
            or call{" "}
            <a href={business.phone.href} className="text-brand hover:text-brand-dark">
              {business.phone.display}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
