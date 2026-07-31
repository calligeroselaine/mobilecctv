"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Some browsers ignore the `muted` attribute on first paint (a known
  // autoplay gotcha) — setting the property directly guarantees autoplay
  // isn't blocked for lacking user interaction.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden md:h-[90vh]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/onsite-trailer-2018.jpg"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/mobile-cctv-hero.mp4" type="video/mp4" />
        {/* Fallback for browsers that can't play the video at all. */}
        <img
          src="/images/onsite-trailer-2018.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </video>

      <div className="absolute inset-0 bg-ink/50" />

      <div className="relative z-10 flex h-full items-center">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-eyebrow font-bold uppercase text-brand-light">
              Deliver surveillance to any location with
            </p>
            <h1 className="text-h1 md:text-display mt-2 text-white">
              Mobile CCTV Trailers &amp; Pole Cameras
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/90">
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
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
