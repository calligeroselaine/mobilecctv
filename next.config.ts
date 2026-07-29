import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Renamed pages
      { source: "/about-mobile-cctv-solutions", destination: "/about", permanent: true },
      { source: "/trailer-camera", destination: "/mobile-cctv-trailers", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },

      // Old broken/orphaned pages (client confirmed redundant) — sent to
      // the closest live equivalent instead of left 404
      { source: "/trailer-cams", destination: "/mobile-cctv-trailers", permanent: true },
      { source: "/our-products", destination: "/mobile-cctv-trailers", permanent: true },

      // Login removed entirely per client direction
      { source: "/login", destination: "/contact", permanent: true },

      // Blog posts: old site used flat root-level slugs, new site nests
      // under /blog/ — same slug text preserved, redirect adds the prefix
      {
        source: "/securing-the-granny-smith-festival-with-mobile-cctv-solutions",
        destination: "/blog/securing-the-granny-smith-festival-with-mobile-cctv-solutions",
        permanent: true,
      },
      {
        source: "/safeguarding-our-communities",
        destination: "/blog/safeguarding-our-communities",
        permanent: true,
      },
      {
        source: "/safeguarding-tradition-the-crucial-role-of-mobile-cctv-solutions-at-sydneys-largest-ramadan-festival",
        destination: "/blog/safeguarding-tradition-the-crucial-role-of-mobile-cctv-solutions-at-sydneys-largest-ramadan-festival",
        permanent: true,
      },
      {
        source: "/combating-youth-crime-in-queensland",
        destination: "/blog/combating-youth-crime-in-queensland",
        permanent: true,
      },
      {
        source: "/security-protection-for-over-1-million-people",
        destination: "/blog/security-protection-for-over-1-million-people",
        permanent: true,
      },
      {
        source: "/end-of-financial-year",
        destination: "/blog/end-of-financial-year",
        permanent: true,
      },
      {
        source: "/immediate-security-and-live-monitoring-for-flood-affected-areas",
        destination: "/blog/immediate-security-and-live-monitoring-for-flood-affected-areas",
        permanent: true,
      },
      {
        source: "/were-on-the-road-to-wa-book-your-demo-now",
        destination: "/blog/were-on-the-road-to-wa-book-your-demo-now",
        permanent: true,
      },

      // Untitled post — given a real slug/title in the rebuild
      {
        source: "/2966-2",
        destination: "/blog/protecting-utility-sites-from-copper-theft",
        permanent: true,
      },

      // Duplicate flood post — merged into the single kept version
      {
        source: "/local-councils-in-flood-affected-areas-receive-immediate-security-and-live-monitoring",
        destination: "/blog/immediate-security-and-live-monitoring-for-flood-affected-areas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
