import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
import { caseStudiesIndex } from "@/lib/caseStudiesIndex";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Real Mobile CCTV Solutions deployments — councils, construction sites and major events — with the challenge, the solution and the result for each.",
  path: "/case-studies",
  image: {
    src: "/images/case-study-ramadan-nights.jpg",
    width: 1920,
    height: 900,
    alt: "Ramadan Nights market crowd in Lakemba, with a Mobile CCTV Solutions camera tower overlooking the street",
  },
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Real Deployments"
        title="Case Studies"
        description="Councils, construction sites and major events who've used Mobile CCTV Solutions — the challenge, the solution and the result, from the client's own site."
        crumbs={[{ label: "Case Studies" }]}
      />

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudiesIndex.map((study) => (
            <Link
              key={study.slug}
              href={study.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-steel-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {study.product}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-eyebrow font-bold uppercase text-brand">{study.client}</p>
                <h2 className="text-h3 mt-1.5">{study.project}</h2>
                <p className="mt-1 text-sm text-steel-400">{study.place}</p>
                <p className="mt-3 flex-1 text-steel-600">{study.result}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand">
                  Read the full case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
