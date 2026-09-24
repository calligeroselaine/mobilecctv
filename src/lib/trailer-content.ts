import type { LucideIcon } from "lucide-react";
import { Eye, Radar, Siren, Wifi, Tent, HardHat, Landmark, Zap, Waves, Mountain } from "lucide-react";
import { contactHref } from "@/lib/contactHref";

/**
 * Content for /mobile-cctv-trailers. Product facts come from the existing
 * Mobile CCTV Solutions trailer copy; case-study facts come from the
 * client-supplied ADCO and Granny Smith Festival material. Do not add
 * specifications, statistics or outcomes that aren't in those sources.
 */

export const trailerVideos = {
  inAction: { youtubeId: "F3uoPQNzrds", label: "Film 01 / 02" },
  adco: { youtubeId: "pHmO6Z5_3V0", label: "Film 02 / 02" },
};

export const trailerImages = {
  hero: "/images/case-study-bathurst-1000.jpg",
  intro: "/images/onsite-trailer-2018.jpg",
  capabilities: "/images/trailer-site-inspection.jpg",
  adco: "/images/case-study-adco-forest-high-school.jpg",
  grannySmith: "/images/blog/granny-smith-festival.jpg",
};

export const trailerCta = {
  hire: contactHref({ engagement: "Hire", solution: "Mobile CCTV Trailer" }),
  purchase: contactHref({ engagement: "Purchase", solution: "Mobile CCTV Trailer" }),
  brochure: "/docs/Mobile-CCTV-Solution-Brochure.pdf",
};

export const trailerCopy = {
  heroMeta: "Products / Site & event security",
  heroLead:
    "A solar-powered, towable CCTV system for sites that need surveillance now, without permanent power, network or fixed cameras.",
  heroFacts: ["Solar-powered", "Towable by any vehicle", "Remote live access"],
  introEyebrow: "01 — The product",
  introHeading: "Deployable CCTV for sites that don't have any security infrastructure yet.",
  introBody: [
    "A Mobile CCTV Solutions trailer is a self-contained camera system on a towable trailer. It can complement or replace static security guards, mobile patrols and fixed CCTV, and it is available for hire or purchase across Australia.",
    "It records and transmits live video over 4GX, with its own internet connection and network recorder, so footage can be viewed securely from any computer or mobile device.",
  ],
  introFacts: [
    { label: "Power", text: "100% solar-powered, with a diesel generator for emergency backup." },
    { label: "Access", text: "Live and recorded footage viewable remotely by multiple users." },
    { label: "Commercial", text: "Short, mid and long-term hire or outright purchase, with no locked-in contracts." },
  ],
  capabilitiesEyebrow: "02 — What it can do",
  capabilitiesHeading: "See it, detect it, respond to it.",
  statement: ["No mains power.", "No fixed install.", "Its own internet connection."],
  actionEyebrow: "03 — In action",
  actionHeading: "Product in action",
  actionCaption: "A real deployment, filmed on site.",
  applicationsEyebrow: "04 — Where it's used",
  applicationsHeading: "Where a trailer makes sense.",
  deploymentsEyebrow: "05 — Real-world deployments",
  faqEyebrow: "06 — Practical questions",
  faqHeading: "Before you enquire.",
};

export type Capability = { num: string; icon: LucideIcon; title: string; lead: string; items: string[] };

export const capabilities: Capability[] = [
  {
    num: "01",
    icon: Eye,
    title: "See",
    lead: "Continuous visibility of the whole site, day and night.",
    items: ["360° camera view", "Independent day and night lenses"],
  },
  {
    num: "02",
    icon: Radar,
    title: "Detect",
    lead: "Motion detection that tells the right people, wherever they are.",
    items: [
      "360° PIR detection, up to 60m diameter",
      "Alarm messages to security control rooms, network centres, PCs or mobile devices",
    ],
  },
  {
    num: "03",
    icon: Siren,
    title: "Respond",
    lead: "Detections can trigger the site's own response.",
    items: [
      "360° flood lighting, up to 60m diameter",
      "Audible siren and strobe, activated automatically on detection",
      "PA system for remote announcements",
    ],
  },
  {
    num: "04",
    icon: Wifi,
    title: "Stay connected",
    lead: "Local connectivity, and alerts about the trailer itself.",
    items: [
      "360° LAN, 4G and WiFi, up to 60m diameter",
      "Notifications for low battery and generator start/stop",
    ],
  },
];

export const actionPoints = [
  { title: "Rear vehicle gate", text: "Watching an access point that people and vehicles use." },
  { title: "Restricted and general areas", text: "Separating a restricted-access area from general parking." },
  { title: "Pan, tilt and zoom", text: "Looking across the site and into the distance from one position." },
];

export const applications: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: HardHat, title: "Construction sites", text: "Unmanned sites after hours" },
  { icon: Tent, title: "Events and festivals", text: "Outdoor events of any size" },
  { icon: Landmark, title: "Councils and public safety", text: "Parks and public spaces" },
  { icon: Zap, title: "Utilities and infrastructure", text: "Unmanned substations and plant" },
  { icon: Waves, title: "Disaster recovery", text: "Flood-affected areas" },
  { icon: Mountain, title: "Mining and remote sites", text: "Sites with no power or network" },
];

export const adcoStory = {
  client: "ADCO Constructions",
  project: "The Forest High School",
  place: "Frenchs Forest, NSW",
  tagline: "A construction site, repeated break-ins and a vulnerable rear entrance.",
  stats: [
    { value: "0", label: "Break-ins", sub: "after deployment" },
    { value: "15", label: "Camera views", sub: "at ADCO" },
    { value: "24/7", label: "Continuous recording", sub: "" },
  ],
  challenge:
    "As construction neared completion, the site suffered multiple break-ins and thefts, including tools and copper. The rear entrance had been used in two of the break-ins. The site needed better visibility of its vulnerable access areas.",
  solution:
    "Two Mobile CCTV Trailers covered the site's main accessible areas, recording continuously. Motion alerts notified site managers, who could open live footage remotely and see who was on site. The deployment also incorporated a Pole Camera to extend coverage at the rear entrance.",
  result:
    "From the day the trailers became operational there were no further break-ins and no further loss of equipment or finished components. The system also gave ADCO's team remote visibility of construction progress.",
  proof:
    "ADCO is a repeat client, and management confirmed they were very happy with the equipment and the outcome.",
  reported: [
    "Theft on the site reduced to zero",
    "Footage helped identify an individual after tools were stolen, and the tools were recovered",
    "A positive experience with service and installation, flexible positioning of the equipment, and issues resolved quickly",
  ],
  videoNote: "ADCO describe their experience of the deployment.",
};

export const grannyStory = {
  client: "City of Ryde Council",
  project: "Granny Smith Festival",
  place: "Eastwood, NSW",
  tagline: "Protecting assets during bump-in, then watching over a busy public event.",
  challenge:
    "Before thousands of visitors arrived, valuable event infrastructure and equipment was already sitting on an unattended site. Council needed to protect it through bump-in, and the surveillance requirement then changed as the site became a busy public event.",
  phases: [
    {
      label: "Bump-in",
      title: "Asset protection",
      text: "A Mobile CCTV Trailer and Pole Cameras were deployed ahead of the event, providing continuous surveillance over vulnerable assets.",
    },
    {
      label: "Festival day",
      title: "Event visibility",
      text: "The same temporary network gave the event team visibility across busy public areas, crowd movement and event operations.",
    },
  ],
  bridge: "The same temporary CCTV network, two different jobs.",
  stat: { value: "0", label: "Theft or vandalism", sub: "at Granny Smith Festival" },
  result:
    "No theft or vandalism was recorded during the lead-up, and there were zero major incidents from set-up through pack-down, without installing any permanent infrastructure.",
};

export const trailerFaqs = [
  {
    q: "Can I hire or buy a trailer?",
    a: "Both. Short, mid and long-term hire is available, as well as outright purchase, with no locked-in contracts.",
  },
  {
    q: "How is a trailer set up on site?",
    a: "It's towable by any vehicle and set up by a single operator, with no specialist install crew.",
  },
  {
    q: "Can a trailer be combined with pole cameras?",
    a: "Yes. The ADCO and Granny Smith Festival deployments both paired trailers with Pole Cameras to extend coverage.",
  },
  {
    q: "Can I see the specifications?",
    a: "The Mobile CCTV Trailer brochure has the product details. Contact our team about your site and we'll recommend a trailer, a pole camera, or a mix of both.",
  },
];
