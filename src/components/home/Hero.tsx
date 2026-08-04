"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribeToDesktopQuery(callback: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getIsDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getIsDesktopServerSnapshot() {
  return false;
}

/**
 * Cinematic video hero — now a supporting visual for the headline and
 * subhead only. The three pathway cards (the actual decision-tree CTA)
 * render in PathwayCards, directly below this section.
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  // Skip the video entirely on small screens and for prefers-reduced-motion
  // — the poster image renders instead, so mobile never fetches the video
  // file at all (perf) and motion-sensitive visitors never see it move.
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopQuery,
    getIsDesktop,
    getIsDesktopServerSnapshot
  );
  const showVideo = isDesktop && !shouldReduceMotion;

  useEffect(() => {
    // Some browsers ignore the `muted` attribute on first paint (a known
    // autoplay gotcha) — setting the property directly guarantees autoplay
    // isn't blocked for lacking user interaction.
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, [showVideo]);

  return (
    <section className="relative flex min-h-[52vh] items-center overflow-hidden py-16 md:min-h-[58vh] md:py-20">
      {/* Both the video and its fallback image are absolutely positioned
          inside the same box, so swapping between them never shifts layout. */}
      <div className="absolute inset-0">
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-fullbleed-poster.jpg"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero-fullbleed.mp4" type="video/mp4" />
            {/* Fallback for browsers that can't play the video at all. */}
            <img
              src="/images/hero-fullbleed-poster.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </video>
        )}
        {!showVideo && (
          <Image
            src="/images/hero-fullbleed-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative z-10 w-full">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-h1 md:text-display text-white">
              Protect what matters.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/90">
              Choose the option that best describes your needs and
              we&rsquo;ll show you the right solution.
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
