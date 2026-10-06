import Image from "next/image";
import { poleCopy, poleImages } from "@/lib/pole-content";

const captionClass =
  "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 font-mono text-[11px] tracking-[0.06em] text-white";

export function PoleIntro() {
  return (
    <section style={{ background: "#F2F0EB", color: "#141619" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {poleCopy.introEyebrow}
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch lg:gap-16">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden lg:max-w-none">
            <Image
              src={poleImages.intro}
              alt="A pole camera with solar panel and light at dusk against an orange sky"
              fill
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex h-full flex-col gap-8">
            <div className="grid grid-cols-2 gap-4 lg:min-h-0 lg:flex-1">
              <figure className="relative aspect-[5/4] overflow-hidden lg:aspect-auto">
                <Image
                  src="/images/pole-fitting-on-site.jpg"
                  alt="A technician fitting a pole-mounted unit on site"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover object-[50%_30%]"
                />
                <figcaption className={captionClass}>Fitting a unit on site.</figcaption>
              </figure>
              <figure className="relative aspect-[5/4] overflow-hidden lg:aspect-auto">
                <Image
                  src="/images/pole-event-entrance.jpg"
                  alt="A pole-mounted camera at the entrance to an event"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover object-[35%_50%]"
                />
                <figcaption className={captionClass}>On a pole at an event entrance.</figcaption>
              </figure>
            </div>
            <div>
              <h2 className="font-medium leading-[1.05] tracking-[-0.025em]" style={{ fontSize: "clamp(24px,2.6vw,38px)" }}>
                {poleCopy.introHeading}
              </h2>
              <div className="mt-8 grid gap-5 text-base leading-[1.65] text-[#2A2D31] sm:text-lg">
                {poleCopy.introBody.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
