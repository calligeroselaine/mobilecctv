"use client";

import { useState } from "react";
import { Minus, Phone, Plus } from "lucide-react";
import { trailerCopy, trailerFaqs } from "@/lib/trailer-content";

export function TrailerFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ background: "#F2F0EB", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-24">
        <div className="flex max-w-[420px] flex-col gap-6">
          <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#5B5F63]">
            <span className="h-px w-7 bg-[#141619]" />
            {trailerCopy.faqEyebrow}
          </div>
          <h2 className="font-medium leading-[1.1] tracking-[-0.025em]" style={{ fontSize: "clamp(28px,3vw,42px)" }}>
            {trailerCopy.faqHeading}
          </h2>
          <a href="tel:1300996910" className="flex items-center gap-2.5 text-lg font-semibold">
            <Phone className="h-[22px] w-[22px]" aria-hidden="true" /> 1300 99 69 10
          </a>
        </div>
        <div className="border-t-2 border-[#141619]">
          {trailerFaqs.map((faq, i) => {
            const isOpen = i === open;
            return (
              <div key={faq.q} className="border-b border-[#D6D2CA]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-medium leading-[1.3] sm:text-lg">{faq.q}</span>
                  {isOpen ? <Minus className="h-6 w-6 shrink-0" aria-hidden="true" /> : <Plus className="h-6 w-6 shrink-0" aria-hidden="true" />}
                </button>
                {isOpen && <p className="max-w-[720px] pb-7 pr-4 text-base leading-[1.65] text-[#2A2D31] sm:pr-12">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
