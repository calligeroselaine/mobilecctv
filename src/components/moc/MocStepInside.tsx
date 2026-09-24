"use client";

import { useState } from "react";
import { copy, insideThemes, mocVideos } from "@/lib/moc-content";
import { MocVideoPoster } from "@/components/moc/MocVideoPoster";
import { MocPlaceholderPhoto } from "@/components/moc/MocPlaceholderPhoto";

export function MocStepInside() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = insideThemes[activeIndex];

  return (
    <section id="inside" style={{ background: "#16191C", color: "#F2F0EB", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#A9ADB1]">
              <span className="h-px w-7 bg-[color:oklch(0.74_0.14_70)]" />
              {copy.stepInsideEyebrow}
            </div>
            <h2
              className="mt-6 font-bold uppercase leading-[0.86]"
              style={{ fontStretch: "68%", fontSize: "clamp(24px,2.8vw,36px)" }}
            >
              Step inside
            </h2>
          </div>
          <p className="max-w-[520px] text-base leading-[1.6] text-[#C9CCCF]">{copy.stepInsideLead}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1440px] flex-wrap items-start gap-12 px-5 pb-16 sm:px-8 sm:pb-24 lg:gap-24">
        <div className="mx-auto w-full max-w-[420px] lg:sticky lg:top-[84px]">
          <div className="flex justify-between pb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#A9ADB1]">
            <span>Product walkthrough</span>
            <span>{mocVideos.walkthrough.label}</span>
          </div>
          <MocVideoPoster
            video={mocVideos.walkthrough}
            title="Mobile Operations Centre walkthrough"
            variant="glass-circle"
            caption="Watch the walkthrough"
            subCaption="Door to stabilisers"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-10 lg:gap-14" style={{ flexBasis: 480 }}>
          <div className="border-t border-white/15">
            {insideThemes.map((theme, index) => {
              const isActive = index === activeIndex;
              const Icon = theme.icon;
              return (
                <button
                  key={theme.num}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`grid w-full cursor-pointer grid-cols-[40px_1fr_auto] items-center gap-x-5 gap-y-1 border-b border-l-[3px] border-white/15 py-5.5 pl-4 text-left ${
                    isActive ? "border-l-[color:oklch(0.74_0.14_70)] text-[#F2F0EB]" : "border-l-transparent text-[#8A8E92]"
                  }`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <span className="flex flex-col gap-1">
                    <span className="text-xl font-bold uppercase tracking-[0.02em]" style={{ fontStretch: "78%" }}>
                      {theme.title}
                    </span>
                    <span className="text-sm leading-[1.4] text-[#A9ADB1]">{theme.sub}</span>
                  </span>
                  <span className="font-mono text-xs">{theme.num}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-7">
            <div className="flex items-baseline gap-4.5 font-mono text-xs uppercase tracking-[0.14em] text-[color:oklch(0.74_0.14_70)]">
              <span>{active.num}</span>
              <span>{active.title}</span>
            </div>
            <h3
              className="max-w-[640px] font-medium leading-[1.06] tracking-[-0.02em]"
              style={{ fontSize: "clamp(20px,1.8vw,28px)" }}
            >
              {active.headline}
            </h3>
            {active.stat && (
              <div className="flex items-baseline gap-4 border-l-2 border-[color:oklch(0.74_0.14_70)] pl-5">
                <span className="font-bold leading-[0.9]" style={{ fontStretch: "68%", fontSize: "clamp(30px,3vw,42px)" }}>
                  {active.stat}
                </span>
                <span className="max-w-[180px] text-base leading-[1.35] text-[#C9CCCF]">{active.statLabel}</span>
              </div>
            )}
            <div className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2">
              {active.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4 border-b border-white/15 py-4.5 pr-4">
                    <ItemIcon className="h-6 w-6 shrink-0 text-[#F2F0EB]" aria-hidden="true" />
                    <span className="text-base leading-[1.35] text-[#E3E1DC]">{item.label}</span>
                  </div>
                );
              })}
            </div>
            {active.photo && (
              <MocPlaceholderPhoto
                src={active.photo}
                alt={`${active.title} — ${active.photoCaption}`}
                neededCaption={active.photoCaption}
                aspectClassName="aspect-[16/10]"
                tone="dark"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
