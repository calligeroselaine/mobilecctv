import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function HireOrPurchase() {
  return (
    <Section tone="brand" className="text-center">
      <h2 className="text-h2">Rent Or Purchase</h2>
      <p className="mx-auto mt-3 max-w-xl text-white/90">
        Mobile CCTV Solutions caters for all short and long term leases and
        purchase options. Contact us today!
      </p>
      <div className="mt-6">
        <Button href="/contact" variant="inverse">
          Ask Us How
        </Button>
      </div>
    </Section>
  );
}
