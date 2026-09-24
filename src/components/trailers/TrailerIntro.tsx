import Image from "next/image";
import { trailerCopy, trailerImages } from "@/lib/trailer-content";

export function TrailerIntro() {
  return (
    <section style={{ background: "#F2F0EB", color: "#141619" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {trailerCopy.introEyebrow}
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <h2
              className="font-medium leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(24px,2.6vw,38px)" }}
            >
              {trailerCopy.introHeading}
            </h2>
            <div className="mt-10 grid max-w-[720px] gap-5 text-base leading-[1.65] text-[#2A2D31] sm:text-lg">
              {trailerCopy.introBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={trailerImages.intro}
              alt="A Mobile CCTV Solutions trailer with raised mast deployed on a gravel construction site"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[38%_50%]"
            />
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 border-t-2 border-[#141619] sm:mt-20 md:grid-cols-3">
          {trailerCopy.introFacts.map((f) => (
            <div key={f.label} className="border-b border-[#D6D2CA] py-6 md:border-b-0 md:border-r md:pl-6 md:pr-6 md:first:pl-0 md:last:border-r-0">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#4588c6]">{f.label}</div>
              <p className="mt-3 text-base leading-[1.5] text-[#2A2D31]">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
