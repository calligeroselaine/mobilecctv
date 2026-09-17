import Image from "next/image";
import { MapPin, Briefcase } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import type { CaseStudyCategory } from "@/lib/caseStudies";

type CaseStudyCategorySectionProps = {
  category: CaseStudyCategory;
};

export function CaseStudyCategorySection({ category }: CaseStudyCategorySectionProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src={category.heroImage}
          alt={category.heroImageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="text-eyebrow font-bold uppercase text-brand-light">
            {category.heroEyebrow}
          </p>
          <h2 className="text-h2 mt-2 max-w-2xl">{category.heroTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-steel-200">{category.heroIntro}</p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {category.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <stat.icon className="h-6 w-6 text-brand-light" aria-hidden="true" />
                <p className="mt-3 text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-steel-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section tone="surface">
        <div className="space-y-16">
          {category.caseStudies.map((study) => (
            <article
              key={study.slug}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={study.image}
                  alt={study.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-steel-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-brand" aria-hidden="true" />
                    {study.client}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                    {study.location}
                  </span>
                </div>
                <h3 className="text-h3 mt-3">{study.title}</h3>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wide text-brand">
                      The Challenge
                    </dt>
                    <dd className="mt-1.5 text-steel-600">{study.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wide text-brand">
                      The Solution
                    </dt>
                    <dd className="mt-1.5 text-steel-600">{study.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wide text-brand">
                      The Result
                    </dt>
                    <dd className="mt-1.5 text-steel-600">{study.result}</dd>
                  </div>
                </dl>

                {study.clientProof && (
                  <p className="mt-6 border-l-2 border-brand-light pl-4 text-sm text-steel-600">
                    {study.clientProof}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {category.pendingNote && (
          <div className="mt-16">
            <ReviewFlag note={category.pendingNote} />
          </div>
        )}
      </Section>

      <Section tone="brand">
        <SectionHeading title={category.closingCta.heading} align="center" onDark />
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-white/90">
          {category.closingCta.description}
        </p>
        <div className="mt-8 flex justify-center">
          <Button href={category.closingCta.href} variant="inverse">
            {category.closingCta.buttonLabel}
          </Button>
        </div>
      </Section>
    </>
  );
}
