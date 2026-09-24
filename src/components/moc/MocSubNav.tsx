import Link from "next/link";
import { subNavLinks } from "@/lib/moc-content";

/**
 * Page-specific sticky sub-nav — sits below the site's real Header
 * (rendered once in RootLayout, untouched here). Purely presentational,
 * so it stays a server component.
 */
export function MocSubNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#141619]/95 backdrop-blur">
      <div className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
        <span className="hidden shrink-0 text-[17px] md:block font-bold uppercase tracking-[0.04em] text-[#F2F0EB]" style={{ fontStretch: "78%" }}>
          Mobile Operations Centre
        </span>
        <nav aria-label="Mobile Operations Centre sections" className="hide-scrollbar flex min-w-0 gap-6 overflow-x-auto">
          {subNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-[#B9BDC1] hover:text-[#F2F0EB]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          href="#enquire"
          className="shrink-0 whitespace-nowrap bg-[color:oklch(0.74_0.14_70)] px-4.5 py-2.5 text-sm font-semibold text-[#141619] hover:opacity-90"
        >
          Enquire
        </Link>
      </div>
    </div>
  );
}
