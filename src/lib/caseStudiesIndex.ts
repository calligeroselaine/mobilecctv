/**
 * The /case-studies index page — a single front door that collects the
 * real deployments already written up on the three product pages, rather
 * than duplicating that content. Each entry links straight to the full
 * write-up (challenge/solution/result) on its product page section.
 *
 * No new case-study copy here — client name, place and the one-line
 * result are all lifted near-verbatim from the existing product-page
 * content in trailer-content.ts / pole-content.ts / moc-content.ts.
 */
export type CaseStudyIndexEntry = {
  slug: string;
  client: string;
  project: string;
  place: string;
  /** Which product this deployment used — shown as a small tag on the card. */
  product: string;
  /** A short, near-verbatim lift from that case study's own "result" copy. */
  result: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const caseStudiesIndex: CaseStudyIndexEntry[] = [
  {
    slug: "ramadan-nights",
    client: "Canterbury-Bankstown City Council",
    project: "Ramadan Nights",
    place: "Lakemba, NSW",
    product: "Mobile Operations Centre",
    result:
      "All 31 nights were delivered with no major incidents. Mobile CCTV Solutions has been repeatedly engaged to support Ramadan Nights.",
    image: "/images/case-study-ramadan-nights.jpg",
    imageAlt: "Ramadan Nights market crowd on Haldon Street, Lakemba, with a Mobile CCTV Solutions camera tower overlooking the street",
    href: "/mobile-operations-centre#ramadan",
  },
  {
    slug: "bathurst-1000-control-room",
    client: "Guardian Venue Management",
    project: "Supercars Bathurst 1000 — Command Centre",
    place: "Bathurst, NSW",
    product: "Mobile Operations Centre",
    result:
      "The Mobile Operations Centre became the security team's operational home base throughout the event. Guardian Venue Management is a repeat customer.",
    image: "/images/case-study-bathurst-1000.jpg",
    imageAlt: "Mobile CCTV Solutions camera trailer deployed on a hill overlooking Mount Panorama, Bathurst",
    href: "/mobile-operations-centre#bathurst",
  },
  {
    slug: "adco-constructions",
    client: "ADCO Constructions",
    project: "The Forest High School",
    place: "Frenchs Forest, NSW",
    product: "Mobile CCTV Trailers",
    result:
      "From the day the trailers became operational there were no further break-ins and no further loss of equipment or finished components.",
    image: "/images/case-study-adco-forest-high-school.jpg",
    imageAlt: "Mobile CCTV Solutions trailer deployed at the ADCO Constructions Forest High School site",
    href: "/mobile-cctv-trailers#adco",
  },
  {
    slug: "granny-smith-festival",
    client: "City of Ryde Council",
    project: "Granny Smith Festival",
    place: "Eastwood, NSW",
    product: "Mobile CCTV Trailers",
    result:
      "No theft or vandalism was recorded during the lead-up, and there were zero major incidents from set-up through pack-down.",
    image: "/images/blog/granny-smith-festival.jpg",
    imageAlt: "Granny Smith Festival crowd in Eastwood, protected by Mobile CCTV Solutions trailers and pole cameras",
    href: "/mobile-cctv-trailers#granny-smith",
  },
  {
    slug: "sydney-marathon",
    client: "Pont3",
    project: "TCS Sydney Marathon",
    place: "Sydney, NSW",
    product: "Pole Cameras",
    result:
      "Every runner group departed on time, roads reopened to schedule and no major incidents were recorded. Pont3 has returned for four consecutive years.",
    image: "/images/case-study-sydney-marathon-cameras.jpg",
    imageAlt: "Pole camera units staged on a mat ready for the TCS Sydney Marathon deployment",
    href: "/pole-cameras#sydney-marathon",
  },
  {
    slug: "bathurst-1000-pole-cameras",
    client: "Guardian Venue Management",
    project: "Supercars Bathurst 1000 — Pole Camera Network",
    place: "Bathurst, NSW",
    product: "Pole Cameras",
    result:
      "The security team could see crowd and vehicle movement as it happened and redirect resources before issues developed, across a race weekend attracting more than 150,000 patrons.",
    image: "/images/case-study-bathurst-1000.jpg",
    imageAlt: "Mobile CCTV Solutions camera trailer deployed on a hill overlooking Mount Panorama, Bathurst",
    href: "/pole-cameras#bathurst",
  },
];
