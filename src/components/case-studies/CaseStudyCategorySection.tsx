import Image from "next/image";
import { AlertTriangle, Settings2, BarChart3, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { CaseStudyCategory, CaseStudy } from "@/lib/caseStudies";

type CaseStudyCategorySectionProps = {
  category: CaseStudyCategory;
  /** Set false when the host page already has its own closing CTA right
   * after this section (e.g. embedded on a product page) — avoids two
   * near-identical CTA bands stacked back to back. Defaults to true. */
  showClosingCta?: boolean;
};

const infoRows = [
  { key: "challenge" as const, label: "The Challenge", icon: AlertTriangle },
  { key: "solution" as const, label: "The Solution", icon: Settings2 },
  { key: "result" as const, label: "The Result", icon: BarChart3 },
];

function CaseStudyBlock({ study }: { study: CaseStudy }) {
  return (
    <article className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
      <div>
        <p className="text-eyebrow font-bold uppercase text-brand">
          Case Study <span className="ml-2 inline-block h-px w-8 align-middle bg-brand-light" />
        </p>
        <h3 className="text-h3 mt-2">{study.clientName}</h3>
        <p className="text-lg text-steel-600">{study.projectName}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-steel-600">
          {study.metaTags.map((tag) => (
            <span key={tag.label} className="inline-flex items-center gap-1.5">
              <tag.icon className="h-4 w-4 text-brand" aria-hidden="true" />
              {tag.label}
            </span>
          ))}
        </div>

        <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={study.image}
            alt={study.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 pt-16">
            <p className="text-base font-semibold leading-snug text-white">
              {study.resultHighlight}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-steel-200">
              {study.clientName}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {infoRows.map((row) => (
          <div key={row.key} className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
              <row.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-lg font-bold">{row.label}</h4>
              <p className="mt-1 text-steel-600">{study[row.key]}</p>
            </div>
          </div>
        ))}

        {study.whyTheyCameBack && (
          <div className="flex gap-4 rounded-xl bg-brand-soft p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand">
              <Users className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Why They Came Back</h4>
              <p className="mt-1 text-steel-600">{study.whyTheyCameBack}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function CaseStudyCategorySection({ category, showClosingCta = true }: CaseStudyCategorySectionProps) {
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
          <p className="text-eyebrow inline-flex items-center gap-3 font-bold uppercase text-brand-light">
            {category.heroEyebrow}
            <span className="inline-block h-px w-10 bg-brand-light" />
          </p>
          <h2 className="text-h2 mt-2 max-w-2xl">{category.heroTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-steel-200">{category.heroIntro}</p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {category.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white p-5 text-ink shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <stat.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-3 text-3xl font-extrabold">{stat.value}</p>
                <p className="mt-1 text-sm font-bold uppercase tracking-wide text-ink">{stat.label}</p>
                {stat.sublabel && (
                  <p className="text-sm text-steel-600">{stat.sublabel}</p>
                )}
                <span className="mt-2 block h-0.5 w-6 bg-brand" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section tone="surface">
        <div className="space-y-16">
          {category.caseStudies.map((study) => (
            <CaseStudyBlock key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      {showClosingCta && (
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
      )}
    </>
  );
}
