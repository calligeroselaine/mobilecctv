import { ArrowDown } from "lucide-react";
import { poleApplications, poleCopy } from "@/lib/pole-content";

export function PoleApplications() {
  return (
    <section id="uses" style={{ background: "#E6E2DA", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#4E5256]">
          <span className="h-px w-7 bg-[#141619]" />
          {poleCopy.applicationsEyebrow}
        </div>
        <div className="mt-7 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <h2 className="font-medium leading-[1.1] tracking-[-0.025em]" style={{ fontSize: "clamp(22px,2.4vw,32px)" }}>
            {poleCopy.applicationsHeading}
          </h2>
          <ul className="grid grid-cols-1 border-t-2 border-[#141619] sm:grid-cols-2 sm:gap-x-10">
            {poleApplications.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-4 border-b border-[#C9C4BA] py-5">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#4588c6]" aria-hidden="true" />
                <span>
                  <span className="block text-lg font-semibold">{title}</span>
                  <span className="block text-sm text-[#4E5256]">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <a href="#sydney-marathon" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold hover:text-[#4588c6]">
          See it in real deployments <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
