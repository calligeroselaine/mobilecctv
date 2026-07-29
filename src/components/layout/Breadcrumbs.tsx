import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { business } from "@/lib/business";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  crumbs: Crumb[];
};

/** Visible breadcrumb trail + matching BreadcrumbList structured data. */
export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...crumbs];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${business.siteUrl}${crumb.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-steel-200">
        {all.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {crumb.href && index < all.length - 1 ? (
              <Link href={crumb.href} className="hover:text-white">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current={index === all.length - 1 ? "page" : undefined}>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
