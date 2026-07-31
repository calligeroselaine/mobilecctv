"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";

export function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section tone="surface">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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
      </motion.div>
    </Section>
  );
}
