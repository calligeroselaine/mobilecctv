import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { copy, heroFacts, mocImages } from "@/lib/moc-content";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function MocHero() {
  return (
    <section style={{ background: "#16191C", color: "#F2F0EB" }} className="overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em] text-[#A9ADB1]">
          <Breadcrumbs crumbs={[{ label: "Mobile Operations Centre" }]} />
          <span>{copy.heroMetaRight}</span>
        </div>
        <h1
          className="relative z-[2] mt-5 mb-8 font-bold uppercase leading-[0.9] tracking-[-0.01em] sm:mb-10"
          style={{ fontStretch: "68%", fontSize: "clamp(26px,3.6vw,44px)" }}
        >
          Mobile
          <br />
          Operations Centre
        </h1>
      </div>

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="relative aspect-[16/8] min-h-[300px] w-full bg-[#0E1012]">
          <Image
            src={mocImages.heroExterior}
            alt="Mobile CCTV Solutions' Mobile Operations Centre trailer, branded for outdoor events, deployed on site"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-end gap-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-2">
        <p className="max-w-[640px] text-lg font-normal leading-[1.4] tracking-[-0.01em] sm:text-xl">
          {copy.heroLead}
        </p>
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap gap-3">
            <a
              href="#enquire"
              className="inline-flex items-center gap-2.5 bg-[color:oklch(0.74_0.14_70)] px-7 py-4.5 text-base font-semibold text-[#141619]"
              style={{ padding: "18px 28px" }}
            >
              Enquire about availability <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#inside"
              className="inline-flex items-center gap-2.5 border border-white/35 px-7 py-4.5 text-base font-medium text-[#F2F0EB]"
              style={{ padding: "18px 28px" }}
            >
              <PlayCircle className="h-5 w-5" aria-hidden="true" /> Step inside
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 border-t border-white/15 pt-4 sm:grid-cols-3">
            {heroFacts.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <Icon className="h-[22px] w-[22px] text-[color:oklch(0.74_0.14_70)]" aria-hidden="true" />
                <span className="text-sm leading-[1.35] text-[#C9CCCF]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
