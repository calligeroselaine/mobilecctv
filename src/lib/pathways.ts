import { Truck, Antenna, PartyPopper, type LucideIcon } from "lucide-react";

/**
 * The three homepage "pathway" cards — the client's decision-tree entry
 * points. Corrected per client feedback to be product/service-led
 * (Trailers, Pole Cameras, Temporary Events CCTV) rather than
 * audience-led. Trailers and Pole Cameras link straight to their real
 * product pages; Events reuses the existing dedicated solutions page.
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
    icon: Truck,
    eyebrow: "Explore",
    heading: "Mobile CCTV Trailers",
    description:
      "Solar-powered, towable surveillance trailers with 360° camera coverage and remote live access — deployed in minutes, no mains power required.",
    buttonLabel: "Explore Trailers",
    image: "/images/construction-site.jpg",
    imageAlt: "Mobile CCTV Solutions trailer deployed on a construction site with a crane behind it",
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
    image: "/images/pole-camera-security.png",
    imageAlt: "Mobi Pole Cam solar-powered surveillance unit deployed on a pole",
  },
  {
    slug: "temporary-cctv-for-events",
    href: "/solutions/events-temporary-sites",
    icon: PartyPopper,
    eyebrow: "Explore",
    heading: "Temporary CCTV For Events",
    description:
      "Flexible surveillance for events, festivals and short-term security requirements — coverage for events of any size, deployed and removed on your schedule.",
    buttonLabel: "Explore Event Solutions",
    image: "/images/pole-camera-event-security.jpg",
    imageAlt: "Mobi Pole Cam providing event security coverage",
  },
];
