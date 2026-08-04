import { Sun, RadioTower, Wifi, Timer, DollarSign, Repeat, type LucideIcon } from "lucide-react";

/**
 * Canonical list of product benefits — shared by the homepage KeyBenefits
 * section and the /solutions/* pathway pages, so the copy only lives in
 * one place. Pathway pages pick a relevant subset by `title`.
 */
export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
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
