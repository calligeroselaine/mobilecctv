import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { business } from "@/lib/business";

const reasons = [
  `Australian-owned and fully licensed (${business.licence}), with a strong focus on security compliance and hazard planning.`,
  "Extensive experience managing security for organisations of every size, from single-site businesses to metro councils.",
  "A people-first approach — real trust and integrity underpin every deployment, not just the equipment.",
  "Focused on maximising your protection while minimising your expenditure, rather than a one-size-fits-all package.",
];

export function WhyUs() {
  return (
    <Section tone="surface">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Why Mobile CCTV Solutions" title="Security Specialists, Not Just Equipment Hire" />
          <ul className="mt-6 space-y-4">
            {reasons.map((reason) => (
              <li key={reason} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <span className="text-steel-600">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src="/images/office-security-via-entrance.jpg"
            alt="Mobile CCTV Solutions site security in operation"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
