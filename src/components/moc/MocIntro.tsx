import Image from "next/image";
import { copy, mocImages } from "@/lib/moc-content";
import { logoFont } from "@/lib/moc-fonts";

const captionClass =
  "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 font-mono text-xs tracking-[0.06em] text-white";

export function MocIntro() {
  return (
    <section style={{ background: "#F2F0EB", color: "#141619" }}>
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
          <span className="h-px w-7 bg-[#141619]" />
          {copy.introEyebrow}
        </div>
        <h2
          className={`mt-7 max-w-[1180px] leading-[1.4] tracking-normal ${logoFont.className}`}
          style={{ fontSize: "clamp(20px,2.2vw,32px)" }}
        >
          {copy.introHeading}
        </h2>

        <p className="mt-8 max-w-[860px] text-lg leading-[1.55] text-[#2A2D31] sm:text-xl lg:text-2xl">{copy.introBody}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-[0.8fr_1fr] lg:gap-5">
          <figure className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/moc-interior-control-room.jpg"
              alt="Inside the Mobile Operations Centre: a wall of live camera feeds above the operators' desk"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
            <figcaption className={captionClass}>The live camera wall.</figcaption>
          </figure>
          <div className="grid grid-cols-1 gap-4 lg:grid-rows-[1.2fr_1fr] lg:gap-5">
            <figure className="relative aspect-[3/2] overflow-hidden lg:aspect-auto">
              <Image
                src={mocImages.introExteriorDetail}
                alt="Mobile Operations Centre trailer, branded for outdoor events, live concerts and festivals, with a Mobile CCTV Solutions camera tower alongside"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <figcaption className={captionClass}>{copy.introPhotoCaption}</figcaption>
            </figure>
            <figure className="relative aspect-[3/2] overflow-hidden lg:aspect-auto">
              <Image
                src="/images/moc-interior-site-plans.jpg"
                alt="Inside the Mobile Operations Centre: site plans pinned to the wall above the team's equipment"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover object-[50%_40%]"
              />
              <figcaption className={captionClass}>Site plans on the wall, inside the unit.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
