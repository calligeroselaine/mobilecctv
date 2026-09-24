import { actionPoints, trailerCopy, trailerVideos } from "@/lib/trailer-content";
import { TrailerVideoPoster } from "@/components/trailers/TrailerVideoPoster";

export function TrailerAction() {
  return (
    <section id="in-action" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {trailerCopy.actionEyebrow}
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <TrailerVideoPoster
              youtubeId={trailerVideos.inAction.youtubeId}
              title="Mobile CCTV Trailer in a real deployment"
              label={trailerVideos.inAction.label}
              caption="Watch the deployment"
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#5B5F63]">{trailerCopy.actionCaption}</p>
          </div>
          <div>
            <h2
              className="font-bold uppercase leading-[0.9]"
              style={{ fontStretch: "68%", fontSize: "clamp(30px,4.6vw,64px)" }}
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
        </div>
      </div>
    </section>
  );
}
