/**
 * Applications/industries content, sourced only from confirmed Stage 1 audit
 * material (blog posts + product page copy). Used on the homepage teaser
 * grid and the dedicated /applications page.
 */

export type Application = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Real blog post slug to link to as evidence, where one exists. */
  relatedPostSlug?: string;
};

export const applications: Application[] = [
  {
    slug: "construction",
    title: "Construction Sites",
    description:
      "Deter theft and vandalism when no one is on site. Building sites are a well-known target when work stops for the day, and Mobile CCTV Solutions trailers give you a visible deterrent plus footage that has helped identify offenders, including on unmanned utility sites targeted for copper theft.",
    image: "/images/construction-site.jpg",
    imageAlt: "Construction site protected by a Mobile CCTV Solutions trailer",
    relatedPostSlug: "protecting-utility-sites-from-copper-theft",
  },
  {
    slug: "events",
    title: "Events & Festivals",
    description:
      "Coverage for festivals and outdoor events of any size — from local council days to Sydney's largest annual gatherings, including five consecutive years securing the Lakemba Nights Ramadan Festival for a South West Sydney Council.",
    image: "/images/pole-camera-event-security.jpg",
    imageAlt: "Mobi Pole Cam providing event security coverage",
    relatedPostSlug: "securing-the-granny-smith-festival-with-mobile-cctv-solutions",
  },
  {
    slug: "councils",
    title: "Councils & Public Safety",
    description:
      "Pole cameras and trailers deployed by councils to monitor parks, skate parks and public spaces, and deter antisocial behaviour — already partnering with regional and metro councils across Australia.",
    image: "/images/office-security-via-entrance.jpg",
    imageAlt: "Mobile CCTV Solutions site security monitoring a public entrance",
    relatedPostSlug: "safeguarding-our-communities",
  },
  {
    slug: "mining",
    title: "Mining & Remote Sites",
    description:
      "Standalone solar surveillance for sites with no power or network infrastructure, built to run unattended for months at a time.",
    image: "/images/mine-cam-cctv.jpg",
    imageAlt: "Mobile CCTV trailer camera deployed on a mine site",
  },
  {
    slug: "utilities",
    title: "Utilities & Infrastructure",
    description:
      "Protecting unmanned substations and plant from copper theft, where live equipment poses a real danger to intruders as well as a costly, dangerous risk to the utility supplier.",
    image: "/images/cctv-solar-panels.jpg",
    imageAlt: "Solar panels powering a Mobile CCTV Solutions unit at an unmanned site",
    relatedPostSlug: "protecting-utility-sites-from-copper-theft",
  },
  {
    slug: "disaster-recovery",
    title: "Disaster Recovery",
    description:
      "Rapid deployment to flood-affected areas, helping local councils prevent looting of vulnerable properties during recovery. Trailers are deployed by a single person and operational within minutes.",
    image: "/images/onsite-trailer-2018.jpg",
    imageAlt: "Mobile CCTV Solutions trailer deployed on site",
    relatedPostSlug: "immediate-security-and-live-monitoring-for-flood-affected-areas",
  },
];
