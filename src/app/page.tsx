import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { InstagramHighlights } from "@/components/home/InstagramHighlights";
import { ProductOverview } from "@/components/home/ProductOverview";
import { KeyBenefits } from "@/components/home/KeyBenefits";
import { Applications } from "@/components/home/Applications";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { HireOrPurchase } from "@/components/home/HireOrPurchase";
import { RecentBlog } from "@/components/home/RecentBlog";
import { QuoteRequest } from "@/components/home/QuoteRequest";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <InstagramHighlights />
      <ProductOverview />
      <KeyBenefits />
      <Applications />
      <HowItWorks />
      <WhyUs />
      <VideoShowcase />
      <HireOrPurchase />
      <RecentBlog />
      <QuoteRequest />
    </>
  );
}
