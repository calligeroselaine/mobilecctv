import { Hero } from "@/components/home/Hero";
import { PathwayCards } from "@/components/home/PathwayCards";
import { SystemsInAction } from "@/components/home/SystemsInAction";
import { TrustStrip } from "@/components/home/TrustStrip";
import { InstagramHighlights } from "@/components/home/InstagramHighlights";
import { KeyBenefits } from "@/components/home/KeyBenefits";
import { Applications } from "@/components/home/Applications";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { RecentBlog } from "@/components/home/RecentBlog";
import { QuoteRequest } from "@/components/home/QuoteRequest";

export default function Home() {
  return (
    <>
      <Hero />
      <PathwayCards />
      <SystemsInAction />
      <TrustStrip />
      <InstagramHighlights />
      <KeyBenefits />
      <Applications />
      <HowItWorks />
      <WhyUs />
      <RecentBlog />
      <QuoteRequest />
    </>
  );
}
