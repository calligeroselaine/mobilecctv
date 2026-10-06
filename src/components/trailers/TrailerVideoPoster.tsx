"use client";

import { useState } from "react";

type Props = {
  youtubeId: string;
  title: string;
  label: string;
  caption?: string;
  className?: string;
  /** Portrait (9:16) video — shown vertically instead of letterboxed in a 16:9 block. */
  vertical?: boolean;
};

/** Click-to-load YouTube poster (16:9, or 9:16 when `vertical`) — no iframe until the visitor clicks. */
export function TrailerVideoPoster({ youtubeId, title, label, caption, className = "", vertical = false }: Props) {
  const aspect = vertical ? "aspect-[9/16]" : "aspect-video";
  const [playing, setPlaying] = useState(false);
  const [poster, setPoster] = useState(`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`);

  if (playing) {
    return (
      <div className={`relative ${aspect} w-full overflow-hidden bg-black ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
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
      className={`group relative block ${aspect} w-full overflow-hidden bg-black ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail */}
      <img
        src={poster}
        alt=""
        loading="lazy"
        onError={() => setPoster(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
      <span className="absolute bottom-0 left-0 flex items-center gap-3.5 bg-[#0F1113] py-3 pr-5">
        <span className="grid h-[52px] w-[52px] place-items-center bg-[#4588c6]">
          <span
            className="ml-0.5 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white"
            aria-hidden="true"
          />
        </span>
        {caption && <span className="text-base font-medium text-[#F2F0EB]">{caption}</span>}
      </span>
      <span className="absolute right-3 top-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80">{label}</span>
    </button>
  );
}
