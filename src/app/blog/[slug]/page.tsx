import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/blog";
import { business } from "@/lib/business";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name },
    mainEntityOfPage: `${business.siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={blogPostingJsonLd} />
      <PageHero
        eyebrow={`${post.date} · Mobile CCTV Blog`}
        title={post.title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          {post.reviewNote && (
            <div className="mb-8">
              <ReviewFlag note={post.reviewNote} />
            </div>
          )}

          <div
            className="[&_p]:mb-4 [&_p]:text-steel-600 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_li]:text-steel-600 [&_strong]:font-semibold [&_strong]:text-ink"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.relatedPage && post.relatedLabel && (
            <div className="mt-8 rounded-lg border border-steel-200 bg-surface-alt p-5">
              <p className="text-sm text-steel-600">Related solution</p>
              <Link
                href={post.relatedPage}
                className="mt-1 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
              >
                {post.relatedLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {(previous || next) && (
            <nav
              aria-label="More posts"
              className="mt-10 grid grid-cols-1 gap-4 border-t border-steel-200 pt-8 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group rounded-lg border border-steel-200 p-4 hover:border-brand"
                >
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </span>
                  <p className="mt-1 font-semibold text-ink group-hover:text-brand">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-lg border border-steel-200 p-4 text-right hover:border-brand"
                >
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <p className="mt-1 font-semibold text-ink group-hover:text-brand">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-steel-200 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back To Blog
            </Link>
            <Button href="/contact">Contact Us</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
