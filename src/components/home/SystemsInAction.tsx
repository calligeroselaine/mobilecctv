import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Button } from "@/components/ui/Button";

/**
 * The homepage's single "watch it in action" moment — combines what used
 * to be two separate video sections (the trailer overview and the
 * equipment demonstration) so the page only asks visitors to watch a
 * video once, not twice at different scroll depths.
 */
export function SystemsInAction() {
  return (
    <Section tone="surface">
      <SectionHeading
        title="Security That Goes Wherever You Need It"
        align="center"
      />
      <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-steel-600">
        See how our mobile CCTV solutions deliver reliable surveillance for
        construction sites, infrastructure projects and remote locations
        across Australia — and take a closer look at the equipment itself.
      </p>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold text-steel-600">
            Mobile CCTV Trailer Overview
          </p>
          <VideoEmbed
            youtubeId="kSxTWknToEY"
            title="Mobile CCTV Trailer overview"
            posterSrc="/images/hero-fullbleed-poster.jpg"
            frameClassName="rounded-2xl shadow-2xl"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-steel-600">
            Equipment Demonstration
          </p>
          <VideoEmbed
            vimeoId="345582313"
            vimeoHash="1358ee0f83"
            title="Mobile CCTV Solutions equipment demonstration"
            posterSrc="/images/onsite-trailer-2018.jpg"
            frameClassName="rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button href="#get-a-quote">Request a Free Quote</Button>
      </div>
    </Section>
  );
}
