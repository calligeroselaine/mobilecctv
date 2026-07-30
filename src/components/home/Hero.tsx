import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-surface-alt">
      <Container className="grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-eyebrow font-bold uppercase text-brand">
            Deliver surveillance to any location with
          </p>
          <h1 className="text-h1 md:text-display mt-2">
            Mobile CCTV Trailers &amp; Pole Cameras
          </h1>
          <p className="mt-4 max-w-lg text-lg text-steel-600">
            Cost-effective, solar-powered CCTV trailers and mobile security
            cameras for sale or hire across Australia — protecting
            construction sites, events and remote locations, engineered and
            operated by an Australian-owned, licensed security specialist.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Request A Quote</Button>
            <Button href="/mobile-cctv-trailers" variant="secondary">
              View Our Trailers
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src="/images/onsite-trailer-2018.jpg"
            alt="Mobile CCTV security trailer deployed on site, with camera mast raised"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
