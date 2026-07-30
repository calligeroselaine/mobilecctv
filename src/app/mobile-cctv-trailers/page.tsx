import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { business, quoteMailto } from "@/lib/business";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Mobile CCTV Trailers & Trailer Hire",
  description:
    "Solar-powered mobile CCTV trailers for sale or hire across Australia. Ideal for construction site CCTV and temporary site security — deployed in minutes, monitored remotely.",
  path: "/mobile-cctv-trailers",
  image: {
    src: "/images/mobile-cctv-trailers.jpg",
    width: 1106,
    height: 626,
    alt: "Mobile CCTV trailer with solar panels and camera mast",
  },
});

const features = [
  "360° camera view — independent day/night lenses",
  "360° PIR detection — up to 60m diameter",
  "360° LAN, 4G & WiFi — up to 60m diameter",
  "PA system — remote announcement",
  "360° flood lighting — up to 60m diameter",
  "Audible siren & strobe — auto activation on detection",
  "Notifications — on low battery, generator start/stop",
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Mobile CCTV Trailer Camera",
  description:
    "Solar-powered, towable surveillance trailer with 360° camera coverage, PIR detection and remote live access.",
  image: `${business.siteUrl}/images/mobile-cctv-trailers.jpg`,
  brand: { "@type": "Brand", name: business.name },
};

export default function TrailersPage() {
  return (
    <>
      <JsonLd data={productJsonLd} />
      <PageHero
        eyebrow="Deliver surveillance to any location with"
        title="Mobile CCTV Trailer Camera"
        crumbs={[{ label: "Mobile CCTV Trailers" }]}
      />

      <Section tone="surface">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title="Mobile CCTV Solutions Trailer Camera" />
            <p className="mt-4 text-steel-600">
              Mobile CCTV Solutions trailer cameras are a cost-effective,
              solar-powered CCTV trailer solution — available for mobile
              CCTV trailer hire or purchase Australia-wide — designed to
              protect your valuable business assets, including construction
              site CCTV coverage and temporary site security.
            </p>
            <p className="mt-4 text-steel-600">
              Our trailers can both complement and replace traditional
              static security guards, mobile patrols, and fixed CCTV camera
              systems. The units are capable of recording and transmitting
              live video images across 4GX networks.
            </p>
            <p className="mt-4 text-steel-600">
              Each trailer has its own internet connection and network
              recorder which can be remotely and securely accessed from any
              computer or mobile compatible device from around the world.
              Mobile CCTV Solutions use 100% solar-powered technology with a
              diesel generator for emergency backup.
            </p>
            <div className="mt-6">
              <Button href="/contact">Contact Us</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/mine-cam-cctv.jpg"
              alt="Mobile CCTV trailer camera deployed on a mine site"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:order-2">
            <Image
              src="/images/cctv-solar-panels.jpg"
              alt="Solar panels powering a Mobile CCTV Solutions trailer"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <SectionHeading title="A Solar-Powered, Self-Sufficient Solution" />
            <p className="mt-4 text-steel-600">
              Our CCTV trailer cameras are self-sufficient in operation for
              months on end, without mains power connection or diesel fuel
              generators. Up-to-the-second live footage and historical event
              recording can be remotely viewed by multiple users. Combined
              with PIR motion detection, our trailers can be programmed to
              send alarm signalling messages to security control rooms,
              network centres, PCs or handheld mobile devices.
            </p>
            <p className="mt-4 text-steel-600">
              Our systems can also be programmed to activate flood
              lighting, audible sirens, strobes, and control PTZ camera
              positioning to the area of detection.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Specifications"
          title="CCTV Trailer Available For Sale Or Hire"
          align="center"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-steel-600">
          Mobile CCTV Solutions offer short, mid and long-term security
          trailer hire for all your business needs. Regardless of the size
          of your business or your requirements, there is a possibility
          that Mobile CCTV Solutions has the equipment you need.
        </p>
        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="text-steel-600">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href="/docs/Mobile-CCTV-Solution-Brochure.pdf" download>
            Download Brochure
          </Button>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="Watch"
          title="Mobile CCTV Trailer Walkthrough"
          align="center"
        />
        <div className="mx-auto mt-8 max-w-2xl">
          <VideoEmbed
            youtubeId="S-Ehp6-3p1Q"
            title="Mobile CCTV Trailer by Mobile CCTV Solutions"
            posterSrc="/images/mine-cam-cctv.jpg"
          />
        </div>
      </Section>

      <Section tone="brand" className="text-center">
        <h2 className="text-h2">Extremely Cost Effective</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/90">
          The Mobile CCTV Trailer Camera is an extremely versatile mobile
          surveillance security system. Supplement security guards, mobile
          patrols and fixed CCTV cameras — deployed quickly and easily with
          no locked-in contracts, at around 25% of the cost of a 24-hour
          static guard.
        </p>
        <div className="mt-6">
          <Button href={quoteMailto} variant="inverse">
            Request A Quote
          </Button>
        </div>
      </Section>
    </>
  );
}
