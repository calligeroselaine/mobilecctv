import Image from "next/image";
import { copy, mocImages } from "@/lib/moc-content";
import { logoFont } from "@/lib/moc-fonts";
import { MocPlaceholderPhoto } from "@/components/moc/MocPlaceholderPhoto";

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

        <div className="mt-12 grid grid-cols-1 items-start gap-10 sm:mt-16 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div className="flex flex-col gap-4">
            <MocPlaceholderPhoto
              src={mocImages.introExteriorDetail}
              alt="Mobile Operations Centre trailer, branded for outdoor events, live concerts and festivals, with a Mobile CCTV Solutions camera tower alongside"
              neededCaption="exterior detail — entry door, fingerprint reader, flood lighting"
              aspectClassName="aspect-[3/2]" priority={false}
              tone="light"
            />
            <p className="font-mono text-xs tracking-[0.06em] text-[#5B5F63]">{copy.introPhotoCaption}</p>
          </div>
          <div className="flex flex-col gap-8">
            <p className="max-w-[560px] text-base leading-[1.6] text-[#2A2D31] sm:text-lg">{copy.introBody}</p>
            <div className="grid grid-cols-[2fr_3.75fr] items-start gap-4">
              <figure className="flex flex-col gap-3">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <Image
                    src="/images/moc-interior-control-room.jpg"
                    alt="Inside the Mobile Operations Centre: a wall of live camera feeds above the operators' desk"
                    fill
                    sizes="(min-width: 1024px) 15vw, 35vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="font-mono text-xs tracking-[0.06em] text-[#5B5F63]">The live camera wall.</figcaption>
              </figure>
              <figure className="flex flex-col gap-3">
                <div className="relative aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src="/images/moc-interior-site-plans.jpg"
                    alt="Inside the Mobile Operations Centre: site plans pinned to the wall above the team's equipment"
                    fill
                    sizes="(min-width: 1024px) 28vw, 65vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="font-mono text-xs tracking-[0.06em] text-[#5B5F63]">Site plans on the wall, inside the unit.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
