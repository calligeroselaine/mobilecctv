import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/lib/business";
import { buildMetadata } from "@/lib/metadata";
import { mocArchivo } from "@/lib/moc-fonts";
import { poleFaqs } from "@/lib/pole-content";
import { PoleHero } from "@/components/poles/PoleHero";
import { PoleIntro } from "@/components/poles/PoleIntro";
import { PoleCapabilities } from "@/components/poles/PoleCapabilities";
import { PoleAction } from "@/components/poles/PoleAction";
import { PoleApplications } from "@/components/poles/PoleApplications";
import { PoleMarathon } from "@/components/poles/PoleMarathon";
import { PoleBathurst } from "@/components/poles/PoleBathurst";
import { PoleFaq } from "@/components/poles/PoleFaq";
import { PoleCta } from "@/components/poles/PoleCta";


export const metadata: Metadata = buildMetadata({
  title: "Pole-Mounted CCTV Cameras",
  description:
    "Solar-powered, pole-mounted remote surveillance cameras for sites without power or network infrastructure — cloud recording, for sale or hire across Australia.",
  path: "/pole-cameras",
  image: {
    src: "/images/solar-cctv-pole-cam.jpg",
    width: 1000,
    height: 1333,
    alt: "Mobi Pole Cam solar-powered surveillance unit",
  },
});


const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Mobi Pole Cam",
  description:
    "Standalone solar-powered pole camera for sites without power or network infrastructure, with cloud-based recording.",
  image: `${business.siteUrl}/images/solar-cctv-pole-cam.jpg`,
  brand: { "@type": "Brand", name: business.name },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: poleFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function PoleCamerasPage() {
  return (
    <div className={mocArchivo.className}>
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PoleHero />
      <PoleIntro />
      <PoleCapabilities />
      <PoleAction />
      <PoleApplications />
      <PoleMarathon />
      <PoleBathurst />
      <PoleFaq />
      <PoleCta />
    </div>
  );
}
