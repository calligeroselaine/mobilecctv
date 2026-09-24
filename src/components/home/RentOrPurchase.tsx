import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { contactHref } from "@/lib/contactHref";

/**
 * Restores the old site's "Rent or Purchase" callout (removed earlier
 * along with the duplicate product blocks). Copy reuses wording already
 * on the site: short, mid and long-term hire, outright purchase, and no
 * locked-in contracts.
 */
export function RentOrPurchase() {
  return (
    <Section tone="ink">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <SectionHeading title="Rent Or Purchase" onDark />
          <p className="mt-4 max-w-[520px] text-lg text-steel-200">
            Short, mid and long-term hire, or outright purchase — with no
            locked-in contracts. Tell us about your site and we&rsquo;ll
            recommend the right option.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={contactHref({ engagement: "Hire" })}>Hire Enquiry</Button>
            <Button href={contactHref({ engagement: "Purchase" })} variant="inverse">
              Purchase Enquiry
            </Button>
          </div>
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src="/images/mobile-cctv-trailers.jpg"
            alt="A Mobile CCTV Solutions trailer with raised camera mast on grass at dusk"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
