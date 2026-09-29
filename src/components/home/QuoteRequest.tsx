import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";

const reassurance = [
  {
    icon: MapPin,
    text: "Tell us about your site and what you're trying to solve.",
  },
  {
    icon: ShieldCheck,
    text: "We'll recommend the right fit — a trailer, a pole camera, a Mobile Operations Centre, or a mix.",
  },
  {
    icon: Clock,
    text: "We usually respond within one business day.",
  },
];

export function QuoteRequest() {
  return (
    <Section id="get-a-quote" tone="alt" compact>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Get In Touch" title="Get A Quote Today" />
          <p className="mt-3 text-lg text-steel-600">
            Tell us about your site and we&rsquo;ll recommend the right
            solution — trailer, pole camera, Mobile Operations Centre, or a
            mix of all three.
          </p>
          <ul className="mt-8 flex flex-col gap-5">
            {reassurance.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="pt-1.5 text-steel-600">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-steel-200 bg-white p-6 shadow-lg sm:p-8">
          <ContactForm variant="full" />
        </div>
      </div>
    </Section>
  );
}
