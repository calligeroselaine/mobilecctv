import Image from "next/image";
import { capabilities, trailerCopy, trailerImages } from "@/lib/trailer-content";

export function TrailerCapabilities() {
  return (
    <>
      <section id="capabilities" style={{ background: "#16191C", color: "#F2F0EB", scrollMarginTop: 140 }}>
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#A9ADB1]">
            <span className="h-px w-7 bg-[#4588c6]" />
            {trailerCopy.capabilitiesEyebrow}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
            <div className="lg:self-start lg:[@media(min-height:820px)]:sticky lg:[@media(min-height:820px)]:top-[150px]">
              <h2
                className="font-bold uppercase leading-[0.9]"
                style={{ fontStretch: "68%", fontSize: "clamp(26px,3.6vw,44px)" }}
              >
                {trailerCopy.capabilitiesHeading}
              </h2>
              <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={trailerImages.capabilities}
                  alt="Two people raising the solar panel of a Mobile CCTV Solutions trailer on a construction site"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="border-t-2 border-white/30">
              {capabilities.map(({ num, icon: Icon, title, lead, items }) => (
                <div key={num} className="grid grid-cols-[44px_1fr] gap-x-5 border-b border-white/15 py-8">
                  <Icon className="h-8 w-8 text-[#4588c6]" aria-hidden="true" />
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        className="font-bold uppercase leading-none"
                        style={{ fontStretch: "70%", fontSize: "clamp(22px,2vw,28px)" }}
                      >
                        {title}
                      </h3>
                      <span className="font-mono text-xs text-[#A9ADB1]">{num}</span>
                    </div>
                    <p className="mt-3 text-lg leading-[1.35] text-[#E3E1DC]">{lead}</p>
                    <ul className="mt-4 grid gap-2">
                      {items.map((it) => (
                        <li key={it} className="flex gap-3 text-base leading-[1.45] text-[#C9CCCF]">
                          <span className="mt-2.5 h-px w-4 shrink-0 bg-[#4588c6]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#4588c6", color: "#FFFFFF" }}>
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[0.8fr_0.8fr_1.4fr]">
            {trailerCopy.statement.map((line, i) => (
              <li key={line} className="border-t-2 border-white/70 pt-4">
                <span className="font-mono text-xs tracking-[0.14em] text-white/80">{String(i + 1).padStart(2, "0")}</span>
                <p
                  className="mt-3 font-bold uppercase leading-[0.95] tracking-[-0.01em] lg:whitespace-nowrap"
                  style={{ fontStretch: "68%", fontSize: "clamp(22px,2.2vw,32px)" }}
                >
                  {line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
