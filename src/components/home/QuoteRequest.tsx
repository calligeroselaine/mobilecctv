import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";

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

      <div className="mx-auto mt-8 max-w-2xl">
        <ContactForm variant="full" />
      </div>
    </Section>
  );
}
