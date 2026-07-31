import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Button } from "@/components/ui/Button";

export function SystemsInAction() {
  return (
    <Section tone="surface">
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
          posterSrc="/images/trailer-showcase-poster.jpg"
          frameClassName="rounded-2xl shadow-2xl"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Button href="#get-a-quote">Request a Free Quote</Button>
      </div>
    </Section>
  );
}
