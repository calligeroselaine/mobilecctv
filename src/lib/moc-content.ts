import type { LucideIcon } from "lucide-react";
import {
  Fingerprint,
  MapPin,
  Network,
  Laptop,
  Tv,
  Satellite,
  DoorOpen,
  ShowerHead,
  Bath,
  Droplets,
  Wrench,
  Droplet,
  ArrowDownToLine,
  Lightbulb,
  Lock,
  Bolt,
  Table2,
  Video,
  RadioTower,
  Truck,
  Footprints,
  ShieldCheck,
  Users,
  Building2,
  HardHat,
  Tent,
} from "lucide-react";

/**
 * Content for /mobile-operations-centre — ported from the Claude Design
 * handoff (design_handoff_mobile_operations_centre/content.json + the
 * narrative copy in the reference prototype HTML). Nothing here is
 * invented: copy, stats and FAQ answers are the client-approved wording
 * from the design handoff. Do not add specs, stats or claims that aren't
 * in this file or in the reference prototype without client sign-off.
 */

export type MocVideoKey =
  | "walkthrough"
  | "greenfield"
  | "ramadanScale"
  | "network"
  | "stakeholders"
  | "bathurst";

export type MocVideo = {
  youtubeId: string;
  label: string;
  aspect: "9/16" | "21/9";
};

export const mocVideos: Record<MocVideoKey, MocVideo> = {
  walkthrough: { youtubeId: "-qVThfdCSFE", label: "Film 01 / 06", aspect: "9/16" },
  greenfield: { youtubeId: "IHd_TpbLGys", label: "Film 02 / 06", aspect: "9/16" },
  ramadanScale: { youtubeId: "VLov3goKPUQ", label: "Film 03 / 06", aspect: "9/16" },
  network: { youtubeId: "wKaPTO_ryT8", label: "Film 04 / 06", aspect: "9/16" },
  stakeholders: { youtubeId: "_iZGdqe0yPw", label: "Film 05 / 06", aspect: "9/16" },
  bathurst: { youtubeId: "oeburWMXqWg", label: "Film 06 / 06", aspect: "21/9" },
};

/**
 * Real photos confirmed against the existing /public/images library.
 * `null` means no confidently-matching photo exists yet — the page renders
 * a labelled placeholder instead of guessing. See the implementation
 * report for exactly what's needed from the client for each `null` here.
 */
export const mocImages = {
  heroExterior: "/images/mobile-operations-centre-events.jpg",
  introExteriorDetail: "/images/mobile-operations-centre-exterior-detail.jpg",
  insideAccess: null as string | null,
  insideConnected: null as string | null,
  insideAmenities: null as string | null,
  insideStable: null as string | null,
  ramadanFullBleed: "/images/case-study-ramadan-nights.jpg",
  bathurstDeployment: "/images/case-study-bathurst-1000.jpg",
  bathurstMonitoringWall: null as string | null,
};

export const heroFacts: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "For security and event operations teams" },
  { icon: Users, label: "For councils, promoters and site managers" },
  { icon: MapPin, label: "For sites with little existing infrastructure" },
];

export const configuredToOperateAs = [
  { letter: "A", role: "Security control room" },
  { letter: "B", role: "Event operations base" },
  { letter: "C", role: "Site office" },
  { letter: "D", role: "Council or event management base" },
  { letter: "E", role: "Promoter or management office" },
];

export type MocThemeItem = { icon: LucideIcon; label: string };

export type MocTheme = {
  num: string;
  icon: LucideIcon;
  title: string;
  sub: string;
  headline: string;
  photo: string | null;
  photoCaption: string;
  stat?: string;
  statLabel?: string;
  items: MocThemeItem[];
};

export const insideThemes: MocTheme[] = [
  {
    num: "01",
    icon: Lock,
    title: "Secure access",
    sub: "Fingerprint + event-specific access",
    headline: "Only the people on your operation get through the door.",
    photo: mocImages.insideAccess,
    photoCaption: "Fingerprint reader at entry door",
    items: [
      { icon: Fingerprint, label: "Fingerprint access" },
      { icon: MapPin, label: "Custom access codes for each event" },
    ],
  },
  {
    num: "02",
    icon: Network,
    title: "Connected",
    sub: "Workspace, displays + Starlink",
    headline: "A working control room, not an empty box.",
    photo: mocImages.insideConnected,
    photoCaption: "Operator tables, wall maps, TV displays",
    items: [
      { icon: Table2, label: "Adjustable operator work tables" },
      { icon: MapPin, label: "Wall space for maps and event information" },
      { icon: Laptop, label: "Laptop connectivity" },
      { icon: Tv, label: "TV connectivity" },
      { icon: Satellite, label: "Starlink" },
    ],
  },
  {
    num: "03",
    icon: Droplet,
    title: "Self-contained",
    sub: "Bathroom, shower, sink + water",
    headline: "Facilities on board for long shifts on remote sites.",
    photo: mocImages.insideAmenities,
    photoCaption: "Separate bathroom — shower, toilet, sink",
    stat: "200L",
    statLabel: "Fresh water capacity, or connect to mains",
    items: [
      { icon: DoorOpen, label: "Separate bathroom" },
      { icon: ShowerHead, label: "Shower" },
      { icon: Bath, label: "Toilet" },
      { icon: Droplets, label: "Sink" },
      { icon: Wrench, label: "Mains water option" },
      { icon: Droplet, label: "Up to 200L fresh water" },
    ],
  },
  {
    num: "04",
    icon: ArrowDownToLine,
    title: "Stable & operational",
    sub: "Hydraulic stabilisers + lighting",
    headline: "Set down, levelled and lit for work after dark.",
    photo: mocImages.insideStable,
    photoCaption: "Hydraulic stabilisers + exterior flood lighting at night",
    items: [
      { icon: ArrowDownToLine, label: "Hydraulic stabilisers" },
      { icon: Lightbulb, label: "Exterior flood lighting" },
    ],
  },
];

export const whyPoints: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Lock,
    title: "One private base",
    body: "Operational information stays inside the team using it, while security and police can work side by side.",
  },
  {
    icon: Bolt,
    title: "Everything arrives together",
    body: "The supporting set-up a conventional site shed needs arranged separately arrives with the unit, so the team starts work instead of building a base.",
  },
  {
    icon: ArrowDownToLine,
    title: "An operational base, fast",
    body: "A working environment on sites with little existing infrastructure — ready for the team rather than built around them.",
  },
];

export const applications: { icon: LucideIcon; label: string }[] = [
  { icon: Tent, label: "Major events" },
  { icon: ShieldCheck, label: "Temporary security operations" },
  { icon: MapPin, label: "Greenfield sites" },
  { icon: HardHat, label: "Construction and infrastructure projects" },
  { icon: Building2, label: "Temporary command environments" },
];

export const bathurstSteps = [
  {
    title: "Identify",
    body: "Queues, congestion and access issues as they develop.",
    tags: ["Queues", "Congestion", "Vehicle access"],
  },
  {
    title: "Assess",
    body: "Live operational visibility shows where the bottleneck is.",
    tags: ["Live feeds", "Traffic flow"],
  },
  {
    title: "Respond",
    body: "Redirect resources, manage gates and address traffic flow.",
    tags: ["Gates", "Resources", "Traffic"],
    highlight: true,
  },
];

export const ramadanStats = [
  { value: "31", label: "Consecutive event nights" },
  { value: "43", label: "Cameras across the event space" },
  { value: "7 → 43", label: "Camera network growth", split: true },
  { value: "403", label: "Stallholders" },
];

export const ramadanStory = {
  tagline: "One command point for a complex multi-agency event.",
  challenge:
    "Ramadan Nights runs for 31 consecutive nights, bringing sustained crowds into a busy event precinct. Council needed more than cameras: security, police, medical teams and event management needed one place from which to see the event, communicate and respond.",
  solution:
    "A Mobile Operations Centre, supported by solar-powered pole cameras and a wider camera network. Security, NSW Police, medical personnel and event management worked together from a central command point with live visibility across the event.",
  result:
    "All 31 nights were delivered with no major incidents. When an approaching weather front was identified through the CCTV network, resources could be deployed to manage the situation before it escalated.",
  clientProof:
    "Mobile CCTV Solutions has been repeatedly engaged to support Ramadan Nights.",
};

export const bathurstStory = {
  tagline: "A temporary operational home base for a large security operation.",
  client: "Guardian Venue Management",
  challenge:
    "Guardian Venue Management needed to run a 24-hour security operation for 10 days, with more than 100 security personnel on shift each day. They needed a functioning control room, not simply somewhere to place a desk.",
  solution:
    "Mobile CCTV Solutions deployed a fully equipped Mobile Operations Centre as the security team's command post. Up to four operators could work inside simultaneously, with communications, internet and workstations available on site. The centre brought together 28 temporary CCTV streams plus more than 30 existing local CCTV feeds, and a separate CCTV workstation was installed in the client's management office.",
  result:
    "Security management could see crowd and vehicle movements live and redirect personnel and resources before pressure points developed. The Mobile Operations Centre became the security team's operational home base throughout the event.",
  clientProof:
    "Guardian Venue Management is a repeat customer and subsequently booked Mobile CCTV Solutions for another two Bathurst race events.",
  videoCaption:
    "Operational visibility in action at Bathurst: queues, congestion, gates and vehicle access, and moving resources to meet them.",
  stats: [
    { value: "10", label: "Days, operating 24 hours" },
    { value: "100+", label: "Security personnel on shift each day" },
    { value: "28 + 30+", label: "Temporary streams plus existing feeds" },
    { value: "4", label: "Operators working inside at once" },
  ],
};

export const ramadanStatsNote =
  "Figures as described by the event team in the deployment interview.";

export const networkSteps: {
  icon: LucideIcon;
  title: string;
  body: string;
  highlight?: boolean;
}[] = [
  { icon: Video, title: "Cameras", body: "Monitor crowd activity across the event space." },
  { icon: RadioTower, title: "Wireless network", body: "Camera feeds are transmitted back to the control room." },
  {
    icon: Truck,
    title: "Mobile Operations Centre",
    body: "Feeds are monitored on site in the Operations Centre.",
    highlight: true,
  },
  {
    icon: Footprints,
    title: "Operational response",
    body: "Teams act on what the feeds show.",
  },
];

export const stakeholders = [
  { name: "Council", use: "Crowd flow and event oversight" },
  { name: "Security", use: "Crowd behaviour and operational monitoring" },
  { name: "Police", use: "Monitoring and response" },
];

export const faqs = [
  {
    q: "What is the minimum hire period?",
    a: "The minimum hire period is one week.",
  },
  {
    q: "How quickly can it be deployed?",
    a: "Timing depends on your site, location and event requirements. Contact our team with your dates and we'll confirm availability and logistics.",
  },
  {
    q: "What does it need on site?",
    a: "What is on board is covered in What's inside. Tell us about your site and we'll talk through power, connectivity, water and access for your location.",
  },
  {
    q: "How many people can work inside?",
    a: "At Bathurst, up to four operators worked from the centre at the same time. Talk to us about your team and how you'd use the space.",
  },
  {
    q: "Can it be used as something other than a security control room?",
    a: "Yes. It can be configured as a security control room, event operations base, site office, council or event management base, or a promoter's management office.",
  },
];

/** Narrative copy blocks. */
export const copy = {
  heroMetaLeft: "Products / Event & site operations",
  heroMetaRight: "Available for hire · Australia-wide enquiries",
  heroLead:
    "A secure, self-contained control room that brings a working operations base to events and sites where little infrastructure exists.",
  introEyebrow: "01 — The product",
  introHeading:
    "A camera gives you visibility. A Mobile Operations Centre gives your team somewhere to use that visibility to make decisions.",
  introBody:
    "It is a functioning command environment — a purpose-built, towable operations room where security, event management and key agencies work from shared, real-time information, on the site where it's needed.",
  introPhotoCaption: "A private, secured base for event and site operations.",
  stepInsideEyebrow: "02 — What's inside",
  stepInsideLead:
    "Walk through the unit from the door to the stabilisers — access, workspace, connectivity and the facilities that let a team stay on site through a long operation.",
  whyEyebrow: "03 — Why use one",
  whyHeading: "A site shed is a room. An operation needs a base.",
  whyBody:
    "On a greenfield event site there's often nothing to plug into. The value of a Mobile Operations Centre isn't any single feature — it's having a private, connected, self-contained operational base arrive as one deployable unit.",
  rolesTitle: "Can function as",
  applicationsEyebrow: "04 — Where it can be used",
  applicationsHeading: "Wherever an operation needs a base.",
  applicationsLink: "See how it has worked in two real deployments",
  deploymentsEyebrow: "05 — Real-world deployments · Case study 1",
  ramadanFor: "For Canterbury-Bankstown City Council",
  ramadanVideoCaption:
    "The event team on how the camera network has scaled with Ramadan Nights, year on year.",
  networkTitle: "From a camera on the street to a decision in the room",
  stakeholdersTitle: "One centre, three ways of using it",
  bathurstEyebrow: "05 — Real-world deployments · Case study 2",
  faqEyebrow: "06 — Practical questions",
  faqHeading: "Planning an operation?",
  faqBody:
    "If your question isn't covered here, our team can talk through your site, dates and requirements.",
  enquireEyebrow: "07 — Enquire",
  enquireHeading: "Bring the control room to your site",
  enquireBody:
    "Tell us about your event or site — location, dates and who'll be working from the centre. We'll come back to you on availability and how the unit can be set up for your operation.",
};
