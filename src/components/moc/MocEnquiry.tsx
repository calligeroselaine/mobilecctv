import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/moc-content";
import { ContactForm } from "@/components/contact/ContactForm";
import { business } from "@/lib/business";

const recap = [
  { href: "#inside", label: "Inside the centre" },
  { href: "#why", label: "Why use one" },
  { href: "#ramadan", label: "Ramadan Nights, Lakemba" },
  { href: "#bathurst", label: "Bathurst 1000" },
];

/**
 * Reuses the site's real ContactForm/enquiry backend (same /api/contact
 * route, validation, spam protection and success state as every other
 * product page) inside the design's dark enquiry panel, pre-tagged with
 * "Mobile Operations Centre" so leads from this page are identifiable.
 */
export function MocEnquiry() {
  return (
    <section id="enquire" style={{ background: "#16191C", color: "#F2F0EB", scrollMarginTop: 140 }}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#A9ADB1]">
          <span className="h-px w-7 bg-[#4588c6]" />
          {copy.enquireEyebrow}
        </div>
        <h2
          className="mt-6 max-w-[1200px] font-bold uppercase leading-[0.95]"
          style={{ fontStretch: "66%", fontSize: "clamp(26px,3.6vw,44px)" }}
        >
          {copy.enquireHeading}
        </h2>

        <div className="mt-14 grid grid-cols-1 items-start gap-14 sm:mt-20 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-9">
            <p className="max-w-[520px] text-lg leading-[1.5] text-[#E3E1DC] sm:text-xl">{copy.enquireBody}</p>
            <div className="border-t border-white/15">
              {recap.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/15 py-4 text-base text-[#C9CCCF] hover:text-white"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A9ADB1]">Call</span>
                <a href={business.phone.href} className="text-xl font-semibold">
                  {business.phone.display}
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A9ADB1]">Email</span>
                <a href={`mailto:${business.email}`} className="text-base">
                  {business.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#F2F0EB] p-7 text-[#141619] sm:p-12">
            <ContactForm variant="full" />
          </div>
        </div>
      </div>
    </section>
  );
}
