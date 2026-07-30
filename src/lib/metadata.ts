import type { Metadata } from "next";
import { business } from "@/lib/business";

type OgImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/mobile-cctv-trailers". */
  path: string;
  /** Real photo only — never a placeholder or stock image. */
  image?: OgImage;
};

const defaultImage: OgImage = {
  src: "/images/onsite-trailer-2018.jpg",
  width: 2560,
  height: 1920,
  alt: "Mobile CCTV security trailer deployed on site",
};

/**
 * Builds consistent canonical/OpenGraph/Twitter metadata for an indexable
 * page. Always production domain (business.siteUrl via metadataBase in the
 * root layout) — never a preview/deploy URL.
 */
export function buildMetadata({ title, description, path, image = defaultImage }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${business.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.src],
    },
  };
}
