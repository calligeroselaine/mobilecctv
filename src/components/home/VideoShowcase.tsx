import { Section, SectionHeading } from "@/components/ui/Section";

export function VideoShowcase() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="See It In Action"
        title="A Mobile CCTV Trailer, In The Field"
        align="center"
      />
      <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl shadow-lg">
        <div className="relative aspect-video w-full">
          <iframe
            src="https://player.vimeo.com/video/345582313?h=1358ee0f83&color&title=0&byline=0&portrait=0"
            title="Mobile CCTV Solutions equipment demonstration"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Section>
  );
}
