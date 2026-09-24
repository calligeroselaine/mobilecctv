import Image from "next/image";
import { poleCopy, poleImages, poleThemes } from "@/lib/pole-content";

export function PoleCapabilities() {
  return (
    <>
      <section id="capabilities" style={{ background: "#0B0C0D", color: "#F2F0EB", scrollMarginTop: 140 }}>
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#A9ADB1]">
            <span className="h-px w-7 bg-[#4588c6]" />
            {poleCopy.capabilitiesEyebrow}
          </div>
          <div className="mt-6 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <h2 className="font-bold uppercase leading-[0.92]" style={{ fontStretch: "68%", fontSize: "clamp(26px,3.6vw,44px)" }}>
                {poleCopy.capabilitiesHeading}
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
                {poleThemes.map(({ num, icon: Icon, title, lead, items }) => (
                  <div key={num} className="border-t-2 border-white/30 pt-5">
                    <div className="flex items-baseline justify-between">
                      <span className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-[#4588c6]" aria-hidden="true" />
                        <h3 className="font-bold uppercase leading-none" style={{ fontStretch: "70%", fontSize: "clamp(22px,2vw,28px)" }}>
                          {title}
                        </h3>
                      </span>
                      <span className="font-mono text-xs text-[#A9ADB1]">{num}</span>
                    </div>
                    <p className="mt-3 text-base leading-[1.4] text-[#E3E1DC]">{lead}</p>
                    <ul className="mt-3 grid gap-2">
                      {items.map((it) => (
                        <li key={it} className="flex gap-3 text-sm leading-[1.5] text-[#C9CCCF]">
                          <span className="mt-2 h-px w-4 shrink-0 bg-[#4588c6]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.08em] text-[#A9ADB1]">
                *SIM card not included. Coverage dependent on carrier capabilities.
              </p>
            </div>
            <div className="relative mx-auto aspect-[572/626] w-full max-w-[460px] lg:sticky lg:top-[150px] lg:max-w-none">
              <Image
                src={poleImages.product}
                alt="Close-up of a pole camera with solar panel, light and PTZ dome camera on a pole"
                fill
                sizes="(min-width: 1024px) 32vw, 90vw"
                className="object-contain mix-blend-lighten"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#4588c6", color: "#FFFFFF" }}>
        <div className="mx-auto max-w-[1440px] px-5 py-16 text-center sm:px-8 sm:py-24">
          <p className="mx-auto max-w-[1000px] font-bold uppercase leading-[0.95] tracking-[-0.01em]" style={{ fontStretch: "68%", fontSize: "clamp(28px,4.4vw,60px)" }}>
            {poleCopy.statement}
          </p>
        </div>
      </section>
    </>
  );
}
