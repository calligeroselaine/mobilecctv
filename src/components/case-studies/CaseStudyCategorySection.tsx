import Image from "next/image";
import { Barlow_Condensed } from "next/font/google";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { CaseStudyCategory, CaseStudy } from "@/lib/caseStudies";

/**
 * A bold condensed display face for case-study numerals and headlines —
 * scoped to this component only (not the site's default sans) so the
 * "editorial dossier" treatment reads as a deliberate departure for this
 * content, not a site-wide rebrand.
 */
const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

type CaseStudyCategorySectionProps = {
  category: CaseStudyCategory;
  /** Set false when the host page already has its own closing CTA right
   * after this section (e.g. embedded on a product page) — avoids two
   * near-identical CTA bands stacked back to back. Defaults to true. */
  showClosingCta?: boolean;
};

const infoRows = [
  { key: "challenge" as const, label: "The Challenge" },
  { key: "solution" as const, label: "The Solution" },
  { key: "result" as const, label: "The Result" },
];

function CaseStudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  const folio = String(index + 1).padStart(2, "0");

  return (
    <article className="border-t border-steel-200 pt-10 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className={`${condensed.className} text-4xl font-extrabold leading-none text-steel-200`}>
          {folio}
        </span>
        <p className="text-eyebrow font-bold uppercase text-brand">Case Study</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h3 className={`${condensed.className} text-4xl font-bold uppercase leading-[1.05] tracking-tight`}>
            {study.clientName}
          </h3>
          <p className="mt-1 italic text-steel-600">{study.projectName}</p>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold uppercase tracking-wide text-steel-600">
            {study.metaTags.map((tag, i) => (
              <span key={tag.label} className="inline-flex items-center">
                {i > 0 && <span className="mr-2 text-steel-400" aria-hidden="true">&middot;</span>}
                {tag.label}
              </span>
            ))}
          </p>

          <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden border border-steel-200">
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 pt-16">
              <p className={`${condensed.className} text-xl font-semibold leading-snug text-white`}>
                {study.resultHighlight}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-steel-200">
                {study.clientName}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {infoRows.map((row) => (
            <div key={row.key} className="border-t border-steel-200 pt-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand">
                {row.label}
              </h4>
              <p className="mt-2 text-steel-600">{study[row.key]}</p>
            </div>
          ))}

          {study.whyTheyCameBack && (
            <div className="border-l-2 border-brand py-1 pl-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand">
                Why They Came Back
              </h4>
              <p className="mt-2 italic text-steel-600">{study.whyTheyCameBack}</p>
            </div>
          )}
        </div>
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
          <h2 className={`${condensed.className} mt-2 max-w-2xl text-5xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-6xl`}>
            {category.heroTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-steel-200">{category.heroIntro}</p>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/20 pt-8 md:grid-cols-4">
            {category.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`border-white/20 pl-6 md:border-l ${i === 0 ? "md:border-l-0 md:pl-0" : ""}`}
              >
                <stat.icon className="h-6 w-6 text-brand-light" aria-hidden="true" />
                <p className={`${condensed.className} mt-3 text-4xl font-extrabold leading-none text-white md:text-5xl`}>
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-white">
                  {stat.label}
                </p>
                {stat.sublabel && (
                  <p className="mt-0.5 text-sm text-steel-200">{stat.sublabel}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section tone="surface">
        <div className="space-y-14">
          {category.caseStudies.map((study, index) => (
            <CaseStudyBlock key={study.slug} study={study} index={index} />
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
