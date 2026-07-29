import { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs, Crumb } from "@/components/layout/Breadcrumbs";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  children?: ReactNode;
};

/**
 * Dark banner hero used on every interior page — deliberately distinct
 * from the homepage's split image hero so pages don't feel like repeats
 * of the homepage.
 */
export function PageHero({ eyebrow, title, description, crumbs, children }: PageHeroProps) {
  return (
    <section className="bg-ink text-white">
      <Container className="py-12 md:py-16">
        <Breadcrumbs crumbs={crumbs} />
        {eyebrow && (
          <p className="text-eyebrow mt-6 font-bold uppercase text-brand-light">
            {eyebrow}
          </p>
        )}
        <h1 className="text-h1 mt-2">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-steel-200">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
