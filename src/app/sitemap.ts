import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { getAllPosts } from "@/lib/blog";

/**
 * All public, indexable pages. Deliberately excludes: the removed /login/
 * page, any preview/dev URLs, and the contact form (no separate
 * success/error route exists to accidentally index — see ContactForm.tsx).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${business.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${business.siteUrl}/mobile-cctv-trailers`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${business.siteUrl}/pole-cameras`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${business.siteUrl}/applications`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${business.siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${business.siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${business.siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${business.siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${business.siteUrl}/legals`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${business.siteUrl}/blog/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
