import { Hero } from "@/components/home/Hero";
import { PathwayCards } from "@/components/home/PathwayCards";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { TeamOverviewVideo } from "@/components/home/TeamOverviewVideo";
import { QuoteRequest } from "@/components/home/QuoteRequest";

/**
 * Simplified homepage flow (content/structure clean-up — not a redesign):
 * Hero -> three core product pathways -> short credibility section ->
 * a personal "hear it from the team" clip (reinstated per request, grouped
 * with the credibility section since it's a trust-building element) ->
 * client/council trust logos -> final enquiry CTA -> footer.
 *
 * Removed from this page (components kept in the project, not deleted,
 * in case they're reused elsewhere): SystemsInAction (product-detail
 * trailer/equipment video content that belongs on the individual product
 * pages), KeyBenefits ("Why It Works" feature breakdown), Applications
 * (full industries list), HowItWorks (full deployment process), and
 * RecentBlog (blog/articles list) — per the brief, these are now
 * secondary/product-page-level detail rather than homepage gateway content.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <PathwayCards />
      <WhyUs />
      <TeamOverviewVideo />
      <TrustStrip />
      <QuoteRequest />
    </>
  );
}
