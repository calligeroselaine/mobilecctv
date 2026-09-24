"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { subNavLinks } from "@/lib/moc-content";

/**
 * Page-specific section nav. Hidden while the hero is on screen (the site
 * header + hero already say where you are); once the hero scrolls away it
 * pins directly under the site's sticky header. Positioned from the real
 * header's height so it can never sit hidden behind it.
 */
export function MocSubNav() {
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const hero = document.getElementById("moc-hero");
    const header = document.querySelector("header");
    if (!hero) return;

    const measure = () => {
      const h = header?.getBoundingClientRect().height ?? 0;
      setTop(h);
      document.documentElement.style.setProperty("--moc-sticky-offset", `${h + 60}px`);
    };
    measure();
    window.addEventListener("resize", measure);

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(hero);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 z-40 border-b border-white/10 bg-[#141619]/95 backdrop-blur transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
      style={{ top }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
        <span className="hidden shrink-0 text-[17px] font-bold uppercase tracking-[0.04em] text-[#F2F0EB] md:block" style={{ fontStretch: "78%" }}>
          Mobile Operations Centre
        </span>
        <nav aria-label="Mobile Operations Centre sections" className="hide-scrollbar flex min-w-0 gap-6 overflow-x-auto">
          {subNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={visible ? 0 : -1}
              className="whitespace-nowrap text-sm text-[#B9BDC1] hover:text-[#F2F0EB]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          href="#enquire"
          tabIndex={visible ? 0 : -1}
          className="shrink-0 whitespace-nowrap bg-[color:oklch(0.74_0.14_70)] px-4.5 py-2.5 text-sm font-semibold text-[#141619] hover:opacity-90"
        >
          Enquire
        </Link>
      </div>
    </div>
  );
}
