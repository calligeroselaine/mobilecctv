import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { business, primaryNav, productNav, legalNav } from "@/lib/business";
import { Container } from "@/components/layout/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-steel-200">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo.png"
            alt={business.name}
            width={1427}
            height={416}
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm">
            {business.name} provide high-quality mobile CCTV surveillance for
            businesses, councils and events across Australia.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Site</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Products</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {productNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            <a
              href={business.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-steel-200 hover:text-white"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={business.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-steel-200 hover:text-white"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={business.phone.href} className="hover:text-white">
                {business.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-white">
                {business.email}
              </a>
            </li>
            <li>
              {business.address.line1}, {business.address.suburb}{" "}
              {business.address.state} {business.address.postcode}
            </li>
            {business.additionalLocations.map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
            <li>
              <a
                href={business.support.href}
                target="_blank"
                rel="noopener noreferrer"
                title="Remote support session for existing customers (opens TeamViewer in a new tab)"
                className="inline-flex items-center gap-1 hover:text-white"
              >
                Remote Support (TeamViewer)
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-steel-400 sm:flex-row">
          <p>
            © {year} {business.name}. {business.licence}. ABN {business.abn}.
          </p>
          <ul className="flex gap-4">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
