import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Users,
  Calendar,
  CalendarClock,
  Video,
  Antenna,
  MapPin,
  HardHat,
  PartyPopper,
  Trophy,
  Landmark,
  ClipboardCheck,
} from "lucide-react";
import { contactHref } from "@/lib/contactHref";

export type CaseStudyStat = {
  icon: LucideIcon;
  value: string;
  label: string;
  /** Optional second line, e.g. "at ADCO" — only set when the client's
   * reference card shows one; omitted entirely otherwise. */
  sublabel?: string;
};

export type CaseStudyMetaTag = {
  icon: LucideIcon;
  label: string;
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  projectName: string;
  metaTags: CaseStudyMetaTag[];
  challenge: string;
  solution: string;
  result: string;
  /** A real, near-verbatim excerpt of `result` — styled as a pull-quote over
   * the photo. Never invented wording, just a shorter lift from the client's
   * own supplied copy. */
  resultHighlight: string;
  /** Real repeat-business fact, only set when the client supplied one —
   * left undefined (row omitted) rather than invented. */
  whyTheyCameBack?: string;
  image: string;
  imageAlt: string;
};

export type CaseStudyCategory = {
  id: string;
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  heroImage: string;
  heroImageAlt: string;
  stats: CaseStudyStat[];
  caseStudies: CaseStudy[];
  closingCta: {
    heading: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
};

export const caseStudyCategories: CaseStudyCategory[] = [
  {
    id: "trailers",
    heroEyebrow: "Mobile CCTV Trailers",
    heroTitle: "Mobile CCTV Trailers in Action",
    heroIntro:
      "When security needs to be deployed quickly, the result matters more than the specification sheet. See how our mobile CCTV trailers are being used across construction sites and major public events.",
    heroImage: "/images/onsite-trailer-2018.jpg",
    heroImageAlt: "Mobile CCTV security trailer deployed on site",
    stats: [
      {
        icon: ShieldCheck,
        value: "0",
        label: "Break-ins",
        sublabel: "after deployment",
      },
      {
        icon: Video,
        value: "15",
        label: "Camera views",
        sublabel: "at ADCO",
      },
      {
        icon: CalendarClock,
        value: "24/7",
        label: "Continuous recording",
      },
      {
        icon: ShieldCheck,
        value: "0",
        label: "Theft or vandalism",
        sublabel: "at Granny Smith Festival",
      },
    ],
    caseStudies: [
      {
        slug: "adco-constructions",
        clientName: "ADCO Constructions",
        projectName: "The Forest High School",
        metaTags: [
          { icon: MapPin, label: "Frenchs Forest, NSW" },
          { icon: HardHat, label: "Construction" },
          { icon: ClipboardCheck, label: "Hire" },
        ],
        challenge:
          "As construction of the new Forest High School neared completion, the site had been hit by multiple break-ins and thefts, including stolen tools and copper. A back entrance had already been used during two separate break-ins.",
        solution:
          "Mobile CCTV Solutions deployed two mobile CCTV trailers across the site's main accessible areas, supported by a pole camera covering the vulnerable rear entrance. Together, the system provided 15 camera views recording 24/7. After hours, motion detection automatically alerted site managers, who could immediately access live footage remotely and see exactly who was on site.",
        result:
          "From the day the CCTV trailers became operational, there were no further break-ins and no further loss of equipment or finished components. The system also gave ADCO senior management another unexpected benefit: remote visibility of daily construction progress from head office.",
        resultHighlight:
          "From the day the CCTV trailers became operational, there were no further break-ins and no further loss of equipment.",
        whyTheyCameBack:
          "ADCO is a repeat Mobile CCTV Solutions client. Following the result at The Forest High School, management confirmed they were very happy with both the equipment and the outcome and would use Mobile CCTV Solutions again.",
        image: "/images/case-study-adco-forest-high-school.jpg",
        imageAlt: "Mobile CCTV Solutions team with ADCO Constructions staff on site at Forest High School",
      },
      {
        slug: "granny-smith-festival",
        clientName: "City of Ryde Council",
        projectName: "Granny Smith Festival",
        metaTags: [
          { icon: MapPin, label: "Eastwood, NSW" },
          { icon: PartyPopper, label: "Community Festival" },
          { icon: ClipboardCheck, label: "Hire" },
        ],
        challenge:
          "Before thousands of visitors arrived, valuable infrastructure and equipment was already sitting on an unattended festival site. City of Ryde needed to protect those assets throughout bump-in, then transition the same CCTV infrastructure into an active crowd-management and public-safety system once the festival opened.",
        solution:
          "Mobile CCTV Solutions deployed a mobile CCTV trailer and pole cameras ahead of the event, providing continuous surveillance across the site while equipment and infrastructure were most vulnerable. On festival day, that same network became a live operational tool, giving the event team visibility across busy public areas and crowd movement.",
        result:
          "No theft or vandalism was recorded during the lead-up. Once the festival opened, crowd movement remained orderly and safe, with zero major incidents from set-up through to pack-down. One deployment. Two very different security requirements. No need to install permanent infrastructure.",
        resultHighlight:
          "Crowd movement remained orderly and safe, with zero major incidents from set-up through to pack-down.",
        image: "/images/blog/granny-smith-festival.jpg",
        imageAlt: "Mobile CCTV Solutions trailer deployed at the Granny Smith Festival in Eastwood",
      },
    ],
    closingCta: {
      heading: "Need temporary CCTV coverage for your site?",
      description:
        "Whether you're protecting a construction project for months or an event site for days, we'll design the coverage around the risk.",
      buttonLabel: "Get a Quote for Mobile CCTV Trailer Hire",
      href: contactHref({ engagement: "Hire", solution: "Mobile CCTV Trailer" }),
    },
  },
  {
    id: "pole-cameras",
    heroEyebrow: "Pole Cameras",
    heroTitle: "Pole Cameras in Action",
    heroIntro:
      "Some of the most important areas to monitor are exactly where permanent CCTV isn't available. Our pole cameras extend surveillance into temporary, remote and hard-to-cover locations without the need to build permanent CCTV infrastructure.",
    heroImage: "/images/pole-cam-deployed-bushland.jpg",
    heroImageAlt: "Mobi Pole Cam mounted on a solar-powered pole against dense bushland",
    stats: [
      {
        icon: Antenna,
        value: "10",
        label: "Event pole cameras",
        sublabel: "at Bathurst",
      },
      {
        icon: Video,
        value: "28",
        label: "Temporary CCTV streams",
      },
      {
        icon: Calendar,
        value: "4 years",
        label: "Consecutive Sydney Marathons",
      },
      {
        icon: ShieldCheck,
        value: "0",
        label: "Major incidents",
        sublabel: "at Sydney Marathon",
      },
    ],
    caseStudies: [
      {
        slug: "tcs-sydney-marathon",
        clientName: "Pont3",
        projectName: "TCS Sydney Marathon",
        metaTags: [
          { icon: MapPin, label: "Sydney, NSW" },
          { icon: Trophy, label: "Major Sporting Event" },
          { icon: ClipboardCheck, label: "Project Hire" },
        ],
        challenge:
          "The TCS Sydney Marathon isn't contained inside a venue. Equipment and infrastructure must be protected across the course before race day. Then, once the event begins, organisers need visibility across runner muster areas, the race start and changing road conditions throughout a live city-wide event.",
        solution:
          "Mobile CCTV Solutions installed pole cameras and CCTV trailers across key locations before race day, protecting equipment and infrastructure overnight. On race day, those cameras became part of the event-management network. The team could monitor runner muster areas in real time and see precisely when the first and last runners left each corral — critical information for managing race movements and reopening roads on schedule.",
        result:
          "Every runner group departed on time. Road closures reopened according to schedule. And no major incidents were recorded across the event.",
        resultHighlight:
          "Every runner group departed on time, road closures reopened on schedule, and no major incidents were recorded.",
        whyTheyCameBack:
          "Pont3 has returned to Mobile CCTV Solutions for the TCS Sydney Marathon for four consecutive years.",
        image: "/images/case-study-sydney-marathon-cameras.jpg",
        imageAlt: "Pole camera equipment staged for the TCS Sydney Marathon deployment",
      },
      {
        slug: "supercars-bathurst-1000-pole-cameras",
        clientName: "Guardian Venue Management",
        projectName: "Supercars Bathurst 1000",
        metaTags: [
          { icon: MapPin, label: "Bathurst, NSW" },
          { icon: Trophy, label: "Major Motorsport Event" },
          { icon: ClipboardCheck, label: "Event Hire" },
        ],
        challenge:
          "Bathurst creates an unusual surveillance problem: a huge temporary event environment with areas where permanent CCTV simply doesn't exist. Guardian Venue Management needed visibility across entry and exit points, vehicle checkpoints, crowded public spaces and temporary bar areas throughout the event.",
        solution:
          "Mobile CCTV Solutions deployed 10 event pole cameras alongside two CCTV trailers. The temporary system generated 28 live CCTV streams, allowing the security team to monitor the areas that mattered rather than relying on fixed camera locations. Those streams were also integrated with more than 30 existing local CCTV feeds.",
        result:
          "The security team could identify crowd and vehicle movement as it happened and redirect resources before issues developed. The operation successfully supported an event attracting more than 150,000 patrons and 20,000 campers across race weekend.",
        resultHighlight:
          "The security team could identify crowd and vehicle movement as it happened and redirect resources before issues developed.",
        whyTheyCameBack:
          "Guardian Venue Management is a repeat client and rebooked Mobile CCTV Solutions for a further two Bathurst race events in 2026.",
        image: "/images/case-study-bathurst-1000.jpg",
        imageAlt: "Pole camera trailer deployed on a hill with the Mount Panorama Bathurst sign in the background",
      },
    ],
    closingCta: {
      heading: "Need cameras where your existing CCTV can't reach?",
      description:
        "We can deploy standalone pole cameras for events, public spaces, construction sites and temporary trouble spots.",
      buttonLabel: "Plan Your Pole Camera Coverage",
      href: contactHref({ engagement: "Hire", solution: "Pole Camera" }),
    },
  },
  {
    id: "mobile-operations-centre",
    heroEyebrow: "Mobile Operations Centre",
    heroTitle: "Mobile Operations Centres in Action",
    heroIntro:
      "A camera gives you visibility. A Mobile Operations Centre gives your team somewhere to use that visibility to make decisions. For major events and temporary operations, we create a fully functioning command environment where security, event management and key agencies can work from the same real-time information.",
    heroImage: "/images/mobile-operations-centre-events.jpg",
    heroImageAlt: "Mobile Operations Centre trailer branded for outdoor events",
    stats: [
      {
        icon: CalendarClock,
        value: "31",
        label: "Consecutive event nights",
      },
      {
        icon: Calendar,
        value: "7 years",
        label: "Supporting Ramadan Nights",
      },
      {
        icon: Users,
        value: "100+",
        label: "Staff per shift",
        sublabel: "at Bathurst",
      },
      {
        icon: Video,
        value: "58+",
        label: "CCTV feeds",
        sublabel: "in the Bathurst operation",
      },
    ],
    caseStudies: [
      {
        slug: "ramadan-nights",
        clientName: "Canterbury-Bankstown Council",
        projectName: "Ramadan Nights",
        metaTags: [
          { icon: MapPin, label: "NSW" },
          { icon: Landmark, label: "Community Event & Public Safety" },
          { icon: Calendar, label: "31 Nights" },
        ],
        challenge:
          "Ramadan Nights runs every night for 31 consecutive nights, bringing sustained crowds into a busy event precinct. Council needed more than cameras. Security, Police, medical teams and event management needed a central location from which they could see the event, communicate and respond quickly.",
        solution:
          "Mobile CCTV Solutions deployed a Mobile Operations Centre supported by solar-powered pole cameras and a wider camera network connected using Wi-Fi bridges. Inside the Operations Centre, Security, NSW Police, medical personnel and the event manager worked together from one central command point, with live visibility across the event footprint and surrounding areas.",
        result:
          "All 31 nights were delivered with no major incidents. The value of real-time visibility was particularly clear when an approaching weather front was identified through the CCTV network. Resources could be deployed quickly to manage the situation before it escalated.",
        resultHighlight: "All 31 nights were delivered with no major incidents.",
        whyTheyCameBack:
          "2025 marked the seventh year Mobile CCTV Solutions had been engaged for the event.",
        image: "/images/case-study-ramadan-nights.jpg",
        imageAlt: "CCTV trailer at the Ramadan Nights street festival with Lakemba Nights signage",
      },
      {
        slug: "supercars-bathurst-1000-operations-centre",
        clientName: "Guardian Venue Management",
        projectName: "Supercars Bathurst 1000",
        metaTags: [
          { icon: MapPin, label: "Bathurst, NSW" },
          { icon: Trophy, label: "Major Motorsport Event" },
          { icon: Calendar, label: "10 Days" },
        ],
        challenge:
          "Guardian Venue Management needed to run a 24-hour security operation for 10 days, with more than 100 security personnel on shift each day. They needed a functioning control room — not simply somewhere to park a desk.",
        solution:
          "Mobile CCTV Solutions deployed a fully equipped Mobile Operations Centre as the security team's command post. Up to four operators could work from the Centre simultaneously, with communications, internet and workstations available on site. The Operations Centre brought together 28 temporary CCTV streams plus more than 30 existing local CCTV feeds, giving the security team a consolidated view of the event. A separate CCTV workstation was also installed in the client's management office.",
        result:
          "Instead of teams operating from fragmented information, security management could see crowd and vehicle movements live and redirect personnel and resources before pressure points developed. The Mobile Operations Centre became the operational home base for the entire security team throughout the event.",
        resultHighlight:
          "Security management could see crowd and vehicle movements live and redirect personnel and resources before pressure points developed.",
        whyTheyCameBack:
          "Guardian Venue Management is a repeat customer and subsequently booked Mobile CCTV Solutions for another two race events at Bathurst.",
        image: "/images/case-study-bathurst-1000.jpg",
        imageAlt: "Pole camera trailer deployed on a hill with the Mount Panorama Bathurst sign in the background",
      },
    ],
    closingCta: {
      heading: "Need a control room where one doesn't exist?",
      description:
        "Our Mobile Operations Centres can be deployed with the technology, connectivity and CCTV network required to run complex temporary operations from one location.",
      buttonLabel: "Talk to Us About Your Event or Operation",
      href: "/contact",
    },
  },
];
