import { copy, configuredToOperateAs, mocImages } from "@/lib/moc-content";
import { MocPlaceholderPhoto } from "@/components/moc/MocPlaceholderPhoto";

export function MocIntro() {
  return (
    <section style={{ background: "#F2F0EB", color: "#141619" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {copy.introEyebrow}
        </div>
        <h2
          className="mt-7 max-w-[1180px] font-medium leading-[1.02] tracking-[-0.025em]"
          style={{ fontSize: "clamp(34px,5vw,76px)" }}
        >
          {copy.introHeading}
        </h2>

        <div className="mt-14 grid grid-cols-1 items-start gap-14 sm:mt-20 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-7">
            <MocPlaceholderPhoto
              src={mocImages.introExteriorDetail}
              alt="Mobile Operations Centre exterior detail — entry door, fingerprint reader and flood lighting"
              neededCaption="exterior detail — entry door, fingerprint reader, flood lighting (portrait 4:5)"
              aspectClassName="aspect-[4/5] max-h-[640px]"
              tone="light"
            />
            <p className="font-mono text-xs tracking-[0.06em] text-[#5B5F63]">{copy.introPhotoCaption}</p>
          </div>
          <div className="flex flex-col gap-10 pt-0 lg:pt-8">
            <p className="max-w-[560px] text-lg leading-[1.6] text-[#2A2D31] sm:text-xl">{copy.introBody}</p>
            <div>
              <div className="border-b border-[#141619] pb-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
                Configured to operate as
              </div>
              {configuredToOperateAs.map(({ letter, role }) => (
                <div key={letter} className="flex items-baseline gap-6 border-b border-[#D6D2CA] py-5.5">
                  <span className="font-mono text-xs text-[#5B5F63]">{letter}</span>
                  <span className="text-2xl font-medium tracking-[-0.015em] sm:text-3xl">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
