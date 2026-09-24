import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  copy,
  mocImages,
  mocVideos,
  networkSteps,
  ramadanStats,
  ramadanStatsNote,
  ramadanStory,
  stakeholders,
} from "@/lib/moc-content";
import { MocVideoPoster } from "@/components/moc/MocVideoPoster";

const accent = "text-[color:oklch(0.74_0.14_70)]";

export function MocRamadan() {
  const story = [
    { label: "The challenge", text: ramadanStory.challenge },
    { label: "The solution", text: ramadanStory.solution },
    { label: "The result", text: ramadanStory.result },
  ];

  return (
    <section id="ramadan" style={{ background: "#0F1113", color: "#F2F0EB", scrollMarginTop: "var(--moc-sticky-offset, 176px)" }}>
      {/* Full-bleed opener */}
      <div className="relative min-h-[520px] w-full overflow-hidden" style={{ height: "clamp(520px,82vh,860px)" }}>
        <Image
          src={mocImages.ramadanFullBleed}
          alt="Ramadan Nights market crowd on Haldon Street, Lakemba, with a Mobile CCTV Solutions camera tower overlooking the street"
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
              {copy.deploymentsEyebrow}
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
          <p className="mt-4 max-w-[620px] text-base leading-[1.4] text-[#E3E1DC] sm:text-lg">{ramadanStory.tagline}</p>
        </div>
      </div>

      {/* Challenge / solution / result + primary video */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-14 px-5 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
        <div className="border-t border-white/20">
          {story.map((row, i) => (
            <div key={row.label} className="grid grid-cols-1 gap-x-10 gap-y-2 border-b border-white/20 py-7 sm:grid-cols-[150px_1fr]">
              <div className={`font-mono text-xs uppercase tracking-[0.14em] ${accent}`}>
                {String(i + 1).padStart(2, "0")} · {row.label}
              </div>
              <p className="text-base leading-[1.65] text-[#C9CCCF]">{row.text}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-4">
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
          <p className="text-base leading-[1.6] text-[#C9CCCF]">{copy.ramadanVideoCaption}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="grid grid-cols-2 border-t border-white/20 lg:grid-cols-4">
          {ramadanStats.map((stat) => (
            <div key={stat.label} className="border-b border-white/20 py-7 pr-4 lg:border-r lg:last:border-r-0 lg:pl-6 lg:first:pl-0">
              <div className="font-bold leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(32px,3.4vw,46px)" }}>
                {stat.split ? (
                  <span className="inline-flex items-center gap-[0.12em]">
                    <span className="text-[#8A8E92]">7</span>
                    <span className={`text-[0.45em] ${accent}`}>→</span>
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
        <p className="mt-4 text-[13px] leading-[1.5] text-[#A9ADB1]">{ramadanStatsNote}</p>
      </div>

      {/* Supporting films: network + stakeholders */}
      <div id="network" className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-2 lg:gap-24" style={{ scrollMarginTop: "var(--moc-sticky-offset, 176px)" }}>
        <div>
          <div className={`font-mono text-xs uppercase tracking-[0.14em] ${accent}`}>Inside the deployment · How it works</div>
          <h3 className="mt-4 font-medium leading-[1.1] tracking-[-0.02em]" style={{ fontSize: "clamp(20px,1.9vw,28px)" }}>
            {copy.networkTitle}
          </h3>
          <div className="mt-8 flex flex-wrap items-start gap-8">
            <div className="w-full max-w-[240px] shrink-0">
              <MocVideoPoster video={mocVideos.network} title="Ramadan Nights — how the network works" variant="glass-circle" />
              <div className="flex justify-between pt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#A9ADB1]">
                <span>The network</span>
                <span>{mocVideos.network.label}</span>
              </div>
            </div>
            <ol className="min-w-0 flex-1" style={{ flexBasis: 220 }}>
              {networkSteps.map((step, i) => (
                <li key={step.title} className="flex items-baseline gap-4 border-b border-white/15 py-3.5 first:border-t">
                  <span className={`font-mono text-[11px] ${step.highlight ? accent : "text-[#A9ADB1]"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className={`block text-base font-bold uppercase ${step.highlight ? accent : ""}`} style={{ fontStretch: "76%" }}>
                      {step.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-[1.45] text-[#C9CCCF]">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <div className={`font-mono text-xs uppercase tracking-[0.14em] ${accent}`}>Inside the deployment · Who uses it</div>
          <h3 className="mt-4 font-medium leading-[1.1] tracking-[-0.02em]" style={{ fontSize: "clamp(20px,1.9vw,28px)" }}>
            {copy.stakeholdersTitle}
          </h3>
          <div className="mt-8 flex flex-wrap items-start gap-8">
            <div className="w-full max-w-[240px] shrink-0">
              <MocVideoPoster video={mocVideos.stakeholders} title="Ramadan Nights — hear from the stakeholders" variant="square-notch-right" />
              <div className="flex justify-between pt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#A9ADB1]">
                <span>The stakeholders</span>
                <span>{mocVideos.stakeholders.label}</span>
              </div>
            </div>
            <ul className="min-w-0 flex-1" style={{ flexBasis: 220 }}>
              {stakeholders.map((s, i) => (
                <li key={s.name} className="border-b border-white/15 py-3.5 first:border-t">
                  <div className="flex items-baseline gap-4">
                    <span className={`font-mono text-[11px] ${accent}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-bold uppercase" style={{ fontStretch: "66%" }}>{s.name}</span>
                  </div>
                  <p className="mt-1 pl-8 text-sm leading-[1.45] text-[#C9CCCF]">{s.use}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24">
        <a href="#bathurst" className="inline-flex items-center gap-2 border-t border-white/15 pt-8 text-sm text-[#C9CCCF] hover:text-white">
          Next deployment: Supercars Bathurst 1000 <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
