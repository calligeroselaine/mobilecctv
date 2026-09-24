import { Download } from "lucide-react";
import { poleCta } from "@/lib/pole-content";

export function PoleCta() {
  return (
    <section id="enquire" style={{ background: "#16191C", color: "#F2F0EB", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-[1100px] font-bold uppercase leading-[0.9]" style={{ fontStretch: "66%", fontSize: "clamp(26px,3.6vw,44px)" }}>
          Put a pole camera where you need visibility
        </h2>
        <p className="mt-6 max-w-[520px] text-lg leading-[1.5] text-[#E3E1DC]">
          Tell us about your site and we&rsquo;ll recommend a pole camera, a trailer, or a mix of both.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={poleCta.hire} className="bg-[#4588c6] px-7 py-4 text-base font-semibold text-white hover:bg-[#387bb8]">Hire enquiry</a>
          <a href={poleCta.purchase} className="border border-white/40 px-7 py-4 text-base font-medium hover:bg-white/10">Purchase enquiry</a>
          <a href={poleCta.brochure} download className="inline-flex items-center gap-2 px-4 py-4 text-base font-medium text-[#C9CCCF] hover:text-white">
            <Download className="h-5 w-5" aria-hidden="true" /> Download brochure
          </a>
        </div>
      </div>
    </section>
  );
}
