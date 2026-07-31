"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Some browsers ignore the `muted` attribute on first paint (a known
  // autoplay gotcha) — setting the property directly guarantees autoplay
  // isn't blocked for lacking user interaction.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

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

        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/trailer-showcase-poster.jpg"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/trailer-showcase.mp4" type="video/mp4" />
            {/* Fallback for browsers that can't play the video at all. */}
            <img
              src="/images/trailer-showcase-poster.jpg"
              alt="Mobile CCTV Solutions trailer deployed on site"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </video>
        </div>
      </Container>
    </section>
  );
}
