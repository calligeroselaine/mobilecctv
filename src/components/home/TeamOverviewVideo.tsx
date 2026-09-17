import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * A personal, unpolished (in a good way) clip of the team talking through
 * what they do — placed right before the quote form as a closing "hear it
 * from us directly, then get in touch" moment. Deliberately a plain native
 * <video> with controls (not the click-to-load VideoEmbed facade used for
 * YouTube/Vimeo elsewhere) since this is self-hosted, so there's no
 * third-party script weight to defer in the first place.
 */
export function TeamOverviewVideo() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="From Our Team"
        title="Hear It Straight From Us"
        align="center"
      />
      <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-steel-600">
        A quick, honest look at what we do on site and why clients keep
        coming back — straight from the team behind Mobile CCTV Solutions.
      </p>

      <div className="mx-auto mt-10 max-w-sm">
        <video
          controls
          playsInline
          preload="metadata"
          poster="/images/team-overview-poster.jpg"
          className="aspect-[9/16] w-full rounded-2xl bg-ink object-cover shadow-2xl"
        >
          <source src="/videos/team-overview.mp4" type="video/mp4" />
        </video>
      </div>
    </Section>
  );
}
