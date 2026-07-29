import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { recentBlogPosts } from "@/lib/blog";

export function RecentBlog() {
  return (
    <Section tone="surface">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="From The Blog" title="Recent Insights" />
        <Button href="/blog" variant="secondary">
          View All Posts
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {recentBlogPosts.map((post) => (
          <article key={post.slug}>
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
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
