import { Video, Antenna, CalendarClock, type LucideIcon } from "lucide-react";

/**
 * The three homepage "pathway" cards — product/service-led entry points.
 * Trailers and Pole Cameras link to their product pages; Temporary CCTV
 * For Events links to the Mobile Operations Centre page.
 */
export type Pathway = {
  slug: "mobile-cctv-trailers" | "pole-cameras" | "temporary-cctv-for-events";
  href: string;
  icon: LucideIcon;
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  image: string;
  imageAlt: string;
};

export const pathways: Pathway[] = [
  {
    slug: "mobile-cctv-trailers",
    href: "/mobile-cctv-trailers",
    icon: Video,
    eyebrow: "Explore",
    heading: "Mobile CCTV Trailers",
    description:
      "Solar-powered, towable surveillance trailers with 360° camera coverage and remote live access — deployed in minutes, no mains power required.",
    buttonLabel: "Explore Trailers",
    image: "/images/trailer-site-inspection.jpg",
    imageAlt: "Mobile CCTV Solutions team inspecting a deployed trailer's solar panel on a construction site",
  },
  {
    slug: "pole-cameras",
    href: "/pole-cameras",
    icon: Antenna,
    eyebrow: "Explore",
    heading: "Pole Cameras",
    description:
      "Standalone solar pole cameras for sites without power or network infrastructure — fixed or 4x-zoom PTZ, with 7–30 day cloud recording.",
    buttonLabel: "Explore Pole Cameras",
    image: "/images/pole-cam-card.jpg",
    imageAlt: "Mobi Pole Cam solar-powered surveillance unit deployed on a pole against bushland",
  },
  {
    slug: "temporary-cctv-for-events",
    href: "/mobile-operations-centre",
    icon: CalendarClock,
    eyebrow: "Explore",
    heading: "Temporary CCTV For Events",
    description:
      "Flexible surveillance for events, festivals and short-term security requirements — coverage for events of any size, deployed and removed on your schedule.",
    buttonLabel: "Explore Event Solutions",
    image: "/images/mobile-operations-centre-card.jpg",
    imageAlt: "Mobile CCTV Solutions' Mobile Operations Centre trailer branded for outdoor events, live concerts and festivals",
  },
];
