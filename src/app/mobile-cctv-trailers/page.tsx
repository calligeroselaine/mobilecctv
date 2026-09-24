import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/lib/business";
import { buildMetadata } from "@/lib/metadata";
import { mocArchivo } from "@/lib/moc-fonts";
import { trailerFaqs } from "@/lib/trailer-content";
import { TrailerHero } from "@/components/trailers/TrailerHero";
import { TrailerIntro } from "@/components/trailers/TrailerIntro";
import { TrailerCapabilities } from "@/components/trailers/TrailerCapabilities";
import { TrailerAction } from "@/components/trailers/TrailerAction";
import { TrailerApplications } from "@/components/trailers/TrailerApplications";
import { TrailerAdco } from "@/components/trailers/TrailerAdco";
import { TrailerGranny } from "@/components/trailers/TrailerGranny";
import { TrailerFaq } from "@/components/trailers/TrailerFaq";
import { TrailerCta } from "@/components/trailers/TrailerCta";


export const metadata: Metadata = buildMetadata({
  title: "Mobile CCTV Trailers & Trailer Hire",
  description:
    "Solar-powered mobile CCTV trailers for sale or hire across Australia. Ideal for construction site CCTV and temporary site security — deployed in minutes, monitored remotely.",
  path: "/mobile-cctv-trailers",
  image: {
    src: "/images/mobile-cctv-trailers.jpg",
    width: 1106,
    height: 626,
    alt: "Mobile CCTV trailer with solar panels and camera mast",
  },
});


const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Mobile CCTV Trailer Camera",
  description:
    "Solar-powered, towable surveillance trailer with 360° camera coverage, PIR detection and remote live access.",
  image: `${business.siteUrl}/images/mobile-cctv-trailers.jpg`,
  brand: { "@type": "Brand", name: business.name },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: trailerFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function TrailersPage() {
  return (
    <div className={mocArchivo.className}>
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />
      <TrailerHero />
      <TrailerIntro />
      <TrailerCapabilities />
      <TrailerAction />
      <TrailerApplications />
      <TrailerAdco />
      <TrailerGranny />
      <TrailerFaq />
      <TrailerCta />
    </div>
  );
}
