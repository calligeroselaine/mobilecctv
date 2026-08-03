import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * Preserves the old site's page structure — Trailers, then Pole Cameras,
 * then Rent Or Purchase — as three alternating image/text blocks directly
 * under the homepage video, instead of the shorter card-grid summary
 * further down the page.
 */
export function ProductHighlights() {
  return (
    <>
      <Section tone="surface">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title="Mobile CCTV Trailers" />
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
              systems. Each trailer has its own internet connection and
              network recorder which can be remotely and securely accessed
              from any computer or mobile compatible device, anywhere in
              the world.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/mobile-cctv-trailers" variant="secondary">
                Find Out More
              </Button>
              <Button href="/contact">Request A Quote</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/mine-cam-cctv.jpg"
              alt="Mobile CCTV trailer camera deployed on a construction site"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:order-1">
            <Image
              src="/images/pole-camera.png"
              alt="Mobi Pole Cam solar-powered surveillance unit"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-contain"
            />
          </div>
          <div className="md:order-2">
            <SectionHeading title="Pole Cameras" />
            <p className="mt-4 text-steel-600">
              Deliver surveillance to any location with the Mobi Pole Cam.
              Our remote-view-enabled, standalone solar surveillance
              solutions are perfect for areas without network or power
              infrastructure — including trouble-spot monitoring, in
              almost any area.
            </p>
            <p className="mt-4 text-steel-600">
              Uses include permanent sites such as parks, farms and
              streets, and temporary sites like events or illegal rubbish
              dumping areas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/pole-cameras" variant="secondary">
                Find Out More
              </Button>
              <Button href="/contact">Request A Quote</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title="Rent Or Purchase" />
            <p className="mt-4 text-steel-600">
              Mobile CCTV Solutions caters for all short and long term
              leases and purchase options. Contact us today!
            </p>
            <div className="mt-6">
              <Button href="/contact">Ask Us How</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/hero-fullbleed-poster.jpg"
              alt="Mobile CCTV Solutions trailer deployed on a residential lawn"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
