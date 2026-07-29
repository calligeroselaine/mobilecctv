import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { applications } from "@/lib/applications";

export const metadata: Metadata = {
  title: "Applications & Industries",
  description:
    "Mobile CCTV Solutions trailers and pole cameras in action across construction, events, councils, mining, utilities and disaster recovery.",
};

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Trusted Across Construction, Events, Councils & More"
        description="From building sites to festivals, unmanned utility plant to flood recovery — our trailers and pole cameras are built for sites that don't have permanent coverage."
        crumbs={[{ label: "Applications" }]}
      />

      {applications.map((app, index) => (
        <Section key={app.slug} tone={index % 2 === 0 ? "surface" : "alt"}>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className={index % 2 === 1 ? "md:order-2" : undefined}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={app.image}
                  alt={app.imageAlt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className={index % 2 === 1 ? "md:order-1" : undefined}>
              <h2 className="text-h2">{app.title}</h2>
              <p className="mt-4 text-steel-600">{app.description}</p>
              {app.relatedPostSlug && (
                <Link
                  href={`/blog/${app.relatedPostSlug}`}
                  className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
                >
                  Read the story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </Section>
      ))}

      <Section tone="brand" className="text-center">
        <h2 className="text-h2">Not Sure Which Solution Fits Your Site?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Tell us about your site and we&rsquo;ll recommend a trailer, pole
          camera, or a mix of both.
        </p>
        <div className="mt-6">
          <Button href="/contact" variant="inverse">
            Request A Quote
          </Button>
        </div>
      </Section>
    </>
  );
}
