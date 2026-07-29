import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { business } from "@/lib/business";

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
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

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

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-steel-200 pt-8">
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
