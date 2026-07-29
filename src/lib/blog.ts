import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog posts are authored as Markdown files in /content/blog, migrated
 * verbatim from the Stage 1 audit of the live site (no fabricated posts).
 * No CMS was found in Stage 1 audit — the site ran WordPress, but this
 * rebuild is static, so local Markdown is the maintainable equivalent.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  order: number;
  excerpt: string;
  reviewNote?: string;
  contentHtml: string;
};

export type BlogPostSummary = Omit<BlogPost, "contentHtml">;

function readAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostSummary[] {
  return readAllSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        order: data.order as number,
        excerpt: data.excerpt as string,
        reviewNote: data.reviewNote as string | undefined,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    order: data.order as number,
    excerpt: data.excerpt as string,
    reviewNote: data.reviewNote as string | undefined,
    contentHtml,
  };
}

/** Home page shows the 3 most recent (lowest `order`). */
export function getRecentPosts(count = 3): BlogPostSummary[] {
  return getAllPosts().slice(0, count);
}
