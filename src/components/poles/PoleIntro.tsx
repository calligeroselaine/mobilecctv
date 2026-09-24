import Image from "next/image";
import { poleCopy, poleImages } from "@/lib/pole-content";

export function PoleIntro() {
  return (
    <section style={{ background: "#F2F0EB", color: "#141619" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {poleCopy.introEyebrow}
        </div>
        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden lg:max-w-none">
            <Image
              src={poleImages.intro}
              alt="A pole camera with solar panel and light at dusk against an orange sky"
              fill
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium leading-[1.05] tracking-[-0.025em]" style={{ fontSize: "clamp(24px,2.6vw,38px)" }}>
              {poleCopy.introHeading}
            </h2>
            <div className="mt-8 grid max-w-[680px] gap-5 text-base leading-[1.65] text-[#2A2D31] sm:text-lg">
              {poleCopy.introBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
