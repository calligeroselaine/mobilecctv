type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Renders a single JSON-LD structured data script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
