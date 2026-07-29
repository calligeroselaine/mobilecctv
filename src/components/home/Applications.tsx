import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { applications } from "@/lib/applications";

export function Applications() {
  return (
    <Section tone="ink">
      <SectionHeading
        eyebrow="Applications"
        title="Trusted Across Construction, Events, Councils & More"
        onDark
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <div
            key={app.slug}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-h3 text-white">{app.title}</h3>
            <p className="mt-2 text-steel-200">{app.description}</p>
            <Link
              href={app.relatedPostSlug ? `/blog/${app.relatedPostSlug}` : "/applications"}
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-white hover:text-brand-soft"
            >
              {app.relatedPostSlug ? "Read the story" : "Learn more"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
