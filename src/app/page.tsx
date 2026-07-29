import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";

/**
 * Placeholder home page — proves the Stage 3 foundation (Header, Footer,
 * Container, Section, Button, ReviewFlag, tokens) renders correctly.
 * Full page content is built in a later stage.
 */
export default function Home() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Stage 3 — Foundation"
        title="Reusable layout foundation is live"
      />
      <p className="mt-4 max-w-xl text-steel-600">
        Header, mobile nav, footer, buttons, and section components are
        wired up and pulling business details from a single config file.
        Page content lands in the next stage.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/contact">Primary Button</Button>
        <Button href="/contact" variant="secondary">
          Secondary Button
        </Button>
      </div>
      <div className="mt-6">
        <ReviewFlag note="This is a placeholder page for foundation review, not final home page content." />
      </div>
    </Section>
  );
}
