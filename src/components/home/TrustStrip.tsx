import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";

export function TrustStrip() {
  return (
    <Section tone="surface">
      <SectionHeading title="Companies Who Trust Us" align="center" />
      <div className="relative mt-8 aspect-[1920/900] w-full overflow-hidden rounded-lg">
        <Image
          src="/images/companies-we-work-with-banner.jpg"
          alt="Logos of councils and companies who work with Mobile CCTV Solutions"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </Section>
  );
}
