import { copy, greenfieldFacts, mocVideos, shedComparison } from "@/lib/moc-content";
import { MocVideoPoster } from "@/components/moc/MocVideoPoster";

export function MocGreenfield() {
  return (
    <section id="greenfield" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 60 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {copy.greenfieldEyebrow}
        </div>

        <div className="mt-7 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-24">
          <h2 className="font-medium leading-[1.1] tracking-[-0.025em]" style={{ fontSize: "clamp(34px,4.4vw,66px)" }}>
            {copy.greenfieldHeading}
          </h2>
          <p className="max-w-[560px] pt-2 text-base leading-[1.6] text-[#2A2D31] sm:text-lg">{copy.greenfieldBody}</p>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-12 sm:mt-20 lg:gap-24">
          <div className="mx-auto w-full max-w-[400px]">
            <MocVideoPoster
              video={mocVideos.greenfield}
              title="Built for greenfield operations"
              variant="solid-circle"
            />
            <div className="flex justify-between pt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#5B5F63]">
              <span>Why greenfield sites need more</span>
              <span>{mocVideos.greenfield.label}</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col" style={{ flexBasis: 440 }}>
            <div className="flex flex-col gap-2.5 border-b border-[#D6D2CA] pb-7">
              <span className="font-bold leading-[0.88]" style={{ fontStretch: "68%", fontSize: "clamp(64px,7vw,108px)" }}>
                {greenfieldFacts.stat}
              </span>
              <span className="max-w-[440px] text-base leading-[1.5] text-[#2A2D31]">{greenfieldFacts.statLabel}</span>
            </div>
            {greenfieldFacts.points.map((point, i) => {
              const Icon = point.icon;
              const isLast = i === greenfieldFacts.points.length - 1;
              return (
                <div
                  key={point.label}
                  className={`flex items-start gap-5 py-7 ${isLast ? "" : "border-b border-[#D6D2CA]"}`}
                >
                  <Icon className="h-7 w-7 shrink-0" aria-hidden="true" />
                  <span className="text-base leading-[1.5] text-[#2A2D31]">{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 sm:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-[#141619] pb-5">
            <h3
              className="font-bold uppercase leading-none"
              style={{ fontStretch: "72%", fontSize: "clamp(22px,2.2vw,30px)" }}
            >
              What arrives on site
            </h3>
            <div className="flex flex-wrap gap-7 font-mono text-xs tracking-[0.06em]">
              <span className="flex items-center gap-2.5 text-[#5B5F63]">
                <span className="inline-block h-0 w-5.5 border-t border-dashed border-[#8A8E92]" />
                Conventional site shed
              </span>
              <span className="flex items-center gap-2.5">
                <span className="inline-block h-[3px] w-5.5 bg-[color:oklch(0.74_0.14_70)]" />
                Mobile Operations Centre
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {shedComparison.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.title} className="flex flex-col gap-4.5 border-b border-[#D6D2CA] py-7 pr-6">
                  <Icon className="h-[30px] w-[30px]" aria-hidden="true" />
                  <span className="text-lg font-semibold">{row.title}</span>
                  <span className="border-t border-dashed border-[#A5A8AB] pt-2.5 text-sm text-[#5B5F63]">
                    {row.shed}
                  </span>
                  <span className="border-t-[3px] border-[color:oklch(0.74_0.14_70)] pt-2.5 text-[15px]">
                    {row.moc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
