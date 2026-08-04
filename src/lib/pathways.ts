import { HardHat, Building2, PartyPopper, type LucideIcon } from "lucide-react";

/**
 * The three homepage "pathway" cards — the client's decision-tree entry
 * points, each linking to a dedicated /solutions/* landing page. Copy is
 * verbatim from the client's brief, not paraphrased.
 */
export type Pathway = {
  slug: "construction-sites" | "vacant-properties" | "events-temporary-sites";
  href: string;
  icon: LucideIcon;
  /** Tailwind classes for this card's accent (icon badge + CTA). */
  accent: {
    badge: string;
    eyebrow: string;
    button: string;
  };
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  image: string;
  imageAlt: string;
};

export const pathways: Pathway[] = [
  {
    slug: "construction-sites",
    href: "/solutions/construction-sites",
    icon: HardHat,
    accent: {
      badge: "bg-brand",
      eyebrow: "text-brand",
      button: "bg-brand hover:bg-brand-dark",
    },
    eyebrow: "I Need To Protect",
    heading: "Construction Sites",
    description:
      "Deter theft, vandalism and site downtime with rapidly deployed CCTV solutions.",
    buttonLabel: "Explore Construction Solutions",
    image: "/images/construction-site.jpg",
    imageAlt: "Mobile CCTV Solutions trailer deployed on a construction site with a crane behind it",
  },
  {
    slug: "vacant-properties",
    href: "/solutions/vacant-properties",
    icon: Building2,
    accent: {
      badge: "bg-emerald-600",
      eyebrow: "text-emerald-700",
      button: "bg-emerald-600 hover:bg-emerald-700",
    },
    eyebrow: "I Need To Protect",
    heading: "Vacant Properties",
    description:
      "Keep vacant and unoccupied properties secure with reliable 24/7 monitoring.",
    buttonLabel: "Explore Property Solutions",
    image: "/images/solar-cctv-pole-cam.jpg",
    imageAlt: "Mobi Pole Cam solar-powered surveillance unit deployed on a quiet street",
  },
  {
    slug: "events-temporary-sites",
    href: "/solutions/events-temporary-sites",
    icon: PartyPopper,
    accent: {
      badge: "bg-amber-600",
      eyebrow: "text-amber-700",
      button: "bg-amber-600 hover:bg-amber-700",
    },
    eyebrow: "I Need To Protect",
    heading: "Events & Temporary Sites",
    description:
      "Flexible surveillance for events, festivals and short-term security requirements.",
    buttonLabel: "Explore Event Solutions",
    image: "/images/pole-camera-event-security.jpg",
    imageAlt: "Mobi Pole Cam providing event security coverage",
  },
];
