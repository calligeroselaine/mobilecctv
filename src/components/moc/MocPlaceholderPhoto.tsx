"use client";

import { useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type MocPlaceholderPhotoProps = {
  src: string | null;
  alt: string;
  /** Shown only when `src` is null and no `videoStillId`/`icon` fallback is
   * given, so it's obvious on the live preview exactly which photo the
   * client still needs to supply. */
  neededCaption: string;
  aspectClassName: string;
  sizes?: string;
  priority?: boolean;
  tone?: "dark" | "light";
  /**
   * When `src` is null, a real still frame from one of the client's own
   * YouTube videos (via YouTube's own thumbnail CDN — the same source
   * already used for the click-to-load video posters on this page) is
   * shown instead of a "photo needed" box. This is genuine footage of
   * their own site/equipment, never a stock or AI image.
   */
  videoStillId?: string;
  /**
   * When `src` is null and no `videoStillId` is given, a themed icon panel
   * (in the page's own graphite/paper/amber palette) is shown instead of a
   * "photo needed" box — an intentional design fallback rather than a gap.
   */
  icon?: LucideIcon;
};

/**
 * Renders a real photo when one has been confidently matched from the
 * existing asset library, a real still frame from the client's own video
 * footage, a themed icon panel, or — only as a last resort — a clearly
 * labelled placeholder. Per the brief, unresolved image slots must never
 * be filled with a guess, a stock photo or an invented image.
 */
export function MocPlaceholderPhoto({
  src,
  alt,
  neededCaption,
  aspectClassName,
  sizes = "100vw",
  priority = false,
  tone = "dark",
  videoStillId,
  icon: Icon,
}: MocPlaceholderPhotoProps) {
  if (src) {
    return (
      <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  if (videoStillId) {
    return <MocVideoStill videoStillId={videoStillId} alt={alt} aspectClassName={aspectClassName} />;
  }

  const isDark = tone === "dark";

  if (Icon) {
    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden ${aspectClassName} ${
          isDark ? "bg-[#0E1012]" : "bg-[#E6E2DA]"
        }`}
      >
        <div
          className={`grid h-20 w-20 shrink-0 place-items-center rounded-full sm:h-24 sm:w-24 ${
            isDark ? "bg-white/10" : "bg-[#141619]/8"
          }`}
        >
          <Icon
            className={isDark ? "h-9 w-9 text-[#4588c6] sm:h-10 sm:w-10" : "h-9 w-9 text-[#141619] sm:h-10 sm:w-10"}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden border border-dashed ${aspectClassName} ${
        isDark ? "border-white/25 bg-[#0E1012] text-[#8A8E92]" : "border-[#9A9C9E] bg-[#E6E2DA] text-[#5B5F63]"
      }`}
    >
      <p className="max-w-[80%] px-4 text-center font-mono text-xs uppercase tracking-[0.08em]">
        Photo needed: {neededCaption}
      </p>
    </div>
  );
}

function MocVideoStill({
  videoStillId,
  alt,
  aspectClassName,
}: {
  videoStillId: string;
  alt: string;
  aspectClassName: string;
}) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${videoStillId}/maxresdefault.jpg`);
  return (
    <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not an optimisable local asset */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setSrc(`https://i.ytimg.com/vi/${videoStillId}/hqdefault.jpg`)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
