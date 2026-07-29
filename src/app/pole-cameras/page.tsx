import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "CCTV Mobi Pole Camera",
  description:
    "Deliver CCTV surveillance to any location with our Mobi Pole Camera. Exclusive to Mobile CCTV Solutions cloud-based recording. For hire or purchase.",
};

const specs = [
  "Efficient 75W monocrystalline silicon solar panel",
  "National coverage* remote view using 3G/4G modem",
  "Lasts up to 2 days from full charge in cloudy conditions",
  "41.6Ah lithium iron phosphate battery (LiFePO4)",
  "Built-in 40W microwave motion sensor LED area light",
  "Ø50–60mm pole mount diameter (pole not included)",
  "Various mounting options available",
  "Connect to existing VMS over 4GX or WiFi*",
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Mobi Pole Cam",
  description:
    "Standalone solar-powered pole camera for sites without power or network infrastructure, with cloud-based recording.",
  image: `${business.siteUrl}/images/solar-cctv-pole-cam.jpg`,
  brand: { "@type": "Brand", name: business.name },
};

export default function PoleCamerasPage() {
  return (
    <>
      <JsonLd data={productJsonLd} />
      <PageHero
        eyebrow="Deliver surveillance to any location with the"
        title="Mobi Pole Cam"
        crumbs={[{ label: "Pole Cameras" }]}
      />

      <Section tone="surface">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title="Deliver Surveillance To Any Location With The Mobi Pole Cam" />
            <p className="mt-4 text-steel-600">
              Our remote-view-enabled, standalone solar surveillance
              solutions are perfect in areas without network or power
              infrastructure. This can include trouble-spot monitoring, in
              almost any area.
            </p>
            <p className="mt-4 text-steel-600">
              Uses include permanent sites such as parks, farms and
              streets, and temporary sites like events or illegal rubbish
              dumping areas.
            </p>
            <div className="mt-6">
              <Button href="/contact">Contact Us</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/pole-camera-event-security.jpg"
              alt="Mobi Pole Cam deployed for event security"
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
              src="/images/solar-cctv-pole-cam.jpg"
              alt="Mobi Pole Cam solar panel and camera unit close up"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <SectionHeading title="CCTV Pole Cam Features" />
            <p className="mt-4 text-steel-600">
              Models feature a 6.0MP fixed IP camera with IR for great night
              vision, or a 4.0MP mini IP PTZ dome with IR, offering a
              versatile surveillance solution with 4x lossless optical
              zoom, pan-tilt-zoom control, and cloud-based recording
              exclusive to Mobile CCTV Solutions.
            </p>
            <p className="mt-4 text-steel-600">
              Watch live or playback from the cloud on any device 24/7,
              with cloud storage options available from 7 days up to 30
              days.
            </p>
            <p className="mt-4 text-steel-600">
              The solar panel unit features a 40W LED area light with
              microwave motion detection, which can be customised to your
              specifications. The entire system is powered by a
              rechargeable 41.6Ah Lithium Iron Phosphate (LiFePO4) battery.
              This model includes a high-speed 3G/4G modem router for
              remote view anywhere.*
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Specifications"
          title="Mobile CCTV Available For Sale Or Hire"
          align="center"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-steel-600">
          Mobile CCTV Solutions offer short, mid and long-term hire for all
          your business needs. Regardless of the size of your business or
          your requirements, there is a possibility that Mobile CCTV
          Solutions has the equipment you need.
        </p>
        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="text-steel-600">{spec}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-steel-400">
          *SIM card not included. Coverage dependent on carrier
          capabilities.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/docs/MobileCCTV_MobiPoleCam.pdf">
            Download Brochure
          </Button>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl">
              <Image
                src="/images/mobi-pole-cam-768x1024.jpg"
                alt="Mobi Pole Cam product photo"
                fill
                sizes="(min-width: 768px) 30vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <ReviewFlag note="This is the only full-size Pole Cam product photo available (768×1024) — lower resolution than ideal for this slot. Please supply a higher-res version if available." />
            </div>
          </div>
          <div>
            <SectionHeading title="Extremely Cost Effective" />
            <p className="mt-4 text-steel-600">
              The Mobile CCTV Pole Cam is an extremely versatile mobile
              surveillance security system, built for the sites your fixed
              cameras can&rsquo;t reach.
            </p>
            <div className="mt-6">
              <Button href="/contact">Request A Quote</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
