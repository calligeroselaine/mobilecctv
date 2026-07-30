import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

/**
 * Login was removed from this rebuild entirely (see stage notes), so
 * there is no /login/ route to disallow — it simply doesn't exist.
 * /api/ is disallowed since it's a backend endpoint, not a page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
