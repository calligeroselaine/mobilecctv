"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * A personal, unpolished (in a good way) clip of the team talking through
 * what they do. Click-to-play rather than autoplay — she's talking, so it
 * shouldn't start making noise (or grabbing attention) before the visitor
 * asks for it. Self-hosted, so this is a plain <video> swapped in on click
 * rather than the iframe-based VideoEmbed facade used for YouTube/Vimeo.
 */
export function TeamOverviewVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section tone="surface">
      <SectionHeading title="Hear It From Our Team" align="center" />

      <div className="mx-auto mt-8 max-w-sm">
        {playing ? (
          <video
            autoPlay
            controls
            playsInline
            preload="metadata"
            poster="/images/team-overview-poster.jpg"
            className="aspect-[9/16] w-full rounded-2xl bg-ink object-cover shadow-2xl"
          >
            <source src="/videos/team-overview.mp4" type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play video: Hear it from our team"
            className="group relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-2xl bg-ink shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            style={{
              backgroundImage: "url(/images/team-overview-poster.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-105">
              <Play className="h-7 w-7 translate-x-0.5 text-brand" fill="currentColor" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
    </Section>
  );
}
