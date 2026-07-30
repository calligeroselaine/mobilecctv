import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, BadgeCheck, ShieldCheck, Flag } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/business";
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

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Mobile CCTV Solutions" crumbs={[{ label: "About" }]} />

      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="On Site"
            title="Our Team At Work"
            align="center"
          />
          <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/team-on-site.jpg"
              alt="Mobile CCTV Solutions team members on site with a deployed trailer"
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              priority
              className="object-cover"
            />
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

      <Section tone="ink">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2">Licence &amp; Registration</h2>
          <p className="mt-4 text-steel-200">
            {business.legalName}
            <br />
            {business.licence}
            <br />
            ABN {business.abn}
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="inverse">
              Request A Quote
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
