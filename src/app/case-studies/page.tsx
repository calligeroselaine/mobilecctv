import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyCategorySection } from "@/components/case-studies/CaseStudyCategorySection";
import { JsonLd } from "@/components/ui/JsonLd";
import { caseStudyCategories } from "@/lib/caseStudies";
import { business } from "@/lib/business";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Real sites, real challenges, real results. See how Mobile CCTV Solutions' trailers, pole cameras and Mobile Operations Centres have been deployed for construction sites, marathons, festivals and major events across Australia.",
  path: "/case-studies",
  image: {
    src: "/images/case-study-adco-forest-high-school.jpg",
    width: 2000,
    height: 1600,
    alt: "Mobile CCTV Solutions team on site with a client at a construction project",
  },
});

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Case Studies",
  description: metadata.description,
  url: `${business.siteUrl}/case-studies`,
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <PageHero
        eyebrow="Case Studies"
        title="Real Sites. Real Challenges. Real Results."
        description="From construction site theft to marathons, festivals and multi-day motorsport events — see how our mobile CCTV trailers, pole cameras and Mobile Operations Centres perform under real conditions."
        crumbs={[{ label: "Case Studies" }]}
      />

      {caseStudyCategories.map((category) => (
        <CaseStudyCategorySection key={category.id} category={category} />
      ))}
    </>
  );
}
