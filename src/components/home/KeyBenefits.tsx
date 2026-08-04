import { Section, SectionHeading } from "@/components/ui/Section";
import { benefits } from "@/lib/benefits";

export function KeyBenefits() {
  return (
    <Section tone="surface">
      <SectionHeading eyebrow="Why It Works" title="Built For Real Sites, Not Showrooms" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title}>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-h3 mt-4">{title}</h3>
            <p className="mt-2 text-steel-600">{description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
