import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, BadgeCheck, ShieldCheck, Flag } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Mobile CCTV Solutions is an Australian-owned, licensed security specialist providing mobile CCTV trailers and pole cameras Australia-wide.",
  path: "/about",
  image: {
    src: "/images/office-security-via-entrance.jpg",
    width: 1000,
    height: 665,
    alt: "Mobile CCTV Solutions site security in operation",
  },
});

const pillars = [
  {
    icon: MapPin,
    title: "Australia-Wide Capability",
    description:
      "Mobile CCTV Solutions provide high-quality security management services Australia-wide, operating out of Sydney's Northern Beaches with Perth coming soon.",
  },
  {
    icon: BadgeCheck,
    title: "Extensive Experience",
    description:
      "We have extensive experience in managing security for a wide range of companies and organisations, small and large — from single-site businesses to metro and regional councils.",
  },
  {
    icon: ShieldCheck,
    title: "Cost-Effective, Compliance-Led Planning",
    description:
      "We understand that for most businesses, security is a side activity often not supported by dedicated resources — so our approach is to maximise your protection while minimising your expenditure. We are experts in security compliance and in identifying hazards and putting in place effective plans and solutions.",
  },
  {
    icon: Flag,
    title: "Australian-Owned",
    description:
      "Mobile CCTV Solutions is an Australian-owned company. We strongly believe in corporate responsibility, and that a truly visionary business is not just about being successful today but about investing in the future.",
  },
];

const michaelBio = [
  "A temporary site should never mean substandard security. For years it did. If you ran a street festival, a construction site or a remote worksite, nothing on the market could give you the coverage a permanent venue takes for granted. You got less, and the industry accepted it.",
  "Michael Malligan didn\u2019t. He knew what the standard should be, because he works to it every day. So in 2016 he and Ryan Lotzof, a fellow electrician he had worked alongside in security for almost 20 years, built what was missing.",
  "Michael is an alarm technician and electrician by trade, with decades in high-quality security and personal protection. He builds the systems, and he runs the operations that depend on them.",
  "Qudos Bank Arena (now Afterpay Arena), Australia\u2019s largest indoor arena, has been his security client for more than seven years. He designed and built its security control room, its CCTV and its facial recognition technology, and his team continue to service all of it.",
  "His protection work runs from one person to an entire line-up. He protects high-profile, high-risk and high-net-worth individuals. Several NRL teams bring him in to consult and protect. He travels domestically and internationally with sporting teams and touring music acts, and he owns Anchor Security, a team of more than 120.",
  "Councils and law enforcement rely on Michael\u2019s guidance. At major events they work side by side with medical and security teams from our Mobile Operations Centre. One council has worked with us for nine years, and its coverage is now six times what it started with.",
  "Construction companies, ports, mines and government departments across Australia use what Michael and Ryan built too. At the Bathurst 1000 Supercars, much of Mount Panorama had no CCTV at all, so we bring it all in: pole cameras, camera trailers and our Mobile Operations Centre, in a setup that has grown with every booking.",
  "Whether your site stands for a day or for months, it gets the same standard. Every client we\u2019ve worked with has rebooked.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Mobile CCTV Solutions" crumbs={[{ label: "About" }]} />

      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="On Site"
            title="Meet The Team"
            align="center"
          />
          <div className="relative mt-8 aspect-[5/4] w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/team-meet-the-team.jpg"
              alt="Two Mobile CCTV Solutions team members at a night event"
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-12 border-t border-steel-200 pt-10">
            <p className="text-eyebrow font-bold uppercase text-brand">Founder</p>
            <h3 className="text-h3 mt-2">Michael Malligan</h3>
            <div className="mt-5 space-y-4 text-steel-600">
              {michaelBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            title="Security Specialists, Not Just Equipment Hire"
            align="center"
          />
          <p className="mt-4 text-lg text-steel-600">
            Mobile CCTV Solutions can supplement your security guards,
            mobile patrols and fixed CCTV camera requirements with our
            mobile CCTV surveillance TrailerCams. We put people first,
            understanding that real trust and integrity is essential in the
            provision of security services — that philosophy underpins
            everything we do.
          </p>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-steel-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-h3 mt-4">{title}</h3>
              <p className="mt-2 text-steel-600">{description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
