import { copy, bathurstStory, bathurstSteps, mocVideos } from "@/lib/moc-content";
import { MocVideoPoster } from "@/components/moc/MocVideoPoster";

export function MocBathurst() {
  const story = [
    { label: "The challenge", text: bathurstStory.challenge },
    { label: "The solution", text: bathurstStory.solution },
    { label: "The result", text: bathurstStory.result },
    { label: "Client proof", text: bathurstStory.clientProof },
  ];

  return (
    <section id="bathurst" style={{ background: "#E6E2DA", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#4E5256]">
          <span className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[#141619]" />
            {copy.bathurstEyebrow}
          </span>
          <span>{bathurstStory.client} · Bathurst, NSW</span>
        </div>

        <div className="mt-7 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-24">
          <h2 className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(28px,3.6vw,44px)" }}>
            Supercars
            <br />
            Bathurst 1000
          </h2>
          <p className="max-w-[560px] text-lg leading-[1.4] tracking-[-0.01em] sm:text-xl">{bathurstStory.tagline}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 border-t-2 border-[#141619] lg:grid-cols-4">
          {bathurstStory.stats.map((stat) => (
            <div key={stat.label} className="border-b border-[#C9C4BA] py-6 pr-4 lg:border-r lg:last:border-r-0 lg:pl-6 lg:first:pl-0">
              <div className="font-bold leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(30px,3.2vw,44px)" }}>
                {stat.value}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-[#4E5256]">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          {story.map((row, i) => (
            <div
              key={row.label}
              className="grid grid-cols-1 items-baseline gap-x-10 gap-y-2 border-b border-[#C9C4BA] py-7 sm:grid-cols-[220px_1fr]"
            >
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-[#4E5256]">
                {String(i + 1).padStart(2, "0")} · {row.label}
              </span>
              <p className="max-w-[860px] text-base leading-[1.65] text-[#2A2D31]">{row.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#4E5256]">
            <span>Supporting film from the deployment</span>
            <span>{mocVideos.bathurst.label}</span>
          </div>
          <MocVideoPoster
            video={mocVideos.bathurst}
            title="Bathurst — operational visibility"
            variant="outline-wide"
            caption="Visibility in action at Bathurst"
            className="min-h-[260px]"
          />
          <div className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-3">
            {bathurstSteps.map((step, i) => (
              <div
                key={step.title}
                className={`flex flex-col gap-2.5 border-t-2 pb-4 pt-5 ${step.highlight ? "border-[color:oklch(0.62_0.14_65)]" : "border-[#141619]"}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(22px,2vw,28px)" }}>{step.title}</span>
                  <span className="font-mono text-xs text-[#4E5256]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-base leading-[1.5] text-[#2A2D31]">{step.body}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span key={tag} className="border border-[#9A9C9E] px-2.5 py-1 font-mono text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
