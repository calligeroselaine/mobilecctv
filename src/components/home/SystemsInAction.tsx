"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Button } from "@/components/ui/Button";

export function SystemsInAction() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section tone="surface">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeading
          title="Watch Our Systems Protect Real Australian Sites"
          align="center"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-steel-600">
          See how Mobile CCTV Solutions protects construction sites,
          infrastructure projects and remote locations across Australia.
        </p>

        <div className="mx-auto mt-10 max-w-6xl">
          <VideoEmbed
            youtubeId="kSxTWknToEY"
            title="Mobile CCTV Trailer overview"
            posterSrc="/images/onsite-trailer-2018.jpg"
            frameClassName="rounded-2xl shadow-2xl"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() =>
              document
                .getElementById("get-a-quote")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Request a Free Quote
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
