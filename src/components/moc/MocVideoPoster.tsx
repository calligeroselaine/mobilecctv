"use client";

import { useState } from "react";
import type { MocVideo } from "@/lib/moc-content";

type PlayVariant = "glass-circle" | "solid-circle" | "square-notch-left" | "square-notch-right" | "outline-wide";

type MocVideoPosterProps = {
  video: MocVideo;
  title: string;
  variant: PlayVariant;
  /** Small text shown next to the play control, e.g. "Watch the walkthrough". */
  caption?: string;
  /** Secondary caption below the caption, e.g. "Door to stabilisers". */
  subCaption?: string;
  className?: string;
};

/**
 * Click-to-load YouTube poster for the Mobile Operations Centre page.
 * Mirrors the site's existing VideoEmbed click-to-load pattern (no iframe
 * — and no player script — until the visitor clicks play) but supports
 * the varied aspect ratios (9/16, 21/9) and play-button treatments the
 * design calls for, which the shared VideoEmbed component doesn't.
 */
export function MocVideoPoster({ video, title, variant, caption, subCaption, className = "" }: MocVideoPosterProps) {
  const [playing, setPlaying] = useState(false);
  const [posterSrc, setPosterSrc] = useState(
    `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`
  );

  const aspectClass = video.aspect === "21/9" ? "aspect-[21/9]" : "aspect-[9/16]";

  if (playing) {
    return (
      <div className={`relative w-full overflow-hidden bg-black ${aspectClass} ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className={`group relative block w-full overflow-hidden bg-black ${aspectClass} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not an optimisable local asset */}
      <img
        src={posterSrc}
        alt=""
        loading="lazy"
        onError={() => setPosterSrc(`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <PlayOverlay variant={variant} caption={caption} subCaption={subCaption} label={video.label} />
    </button>
  );
}

function PlayOverlay({
  variant,
  caption,
  subCaption,
  label,
}: {
  variant: PlayVariant;
  caption?: string;
  subCaption?: string;
  label: string;
}) {
  if (variant === "glass-circle") {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        <div className="absolute inset-x-6 bottom-6 flex items-center gap-4">
          <div className="grid h-19 w-19 shrink-0 place-items-center rounded-full border border-white/60 bg-white/15 backdrop-blur transition-transform group-hover:scale-105" style={{ width: 76, height: 76 }}>
            <PlayTriangle color="#F2F0EB" />
          </div>
          <div className="flex flex-col gap-1 text-left">
            {caption && <span className="text-xl font-medium text-[#F2F0EB]">{caption}</span>}
            {subCaption && (
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#C9CCCF]">{subCaption}</span>
            )}
          </div>
        </div>
      </>
    );
  }

  if (variant === "solid-circle") {
    return (
      <>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="grid place-items-center rounded-full bg-[#F2F0EB] transition-transform group-hover:scale-105"
            style={{ width: 84, height: 84 }}
          >
            <PlayTriangle color="#141619" />
          </div>
        </div>
        <div className="sr-only">{label}</div>
      </>
    );
  }

  if (variant === "square-notch-left" || variant === "square-notch-right") {
    const isLeft = variant === "square-notch-left";
    return (
      <div
        className={`absolute bottom-0 ${isLeft ? "left-0" : "right-0"} flex items-center gap-3.5 bg-[#0F1113] py-4 pr-5 pl-0`}
        style={isLeft ? undefined : { paddingLeft: 22, paddingRight: 0 }}
      >
        {isLeft && (
          <div className="grid h-13 w-13 shrink-0 place-items-center bg-[color:oklch(0.74_0.14_70)]" style={{ width: 52, height: 52 }}>
            <PlayTriangle color="#141619" small />
          </div>
        )}
        {caption && <span className="text-base font-medium text-[#F2F0EB]">{caption}</span>}
        {!isLeft && (
          <div className="grid h-13 w-13 shrink-0 place-items-center bg-[#F2F0EB]" style={{ width: 52, height: 52 }}>
            <PlayTriangle color="#141619" small />
          </div>
        )}
      </div>
    );
  }

  // outline-wide — Bathurst's cinematic 21/9 poster
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      <div className="absolute left-5 top-1/2 flex -translate-y-1/2 flex-col items-start gap-4 text-[#F2F0EB] sm:left-12">
        <div
          className="grid place-items-center rounded-full border border-white/70"
          style={{ width: "clamp(64px,6vw,88px)", height: "clamp(64px,6vw,88px)" }}
        >
          <PlayTriangle color="#F2F0EB" />
        </div>
        {caption && <span className="max-w-[300px] text-left text-lg font-medium leading-tight sm:text-2xl">{caption}</span>}
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#C9CCCF]">{label}</span>
      </div>
    </>
  );
}

function PlayTriangle({ color, small = false }: { color: string; small?: boolean }) {
  const size = small ? { left: 14, top: 9, bottom: 9, ml: 4 } : { left: 20, top: 12, bottom: 12, ml: 6 };
  return (
    <div
      style={{
        width: 0,
        height: 0,
        borderTop: `${size.top}px solid transparent`,
        borderBottom: `${size.bottom}px solid transparent`,
        borderLeft: `${size.left}px solid ${color}`,
        marginLeft: size.ml,
      }}
    />
  );
}
