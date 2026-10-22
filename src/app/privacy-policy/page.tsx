import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
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
          <h2 className="text-h2 mt-8">Website Analytics</h2>
          <p className="mt-3 text-steel-600">
            Our website uses Google Analytics, a web analytics service
            provided by Google, to help us understand how visitors use the
            site. This includes which pages are viewed, how long people
            stay, and how they found us.
          </p>
          <p className="mt-3 text-steel-600">
            Google Analytics uses cookies and similar technologies to
            collect information such as your IP address, the type of device
            and browser you use, and the pages you visit. We do not use it
            to collect your name or contact details, and we only use the
            results to improve our website and services. This information
            is sent to and stored by Google, which may process it on
            servers outside Australia.
          </p>
          <p className="mt-3 text-steel-600">
            You can stop this data being collected by turning off cookies
            in your browser settings, or by installing Google&rsquo;s
            Analytics Opt-out Browser Add-on at{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:text-brand-dark"
            >
              tools.google.com/dlpage/gaoptout
            </a>
            . You can read more about how Google handles this data in
            Google&rsquo;s Privacy Policy at{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:text-brand-dark"
            >
              policies.google.com/privacy
            </a>
            .
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
