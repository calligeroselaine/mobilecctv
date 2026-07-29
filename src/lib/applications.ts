/**
 * Applications/industries content, sourced only from confirmed Stage 1 audit
 * material (blog posts + product page copy). Used on the homepage teaser
 * grid and, later, the dedicated /applications page.
 */

export type Application = {
  slug: string;
  title: string;
  description: string;
  /** Real blog post slug to link to as evidence, where one exists. */
  relatedPostSlug?: string;
};

export const applications: Application[] = [
  {
    slug: "construction",
    title: "Construction Sites",
    description:
      "Deter theft and vandalism when no one is on site, with footage that has helped identify offenders and stop repeat break-ins.",
    relatedPostSlug: "protecting-utility-sites-from-copper-theft",
  },
  {
    slug: "events",
    title: "Events & Festivals",
    description:
      "Coverage for festivals and outdoor events of any size, from local council days to Sydney's largest annual gatherings.",
    relatedPostSlug: "securing-the-granny-smith-festival",
  },
  {
    slug: "councils",
    title: "Councils & Public Safety",
    description:
      "Pole cameras and trailers deployed by councils to monitor parks, skate parks and public spaces and deter antisocial behaviour.",
    relatedPostSlug: "safeguarding-our-communities",
  },
  {
    slug: "mining",
    title: "Mining & Remote Sites",
    description:
      "Standalone solar surveillance for sites with no power or network infrastructure, built to run unattended for months.",
  },
  {
    slug: "utilities",
    title: "Utilities & Infrastructure",
    description:
      "Protecting unmanned substations and plant from copper theft, where live equipment poses a real danger to intruders.",
    relatedPostSlug: "protecting-utility-sites-from-copper-theft",
  },
  {
    slug: "disaster-recovery",
    title: "Disaster Recovery",
    description:
      "Rapid deployment to flood-affected areas, helping local councils prevent looting of vulnerable properties during recovery.",
    relatedPostSlug: "immediate-security-flood-affected-areas",
  },
];
