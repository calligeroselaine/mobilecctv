import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const products = [
  {
    href: "/mobile-cctv-trailers",
    image: "/images/mobile-cctv-trailers.jpg",
    alt: "Mobile CCTV trailer with solar panels and camera mast",
    title: "Mobile CCTV Trailers",
    description:
      "Solar-powered, towable surveillance trailers with 360° camera coverage, PIR detection and remote live access — deployed in minutes, no mains power required.",
    cta: "Explore Trailers",
  },
  {
    href: "/pole-cameras",
    image: "/images/solar-cctv-pole-cam.jpg",
    alt: "Mobi Pole Cam solar-powered surveillance unit",
    title: "Pole Cameras",
    description:
      "Standalone solar pole cameras for sites without power or network infrastructure — fixed or 4x-zoom PTZ, with 7–30 day cloud recording.",
    cta: "Explore Pole Cameras",
  },
];

export function ProductOverview() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Our Equipment"
        title="Two Ways To Deploy Surveillance, Anywhere"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.href}
            href={product.href}
            className="group rounded-xl border border-steel-200 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-h3 mt-5">{product.title}</h3>
            <p className="mt-2 text-steel-600">{product.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand group-hover:text-brand-dark">
              {product.cta}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
