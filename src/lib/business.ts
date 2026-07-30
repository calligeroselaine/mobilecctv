/**
 * Single source of truth for business details and site-wide navigation.
 * Confirmed against the mobilecctvsolutions.com.au audit (Stage 1) — do not
 * hard-code phone numbers, addresses, licence numbers, or nav links
 * elsewhere; import from here instead.
 */

export const business = {
  name: "Mobile CCTV Solutions",
  legalName: "Mobile CCTV Solutions",
  tagline: "Deliver surveillance to any location",
  phone: {
    display: "1300 99 69 10",
    href: "tel:1300996910",
  },
  email: "sales@mobilecctvsolutions.com.au",
  address: {
    line1: "Unit 29/8 Tilley Lane",
    suburb: "Frenchs Forest",
    state: "NSW",
    postcode: "2086",
    country: "Australia",
  },
  additionalLocations: ["Perth – Coming Soon!"],
  abn: "53 615 546 560",
  licence: "Master Licence No 000103010",
  social: {
    facebook: "https://www.facebook.com/Mobile-CCTV-Solutions-743284015838170/",
    instagram: "https://www.instagram.com/mobile.cctv/",
  },
  support: {
    label: "Support",
    href: "https://get.teamviewer.com/mcctv",
  },
  // Assumption: keeping the existing live domain. Update if the rebuild ships elsewhere.
  siteUrl: "https://www.mobilecctvsolutions.com.au",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

/** Primary navigation — the 7-page sitemap agreed in Stage 2. */
export const primaryNav: NavLink[] = [
  { label: "Mobile CCTV Trailers", href: "/mobile-cctv-trailers" },
  { label: "Pole Cameras", href: "/pole-cameras" },
  { label: "Applications", href: "/applications" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Product-specific links, used in the footer's "Products" column. */
export const productNav: NavLink[] = [
  { label: "Mobile CCTV Trailers", href: "/mobile-cctv-trailers" },
  { label: "Pole Cameras", href: "/pole-cameras" },
];

/** Footer legal/utility links. Login is intentionally excluded site-wide. */
export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Legals", href: "/legals" },
];
