import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { trailerCopy, trailerCta, trailerImages } from "@/lib/trailer-content";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function TrailerHero() {
  return (
    <section id="trailer-hero" className="relative overflow-hidden bg-[#16191C] text-[#F2F0EB]">
      <div className="grid grid-cols-1 lg:min-h-[640px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-2 flex flex-col justify-end px-5 py-12 sm:px-8 lg:order-1 lg:py-16 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:pr-12">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#C9CCCF]">{trailerCopy.heroMeta}</div>
          <div className="sr-only">
            <Breadcrumbs crumbs={[{ label: "Mobile CCTV Trailers" }]} />
          </div>
          <h1
            className="mt-5 font-bold uppercase leading-[0.86] tracking-[-0.02em]"
            style={{ fontStretch: "66%", fontSize: "clamp(34px,6.2vw,92px)" }}
          >
            Mobile CCTV
            <br />
            Trailers
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-[1.4] text-[#E3E1DC] sm:text-xl">{trailerCopy.heroLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={trailerCta.hire}
              className="inline-flex items-center gap-2.5 bg-[#4588c6] px-7 py-4 text-base font-semibold text-white hover:bg-[#387bb8]"
            >
              Hire enquiry <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={trailerCta.purchase}
              className="inline-flex items-center gap-2.5 border border-white/40 px-7 py-4 text-base font-medium text-[#F2F0EB] hover:bg-white/10"
            >
              Purchase enquiry
            </a>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3] w-full lg:order-2 lg:aspect-auto">
          <Image
            src={trailerImages.hero}
            alt="A Mobile CCTV Solutions trailer with raised camera mast and solar panels deployed on a grassy hill"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-[47%_60%]"
          />
        </div>
      </div>
      <div className="border-t border-white/15">
        <ul className="mx-auto flex max-w-[1440px] flex-wrap gap-x-10 gap-y-2 px-5 py-4 font-mono text-xs uppercase tracking-[0.12em] text-[#C9CCCF] sm:px-8">
          {trailerCopy.heroFacts.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span className="h-px w-5 bg-[#4588c6]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
