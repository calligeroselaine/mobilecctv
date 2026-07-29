"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import { NavLink, business } from "@/lib/business";
import { Button } from "@/components/ui/Button";

type MobileNavProps = {
  links: NavLink[];
};

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  // Close automatically on navigation, so the panel never sticks around
  // after a route change. This adjusts state during render (React's
  // recommended pattern for "reset when a prop changes") rather than in
  // an effect, which avoids an extra cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape key closes the panel and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Lock body scroll while the panel is open, and move focus into it.
  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-t border-steel-200 bg-white shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                className="border-b border-steel-200 py-3 text-base font-semibold text-ink last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-6 pb-6">
            <a href={business.phone.href} className="text-base font-semibold text-brand">
              {business.phone.display}
            </a>
            <a
              href={business.support.href}
              target="_blank"
              rel="noopener noreferrer"
              title="Remote support session for existing customers (opens TeamViewer in a new tab)"
              className="inline-flex items-center gap-1 text-sm font-semibold text-steel-600"
            >
              {business.support.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <Button href="/contact" className="w-full">
              Request A Quote
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
