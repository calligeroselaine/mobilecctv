"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only sticky enquiry bar (< 900px). Hides once the real enquiry
 * section scrolls into view so it never overlaps the form or the site's
 * real footer.
 */
export function MocStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const enquireEl = document.getElementById("enquire");
    if (!enquireEl) return;

    let enquireIntersecting = false;

    const updateVisibility = () => setVisible(mq.matches && !enquireIntersecting);

    const observer = new IntersectionObserver(
      ([entry]) => {
        enquireIntersecting = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.1 }
    );
    observer.observe(enquireEl);
    mq.addEventListener("change", updateVisibility);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between gap-3 bg-[#141619] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] min-[900px]:hidden"
      role="complementary"
      aria-label="Mobile Operations Centre enquiry"
    >
      <span className="text-sm font-medium text-[#F2F0EB]">Mobile Operations Centre</span>
      <a
        href="#enquire"
        className="whitespace-nowrap bg-[color:oklch(0.74_0.14_70)] px-4 py-2 text-sm font-semibold text-[#141619]"
      >
        Enquire
      </a>
    </div>
  );
}
