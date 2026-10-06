import Image from "next/image";
import { actionPoints, trailerCopy, trailerVideos } from "@/lib/trailer-content";
import { TrailerVideoPoster } from "@/components/trailers/TrailerVideoPoster";

const captionClass =
  "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 font-mono text-[11px] tracking-[0.06em] text-white";

export function TrailerAction() {
  return (
    <section id="in-action" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {trailerCopy.actionEyebrow}
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-stretch lg:gap-20">
          <div className="mx-auto w-full max-w-[380px]">
            <TrailerVideoPoster
              youtubeId={trailerVideos.inAction.youtubeId}
              title="Mobile CCTV Trailer in a real deployment"
              label={trailerVideos.inAction.label}
              caption="Watch the deployment"
              vertical
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#5B5F63]">{trailerCopy.actionCaption}</p>
          </div>
          <div className="flex flex-col gap-10 lg:mb-[29px]">
            <div>
            <h2
              className="font-bold uppercase leading-[0.9]"
              style={{ fontStretch: "68%", fontSize: "clamp(26px,3.6vw,44px)" }}
            >
              {trailerCopy.actionHeading}
            </h2>
            <ul className="mt-8 border-t-2 border-[#141619]">
              {actionPoints.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[32px_1fr] gap-x-3 border-b border-[#D6D2CA] py-5">
                  <span className="font-mono text-xs text-[#4588c6]">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-lg font-semibold">{p.title}</span>
                    <span className="mt-1 block text-base leading-[1.5] text-[#2A2D31]">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[auto_1fr]">
              <figure className="relative aspect-[5/4] overflow-hidden lg:aspect-[1005/1024] lg:h-full">
                <Image
                  src="/images/trailer-equipment-cameras-cropped.jpg"
                  alt="A Mobile CCTV Solutions trailer with raised camera mast, with spare cameras laid out on a tray in front"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover"
                />
                <figcaption className={captionClass}>Trailer equipment detail.</figcaption>
              </figure>
              <figure className="relative aspect-[5/4] overflow-hidden lg:aspect-auto">
                <Image
                  src="/images/pole-in-use-street-dusk.jpg"
                  alt="Cameras mounted on poles above a busy street at dusk"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover object-[40%_40%]"
                />
                <figcaption className={captionClass}>Cameras on poles at a street event.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
