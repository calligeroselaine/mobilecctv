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
  CalendarCheck,
  CalendarClock,
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
  introExteriorDetail: null as string | null,
  insideAccess: null as string | null,
  insideConnected: null as string | null,
  insideAmenities: null as string | null,
  insideStable: null as string | null,
  ramadanFullBleed: "/images/case-study-ramadan-nights.jpg",
  bathurstDeployment: "/images/case-study-bathurst-1000.jpg",
  bathurstMonitoringWall: null as string | null,
};

export const heroFacts: { icon: LucideIcon; label: string }[] = [
  { icon: Fingerprint, label: "Fingerprint & event-code access" },
  { icon: Satellite, label: "Starlink & display connectivity" },
  { icon: Droplet, label: "Bathroom & up to 200L water" },
  { icon: CalendarClock, label: "Minimum hire one week" },
];

export const configuredToOperateAs = [
  { letter: "A", role: "Security control room" },
  { letter: "B", role: "Event office" },
  { letter: "C", role: "Council office" },
  { letter: "D", role: "Promoter's operational base" },
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

export const shedComparison: {
  icon: LucideIcon;
  title: string;
  shed: string;
  moc: string;
}[] = [
  { icon: Lock, title: "Private, secure room", shed: "Additional arrangements needed", moc: "Fingerprint access + custom event codes" },
  { icon: Bolt, title: "Power & displays", shed: "Organised separately", moc: "Power, laptop & TV connectivity" },
  { icon: Satellite, title: "Internet", shed: "Organised separately", moc: "Starlink on board" },
  { icon: Droplet, title: "Water & amenities", shed: "Organised separately", moc: "Bathroom, shower, toilet, sink · mains or up to 200L" },
  { icon: Table2, title: "Operator workspace", shed: "Fit-out required", moc: "Adjustable work tables + wall space for maps" },
];

export const greenfieldFacts = {
  stat: "100+",
  statLabel:
    "security personnel were operating at the event shown in the film, with police working alongside operations teams.",
  points: [
    {
      icon: ShieldCheck,
      label:
        "A private control-room environment keeps confidential information separate from general staff movement.",
    },
    { icon: CalendarCheck, label: "Available on a minimum one-week hire." },
  ],
};

export const ramadanStats = [
  { value: "43", label: "Cameras feeding the control room" },
  { value: "9 yrs", label: "Supporting the event" },
  { value: "7 → 43", label: "Camera growth as the event grew", split: true },
  { value: "403", label: "Stallholders" },
];

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
    body: "Feeds are monitored from one secure room on site.",
    highlight: true,
  },
  {
    icon: Footprints,
    title: "Operational response",
    body: "Security, police and event management see what's happening and make operational decisions.",
  },
];

export const stakeholders = [
  { name: "Council", use: "Crowd flow and event oversight" },
  { name: "Security", use: "Crowd behaviour and operational monitoring" },
  { name: "Police", use: "Monitoring and response" },
];

export const bathurstSteps = [
  {
    title: "Identify",
    body: "Spot queues, congestion and access issues as they develop across the site.",
    tags: ["Queues", "Congestion", "Vehicle access"],
  },
  {
    title: "Assess",
    body: "Live camera visibility from the control room shows where the operational bottleneck actually is.",
    tags: ["Live feeds", "Traffic flow"],
  },
  {
    title: "Respond",
    body: "Redirect resources, change gate deployment and manage traffic flow based on what the team can see.",
    tags: ["Gates", "Resources", "Traffic"],
    highlight: true,
  },
];

export const faqs = [
  {
    q: "What can the Mobile Operations Centre be used for?",
    a: "It can operate as a security control room, event office, council office or a promoter's operational base. At Ramadan Nights in Lakemba it served as the control room for the event's camera network.",
  },
  {
    q: "Is it suitable for greenfield sites?",
    a: "Yes. It's designed for sites where little infrastructure exists. Instead of organising power, internet, water and workspace separately around a conventional site shed, the centre brings them together in one unit.",
  },
  {
    q: "Can multiple stakeholders operate from it?",
    a: "Yes. At Ramadan Nights, council used it for crowd flow and event oversight, security for crowd behaviour and operational monitoring, and police for monitoring and response.",
  },
  {
    q: "What connectivity is available?",
    a: "The centre includes Starlink, along with laptop and TV connectivity for displaying information. At Ramadan Nights, camera feeds were transmitted to the control room through a wireless network.",
  },
  {
    q: "What facilities are included?",
    a: "Fingerprint access and custom event access codes; adjustable operator work tables; wall space for maps and event information; a separate bathroom with shower, toilet and sink; a mains water option or up to 200L of fresh water; hydraulic stabilisers; and exterior flood lighting.",
  },
  {
    q: "What is the minimum hire period?",
    a: "The minimum hire period is one week.",
  },
  {
    q: "How quickly can it be deployed?",
    a: "Timing depends on your site, location and event requirements. Contact our team with your dates and we'll confirm availability and logistics.",
  },
];

/** Narrative copy blocks, taken near-verbatim from the reference prototype. */
export const copy = {
  heroMetaLeft: "Products / Event & site operations",
  heroMetaRight: "Available for hire · Australia-wide enquiries",
  heroLead:
    "A secure, self-contained control room that brings workspace, connectivity and amenities to sites where little infrastructure exists.",
  introEyebrow: "01 — The product",
  introHeading:
    "Big events and remote sites still need a control room. This one arrives on wheels.",
  introBody:
    "The Mobile Operations Centre is a purpose-built, towable operations room. It gives event, security and council teams a private workspace with secure access, connectivity, bathroom facilities and water capability — in one unit, on the site where it's needed.",
  introPhotoCaption: "Fitted for secure, private operations on greenfield event sites.",
  stepInsideEyebrow: "02 — Walkthrough",
  stepInsideLead:
    "Walk through the unit from the door to the stabilisers — access, workspace, connectivity and the facilities that let a team stay on site through a long operation.",
  greenfieldEyebrow: "03 — Built for greenfield operations",
  greenfieldHeading: "A site shed is a room. An operation needs a base.",
  greenfieldBody:
    "On a greenfield event site there's often nothing to plug into. A conventional site shed still needs power, internet, water and a usable workspace organised separately. The Mobile Operations Centre brings those together in one private, secured unit.",
  ramadanFor: "For Canterbury-Bankstown City Council",
  ramadanLead:
    "A camera network spread through the event space, feeding one control room — for every night of Ramadan.",
  ramadanVideoCaption:
    "The system began with seven cameras and expanded year on year alongside the event, operating throughout Ramadan.",
  networkEyebrow: "Ramadan Nights · How the network works",
  networkHeading: "From a camera on the street to a decision in the room.",
  stakeholdersEyebrow: "Ramadan Nights · Stakeholders",
  stakeholdersHeading: "One operations centre. Three ways of using it.",
  stakeholdersBody:
    "Council, security and police shared the same room and the same feeds — each for their own operational purpose.",
  bathurstEyebrow: "05 — Deployment",
  bathurstLead:
    "Operational visibility over queues, gates and vehicle access — so teams can see a bottleneck forming and move resources to meet it.",
  faqEyebrow: "06 — Questions",
  faqHeading: "Planning an operation?",
  faqBody:
    "If your question isn't covered here, our team can talk through your site, dates and requirements.",
  enquireEyebrow: "07 — Enquire",
  enquireHeading: "Bring the control room to your site",
  enquireBody:
    "Tell us about your event or site — location, dates and who'll be working from the centre. We'll come back to you on availability and how the unit can be set up for your operation.",
};

export const subNavLinks = [
  { href: "#inside", label: "Inside" },
  { href: "#greenfield", label: "Greenfield" },
  { href: "#ramadan", label: "Ramadan Nights" },
  { href: "#network", label: "Network" },
  { href: "#bathurst", label: "Bathurst" },
  { href: "#faq", label: "FAQ" },
];
