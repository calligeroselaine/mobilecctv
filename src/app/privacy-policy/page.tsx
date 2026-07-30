import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { buildMetadata } from "@/lib/metadata";
import { business } from "@/lib/business";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Mobile CCTV Solutions.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <ReviewFlag note="This page did not exist on the old site (the footer link was dead). Drafted below for sign-off — please confirm the data-handling practices described match how Mobile CCTV Solutions actually operates before this goes live." />
          </div>
          <h2 className="text-h2">Overview</h2>
          <p className="mt-3 text-steel-600">
            Mobile CCTV Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) respects your privacy and is committed to
            protecting the personal information you share with us through
            this website, our enquiry forms, and our services.
          </p>
          <h2 className="text-h2 mt-8">Information We Collect</h2>
          <p className="mt-3 text-steel-600">
            When you submit an enquiry, request a quote, or contact us, we
            may collect your name, email address, phone number, company
            name, project location, and any message details you provide.
          </p>
          <h2 className="text-h2 mt-8">How We Use Your Information</h2>
          <p className="mt-3 text-steel-600">
            We use the information you provide to respond to enquiries,
            provide quotes, arrange demonstrations, and deliver our trailer
            camera and pole cam sale/hire services. We do not sell your
            personal information to third parties.
          </p>
          <h2 className="text-h2 mt-8">Data Storage &amp; Security</h2>
          <p className="mt-3 text-steel-600">
            We take reasonable steps to protect the personal information we
            hold from misuse, loss, and unauthorised access.
          </p>
          <h2 className="text-h2 mt-8">Contact Us</h2>
          <p className="mt-3 text-steel-600">
            If you have any questions about this Privacy Policy, please
            contact us at{" "}
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
