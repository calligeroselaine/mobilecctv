"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type VideoEmbedProps = {
  title: string;
  /** Optional poster image shown before the viewer clicks play. Defaults
   * to the provider's own thumbnail for YouTube if omitted. */
  posterSrc?: string;
} & (
  | { vimeoId: string; vimeoHash: string; youtubeId?: never }
  | { youtubeId: string; vimeoId?: never; vimeoHash?: never }
);

/**
 * Click-to-load video facade — the video iframe (and its player script)
 * only mounts once the viewer clicks play, instead of loading on every
 * page view. Supports Vimeo or YouTube. Used across the homepage and
 * About page so the embed logic exists in exactly one place.
 */
export function VideoEmbed(props: VideoEmbedProps) {
  const { title } = props;
  const [playing, setPlaying] = useState(false);

  const posterSrc =
    props.posterSrc ??
    ("youtubeId" in props && props.youtubeId
      ? `https://img.youtube.com/vi/${props.youtubeId}/maxresdefault.jpg`
      : undefined);

  if (playing) {
    const src =
      "youtubeId" in props && props.youtubeId
        ? `https://www.youtube-nocookie.com/embed/${props.youtubeId}?autoplay=1&rel=0`
        : `https://player.vimeo.com/video/${props.vimeoId}?h=${props.vimeoHash}&autoplay=1&color&title=0&byline=0&portrait=0`;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
        <iframe
          src={src}
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
