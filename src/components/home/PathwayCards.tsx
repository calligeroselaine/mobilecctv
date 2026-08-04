import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { pathways } from "@/lib/pathways";

/**
 * The three decision-tree entry points, shown directly below the hero.
 * Each card is a single link (not a nested button) so the whole card is
 * clickable, per the client's "make each card feel clickable" brief.
 */
export function PathwayCards() {
  return (
    <section className="bg-surface-alt py-14 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {pathways.map((pathway) => {
            const Icon = pathway.icon;
            return (
              <Link
                key={pathway.slug}
                href={pathway.href}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-steel-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={pathway.image}
                    alt={pathway.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white ${pathway.accent.badge}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-10 text-center">
                  <p className={`text-eyebrow font-bold uppercase ${pathway.accent.eyebrow}`}>
                    {pathway.eyebrow}
                  </p>
                  <h3 className="text-h3 mt-2">{pathway.heading}</h3>
                  <p className="mt-2 flex-1 text-steel-600">{pathway.description}</p>
                  <span
                    className={`mt-5 inline-flex items-center justify-center gap-1.5 self-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-colors ${pathway.accent.button}`}
                  >
                    {pathway.buttonLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
