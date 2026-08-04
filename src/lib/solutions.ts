import type { FaqItem } from "@/components/ui/Faq";

export type SolutionProduct = {
  title: string;
  description: string;
  href: "/mobile-cctv-trailers" | "/pole-cameras";
  cta: string;
  image: string;
  imageAlt: string;
};

export type SolutionProblem = {
  title: string;
  description: string;
};

export type Solution = {
  slug: "construction-sites" | "vacant-properties" | "events-temporary-sites";
  path: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: { src: string; alt: string };
  problems: SolutionProblem[];
  products: SolutionProduct[];
  /** References `title` in `@/lib/benefits` — keeps the copy in one place. */
  benefitTitles: string[];
  caseStudySlugs: string[];
  faqs: FaqItem[];
  finalCtaHeading: string;
  finalCtaDescription: string;
  finalCtaButtonLabel: string;
  /** Shown on-page when a section relies on adjacent rather than direct evidence. */
  reviewNote?: string;
};

export const solutions: Solution[] = [
  {
    slug: "construction-sites",
    path: "/solutions/construction-sites",
    navLabel: "Construction Sites",
    metaTitle: "CCTV Security For Construction Sites",
    metaDescription:
      "Mobile CCTV trailers for construction site security — deter theft, vandalism and copper theft with rapidly deployed, solar-powered surveillance. Sale or hire, Australia-wide.",
    heroEyebrow: "For Construction Sites",
    heroTitle: "Protect Your Construction Site",
    heroDescription:
      "Deter theft, vandalism and site downtime with rapidly deployed CCTV solutions — built for sites that don't have permanent power or a fixed security presence.",
    heroImage: {
      src: "/images/construction-site.jpg",
      alt: "Mobile CCTV Solutions trailer deployed on a construction site with a crane behind it",
    },
    problems: [
      {
        title: "Theft & Vandalism After Hours",
        description:
          "Building sites are a well-known target when work stops for the day — tools, materials and machinery left overnight with no one watching.",
      },
      {
        title: "Copper & Material Theft",
        description:
          "Unmanned sites and utility plant are frequently targeted for copper theft, which is both costly to replace and dangerous around live equipment.",
      },
      {
        title: "No Permanent Power Or Network",
        description:
          "Active construction sites rarely have mains power or fixed infrastructure available for a traditional fixed CCTV install.",
      },
    ],
    products: [
      {
        title: "Mobile CCTV Trailers",
        description:
          "Solar-powered, towable surveillance trailers with 360° camera coverage, PIR detection and remote live access — deployed in minutes, no mains power required.",
        href: "/mobile-cctv-trailers",
        cta: "Explore Trailers",
        image: "/images/mine-cam-cctv.jpg",
        imageAlt: "Mobile CCTV trailer camera deployed on a construction site",
      },
      {
        title: "Pole Cameras",
        description:
          "For trouble spots within a site that need standalone coverage without power or network infrastructure nearby.",
        href: "/pole-cameras",
        cta: "Explore Pole Cameras",
        image: "/images/mobi-pole-cam-768x1024.jpg",
        imageAlt: "Mobi Pole Cam solar-powered surveillance unit",
      },
    ],
    benefitTitles: [
      "Solar-Powered & Self-Sufficient",
      "360° Coverage & PIR Detection",
      "Set Up In Minutes",
      "A Fraction Of Guard Costs",
      "Sale Or Hire",
    ],
    caseStudySlugs: ["protecting-utility-sites-from-copper-theft"],
    faqs: [
      {
        question: "Do we need mains power on site?",
        answer:
          "No — every trailer runs on 100% solar with a diesel generator for emergency backup, so it operates for months without a power connection.",
      },
      {
        question: "Can the trailer be moved as the site progresses?",
        answer:
          "Yes — it's towable by any vehicle and can be relocated by a single operator in minutes as work areas change.",
      },
      {
        question: "Is it hire or purchase?",
        answer:
          "Both — short, mid and long-term hire, or outright purchase, whichever suits the length of your project.",
      },
      {
        question: "How is footage accessed?",
        answer:
          "Live view and playback from any computer or mobile device, over your own secure internet connection.",
      },
    ],
    finalCtaHeading: "Ready To Secure Your Site?",
    finalCtaDescription:
      "Tell us about your construction site and we'll recommend the right trailer or pole camera setup.",
    finalCtaButtonLabel: "Book A Site Security Assessment",
  },
  {
    slug: "vacant-properties",
    path: "/solutions/vacant-properties",
    navLabel: "Vacant Properties",
    metaTitle: "CCTV Security For Vacant & Unoccupied Properties",
    metaDescription:
      "Keep vacant and unoccupied properties secure with reliable, solar-powered mobile CCTV monitoring — no mains power required. Sale or hire, Australia-wide.",
    heroEyebrow: "For Vacant & Unoccupied Properties",
    heroTitle: "Protect Vacant & Unoccupied Properties",
    heroDescription:
      "Keep vacant and unoccupied properties secure with reliable 24/7 monitoring — deployed fast, and self-sufficient even when the power is disconnected.",
    heroImage: {
      src: "/images/solar-cctv-pole-cam.jpg",
      alt: "Mobi Pole Cam solar-powered surveillance unit deployed on a quiet street",
    },
    problems: [
      {
        title: "Break-Ins & Trespassing",
        description:
          "An empty property with no visible deterrent is an easy target for break-ins, squatting and vandalism.",
      },
      {
        title: "Looting During Vacancy",
        description:
          "Properties left vacant or evacuated — including during emergencies — are vulnerable to looting when no one is watching.",
      },
      {
        title: "No Power Connection",
        description:
          "Vacant properties often have power disconnected entirely, ruling out a traditional wired CCTV system.",
      },
    ],
    products: [
      {
        title: "Pole Cameras",
        description:
          "Standalone solar pole cameras for sites without power or network infrastructure — fixed or 4x-zoom PTZ, with 7–30 day cloud recording.",
        href: "/pole-cameras",
        cta: "Explore Pole Cameras",
        image: "/images/pole-camera-security.png",
        imageAlt: "Mobi Pole Cam deployed on a pole outside a building",
      },
      {
        title: "Mobile CCTV Trailers",
        description:
          "For larger vacant sites — solar-powered, towable surveillance with 360° camera coverage and remote live access.",
        href: "/mobile-cctv-trailers",
        cta: "Explore Trailers",
        image: "/images/mobile-cctv-trailers.jpg",
        imageAlt: "Mobile CCTV trailer with solar panels and camera mast",
      },
    ],
    benefitTitles: [
      "Solar-Powered & Self-Sufficient",
      "Remote Access, Anywhere",
      "360° Coverage & PIR Detection",
      "A Fraction Of Guard Costs",
      "Sale Or Hire",
    ],
    caseStudySlugs: ["immediate-security-and-live-monitoring-for-flood-affected-areas"],
    reviewNote:
      "We don't yet have a dedicated case study for a standard vacant commercial or residential property outside a disaster-recovery context. The case study below is real, but specifically covers properties left vacant during flood recovery — please supply a general vacant-property example if you have one, so we can add it here.",
    faqs: [
      {
        question: "Does the property need power for this to work?",
        answer:
          "No — both the trailer and the pole camera run entirely on solar power, so a fully disconnected property is not a problem.",
      },
      {
        question: "Can it monitor a property with no one on site?",
        answer:
          "Yes — footage and live view are accessible remotely from any computer or mobile device, so the property doesn't need anyone present.",
      },
      {
        question: "How quickly can it be deployed?",
        answer:
          "Trailers are towable and set up by a single operator in minutes; pole cameras are similarly fast to install on an existing pole or a supplied mount.",
      },
      {
        question: "Is this available for short-term hire?",
        answer:
          "Yes — short, mid and long-term hire is available, as well as outright purchase.",
      },
    ],
    finalCtaHeading: "Have A Vacant Property To Protect?",
    finalCtaDescription:
      "Tell us about the property and we'll recommend the right setup — pole camera, trailer, or a mix of both.",
    finalCtaButtonLabel: "Request A Security Recommendation",
  },
  {
    slug: "events-temporary-sites",
    path: "/solutions/events-temporary-sites",
    navLabel: "Events & Temporary Sites",
    metaTitle: "CCTV Security For Events & Temporary Sites",
    metaDescription:
      "Flexible mobile CCTV surveillance for events, festivals and short-term security needs — deployed in minutes, no mains power required. Sale or hire, Australia-wide.",
    heroEyebrow: "For Events & Temporary Sites",
    heroTitle: "Flexible Surveillance For Events & Temporary Sites",
    heroDescription:
      "Flexible surveillance for events, festivals and short-term security requirements — coverage for events of any size, from local council days to Sydney's largest annual gatherings.",
    heroImage: {
      src: "/images/pole-camera-event-security.jpg",
      alt: "Mobi Pole Cam providing event security coverage",
    },
    problems: [
      {
        title: "Crowd Safety At Scale",
        description:
          "Large events need visible, active monitoring across stages, entries and crowd areas, often for events spanning multiple nights or weeks.",
      },
      {
        title: "No Permanent Infrastructure",
        description:
          "Event sites are temporary by nature — there's no existing CCTV, power or network to build on.",
      },
      {
        title: "Short-Notice, Short-Term Needs",
        description:
          "Events are often booked with limited lead time and need coverage for days or weeks, not a permanent installation.",
      },
    ],
    products: [
      {
        title: "Mobile CCTV Trailers",
        description:
          "Solar-powered, towable surveillance trailers with 360° camera coverage, PIR detection and remote live access — deployed in minutes, no mains power required.",
        href: "/mobile-cctv-trailers",
        cta: "Explore Trailers",
        image: "/images/mine-cam-cctv.jpg",
        imageAlt: "Mobile CCTV trailer camera deployed on site",
      },
      {
        title: "Pole Cameras",
        description:
          "For event perimeters or standalone trouble spots without power or network infrastructure nearby.",
        href: "/pole-cameras",
        cta: "Explore Pole Cameras",
        image: "/images/mobi-pole-cam-768x1024.jpg",
        imageAlt: "Mobi Pole Cam solar-powered surveillance unit",
      },
    ],
    benefitTitles: [
      "Set Up In Minutes",
      "Sale Or Hire",
      "Remote Access, Anywhere",
      "360° Coverage & PIR Detection",
      "A Fraction Of Guard Costs",
    ],
    caseStudySlugs: [
      "securing-the-granny-smith-festival-with-mobile-cctv-solutions",
      "safeguarding-tradition-the-crucial-role-of-mobile-cctv-solutions-at-sydneys-largest-ramadan-festival",
    ],
    faqs: [
      {
        question: "How quickly can a trailer be deployed for an event?",
        answer:
          "It's towable by any vehicle and set up by a single operator in minutes — no specialist install crew needed.",
      },
      {
        question: "Can it run all weekend without mains power?",
        answer:
          "Yes — it's solar-powered with a diesel generator for backup, so it's built to run unattended for the full length of an event.",
      },
      {
        question: "Do you offer short-term hire?",
        answer:
          "Yes — short, mid and long-term hire is available, as well as outright purchase.",
      },
      {
        question: "Can footage be monitored live during the event?",
        answer:
          "Yes — live view and playback from any computer or mobile device, over your own secure internet connection.",
      },
    ],
    finalCtaHeading: "Planning An Event Or Temporary Site?",
    finalCtaDescription:
      "Tell us about your event and we'll recommend the right coverage — trailer, pole camera, or a mix of both.",
    finalCtaButtonLabel: "Speak With Our Team",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
