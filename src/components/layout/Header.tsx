import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { business, primaryNav } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";

export function Header() {
  return (
    <header className="relative sticky top-0 z-50 bg-white">
      <div className="bg-ink text-steel-200">
        <Container className="flex justify-end gap-6 py-2 text-sm">
          <a href={business.phone.href} className="hover:text-white">
            {business.phone.display}
          </a>
          <a href={`mailto:${business.email}`} className="hidden hover:text-white sm:inline">
            {business.email}
          </a>
        </Container>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 border-b border-steel-200 px-6 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt={business.name}
            width={1427}
            height={416}
            priority
            sizes="300px"
            className="h-[72px] w-auto"
          />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-5">
            {primaryNav
              .filter((link) => link.label !== "Contact")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap text-sm font-semibold text-ink hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.support.href}
            target="_blank"
            rel="noopener noreferrer"
            title="Remote support session for existing customers (opens TeamViewer in a new tab)"
            className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-brand hover:text-brand-dark"
          >
            {business.support.label}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Button href="/contact">Contact</Button>
          <Button href="/contact">Request A Quote</Button>
        </div>

        <MobileNav links={primaryNav} />
      </div>
    </header>
  );
}
