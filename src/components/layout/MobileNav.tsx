"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NavLink, business } from "@/lib/business";
import { Button } from "@/components/ui/Button";

type MobileNavProps = {
  links: NavLink[];
};

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-ink"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-t border-steel-200 bg-white shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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
            <Button href="/contact" className="w-full">
              Request A Quote
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
