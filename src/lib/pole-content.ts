import type { LucideIcon } from "lucide-react";
import { Camera, Wifi, Monitor, Sun, Trophy, HardHat, TreePine, Tractor, Trash2, Route } from "lucide-react";
import { contactHref } from "@/lib/contactHref";

/**
 * Content for /pole-cameras. Product facts come from the existing Mobi
 * Pole Cam copy and spec sheet; deployment facts come from the
 * client-supplied Sydney Marathon and Bathurst material and the client's
 * film descriptions. Do not add specifications or outcomes beyond these.
 */

export const poleVideos = {
  demo: "5L7z6ebtFxc",
  remote: "dQxTazKDmas",
  connectivity: "G6JusR5Hhbo",
  bathurst: "PiD1l1gTnbI",
  construction: "Ic6c_XASMSk",
};

export const poleImages = {
  hero: "/images/pole-cam-product-photo.jpg",
  intro: "/images/solar-cctv-pole-cam.jpg",
  product: "/images/pole-camera.png",
  marathon: "/images/case-study-sydney-marathon-cameras.jpg",
};

export const poleCta = {
  hire: contactHref({ engagement: "Hire", solution: "Pole Camera" }),
  purchase: contactHref({ engagement: "Purchase", solution: "Pole Camera" }),
  brochure: "/docs/MobileCCTV_MobiPoleCam.pdf",
};

export const poleCopy = {
  heroMeta: "Products / Temporary & remote surveillance",
  heroLead:
    "Pole cameras extend surveillance into temporary, remote and hard-to-cover locations, without the need to build permanent CCTV infrastructure.",
  introEyebrow: "01 — The product",
  introHeading: "A standalone, solar-powered camera for places with no power or network.",
  introBody: [
    "The Mobi Pole Cam is a remote-view-enabled surveillance system built for CCTV in locations without network or power infrastructure, including trouble-spot monitoring in almost any area.",
    "It suits permanent sites such as parks, farms and streets, and temporary sites such as events or illegal rubbish dumping areas.",
  ],
  capabilitiesEyebrow: "02 — What it does",
  capabilitiesHeading: "How a pole camera works.",
  statement: "Visibility where permanent CCTV doesn't exist.",
  actionEyebrow: "03 — In action",
  actionHeading: "Product in action",
  applicationsEyebrow: "04 — Where it's used",
  applicationsHeading: "Can you see your situation here?",
  deploymentsEyebrow: "05 — Real-world deployments",
  faqEyebrow: "06 — Practical questions",
  faqHeading: "Before you enquire.",
};

export type PoleTheme = { num: string; icon: LucideIcon; title: string; lead: string; items: string[] };

export const poleThemes: PoleTheme[] = [
  {
    num: "01",
    icon: Camera,
    title: "Visibility",
    lead: "Clear pictures, day and night.",
    items: [
      "6.0MP fixed IP camera with IR for night vision, or a 4.0MP mini IP PTZ dome with IR",
      "4x lossless optical zoom and pan-tilt-zoom control on the PTZ model",
      "40W LED area light with microwave motion detection, customisable to your needs",
    ],
  },
  {
    num: "02",
    icon: Wifi,
    title: "Connectivity",
    lead: "Its own link back to the people who need it.",
    items: [
      "High-speed 3G/4G modem router for remote view anywhere*",
      "Starlink connectivity is used in some deployments, as shown in the films",
    ],
  },
  {
    num: "03",
    icon: Monitor,
    title: "Remote access",
    lead: "Watch live or review later, from anywhere.",
    items: [
      "Live view or playback from the cloud on any device, 24/7",
      "Recording is cloud-based and exclusive to Mobile CCTV Solutions",
      "A hirer can be given a viewing link to see the relevant cameras from their own office",
    ],
  },
  {
    num: "04",
    icon: Sun,
    title: "Flexible deployment",
    lead: "Place it where the risk is, not where the power is.",
    items: [
      "Runs standalone on a 75W solar panel and a 41.6Ah lithium iron phosphate battery",
      "Up to 2 days from a full charge in cloudy conditions",
      "No mains power or network infrastructure needed on site",
    ],
  },
];

export const poleAction = {
  primary: {
    label: "Camera clarity, movement and connectivity",
    caption:
      "A standalone camera on Starlink at a real deployment. In this demonstration the operator reads a vehicle number plate on screen. It is an example from one deployment, not a range specification.",
  },
  remote: {
    label: "Remote stakeholder viewing",
    caption: "A hirer sees the relevant cameras from their own office through a viewing link.",
  },
  connectivity: {
    label: "Connectivity at scale",
    caption:
      "At Mount Panorama (Bathurst 12 Hour), a checkpoint operated 24 hours with the control room a couple of kilometres away, over 5G and Starlink. Starlink helps reduce reliance on local mobile towers when networks are congested at large events.",
  },
};

export const poleApplications: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Trophy, title: "Events and race weekends", text: "Temporary venues and checkpoints" },
  { icon: Route, title: "City-wide events", text: "Coverage along a course or across locations" },
  { icon: HardHat, title: "Construction sites", text: "Vulnerable gates and access points" },
  { icon: TreePine, title: "Parks and streets", text: "Public spaces without CCTV" },
  { icon: Tractor, title: "Farms and remote sites", text: "No power or network on site" },
  { icon: Trash2, title: "Illegal dumping areas", text: "Trouble-spot monitoring" },
];

export const marathon = {
  client: "Pont3",
  project: "TCS Sydney Marathon",
  place: "Sydney, NSW",
  tagline: "Temporary coverage across a moving, city-wide event.",
  stats: [
    { value: "4 years", label: "Consecutive Sydney Marathons" },
    { value: "0", label: "Major incidents", sub: "at Sydney Marathon" },
  ],
  challenge:
    "The TCS Sydney Marathon isn't contained in a venue. Equipment and infrastructure had to be protected across the course before race day. On race day the requirement changed: organisers needed visibility of the runner muster areas, the race start and changing road conditions through a live, city-wide event.",
  solution:
    "Pole Cameras and Mobile CCTV Trailers were installed at key locations before race day, protecting equipment and infrastructure overnight. On race day the same cameras became part of the event-management network, giving visibility in places where permanent CCTV coverage wasn't available.",
  result:
    "Event teams could see exactly when the first and last runners left each corral, information that mattered for managing race movements and reopening roads on schedule. Every runner group departed on time, roads reopened to schedule and no major incidents were recorded.",
  proof: "Pont3 has returned to Mobile CCTV Solutions for the TCS Sydney Marathon for four consecutive years.",
  imageAlt: "Pole camera units staged on a mat ready for the TCS Sydney Marathon deployment",
};

export const bathurst = {
  client: "Guardian Venue Management",
  project: "Supercars Bathurst 1000",
  place: "Bathurst, NSW",
  tagline: "A very large temporary venue where much of the ground had no permanent CCTV.",
  stats: [
    { value: "10", label: "Event pole cameras" },
    { value: "28", label: "Temporary CCTV streams" },
  ],
  challenge:
    "Bathurst is a huge temporary event environment with areas where permanent CCTV simply doesn't exist: entry and exit points, vehicle checkpoints, crowded public spaces and temporary bar areas. Guardian Venue Management needed visibility across all of them.",
  solution:
    "Mobile CCTV Solutions deployed 10 event Pole Cameras alongside two Mobile CCTV Trailers. Together they produced 28 live temporary CCTV streams, run alongside more than 30 existing local CCTV feeds, so the team could watch the areas that mattered rather than depending on fixed camera positions.",
  result:
    "The security team could see crowd and vehicle movement as it happened and redirect resources before issues developed, across a race weekend attracting more than 150,000 patrons and 20,000 campers.",
  proof:
    "Guardian Venue Management is a repeat client and rebooked Mobile CCTV Solutions for a further two Bathurst race events in 2026.",
  rolesTitle: "One temporary camera, several jobs",
  rolesIntro: "Filmed at Mount Panorama, a single pole camera served several operational roles:",
  roles: [
    "Watching a restricted gate while the track is active",
    "Supporting a camper search and checkpoint at night",
    "Showing staff and checkpoint activity",
    "Making issues visible back at event control",
  ],
};

export const construction = {
  eyebrow: "Also on construction sites",
  title: "A gate, watched from afar",
  text: [
    "On a large school construction site, a pole camera was used to monitor a gate, capturing pedestrian and vehicle traffic. Site managers received notifications and could reach the camera remotely.",
    "The site representative reported that theft was significantly reduced.",
  ],
  note: "Part of a combined trailer and pole camera deployment at the same site.",
  reported: "Reported by the site representative in the film.",
};

export const poleFaqs = [
  {
    q: "Can I hire or buy a pole camera?",
    a: "Both. Short, mid and long-term hire is available, as well as outright purchase.",
  },
  {
    q: "What does it mount on?",
    a: "It fits a pole with a 50–60mm diameter (the pole is not included), and various mounting options are available.",
  },
  {
    q: "Can it connect to my existing system?",
    a: "Yes. It can connect to an existing VMS over 4GX or WiFi, subject to carrier coverage.",
  },
  {
    q: "How long is footage stored?",
    a: "Cloud storage options run from 7 days up to 30 days.",
  },
  {
    q: "Is a SIM card included?",
    a: "No. A SIM card is not included, and remote-view coverage depends on carrier capabilities.",
  },
];
