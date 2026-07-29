import { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Alternating background for visual rhythm between sections. */
  tone?: "surface" | "alt" | "ink" | "brand";
};

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  surface: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  ink: "bg-ink text-white",
  brand: "bg-brand text-white",
};

/** Full-width section wrapper — always use instead of a bare <section>. */
export function Section({
  children,
  id,
  className = "",
  tone = "surface",
}: SectionProps) {
  return (
    <section id={id} className={`py-14 md:py-20 ${toneClasses[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

/** Consistent eyebrow + H2 heading pattern, used across every section. */
export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="text-eyebrow font-bold uppercase text-brand">
          {eyebrow}
        </p>
      )}
      <h2 className="text-h2 mt-2">{title}</h2>
    </div>
  );
}
