import { ArrowDown } from "lucide-react";
import { applications, copy } from "@/lib/moc-content";

export function MocApplications() {
  return (
    <section id="applications" style={{ background: "#E6E2DA", color: "#141619", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#4E5256]">
          <span className="h-px w-7 bg-[#141619]" />
          {copy.applicationsEyebrow}
        </div>
        <div className="mt-7 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <h2 className="font-medium leading-[1.1] tracking-[-0.025em]" style={{ fontSize: "clamp(22px,2.4vw,32px)" }}>
            {copy.applicationsHeading}
          </h2>
          <ul className="border-t-2 border-[#141619]">
            {applications.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-5 border-b border-[#C9C4BA] py-4">
                <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="text-lg font-medium tracking-[-0.01em]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <a href="#ramadan" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#141619] hover:text-[#B97A22]">
          {copy.applicationsLink} <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
