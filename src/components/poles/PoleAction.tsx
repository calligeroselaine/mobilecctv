import { poleAction, poleCopy, poleVideos } from "@/lib/pole-content";
import { TrailerVideoPoster } from "@/components/trailers/TrailerVideoPoster";

export function PoleAction() {
  return (
    <section id="in-action" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {poleCopy.actionEyebrow}
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <TrailerVideoPoster
              youtubeId={poleVideos.demo}
              title="Pole camera clarity, movement and connectivity"
              label="Film 01 / 05"
              caption="Watch the demonstration"
            />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#4588c6]">Primary film</span>
            <h2 className="mt-3 font-bold uppercase leading-[0.9]" style={{ fontStretch: "68%", fontSize: "clamp(26px,3.6vw,44px)" }}>
              {poleCopy.actionHeading}
            </h2>
            <p className="mt-5 text-base leading-[1.6] text-[#2A2D31]">
              <span className="font-semibold">{poleAction.primary.label}. </span>
              {poleAction.primary.caption}
            </p>
          </div>
        </div>

        <div className="mt-14 border-t-2 border-[#141619] pt-5">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">Supporting demonstrations</span>
          <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
            {[
              { id: poleVideos.remote, n: "Film 02 / 05", info: poleAction.remote },
              { id: poleVideos.connectivity, n: "Film 03 / 05", info: poleAction.connectivity },
            ].map(({ id, n, info }) => (
              <div key={id}>
                <TrailerVideoPoster youtubeId={id} title={info.label} label={n} className="max-w-[560px]" />
                <h3 className="mt-4 text-lg font-semibold">{info.label}</h3>
                <p className="mt-1 max-w-[560px] text-base leading-[1.55] text-[#2A2D31]">{info.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
