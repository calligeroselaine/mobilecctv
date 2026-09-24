import Image from "next/image";
import { adcoStory, trailerCopy, trailerImages, trailerVideos } from "@/lib/trailer-content";
import { TrailerVideoPoster } from "@/components/trailers/TrailerVideoPoster";

export function TrailerAdco() {
  const rows = [
    { label: "The challenge", text: adcoStory.challenge },
    { label: "The solution", text: adcoStory.solution },
    { label: "The result", text: adcoStory.result },
  ];

  return (
    <section id="adco" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[#141619]" />
            {trailerCopy.deploymentsEyebrow} · Case study 1
          </span>
          <span>{adcoStory.project} · {adcoStory.place}</span>
        </div>

        <div className="mt-7 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-20">
          <h2
            className="font-bold uppercase leading-[0.88]"
            style={{ fontStretch: "66%", fontSize: "clamp(30px,7vw,104px)" }}
          >
            ADCO
            <br />
            Constructions
          </h2>
          <p className="max-w-[520px] text-lg leading-[1.4] tracking-[-0.01em] sm:text-xl">{adcoStory.tagline}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 border-t-2 border-[#141619] sm:grid-cols-3">
          {adcoStory.stats.map((s) => (
            <div key={s.label} className="border-b border-[#D6D2CA] py-6 sm:border-b-0 sm:border-r sm:pl-6 sm:pr-4 sm:first:pl-0 sm:last:border-r-0">
              <div className="font-bold leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(44px,5.2vw,76px)" }}>
                {s.value}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.1em]">{s.label}</div>
              {s.sub && <div className="mt-0.5 text-sm text-[#4E5256]">{s.sub}</div>}
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-8 lg:[@media(min-height:820px)]:sticky lg:[@media(min-height:820px)]:top-[150px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={trailerImages.adco}
                alt="Mobile CCTV Solutions team with ADCO Constructions staff beside a trailer at The Forest High School site"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <TrailerVideoPoster
                youtubeId={trailerVideos.adco.youtubeId}
                title="ADCO Constructions on their Mobile CCTV Trailer deployment"
                label={trailerVideos.adco.label}
                caption="Hear it from ADCO"
              />
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#5B5F63]">{adcoStory.videoNote}</p>
            </div>
          </div>

          <div>
            <div className="border-t-2 border-[#141619]">
              {rows.map((r, i) => (
                <div key={r.label} className="flex flex-col gap-2.5 border-b border-[#D6D2CA] py-7">
                  <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-[#4588c6]">
                    {String(i + 1).padStart(2, "0")} · {r.label}
                  </span>
                  <p className="text-base leading-[1.65] text-[#2A2D31]">{r.text}</p>
                </div>
              ))}
              <div className="flex flex-col gap-2.5 border-b border-[#D6D2CA] py-7">
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-[#4588c6]">04 · Client proof</span>
                <p className="text-base leading-[1.65] text-[#2A2D31]">{adcoStory.proof}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#5B5F63]">Reported by ADCO in the film</p>
                <ul className="grid gap-2.5">
                  {adcoStory.reported.map((r) => (
                    <li key={r} className="flex gap-3 text-base leading-[1.5] text-[#2A2D31]">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-[#4588c6]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
