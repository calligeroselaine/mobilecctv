import { copy, configuredToOperateAs, mocVideos, whyPoints } from "@/lib/moc-content";
import { MocVideoPoster } from "@/components/moc/MocVideoPoster";

export function MocWhy() {
  return (
    <section id="why" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {copy.whyEyebrow}
        </div>

        <div className="mt-7 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-24">
          <h2 className="font-medium leading-[1.1] tracking-[-0.025em]" style={{ fontSize: "clamp(22px,2.4vw,32px)" }}>
            {copy.whyHeading}
          </h2>
          <p className="max-w-[560px] pt-2 text-base leading-[1.6] text-[#2A2D31] sm:text-lg">{copy.whyBody}</p>
        </div>

        <div className="mt-14 flex flex-wrap items-start gap-12 sm:mt-20 lg:gap-24">
          <div className="mx-auto w-full max-w-[400px]">
            <MocVideoPoster
              video={mocVideos.greenfield}
              title="Why use a Mobile Operations Centre — greenfield operations"
              variant="solid-circle"
            />
            <div className="flex justify-between pt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#5B5F63]">
              <span>Why greenfield sites need more</span>
              <span>{mocVideos.greenfield.label}</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col" style={{ flexBasis: 440 }}>
            {whyPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex items-start gap-5 border-b border-[#D6D2CA] py-6 first:border-t-2 first:border-t-[#141619]">
                  <Icon className="mt-0.5 h-7 w-7 shrink-0" aria-hidden="true" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-lg font-semibold">{point.title}</span>
                    <span className="text-base leading-[1.5] text-[#2A2D31]">{point.body}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 sm:mt-24">
          <div className="border-b-2 border-[#141619] pb-4">
            <h3 className="font-bold uppercase leading-none" style={{ fontStretch: "72%", fontSize: "clamp(20px,1.8vw,26px)" }}>
              {copy.rolesTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {configuredToOperateAs.map(({ letter, role }) => (
              <div key={letter} className="flex flex-col gap-3 border-b border-[#D6D2CA] py-6 pr-6">
                <span className="font-mono text-xs text-[#5B5F63]">{letter}</span>
                <span className="text-lg font-medium leading-[1.25] tracking-[-0.015em]">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
