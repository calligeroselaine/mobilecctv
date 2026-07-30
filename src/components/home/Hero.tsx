import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

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

        <VideoEmbed
          youtubeId="kSxTWknToEY"
          title="Mobile CCTV Trailer overview"
          posterSrc="/images/onsite-trailer-2018.jpg"
        />
      </Container>
    </section>
  );
}
