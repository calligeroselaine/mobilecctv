import { copy, mocImages } from "@/lib/moc-content";
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
          className="mt-7 max-w-[1180px] font-medium leading-[1.05] tracking-[-0.025em]"
          style={{ fontSize: "clamp(24px,2.6vw,38px)" }}
        >
          {copy.introHeading}
        </h2>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-4">
            <MocPlaceholderPhoto
              src={mocImages.introExteriorDetail}
              alt="Mobile Operations Centre trailer, branded for outdoor events, live concerts and festivals, with a Mobile CCTV Solutions camera tower alongside"
              neededCaption="exterior detail — entry door, fingerprint reader, flood lighting"
              aspectClassName="aspect-[3/2]" priority={false}
              tone="light"
            />
            <p className="font-mono text-xs tracking-[0.06em] text-[#5B5F63]">{copy.introPhotoCaption}</p>
          </div>
          <p className="max-w-[560px] text-base leading-[1.6] text-[#2A2D31] sm:text-lg">{copy.introBody}</p>
        </div>
      </div>
    </section>
  );
}
