import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/solutions/SolutionPageTemplate";
import { getSolutionBySlug } from "@/lib/solutions";
import { buildMetadata } from "@/lib/metadata";

const solution = getSolutionBySlug("vacant-properties")!;

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

export default function VacantPropertiesPage() {
  return <SolutionPageTemplate solution={solution} />;
}
