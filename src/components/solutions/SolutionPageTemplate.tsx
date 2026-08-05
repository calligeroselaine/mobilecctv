import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { benefits as allBenefits } from "@/lib/benefits";
import { getPostBySlug } from "@/lib/blog";
import { business } from "@/lib/business";
import type { Solution } from "@/lib/solutions";

type SolutionPageTemplateProps = {
  solution: Solution;
};

export function SolutionPageTemplate({ solution }: SolutionPageTemplateProps) {
  const relevantBenefits = allBenefits.filter((benefit) =>
    solution.benefitTitles.includes(benefit.title)
  );
  const caseStudies = solution.caseStudySlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: solution.metaTitle,
    provider: { "@type": "LocalBusiness", name: business.name },
    areaServed: "AU",
    description: solution.metaDescription,
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <PageHero
        eyebrow={solution.heroEyebrow}
        title={solution.heroTitle}
        description={solution.heroDescription}
        crumbs={[{ label: "Solutions" }, { label: solution.navLabel }]}
      >
        {solution.heroCta && solution.heroCta.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {solution.heroCta.map((cta, index) => (
              <Button key={cta.label} href={cta.href} variant={index === 0 ? "primary" : "secondary"}>
                {cta.label}
              </Button>
            ))}
          </div>
        )}
      </PageHero>

      <Section tone="surface">
        <SectionHeading eyebrow="The Challenge" title="What You're Up Against" />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {solution.problems.map((problem) => (
            <div key={problem.title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-warning-bg text-warning">
                <ShieldAlert className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-h3 mt-4">{problem.title}</h3>
              <p className="mt-2 text-steel-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading eyebrow="Recommended For You" title="Relevant Solutions" />
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {solution.products.map((product) => (
            <Link
              key={product.title}
              href={product.href}
              className="group rounded-xl border border-steel-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-h3 mt-5">{product.title}</h3>
              <p className="mt-2 text-steel-600">{product.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand group-hover:text-brand-dark">
                {product.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Why It Works" title="Built For This" />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relevantBenefits.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-h3 mt-4">{title}</h3>
              <p className="mt-2 text-steel-600">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {caseStudies.length > 0 && (
        <Section tone="alt">
          <SectionHeading eyebrow="Real Deployments" title="Case Studies" />
          {solution.reviewNote && (
            <div className="mt-4">
              <ReviewFlag note={solution.reviewNote} />
            </div>
          )}
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {caseStudies.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-steel-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-h3">{post.title}</h3>
                  <p className="mt-2 text-steel-600">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand group-hover:text-brand-dark">
                    Read The Story
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section tone="surface">
        <SectionHeading eyebrow="FAQs" title="Common Questions" align="center" />
        <div className="mt-10">
          <Faq items={solution.faqs} />
        </div>
      </Section>

      <Section tone="brand" className="text-center">
        <h2 className="text-h2">{solution.finalCtaHeading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">{solution.finalCtaDescription}</p>
        <div className="mt-6">
          <Button href={solution.finalCtaHref ?? "/contact"} variant="inverse">
            {solution.finalCtaButtonLabel}
          </Button>
        </div>
      </Section>
    </>
  );
}
