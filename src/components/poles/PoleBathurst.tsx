import { bathurst, construction, poleCopy, poleVideos } from "@/lib/pole-content";
import { TrailerVideoPoster } from "@/components/trailers/TrailerVideoPoster";

export function PoleBathurst() {
  const rows = [
    { label: "The challenge", text: bathurst.challenge },
    { label: "The solution", text: bathurst.solution },
    { label: "The result", text: bathurst.result },
    { label: "Client proof", text: bathurst.proof },
  ];
  return (
    <>
      <section id="bathurst" style={{ background: "#0F1113", color: "#F2F0EB", scrollMarginTop: 140 }}>
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#C9CCCF]">
            <span className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-[#4588c6]" />
              {poleCopy.deploymentsEyebrow} · Case study 2
            </span>
            <span>{bathurst.client} · {bathurst.place}</span>
          </div>
          <div className="mt-7 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-20">
            <h2 className="font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(26px,3.6vw,44px)" }}>
              Supercars
              <br />
              Bathurst 1000
            </h2>
            <p className="max-w-[520px] text-lg leading-[1.4] tracking-[-0.01em] text-[#E3E1DC] sm:text-xl">{bathurst.tagline}</p>
          </div>

          <div className="mt-12 grid grid-cols-2 border-t-2 border-white/30">
            {bathurst.stats.map((s) => (
              <div key={s.label} className="border-r border-white/15 py-6 pr-4 last:border-r-0 last:pl-6">
                <div className="font-bold leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(40px,5vw,72px)" }}>{s.value}</div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-[#C9CCCF]">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div className="border-t border-white/20">
              {rows.map((r, i) => (
                <div key={r.label} className="flex flex-col gap-2.5 border-b border-white/20 py-7">
                  <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-[#4588c6]">
                    {String(i + 1).padStart(2, "0")} · {r.label}
                  </span>
                  <p className="text-base leading-[1.65] text-[#C9CCCF]">{r.text}</p>
                </div>
              ))}
            </div>
            <div className="lg:sticky lg:top-[150px]">
              <TrailerVideoPoster
                youtubeId={poleVideos.bathurst}
                title="One temporary pole camera at Mount Panorama serving several roles"
                label="Film 04 / 05"
                caption="Watch the pole camera in use"
              />
              <h3 className="mt-6 text-lg font-semibold">{bathurst.rolesTitle}</h3>
              <p className="mt-1 text-sm text-[#A9ADB1]">{bathurst.rolesIntro}</p>
              <ul className="mt-4 border-t border-white/20">
                {bathurst.roles.map((r, i) => (
                  <li key={r} className="flex gap-4 border-b border-white/15 py-3 text-base leading-[1.4] text-[#E3E1DC]">
                    <span className="font-mono text-[11px] text-[#4588c6]">{String(i + 1).padStart(2, "0")}</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="construction" style={{ background: "#E6E2DA", color: "#141619", scrollMarginTop: 140 }}>
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#4588c6]">{construction.eyebrow}</span>
            <h3 className="mt-4 font-bold uppercase leading-[0.92]" style={{ fontStretch: "68%", fontSize: "clamp(24px,2.6vw,36px)" }}>
              {construction.title}
            </h3>
            <div className="mt-5 grid max-w-[560px] gap-4 text-base leading-[1.6] text-[#2A2D31]">
              {construction.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#4E5256]">{construction.reported}</p>
            <p className="mt-1 text-sm text-[#4E5256]">
              {construction.note} <a href="/mobile-cctv-trailers#adco" className="font-semibold underline hover:text-[#4588c6]">See the trailer view</a>
            </p>
          </div>
          <TrailerVideoPoster
            youtubeId={poleVideos.construction}
            title="Pole camera monitoring a gate on a school construction site"
            label="Film 05 / 05"
            caption="Watch the construction example"
          />
        </div>
      </section>
    </>
  );
}
