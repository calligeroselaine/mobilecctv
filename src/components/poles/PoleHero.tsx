import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { poleCopy, poleCta, poleImages } from "@/lib/pole-content";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function PoleHero() {
  return (
    <section className="bg-[#16191C] text-[#F2F0EB]">
      <div className="border-b border-white/15">
        <div className="mx-auto flex max-w-[1440px] items-center px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] text-[#C9CCCF] sm:px-8">
          <span>{poleCopy.heroMeta}</span>
          <div className="sr-only">
            <Breadcrumbs crumbs={[{ label: "Pole Cameras" }]} />
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,700px)_374px] lg:justify-start lg:gap-16 lg:py-16">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold uppercase leading-[0.9] tracking-[-0.02em]" style={{ fontStretch: "66%", fontSize: "clamp(28px,3.8vw,48px)" }}>
            Pole Cameras
          </h1>
          <p className="mt-6 max-w-[620px] text-lg leading-[1.4] text-[#E3E1DC] sm:text-xl">{poleCopy.heroLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={poleCta.hire} className="inline-flex items-center gap-2.5 bg-[#4588c6] px-7 py-4 text-base font-semibold text-white hover:bg-[#387bb8]">
              Hire enquiry <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={poleCta.purchase} className="inline-flex items-center gap-2.5 border border-white/40 px-7 py-4 text-base font-medium hover:bg-white/10">
              Purchase enquiry
            </a>
          </div>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[360px] overflow-hidden lg:mx-0 lg:w-[374px] lg:max-w-none">
          <Image
            src={poleImages.hero}
            alt="A Mobi Pole Cam solar-powered surveillance unit on a pole against bushland"
            fill
            priority
            sizes="(min-width: 1024px) 374px, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
