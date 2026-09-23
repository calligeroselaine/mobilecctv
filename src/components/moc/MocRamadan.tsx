import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  copy,
  mocImages,
  mocVideos,
  networkSteps,
  ramadanStats,
  ramadanStatsNote,
  stakeholders,
} from "@/lib/moc-content";
import { MocVideoPoster } from "@/components/moc/MocVideoPoster";

export function MocRamadan() {
  return (
    <section id="ramadan" style={{ background: "#0F1113", color: "#F2F0EB", scrollMarginTop: 60 }}>
      {/* 5a — full-bleed opener */}
      <div className="relative min-h-[520px] w-full overflow-hidden" style={{ height: "clamp(520px,82vh,860px)" }}>
        <Image
          src={mocImages.ramadanFullBleed}
          alt="Ramadan Nights market crowd on Haldon Street, Lakemba, at night with a Mobile CCTV Solutions camera tower overlooking the street"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,17,19,.55) 0%, rgba(15,17,19,0) 30%, rgba(15,17,19,0) 45%, rgba(15,17,19,.92) 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 mx-auto max-w-[1440px] px-5 py-8 sm:px-8">
          <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em]">
            <span className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-[color:oklch(0.74_0.14_70)]" />
              04 — Deployment
            </span>
            <span>Lakemba, NSW</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 sm:pb-16">
          <div className="mb-4.5 font-mono text-[13px] tracking-[0.08em] text-[#E3E1DC]">{copy.ramadanFor}</div>
          <h2 className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(26px,3.6vw,44px)" }}>
            Ramadan Nights
            <br />
            Lakemba
          </h2>
        </div>
      </div>

      {/* 5b — scale */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-14 px-5 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="mb-10 max-w-[620px] text-lg font-normal leading-[1.4] tracking-[-0.01em] sm:mb-16 sm:text-xl">
            {copy.ramadanLead}
          </p>
          <div className="grid grid-cols-2 border-t border-white/20">
            {ramadanStats.map((stat) => (
              <div key={stat.label} className="border-b border-r border-white/20 py-7 pr-4 [&:nth-child(2n)]:border-r-0">
                <div className="font-bold leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(32px,3.4vw,46px)" }}>
                  {stat.split ? (
                    <span className="inline-flex items-center gap-[0.12em]">
                      <span className="text-[#8A8E92]">7</span>
                      <span className="text-[0.45em] text-[color:oklch(0.74_0.14_70)]">→</span>
                      <span>43</span>
                    </span>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="mt-3.5 font-mono text-xs uppercase tracking-[0.1em] text-[#C9CCCF]">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[13px] leading-[1.5] text-[#A9ADB1]">{ramadanStatsNote}</p>
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-5">
          <MocVideoPoster
            video={mocVideos.ramadanScale}
            title="Ramadan Nights — scale of the deployment"
            variant="square-notch-left"
            caption="The scale of the deployment"
          />
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-[#A9ADB1]">
            <span>Event team interview</span>
            <span>{mocVideos.ramadanScale.label}</span>
          </div>
          <p className="max-w-[520px] text-base leading-[1.6] text-[#C9CCCF]">{copy.ramadanVideoCaption}</p>
        </div>
      </div>

      {/* 5b — how the network works */}
      <div id="network" className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 sm:pt-32" style={{ scrollMarginTop: 60 }}>
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#A9ADB1]">
          <span className="h-px w-7 bg-[color:oklch(0.74_0.14_70)]" />
          {copy.networkEyebrow}
        </div>
        <h3
          className="mt-6 max-w-[980px] font-medium leading-[1.04] tracking-[-0.02em]"
          style={{ fontSize: "clamp(22px,2.2vw,32px)" }}
        >
          {copy.networkHeading}
        </h3>
        <div className="mt-12 flex flex-wrap items-center gap-12 sm:mt-16 lg:gap-24">
          <div className="mx-auto w-full max-w-[400px]">
            <MocVideoPoster video={mocVideos.network} title="How the network works" variant="glass-circle" />
            <div className="flex justify-between pt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#A9ADB1]">
              <span>The network in operation</span>
              <span>{mocVideos.network.label}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1" style={{ flexBasis: 440 }}>
            {networkSteps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === networkSteps.length - 1;
              return (
                <div key={step.title} className="grid grid-cols-[56px_1fr] gap-x-5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`grid h-14 w-14 place-items-center ${
                        step.highlight ? "bg-[color:oklch(0.74_0.14_70)] text-[#141619]" : "border border-white/30"
                      }`}
                    >
                      <Icon className="h-[26px] w-[26px]" aria-hidden="true" />
                    </div>
                    {!isLast && <div className="min-h-9 w-px flex-1 bg-white/20" />}
                  </div>
                  <div className={isLast ? "pb-0 pt-1.5" : "pb-9 pt-1.5"}>
                    <div className={`font-mono text-[11px] tracking-[0.14em] ${step.highlight ? "text-[color:oklch(0.74_0.14_70)]" : "text-[#A9ADB1]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-lg font-bold uppercase" style={{ fontStretch: "76%" }}>
                      {step.title}
                    </div>
                    <div className="mt-1.5 text-base leading-[1.5] text-[#C9CCCF]">{step.body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5c — stakeholders */}
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-10 pb-10 sm:gap-24 sm:pb-16">
          <div className="min-w-0 flex-1" style={{ flexBasis: 440 }}>
            <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#A9ADB1]">
              <span className="h-px w-7 bg-[color:oklch(0.74_0.14_70)]" />
              {copy.stakeholdersEyebrow}
            </div>
            <h3
              className="mt-6 font-medium leading-[1.04] tracking-[-0.02em]"
              style={{ fontSize: "clamp(22px,2.2vw,32px)" }}
            >
              {copy.stakeholdersHeading}
            </h3>
            <p className="mt-6 max-w-[520px] text-base leading-[1.6] text-[#C9CCCF]">{copy.stakeholdersBody}</p>
          </div>
          <div className="mx-auto w-full max-w-[340px]">
            <MocVideoPoster
              video={mocVideos.stakeholders}
              title="Hear from the stakeholders"
              variant="square-notch-right"
              caption="Hear from the stakeholders"
            />
            <div className="flex justify-between pt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#A9ADB1]">
              <span>Council, security, police</span>
              <span>{mocVideos.stakeholders.label}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20">
          {stakeholders.map((s, i) => (
            <div
              key={s.name}
              className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-b border-white/20 py-8 hover:bg-white/[0.03]"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-[color:oklch(0.74_0.14_70)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(26px,3vw,38px)" }}>
                  {s.name}
                </span>
              </div>
              <div className="flex max-w-[380px] flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A9ADB1]">Uses the centre for</span>
                <span className="text-base leading-[1.3] sm:text-lg">{s.use}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-6 border-t border-white/15 pt-8">
          <a href="#bathurst" className="inline-flex items-center gap-2 text-sm text-[#C9CCCF] hover:text-white">
            See the Bathurst deployment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
