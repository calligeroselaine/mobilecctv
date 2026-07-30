import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Insights",
  description:
    "Real mobile CCTV deployments from Mobile CCTV Solutions — event security, council partnerships, construction site protection and disaster recovery.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        title="Mobile CCTV Blog"
        description="Real deployments, real results — from festival security to flood recovery."
        crumbs={[{ label: "Blog" }]}
      />

      <Section tone="surface">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="block rounded-xl border border-steel-200 p-8 transition-shadow hover:shadow-lg md:p-10"
          >
            <p className="text-eyebrow font-bold uppercase text-brand">
              {featured.date} · Featured
            </p>
            <h2 className="text-h2 mt-3">{featured.title}</h2>
            <p className="mt-3 max-w-2xl text-steel-600">{featured.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand">
              Read More
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        )}

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {rest.map((post) => (
            <article key={post.slug} className="border-t border-steel-200 pt-6">
              <p className="text-eyebrow font-bold uppercase text-brand">
                {post.date}
              </p>
              <h3 className="text-h3 mt-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-steel-600">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
