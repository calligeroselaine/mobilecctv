import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

/**
 * Real 59-second overview video from the client's own YouTube channel —
 * lived on the old site's homepage (missed in the initial audit since
 * it was lazy-loaded behind a click-to-play facade). Kept as its own
 * section rather than replacing the later Vimeo showcase, since it's
 * different footage.
 */
export function QuickLookVideo() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="Quick Look"
        title="The Trailer, In 60 Seconds"
        align="center"
      />
      <div className="mx-auto mt-8 max-w-2xl">
        <VideoEmbed youtubeId="kSxTWknToEY" title="Mobile CCTV Trailer overview" />
      </div>
    </Section>
  );
}
