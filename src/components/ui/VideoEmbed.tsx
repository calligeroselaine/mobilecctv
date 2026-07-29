"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type VideoEmbedProps = {
  vimeoId: string;
  vimeoHash: string;
  title: string;
  /** Optional poster image shown before the viewer clicks play. */
  posterSrc?: string;
};

/**
 * Click-to-load video facade — the Vimeo iframe (and its player script)
 * only mounts once the viewer clicks play, instead of loading on every
 * page view. Used by both the homepage showcase and the About page so
 * the embed logic exists in exactly one place.
 */
export function VideoEmbed({ vimeoId, vimeoHash, title, posterSrc }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&autoplay=1&color&title=0&byline=0&portrait=0`}
          title={title}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-ink shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      style={
        posterSrc
          ? { backgroundImage: `url(${posterSrc})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-105">
        <Play className="h-7 w-7 translate-x-0.5 text-brand" fill="currentColor" aria-hidden="true" />
      </span>
    </button>
  );
}
