"use client";

import { useState } from "react";
import { CheckCircle2, Play } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { business } from "@/lib/business";

const reasons = [
  `Australian-owned and fully licensed (${business.licence}), with a strong focus on security compliance and hazard planning.`,
  "Extensive experience managing security for organisations of every size, from single-site businesses to metro councils.",
  "A people-first approach — real trust and integrity underpin every deployment, not just the equipment.",
  "Focused on maximising your protection while minimising your expenditure, rather than a one-size-fits-all package.",
];

/**
 * Pairs the credibility bullets with the "hear it from our team" clip in
 * one section, rather than as two separate homepage blocks. Click-to-play
 * (not autoplay) for the same reason as before: it's someone talking, so it
 * shouldn't start making noise before the visitor asks for it.
 */
export function WhyUs() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section tone="surface">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Why Mobile CCTV Solutions" title="Security Specialists, Not Just Equipment Hire" />
          <ul className="mt-6 space-y-4">
            {reasons.map((reason) => (
              <li key={reason} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <span className="text-steel-600">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-xs">
          {playing ? (
            <video
              autoPlay
              controls
              playsInline
              preload="metadata"
              poster="/images/team-overview-poster.jpg"
              className="aspect-[9/16] w-full rounded-xl bg-ink object-cover shadow-xl"
            >
              <source src="/videos/team-overview.mp4" type="video/mp4" />
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video: Hear it from our team"
              className="group relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-xl bg-ink shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              style={{
                backgroundImage: "url(/images/team-overview-poster.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-105">
                <Play className="h-6 w-6 translate-x-0.5 text-brand" fill="currentColor" aria-hidden="true" />
              </span>
              <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-semibold text-white">
                Hear it from our team
              </span>
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
