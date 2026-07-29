import { MessageSquare, ClipboardList, Truck, MonitorSmartphone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  {
    icon: MessageSquare,
    title: "Enquire & Get A Quote",
    description:
      "Tell us about your site and requirements, and we'll recommend a trailer, pole camera, or a mix of both.",
  },
  {
    icon: ClipboardList,
    title: "Choose Sale Or Hire",
    description:
      "Short, mid or long-term hire, or outright purchase — whichever suits the length of your project.",
  },
  {
    icon: Truck,
    title: "We Deliver & Set Up",
    description:
      "Towed to site and operational within minutes, set up by a single operator with no specialist install crew.",
  },
  {
    icon: MonitorSmartphone,
    title: "Monitor Remotely, 24/7",
    description:
      "Live view, alerts and playback from any computer or mobile device, wherever you are.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow="Getting Started" title="How It Works" />
      <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <li key={title}>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {index + 1}
              </span>
              <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
            </div>
            <h3 className="text-h3 mt-4">{title}</h3>
            <p className="mt-2 text-steel-600">{description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
