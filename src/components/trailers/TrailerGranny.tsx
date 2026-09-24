import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { grannyStory, trailerCopy, trailerImages } from "@/lib/trailer-content";

const accent = "text-[#4588c6]";

export function TrailerGranny() {
  return (
    <section id="granny-smith" style={{ background: "#0F1113", color: "#F2F0EB", scrollMarginTop: 140 }}>
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(460px,72vh,760px)" }}>
        <Image
          src={trailerImages.grannySmith}
          alt="A Mobile CCTV Solutions trailer beside the Granny Smith Festival grounds in Eastwood"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,19,.55)_0%,rgba(15,17,19,0)_30%,rgba(15,17,19,0)_45%,rgba(15,17,19,.94)_100%)]" />
        <div className="absolute inset-x-0 top-0 mx-auto max-w-[1440px] px-5 py-8 sm:px-8">
          <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em]">
            <span className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-[#4588c6]" />
              {trailerCopy.deploymentsEyebrow} · Case study 2
            </span>
            <span>{grannyStory.place}</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 sm:pb-14">
          <div className="mb-4 font-mono text-[13px] tracking-[0.08em] text-[#E3E1DC]">For {grannyStory.client}</div>
          <h2 className="font-bold uppercase leading-[0.88]" style={{ fontStretch: "66%", fontSize: "clamp(26px,3.6vw,44px)" }}>
            Granny Smith
            <br />
            Festival
          </h2>
          <p className="mt-4 max-w-[620px] text-base leading-[1.4] text-[#E3E1DC] sm:text-lg">{grannyStory.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="grid grid-cols-1 gap-x-16 gap-y-3 border-t border-white/20 py-8 lg:grid-cols-[220px_1fr]">
          <span className={`whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] ${accent}`}>01 · The challenge</span>
          <p className="max-w-[820px] text-base leading-[1.65] text-[#C9CCCF] sm:text-lg">{grannyStory.challenge}</p>
        </div>

        <div className="border-t border-white/20 pt-8">
          <span className={`font-mono text-xs uppercase tracking-[0.14em] ${accent}`}>02 · The solution</span>
          <div className="mt-8 grid grid-cols-1 items-stretch gap-0 md:grid-cols-[1fr_auto_1fr]">
            {[grannyStory.phases[0], null, grannyStory.phases[1]].map((p, i) =>
              p ? (
                <div key={p.label} className="border border-white/20 p-6 sm:p-8">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#A9ADB1]">{p.label}</div>
                  <h3 className="mt-3 font-bold uppercase leading-none" style={{ fontStretch: "70%", fontSize: "clamp(24px,2.4vw,32px)" }}>
                    {p.title}
                  </h3>
                  <p className="mt-5 text-base leading-[1.6] text-[#C9CCCF]">{p.text}</p>
                </div>
              ) : (
                <div key={`bridge-${i}`} className="flex items-center justify-center gap-3 px-2 py-5 md:flex-col md:px-6 md:py-0">
                  <ArrowRight className="h-6 w-6 rotate-90 text-[#4588c6] md:rotate-0" aria-hidden="true" />
                </div>
              ),
            )}
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-[#A9ADB1]">{grannyStory.bridge}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 border-t border-white/20 py-12 pb-16 sm:pb-24 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div>
            <div className="font-bold leading-[0.85]" style={{ fontStretch: "66%", fontSize: "clamp(56px,6vw,88px)" }}>
              {grannyStory.stat.value}
            </div>
            <div className="mt-3 font-mono text-xs uppercase tracking-[0.1em]">{grannyStory.stat.label}</div>
            <div className="text-sm text-[#A9ADB1]">{grannyStory.stat.sub}</div>
          </div>
          <div>
            <span className={`font-mono text-xs uppercase tracking-[0.14em] ${accent}`}>03 · The result</span>
            <p className="mt-3 max-w-[640px] text-lg leading-[1.55] text-[#E3E1DC]">{grannyStory.result}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
