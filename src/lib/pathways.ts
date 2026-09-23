import { Video, Antenna, Truck, type LucideIcon } from "lucide-react";

/**
 * The three homepage "pathway" cards — the client's three core
 * product/solution pathways (Mobile CCTV Trailers, Pole Cameras, Mobile
 * Operations Centre). Each links straight to its own dedicated product
 * page. Temporary/event CCTV is an application context covered on the
 * Mobile Operations Centre and solutions pages, not a fourth core product.
 */
export type Pathway = {
  slug: "mobile-cctv-trailers" | "pole-cameras" | "mobile-operations-centre";
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
    slug: "mobile-operations-centre",
    href: "/mobile-operations-centre",
    icon: Truck,
    eyebrow: "Explore",
    heading: "Mobile Operations Centre",
    description:
      "A secure, self-contained control room that brings workspace, connectivity and amenities to sites where little infrastructure exists.",
    buttonLabel: "Explore Operations Centre",
    image: "/images/mobile-operations-centre-card.jpg",
    imageAlt: "Mobile CCTV Solutions' Mobile Operations Centre trailer branded for outdoor events, live concerts and festivals",
  },
];
