import { Sun, RadioTower, Wifi, Timer, DollarSign, Repeat } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const benefits = [
  {
    icon: Sun,
    title: "Solar-Powered & Self-Sufficient",
    description:
      "Operates for months without mains power, running on 100% solar with a diesel generator for emergency backup.",
  },
  {
    icon: RadioTower,
    title: "360° Coverage & PIR Detection",
    description:
      "Motion-triggered recording and alerting across a 60m diameter, with flood lighting and audible siren activation.",
  },
  {
    icon: Wifi,
    title: "Remote Access, Anywhere",
    description:
      "Live view and playback from any computer or mobile device, over your own secure internet connection.",
  },
  {
    icon: Timer,
    title: "Set Up In Minutes",
    description:
      "Towable by any vehicle and deployed by a single operator — no locked-in contracts, no specialist install crew.",
  },
  {
    icon: DollarSign,
    title: "A Fraction Of Guard Costs",
    description:
      "Extremely cost-effective 24-hour coverage, at around 25% of the cost of a static security guard.",
  },
  {
    icon: Repeat,
    title: "Sale Or Hire",
    description:
      "Short, mid and long-term hire, or outright purchase — whichever suits the length of your project.",
  },
];

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
