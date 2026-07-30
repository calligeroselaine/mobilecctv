import type { Metadata } from "next";
import Image from "next/image";
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
            className="grid grid-cols-1 gap-6 rounded-xl border border-steel-200 p-8 transition-shadow hover:shadow-lg md:grid-cols-2 md:p-10"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg md:order-2">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="md:order-1">
              <p className="text-eyebrow font-bold uppercase text-brand">
                {featured.date} · Featured
              </p>
              <h2 className="text-h2 mt-3">{featured.title}</h2>
              <p className="mt-3 max-w-2xl text-steel-600">{featured.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand">
                Read More
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        )}

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {rest.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-xl border border-steel-200">
              <Link href={`/blog/${post.slug}`} className="relative block aspect-video w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </Link>
              <div className="p-6">
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
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
