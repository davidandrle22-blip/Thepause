import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { GenderSection } from "@/components/landing/GenderSection";
import { TimelinePreview } from "@/components/landing/TimelinePreview";
import { ForWhoSection } from "@/components/landing/ForWhoSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { SavingsCalculator } from "@/components/landing/SavingsCalculator";
import { UrgencyBar } from "@/components/landing/UrgencyBar";
import { FomoToast } from "@/components/landing/FomoToast";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { ValueBreakdown } from "@/components/landing/ValueBreakdown";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { TrustBadges } from "@/components/landing/TrustBadges";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { ProgressSteps } from "@/components/landing/ProgressSteps";
import { AuthoritySection } from "@/components/landing/AuthoritySection";
import { CuriosityTeasers } from "@/components/landing/CuriosityTeasers";
import { SeasonalBanner } from "@/components/landing/SeasonalBanner";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <>
      <UrgencyBar />
      <Header />
      <main>
        <HeroSection />
        <SeasonalBanner />
        <GenderSection />
        <TimelinePreview />
        <ForWhoSection />
        <BenefitsSection />
        <ErrorBoundary>
          <StatsSection />
        </ErrorBoundary>
        <BeforeAfterSection />
        <CuriosityTeasers />
        <TestimonialsSection />
        <AuthoritySection />
        <ComparisonTable />
        <ValueBreakdown />
        <FAQSection />
        <SavingsCalculator />
        <PricingSection />
        <TrustBadges />
        <ProgressSteps />
      </main>
      <Footer />
      <StickyCTA />
      <FomoToast />
      <ExitIntentPopup />
    </>
  );
}
