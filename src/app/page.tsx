import { Hero } from "@/components/home/Hero";
import { SystemsInAction } from "@/components/home/SystemsInAction";
import { ProductHighlights } from "@/components/home/ProductHighlights";
import { TrustStrip } from "@/components/home/TrustStrip";
import { InstagramHighlights } from "@/components/home/InstagramHighlights";
import { KeyBenefits } from "@/components/home/KeyBenefits";
import { Applications } from "@/components/home/Applications";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { RecentBlog } from "@/components/home/RecentBlog";
import { QuoteRequest } from "@/components/home/QuoteRequest";

export default function Home() {
  return (
    <>
      <Hero />
      <SystemsInAction />
      <ProductHighlights />
      <TrustStrip />
      <InstagramHighlights />
      <KeyBenefits />
      <Applications />
      <HowItWorks />
      <WhyUs />
      <VideoShowcase />
      <RecentBlog />
      <QuoteRequest />
    </>
  );
}
