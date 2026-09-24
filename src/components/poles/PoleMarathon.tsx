import Image from "next/image";
import { marathon, poleCopy, poleImages } from "@/lib/pole-content";

export function PoleMarathon() {
  const rows = [
    { label: "The challenge", text: marathon.challenge },
    { label: "The solution", text: marathon.solution },
    { label: "The result", text: marathon.result },
    { label: "Client proof", text: marathon.proof },
  ];
  return (
    <section id="sydney-marathon" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[#141619]" />
            {poleCopy.deploymentsEyebrow} · Case study 1
          </span>
          <span>{marathon.client} · {marathon.place}</span>
        </div>
        <div className="mt-7 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-20">
          <h2 className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(26px,3.6vw,44px)" }}>
            TCS Sydney
            <br />
            Marathon
          </h2>
          <p className="max-w-[520px] text-lg leading-[1.4] tracking-[-0.01em] sm:text-xl">{marathon.tagline}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-[150px]">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src={poleImages.marathon}
                alt={marathon.imageAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-8 grid grid-cols-2 border-t-2 border-[#141619]">
              {marathon.stats.map((s) => (
                <div key={s.label} className="border-r border-[#D6D2CA] py-6 pr-4 last:border-r-0 last:pl-6">
                  <div className="font-bold leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(32px,3.4vw,46px)" }}>{s.value}</div>
                  <div className="mt-3 font-mono text-xs uppercase tracking-[0.1em]">{s.label}</div>
                  {"sub" in s && s.sub && <div className="mt-0.5 text-sm text-[#4E5256]">{s.sub}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t-2 border-[#141619]">
            {rows.map((r, i) => (
              <div key={r.label} className="flex flex-col gap-2.5 border-b border-[#D6D2CA] py-7">
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-[#4588c6]">
                  {String(i + 1).padStart(2, "0")} · {r.label}
                </span>
                <p className="text-base leading-[1.65] text-[#2A2D31]">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
