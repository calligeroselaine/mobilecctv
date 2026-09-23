import { copy, bathurstSteps, mocImages, mocVideos } from "@/lib/moc-content";
import { MocVideoPoster } from "@/components/moc/MocVideoPoster";
import { MocPlaceholderPhoto } from "@/components/moc/MocPlaceholderPhoto";

export function MocBathurst() {
  return (
    <section id="bathurst" style={{ background: "#E6E2DA", color: "#141619", scrollMarginTop: 60 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#4E5256]">
          <span className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[#141619]" />
            {copy.bathurstEyebrow}
          </span>
          <span>Bathurst, NSW</span>
        </div>

        <div className="mt-7 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-24">
          <h2 className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(28px,3.6vw,44px)" }}>
            Bathurst
          </h2>
          <p className="max-w-[560px] text-lg leading-[1.4] tracking-[-0.01em] sm:text-xl">{copy.bathurstLead}</p>
        </div>

        <div className="mt-14 sm:mt-20">
          <MocVideoPoster
            video={mocVideos.bathurst}
            title="Bathurst — operational visibility"
            variant="outline-wide"
            caption="Visibility in action at Bathurst"
            className="min-h-[260px]"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 sm:mt-20 sm:grid-cols-3">
          {bathurstSteps.map((step, i) => (
            <div
              key={step.title}
              className={`flex flex-col gap-4 border-t-2 pb-10 pt-6 ${
                step.highlight ? "border-[color:oklch(0.62_0.14_65)]" : "border-[#141619]"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(24px,2.4vw,32px)" }}>
                  {step.title}
                </span>
                <span className="font-mono text-xs text-[#4E5256]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-base leading-[1.55] text-[#2A2D31]">{step.body}</p>
              <div className="flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span key={tag} className="border border-[#9A9C9E] px-2.5 py-1.5 font-mono text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MocPlaceholderPhoto
            src={mocImages.bathurstDeployment}
            alt="Mobile CCTV Solutions unit deployed at Mount Panorama, Bathurst"
            neededCaption="vehicle access / gate queue"
            aspectClassName="aspect-[3/2]"
            tone="light"
          />
          <MocPlaceholderPhoto
            src={mocImages.bathurstMonitoringWall}
            alt="Operators at the monitoring wall, Bathurst deployment"
            neededCaption="operators at the monitoring wall"
            aspectClassName="aspect-[3/2]"
            tone="light"
          />
        </div>
      </div>
    </section>
  );
}
