import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SolutionPageTemplate } from "@/components/solutions/SolutionPageTemplate";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getSolutionBySlug } from "@/lib/solutions";
import { buildMetadata } from "@/lib/metadata";
import { caseStudyCategories } from "@/lib/caseStudies";

const solution = getSolutionBySlug("events-temporary-sites")!;
const fullEventsCaseStudies = caseStudyCategories.find(
  (category) => category.id === "mobile-operations-centre"
)!;

// Trimmed to a single teaser case study now that the full Mobile
// Operations Centre story (walkthrough, Ramadan Nights, Bathurst, FAQ,
// enquiry) lives on its own dedicated page — see the "Read the full
// story" link below. Superseded by the dedicated page; kept here as a
// short teaser only, per the Sep 2026 Mobile Operations Centre page build.
const eventsCaseStudies = {
  ...fullEventsCaseStudies,
  caseStudies: fullEventsCaseStudies.caseStudies.slice(0, 1),
};

export const metadata: Metadata = buildMetadata({
  title: solution.metaTitle,
  description: solution.metaDescription,
  path: solution.path,
  image: {
    src: solution.heroImage.src,
    width: 1000,
    height: 1333,
    alt: solution.heroImage.alt,
  },
});

export default function EventsTemporarySitesPage() {
  return (
    <>
      <SolutionPageTemplate solution={solution} caseStudyCategory={eventsCaseStudies} />
      <Section tone="alt" className="!py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading
            eyebrow="Mobile Operations Centre"
            title="See the full walkthrough, deployments and FAQ"
            align="center"
          />
          <Button href="/mobile-operations-centre" className="mt-2">
            Explore the Mobile Operations Centre <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
