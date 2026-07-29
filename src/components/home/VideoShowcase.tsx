import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

export function VideoShowcase() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="See It In Action"
        title="A Mobile CCTV Trailer, In The Field"
        align="center"
      />
      <div className="mx-auto mt-10 max-w-3xl">
        <VideoEmbed
          vimeoId="345582313"
          vimeoHash="1358ee0f83"
          title="Mobile CCTV Solutions equipment demonstration"
          posterSrc="/images/onsite-trailer-2018.jpg"
        />
      </div>
    </Section>
  );
}
