import Link from "next/link";
import Image from "next/image";
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

      <Container className="flex items-center justify-between gap-4 border-b border-steel-200 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt={business.name}
            width={1427}
            height={416}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-ink hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={business.support.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            {business.support.label}
          </a>
          <Button href="/contact">Request A Quote</Button>
        </div>

        <MobileNav links={primaryNav} />
      </Container>
    </header>
  );
}
