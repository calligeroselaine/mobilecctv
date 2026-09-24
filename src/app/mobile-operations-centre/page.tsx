import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/lib/business";
import { buildMetadata } from "@/lib/metadata";
import { faqs, mocImages } from "@/lib/moc-content";
import { mocArchivo } from "@/lib/moc-fonts";
import { MocSubNav } from "@/components/moc/MocSubNav";
import { MocHero } from "@/components/moc/MocHero";
import { MocIntro } from "@/components/moc/MocIntro";
import { MocStepInside } from "@/components/moc/MocStepInside";
import { MocWhy } from "@/components/moc/MocWhy";
import { MocApplications } from "@/components/moc/MocApplications";
import { MocRamadan } from "@/components/moc/MocRamadan";
import { MocBathurst } from "@/components/moc/MocBathurst";
import { MocFaq } from "@/components/moc/MocFaq";
import { MocEnquiry } from "@/components/moc/MocEnquiry";
import { MocStickyCta } from "@/components/moc/MocStickyCta";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Operations Centre — Event & Site Command Room Hire",
  description:
    "A secure, self-contained mobile operations centre for events, councils and remote sites — fingerprint access, Starlink connectivity, bathroom facilities and hydraulic stabilisers. Available for hire, Australia-wide.",
  path: "/mobile-operations-centre",
  image: {
    src: mocImages.heroExterior,
    width: 2000,
    height: 1333,
    alt: "Mobile CCTV Solutions' Mobile Operations Centre trailer, branded for outdoor events, deployed on site",
  },
});

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Mobile Operations Centre",
  description:
    "A secure, self-contained, towable operations room providing workspace, connectivity, bathroom facilities and water capability for event, security and council teams on sites with little existing infrastructure.",
  image: `${business.siteUrl}${mocImages.heroExterior}`,
  brand: { "@type": "Brand", name: business.name },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function MobileOperationsCentrePage() {
  return (
    <div className={mocArchivo.className}>
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />

      <MocSubNav />
      <MocHero />
      <MocIntro />
      <MocStepInside />
      <MocWhy />
      <MocApplications />
      <MocRamadan />
      <MocBathurst />
      <MocFaq />
      <MocEnquiry />
      <MocStickyCta />
    </div>
  );
}
